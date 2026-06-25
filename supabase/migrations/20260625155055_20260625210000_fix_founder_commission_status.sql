/*
# Fix commission_status for founder won deals

## Summary
Founders' deals should never enter the commission approval workflow because
their revenue goes to the business, not to them personally.

## Changes
1. Updates any existing won deals where the sourcer is a founder
   (is_founder = true in user_profiles) from commission_status = 'pending'
   or 'approved' to 'n/a'.

## Notes
- This is a one-time data fix for deals that were won before this logic was in place.
- Going forward, the application sets commission_status = 'n/a' automatically
  when a founder advances a deal to 'won'.
- Safe to re-run: the WHERE clause only matches rows that still have the wrong status.
*/

UPDATE deals
SET
  commission_status = 'n/a',
  updated_at = now()
WHERE
  stage = 'won'
  AND commission_status IN ('pending', 'approved', 'flagged')
  AND sourced_by_user_id IN (
    SELECT id FROM user_profiles WHERE is_founder = true
  );
