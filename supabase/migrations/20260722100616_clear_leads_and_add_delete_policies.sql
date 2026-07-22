/*
# Clear all existing leads and add delete policies

1. Data Changes
   - DELETE all rows from deals (cascades to deal_activity via FK ON DELETE CASCADE)
   - DELETE all rows from demo_bookings
   - DELETE all rows from contacts
   - DELETE all rows from organisations (cascades to contacts and deals)
   - This wipes all existing leads, bookings, organisations, contacts, and activity history.

2. Security Changes
   - Add DELETE policy on deals — allows the deal's sourcer, assignee, creator, or any admin to delete
   - Add DELETE policy on organisations — allows the org creator or admin to delete
   - Add DELETE policy on contacts — allows the contact creator or admin to delete
   - Add DELETE policy on demo_bookings — allows authenticated users to delete (admin-managed)

3. Important Notes
   - Deleting a deal cascades to deal_activity automatically (FK ON DELETE CASCADE).
   - Deleting an organisation cascades to its contacts and deals (FK ON DELETE CASCADE).
   - Deleting a demo_booking sets deals.inbound_lead_id to NULL (FK ON DELETE SET NULL).
   - These delete policies match the same ownership logic used in the UPDATE policies.
*/

DELETE FROM deal_activity;
DELETE FROM deals;
DELETE FROM demo_bookings;
DELETE FROM contacts;
DELETE FROM organisations;

DROP POLICY IF EXISTS "delete_deals" ON deals;
CREATE POLICY "delete_deals" ON deals FOR DELETE
  TO authenticated USING (
    auth.uid() = sourced_by_user_id OR
    auth.uid() = assigned_to_user_id OR
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS "delete_organisations" ON organisations;
CREATE POLICY "delete_organisations" ON organisations FOR DELETE
  TO authenticated USING (
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS "delete_contacts" ON contacts;
CREATE POLICY "delete_contacts" ON contacts FOR DELETE
  TO authenticated USING (
    auth.uid() = created_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );

DROP POLICY IF EXISTS "delete_demo_bookings" ON demo_bookings;
CREATE POLICY "delete_demo_bookings" ON demo_bookings FOR DELETE
  TO authenticated USING (
    auth.uid() = sourced_by_user_id OR
    EXISTS (SELECT 1 FROM user_profiles up WHERE up.id = auth.uid() AND up.role = 'admin')
  );