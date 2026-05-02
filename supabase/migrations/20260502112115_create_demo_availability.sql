/*
  # Create demo_availability table

  Lets the team manage available demo slots and see which are booked.

  1. New Tables
    - `demo_availability`
      - `id` (uuid, primary key)
      - `slot_date` (date) — the date of the slot
      - `slot_time` (text) — e.g. "10:00", "14:30"
      - `duration_mins` (int) — default 30
      - `booked` (boolean) — false = available, true = booked
      - `booked_by_booking_id` (uuid, nullable) — links to demo_bookings
      - `notes` (text) — internal notes
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Authenticated users (admin) can do everything
    - Anonymous users can only SELECT available (unbooked) slots — so the public form can show availability
*/

CREATE TABLE IF NOT EXISTS demo_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_date date NOT NULL,
  slot_time text NOT NULL,
  duration_mins int DEFAULT 30,
  booked boolean DEFAULT false,
  booked_by_booking_id uuid REFERENCES demo_bookings(id) ON DELETE SET NULL,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage availability"
  ON demo_availability
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert slots"
  ON demo_availability
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update slots"
  ON demo_availability
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete slots"
  ON demo_availability
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Public can view available slots"
  ON demo_availability
  FOR SELECT
  TO anon
  USING (booked = false AND slot_date >= CURRENT_DATE);
