/*
  Seed 1-hour demo slots on weekdays (Mon–Fri) from 30 July 2026 through 31 Dec 2026.
  5 slots per day: 09:00, 10:30, 12:00, 13:30, 15:00
  Skips any date/time that already exists.
*/

DO $$
DECLARE
  d date;
  t text;
  times text[] := ARRAY['09:00','10:30','12:00','13:30','15:00'];
BEGIN
  FOR d IN
    SELECT gs::date
    FROM generate_series(
      '2026-07-30'::date,
      '2026-12-31'::date,
      '1 day'
    ) AS gs
    WHERE EXTRACT(DOW FROM gs) BETWEEN 1 AND 5   -- Monday=1 … Friday=5
  LOOP
    FOREACH t IN ARRAY times LOOP
      INSERT INTO demo_availability (slot_date, slot_time, duration_mins, booked, notes)
      SELECT d, t, 60, false, ''
      WHERE NOT EXISTS (
        SELECT 1 FROM demo_availability
        WHERE slot_date = d AND slot_time = t
      );
    END LOOP;
  END LOOP;
END $$;
