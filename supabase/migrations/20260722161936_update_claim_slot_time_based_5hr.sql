-- Helper: convert "HH:MM" text to minutes since midnight
CREATE OR REPLACE FUNCTION public.slot_to_minutes(t text)
RETURNS int LANGUAGE sql IMMUTABLE AS $$
  SELECT (split_part(t, ':', 1)::int * 60) + split_part(t, ':', 2)::int;
$$;

-- Update claim_slot: block 5 hours by time, with conflict detection
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

  RETURN jsonb_build_object('ok', true);
END;
$function$;
