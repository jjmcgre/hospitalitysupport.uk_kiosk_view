-- Allow an authenticated user to claim an unclaimed profile (auth_user_id IS NULL)
-- by setting auth_user_id to their own uid.
-- The unique index on auth_user_id prevents claiming more than one profile.
CREATE POLICY "Authenticated users can claim unclaimed profile" ON user_profiles
  FOR UPDATE TO authenticated
  USING (auth_user_id IS NULL)
  WITH CHECK (auth_user_id = auth.uid());
