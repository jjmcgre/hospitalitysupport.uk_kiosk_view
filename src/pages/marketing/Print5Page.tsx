import React from 'react';

/* ── Design tokens ──────────────────────────────────────────────────────── */
const TEAL    = '#0d9488';
const TEAL_LT = '#2dd4bf';
const INK     = '#0f172a';
const SLATE   = '#1e293b';
const MUTED   = '#64748b';
const FAINT   = '#94a3b8';
const RULE    = '#e2e8f0';
const CARD    = '#f8fafc';
const WHITE   = '#ffffff';
const DARK_BG = '#080f1a';
const DARK_MID= '#0f1623';
const DARK_UI = '#1a2535';
const F       = "'Inter', system-ui, sans-serif";

/* ── Shared shell ───────────────────────────────────────────────────────── */
function Page({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div
      className="print-page shadow-2xl overflow-hidden"
      style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', fontFamily: F,
        display: 'flex', flexDirection: 'column', background: WHITE }}
    >
      {/* Header */}
      <div style={{ background: INK, padding: '8px 28px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ color: WHITE, fontWeight: 900, fontSize: 13, letterSpacing: '-0.01em' }}>
          HospitalitySupport<span style={{ color: TEAL_LT }}>.uk</span>
        </span>
        <span style={{ color: '#475569', fontSize: 8 }}>Page {n} of 5</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      {/* Footer */}
      <div style={{ background: CARD, borderTop: `1px solid ${RULE}`, padding: '6px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ color: FAINT, fontSize: 7.5 }}>Built by operators, for operators · No 6-week onboarding · No consultants</span>
        <span style={{ color: TEAL, fontSize: 7.5, fontWeight: 700 }}>hospitalitysupport.uk</span>
      </div>
    </div>
  );
}

function Chip({ text, colour }: { text: string; colour?: string }) {
  const c = colour ?? TEAL;
  return (
    <span style={{ display: 'inline-block', background: `${c}14`, border: `1px solid ${c}38`,
      color: c, fontSize: 7.5, fontWeight: 800, letterSpacing: '0.1em',
      textTransform: 'uppercase' as const, padding: '2px 10px', borderRadius: 99 }}>
      {text}
    </span>
  );
}

function DarkWindow({ title, live, children }: { title: string; live?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: DARK_UI, borderRadius: 8, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.28)' }}>
      <div style={{ background: DARK_BG, padding: '5px 12px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#475569', fontSize: 7.5, fontFamily: 'monospace' }}>{title}</span>
        {live && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL_LT, display: 'inline-block' }} />
            <span style={{ color: TEAL_LT, fontSize: 7, fontWeight: 700 }}>LIVE</span>
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function LightCard({ heading, colour, bg, border, points }: {
  heading: string; colour: string; bg: string; border: string; points: string[];
}) {
  return (
    <div style={{ padding: '10px 12px', background: bg, border: `1px solid ${border}`, borderRadius: 8 }}>
      <div style={{ fontSize: 8.5, fontWeight: 800, color: colour,
        textTransform: 'uppercase' as const, letterSpacing: '0.09em', marginBottom: 6 }}>{heading}</div>
      {points.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 7, marginBottom: i < points.length - 1 ? 4 : 0 }}>
          <span style={{ color: colour, fontSize: 9, flexShrink: 0, marginTop: 1 }}>→</span>
          <span style={{ color: '#374151', fontSize: 9.5, lineHeight: 1.5 }}>{p}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 1 — OVERVIEW / MIND MAP
══════════════════════════════════════════════════════════════════════════ */

function SpokeMap() {
  /* Canvas 960 × 600. Centre (480, 295).
     8 rectangular cards placed in fixed positions.
     Spokes drawn from centre to nearest card-edge midpoint. */
  const cx = 480, cy = 295;

  type CardDef = {
    col: string;
    title: string;
    lines: string[];
    // card bounding box
    x: number; y: number; w: number;
    // spoke attach on card edge
    sx: number; sy: number;
  };

  const cards: CardDef[] = [
    // TOP
    { col: '#0d9488', title: 'Recipe & Spec',
      lines: ['Full recipe, method & mise en place', 'Portions, yield & scaling', 'Batch notes per serving size'],
      x: 334, y: 14, w: 196, sx: 480, sy: 68 },
    // TOP-RIGHT
    { col: '#0284c7', title: 'Cost & GP',
      lines: ['Live ingredient costs vs your suppliers', 'GP auto-calculated per dish', 'Sell-price guidance & margin alerts'],
      x: 660, y: 36, w: 192, sx: 660, sy: 82 },
    // RIGHT
    { col: '#7c3aed', title: 'Supplier Pricing',
      lines: ['Live price tracking from your suppliers', 'Invoice scan & match', 'Auto-recost when prices change', 'Direct supplier messaging'],
      x: 726, y: 218, w: 198, sx: 726, sy: 268 },
    // BOTTOM-RIGHT
    { col: '#dc2626', title: 'Allergens & Nutrition',
      lines: ['14 allergens auto-generated per dish', "Natasha's Law compliant matrix", 'Nutrition per portion — auto-updated'],
      x: 660, y: 474, w: 210, sx: 660, sy: 474 },
    // BOTTOM
    { col: '#d97706', title: 'HACCP & Safety',
      lines: ['CCPs generated per dish', 'Critical limits & corrective actions', 'Temp logs, evidence & inspection reports'],
      x: 330, y: 524, w: 200, sx: 468, sy: 524 },
    // BOTTOM-LEFT
    { col: '#059669', title: 'Training & Compliance',
      lines: ['Bespoke training from your menus & ops', 'Level 2 food hygiene included', 'All legal compliance checks built in', 'Cert tracking & auto-renewal alerts'],
      x: 44, y: 456, w: 210, sx: 254, sy: 490 },
    // LEFT
    { col: '#0891b2', title: 'Front of House',
      lines: ['Live menu knowledge for all staff', 'Instant allergen answers', 'Dish descriptions & wine pairings'],
      x: 44, y: 222, w: 200, sx: 244, sy: 270 },
    // TOP-LEFT
    { col: '#ea580c', title: 'Ordering & Deliveries',
      lines: ['Shopping list auto-built from menu', 'One-click POs to suppliers', 'Delivery checker — scan vs PO', 'Discrepancy alerts & records'],
      x: 44, y: 42, w: 204, sx: 248, sy: 88 },
  ];

  const ROW = 13.5; // px per item row
  const HDR = 16;   // header bar height
  const PAD = 6;    // inner padding top/bottom

  return (
    <svg viewBox="0 0 960 600" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={TEAL} stopOpacity="0.12" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={230} ry={210} fill="url(#glow)" />

      {/* Spokes */}
      {cards.map(c => (
        <line key={c.title + 's'} x1={cx} y1={cy} x2={c.sx} y2={c.sy}
          stroke={c.col} strokeWidth="1.4" strokeOpacity="0.3" strokeDasharray="5,4" />
      ))}

      {/* Cards */}
      {cards.map(c => {
        const h = HDR + PAD + c.lines.length * ROW + PAD;
        return (
          <g key={c.title}>
            {/* Body */}
            <rect x={c.x} y={c.y} width={c.w} height={h} rx={6}
              fill={DARK_BG} stroke={c.col} strokeWidth="1.1" strokeOpacity="0.55" />
            {/* Header tint */}
            <rect x={c.x} y={c.y} width={c.w} height={HDR} rx={6}
              fill={c.col} fillOpacity="0.16" />
            <rect x={c.x} y={c.y + HDR - 2} width={c.w} height={2}
              fill={c.col} fillOpacity="0.25" />
            {/* Title */}
            <text x={c.x + 9} y={c.y + HDR - 4}
              fill={c.col} fontSize="9" fontWeight="800" fontFamily={F}>{c.title}</text>
            {/* Lines */}
            {c.lines.map((ln, li) => (
              <g key={ln}>
                <circle cx={c.x + 11} cy={c.y + HDR + PAD + li * ROW + 4}
                  r={1.8} fill={c.col} fillOpacity="0.65" />
                <text x={c.x + 18} y={c.y + HDR + PAD + li * ROW + 8}
                  fill="#94a3b8" fontSize="7.4" fontFamily={F}>{ln}</text>
              </g>
            ))}
          </g>
        );
      })}

      {/* Centre */}
      <rect x={cx - 80} y={cy - 40} width={160} height={80} rx={8}
        fill={DARK_BG} stroke={TEAL_LT} strokeWidth="2" />
      <rect x={cx - 80} y={cy - 40} width={160} height={80} rx={8}
        fill={TEAL} fillOpacity="0.07" />
      <text x={cx} y={cy - 12} textAnchor="middle"
        fill={WHITE} fontSize="16" fontWeight="900" fontFamily={F}>Menu</text>
      <text x={cx} y={cy + 7}  textAnchor="middle"
        fill={WHITE} fontSize="16" fontWeight="900" fontFamily={F}>Development</text>
      <text x={cx} y={cy + 23} textAnchor="middle"
        fill={TEAL_LT} fontSize="8" fontWeight="700" fontFamily={F}>· everything starts here ·</text>
    </svg>
  );
}

function Page1() {
  const noiseItems: { text: string; col: string }[] = [
    { text: 'allergen spreadsheets',       col: '#f87171' },
    { text: 'HACCP paperwork',             col: '#f87171' },
    { text: 'GP that\'s never right',      col: '#f87171' },
    { text: 'last-minute menu changes',    col: '#f87171' },
    { text: 'supplier invoice queries',    col: '#fbbf24' },
    { text: 'compliance checklists',       col: '#fbbf24' },
    { text: 'delivery discrepancies',      col: '#fbbf24' },
    { text: 'staff no-shows',             col: '#fbbf24' },
    { text: 'training records',           col: FAINT },
    { text: 'price increases you missed', col: FAINT },
    { text: 'FOH asking about allergens', col: FAINT },
    { text: 'certification renewals',     col: FAINT },
    { text: 'portion drift',             col: FAINT },
    { text: 'menu costing',             col: FAINT },
  ];

  return (
    <Page n={1}>
      {/* ── ACT 1 — two columns ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '52% 48%', flexShrink: 0 }}>

        {/* Left — emotional hook */}
        <div style={{ background: DARK_BG, padding: '20px 20px 18px 28px',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 8, fontWeight: 800, color: '#f87171',
              textTransform: 'uppercase' as const, letterSpacing: '0.14em', marginBottom: 10 }}>
              Built by chefs · for chefs
            </div>
            <p style={{ color: WHITE, fontSize: 20, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '0 0 10px', maxWidth: 260 }}>
              You became a chef<br />because you love to cook.
            </p>
            <p style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.65,
              margin: '0 0 12px', maxWidth: 280 }}>
              Somewhere between the first job and running your own kitchen, the cooking became the thing you squeeze in around everything else. The admin. The compliance. The costing. The supplier calls that never end.
            </p>
            <p style={{ color: '#e2e8f0', fontSize: 10.5, fontWeight: 600, lineHeight: 1.55,
              fontStyle: 'italic', borderLeft: `3px solid ${TEAL}`,
              paddingLeft: 11, margin: 0 }}>
              "I didn't go to catering college to update an allergen spreadsheet at midnight."
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14,
            paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {[
              { stat: '20+ yrs', label: 'kitchen experience behind this' },
              { stat: '5 min',   label: 'to go live — no training needed' },
              { stat: 'plain English', label: 'describe the dish. That\'s it.' },
            ].map(s => (
              <div key={s.stat} style={{ flex: 1 }}>
                <div style={{ color: TEAL_LT, fontSize: 11, fontWeight: 900, lineHeight: 1 }}>{s.stat}</div>
                <div style={{ color: MUTED, fontSize: 7.5, marginTop: 3, lineHeight: 1.35 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — noise cloud */}
        <div style={{ background: '#08101a', padding: '18px 18px 14px 16px' }}>
          <div style={{ fontSize: 8, fontWeight: 800, color: '#334155',
            textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 12 }}>
            What actually fills the day
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '7px 6px' }}>
            {noiseItems.map((item, i) => (
              <span key={i} style={{
                fontSize: 8.5, fontWeight: 600,
                color: item.col,
                background: `${item.col}10`,
                border: `1px solid ${item.col}30`,
                borderRadius: 99, padding: '3px 9px',
                whiteSpace: 'nowrap' as const,
              }}>
                {item.text}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ color: '#334155', fontSize: 9, fontStyle: 'italic', margin: 0 }}>
              None of this is why you got into hospitality.
            </p>
          </div>
        </div>
      </div>

      {/* ── PIVOT BAND ───────────────────────────────────────────────────── */}
      <div style={{ background: DARK_MID, borderTop: `2px solid ${TEAL}`,
        borderBottom: `1px solid rgba(45,212,191,0.12)`,
        padding: '10px 28px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexShrink: 0, gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 7.5, fontWeight: 800, color: TEAL_LT,
            textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 3 }}>
            HospitalitySupport.uk
          </div>
          <p style={{ color: WHITE, fontSize: 14.5, fontWeight: 900, lineHeight: 1.1,
            letterSpacing: '-0.02em', margin: '0 0 3px' }}>
            Every area of your operation.{' '}
            <span style={{ color: TEAL_LT }}>All connected. Always live.</span>
          </p>
          <p style={{ color: MUTED, fontSize: 9, lineHeight: 1.5, margin: 0, maxWidth: 440 }}>
            Describe a dish in plain English. The platform builds the recipe, costs it live, generates the allergen matrix, HACCP controls, and training notes — then recoasts everything automatically every time a supplier price changes.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {([
            { val: '3 min',  label: 'Dish live',        hi: false },
            { val: '14',     label: 'Allergens tracked', hi: false },
            { val: '0',      label: 'Spreadsheets',      hi: false },
            { val: '£3.30',  label: 'per kitchen / day', hi: true  },
          ] as { val: string; label: string; hi: boolean }[]).map(s => (
            <div key={s.label} style={{
              background: s.hi ? TEAL : 'rgba(255,255,255,0.05)',
              border: `1px solid ${s.hi ? TEAL : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 7, padding: '6px 10px', textAlign: 'center' as const }}>
              <div style={{ color: s.hi ? WHITE : TEAL_LT, fontSize: 13, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: s.hi ? 'rgba(255,255,255,0.7)' : MUTED, fontSize: 7, marginTop: 2, lineHeight: 1.2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SPOKE MAP ─────────────────────────────────────────────────────── */}
      <div style={{ background: DARK_MID, flex: 1, minHeight: 0 }}>
        <SpokeMap />
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 2 — MENU, RECIPE & GP
══════════════════════════════════════════════════════════════════════════ */
function Page2() {
  return (
    <Page n={2}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        {/* Left — dark mockup column */}
        <div style={{ background: DARK_MID, padding: '18px 14px 16px 28px',
          borderRight: `1px solid rgba(255,255,255,0.07)`,
          display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <Chip text="Menu Development · Cost & GP · Allergens · HACCP" />
            <h2 style={{ color: WHITE, fontSize: 21, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '8px 0 4px' }}>
              Full dish. Fully priced.<br />
              <span style={{ color: TEAL_LT }}>Under 3 minutes.</span>
            </h2>
            <p style={{ color: FAINT, fontSize: 9.5, lineHeight: 1.55, margin: 0 }}>
              Describe the dish. The platform handles everything from recipe to compliance.
            </p>
          </div>

          <DarkWindow title="step 01 — describe your dish">
            <div style={{ padding: '9px 12px' }}>
              <div style={{ background: 'rgba(45,212,191,0.07)', border: '1px solid rgba(45,212,191,0.2)',
                borderRadius: 6, padding: '8px 10px', color: '#e2e8f0', fontSize: 9.5, lineHeight: 1.55 }}>
                "Spring fish special — elegant, max 5 ingredients, 70%+ GP, works on a junior chef section, pairs well with white Burgundy."
              </div>
            </div>
          </DarkWindow>

          <DarkWindow title="step 02 — recipe built, priced against live suppliers" live>
            <div style={{ padding: '5px 12px', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.03)' }}>
              <span style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 700 }}>Pan-Seared Sea Trout, Lemon Beurre Blanc</span>
              <span style={{ color: TEAL_LT, fontSize: 10, fontWeight: 800 }}>GP 73%</span>
            </div>
            {[
              { item: 'Sea trout fillet 140g', cost: '£3.20', sup: 'Coastal Fresh' },
              { item: 'Unsalted butter 30g',   cost: '£0.18', sup: 'Premier Foods' },
              { item: 'Lemon ½',               cost: '£0.12', sup: 'Fresh Direct' },
              { item: 'White wine 50ml',        cost: '£0.28', sup: 'Cellar Direct' },
              { item: 'Dill garnish 5g',        cost: '£0.09', sup: 'Fresh Direct' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 12px',
                borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: FAINT, fontSize: 9, flex: 1 }}>{r.item}</span>
                <span style={{ color: TEAL_LT, fontSize: 9, fontFamily: 'monospace',
                  fontWeight: 700, width: 34, textAlign: 'right' as const }}>{r.cost}</span>
                <span style={{ color: '#334155', fontSize: 8, width: 72,
                  textAlign: 'right' as const }}>{r.sup}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 12px' }}>
              <span style={{ color: MUTED, fontSize: 8.5 }}>Total cost per portion</span>
              <span style={{ color: WHITE, fontSize: 9, fontWeight: 800 }}>£3.87 → sell £14.50</span>
            </div>
          </DarkWindow>

          <DarkWindow title="step 03 — allergen matrix, auto-generated">
            <div style={{ padding: '8px 12px' }}>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const, marginBottom: 6 }}>
                {[
                  { n: 'Fish', p: true }, { n: 'Dairy', p: true }, { n: 'Sulphites', p: true },
                  { n: 'Gluten', p: false }, { n: 'Eggs', p: false }, { n: 'Nuts', p: false },
                  { n: 'Soya', p: false }, { n: 'Sesame', p: false }, { n: 'Celery', p: false },
                  { n: 'Mustard', p: false }, { n: 'Crustaceans', p: false },
                ].map(a => (
                  <span key={a.n} style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                    background: a.p ? 'rgba(248,113,113,0.14)' : 'rgba(255,255,255,0.05)',
                    color: a.p ? '#fca5a5' : '#475569',
                    border: `1px solid ${a.p ? 'rgba(248,113,113,0.32)' : 'rgba(255,255,255,0.07)'}` }}>
                    {a.p ? '! ' : ''}{a.n}
                  </span>
                ))}
              </div>
              <span style={{ color: TEAL, fontSize: 8, fontWeight: 700 }}>
                14 allergens tracked · Natasha's Law compliant · Auto-updates on any ingredient change
              </span>
            </div>
          </DarkWindow>

          <DarkWindow title="step 04 — HACCP controls, per dish">
            <div style={{ padding: '8px 12px' }}>
              {[
                { ccp: 'CCP1', step: 'Receiving', control: 'Core temp ≤3°C on delivery', action: 'Reject if above' },
                { ccp: 'CCP2', step: 'Storage',   control: 'Fridge ≤5°C, covered, labelled', action: 'Move/discard' },
                { ccp: 'CCP3', step: 'Cooking',   control: 'Core temp ≥63°C for 2 min', action: 'Re-cook or discard' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start',
                  marginBottom: i < 2 ? 6 : 0 }}>
                  <span style={{ color: TEAL_LT, fontSize: 7, fontWeight: 800,
                    background: 'rgba(45,212,191,0.1)', padding: '1px 5px',
                    borderRadius: 3, flexShrink: 0, marginTop: 1 }}>{c.ccp}</span>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 700 }}>
                      {c.step} — <span style={{ color: MUTED, fontWeight: 400 }}>{c.control}</span>
                    </div>
                    <div style={{ color: '#fbbf24', fontSize: 8 }}>Corrective: {c.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </DarkWindow>
        </div>

        {/* Right — light context column */}
        <div style={{ background: CARD, padding: '18px 28px 16px 16px',
          display: 'flex', flexDirection: 'column', gap: 9 }}>
          <p style={{ color: SLATE, fontSize: 10.5, lineHeight: 1.65, margin: 0 }}>
            A head chef used to spend 2–3 hours on this per dish. Recipe, costing, allergen checks, HACCP, portioning — all separate tasks, all manual. The platform handles every part from a single description.
          </p>

          <div style={{ padding: '11px 13px', background: '#f0fdf4',
            border: '1px solid #bbf7d0', borderRadius: 8 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: '#15803d',
              textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 7 }}>
              Generated per dish — automatically
            </div>
            {[
              'Full recipe — portions, method, mise en place, batch notes',
              'Ingredient list priced against your live suppliers',
              'GP calculation and sell-price recommendation',
              '14-allergen matrix, auto-updated on any change',
              'HACCP controls: CCPs, critical limits, corrective actions',
              'Nutritional breakdown per portion (kcal, protein, fat, carbs)',
              'FOH dish description ready for menus and table cards',
              'Wine and beverage pairings',
              'Training notes for kitchen and front of house',
              'Live GP tracking — recosted on every supplier price change',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, marginBottom: i < 9 ? 4 : 0 }}>
                <span style={{ color: '#16a34a', fontSize: 9, flexShrink: 0 }}>✓</span>
                <span style={{ color: '#374151', fontSize: 9.5, lineHeight: 1.45 }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '9px 13px', background: '#fef2f2',
            border: '1px solid #fecaca', borderRadius: 8 }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#dc2626',
              textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 5 }}>
              Before this platform
            </div>
            {[
              '2–3 hours per dish spec — every time a menu changes',
              'Allergen spreadsheets done manually — and usually behind',
              'HACCP copied from a generic template',
              'GP recalculated only at month end — if at all',
            ].map(t => (
              <div key={t} style={{ fontSize: 9.5, color: '#94a3b8',
                textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
            ))}
          </div>

          <div style={{ background: `${TEAL}12`, border: `1px solid ${TEAL}30`,
            borderRadius: 8, padding: '10px 13px', marginTop: 'auto' }}>
            <div style={{ color: TEAL, fontSize: 11, fontWeight: 800, lineHeight: 1.4 }}>
              From concept to fully priced, allergen-compliant, HACCP-controlled live dish.
            </div>
            <div style={{ color: MUTED, fontSize: 9, marginTop: 4 }}>Under 3 minutes. Every time.</div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 3 — LIVE PRICING & SUPPLIER ECOSYSTEM
══════════════════════════════════════════════════════════════════════════ */
function Page3() {
  return (
    <Page n={3}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        {/* Left — light context */}
        <div style={{ background: WHITE, padding: '18px 14px 16px 28px',
          borderRight: `1px solid ${RULE}`,
          display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div>
            <Chip text="Live Supplier Pricing · Cost & GP Intelligence" colour="#0284c7" />
            <h2 style={{ color: INK, fontSize: 21, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '8px 0 4px' }}>
              Supplier changes price.<br />
              <span style={{ color: TEAL }}>Every dish recoasts itself.</span>
            </h2>
            <p style={{ color: MUTED, fontSize: 10, lineHeight: 1.6, margin: 0 }}>
              Connect your suppliers once. When they update prices, every linked recipe recoasts in seconds. You see exactly which dishes are affected — before service, before you're committed.
            </p>
          </div>

          {[
            { icon: 'CONNECT', col: '#0284c7', title: 'Connect existing suppliers',
              body: 'One invitation. Suppliers get their own portal — they keep pricing current. You see the results instantly.' },
            { icon: 'INSTANT', col: TEAL, title: 'Sub-second propagation',
              body: 'Supplier changes a price at 06:00. By 06:01 every linked dish is recosted and your dashboard shows the impact.' },
            { icon: 'ALERT',   col: '#d97706', title: 'Flagged before service',
              body: 'Dishes below GP target are highlighted automatically. You know before a cover is served.' },
            { icon: 'CHAIN',   col: '#7c3aed', title: 'Two-tier supply chain',
              body: 'See what your supplier pays their vendor. Understand cost pressure before it hits your invoice.' },
            { icon: 'SCAN',    col: '#059669', title: 'Invoice scanning',
              body: 'Upload a PDF delivery note. Line items extracted, matched, and reconciled automatically.' },
            { icon: 'MSG',     col: '#0891b2', title: 'Supplier messaging',
              body: 'All supplier communication in one auditable thread. No lost emails, no missed price changes.' },
          ].map(c => (
            <div key={c.title} style={{ display: 'flex', gap: 10, padding: '8px 11px',
              background: CARD, borderRadius: 7, border: `1px solid ${RULE}` }}>
              <span style={{ fontSize: 7, fontWeight: 900, color: c.col,
                background: `${c.col}12`, border: `1px solid ${c.col}25`,
                borderRadius: 4, padding: '2px 5px', flexShrink: 0,
                alignSelf: 'flex-start', letterSpacing: '0.05em', marginTop: 1 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 10, color: INK, marginBottom: 2 }}>{c.title}</div>
                <div style={{ fontSize: 9, color: MUTED, lineHeight: 1.5 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — dark mockups */}
        <div style={{ background: DARK_MID, padding: '18px 28px 16px 14px',
          display: 'flex', flexDirection: 'column', gap: 10 }}>

          <DarkWindow title="recipe costing — all dishes" live>
            <div style={{ padding: '5px 12px', display: 'grid',
              gridTemplateColumns: '1fr 42px 42px 38px', gap: 6 }}>
              {['Dish', 'Cost', 'Sell', 'GP'].map(h => (
                <span key={h} style={{ color: '#334155', fontSize: 7, fontWeight: 700,
                  textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{h}</span>
              ))}
            </div>
            {[
              { name: 'Sea Trout, Beurre Blanc',  cost: '£3.87', sell: '£14.50', gp: 73, alert: false },
              { name: 'Salmon Fillet, Crushed Pea',cost: '£4.28', sell: '£14.50', gp: 70, alert: true  },
              { name: 'Beef Burger & Fries',       cost: '£3.85', sell: '£12.00', gp: 68, alert: false },
              { name: 'Fish & Chips',              cost: '£5.10', sell: '£15.50', gp: 67, alert: true  },
              { name: 'Mushroom Risotto',          cost: '£2.95', sell: '£11.50', gp: 74, alert: false },
              { name: 'Caesar Salad',              cost: '£2.40', sell: '£10.00', gp: 76, alert: false },
              { name: 'Chicken Supreme',           cost: '£3.60', sell: '£13.00', gp: 72, alert: false },
            ].map((d, i) => (
              <div key={i} style={{ padding: '4px 12px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: d.alert ? 'rgba(248,113,113,0.05)' : 'transparent',
                display: 'grid', gridTemplateColumns: '1fr 42px 42px 38px',
                gap: 6, alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0', fontSize: 9, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {d.alert && <span style={{ width: 4, height: 4, borderRadius: '50%',
                    background: '#f87171', display: 'inline-block', flexShrink: 0 }} />}
                  {d.name}
                </span>
                <span style={{ color: MUTED, fontSize: 8.5, fontFamily: 'monospace',
                  textAlign: 'right' as const }}>{d.cost}</span>
                <span style={{ color: '#475569', fontSize: 8.5, fontFamily: 'monospace',
                  textAlign: 'right' as const }}>{d.sell}</span>
                <span style={{ color: d.gp >= 70 ? TEAL_LT : '#f59e0b', fontSize: 9.5,
                  fontWeight: 800, textAlign: 'right' as const }}>{d.gp}%</span>
              </div>
            ))}
            <div style={{ padding: '5px 12px', borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#f87171', fontSize: 8 }}>2 dishes flagged — salmon price +8p overnight</span>
              <span style={{ color: TEAL_LT, fontSize: 8 }}>Synced 06:12</span>
            </div>
          </DarkWindow>

          <DarkWindow title="supplier portal — Coastal Fresh Ltd">
            <div style={{ padding: '9px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ color: '#cbd5e1', fontSize: 9, fontWeight: 700 }}>Price update — uploaded 05:58</span>
                <span style={{ color: TEAL, fontSize: 7.5, fontWeight: 700,
                  background: 'rgba(13,148,136,0.1)', padding: '1px 7px', borderRadius: 3 }}>AUTO-SYNCED</span>
              </div>
              {[
                { item: 'Salmon fillet 140g',   old: '£4.12', new: '£4.20', pct: '+1.9%', up: true  },
                { item: 'Sea trout fillet 140g', old: '£3.79', new: '£3.87', pct: '+2.1%', up: true  },
                { item: 'Cod loin 180g',         old: '£5.05', new: '£5.08', pct: '+0.6%', up: true  },
                { item: 'Sea bass 200g',          old: '£6.80', new: '£6.80', pct: '—',     up: false },
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid',
                  gridTemplateColumns: '1fr 38px 42px 38px',
                  gap: 6, padding: '4px 0',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  alignItems: 'center' }}>
                  <span style={{ color: FAINT, fontSize: 9 }}>{r.item}</span>
                  <span style={{ color: '#334155', fontSize: 8.5,
                    textDecoration: 'line-through', textAlign: 'right' as const }}>{r.old}</span>
                  <span style={{ color: '#e2e8f0', fontSize: 9, fontFamily: 'monospace',
                    textAlign: 'right' as const }}>{r.new}</span>
                  <span style={{ color: r.up ? '#f87171' : '#475569', fontSize: 8.5,
                    fontWeight: 700, textAlign: 'right' as const }}>{r.pct}</span>
                </div>
              ))}
              <div style={{ color: '#334155', fontSize: 8, marginTop: 6 }}>
                Supplier updated their own portal · All linked dishes recosted automatically
              </div>
            </div>
          </DarkWindow>

          <DarkWindow title="supplier messages — Coastal Fresh Ltd">
            <div style={{ padding: '9px 12px' }}>
              {[
                { msg: 'Any flexibility on sea trout this week?', mine: true,  time: '08:12' },
                { msg: 'Wholesale market up 3%. Best we can do is £3.87. Already updated on portal — your dishes will have recosted.', mine: false, time: '08:16' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column',
                  alignItems: m.mine ? 'flex-end' : 'flex-start', marginBottom: 7 }}>
                  <div style={{
                    background: m.mine ? TEAL : 'rgba(255,255,255,0.07)',
                    color: m.mine ? WHITE : '#cbd5e1',
                    fontSize: 9, padding: '6px 10px', borderRadius: 7,
                    maxWidth: '88%', lineHeight: 1.5 }}>{m.msg}</div>
                  <span style={{ color: '#334155', fontSize: 7.5, marginTop: 2 }}>{m.time}</span>
                </div>
              ))}
            </div>
          </DarkWindow>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 4 — COMPLIANCE, TRAINING & FRONT OF HOUSE
══════════════════════════════════════════════════════════════════════════ */
function Page4() {
  return (
    <Page n={4}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        {/* Left — dark mockups */}
        <div style={{ background: DARK_MID, padding: '18px 14px 16px 28px',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <Chip text="Compliance · Training · Front of House" colour="#059669" />
            <h2 style={{ color: WHITE, fontSize: 21, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '8px 0 4px' }}>
              Audit-ready every day.<br />
              <span style={{ color: TEAL_LT }}>Always current. Always evidenced.</span>
            </h2>
            <p style={{ color: FAINT, fontSize: 9.5, lineHeight: 1.55, margin: 0 }}>
              Every task timestamped. Every signature captured. Inspectors don't care about intentions — they want evidence. The platform creates it automatically, as work happens.
            </p>
          </div>

          <DarkWindow title="pre-service briefing — lunch service">
            <div style={{ padding: '8px 12px' }}>
              <div style={{ color: MUTED, fontSize: 8, marginBottom: 6 }}>Staff sign-in — 11:45</div>
              {[
                { name: 'Jamie Smith',  role: 'Head Chef',  done: true  },
                { name: 'Maria Garcia', role: 'Sous Chef',  done: true  },
                { name: 'Tom Lee',      role: 'FOH Lead',   done: true  },
                { name: 'New Start',    role: 'KP',         done: false },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                  padding: '3px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ color: '#e2e8f0', fontSize: 9 }}>
                    {s.name} <span style={{ color: '#475569' }}>· {s.role}</span>
                  </span>
                  <span style={{ color: s.done ? TEAL_LT : '#f87171', fontSize: 8, fontWeight: 700 }}>
                    {s.done ? 'SIGNED' : 'PENDING'}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: 8, background: 'rgba(248,113,113,0.07)',
                border: '1px solid rgba(248,113,113,0.2)', borderRadius: 5, padding: '5px 9px' }}>
                <div style={{ color: '#fca5a5', fontSize: 8, fontWeight: 800, marginBottom: 2 }}>
                  HIGH RISK — new dish on today
                </div>
                <div style={{ color: FAINT, fontSize: 8.5 }}>
                  Sea Trout — Fish, Dairy, Sulphites · Brief all FOH before service
                </div>
              </div>
            </div>
          </DarkWindow>

          <DarkWindow title="compliance tasks — this week">
            <div style={{ padding: '8px 12px' }}>
              {[
                { task: 'Pre-service allergen briefing',  done: true,  sig: 'J. Smith' },
                { task: 'Fridge temperature log AM',      done: true,  sig: 'Auto'     },
                { task: 'Delivery note reconciliation',   done: true,  sig: 'M. Jones' },
                { task: 'Pre-service briefing — PM',      done: true,  sig: 'J. Smith' },
                { task: 'HACCP weekly review',            done: false, sig: ''         },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7,
                  padding: '4px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ width: 11, height: 11, borderRadius: 3,
                    background: t.done ? TEAL : 'rgba(245,158,11,0.18)',
                    border: t.done ? 'none' : '1px solid rgba(245,158,11,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: 7.5, color: WHITE, fontWeight: 900 }}>
                    {t.done ? '✓' : ''}
                  </span>
                  <span style={{ color: t.done ? '#475569' : '#fbbf24', fontSize: 9,
                    flex: 1, textDecoration: t.done ? 'line-through' : 'none' }}>{t.task}</span>
                  {t.sig && <span style={{ color: '#334155', fontSize: 8 }}>{t.sig}</span>}
                </div>
              ))}
              <div style={{ color: TEAL_LT, fontSize: 8, marginTop: 6, fontWeight: 700 }}>
                4/5 complete · All timestamped · Inspection-ready
              </div>
            </div>
          </DarkWindow>

          <DarkWindow title="training — staff certifications">
            <div style={{ padding: '8px 12px' }}>
              {[
                { name: 'Jamie Smith',  cert: 'Level 3 Food Safety', expires: 'Jan 2027', status: 'ok'       },
                { name: 'Maria Garcia', cert: 'Level 2 Food Safety', expires: 'Jun 2025', status: 'due'      },
                { name: 'Tom Lee',      cert: 'Allergen Awareness',  expires: 'Mar 2026', status: 'ok'       },
                { name: 'New Start',    cert: 'BOH Induction',       expires: 'In progress', status: 'prog'  },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '4px 0',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ color: MUTED, fontSize: 8 }}>{s.cert}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ color: s.status === 'due' ? '#f87171' : s.status === 'prog' ? '#fbbf24' : TEAL_LT,
                      fontSize: 8, fontWeight: 700 }}>
                      {s.status === 'due' ? 'DUE SOON' : s.status === 'prog' ? 'IN PROGRESS' : 'CURRENT'}
                    </div>
                    <div style={{ color: '#334155', fontSize: 8 }}>{s.expires}</div>
                  </div>
                </div>
              ))}
            </div>
          </DarkWindow>
        </div>

        {/* Right — light content */}
        <div style={{ background: WHITE, padding: '18px 28px 16px 16px',
          display: 'flex', flexDirection: 'column', gap: 9 }}>

          <LightCard heading="Training & Compliance" colour="#059669" bg="#f0fdf4" border="#bbf7d0"
            points={[
              'Bespoke training content built from your own menus and procedures — not generic templates',
              'Level 2 food hygiene already included — ready for your team on day one',
              'All legal compliance checks built in — nothing to configure',
              'Certification tracking with automatic expiry alerts sent to managers',
              'Signed briefings captured digitally — evidence as it happens, every service',
              'Training auto-updates when your menus or procedures change',
            ]} />

          <LightCard heading="Compliance" colour="#0284c7" bg="#f0f9ff" border="#bae6fd"
            points={[
              'Evidence captured in real time — forms, signatures, timestamps',
              'Pre-service allergen briefings with digital sign-off, every service',
              'Temperature logs, HACCP records, delivery checks in one place',
              'One-click FSA, HSE, and local authority inspection reports',
            ]} />

          <LightCard heading="Front of House" colour={TEAL} bg="#f0fdfa" border="#99f6e4"
            points={[
              "FOH always knows what's on — specials, allergens, 86'd items",
              'Allergen answers without "I\'ll just check in the kitchen"',
              'Dish descriptions and wine pairings generated and kept current',
              'Fewer errors, fewer complaints, better guest experience',
            ]} />

          <div style={{ padding: '9px 12px', background: '#fef2f2',
            border: '1px solid #fecaca', borderRadius: 8, marginTop: 'auto' }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#dc2626',
              textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 5 }}>
              You'll never again
            </div>
            {[
              'Scramble to find paperwork before an inspection',
              'Chase staff to sign compliance records after the fact',
              'Brief FOH verbally and hope it sticks',
              'Let a training certification expire unnoticed',
            ].map(t => (
              <div key={t} style={{ fontSize: 9.5, color: FAINT,
                textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE 5 — WHO IT'S FOR, MULTI-SITE, PRICING & CLOSE
══════════════════════════════════════════════════════════════════════════ */
function Page5() {
  return (
    <Page n={5}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        {/* Left — light */}
        <div style={{ background: WHITE, padding: '18px 14px 16px 28px',
          borderRight: `1px solid ${RULE}`,
          display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div>
            <Chip text="Who It's For · Pricing · Why Us" />
            <h2 style={{ color: INK, fontSize: 21, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '8px 0 6px' }}>
              Built for operators who are done<br />
              <span style={{ color: TEAL }}>carrying everything themselves.</span>
            </h2>
          </div>

          <div style={{ padding: '10px 12px', background: CARD,
            border: `1px solid ${RULE}`, borderRadius: 8 }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: MUTED,
              textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 6 }}>
              This is for you if you're
            </div>
            {[
              'Managing GP on spreadsheets and catching problems too late',
              'Dealing with high turnover and operational knowledge walking out the door',
              'Spending more time on compliance than on running the business',
              'Running multiple sites and losing visibility as you scale',
              'Relying on one experienced person who holds everything together',
              'Paying for software that your operation doesn\'t actually fully use',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, marginBottom: i < 5 ? 5 : 0 }}>
                <span style={{ color: TEAL, fontSize: 9, flexShrink: 0 }}>→</span>
                <span style={{ color: '#374151', fontSize: 9.5, lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div style={{ border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden', flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: INK }}>
              <div style={{ padding: '6px 11px', color: TEAL_LT, fontSize: 9, fontWeight: 800 }}>
                HospitalitySupport.uk
              </div>
              <div style={{ padding: '6px 11px', color: '#475569', fontSize: 9, fontWeight: 800,
                borderLeft: '1px solid rgba(255,255,255,0.07)' }}>Everyone else</div>
            </div>
            {[
              ['Live in 5 minutes',               '6-week implementation'],
              ['Dish concept → live in 3 min',    '2–3 hours of chef admin'],
              ['Allergens auto-generated',         'Manual spreadsheet updates'],
              ['HACCP built per dish',             'Generic template, copied'],
              ['Ordering auto-built from menu',    'Manual shopping lists'],
              ['Delivery checker built in',        'Paper-based, no records'],
              ['Suppliers update themselves',      'You manually enter prices'],
              ['Live GP on every price change',    'Recalculated monthly (maybe)'],
              ['Built by operators',               'Built by developers'],
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
                background: i % 2 === 0 ? WHITE : CARD,
                borderTop: `1px solid ${RULE}` }}>
                <div style={{ padding: '5px 11px', fontSize: 9.5, color: INK, fontWeight: 600 }}>{row[0]}</div>
                <div style={{ padding: '5px 11px', fontSize: 9.5, color: FAINT,
                  borderLeft: `1px solid ${RULE}` }}>{row[1]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dark */}
        <div style={{ background: DARK_MID, padding: '18px 28px 16px 14px',
          display: 'flex', flexDirection: 'column', gap: 10 }}>

          <DarkWindow title="group dashboard — all sites" live>
            <div style={{ padding: '8px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, marginBottom: 9 }}>
                {[
                  { val: '6',     label: 'Sites'       },
                  { val: '71%',   label: 'Avg GP'      },
                  { val: '5/6',   label: 'Compliant'   },
                  { val: '£12.4k',label: 'This week'   },
                ].map(s => (
                  <div key={s.label} style={{ background: `${TEAL}14`,
                    borderRadius: 5, padding: '5px 6px', textAlign: 'center' as const }}>
                    <div style={{ color: TEAL_LT, fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: MUTED, fontSize: 7.5, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {[
                { site: 'Kings Cross',  gp: 72, comp: true,  spend: '£2,100' },
                { site: 'Shoreditch',   gp: 69, comp: true,  spend: '£1,840' },
                { site: 'Camden',       gp: 74, comp: true,  spend: '£2,250' },
                { site: 'Brixton',      gp: 71, comp: false, spend: '£1,960' },
                { site: 'Canary Wharf', gp: 68, comp: true,  spend: '£2,400' },
                { site: 'Hackney',      gp: 75, comp: true,  spend: '£1,850' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'grid',
                  gridTemplateColumns: '1fr auto auto auto', gap: 9,
                  alignItems: 'center', padding: '4px 0',
                  borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 600 }}>{s.site}</span>
                  <span style={{ color: s.gp >= 70 ? TEAL_LT : '#f59e0b',
                    fontSize: 9, fontWeight: 700 }}>{s.gp}%</span>
                  <span style={{ color: s.comp ? TEAL_LT : '#f87171',
                    fontSize: 9, fontWeight: 700 }}>{s.comp ? '✓' : '!'}</span>
                  <span style={{ color: MUTED, fontSize: 8.5, fontFamily: 'monospace' }}>{s.spend}</span>
                </div>
              ))}
            </div>
          </DarkWindow>

          {/* Pricing */}
          <DarkWindow title="pricing — per kitchen, not per user">
            <div style={{ padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { tier: 'Standard Venue',  price: '£100/mo', sub: 'Pubs, restaurants, cafés',        tag: '£3.30 per day',             hi: true  },
                { tier: 'Dark Kitchen',    price: '£250/mo', sub: 'Dark kitchens, production kitchens', tag: '',                          hi: false },
                { tier: 'Multi-Site',      price: '£100/site', sub: 'Same price, every site, always',  tag: 'Group reporting included',   hi: false },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '7px 10px',
                  background: p.hi ? `${TEAL}14` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${p.hi ? `${TEAL}35` : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 7 }}>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 9.5, fontWeight: 700 }}>{p.tier}</div>
                    <div style={{ color: MUTED, fontSize: 8 }}>{p.sub}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ color: p.hi ? TEAL_LT : FAINT,
                      fontSize: 13, fontWeight: 900, lineHeight: 1 }}>{p.price}</div>
                    {p.tag && <div style={{ color: MUTED, fontSize: 7.5, marginTop: 1 }}>{p.tag}</div>}
                  </div>
                </div>
              ))}
              <div style={{ color: '#334155', fontSize: 8, marginTop: 2 }}>
                Annual billing · No setup fees · No per-user pricing · No hidden costs
              </div>
            </div>
          </DarkWindow>

          {/* Closing CTA */}
          <div style={{ background: DARK_UI, borderRadius: 9, padding: '16px 16px',
            border: `1px solid ${TEAL}35`, marginTop: 'auto',
            boxShadow: `0 0 32px ${TEAL}18` }}>
            <div style={{ color: WHITE, fontWeight: 900, fontSize: 15,
              lineHeight: 1.2, marginBottom: 7 }}>
              It doesn't change what hospitality is.
            </div>
            <div style={{ color: FAINT, fontSize: 10, lineHeight: 1.65, marginBottom: 14 }}>
              It changes what you personally have to carry. Menu development. GP control. Allergens. Compliance. Training. Front-of-house. All of it. From £3.30 a day. No payroll. No politics. No sick days.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: TEAL, color: WHITE, fontWeight: 900,
                fontSize: 11, padding: '9px 16px', borderRadius: 8,
                whiteSpace: 'nowrap' as const, letterSpacing: '-0.01em' }}>
                Book a 30-min demo →
              </div>
              <span style={{ color: MUTED, fontSize: 9, lineHeight: 1.5 }}>
                We'll show your dishes recosting live.<br />
                Your data. No slides. No pitch deck.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════════════════════════════════ */
export default function Print5Page() {
  return (
    <div className="min-h-full bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">5-Pager — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">Full sales brochure · 5 A4 pages · Print or save as PDF</p>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Print / Save PDF
          </button>
        </div>

        <style>{`
          @media print {
            body { margin: 0; background: white !important; }
            .print-page { box-shadow: none !important; page-break-after: always; }
            .print-page:last-child { page-break-after: avoid; }
            .no-print { display: none !important; }
          }
          @page { size: A4 portrait; margin: 0; }
        `}</style>

        <div className="space-y-6">
          <Page1 />
          <Page2 />
          <Page3 />
          <Page4 />
          <Page5 />
        </div>
      </div>
    </div>
  );
}
