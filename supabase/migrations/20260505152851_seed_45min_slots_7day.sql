
/*
  # Seed 45-minute slots, 7 days a week, 07:00–18:00 GMT
  
  Inserts hourly slots (45 min duration + 15 min buffer = 60 min apart)
  from 07:00 to 18:00 for every day in the next 6 weeks (today + 42 days).
  Skips any date/time combinations that already exist.
*/

DO $$
DECLARE
  d date;
  t text;
  times text[] := ARRAY[
    '07:00','08:00','09:00','10:00','11:00','12:00',
    '13:00','14:00','15:00','16:00','17:00','18:00'
  ];
BEGIN
  FOR d IN
    SELECT generate_series::date
    FROM generate_series(CURRENT_DATE, CURRENT_DATE + INTERVAL '41 days', '1 day')
  LOOP
    FOREACH t IN ARRAY times LOOP
      INSERT INTO demo_availability (slot_date, slot_time, duration_mins, booked, notes)
      VALUES (d, t, 45, false, '')
      ON CONFLICT DO NOTHING;
    END LOOP;
  END LOOP;
END $$;
