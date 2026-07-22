-- Function to change a booked demo's meeting type (virtual <-> onsite)
-- Handles blocking/unblocking adjacent travel buffer slots
CREATE OR REPLACE FUNCTION public.change_meeting_type(p_booking_id uuid, p_new_type text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_current_type   text;
  v_slot_id        uuid;
  v_slot_date      date;
  v_slot_time      text;
  v_onsite_count   int;
  v_adjacent_id    uuid;
BEGIN
  IF p_new_type NOT IN ('virtual', 'onsite') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Invalid meeting type');
  END IF;

  -- Get current meeting type and the booked slot
  SELECT b.meeting_type INTO v_current_type
  FROM demo_bookings b WHERE b.id = p_booking_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Booking not found');
  END IF;

  IF v_current_type = p_new_type THEN
    RETURN jsonb_build_object('ok', true, 'message', 'Already this type');
  END IF;

  -- Find the primary slot for this booking
  SELECT a.id, a.slot_date, a.slot_time INTO v_slot_id, v_slot_date, v_slot_time
  FROM demo_availability a
  WHERE a.booked_by_booking_id = p_booking_id
    AND a.booked = true
    AND (a.notes NOT LIKE '%[blocked: on-site buffer]%' OR a.notes IS NULL)
  ORDER BY a.slot_time ASC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'No primary slot found for this booking');
  END IF;

  IF p_new_type = 'onsite' THEN
    -- Check max 2 onsite per day
    SELECT count(*) INTO v_onsite_count
    FROM demo_availability a
    JOIN demo_bookings b ON b.id = a.booked_by_booking_id
    WHERE a.slot_date = v_slot_date
      AND a.booked = true
      AND b.meeting_type = 'onsite'
      AND b.id != p_booking_id;

    IF v_onsite_count >= 2 THEN
      RETURN jsonb_build_object('ok', false, 'error', 'Maximum 2 on-site visits per day already reached');
    END IF;

    -- Block slot before (travel time)
    SELECT id INTO v_adjacent_id
    FROM demo_availability
    WHERE slot_date = v_slot_date
      AND slot_time < v_slot_time
      AND booked = false
    ORDER BY slot_time DESC LIMIT 1;

    IF v_adjacent_id IS NOT NULL THEN
      UPDATE demo_availability
      SET booked = true,
          booked_by_booking_id = p_booking_id,
          notes = COALESCE(notes, '') || ' [blocked: on-site buffer]'
      WHERE id = v_adjacent_id;
    END IF;

    -- Block slot after (travel time)
    SELECT id INTO v_adjacent_id
    FROM demo_availability
    WHERE slot_date = v_slot_date
      AND slot_time > v_slot_time
      AND booked = false
    ORDER BY slot_time ASC LIMIT 1;

    IF v_adjacent_id IS NOT NULL THEN
      UPDATE demo_availability
      SET booked = true,
          booked_by_booking_id = p_booking_id,
          notes = COALESCE(notes, '') || ' [blocked: on-site buffer]'
      WHERE id = v_adjacent_id;
    END IF;

    -- Clear video link for onsite
    UPDATE demo_bookings SET meeting_type = 'onsite', video_link = '' WHERE id = p_booking_id;

  ELSE
    -- Switching to virtual: unblock buffer slots that were blocked for this booking
    UPDATE demo_availability
    SET booked = false,
        booked_by_booking_id = null,
        notes = REPLACE(COALESCE(notes, ''), ' [blocked: on-site buffer]', '')
    WHERE booked_by_booking_id = p_booking_id
      AND booked = true
      AND notes LIKE '%[blocked: on-site buffer]%'
      AND id != v_slot_id;

    -- Set video link for virtual
    UPDATE demo_bookings
    SET meeting_type = 'virtual', video_link = 'https://meet.google.com/mav-hmei-vzi'
    WHERE id = p_booking_id;
  END IF;

  RETURN jsonb_build_object('ok', true);
END;
$function$;
