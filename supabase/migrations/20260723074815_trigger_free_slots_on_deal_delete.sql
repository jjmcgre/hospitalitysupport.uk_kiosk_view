-- When a deal is deleted (deal_id set NULL via FK SET NULL), free the booking's slots
-- and mark the booking cancelled so it no longer appears in the diary.

CREATE OR REPLACE FUNCTION public.handle_booking_deal_nulled()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only act when deal_id transitions from a value to NULL
  IF OLD.deal_id IS NOT NULL AND NEW.deal_id IS NULL THEN
    -- Free all slots linked to this booking
    UPDATE demo_availability
    SET booked = false,
        booked_by_booking_id = null,
        notes = regexp_replace(COALESCE(notes, ''), ' ?\[blocked: on-site buffer\]', '')
    WHERE booked_by_booking_id = NEW.id;

    -- Mark booking cancelled
    NEW.status := 'cancelled';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_booking_deal_nulled ON demo_bookings;

CREATE TRIGGER trg_booking_deal_nulled
  BEFORE UPDATE OF deal_id ON demo_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_booking_deal_nulled();
