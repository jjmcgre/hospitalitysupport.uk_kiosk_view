-- Update reschedule_meeting to handle 15-min buffer for all meeting types

CREATE OR REPLACE FUNCTION public.reschedule_meeting(
  p_booking_id   uuid,
  p_new_slot_id  uuid,
  p_meeting_type text DEFAULT 'virtual'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_old_slot_id      uuid;
  v_old_date         date;
  v_old_time         text;
  v_new_date         date;
  v_new_time         text;
  v_new_duration     int;
  v_new_booked       boolean;
  v_meeting_start    int;
  v_buffer_start     int;
  v_buffer_end       int;
  v_onsite_count     int;
  v_conflict         record;
  v_block            record;
  v_video_link       text;
  v_current_type     text;
BEGIN
  IF p_meeting_type NOT IN ('virtual', 'onsite') THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Invalid meeting type');
  END IF;

  SELECT meeting_type, video_link INTO v_current_type, v_video_link
  FROM demo_bookings WHERE id = p_booking_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Booking not found');
  END IF;

  SELECT slot_date, slot_time, duration_mins, booked
  INTO v_new_date, v_new_time, v_new_duration, v_new_booked
  FROM demo_availability WHERE id = p_new_slot_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'New slot not found');
  END IF;

  IF v_new_booked THEN
    RETURN jsonb_build_object('ok', false, 'error', 'New slot is already booked');
  END IF;

  -- Find the primary slot for this booking (non-buffer)
  SELECT id, slot_date, slot_time INTO v_old_slot_id, v_old_date, v_old_time
  FROM demo_availability
  WHERE booked_by_booking_id = p_booking_id
  AND (notes IS NULL OR (notes NOT LIKE '%[blocked: on-site buffer]%' AND notes NOT LIKE '%[blocked: buffer]%'))
  ORDER BY slot_time ASC
  LIMIT 1;

  -- Free ALL slots associated with this booking (primary + buffer)
  UPDATE demo_availability
  SET booked = false,
      booked_by_booking_id = null,
      notes = regexp_replace(
        regexp_replace(COALESCE(notes, ''), ' ?\[blocked: on-site buffer\]', ''),
        ' ?\[blocked: buffer\]', '')
  WHERE booked_by_booking_id = p_booking_id;

  v_meeting_start := public.slot_to_minutes(v_new_time);

  -- 15-minute buffer either side for ALL meeting types
  v_buffer_start := v_meeting_start - 15;
  v_buffer_end   := v_meeting_start + 60 + 15;

  -- Onsite meetings get an additional travel buffer
  IF p_meeting_type = 'onsite' THEN
    v_buffer_start := v_meeting_start - 120;
    v_buffer_end   := v_meeting_start + 180;

    SELECT count(DISTINCT b.id) INTO v_onsite_count
    FROM demo_availability a
    JOIN demo_bookings b ON b.id = a.booked_by_booking_id
    WHERE a.slot_date = v_new_date
    AND a.booked = true
    AND b.meeting_type = 'onsite'
    AND b.id != p_booking_id
    AND (a.notes IS NULL OR (a.notes NOT LIKE '%[blocked: on-site buffer]%' AND a.notes NOT LIKE '%[blocked: buffer]%'));

    IF v_onsite_count >= 2 THEN
      IF v_old_slot_id IS NOT NULL THEN
        UPDATE demo_availability SET booked = true, booked_by_booking_id = p_booking_id WHERE id = v_old_slot_id;
      END IF;
      RETURN jsonb_build_object('ok', false, 'error', 'Maximum 2 on-site visits per day already reached');
    END IF;
  END IF;

  -- Check for conflicts with already-booked slots in the buffer window
  FOR v_conflict IN
    SELECT a.slot_time, COALESCE(b.name, 'another booking') AS name, COALESCE(b.meeting_type, 'unknown') AS meeting_type
    FROM demo_availability a
    LEFT JOIN demo_bookings b ON b.id = a.booked_by_booking_id
    WHERE a.slot_date = v_new_date
    AND public.slot_to_minutes(a.slot_time) >= v_buffer_start
    AND public.slot_to_minutes(a.slot_time) < v_buffer_end
    AND a.booked = true
    AND a.id != p_new_slot_id
    AND (b.id IS NULL OR b.id != p_booking_id)
  LOOP
    IF v_old_slot_id IS NOT NULL THEN
      UPDATE demo_availability SET booked = true, booked_by_booking_id = p_booking_id WHERE id = v_old_slot_id;
    END IF;
    RETURN jsonb_build_object('ok', false, 'error',
      format('Calendar conflict at %s — this time overlaps an existing booking.', v_conflict.slot_time));
  END LOOP;

  -- Block unbooked slots in the buffer window
  FOR v_block IN
    SELECT id FROM demo_availability
    WHERE slot_date = v_new_date
    AND public.slot_to_minutes(slot_time) >= v_buffer_start
    AND public.slot_to_minutes(slot_time) < v_buffer_end
    AND booked = false
    AND id != p_new_slot_id
  LOOP
    UPDATE demo_availability
    SET booked = true,
        booked_by_booking_id = p_booking_id,
        notes = COALESCE(NULLIF(notes, ''), '') ||
          CASE WHEN p_meeting_type = 'onsite' THEN ' [blocked: on-site buffer]' ELSE ' [blocked: buffer]' END
    WHERE id = v_block.id;
  END LOOP;

  -- Claim the new slot
  UPDATE demo_availability
  SET booked = true, booked_by_booking_id = p_booking_id
  WHERE id = p_new_slot_id;

  v_video_link := CASE
    WHEN p_meeting_type = 'virtual' THEN COALESCE(NULLIF(v_video_link, ''), 'https://meet.google.com/mav-hmei-vzi')
    ELSE ''
  END;

  UPDATE demo_bookings
  SET video_link   = v_video_link,
      meeting_type = p_meeting_type,
      status       = 'confirmed'
  WHERE id = p_booking_id;

  RETURN jsonb_build_object(
    'ok', true,
    'old_date', v_old_date,
    'old_time', v_old_time,
    'new_date', v_new_date,
    'new_time', v_new_time,
    'new_duration', v_new_duration,
    'video_link', v_video_link,
    'meeting_type', p_meeting_type
  );
END;
$function$;

GRANT EXECUTE ON FUNCTION public.reschedule_meeting(uuid, uuid, text) TO anon, authenticated;
