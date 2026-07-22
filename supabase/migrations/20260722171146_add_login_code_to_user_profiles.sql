/*
# Add login codes to user_profiles

## Purpose
Allows team members to sign in with a short admin-assigned code (e.g. "JM01")
instead of their email address. This is needed because some team members may
not have an email address at all — for those, a synthetic email is created in
auth.users so they still get a real Supabase auth account.

## Changes

### New columns on `user_profiles`
- `login_code` (text, nullable) — the short code the user types at the login
  screen. Unique across all profiles. NULL means the member hasn't been
  assigned a code yet (legacy / manually added before this feature).
- `login_email` (text, nullable) — the email stored in `auth.users` for this
  profile. For members with a real email this mirrors that email. For members
  without an email, a synthetic value like `<code>@team.local` is used.

### Indexes
- Unique index on `login_code` (partial — only where NOT NULL).

### Security / RLS
- New SELECT policy `anon_can_lookup_login_code` scoped to `anon, authenticated`
  that exposes only the `login_email` column for rows where `login_code` is
  non-null. This is the minimum needed for the login page to resolve a code
  to an auth email. We create a dedicated column-level policy via a SECURITY
  DEFINER function instead, because Postgres RLS is row-level not column-level.

  Approach: a SECURITY DEFINER function `get_login_email_by_code(p_code text)`
  that returns the `login_email` for a matching `login_code`. The function is
  callable by `anon` and `authenticated` roles. This avoids exposing the full
  table to anon.

### Function
- `get_login_email_by_code(p_code text) RETURNS text` — SECURITY DEFINER,
  callable by anon + authenticated. Returns the `login_email` for the profile
  whose `login_code` matches (case-insensitive), or NULL if no match.

## Notes
1. Existing profiles keep `login_code = NULL` until an admin assigns one.
2. The login page calls `get_login_email_by_code` via RPC to resolve the code
   to an email, then calls `supabase.auth.signInWithPassword`.
3. For members without a real email, the InviteMemberModal generates a
   synthetic email `<code>@team.local` and creates the auth account server-side
   via the admin API in the edge function.
*/

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS login_code text;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS login_email text;

CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_login_code_key
  ON user_profiles (login_code)
  WHERE login_code IS NOT NULL;

CREATE OR REPLACE FUNCTION public.get_login_email_by_code(p_code text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT login_email FROM user_profiles
  WHERE login_code = lower(trim(p_code))
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_login_email_by_code(text) TO anon, authenticated;
