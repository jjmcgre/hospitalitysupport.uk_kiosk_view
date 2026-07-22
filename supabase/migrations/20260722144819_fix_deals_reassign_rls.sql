-- Allow anyone who can currently see a deal to reassign it.
-- The WITH CHECK must not require auth.uid() to match the NEW assigned_to_user_id,
-- because the whole point is to change it to someone else.
-- Admins can always update; sourced/created/assigned users can update (including reassigning away from themselves).

DROP POLICY IF EXISTS update_deals ON deals;

CREATE POLICY update_deals ON deals FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = sourced_by_user_id
    OR auth.uid() = assigned_to_user_id
    OR auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = sourced_by_user_id
    OR auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );
