/*
  # Email Campaign Tables

  ## Summary
  Creates the full schema for outbound email campaign management including contacts,
  sends, and per-event tracking (opens, clicks, bounces, unsubscribes).

  ## New Tables

  ### email_contacts
  - Prospects / contacts to be emailed
  - Tracks name, email, business, status (active/unsubscribed/bounced)
  - Stores which campaign and stage they are currently in

  ### email_sends
  - One row per email sent to a contact
  - References the campaign id and email id from frontend data
  - Stores the Resend message_id for webhook correlation
  - Tracks sent_at, opened_at, clicked_at

  ### email_events
  - Raw event log from Resend webhooks and pixel pings
  - Types: opened, clicked, bounced, unsubscribed, delivered, failed

  ## Security
  - RLS enabled on all tables
  - Anon role can INSERT into email_events (needed for tracking pixel)
  - Authenticated users can read/write all campaign data
*/

-- Contacts
CREATE TABLE IF NOT EXISTS email_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL,
  business_name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active', -- active | unsubscribed | bounced
  current_campaign_id text NOT NULL DEFAULT '',
  current_stage integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT email_contacts_email_unique UNIQUE (email)
);

ALTER TABLE email_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read contacts"
  ON email_contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contacts"
  ON email_contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contacts"
  ON email_contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON email_contacts FOR DELETE
  TO authenticated
  USING (true);

-- Sends
CREATE TABLE IF NOT EXISTS email_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id uuid NOT NULL REFERENCES email_contacts(id) ON DELETE CASCADE,
  campaign_id text NOT NULL DEFAULT '',
  email_id integer NOT NULL DEFAULT 0,
  stage integer NOT NULL DEFAULT 1,
  subject text NOT NULL DEFAULT '',
  resend_message_id text NOT NULL DEFAULT '',
  sent_at timestamptz NOT NULL DEFAULT now(),
  opened_at timestamptz,
  clicked_at timestamptz,
  bounced_at timestamptz,
  open_count integer NOT NULL DEFAULT 0,
  click_count integer NOT NULL DEFAULT 0
);

ALTER TABLE email_sends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read sends"
  ON email_sends FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sends"
  ON email_sends FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sends"
  ON email_sends FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Events (raw log)
CREATE TABLE IF NOT EXISTS email_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  send_id uuid REFERENCES email_sends(id) ON DELETE CASCADE,
  contact_id uuid REFERENCES email_contacts(id) ON DELETE CASCADE,
  resend_message_id text NOT NULL DEFAULT '',
  event_type text NOT NULL DEFAULT '', -- opened | clicked | bounced | unsubscribed | delivered | failed
  url text,
  raw jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read events"
  ON email_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON email_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow anon to insert events (tracking pixel + webhook receiver)
CREATE POLICY "Anon can insert events for tracking"
  ON email_events FOR INSERT
  TO anon
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_email_sends_contact_id ON email_sends(contact_id);
CREATE INDEX IF NOT EXISTS idx_email_sends_resend_message_id ON email_sends(resend_message_id);
CREATE INDEX IF NOT EXISTS idx_email_events_resend_message_id ON email_events(resend_message_id);
CREATE INDEX IF NOT EXISTS idx_email_events_send_id ON email_events(send_id);
CREATE INDEX IF NOT EXISTS idx_email_events_contact_id ON email_events(contact_id);
