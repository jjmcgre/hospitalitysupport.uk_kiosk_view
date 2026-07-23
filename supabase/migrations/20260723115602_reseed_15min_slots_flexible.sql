-- Wipe all existing unbooked slots and re-seed at 15-minute intervals
-- Users can pick any 15-min slot; the system dynamically blocks a 15-min
-- buffer either side when a meeting is confirmed.

DELETE FROM demo_availability WHERE booked = false;

-- Also clean up any stale test bookings and their slots
DELETE FROM demo_availability WHERE booked_by_booking_id IN (
  SELECT id FROM demo_bookings WHERE name IN ('t','test1','test','James') AND status != 'confirmed'
);
-- Free any remaining booked test slots
UPDATE demo_availability SET booked = false, booked_by_booking_id = null, notes = ''
WHERE notes LIKE '%[blocked:%';

-- Re-seed Mon–Sat, 08:00–18:00, every 15 minutes
DO $$
DECLARE
  v_date date := '2026-07-24';
  v_end  date := '2027-07-24';
  v_time text;
  v_hour int;
  v_min  int;
BEGIN
  WHILE v_date <= v_end LOOP
    IF EXTRACT(ISODOW FROM v_date) <= 6 THEN
      v_hour := 8;
      WHILE v_hour < 18 LOOP
        v_min := 0;
        WHILE v_min < 60 LOOP
          v_time := lpad(v_hour::text, 2, '0') || ':' || lpad(v_min::text, 2, '0');
          INSERT INTO demo_availability (slot_date, slot_time, duration_mins, booked, notes)
          VALUES (v_date, v_time, 60, false, '')
          ON CONFLICT (slot_date, slot_time) DO NOTHING;
          v_min := v_min + 15;
        END LOOP;
        v_hour := v_hour + 1;
      END LOOP;
    END IF;
    v_date := v_date + INTERVAL '1 day';
  END LOOP;
END $$;
