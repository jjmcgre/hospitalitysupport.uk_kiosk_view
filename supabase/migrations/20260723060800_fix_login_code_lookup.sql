-- Fix: don't lowercase the code (codes are case-sensitive), fall back to email if login_email is null
CREATE OR REPLACE FUNCTION public.get_login_email_by_code(p_code text)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
SELECT COALESCE(login_email, email) FROM user_profiles
WHERE login_code = trim(p_code)
LIMIT 1;
$function$;