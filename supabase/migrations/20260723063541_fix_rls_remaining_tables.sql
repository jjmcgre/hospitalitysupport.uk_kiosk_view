-- Fix remaining RLS policies to use auth_user_id lookup instead of direct auth.uid() comparison

-- ── chat_messages ──────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_chat_messages ON chat_messages;
CREATE POLICY insert_chat_messages ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_profiles up
    WHERE up.id = sender_id AND up.auth_user_id = auth.uid()
  ));

DROP POLICY IF EXISTS select_chat_messages ON chat_messages;
CREATE POLICY select_chat_messages ON chat_messages FOR SELECT
  TO authenticated
  USING (
    recipient_id IS NULL
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = recipient_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = sender_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── documents ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS insert_documents ON documents;
CREATE POLICY insert_documents ON documents FOR INSERT
  TO authenticated
  WITH CHECK (
    (folder_id IS NULL OR EXISTS (
      SELECT 1 FROM document_folders df
      WHERE df.id = documents.folder_id AND (
        df.is_admin_only = false
        OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
      )
    ))
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
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = uploaded_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );

-- ── demo_bookings ──────────────────────────────────────────────────
DROP POLICY IF EXISTS delete_demo_bookings ON demo_bookings;
CREATE POLICY delete_demo_bookings ON demo_bookings FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = sourced_by_user_id AND up.auth_user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM user_profiles up WHERE up.auth_user_id = auth.uid() AND up.role = 'admin')
  );