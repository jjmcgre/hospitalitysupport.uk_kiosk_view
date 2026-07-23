-- Remove all unbooked slots (keeps the 3 real booked ones)
DELETE FROM demo_availability WHERE booked = false;

-- Re-seed Mon–Sat with clean 90-min-spaced slots (60-min meeting + 15-min buffer each side)
-- Daily times: 09:00, 10:30, 12:00, 13:30, 15:00, 16:30
-- Date range: 2026-07-30 to 2027-07-29
DO $$
DECLARE
  v_date date := '2026-07-30';
  v_end  date := '2027-07-29';
  v_times text[] := ARRAY['09:00','10:30','12:00','13:30','15:00','16:30'];
  v_time  text;
BEGIN
  WHILE v_date <= v_end LOOP
    -- Mon=1 … Sat=6 in ISODOW; skip Sunday (7)
    IF EXTRACT(ISODOW FROM v_date) <= 6 THEN
      FOREACH v_time IN ARRAY v_times LOOP
        -- Only insert if no row already exists for this date+time
        INSERT INTO demo_availability (slot_date, slot_time, duration_mins, booked, notes)
        VALUES (v_date, v_time, 60, false, '')
        ON CONFLICT DO NOTHING;
      END LOOP;
    END IF;
    v_date := v_date + INTERVAL '1 day';
  END LOOP;
END $$;
