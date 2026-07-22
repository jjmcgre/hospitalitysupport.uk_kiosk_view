/*
# Link demo_bookings to deals pipeline

## Purpose
Demo bookings (from the landing page booking modal) and deals (the CRM pipeline)
have been two completely disconnected systems. A prospect who books a demo via
the landing page never appears in the pipeline, so the "book a demo" flow never
creates a lead that gets attributed to anyone.

This migration adds a `deal_id` column to `demo_bookings` so every booking can be
linked to its corresponding deal in the pipeline. The frontend will use this to:
1. Auto-create a deal when a landing-page booking is confirmed.
2. Link existing deals to their demo bookings when booked from the DealPage or
   LogDealModal.
3. Sync attribution (sourced_by / assigned_to) between the two records when a
   lead is swapped between team members.

## Changes
1. New column: `demo_bookings.deal_id` (uuid, nullable, FK to deals.id ON DELETE SET NULL)
2. Index on `demo_bookings.deal_id` for fast lookups
3. RLS: existing policies already allow anon+authenticated CRUD on demo_bookings,
   so no new policies are needed — the column is covered by the existing
   permissive policies.

## Security
- No new RLS policies needed. The existing "Public can read all bookings" (SELECT)
  and "Public can update own booking" (UPDATE) policies already cover the new
  column since they use `USING (true)` / `WITH CHECK (true)`.
- The foreign key uses ON DELETE SET NULL so deleting a deal doesn't cascade-delete
  the booking record (preserving enquiry history).
*/

-- 1. Add deal_id column
ALTER TABLE demo_bookings
  ADD COLUMN IF NOT EXISTS deal_id uuid REFERENCES deals(id) ON DELETE SET NULL;

-- 2. Index for fast lookup by deal_id
CREATE INDEX IF NOT EXISTS idx_demo_bookings_deal_id
  ON demo_bookings (deal_id);
