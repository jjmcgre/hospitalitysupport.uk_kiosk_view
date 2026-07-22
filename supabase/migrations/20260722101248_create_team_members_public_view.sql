/*
# Create team_members_public view for booking attribution

1. New Views
   - team_members_public: exposes only id and display_name from user_profiles
   - Used by the public booking modal to look up referrer name from share link ?ref= param

2. Security
   - GRANT SELECT to anon and authenticated so the public booking form can look up the referrer's name
   - The view only exposes id and display_name — no emails, phones, or other sensitive data
   - View runs with owner (postgres) privileges, bypassing RLS on user_profiles
*/

CREATE OR REPLACE VIEW public.team_members_public AS
SELECT id, display_name FROM public.user_profiles;

GRANT SELECT ON public.team_members_public TO anon, authenticated;