/*
  # Allow anonymous users to mark a slot as booked on confirm

  When a visitor confirms their booking, the frontend updates the chosen
  demo_availability row to set booked=true and link the booking ID.
  Without this policy the UPDATE is silently dropped by RLS.

  Restriction: anon can only UPDATE rows where booked is currently false
  (prevents overwriting already-booked slots) and can only set booked=true.
*/

CREATE POLICY "Public can claim an available slot"
  ON demo_availability
  FOR UPDATE
  TO anon
  USING (booked = false)
  WITH CHECK (booked = true);
