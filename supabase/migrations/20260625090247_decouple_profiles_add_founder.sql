
-- Give id a default so manual profiles don't need to supply one
ALTER TABLE user_profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Add optional auth link and founder flag
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_founder boolean NOT NULL DEFAULT false;

-- For every existing row, the id IS the auth user id — record that link
UPDATE user_profiles SET auth_user_id = id WHERE auth_user_id IS NULL;

-- Drop the hard FK so profiles can exist without an auth account
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

-- Unique index so one auth user can only have one profile
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_auth_user_id
  ON user_profiles(auth_user_id) WHERE auth_user_id IS NOT NULL;

-- RLS: self-insert (own profile on sign-up)
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = auth_user_id);

-- RLS: admin can create any profile (including manual/no-auth ones)
DROP POLICY IF EXISTS "Admins can insert profiles" ON user_profiles;
CREATE POLICY "Admins can insert profiles" ON user_profiles
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.auth_user_id = auth.uid() AND up.role = 'admin'
    )
  );

-- RLS: update — own profile or admin
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE TO authenticated
  USING (
    auth.uid() = auth_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = auth_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );
