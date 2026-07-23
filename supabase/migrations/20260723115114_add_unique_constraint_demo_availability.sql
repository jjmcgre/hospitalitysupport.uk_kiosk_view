-- Prevent duplicate slots on the same date+time
CREATE UNIQUE INDEX IF NOT EXISTS uniq_demo_availability_date_time
  ON demo_availability (slot_date, slot_time);
