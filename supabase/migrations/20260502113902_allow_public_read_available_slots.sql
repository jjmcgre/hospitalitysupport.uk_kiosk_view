/*
  # Allow public read of available (unbooked) slots

  Visitors on the landing page need to see open slots to pick one.
  We only expose slots that are not yet booked — booked or past slots
  are not relevant and should not be visible publicly.

  1. Changes
     - Add SELECT policy on demo_availability for anonymous users
       restricted to rows where booked = false
  2. Security
     - Only unbooked slots are visible to the public
     - INSERT/UPDATE/DELETE remain restricted (no public write access)
*/

CREATE POLICY "Public can view available unbooked slots"
  ON demo_availability
  FOR SELECT
  TO anon
  USING (booked = false);
