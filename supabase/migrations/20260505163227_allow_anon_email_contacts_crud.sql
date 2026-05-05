/*
  # Allow anon access to email_contacts and email_sends
  
  The marketing dashboard is used without auth, so anon needs full CRUD
  on email_contacts and read/insert on email_sends.
*/

CREATE POLICY "Anon can insert contacts"
  ON email_contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can select contacts"
  ON email_contacts FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anon can update contacts"
  ON email_contacts FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anon can delete contacts"
  ON email_contacts FOR DELETE
  TO anon
  USING (true);

CREATE POLICY "Anon can insert sends"
  ON email_sends FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can select sends"
  ON email_sends FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anon can update sends"
  ON email_sends FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
