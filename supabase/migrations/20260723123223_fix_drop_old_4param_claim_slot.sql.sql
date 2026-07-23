/*
# Drop old 4-parameter claim_slot overload

## Problem
Two `claim_slot` functions coexist in the database:
1. Old 4-param version `claim_slot(uuid, uuid, text, text)` — buffer logic is inside
   the `IF p_meeting_type = 'onsite'` block, so virtual meetings get NO buffer.
2. New 5-param version `claim_slot(uuid, uuid, text, text, uuid)` — correct 15-min
   buffer for all meeting types.

The frontend calls `claim_slot` with 4 args (no p_deal_id), so PostgreSQL resolves to
the OLD broken function. Virtual bookings therefore get no buffer slots blocked.

## Fix
Drop the old 4-param overload so only the correct 5-param version remains. PostgreSQL
will then resolve the 4-arg call to the 5-param function (p_deal_id defaults to NULL).

## Security
No RLS or policy changes. Function remains SECURITY DEFINER with existing grants.
*/

DROP FUNCTION IF EXISTS public.claim_slot(uuid, uuid, text, text);

-- Re-apply the correct 5-param version to be safe
CREATE OR REPLACE FUNCTION public.claim_slot(
  p_slot_id       uuid,
  p_booking_id    uuid,
  p_video_link    text,
  p_meeting_type  text DEFAULT 'virtual',
  p_deal_id       uuid DEFAULT NULL
)
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
  v_buffer_start   int;
  v_buffer_end     int;
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

  v_meeting_start := public.slot_to_minutes(v_slot_time);

  -- Virtual: 15 min before + 60 min meeting + 15 min after = 90 min total
  -- Onsite:  2hr before + 60 min meeting + 3hr after (travel buffer)
  IF p_meeting_type = 'onsite' THEN
    v_buffer_start := v_meeting_start - 120;
    v_buffer_end   := v_meeting_start + 180;

    SELECT count(DISTINCT b.id) INTO v_onsite_count
    FROM demo_availability a
    JOIN demo_bookings b ON b.id = a.booked_by_booking_id
    WHERE a.slot_date = v_slot_date
    AND a.booked = true
    AND b.meeting_type = 'onsite'
    AND (a.notes IS NULL OR (a.notes NOT LIKE '%[blocked: on-site buffer]%' AND a.notes NOT LIKE '%[blocked: buffer]%'));

    IF v_onsite_count >= 2 THEN
      RETURN jsonb_build_object('ok', false, 'error', 'Maximum 2 on-site visits per day already reached');
    END IF;
  ELSE
    v_buffer_start := v_meeting_start - 15;
    v_buffer_end   := v_meeting_start + 60 + 15;
  END IF;

  -- Check for conflicts with already-booked slots in the buffer window
  FOR v_conflict IN
    SELECT a.slot_time, b.name, b.meeting_type
    FROM demo_availability a
    LEFT JOIN demo_bookings b ON b.id = a.booked_by_booking_id
    WHERE a.slot_date = v_slot_date
    AND public.slot_to_minutes(a.slot_time) >= v_buffer_start
    AND public.slot_to_minutes(a.slot_time) < v_buffer_end
    AND a.booked = true
    AND a.id != p_slot_id
  LOOP
    RETURN jsonb_build_object(
      'ok', false,
      'error', format('That time overlaps with an existing booking (%s at %s). Please pick another time.',
      COALESCE(v_conflict.name, 'another booking'), v_conflict.slot_time)
    );
  END LOOP;

  -- Block all unbooked 15-min slots in the buffer window (except the chosen slot)
  FOR v_block IN
    SELECT id FROM demo_availability
    WHERE slot_date = v_slot_date
    AND public.slot_to_minutes(slot_time) >= v_buffer_start
    AND public.slot_to_minutes(slot_time) < v_buffer_end
    AND booked = false
    AND id != p_slot_id
  LOOP
    UPDATE demo_availability
    SET booked = true,
        booked_by_booking_id = p_booking_id,
        notes = COALESCE(NULLIF(notes, ''), '') ||
          CASE WHEN p_meeting_type = 'onsite' THEN ' [blocked: on-site buffer]' ELSE ' [blocked: buffer]' END
    WHERE id = v_block.id;
  END LOOP;

  -- Mark the chosen slot as booked (the actual meeting)
  UPDATE demo_availability
  SET booked = true, booked_by_booking_id = p_booking_id
  WHERE id = p_slot_id;

  UPDATE demo_bookings
  SET video_link   = p_video_link,
      status       = 'confirmed',
      meeting_type = p_meeting_type
  WHERE id = p_booking_id;

  -- Auto-create a deal in the pipeline (only when no existing deal is provided)
  SELECT name, business_name, city, postcode, num_sites,
         sourced_by_user_id, sourced_by_name
  INTO v_booking
  FROM demo_bookings
  WHERE id = p_booking_id;

  IF FOUND AND v_booking.sourced_by_user_id IS NOT NULL THEN
    v_ref_user_id   := v_booking.sourced_by_user_id;
    v_ref_user_name := v_booking.sourced_by_name;

    IF v_ref_user_name IS NULL THEN
      SELECT up.display_name INTO v_ref_user_name
      FROM user_profiles up
      WHERE up.auth_user_id = v_ref_user_id
      LIMIT 1;

      IF v_ref_user_name IS NOT NULL THEN
        UPDATE demo_bookings SET sourced_by_name = v_ref_user_name WHERE id = p_booking_id;
      END IF;
    END IF;

    IF p_deal_id IS NOT NULL THEN
      UPDATE demo_bookings SET deal_id = p_deal_id WHERE id = p_booking_id;
      v_deal_id := p_deal_id;
    ELSE
      v_sites := COALESCE(NULLIF(v_booking.num_sites, '')::int, 1);

      v_org_key := lower(regexp_replace(COALESCE(v_booking.business_name, ''), '\s+', '', 'g')) || '|' ||
      lower(regexp_replace(COALESCE(v_booking.postcode, ''), '\s+', '', 'g'));

      SELECT id INTO v_org_id FROM organisations WHERE org_key = v_org_key LIMIT 1;

      IF v_org_id IS NULL THEN
        INSERT INTO organisations (trading_name, city, postcode, org_type, num_sites, created_by_user_id)
        VALUES (v_booking.business_name, v_booking.city, v_booking.postcode, 'pub', v_sites, v_ref_user_id)
        RETURNING id INTO v_org_id;
      END IF;

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

        IF v_deal_id IS NOT NULL THEN
          UPDATE demo_bookings SET deal_id = v_deal_id WHERE id = p_booking_id;
        END IF;
      END IF;
    END IF;
  END IF;

  RETURN jsonb_build_object('ok', true, 'deal_id', v_deal_id);
END;
$function$;

GRANT EXECUTE ON FUNCTION public.claim_slot(uuid, uuid, text, text, uuid) TO anon, authenticated;
