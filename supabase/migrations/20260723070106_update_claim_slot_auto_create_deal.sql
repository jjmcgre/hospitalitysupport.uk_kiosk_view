-- Update claim_slot to auto-create a deal in the pipeline when a booking is confirmed.
-- Previously this was done in the frontend with the anon key, but RLS on deals/organisations
-- only allows authenticated users to insert — so the anon client's inserts failed silently.
-- Moving deal creation into the SECURITY DEFINER function bypasses RLS and guarantees the
-- pipeline is always updated when a demo is booked.

CREATE OR REPLACE FUNCTION public.claim_slot(p_slot_id uuid, p_booking_id uuid, p_video_link text, p_meeting_type text DEFAULT 'virtual'::text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_slot_booked    boolean;
  v_slot_date      date;
  v_slot_time      text;
  v_onsite_count   int;
  v_meeting_start  int;
  v_window_start   int;
  v_window_end      int;
  v_conflict       record;
  v_block          record;
  v_booking        record;
  v_org_key        text;
  v_org_id         uuid;
  v_deal_id        uuid;
  v_sites          int;
  v_ref_user_id    uuid;
  v_ref_user_name  text;
BEGIN
  IF p_meeting_type NOT IN ('virtual', 'onsite') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Invalid meeting type');
  END IF;

  SELECT booked, slot_date, slot_time
  INTO v_slot_booked, v_slot_date, v_slot_time
  FROM demo_availability
  WHERE id = p_slot_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Slot not found');
  END IF;

  IF v_slot_booked THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Slot already booked');
  END IF;

  IF p_meeting_type = 'onsite' THEN
    v_meeting_start := public.slot_to_minutes(v_slot_time);
    v_window_start := v_meeting_start - 120;  -- 2 hours before
    v_window_end   := v_meeting_start + 180;  -- meeting (60) + 2 hours after

    -- Check max 2 onsite per day
    SELECT count(*) INTO v_onsite_count
    FROM demo_availability a
    JOIN demo_bookings b ON b.id = a.booked_by_booking_id
    WHERE a.slot_date = v_slot_date
      AND a.booked = true
      AND b.meeting_type = 'onsite';

    IF v_onsite_count >= 2 THEN
      RETURN jsonb_build_object('ok', false, 'error', 'Maximum 2 on-site visits per day already reached');
    END IF;

    -- Check for conflicts: any slot in the 5-hour window already booked by another booking
    FOR v_conflict IN
      SELECT a.slot_time, b.name, b.meeting_type
      FROM demo_availability a
      LEFT JOIN demo_bookings b ON b.id = a.booked_by_booking_id
      WHERE a.slot_date = v_slot_date
        AND public.slot_to_minutes(a.slot_time) >= v_window_start
        AND public.slot_to_minutes(a.slot_time) < v_window_end
        AND a.booked = true
        AND a.id != p_slot_id
    LOOP
      RETURN jsonb_build_object(
        'ok', false,
        'error', format('Conflict: slot %s is already booked by %s (%s)',
          v_conflict.slot_time, v_conflict.name, v_conflict.meeting_type)
      );
    END LOOP;

    -- Block all free slots in the 5-hour window (except the meeting slot itself)
    FOR v_block IN
      SELECT id FROM demo_availability
      WHERE slot_date = v_slot_date
        AND public.slot_to_minutes(slot_time) >= v_window_start
        AND public.slot_to_minutes(slot_time) < v_window_end
        AND booked = false
        AND id != p_slot_id
    LOOP
      UPDATE demo_availability
      SET booked = true,
          booked_by_booking_id = p_booking_id,
          notes = COALESCE(notes, '') || ' [blocked: on-site buffer]'
      WHERE id = v_block.id;
    END LOOP;
  END IF;

  -- Mark the selected slot as booked
  UPDATE demo_availability
  SET booked = true, booked_by_booking_id = p_booking_id
  WHERE id = p_slot_id;

  UPDATE demo_bookings
  SET video_link   = p_video_link,
      status       = 'confirmed',
      meeting_type = p_meeting_type
  WHERE id = p_booking_id;

  -- ── Auto-create a deal in the pipeline ──
  -- Fetch booking details for deal creation
  SELECT name, business_name, city, postcode, num_sites,
         sourced_by_user_id, sourced_by_name
  INTO v_booking
  FROM demo_bookings
  WHERE id = p_booking_id;

  IF FOUND AND v_booking.sourced_by_user_id IS NOT NULL THEN
    v_ref_user_id   := v_booking.sourced_by_user_id;
    v_ref_user_name := v_booking.sourced_by_name;

    -- Resolve the display name from user_profiles if not already set
    IF v_ref_user_name IS NULL THEN
      SELECT up.display_name INTO v_ref_user_name
      FROM user_profiles up
      WHERE up.id = v_ref_user_id
      LIMIT 1;

      -- If no profile found, try matching by auth_user_id
      IF v_ref_user_name IS NULL THEN
        SELECT up.display_name INTO v_ref_user_name
        FROM user_profiles up
        WHERE up.auth_user_id = v_ref_user_id
        LIMIT 1;
      END IF;

      -- Persist the resolved name back onto the booking
      IF v_ref_user_name IS NOT NULL THEN
        UPDATE demo_bookings SET sourced_by_name = v_ref_user_name WHERE id = p_booking_id;
      END IF;
    END IF;

    v_sites := COALESCE(NULLIF(v_booking.num_sites, '')::int, 1);

    -- Compute org_key (same logic as frontend computeOrgKey)
    v_org_key := lower(regexp_replace(v_booking.business_name, '\s+', '', 'g')) || '|' ||
                 lower(regexp_replace(COALESCE(v_booking.postcode, ''), '\s+', '', 'g'));

    -- Find or create the organisation
    SELECT id INTO v_org_id FROM organisations WHERE org_key = v_org_key LIMIT 1;

    IF v_org_id IS NULL THEN
      INSERT INTO organisations (trading_name, city, postcode, org_type, num_sites, created_by_user_id, org_key)
      VALUES (v_booking.business_name, v_booking.city, v_booking.postcode, 'pub', v_sites, v_ref_user_id, v_org_key)
      RETURNING id INTO v_org_id;
    END IF;

    -- Create the deal
    IF v_org_id IS NOT NULL THEN
      INSERT INTO deals (
        org_id, stage, source, confidence,
        sourced_by_user_id, sourced_by_name,
        assigned_to_user_id, assigned_to_name,
        commission_status, num_sites, created_by_user_id
      )
      VALUES (
        v_org_id, 'demo_booked', 'referral', 'warm',
        v_ref_user_id, v_ref_user_name,
        v_ref_user_id, v_ref_user_name,
        'pending', v_sites, v_ref_user_id
      )
      RETURNING id INTO v_deal_id;

      -- Link the booking to the deal
      IF v_deal_id IS NOT NULL THEN
        UPDATE demo_bookings SET deal_id = v_deal_id WHERE id = p_booking_id;
      END IF;
    END IF;
  END IF;

  RETURN jsonb_build_object('ok', true, 'deal_id', v_deal_id);
END;
$function$;
