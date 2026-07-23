-- Revert RLS policies back to auth.uid() direct comparison.
-- All *_user_id columns FK to auth.users(id), so they store the auth UID.

-- ── organisations ──────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_orgs ON organisations;
CREATE POLICY insert_orgs ON organisations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by_user_id);

DROP POLICY IF EXISTS update_orgs ON organisations;
CREATE POLICY update_orgs ON organisations FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS delete_organisations ON organisations;
CREATE POLICY delete_organisations ON organisations FOR DELETE
  TO authenticated
  USING (
    auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── contacts ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_contacts ON contacts;
CREATE POLICY insert_contacts ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by_user_id);

DROP POLICY IF EXISTS update_contacts ON contacts;
CREATE POLICY update_contacts ON contacts FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS delete_contacts ON contacts;
CREATE POLICY delete_contacts ON contacts FOR DELETE
  TO authenticated
  USING (
    auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── deals ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_deals ON deals;
CREATE POLICY insert_deals ON deals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by_user_id);

DROP POLICY IF EXISTS update_deals ON deals;
CREATE POLICY update_deals ON deals FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = sourced_by_user_id
    OR auth.uid() = assigned_to_user_id
    OR auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS delete_deals ON deals;
CREATE POLICY delete_deals ON deals FOR DELETE
  TO authenticated
  USING (
    auth.uid() = sourced_by_user_id
    OR auth.uid() = assigned_to_user_id
    OR auth.uid() = created_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── deal_activity ──────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_activity ON deal_activity;
CREATE POLICY insert_activity ON deal_activity FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ── chat_messages ──────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_chat_messages ON chat_messages;
CREATE POLICY insert_chat_messages ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS select_chat_messages ON chat_messages;
CREATE POLICY select_chat_messages ON chat_messages FOR SELECT
  TO authenticated
  USING (
    recipient_id IS NULL
    OR recipient_id = auth.uid()
    OR sender_id = auth.uid()
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── documents ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_documents ON documents;
CREATE POLICY insert_documents ON documents FOR INSERT
  TO authenticated
  WITH CHECK (
    folder_id IS NULL OR EXISTS (
      SELECT 1 FROM document_folders df
      WHERE df.id = documents.folder_id AND (
        df.is_admin_only = false
        OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
      )
    )
  );

DROP POLICY IF EXISTS select_documents ON documents;
CREATE POLICY select_documents ON documents FOR SELECT
  TO authenticated
  USING (
    folder_id IS NULL OR EXISTS (
      SELECT 1 FROM document_folders df
      WHERE df.id = documents.folder_id AND (
        df.is_admin_only = false
        OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
      )
    )
  );

DROP POLICY IF EXISTS delete_documents ON documents;
CREATE POLICY delete_documents ON documents FOR DELETE
  TO authenticated
  USING (
    auth.uid() = uploaded_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── demo_bookings ──────────────────────────────────────────────────
DROP POLICY IF EXISTS delete_demo_bookings ON demo_bookings;
CREATE POLICY delete_demo_bookings ON demo_bookings FOR DELETE
  TO authenticated
  USING (
    auth.uid() = sourced_by_user_id
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );