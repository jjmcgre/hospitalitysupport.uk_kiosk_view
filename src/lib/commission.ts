export const PRICE_PER_SITE = 1_200;
const L1_RATE = 0.15;
const L1_MIN = 200;
const L2_RATE = 0.05;

export function calcARR(sites: number, arrOverride?: number | null): number {
  if (arrOverride != null && arrOverride > 0) return arrOverride;
  if (sites <= 0) return 0;
  return sites * PRICE_PER_SITE;
}

export function calcL1Commission(sites: number, arrOverride?: number | null): number {
  const arr = calcARR(sites, arrOverride);
  if (arr <= 0) return 0;
  return Math.max(L1_MIN, arr * L1_RATE);
}

export function calcL2Commission(sites: number, arrOverride?: number | null): number {
  const arr = calcARR(sites, arrOverride);
  if (arr <= 0) return 0;
  return arr * L2_RATE;
}

export function fmtGbp(n: number): string {
  return `£${Math.round(n).toLocaleString('en-GB')}`;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export type Stage =
  | 'new'
  | 'contacted'
  | 'demo_booked'
  | 'demo_done'
  | 'proposal_sent'
  | 'won'
  | 'lost';

export type CommissionStatus = 'pending' | 'approved' | 'flagged' | 'declined' | 'n/a';
export type Confidence = 'hot' | 'warm' | 'cold';
export type Source = 'direct' | 'inbound' | 'referral' | 'email_campaign';

export const STAGE_LABELS: Record<Stage, string> = {
  new: 'New',
  contacted: 'Contacted',
  demo_booked: 'Demo Booked',
  demo_done: 'Demo Done',
  proposal_sent: 'Proposal Sent',
  won: 'Won',
  lost: 'Lost',
};

export const STAGE_ORDER: Stage[] = [
  'new',
  'contacted',
  'demo_booked',
  'demo_done',
  'proposal_sent',
  'won',
];

export function nextStage(current: Stage): Stage | null {
  const idx = STAGE_ORDER.indexOf(current);
  if (idx === -1 || idx >= STAGE_ORDER.length - 1) return null;
  return STAGE_ORDER[idx + 1];
}

export interface DefaultAction {
  action: string;
  daysAhead: number;
}

export const DEFAULT_NEXT_ACTIONS: Record<Stage, DefaultAction> = {
  new: { action: 'Make first contact', daysAhead: 0 },
  contacted: { action: 'Book a demo', daysAhead: 3 },
  demo_booked: { action: 'Run the demo', daysAhead: 1 },
  demo_done: { action: 'Send a proposal', daysAhead: 2 },
  proposal_sent: { action: 'Chase the decision', daysAhead: 5 },
  won: { action: 'Complete handoff', daysAhead: 1 },
  lost: { action: '', daysAhead: 0 },
};

export const ORG_TYPES = [
  'pub',
  'restaurant',
  'hotel',
  'cafe',
  'fast_food',
  'catering',
  'other',
] as const;

export const ORG_TYPE_LABELS: Record<string, string> = {
  pub: 'Pub / Bar',
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  cafe: 'Cafe',
  fast_food: 'Fast Food',
  catering: 'Catering',
  other: 'Other',
};

export const LOST_REASONS = [
  { value: 'price', label: 'Price' },
  { value: 'timing', label: 'Wrong timing' },
  { value: 'competitor', label: 'Went with competitor' },
  { value: 'no_response', label: 'No response' },
  { value: 'wrong_fit', label: 'Wrong fit' },
  { value: 'other', label: 'Other' },
];

export function isCommissionable(sourcedByUserId: string | null | undefined, founderIds: Set<string>): boolean {
  if (!sourcedByUserId) return false;
  return !founderIds.has(sourcedByUserId);
}

export function computeOrgKey(tradingName: string, postcode: string): string {
  return (
    tradingName.toLowerCase().replace(/\s+/g, '') +
    '|' +
    postcode.toLowerCase().replace(/\s+/g, '')
  );
}
