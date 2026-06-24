
-- Extend user_profiles with role, phone, introducer tracking
ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'salesperson',
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS introduced_by_user_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS notes text;

-- Update existing update policy to allow admins to edit any profile
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE TO authenticated
  USING (
    auth.uid() = id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

-- Add city/postcode to demo_bookings for inbound duplicate detection
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'demo_bookings' AND column_name = 'city') THEN
    ALTER TABLE demo_bookings ADD COLUMN city text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'demo_bookings' AND column_name = 'postcode') THEN
    ALTER TABLE demo_bookings ADD COLUMN postcode text;
  END IF;
END $$;

-- Organisations: the unique venue/company entity
CREATE TABLE IF NOT EXISTS organisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trading_name text NOT NULL,
  address_line1 text,
  city text,
  postcode text,
  county text,
  website text,
  org_type text NOT NULL DEFAULT 'pub',
  num_sites integer NOT NULL DEFAULT 1,
  notes text,
  org_key text GENERATED ALWAYS AS (
    lower(regexp_replace(coalesce(trading_name, ''), '\s+', '', 'g')) ||
    '|' ||
    lower(regexp_replace(coalesce(postcode, ''), '\s+', '', 'g'))
  ) STORED,
  created_by_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Unique only when a real postcode is present — distinguishes "Brown Cow Bradford" from "Brown Cow Leeds"
CREATE UNIQUE INDEX IF NOT EXISTS idx_orgs_org_key
  ON organisations(org_key)
  WHERE postcode IS NOT NULL AND postcode != '';

CREATE INDEX IF NOT EXISTS idx_orgs_trading_name ON organisations(lower(trading_name));

ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_orgs" ON organisations FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_orgs" ON organisations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by_user_id);
CREATE POLICY "update_orgs" ON organisations FOR UPDATE TO authenticated
  USING (
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

-- Contacts: people at an organisation
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  job_title text,
  email text,
  phone text,
  is_primary boolean NOT NULL DEFAULT false,
  created_by_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contacts_org_id ON contacts(org_id);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_contacts" ON contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_contacts" ON contacts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by_user_id);
CREATE POLICY "update_contacts" ON contacts FOR UPDATE TO authenticated
  USING (
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );
CREATE POLICY "delete_contacts" ON contacts FOR DELETE TO authenticated
  USING (
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

-- Deals: the pipeline record linking an org to a stage and a salesperson
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  primary_contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  stage text NOT NULL DEFAULT 'new',
  source text NOT NULL DEFAULT 'direct',
  confidence text NOT NULL DEFAULT 'warm',
  sourced_by_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  sourced_by_name text,
  assigned_to_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_to_name text,
  commission_status text NOT NULL DEFAULT 'pending',
  next_action text,
  next_action_date date,
  num_sites integer NOT NULL DEFAULT 1,
  inbound_lead_id uuid REFERENCES demo_bookings(id) ON DELETE SET NULL,
  video_link text,
  lost_reason text,
  handoff_note text,
  commission_paid_at timestamptz,
  commission_paid_by_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  won_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_deals_org_id ON deals(org_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_sourced_by ON deals(sourced_by_user_id);
CREATE INDEX IF NOT EXISTS idx_deals_next_action_date ON deals(next_action_date);
CREATE INDEX IF NOT EXISTS idx_deals_commission_status ON deals(commission_status);

ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_deals" ON deals FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_deals" ON deals FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by_user_id);
CREATE POLICY "update_deals" ON deals FOR UPDATE TO authenticated
  USING (
    auth.uid() = sourced_by_user_id OR
    auth.uid() = assigned_to_user_id OR
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  )
  WITH CHECK (
    auth.uid() = sourced_by_user_id OR
    auth.uid() = assigned_to_user_id OR
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

-- Deal activity: immutable audit log — no UPDATE or DELETE policies
CREATE TABLE IF NOT EXISTS deal_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name text NOT NULL,
  action_type text NOT NULL,
  payload jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_deal_activity_deal_id ON deal_activity(deal_id);
CREATE INDEX IF NOT EXISTS idx_deal_activity_created_at ON deal_activity(created_at DESC);

ALTER TABLE deal_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_activity" ON deal_activity FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_activity" ON deal_activity FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
