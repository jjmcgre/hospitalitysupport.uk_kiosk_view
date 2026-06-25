/*
# Team Chat — internal messaging between team members

## Summary
Creates a real-time team chat where users can send broadcast messages to the whole team
or direct messages to individual users.

## New Tables

### chat_messages
Each row is one message.
- id (uuid PK)
- sender_id (uuid) — auth.uid() of the sender, defaults to current user
- sender_name (text) — display name snapshot at send time
- content (text) — message body, max 4000 chars
- recipient_id (uuid, nullable) — NULL = broadcast to all team; non-null = direct message to that user
- created_at (timestamptz)

## Security
RLS enabled. Read policy: message is visible if:
  - recipient_id IS NULL (broadcast), OR
  - recipient_id = auth.uid() (I'm the recipient), OR
  - sender_id = auth.uid() (I sent it), OR
  - current user is admin

Insert policy: sender_id must equal auth.uid().
No update or delete (messages are immutable).
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_name text NOT NULL DEFAULT '',
  content text NOT NULL CHECK (char_length(content) <= 4000),
  recipient_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_sender ON chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_recipient ON chat_messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at ASC);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_chat_messages" ON chat_messages;
CREATE POLICY "select_chat_messages" ON chat_messages FOR SELECT TO authenticated
  USING (
    recipient_id IS NULL OR
    recipient_id = auth.uid() OR
    sender_id = auth.uid() OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS "insert_chat_messages" ON chat_messages;
CREATE POLICY "insert_chat_messages" ON chat_messages FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid());
