/*
  Seed 1-hour slots on weekdays (Mon–Fri) for the next 365 days.
  5 slots per day spaced 90 minutes apart: 09:00, 10:30, 12:00, 13:30, 15:00
  This respects a 15-minute buffer either side of each 60-minute slot.
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
      CURRENT_DATE,
      CURRENT_DATE + INTERVAL '364 days',
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
