/*
# Add user profiles and lead attribution

## Summary
Adds team member profiles and the ability to track who sourced each lead.

## New Tables

### user_profiles
Stores display names for team members who log into the admin tool.
- `id` (uuid, PK) — matches the Supabase auth user ID
- `display_name` (text) — the name shown in the leaderboard and on leads
- `created_at` (timestamptz)

## Modified Tables

### demo_bookings
Two new nullable columns for lead attribution:
- `sourced_by_user_id` (uuid, nullable) — auth user ID of the team member who sourced this lead
- `sourced_by_name` (text, nullable) — denormalized display name for fast display without a join

## Security

### user_profiles RLS
- Authenticated users can read all profiles (needed for leaderboard)
- Authenticated users can only insert/update their own profile

### demo_bookings
- Existing policies already allow authenticated users to update rows
- New columns are covered by the existing permissive UPDATE policy

## Notes
1. sourced_by_name is stored alongside sourced_by_user_id to avoid needing a join on every enquiries page load
2. Existing leads will have NULL for both attribution columns — they will show as "Unclaimed"
3. email confirmation is OFF — users can log in immediately after signing up
*/

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can read all profiles" ON user_profiles;
CREATE POLICY "Authenticated users can read all profiles" ON user_profiles
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Add attribution columns to demo_bookings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'demo_bookings' AND column_name = 'sourced_by_user_id'
  ) THEN
    ALTER TABLE demo_bookings ADD COLUMN sourced_by_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'demo_bookings' AND column_name = 'sourced_by_name'
  ) THEN
    ALTER TABLE demo_bookings ADD COLUMN sourced_by_name text;
  END IF;
END $$;

-- Index for filtering leads by user
CREATE INDEX IF NOT EXISTS idx_demo_bookings_sourced_by_user_id ON demo_bookings(sourced_by_user_id);
