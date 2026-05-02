/*
  # Create demo_bookings table

  Captures lead information from the "Request Your Demo" flow on the landing page.

  1. New Tables
    - `demo_bookings`
      - `id` (uuid, primary key)
      - `name` (text) — full name
      - `email` (text) — contact email
      - `phone` (text, nullable) — phone number
      - `business_name` (text) — name of the venue/group
      - `num_sites` (text) — how many sites/kitchens
      - `message` (text, nullable) — optional free text
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anonymous INSERT so unauthenticated visitors can submit
    - No SELECT policy for public — only service role can read
*/

CREATE TABLE IF NOT EXISTS demo_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  business_name text NOT NULL,
  num_sites text DEFAULT '1',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a demo booking"
  ON demo_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
