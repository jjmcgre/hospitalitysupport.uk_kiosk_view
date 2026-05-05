/*
  # Allow anon to read booked availability slots

  The Diary page runs without authentication and needs to query booked slots
  to display the Meetings tab. Currently the only SELECT policy for anon
  restricts to booked = false, so the Meetings tab always returns empty.

  Also allow anon to read all demo_bookings rows so the Diary can join
  booking details to each booked slot.
*/

CREATE POLICY "Public can view booked slots"
  ON demo_availability
  FOR SELECT
  TO anon, authenticated
  USING (booked = true);

CREATE POLICY "Public can read all bookings"
  ON demo_bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);
