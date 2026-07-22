-- Drop the old 3-param overload so only the 4-param version with p_meeting_type remains
DROP FUNCTION IF EXISTS public.claim_slot(uuid, uuid, text);
