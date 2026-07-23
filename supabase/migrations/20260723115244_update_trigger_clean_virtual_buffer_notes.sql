-- Update trigger to also clean [blocked: buffer] notes (virtual meeting buffer)

CREATE OR REPLACE FUNCTION public.handle_booking_deal_nulled()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF OLD.deal_id IS NOT NULL AND NEW.deal_id IS NULL THEN
    UPDATE demo_availability
    SET booked = false,
        booked_by_booking_id = null,
        notes = regexp_replace(
          regexp_replace(COALESCE(notes, ''), ' ?\[blocked: on-site buffer\]', ''),
          ' ?\[blocked: buffer\]', '')
    WHERE booked_by_booking_id = NEW.id;

    NEW.status := 'cancelled';
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS trg_booking_deal_nulled ON demo_bookings;
CREATE TRIGGER trg_booking_deal_nulled
  BEFORE UPDATE OF deal_id ON demo_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_booking_deal_nulled();
