/*
# Document Hub — folders, files, and storage bucket

## Summary
Creates a SharePoint-style document hub with folder hierarchy and file metadata.

## New Tables

### document_folders
Hierarchical folder tree. Top-level folders have parent_id = NULL.
- id (uuid PK)
- name (text) — display name
- parent_id (uuid, nullable) — self-reference for sub-folders
- is_admin_only (boolean, default false) — when true only admin users can see/use this folder
- created_by_user_id (uuid) — who created it
- created_at (timestamptz)

### documents
Metadata record for each uploaded file. The actual binary lives in Supabase Storage bucket "documents".
- id (uuid PK)
- folder_id (uuid, nullable) — NULL = root level
- display_name (text) — original filename shown in UI
- storage_path (text) — path inside the "documents" storage bucket
- file_size (bigint) — bytes
- mime_type (text)
- uploaded_by_user_id (uuid)
- uploaded_by_name (text)
- created_at (timestamptz)

## Storage
Creates the "documents" storage bucket (private, 50 MB per file limit) and RLS policies:
- Authenticated users can read and upload
- Admins can delete

## Security
RLS is enabled on both tables.
- Non-admin-only folders: all authenticated users can read/insert; admins can also delete
- Admin-only folders: only users with role='admin' can see or use them
- Documents inherit folder visibility
*/

-- Folders table
CREATE TABLE IF NOT EXISTS document_folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES document_folders(id) ON DELETE CASCADE,
  is_admin_only boolean NOT NULL DEFAULT false,
  created_by_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_doc_folders_parent ON document_folders(parent_id);

ALTER TABLE document_folders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_folders" ON document_folders;
CREATE POLICY "select_folders" ON document_folders FOR SELECT TO authenticated
  USING (
    is_admin_only = false OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS "insert_folders" ON document_folders;
CREATE POLICY "insert_folders" ON document_folders FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS "delete_folders" ON document_folders;
CREATE POLICY "delete_folders" ON document_folders FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

-- Documents metadata table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_id uuid REFERENCES document_folders(id) ON DELETE SET NULL,
  display_name text NOT NULL,
  storage_path text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  mime_type text NOT NULL DEFAULT 'application/octet-stream',
  uploaded_by_user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  uploaded_by_name text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_documents_folder ON documents(folder_id);
CREATE INDEX IF NOT EXISTS idx_documents_created ON documents(created_at DESC);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_documents" ON documents;
CREATE POLICY "select_documents" ON documents FOR SELECT TO authenticated
  USING (
    folder_id IS NULL OR
    EXISTS (
      SELECT 1 FROM document_folders df
      WHERE df.id = documents.folder_id
      AND (
        df.is_admin_only = false OR
        EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
      )
    )
  );

DROP POLICY IF EXISTS "insert_documents" ON documents;
CREATE POLICY "insert_documents" ON documents FOR INSERT TO authenticated
  WITH CHECK (
    folder_id IS NULL OR
    EXISTS (
      SELECT 1 FROM document_folders df
      WHERE df.id = documents.folder_id
      AND (
        df.is_admin_only = false OR
        EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
      )
    )
  );

DROP POLICY IF EXISTS "delete_documents" ON documents;
CREATE POLICY "delete_documents" ON documents FOR DELETE TO authenticated
  USING (
    uploaded_by_user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

-- Storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('documents', 'documents', false, 52428800, NULL)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
DROP POLICY IF EXISTS "auth_read_documents_bucket" ON storage.objects;
CREATE POLICY "auth_read_documents_bucket" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'documents');

DROP POLICY IF EXISTS "auth_upload_documents_bucket" ON storage.objects;
CREATE POLICY "auth_upload_documents_bucket" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents');

DROP POLICY IF EXISTS "auth_delete_documents_bucket" ON storage.objects;
CREATE POLICY "auth_delete_documents_bucket" ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'documents' AND (
      (storage.foldername(name))[1] = auth.uid()::text OR
      EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
    )
  );
