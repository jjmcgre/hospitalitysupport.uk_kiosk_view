/*
  # Create claim_slot RPC function

  This function atomically:
    1. Marks a demo_availability slot as booked (only if it's still free)
    2. Sets booked_by_booking_id on that slot
    3. Updates demo_bookings with the generated video_link and status

  Running as SECURITY DEFINER so it bypasses RLS and the updates always succeed.
  The function validates inputs before making any changes.
*/

CREATE OR REPLACE FUNCTION claim_slot(
  p_slot_id        uuid,
  p_booking_id     uuid,
  p_video_link     text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_slot_booked boolean;
BEGIN
  -- Check the slot exists and is still available
  SELECT booked INTO v_slot_booked
  FROM demo_availability
  WHERE id = p_slot_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Slot not found');
  END IF;

  IF v_slot_booked THEN
    RETURN jsonb_build_object('ok', false, 'error', 'Slot already booked');
  END IF;

  -- Mark slot as booked
  UPDATE demo_availability
  SET booked = true,
      booked_by_booking_id = p_booking_id
  WHERE id = p_slot_id;

  -- Attach video link and status to the booking
  UPDATE demo_bookings
  SET video_link = p_video_link,
      status     = 'confirmed'
  WHERE id = p_booking_id;

  RETURN jsonb_build_object('ok', true);
END;
$$;
