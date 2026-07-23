-- Update change_meeting_type to handle 15-min buffer for all meeting types

CREATE OR REPLACE FUNCTION public.change_meeting_type(
  p_booking_id uuid,
  p_new_type   text
)
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
  v_meeting_start  int;
  v_buffer_start   int;
  v_buffer_end     int;
  v_conflict       record;
  v_block          record;
BEGIN
  IF p_new_type NOT IN ('virtual', 'onsite') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Invalid meeting type');
  END IF;

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
  AND (a.notes IS NULL OR (a.notes NOT LIKE '%[blocked: on-site buffer]%' AND a.notes NOT LIKE '%[blocked: buffer]%'))
  ORDER BY a.slot_time ASC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'No primary slot found for this booking');
  END IF;

  v_meeting_start := public.slot_to_minutes(v_slot_time);

  IF p_new_type = 'onsite' THEN
    v_buffer_start := v_meeting_start - 120;
    v_buffer_end   := v_meeting_start + 180;

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

    -- Check for conflicts in the onsite buffer window
    FOR v_conflict IN
      SELECT a.slot_time, b.name, b.meeting_type
      FROM demo_availability a
      LEFT JOIN demo_bookings b ON b.id = a.booked_by_booking_id
      WHERE a.slot_date = v_slot_date
      AND public.slot_to_minutes(a.slot_time) >= v_buffer_start
      AND public.slot_to_minutes(a.slot_time) < v_buffer_end
      AND a.booked = true
      AND (a.booked_by_booking_id IS NULL OR a.booked_by_booking_id != p_booking_id)
    LOOP
      RETURN jsonb_build_object(
        'ok', false,
        'error', format('Conflict: slot %s is already booked by %s (%s)',
        v_conflict.slot_time, v_conflict.name, v_conflict.meeting_type)
      );
    END LOOP;

    -- Block all free slots in the onsite buffer window
    FOR v_block IN
      SELECT id FROM demo_availability
      WHERE slot_date = v_slot_date
      AND public.slot_to_minutes(slot_time) >= v_buffer_start
      AND public.slot_to_minutes(slot_time) < v_buffer_end
      AND booked = false
      AND id != v_slot_id
    LOOP
      UPDATE demo_availability
      SET booked = true,
          booked_by_booking_id = p_booking_id,
          notes = COALESCE(notes, '') || ' [blocked: on-site buffer]'
      WHERE id = v_block.id;
    END LOOP;

    UPDATE demo_bookings SET meeting_type = 'onsite', video_link = '' WHERE id = p_booking_id;

  ELSE
    -- Switching to virtual: unblock all buffer slots for this booking
    UPDATE demo_availability
    SET booked = false,
        booked_by_booking_id = null,
        notes = regexp_replace(
          regexp_replace(COALESCE(notes, ''), ' ?\[blocked: on-site buffer\]', ''),
          ' ?\[blocked: buffer\]', '')
    WHERE booked_by_booking_id = p_booking_id
    AND booked = true
    AND (notes LIKE '%[blocked: on-site buffer]%' OR notes LIKE '%[blocked: buffer]%')
    AND id != v_slot_id;

    -- Re-apply 15-min virtual buffer
    v_buffer_start := v_meeting_start - 15;
    v_buffer_end   := v_meeting_start + 60 + 15;

    FOR v_block IN
      SELECT id FROM demo_availability
      WHERE slot_date = v_slot_date
      AND public.slot_to_minutes(slot_time) >= v_buffer_start
      AND public.slot_to_minutes(slot_time) < v_buffer_end
      AND booked = false
      AND id != v_slot_id
    LOOP
      UPDATE demo_availability
      SET booked = true,
          booked_by_booking_id = p_booking_id,
          notes = COALESCE(NULLIF(notes, ''), '') || ' [blocked: buffer]'
      WHERE id = v_block.id;
    END LOOP;

    UPDATE demo_bookings
    SET meeting_type = 'virtual', video_link = 'https://meet.google.com/mav-hmei-vzi'
    WHERE id = p_booking_id;
  END IF;

  RETURN jsonb_build_object('ok', true);
END;
$function$;

GRANT EXECUTE ON FUNCTION public.change_meeting_type(uuid, text) TO anon, authenticated;
