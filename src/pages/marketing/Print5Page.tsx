import React from 'react';

const T = '#0d9488';
const DARK = '#080f1a';
const MID = '#0f1623';
const UI = '#1a2535';

/* ─── Shared page shell ─── */
function Page({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div
      className="print-page bg-white shadow-2xl overflow-hidden"
      style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ background: DARK, padding: '9px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 13, letterSpacing: '-0.01em' }}>
          HospitalitySupport<span style={{ color: '#2dd4bf' }}>.uk</span>
        </span>
        <span style={{ color: '#334155', fontSize: 8.5 }}>Page {n} of 5</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '6px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ color: '#94a3b8', fontSize: 7.5 }}>Built by operators, for operators · No 6-week onboarding · No consultants</span>
        <span style={{ color: T, fontSize: 7.5, fontWeight: 700 }}>hospitalitysupport.uk</span>
      </div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span style={{ display: 'inline-block', background: 'rgba(13,148,136,0.12)', border: '1px solid rgba(13,148,136,0.28)', color: '#2dd4bf', fontSize: 8, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' as const, padding: '2px 10px', borderRadius: 99, marginBottom: 10 }}>
      {text}
    </span>
  );
}

function MockWindow({ title, live, children }: { title: string; live?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: UI, borderRadius: 9, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
      <div style={{ background: '#0d1a26', padding: '5px 11px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#475569', fontSize: 7.5, fontFamily: 'monospace' }}>{title}</span>
        {live && <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2dd4bf', display: 'inline-block' }} /><span style={{ color: '#2dd4bf', fontSize: 7, fontWeight: 700 }}>LIVE</span></span>}
      </div>
      {children}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   PAGE 1 — MIND MAP
   Centre: Menu Development → branches to every capability area
─────────────────────────────────────────────────────────────────────────── */

// SVG mind map
// Viewbox 760 × 560 — gives plenty of breathing room for 8 branches + sub-pills
// Centre node at (380, 280). Branches at 130px radius, sub-pills at 90px beyond that.
function MindMap() {
  const cx = 380;
  const cy = 278;
  const branchR = 130;   // core → branch node centre
  const subDist = 95;    // branch node centre → sub-pill centre
  const nodeR = 34;      // branch circle radius
  const coreR = 52;      // core circle radius

  const branches = [
    {
      angle: -90,
      colour: '#0d9488',
      label: ['Recipe', '& Spec'],
      subs: [
        { text: 'Full recipe & method', w: 82 },
        { text: 'Portions & mise en place', w: 96 },
        { text: 'Batch & scaling notes', w: 84 },
      ],
    },
    {
      angle: -38,
      colour: '#0284c7',
      label: ['Cost', '& GP'],
      subs: [
        { text: 'Live ingredient costs', w: 78 },
        { text: 'GP calculation', w: 62 },
        { text: 'Sell-price guidance', w: 76 },
      ],
    },
    {
      angle: 14,
      colour: '#7c3aed',
      label: ['Supplier', 'Pricing'],
      subs: [
        { text: 'Auto-recost on change', w: 86 },
        { text: 'Invoice scanning', w: 68 },
        { text: 'Supplier messaging', w: 74 },
      ],
    },
    {
      angle: 65,
      colour: '#dc2626',
      label: ['Allergens', '& Nutrition'],
      subs: [
        { text: '14 allergens auto-gen.', w: 84 },
        { text: "Natasha's Law compliant", w: 92 },
        { text: 'Nutrition per portion', w: 80 },
      ],
    },
    {
      angle: 115,
      colour: '#d97706',
      label: ['HACCP', '& Safety'],
      subs: [
        { text: 'CCPs per dish', w: 60 },
        { text: 'Critical limits', w: 62 },
        { text: 'Corrective actions', w: 72 },
      ],
    },
    {
      angle: 166,
      colour: '#059669',
      label: ['Training'],
      subs: [
        { text: 'Generated from your ops', w: 90 },
        { text: 'Cert expiry tracking', w: 76 },
        { text: 'Auto-updates on change', w: 88 },
      ],
    },
    {
      angle: -167,
      colour: '#0891b2',
      label: ['Front of', 'House'],
      subs: [
        { text: 'Live menu knowledge', w: 78 },
        { text: 'Allergen answers FOH', w: 82 },
        { text: 'Dish descriptions & pairings', w: 104 },
      ],
    },
    {
      angle: -141,
      colour: '#9333ea',
      label: ['Compliance'],
      subs: [
        { text: 'Evidence as it happens', w: 86 },
        { text: 'Signed briefings', w: 68 },
        { text: 'One-click FSA reports', w: 82 },
      ],
    },
  ];

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const PH = 16; // pill half-height

  return (
    <svg viewBox="0 0 760 556" style={{ width: '100%', display: 'block' }}>
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx={cx} cy={cy} rx={145} ry={145} fill="url(#core-glow)" />

      {branches.map((b) => {
        const rad = toRad(b.angle);
        const bx = cx + branchR * Math.cos(rad);
        const by = cy + branchR * Math.sin(rad);

        return (
          <g key={b.label.join('')}>
            {/* Connector line */}
            <line
              x1={cx + coreR * Math.cos(rad)}
              y1={cy + coreR * Math.sin(rad)}
              x2={bx - nodeR * Math.cos(rad)}
              y2={by - nodeR * Math.sin(rad)}
              stroke={b.colour} strokeWidth="1.8" strokeOpacity="0.55"
            />

            {/* Branch circle */}
            <circle cx={bx} cy={by} r={nodeR + 2} fill={DARK} stroke={b.colour} strokeWidth="1.6" />
            <circle cx={bx} cy={by} r={nodeR} fill={MID} />

            {/* Branch label */}
            {b.label.map((line, li) => (
              <text
                key={li}
                x={bx} y={by + (b.label.length === 1 ? 3.5 : li === 0 ? -3.5 : 7.5)}
                textAnchor="middle"
                fill={b.colour}
                fontSize="8.5"
                fontWeight="800"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {line}
              </text>
            ))}

            {/* Sub-pills — spread in a tight fan along the branch direction */}
            {b.subs.map((sub, si) => {
              const count = b.subs.length;
              const fanTotal = 30; // degrees total spread for all subs
              const fanStep = count > 1 ? fanTotal / (count - 1) : 0;
              const subAngle = b.angle - fanTotal / 2 + si * fanStep;
              const subRad = toRad(subAngle);
              const sx = bx + subDist * Math.cos(subRad);
              const sy = by + subDist * Math.sin(subRad);
              const hw = sub.w / 2;

              return (
                <g key={sub.text}>
                  <line
                    x1={bx + (nodeR + 2) * Math.cos(subRad)}
                    y1={by + (nodeR + 2) * Math.sin(subRad)}
                    x2={sx} y2={sy}
                    stroke={b.colour} strokeWidth="1" strokeOpacity="0.3"
                    strokeDasharray="3,2"
                  />
                  <rect
                    x={sx - hw} y={sy - PH}
                    width={sub.w} height={PH * 2}
                    rx={PH}
                    fill={DARK}
                    stroke={b.colour}
                    strokeWidth="0.9"
                    strokeOpacity="0.45"
                  />
                  <text
                    x={sx} y={sy + 4}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="6.8"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {sub.text}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Core node — rendered last so it sits on top */}
      <circle cx={cx} cy={cy} r={coreR + 3} fill={DARK} stroke={T} strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={coreR} fill={MID} />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">Menu</text>
      <text x={cx} y={cy + 4}  textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">Development</text>
      <text x={cx} y={cy + 17} textAnchor="middle" fill="#2dd4bf" fontSize="7.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">· everything starts here ·</text>
    </svg>
  );
}

function Page1() {
  return (
    <Page n={1}>
      <div style={{ background: MID, flex: 1, padding: '12px 24px 10px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, background: 'radial-gradient(circle, rgba(13,148,136,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Compact header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, gap: 16 }}>
          <div style={{ flex: 1 }}>
            <Badge text="The operating platform for modern hospitality" />
            <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '2px 0 4px' }}>
              Every area of your operation.{' '}
              <span style={{ color: '#2dd4bf' }}>All connected. Always live.</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: 9.5, lineHeight: 1.5, margin: 0, maxWidth: 480 }}>
              It starts with menu development — and branches into every part of your business. One platform. No spreadsheets. No separate systems.
            </p>
          </div>
          {/* Price badge */}
          <div style={{ background: T, borderRadius: 9, padding: '9px 14px', textAlign: 'center' as const, flexShrink: 0 }}>
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 900, lineHeight: 1 }}>£3.30</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 8, marginTop: 2 }}>per kitchen / day</div>
          </div>
        </div>

        {/* Three problems — tight horizontal strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 6 }}>
          {[
            { prob: 'People', col: '#f87171', desc: 'Skills eroding. Turnover constant. Standards rely on one or two people.' },
            { prob: 'Process', col: '#fbbf24', desc: 'Compliance reactive. Evidence missing until you need it.' },
            { prob: 'Profit', col: '#34d399', desc: 'Margins bleeding slowly. Supplier prices creep. Caught too late.' },
          ].map(p => (
            <div key={p.prob} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${p.col}28`, borderRadius: 7, padding: '6px 10px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ color: p.col, fontSize: 9, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>{p.prob}</div>
              <div style={{ color: '#475569', fontSize: 8, lineHeight: 1.4 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Mind map — takes all remaining space */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <MindMap />
        </div>

        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, marginTop: 4 }}>
          {[
            { val: '3 min', label: 'Concept → live dish' },
            { val: '14', label: 'Allergens tracked' },
            { val: '5 min', label: 'Overall go-live' },
            { val: '0', label: 'Spreadsheets needed' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: '5px 6px', textAlign: 'center' as const }}>
              <div style={{ color: '#2dd4bf', fontSize: 13, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: '#475569', fontSize: 7, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   PAGE 2 — MENU, RECIPE & GP
─────────────────────────────────────────────────────────────────────────── */
function Page2() {
  return (
    <Page n={2}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        <div style={{ background: '#f1f5f9', padding: '16px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <Badge text="Menu Development · Cost & GP · Allergens · HACCP" />
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
            Full dish. Fully priced.<br />
            <span style={{ color: T }}>Under 3 minutes.</span>
          </h2>

          <MockWindow title="step 01 — describe your dish">
            <div style={{ padding: '8px 11px' }}>
              <div style={{ background: 'rgba(45,212,191,0.07)', border: '1px solid rgba(45,212,191,0.18)', borderRadius: 6, padding: '7px 10px', color: '#e2e8f0', fontSize: 9.5, lineHeight: 1.5 }}>
                "Spring fish special — elegant, max 5 ingredients, 70%+ GP, works on a junior chef section, pairs well with white Burgundy."
              </div>
            </div>
          </MockWindow>

          <MockWindow title="step 02 — recipe built, priced against live suppliers" live>
            <div style={{ padding: '5px 11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
              <span style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 700 }}>Pan-Seared Sea Trout, Lemon Beurre Blanc</span>
              <span style={{ color: '#2dd4bf', fontSize: 9.5, fontWeight: 800 }}>GP 73%</span>
            </div>
            {[
              { item: 'Sea trout fillet 140g', cost: '£3.20', sup: 'Coastal Fresh' },
              { item: 'Unsalted butter 30g', cost: '£0.18', sup: 'Premier Foods' },
              { item: 'Lemon ½', cost: '£0.12', sup: 'Fresh Direct' },
              { item: 'White wine 50ml', cost: '£0.28', sup: 'Cellar Direct' },
              { item: 'Dill garnish 5g', cost: '£0.09', sup: 'Fresh Direct' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 11px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span style={{ color: '#94a3b8', fontSize: 8.5, flex: 1 }}>{r.item}</span>
                <span style={{ color: '#2dd4bf', fontSize: 8.5, fontFamily: 'monospace', fontWeight: 700, width: 32, textAlign: 'right' as const }}>{r.cost}</span>
                <span style={{ color: '#334155', fontSize: 8, width: 70, textAlign: 'right' as const }}>{r.sup}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 11px' }}>
              <span style={{ color: '#475569', fontSize: 8 }}>Total cost per portion</span>
              <span style={{ color: '#fff', fontSize: 9, fontWeight: 800 }}>£3.87 → sell £14.50</span>
            </div>
          </MockWindow>

          <MockWindow title="step 03 — allergen matrix, auto-generated">
            <div style={{ padding: '7px 11px' }}>
              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' as const, marginBottom: 5 }}>
                {[
                  { n: 'Fish', p: true }, { n: 'Dairy', p: true }, { n: 'Sulphites', p: true },
                  { n: 'Gluten', p: false }, { n: 'Eggs', p: false }, { n: 'Nuts', p: false },
                  { n: 'Soya', p: false }, { n: 'Sesame', p: false }, { n: 'Celery', p: false },
                  { n: 'Mustard', p: false }, { n: 'Crustaceans', p: false },
                ].map(a => (
                  <span key={a.n} style={{ fontSize: 7.5, fontWeight: 700, padding: '2px 5px', borderRadius: 4, background: a.p ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.04)', color: a.p ? '#fca5a5' : '#475569', border: `1px solid ${a.p ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
                    {a.p ? '⚠ ' : ''}{a.n}
                  </span>
                ))}
              </div>
              <span style={{ color: T, fontSize: 7.5, fontWeight: 700 }}>14 allergens tracked · Natasha's Law compliant · Auto-updates on any ingredient change</span>
            </div>
          </MockWindow>

          <MockWindow title="step 04 — HACCP controls, per dish">
            <div style={{ padding: '7px 11px' }}>
              {[
                { ccp: 'CCP1', step: 'Receiving', control: 'Core temp ≤3°C on delivery', action: 'Reject if above' },
                { ccp: 'CCP2', step: 'Storage', control: 'Fridge ≤5°C, covered, labelled', action: 'Move/discard' },
                { ccp: 'CCP3', step: 'Cooking', control: 'Core temp ≥63°C for 2 min', action: 'Re-cook or discard' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: i < 2 ? 5 : 0 }}>
                  <span style={{ color: '#2dd4bf', fontSize: 7, fontWeight: 800, background: 'rgba(45,212,191,0.1)', padding: '1px 5px', borderRadius: 3, flexShrink: 0, marginTop: 1 }}>{c.ccp}</span>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 700 }}>{c.step} — <span style={{ color: '#64748b', fontWeight: 400 }}>{c.control}</span></div>
                    <div style={{ color: '#fbbf24', fontSize: 7.5 }}>Corrective action: {c.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </MockWindow>
        </div>

        <div style={{ padding: '16px 28px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ color: '#475569', fontSize: 10.5, lineHeight: 1.6, margin: '0 0 4px' }}>
            A head chef used to spend 2–3 hours on this per dish. Recipe development, costing, allergen checks, HACCP, portioning — all separate tasks, all manual. The platform handles all of it from a single description.
          </p>

          <div style={{ padding: '10px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: '#15803d', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 6 }}>Generated per dish</div>
            {[
              'Full recipe — portions, method, mise en place, batch notes',
              'Ingredient list priced against your live suppliers',
              'GP calculation and sell-price recommendation',
              '14-allergen matrix, auto-updated on any change',
              'HACCP controls: CCPs, critical limits, corrective actions',
              'Nutritional breakdown per portion (kcal, protein, fat, carbs, salt)',
              'FOH dish description ready for menus and table cards',
              'Wine and beverage pairings',
              'Training notes for kitchen and front of house',
              'Live GP tracking — recosted on every supplier price change',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                <span style={{ color: '#16a34a', fontSize: 8.5, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span style={{ color: '#374151', fontSize: 9.5, lineHeight: 1.45 }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '9px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8 }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>Before this platform</div>
            {[
              '2–3 hours per dish spec — every time a menu changes',
              'Allergen spreadsheets done manually — and usually behind',
              'HACCP copied from a generic template',
              'GP recalculated only at month end — if at all',
            ].map(t => (
              <div key={t} style={{ fontSize: 9.5, color: '#94a3b8', textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
            ))}
          </div>

          <div style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)', borderRadius: 8, padding: '9px 12px', marginTop: 'auto' }}>
            <div style={{ color: T, fontSize: 10.5, fontWeight: 800, lineHeight: 1.4 }}>From concept to fully priced, allergen-compliant, HACCP-controlled live dish.</div>
            <div style={{ color: '#475569', fontSize: 9, marginTop: 4 }}>Under 3 minutes. Every time.</div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   PAGE 3 — LIVE PRICING & SUPPLIER ECOSYSTEM
─────────────────────────────────────────────────────────────────────────── */
function Page3() {
  return (
    <Page n={3}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        <div style={{ padding: '16px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Badge text="Live Supplier Pricing · Cost & GP Intelligence" />
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
            Supplier changes price.<br />
            <span style={{ color: T }}>Every dish recoasts itself.</span>
          </h2>
          <p style={{ color: '#475569', fontSize: 10.5, lineHeight: 1.6, margin: '0 0 6px' }}>
            Connect your suppliers once. When they update their prices, every linked recipe recoasts in seconds. You see exactly which dishes are affected — before service, before you're committed, before it costs you.
          </p>

          {[
            { icon: '🔗', title: 'Connect existing suppliers', body: 'One invitation. Suppliers get their own portal. Pricing and catalogues — they keep it current. You see the results.' },
            { icon: '⚡', title: 'Sub-second propagation', body: 'Supplier changes a price at 06:00. By 06:01 every linked dish is recosted and your dashboard shows the impact.' },
            { icon: '🔔', title: 'Flagged before service', body: 'Dishes below GP target are highlighted automatically. You know before a cover is served.' },
            { icon: '🔄', title: 'Two-tier supply chain', body: 'See what your supplier is paying their vendor. Understand cost pressure before it hits your invoice.' },
            { icon: '📄', title: 'Invoice scanning', body: 'Upload a PDF delivery note. Line items extracted, matched, and reconciled automatically.' },
            { icon: '💬', title: 'Supplier messaging', body: 'All supplier communication in one auditable thread. No lost emails. No missed price changes.' },
          ].map(c => (
            <div key={c.title} style={{ display: 'flex', gap: 8, padding: '7px 10px', background: '#f8fafc', borderRadius: 7, border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: 12, lineHeight: 1, flexShrink: 0 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 10, color: '#0f172a', marginBottom: 1.5 }}>{c.title}</div>
                <div style={{ fontSize: 9, color: '#64748b', lineHeight: 1.45 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#f1f5f9', padding: '16px 28px 14px 12px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <MockWindow title="recipe costing — all dishes" live>
            <div style={{ padding: '4px 11px', display: 'grid', gridTemplateColumns: '1fr 40px 40px 36px', gap: 6 }}>
              {['Dish', 'Cost', 'Sell', 'GP'].map(h => (
                <span key={h} style={{ color: '#334155', fontSize: 7, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{h}</span>
              ))}
            </div>
            {[
              { name: 'Sea Trout, Beurre Blanc', cost: '£3.87', sell: '£14.50', gp: '73%', alert: false },
              { name: 'Salmon Fillet, Crushed Pea', cost: '£4.28', sell: '£14.50', gp: '70%', alert: true },
              { name: 'Beef Burger & Fries', cost: '£3.85', sell: '£12.00', gp: '68%', alert: false },
              { name: 'Fish & Chips', cost: '£5.10', sell: '£15.50', gp: '67%', alert: true },
              { name: 'Mushroom Risotto', cost: '£2.95', sell: '£11.50', gp: '74%', alert: false },
              { name: 'Caesar Salad', cost: '£2.40', sell: '£10.00', gp: '76%', alert: false },
              { name: 'Chicken Supreme', cost: '£3.60', sell: '£13.00', gp: '72%', alert: false },
            ].map((d, i) => (
              <div key={i} style={{ padding: '4px 11px', borderTop: '1px solid rgba(255,255,255,0.04)', background: d.alert ? 'rgba(248,113,113,0.04)' : 'transparent', display: 'grid', gridTemplateColumns: '1fr 40px 40px 36px', gap: 6, alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0', fontSize: 8.5, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {d.alert && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#f87171', display: 'inline-block', flexShrink: 0 }} />}
                  {d.name}
                </span>
                <span style={{ color: '#64748b', fontSize: 8, fontFamily: 'monospace', textAlign: 'right' as const }}>{d.cost}</span>
                <span style={{ color: '#475569', fontSize: 8, fontFamily: 'monospace', textAlign: 'right' as const }}>{d.sell}</span>
                <span style={{ color: parseInt(d.gp) >= 70 ? '#2dd4bf' : '#f59e0b', fontSize: 9, fontWeight: 800, textAlign: 'right' as const }}>{d.gp}</span>
              </div>
            ))}
            <div style={{ padding: '5px 11px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 6, justifyContent: 'space-between' }}>
              <span style={{ color: '#f87171', fontSize: 7.5 }}>⚠ 2 dishes flagged — salmon price +8p overnight</span>
              <span style={{ color: '#2dd4bf', fontSize: 7.5 }}>Synced 06:12</span>
            </div>
          </MockWindow>

          <MockWindow title="supplier portal — Coastal Fresh Ltd">
            <div style={{ padding: '8px 11px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#cbd5e1', fontSize: 9, fontWeight: 700 }}>Price update — uploaded 05:58</span>
                <span style={{ color: T, fontSize: 7.5, fontWeight: 700, background: 'rgba(13,148,136,0.1)', padding: '1px 7px', borderRadius: 3 }}>AUTO-SYNCED</span>
              </div>
              {[
                { item: 'Salmon fillet 140g', old: '£4.12', new: '£4.20', pct: '+1.9%', up: true },
                { item: 'Sea trout fillet 140g', old: '£3.79', new: '£3.87', pct: '+2.1%', up: true },
                { item: 'Cod loin 180g', old: '£5.05', new: '£5.08', pct: '+0.6%', up: true },
                { item: 'Sea bass 200g', old: '£6.80', new: '£6.80', pct: '—', up: false },
              ].map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 36px 40px 36px', gap: 6, padding: '4px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center' }}>
                  <span style={{ color: '#94a3b8', fontSize: 8.5 }}>{r.item}</span>
                  <span style={{ color: '#475569', fontSize: 8, textDecoration: 'line-through', textAlign: 'right' as const }}>{r.old}</span>
                  <span style={{ color: '#e2e8f0', fontSize: 8.5, fontFamily: 'monospace', textAlign: 'right' as const }}>{r.new}</span>
                  <span style={{ color: r.up ? '#f87171' : '#475569', fontSize: 8, fontWeight: 700, textAlign: 'right' as const }}>{r.pct}</span>
                </div>
              ))}
              <div style={{ color: '#334155', fontSize: 7.5, marginTop: 5 }}>Supplier updated their own portal · All linked dishes recosted automatically · No action needed</div>
            </div>
          </MockWindow>

          <MockWindow title="supplier messages — Coastal Fresh Ltd">
            <div style={{ padding: '8px 11px' }}>
              {[
                { msg: 'Any flexibility on sea trout this week?', mine: true, time: '08:12' },
                { msg: 'Wholesale market up 3%. Best we can do is £3.87. Already updated on portal — your dishes will have recosted.', mine: false, time: '08:16' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
                  <div style={{ background: m.mine ? T : 'rgba(255,255,255,0.06)', color: m.mine ? '#fff' : '#cbd5e1', fontSize: 8.5, padding: '5px 9px', borderRadius: 7, maxWidth: '85%', lineHeight: 1.45 }}>{m.msg}</div>
                  <span style={{ color: '#334155', fontSize: 7, marginTop: 2 }}>{m.time}</span>
                </div>
              ))}
            </div>
          </MockWindow>
        </div>
      </div>
    </Page>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   PAGE 4 — COMPLIANCE, TRAINING & FRONT OF HOUSE
─────────────────────────────────────────────────────────────────────────── */
function Page4() {
  return (
    <Page n={4}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        <div style={{ background: '#f1f5f9', padding: '16px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <Badge text="Compliance · Training · Front of House" />
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
            Audit-ready every day.<br />
            <span style={{ color: T }}>Always current. Always evidenced.</span>
          </h2>

          <MockWindow title="pre-service briefing — lunch service">
            <div style={{ padding: '7px 11px' }}>
              <div style={{ color: '#64748b', fontSize: 8, marginBottom: 5 }}>Staff sign-in — 11:45</div>
              {[
                { name: 'Jamie Smith', role: 'Head Chef', done: true },
                { name: 'Maria Garcia', role: 'Sous Chef', done: true },
                { name: 'Tom Lee', role: 'FOH Lead', done: true },
                { name: 'New Start', role: 'KP', done: false },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ color: '#e2e8f0', fontSize: 8.5 }}>{s.name} <span style={{ color: '#475569' }}>· {s.role}</span></span>
                  <span style={{ color: s.done ? T : '#f87171', fontSize: 8, fontWeight: 700 }}>{s.done ? '✓ SIGNED' : 'PENDING'}</span>
                </div>
              ))}
              <div style={{ marginTop: 7, background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.18)', borderRadius: 5, padding: '5px 8px' }}>
                <div style={{ color: '#fca5a5', fontSize: 7.5, fontWeight: 800, marginBottom: 2 }}>HIGH RISK TODAY — new dish on</div>
                <div style={{ color: '#94a3b8', fontSize: 8 }}>Sea Trout — Fish, Dairy, Sulphites present · Brief all FOH before service</div>
              </div>
            </div>
          </MockWindow>

          <MockWindow title="compliance tasks — this week">
            <div style={{ padding: '7px 11px' }}>
              {[
                { task: 'Pre-service allergen briefing', done: true, sig: 'J. Smith' },
                { task: 'Fridge temperature log AM', done: true, sig: 'Auto' },
                { task: 'Delivery note reconciliation', done: true, sig: 'M. Jones' },
                { task: 'Pre-service briefing — PM', done: true, sig: 'J. Smith' },
                { task: 'HACCP weekly review', done: false, sig: '' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: t.done ? T : 'rgba(245,158,11,0.2)', border: t.done ? 'none' : '1px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 7, color: '#fff', fontWeight: 900 }}>
                    {t.done ? '✓' : ''}
                  </span>
                  <span style={{ color: t.done ? '#475569' : '#fbbf24', fontSize: 8.5, flex: 1, textDecoration: t.done ? 'line-through' : 'none' }}>{t.task}</span>
                  {t.sig && <span style={{ color: '#334155', fontSize: 7.5 }}>{t.sig}</span>}
                </div>
              ))}
              <div style={{ color: T, fontSize: 7.5, marginTop: 5, fontWeight: 700 }}>4/5 complete · All timestamped · Inspection-ready</div>
            </div>
          </MockWindow>

          <MockWindow title="training — staff certifications">
            <div style={{ padding: '7px 11px' }}>
              {[
                { name: 'Jamie Smith', cert: 'Level 3 Food Safety', expires: 'Jan 2027', status: 'ok' },
                { name: 'Maria Garcia', cert: 'Level 2 Food Safety', expires: 'Jun 2025', status: 'due' },
                { name: 'Tom Lee', cert: 'Allergen Awareness', expires: 'Mar 2026', status: 'ok' },
                { name: 'New Start', cert: 'BOH Induction', expires: 'In progress', status: 'progress' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ color: '#64748b', fontSize: 7.5 }}>{s.cert}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ color: s.status === 'due' ? '#f87171' : s.status === 'progress' ? '#fbbf24' : T, fontSize: 8, fontWeight: 700 }}>
                      {s.status === 'due' ? 'DUE SOON' : s.status === 'progress' ? 'IN PROGRESS' : 'CURRENT'}
                    </div>
                    <div style={{ color: '#334155', fontSize: 7.5 }}>{s.expires}</div>
                  </div>
                </div>
              ))}
            </div>
          </MockWindow>
        </div>

        <div style={{ padding: '16px 28px 14px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <p style={{ color: '#475569', fontSize: 10.5, lineHeight: 1.6, margin: '0 0 4px' }}>
            Every task timestamped. Every signature captured. Every briefing recorded. Inspectors don't care about intentions — they want evidence. The platform creates it automatically, as work happens.
          </p>

          {[
            {
              heading: 'Compliance',
              colour: '#0284c7', bg: '#f0f9ff', border: '#bae6fd',
              points: [
                'Evidence captured in real time — forms, signatures, timestamps',
                'Pre-service allergen briefings with digital sign-off, every service',
                'Temperature logs, HACCP records, delivery checks in one place',
                'One-click FSA, HSE, and local authority inspection reports',
              ],
            },
            {
              heading: 'Training',
              colour: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe',
              points: [
                'Training content generated from your real menu and procedures',
                'Certifications tracked with automatic expiry alerts',
                'Onboarding content that mirrors how your kitchen actually works',
                'Auto-updates when menus or processes change',
              ],
            },
            {
              heading: 'Front of House',
              colour: '#0d9488', bg: '#f0fdfa', border: '#99f6e4',
              points: [
                'FOH always knows exactly what\'s on — specials, allergens, 86\'d items',
                'Allergen answers without "I\'ll just check in the kitchen"',
                'Dish descriptions and wine pairings generated and kept current',
                'Fewer errors, fewer complaints, better guest experience',
              ],
            },
          ].map(section => (
            <div key={section.heading} style={{ padding: '9px 11px', background: section.bg, border: `1px solid ${section.border}`, borderRadius: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: section.colour, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 5 }}>{section.heading}</div>
              {section.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                  <span style={{ color: section.colour, fontSize: 9, flexShrink: 0 }}>→</span>
                  <span style={{ color: '#374151', fontSize: 9.5, lineHeight: 1.45 }}>{p}</span>
                </div>
              ))}
            </div>
          ))}

          <div style={{ padding: '8px 11px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, marginTop: 'auto' }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>You'll never again</div>
            {[
              'Scramble to find paperwork before an inspection',
              'Chase staff to sign compliance records',
              'Brief FOH verbally and hope it sticks',
              'Let a training certification expire by accident',
            ].map(t => (
              <div key={t} style={{ fontSize: 9, color: '#94a3b8', textDecoration: 'line-through', marginBottom: 2.5 }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   PAGE 5 — WHO IT'S FOR, MULTI-SITE, PRICING & CLOSE
─────────────────────────────────────────────────────────────────────────── */
function Page5() {
  return (
    <Page n={5}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        <div style={{ padding: '16px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Badge text="Who It's For · Pricing · Why Us" />
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
            Built for operators who are done<br />
            <span style={{ color: T }}>carrying everything themselves.</span>
          </h2>

          <div style={{ padding: '9px 11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8 }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#475569', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 5 }}>This is for you if you're</div>
            {[
              'Managing GP on spreadsheets and catching problems too late',
              'Dealing with high turnover and operational knowledge walking out the door',
              'Spending more time on compliance than on running the business',
              'Running multiple sites and losing visibility as you scale',
              'Relying on one experienced person who holds everything together',
              'Paying for software that your operation doesn\'t actually use fully',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                <span style={{ color: T, fontSize: 9, flexShrink: 0 }}>→</span>
                <span style={{ color: '#374151', fontSize: 9.5, lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: MID }}>
              <div style={{ padding: '5px 10px', color: '#2dd4bf', fontSize: 8.5, fontWeight: 800 }}>HospitalitySupport.uk</div>
              <div style={{ padding: '5px 10px', color: '#475569', fontSize: 8.5, fontWeight: 800, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>Everyone else</div>
            </div>
            {[
              ['Live in 5 minutes', '6-week implementation'],
              ['Dish concept → live in 3 min', '2–3 hours of chef admin'],
              ['Allergens auto-generated', 'Manual spreadsheet updates'],
              ['HACCP built per dish', 'Generic template, copied'],
              ['Suppliers update themselves', 'You manually enter prices'],
              ['Live GP on every price change', 'Recalculated monthly (maybe)'],
              ['Simple, intuitive interface', 'Complex software, needs training'],
              ['Built by operators', 'Built by developers'],
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: i % 2 === 0 ? '#fff' : '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ padding: '5px 10px', fontSize: 9, color: '#0f172a', fontWeight: 600 }}>{row[0]}</div>
                <div style={{ padding: '5px 10px', fontSize: 9, color: '#94a3b8', borderLeft: '1px solid #e2e8f0' }}>{row[1]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#f1f5f9', padding: '16px 28px 14px 12px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <MockWindow title="group dashboard — all sites" live>
            <div style={{ padding: '7px 11px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, marginBottom: 8 }}>
                {[{ val: '6', label: 'Sites' }, { val: '71%', label: 'Avg GP' }, { val: '5/6', label: 'Compliant' }, { val: '£12.4k', label: 'This week' }].map(s => (
                  <div key={s.label} style={{ background: 'rgba(13,148,136,0.1)', borderRadius: 5, padding: '5px 6px', textAlign: 'center' as const }}>
                    <div style={{ color: '#2dd4bf', fontSize: 13, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: '#475569', fontSize: 7, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {[
                { site: 'Kings Cross', gp: '72%', comp: true, spend: '£2,100' },
                { site: 'Shoreditch', gp: '69%', comp: true, spend: '£1,840' },
                { site: 'Camden', gp: '74%', comp: true, spend: '£2,250' },
                { site: 'Brixton', gp: '71%', comp: false, spend: '£1,960' },
                { site: 'Canary Wharf', gp: '68%', comp: true, spend: '£2,400' },
                { site: 'Hackney', gp: '75%', comp: true, spend: '£1,850' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, alignItems: 'center', padding: '3px 0', borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <span style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 600 }}>{s.site}</span>
                  <span style={{ color: parseInt(s.gp) >= 70 ? '#2dd4bf' : '#f59e0b', fontSize: 8.5, fontWeight: 700 }}>{s.gp}</span>
                  <span style={{ color: s.comp ? T : '#f87171', fontSize: 8, fontWeight: 700 }}>{s.comp ? '✓' : '⚠'}</span>
                  <span style={{ color: '#475569', fontSize: 8, fontFamily: 'monospace' }}>{s.spend}</span>
                </div>
              ))}
            </div>
          </MockWindow>

          <div style={{ background: UI, borderRadius: 9, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ background: '#0d1a26', padding: '5px 11px' }}>
              <span style={{ color: '#475569', fontSize: 7.5, fontFamily: 'monospace' }}>pricing — per kitchen, not per user</span>
            </div>
            <div style={{ padding: '8px 11px', display: 'flex', flexDirection: 'column' as const, gap: 5 }}>
              {[
                { tier: 'Standard Venue', price: '£100/mo', sub: 'Pubs, restaurants, cafés', tag: '£3.30/day' },
                { tier: 'Dark Kitchen', price: '£250/mo', sub: 'Dark kitchens, production kitchens', tag: '' },
                { tier: 'Multi-Site', price: '£100/site', sub: 'Same price, every site, always', tag: 'Group reporting included' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 9px', background: i === 0 ? 'rgba(13,148,136,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(13,148,136,0.25)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 6 }}>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 700 }}>{p.tier}</div>
                    <div style={{ color: '#64748b', fontSize: 7.5 }}>{p.sub}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ color: i === 0 ? '#2dd4bf' : '#94a3b8', fontSize: 11, fontWeight: 900 }}>{p.price}</div>
                    {p.tag && <div style={{ color: '#475569', fontSize: 7.5 }}>{p.tag}</div>}
                  </div>
                </div>
              ))}
              <div style={{ color: '#334155', fontSize: 7.5, marginTop: 2 }}>Annual billing · No setup fees · No per-user pricing · No hidden costs</div>
            </div>
          </div>

          <div style={{ background: MID, borderRadius: 9, padding: '14px 15px', border: '1px solid rgba(13,148,136,0.3)', marginTop: 'auto' }}>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 14, lineHeight: 1.2, marginBottom: 6 }}>
              It doesn't change what hospitality is.
            </div>
            <div style={{ color: '#94a3b8', fontSize: 9.5, lineHeight: 1.6, marginBottom: 12 }}>
              It changes what you personally have to carry. Menu development. GP control. Allergens. Compliance. Training. Front-of-house. All of it. From £3.30 a day. No payroll. No politics. No sick days.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ background: T, color: '#fff', fontWeight: 900, fontSize: 11, padding: '8px 15px', borderRadius: 7, whiteSpace: 'nowrap' as const }}>
                Book a 30-min demo →
              </div>
              <span style={{ color: '#475569', fontSize: 8.5, lineHeight: 1.4 }}>We'll show your dishes recosting live.<br />Your data. No slides. No pitch deck.</span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ─── Main export ─── */
export default function Print5Page() {
  return (
    <div className="min-h-full bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">5-Pager — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">Full sales brochure · 5 A4 pages · Print or save as PDF</p>
          </div>
          <button onClick={() => window.print()} className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
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
