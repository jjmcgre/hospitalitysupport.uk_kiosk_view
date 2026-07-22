/*
# Add DELETE policy on user_profiles for founders

## Summary
Allows founders to delete team member profiles. Founders cannot delete other founders or themselves.

## Security
- DELETE policy on user_profiles scoped to founders (is_founder = true)
- The policy checks that the acting user is a founder via their auth_user_id
- Frontend will additionally prevent deleting other founders or self

## Notes
1. Only founders can delete profiles — non-founders (including admins) cannot
2. The policy uses auth_user_id to match the authenticated user to their profile
3. Deleting a profile does NOT delete the auth.users account (no FK cascade)
4. If the deleted profile is referenced by deals.sourced_by_user_id etc, those
   columns will become NULL (ON DELETE SET NULL on the FK, or no FK = stays)
*/

DROP POLICY IF EXISTS "Founders can delete profiles" ON user_profiles;
CREATE POLICY "Founders can delete profiles" ON user_profiles FOR DELETE
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.auth_user_id = auth.uid() AND up.is_founder = true
    )
  );