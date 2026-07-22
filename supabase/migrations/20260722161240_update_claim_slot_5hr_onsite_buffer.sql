-- Update claim_slot to block 5 hours total for on-site (meeting slot + 2 before + 2 after)
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
  v_adjacent_id    uuid;
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
    SELECT count(*) INTO v_onsite_count
    FROM demo_availability a
    JOIN demo_bookings b ON b.id = a.booked_by_booking_id
    WHERE a.slot_date = v_slot_date
      AND a.booked = true
      AND b.meeting_type = 'onsite';

    IF v_onsite_count >= 2 THEN
      RETURN jsonb_build_object('ok', false, 'error', 'Maximum 2 on-site visits per day already reached');
    END IF;

    -- Block 2 slots before (travel time)
    FOR v_block IN
      SELECT id FROM demo_availability
      WHERE slot_date = v_slot_date
        AND slot_time < v_slot_time
        AND booked = false
      ORDER BY slot_time DESC
      LIMIT 2
    LOOP
      UPDATE demo_availability
      SET booked = true,
          booked_by_booking_id = p_booking_id,
          notes = COALESCE(notes, '') || ' [blocked: on-site buffer]'
      WHERE id = v_block.id;
    END LOOP;

    -- Block 2 slots after (travel time)
    FOR v_block IN
      SELECT id FROM demo_availability
      WHERE slot_date = v_slot_date
        AND slot_time > v_slot_time
        AND booked = false
      ORDER BY slot_time ASC
      LIMIT 2
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
