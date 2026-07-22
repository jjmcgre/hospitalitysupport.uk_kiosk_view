-- Drop the FK constraint that blocks assigning to manually-created user_profiles
-- (most profiles don't have auth.users accounts)
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_assigned_to_user_id_fkey;
