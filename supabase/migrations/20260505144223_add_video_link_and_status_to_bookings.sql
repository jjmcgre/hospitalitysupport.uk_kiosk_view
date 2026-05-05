/*
  # Add video_link and status to demo_bookings

  1. Changes to demo_bookings
    - `video_link` (text) — auto-generated Google Meet URL stored at booking time
    - `status` (text) — tracks booking lifecycle: 'pending' | 'confirmed' | 'cancelled'

  2. Notes
    - Both columns have safe defaults so existing rows are unaffected
    - No data is dropped
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'demo_bookings' AND column_name = 'video_link'
  ) THEN
    ALTER TABLE demo_bookings ADD COLUMN video_link text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'demo_bookings' AND column_name = 'status'
  ) THEN
    ALTER TABLE demo_bookings ADD COLUMN status text DEFAULT 'confirmed';
  END IF;
END $$;
