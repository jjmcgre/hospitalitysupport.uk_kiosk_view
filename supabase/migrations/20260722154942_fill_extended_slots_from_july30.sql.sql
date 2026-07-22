/*
  Fill in the 9-slot evening/extended pattern for weekdays from 30 July 2026 onward.
  Adds: 07:00,08:30,10:00,11:30,13:00,14:30,16:00,17:30,19:00
  Skips any date/time that already exists.
*/
DO $$
DECLARE
  d date;
  t text;
  times text[] := ARRAY['07:00','08:30','10:00','11:30','13:00','14:30','16:00','17:30','19:00'];
BEGIN
  FOR d IN
    SELECT gs::date
    FROM generate_series('2026-07-30'::date, '2026-12-31'::date, '1 day') AS gs
    WHERE EXTRACT(DOW FROM gs) BETWEEN 1 AND 5
  LOOP
    FOREACH t IN ARRAY times LOOP
      INSERT INTO demo_availability (slot_date, slot_time, duration_mins, booked, notes)
      SELECT d, t, 60, false, ''
      WHERE NOT EXISTS (
        SELECT 1 FROM demo_availability WHERE slot_date = d AND slot_time = t
      );
    END LOOP;
  END LOOP;
END $$;
