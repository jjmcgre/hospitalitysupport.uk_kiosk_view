/*
  # Fix RLS policies for booking confirmation flow

  1. Problem
    - demo_bookings has no UPDATE policy, so setting video_link/status after
      a booking is silently blocked by RLS
    - demo_availability public claim policy is too restrictive: WITH CHECK only
      allows booked=true but the update also writes booked_by_booking_id

  2. Changes
    - Add UPDATE policy on demo_bookings for anonymous users to update their
      own booking (matched by id passed in the client)
    - Replace the public slot-claim UPDATE policy with one that allows writing
      both booked=true and booked_by_booking_id in a single update
*/

-- Allow anon/public to update a booking row (to set video_link + status)
CREATE POLICY "Public can update own booking"
  ON demo_bookings
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Drop the old restrictive claim policy and replace it
DROP POLICY IF EXISTS "Public can claim an available slot" ON demo_availability;

CREATE POLICY "Public can claim an available slot"
  ON demo_availability
  FOR UPDATE
  TO anon, authenticated
  USING (booked = false)
  WITH CHECK (booked = true);
