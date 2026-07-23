-- Fix RLS policies to use profile IDs instead of auth UIDs.
-- The app stores user_profiles.id in created_by_user_id / sourced_by_user_id / etc.
-- But auth.uid() returns the auth UID, so policies must look up auth_user_id.

-- ── organisations ──────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_orgs ON organisations;
CREATE POLICY insert_orgs ON organisations FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_profiles up
    WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid()
  ));

DROP POLICY IF EXISTS update_orgs ON organisations;
CREATE POLICY update_orgs ON organisations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS delete_organisations ON organisations;
CREATE POLICY delete_organisations ON organisations FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── contacts ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_contacts ON contacts;
CREATE POLICY insert_contacts ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_profiles up
    WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid()
  ));

DROP POLICY IF EXISTS update_contacts ON contacts;
CREATE POLICY update_contacts ON contacts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS delete_contacts ON contacts;
CREATE POLICY delete_contacts ON contacts FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── deals ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_deals ON deals;
CREATE POLICY insert_deals ON deals FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_profiles up
    WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid()
  ));

DROP POLICY IF EXISTS update_deals ON deals;
CREATE POLICY update_deals ON deals FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = sourced_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = assigned_to_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS delete_deals ON deals;
CREATE POLICY delete_deals ON deals FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = sourced_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = assigned_to_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = created_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── deal_activity ──────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_activity ON deal_activity;
CREATE POLICY insert_activity ON deal_activity FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_profiles up
    WHERE up.id = user_id AND up.auth_user_id = auth.uid()
  ));