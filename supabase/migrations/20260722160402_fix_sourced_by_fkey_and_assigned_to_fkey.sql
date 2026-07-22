-- Drop the FK that incorrectly ties sourced_by_user_id to auth.users
-- These columns store user_profiles IDs, not auth.users IDs
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_sourced_by_user_id_fkey;

-- Also drop assigned_to FK if it exists and points to auth.users
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_assigned_to_user_id_fkey;
