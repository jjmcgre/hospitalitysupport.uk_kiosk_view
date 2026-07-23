-- Create a SECURITY DEFINER function that returns all user profiles,
-- but redacts login_code and login_email for non-founders (and non-self rows).
-- Founders can see all login codes; everyone can see their own.

CREATE OR REPLACE FUNCTION public.get_team_profiles()
RETURNS TABLE (
  id uuid,
  display_name text,
  role text,
  phone text,
  email text,
  login_code text,
  login_email text,
  introduced_by_user_id uuid,
  is_active boolean,
  is_founder boolean,
  notes text,
  auth_user_id uuid
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT
    up.id,
    up.display_name,
    up.role,
    up.phone,
    up.email,
    CASE
      WHEN up.auth_user_id = auth.uid() THEN up.login_code
      WHEN EXISTS (
        SELECT 1 FROM user_profiles f
        WHERE f.auth_user_id = auth.uid() AND f.is_founder = true
      ) THEN up.login_code
      ELSE NULL
    END AS login_code,
    CASE
      WHEN up.auth_user_id = auth.uid() THEN up.login_email
      WHEN EXISTS (
        SELECT 1 FROM user_profiles f
        WHERE f.auth_user_id = auth.uid() AND f.is_founder = true
      ) THEN up.login_email
      ELSE NULL
    END AS login_email,
    up.introduced_by_user_id,
    up.is_active,
    up.is_founder,
    up.notes,
    up.auth_user_id
  FROM user_profiles up
  WHERE up.is_active = true;
$function$;

GRANT EXECUTE ON FUNCTION public.get_team_profiles() TO authenticated;