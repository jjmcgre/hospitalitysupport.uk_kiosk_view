import React from 'react';

/* ── Tokens ─────────────────────────────────────────────────────────────── */
const T     = '#0d9488';   // teal
const TL    = '#2dd4bf';   // teal light
const INK   = '#0f172a';
const SLATE = '#1e293b';
const MID   = '#334155';
const MUTED = '#64748b';
const FAINT = '#94a3b8';
const RULE  = '#e2e8f0';
const SNOW  = '#f8fafc';
const WHITE = '#ffffff';
const DARK  = '#060d16';
const DMID  = '#0c1524';
const DUI   = '#1a2535';
const F     = "'Inter', system-ui, sans-serif";

/* ── Shared primitives ──────────────────────────────────────────────────── */
function DocPage({ children, bg = WHITE }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="print-page shadow-2xl overflow-hidden"
      style={{ width: '210mm', minHeight: '297mm', margin: '0 auto',
        fontFamily: F, display: 'flex', flexDirection: 'column',
        background: bg, position: 'relative' }}>
      {children}
    </div>
  );
}

function Header({ dark }: { dark?: boolean }) {
  return (
    <div style={{ padding: '8px 36px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexShrink: 0,
      borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : RULE}` }}>
      <span style={{ color: dark ? WHITE : INK, fontWeight: 900, fontSize: 11, letterSpacing: '-0.01em' }}>
        HospitalitySupport<span style={{ color: TL }}>.uk</span>
      </span>
      <span style={{ color: dark ? '#1e293b' : FAINT, fontSize: 7.5 }}>Confidential · Not for distribution</span>
    </div>
  );
}

function Footer({ n, dark }: { n: number; dark?: boolean }) {
  return (
    <div style={{ padding: '7px 36px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexShrink: 0, marginTop: 'auto',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : RULE}` }}>
      <span style={{ color: dark ? '#1e293b' : FAINT, fontSize: 7.5 }}>hospitalitysupport.uk</span>
      <span style={{ color: dark ? DUI : FAINT, fontSize: 7.5 }}>{n} / 8</span>
    </div>
  );
}

function Label({ text, colour = T }: { text: string; colour?: string }) {
  return (
    <p style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: '0.18em',
      textTransform: 'uppercase' as const, margin: '0 0 10px', color: colour }}>
      {text}
    </p>
  );
}

function Rule({ dark }: { dark?: boolean }) {
  return <hr style={{ border: 'none', borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : RULE}`, margin: '20px 0' }} />;
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 1 — COVER
   Full dark page. Oversized typography. Bold teal accent band.
══════════════════════════════════════════════════════════════════════════ */
function CoverPage() {
  return (
    <DocPage bg={DARK}>
      {/* Accent top bar */}
      <div style={{ height: 6, background: `linear-gradient(90deg, ${T}, ${TL})`, flexShrink: 0 }} />

      {/* Large background number — decorative */}
      <div style={{ position: 'absolute', right: -10, top: 60, fontSize: 320, fontWeight: 900,
        color: 'rgba(13,148,136,0.04)', lineHeight: 1, userSelect: 'none',
        letterSpacing: '-0.05em', pointerEvents: 'none' }}>
        01
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '44px 44px 36px', position: 'relative' }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: T,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 13, height: 13, borderRadius: 2, background: WHITE }} />
          </div>
          <span style={{ color: WHITE, fontWeight: 900, fontSize: 14, letterSpacing: '-0.02em' }}>
            HospitalitySupport<span style={{ color: TL }}>.uk</span>
          </span>
        </div>

        {/* Hero */}
        <div>
          <p style={{ color: T, fontSize: 8, fontWeight: 800, letterSpacing: '0.18em',
            textTransform: 'uppercase' as const, margin: '0 0 18px' }}>
            The complete operations platform for hospitality
          </p>
          <h1 style={{ color: WHITE, fontSize: 48, fontWeight: 900, lineHeight: 1.0,
            letterSpacing: '-0.04em', margin: '0 0 8px', maxWidth: 430 }}>
            The operations team you never had to hire.
          </h1>
          {/* Teal underline accent */}
          <div style={{ width: 60, height: 4, background: T, borderRadius: 2, margin: '0 0 24px' }} />
          <p style={{ color: FAINT, fontSize: 12, lineHeight: 1.7, maxWidth: 370, margin: '0 0 36px' }}>
            Menu development. Live GP control. Allergens. Food safety. Training. Front-of-house. Supplier pricing. Ordering. All of it — connected, live, and working the moment you sign up.
          </p>

          {/* 4-stat row */}
          <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)', background: DMID }}>
            {[
              { val: '£3.30', sub: 'per kitchen / day' },
              { val: '3 min', sub: 'dish concept to live spec' },
              { val: '5 min', sub: 'to go live from sign-up' },
              { val: '0',     sub: 'spreadsheets required' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: '16px 14px', textAlign: 'center' as const,
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ color: TL, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: MUTED, fontSize: 8, marginTop: 5, lineHeight: 1.3 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 18,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ color: MID, fontSize: 8, fontWeight: 700,
              textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 4px' }}>Pricing</p>
            <p style={{ color: MUTED, fontSize: 9.5, margin: 0, lineHeight: 1.55 }}>
              Standard Venue £100/mo &nbsp;·&nbsp; Dark Kitchen £250/mo &nbsp;·&nbsp; Multi-Site £100/site/mo
            </p>
          </div>
          <p style={{ color: '#1a2535', fontSize: 8, margin: 0 }}>Confidential · Not for distribution</p>
        </div>
      </div>
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 2 — THE PROBLEM
   Split: dark left panel with large "THE PROBLEM" type; light right with prose.
   Each problem gets a bold number + colour accent.
══════════════════════════════════════════════════════════════════════════ */
function ProblemPage() {
  const problems = [
    {
      n: '01', col: '#ef4444', head: 'People',
      intro: "Skill levels are eroding. Experience is leaving the industry. You're expected to deliver the same standards with less experienced staff — relying on one or two people to hold everything together.",
      bullets: [
        'High turnover means constant retraining, mostly informal and undocumented',
        'Operational knowledge is concentrated in a few individuals — a dangerous fragility',
        'When that person leaves, the knowledge goes with them',
      ],
    },
    {
      n: '02', col: '#f59e0b', head: 'Process',
      intro: 'Compliance is relentless, unforgiving, and mostly done reactively. Food safety records, allergen docs, pre-service briefings, staff certifications — all of it falls on people who are already stretched.',
      bullets: [
        'Compliance records created after problems, not as work happens',
        'Allergen information out of date and not linked to the live menu',
        'Pre-service briefings verbal — no evidence trail, no consistency',
      ],
    },
    {
      n: '03', col: '#7c3aed', head: 'Profit',
      intro: 'Margins erode quietly. Supplier prices creep. Portions drift. Most businesses don\'t lose margin in one hit — they bleed it slowly. By the time it\'s visible on the P&L, it\'s already cost thousands.',
      bullets: [
        'Supplier price changes rarely trigger an immediate recost',
        'GP calculated at menu launch — not revisited until month-end, if at all',
        'Portion drift is invisible until stock variance makes it undeniable',
      ],
    },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '38% 62%', minHeight: 0 }}>

        {/* Left — dark panel */}
        <div style={{ background: INK, padding: '28px 22px 28px 28px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <Label text="The Problem" colour={TL} />
            <h2 style={{ color: WHITE, fontSize: 26, fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-0.03em', margin: '0 0 16px' }}>
              Hospitality doesn't have hundreds of problems.<br />
              <span style={{ color: T }}>It has three.</span>
            </h2>
            <div style={{ width: 40, height: 3, background: T, borderRadius: 2, marginBottom: 18 }} />
            <p style={{ color: FAINT, fontSize: 9.5, lineHeight: 1.7, margin: 0 }}>
              Every challenge a hospitality operator faces traces back to one of these — and most businesses are fighting all three simultaneously, without the resources to do any of them properly.
            </p>
          </div>
          {/* Large decorative text */}
          <div style={{ color: 'rgba(255,255,255,0.04)', fontSize: 80, fontWeight: 900,
            lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none' }}>
            P<br />P<br />P
          </div>
          <div style={{ background: `${T}14`, border: `1px solid ${T}28`,
            borderRadius: 8, padding: '10px 12px' }}>
            <p style={{ color: T, fontSize: 9.5, fontWeight: 700, lineHeight: 1.55, margin: 0, fontStyle: 'italic' }}>
              "HospitalitySupport.uk is built to solve all three."
            </p>
          </div>
        </div>

        {/* Right — problems */}
        <div style={{ padding: '28px 28px 20px 22px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {problems.map((p, i) => (
            <div key={i} style={{ paddingBottom: i < 2 ? 20 : 0,
              borderBottom: i < 2 ? `1px solid ${RULE}` : 'none',
              marginBottom: i < 2 ? 20 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: p.col,
                  lineHeight: 1, letterSpacing: '-0.03em', opacity: 0.9 }}>{p.n}</span>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: INK,
                  margin: 0, letterSpacing: '-0.02em' }}>{p.head}</h3>
                <div style={{ flex: 1, height: 1, background: RULE }} />
              </div>
              <p style={{ fontSize: 10, lineHeight: 1.65, color: MUTED,
                margin: '0 0 10px' }}>{p.intro}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {p.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%',
                      background: p.col, flexShrink: 0, marginTop: 5 }} />
                    <span style={{ fontSize: 9.5, color: MUTED, lineHeight: 1.55 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer n={2} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 3 — THE SOLUTION
   Bold teal band across the top third. White lower section. Big stat strip.
══════════════════════════════════════════════════════════════════════════ */
function SolutionPage() {
  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        {/* Hero band */}
        <div style={{ background: INK, padding: '26px 36px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 20, top: -20, fontSize: 200, fontWeight: 900,
            color: 'rgba(45,212,191,0.04)', lineHeight: 1, userSelect: 'none', letterSpacing: '-0.05em' }}>
            03
          </div>
          <Label text="The Solution" colour={TL} />
          <h2 style={{ color: WHITE, fontSize: 28, fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.03em', margin: '0 0 8px', maxWidth: 480, position: 'relative' }}>
            Not software. Not a tool.{' '}
            <span style={{ color: TL }}>An operations platform built around how kitchens actually work.</span>
          </h2>
          <div style={{ width: 50, height: 3, background: T, borderRadius: 2, marginTop: 14 }} />
        </div>

        {/* Stat strip */}
        <div style={{ display: 'flex', background: T, flexShrink: 0 }}>
          {[
            { val: '3 min',   sub: 'dish to live spec' },
            { val: '< 1 sec', sub: 'price change to full recost' },
            { val: '14',      sub: 'allergens tracked per dish' },
            { val: '5 min',   sub: 'sign-up to live' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '10px 0', textAlign: 'center' as const,
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
              <div style={{ color: WHITE, fontSize: 18, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 7.5, marginTop: 3 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Body — two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px',
          padding: '22px 36px 0', flex: 1 }}>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, color: INK,
              margin: '0 0 8px', letterSpacing: '-0.01em' }}>Built by chefs, for chefs</h3>
            <p style={{ fontSize: 9.5, lineHeight: 1.7, color: MUTED, margin: '0 0 16px' }}>
              The platform was designed by people who have spent years in professional kitchens — not by developers who read about hospitality. That means it understands how dishes get built, how service runs, and what compliance looks like on the floor rather than on paper.
            </p>
            <p style={{ fontSize: 9.5, lineHeight: 1.7, color: MUTED, margin: 0 }}>
              The interface is plain English. There is no training required. If a chef can describe a dish — its style, target GP, likely audience — the platform builds it. If a manager can describe a problem, the platform responds to it.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, color: INK,
              margin: '0 0 8px', letterSpacing: '-0.01em' }}>Everything connected. Always live.</h3>
            <p style={{ fontSize: 9.5, lineHeight: 1.7, color: MUTED, margin: '0 0 14px' }}>
              A dish is created. Instantly its allergens are known, HACCP controls generated, cost calculated against live suppliers, training notes written. When a supplier changes a price, every linked dish recoasts automatically. When a recipe changes, the allergen matrix updates. This is what live means.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'No onboarding sessions or implementation projects',
                'No training required for kitchen or management teams',
                'Works on any device — phone, tablet, desktop',
                'The more you use it, the more it understands your operation',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: T, fontSize: 10, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 9.5, color: MUTED, lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pull quote full-width */}
        <div style={{ margin: '18px 36px 22px',
          background: SNOW, borderLeft: `5px solid ${T}`,
          borderRadius: '0 8px 8px 0', padding: '14px 20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: SLATE, fontStyle: 'italic',
            lineHeight: 1.5, margin: 0 }}>
            "You don't build your business around it. It builds itself around you."
          </p>
        </div>

        {/* Intuitive section */}
        <div style={{ padding: '0 36px 22px' }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, color: INK, margin: '0 0 8px' }}>Intuitive by design</h3>
          <p style={{ fontSize: 9.5, lineHeight: 1.7, color: MUTED, margin: '0 0 10px' }}>
            There are no modules to activate, no data to import, no hierarchy to configure. You describe what you need and it responds. A new dish, a compliance question, a training task, a supplier query — all handled through the same interface, in plain language, from any device, any time.
          </p>
        </div>
      </div>
      <Footer n={3} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 4 — WHAT IT COVERS
   8 capability cards in a 2-col grid — each with a bold colour bar and
   tight body copy. Closing connected-platform callout.
══════════════════════════════════════════════════════════════════════════ */
function CapabilityPage() {
  const caps = [
    { col: '#0d9488', title: 'Menu Development & Recipe Spec',
      body: 'Describe a dish in plain English — the platform builds the full spec: recipe, method, mise en place, portions, yield, batch notes, and pairings. Under 3 minutes. Every time.' },
    { col: '#0284c7', title: 'Cost & GP Control',
      body: 'Every dish priced against live supplier data the moment it\'s created. GP calculated continuously. When a supplier changes a price, every affected dish recoasts in under a second.' },
    { col: '#ea580c', title: 'Ordering & Deliveries',
      body: 'Shopping list auto-built from the live menu. Purchase orders generated with one action. Delivery checker matches goods received against the PO, flags discrepancies, and keeps the audit record.' },
    { col: '#7c3aed', title: 'Supplier Pricing & Management',
      body: 'Suppliers maintain their own pricing through a dedicated portal. Invoice scanning matches line items automatically. All supplier communication is logged in one auditable thread.' },
    { col: '#dc2626', title: 'Allergens & Nutrition',
      body: "All 14 allergens tracked per dish, automatically, from the ingredient list. Natasha's Law compliant. Updates itself whenever a recipe changes. Nutritional info calculated and kept live per portion." },
    { col: '#d97706', title: 'HACCP & Food Safety',
      body: 'Critical control points generated per dish at creation — receiving, storage, cooking, chilling, reheating. Specific critical limits. Evidence capture and inspection-ready reports built in.' },
    { col: '#059669', title: 'Training & Compliance',
      body: 'Training built from your actual menus, roles, and procedures. Level 2 food hygiene included. All legal compliance checks built in. Certifications tracked with automatic expiry alerts.' },
    { col: '#0891b2', title: 'Front of House',
      body: 'FOH always has access to the live menu — what\'s on, what\'s 86\'d, what allergens are present. Dish descriptions and pairings generated and current. Fewer errors, better guest experience.' },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        {/* Title band */}
        <div style={{ padding: '20px 36px 16px',
          borderBottom: `2px solid ${RULE}` }}>
          <Label text="What It Covers" />
          <h2 style={{ fontSize: 22, fontWeight: 900, color: INK, margin: 0,
            letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Every area of your operation.{' '}
            <span style={{ color: T }}>All connected. Always live.</span>
          </h2>
        </div>

        {/* 8 cards — 2 col × 4 row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          padding: '14px 28px', gap: '12px 16px', flex: 1 }}>
          {caps.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 0,
              border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden',
              background: WHITE }}>
              {/* Colour accent bar */}
              <div style={{ width: 4, background: c.col, flexShrink: 0 }} />
              <div style={{ padding: '10px 12px' }}>
                <h3 style={{ fontSize: 10, fontWeight: 800, color: INK,
                  margin: '0 0 5px', letterSpacing: '-0.01em' }}>{c.title}</h3>
                <p style={{ fontSize: 9, lineHeight: 1.6, color: MUTED, margin: 0 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Connected callout */}
        <div style={{ margin: '0 28px 18px',
          background: INK, borderRadius: 10, padding: '14px 18px',
          display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 3, background: `linear-gradient(180deg, ${T}, ${TL})`,
            borderRadius: 2, alignSelf: 'stretch', flexShrink: 0 }} />
          <div>
            <p style={{ color: WHITE, fontSize: 10.5, fontWeight: 800,
              margin: '0 0 4px', lineHeight: 1.4 }}>Everything above is connected to everything else.</p>
            <p style={{ color: FAINT, fontSize: 9, lineHeight: 1.6, margin: 0 }}>
              Create a dish — allergens, costs, HACCP, training notes, and FOH description are generated simultaneously. Change a supplier price — every linked dish recoasts. Change a recipe — the allergen matrix, nutrition, and training all update. One platform. Zero manual connections.
            </p>
          </div>
        </div>
      </div>
      <Footer n={4} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 5 — WHO IT'S FOR
   4 audience segments in tinted panels + a direct "for you if" list.
══════════════════════════════════════════════════════════════════════════ */
function AudiencePage() {
  const segments = [
    { col: '#0d9488', bg: '#f0fdfa', border: '#99f6e4',
      title: 'Independent Restaurants & Pubs',
      intro: 'Owner-operators and working chefs responsible for everything with capacity for none of it properly.',
      bullets: ['Full menu management without a food tech team', 'Live GP without a finance department', 'Compliance without a dedicated compliance manager'] },
    { col: '#0284c7', bg: '#f0f9ff', border: '#bae6fd',
      title: 'Groups & Multi-Site Operators',
      intro: 'Operations directors who need visibility and consistency across sites without building a head office team.',
      bullets: ['Group-level GP reporting across all sites', 'Consistent allergen standards everywhere', 'Compliance visible from the centre'] },
    { col: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe',
      title: 'Dark Kitchens & Production',
      intro: 'High-throughput operations where consistency, speed, and documentation are critical at scale.',
      bullets: ['Multiple menu brands from one platform', 'Training that keeps pace with high churn', 'Allergen accuracy across every brand and shift'] },
    { col: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
      title: 'Contract Caterers',
      intro: 'Operators managing hospitality for third-party clients who need to demonstrate and evidence standards.',
      bullets: ['Client-ready compliance reporting', 'Live cost visibility per contract', 'Training evidence available on demand'] },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        {/* Title */}
        <div style={{ padding: '20px 36px 16px', borderBottom: `2px solid ${RULE}` }}>
          <Label text="Who It's For" />
          <h2 style={{ fontSize: 22, fontWeight: 900, color: INK, margin: 0,
            letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Built for operators who are done<br />
            <span style={{ color: T }}>carrying everything themselves.</span>
          </h2>
        </div>

        {/* 4 segments */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '12px 16px', padding: '16px 28px 0', flex: 0 }}>
          {segments.map((s, i) => (
            <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`,
              borderRadius: 9, padding: '13px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                <div style={{ width: 20, height: 20, borderRadius: 5, background: s.col,
                  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 1, background: WHITE, opacity: 0.9 }} />
                </div>
                <h3 style={{ fontSize: 10.5, fontWeight: 800, color: INK,
                  margin: 0, letterSpacing: '-0.01em' }}>{s.title}</h3>
              </div>
              <p style={{ fontSize: 9, lineHeight: 1.6, color: MUTED, margin: '0 0 8px' }}>{s.intro}</p>
              {s.bullets.map((b, bi) => (
                <div key={bi} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 3 }}>
                  <span style={{ color: s.col, fontSize: 9, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 9, color: '#374151', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Direct qualification list */}
        <div style={{ margin: '14px 28px 0',
          background: INK, borderRadius: 10, padding: '14px 20px' }}>
          <p style={{ color: TL, fontSize: 8.5, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase' as const, margin: '0 0 10px' }}>
            This is specifically for you if:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
            {[
              'You manage GP on spreadsheets and catch problems too late',
              'High staff turnover means training relies on a few key people',
              'You spend more time on compliance than on running the business',
              'Multiple sites are losing visibility as you scale',
              'One experienced person is holding everything together',
              'You pay for software your team doesn\'t fully use',
              'You want a complete operations capability without the overhead',
              'You know what it costs when knowledge walks out the door',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: T, fontSize: 10, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 9, color: FAINT, lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <div style={{ margin: '12px 28px 18px',
          borderLeft: `5px solid ${T}`, paddingLeft: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: SLATE, fontStyle: 'italic',
            lineHeight: 1.5, margin: 0 }}>
            "The question isn't whether you can afford it. It's whether you can afford what's happening without it."
          </p>
        </div>
      </div>
      <Footer n={5} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 6 — PRICING
   Each tier gets its own bold panel. Feature lists in two columns.
══════════════════════════════════════════════════════════════════════════ */
function PricingPage() {
  const tiers = [
    {
      tier: 'Standard Venue', price: '£100', period: '/month', tag: '£3.30 per day',
      who: 'For pubs, restaurants, cafés, and independent hospitality businesses.',
      hi: true,
      includes: [
        'Full platform access — unlimited users',
        'Menu development & recipe spec',
        'Live GP & automatic recosting',
        'Allergen management — Natasha\'s Law compliant',
        'HACCP controls per dish',
        'Ordering, purchase orders & delivery checking',
        'Bespoke training from your own menus & procedures',
        'Level 2 food hygiene included',
        'Compliance tracking & digital sign-off',
        'Front-of-house knowledge base',
      ],
    },
    {
      tier: 'Dark Kitchen / Production Kitchen', price: '£250', period: '/month', tag: '',
      who: 'For dark kitchens, production kitchens, and multi-brand high-churn operations.',
      hi: false,
      includes: [
        'Everything in Standard Venue',
        'Multiple menu brands per kitchen',
        'Higher training throughput for high churn',
        'Enhanced compliance for multi-shift operations',
        'Priority support',
      ],
    },
    {
      tier: 'Multi-Site & Group', price: '£100', period: '/site/month', tag: 'Same price, every site',
      who: 'For operators with two or more sites — pub groups, restaurant groups, managed estates.',
      hi: false,
      includes: [
        'Full Standard Venue at every site',
        'Group dashboard — GP, compliance, spend across all sites',
        'Centralised menu management with site-level customisation',
        'Group compliance reporting for head office',
        'Shared supplier relationships across the group',
      ],
    },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: '20px 28px 0' }}>

        <div style={{ paddingLeft: 8, marginBottom: 16 }}>
          <Label text="Pricing" />
          <h2 style={{ fontSize: 22, fontWeight: 900, color: INK, margin: 0,
            letterSpacing: '-0.025em' }}>
            Priced per kitchen. Not per user. Not per seat.
          </h2>
        </div>

        {tiers.map((p, i) => (
          <div key={i} style={{
            marginBottom: 14,
            border: `1px solid ${p.hi ? `${T}50` : RULE}`,
            borderRadius: 10, overflow: 'hidden',
            background: p.hi ? `${T}06` : WHITE,
          }}>
            {/* Tier header */}
            <div style={{
              padding: '12px 18px',
              background: p.hi ? INK : SNOW,
              borderBottom: `1px solid ${p.hi ? 'rgba(255,255,255,0.07)' : RULE}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <p style={{ fontSize: 8.5, fontWeight: 800, color: p.hi ? TL : T,
                  textTransform: 'uppercase' as const, letterSpacing: '0.12em', margin: '0 0 2px' }}>
                  {p.tier}
                </p>
                <p style={{ fontSize: 9, color: p.hi ? FAINT : MUTED, margin: 0 }}>{p.who}</p>
              </div>
              <div style={{ textAlign: 'right' as const, flexShrink: 0, marginLeft: 20 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3,
                  justifyContent: 'flex-end' }}>
                  <span style={{ color: p.hi ? WHITE : INK,
                    fontSize: 28, fontWeight: 900, lineHeight: 1 }}>{p.price}</span>
                  <span style={{ color: p.hi ? FAINT : MUTED, fontSize: 9.5 }}>{p.period}</span>
                </div>
                {p.tag && <p style={{ color: T, fontSize: 8.5, fontWeight: 700, margin: '2px 0 0' }}>{p.tag}</p>}
              </div>
            </div>
            {/* Includes */}
            <div style={{ padding: '10px 18px',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 20px' }}>
              {p.includes.map((inc, ii) => (
                <div key={ii} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <span style={{ color: T, fontSize: 9, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 9, color: '#374151', lineHeight: 1.5 }}>{inc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer terms */}
        <div style={{ background: INK, borderRadius: 8, padding: '10px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 14 }}>
          <p style={{ color: FAINT, fontSize: 9, margin: 0 }}>
            Annual billing &nbsp;·&nbsp; No setup fees &nbsp;·&nbsp; No per-user fees &nbsp;·&nbsp; No hidden costs &nbsp;·&nbsp; No implementation charges
          </p>
          <p style={{ color: TL, fontSize: 9, fontWeight: 700, margin: 0, flexShrink: 0, marginLeft: 16 }}>
            Cancel any time
          </p>
        </div>
      </div>
      <Footer n={6} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 7 — WHY US
   Striped comparison table + 2×2 testimonial grid.
══════════════════════════════════════════════════════════════════════════ */
function ComparisonPage() {
  const rows = [
    ['Time to go live',              'Under 5 minutes',                        '4–8 week implementation'],
    ['Dish concept to full spec',    'Under 3 minutes',                        '2–3 hours of manual work'],
    ['Allergen management',          'Auto-generated, always live',             'Manual spreadsheets, updated infrequently'],
    ['HACCP documentation',          'Built per dish, automatically',           'Generic templates copied and pasted'],
    ['Ordering & purchase orders',   'Auto-built from live menu',               'Manual shopping lists'],
    ['Delivery checking',            'Automated scan vs PO matching',           'Paper-based, no records'],
    ['GP tracking',                  'Live — updates on every price change',    'Monthly recalculation, if at all'],
    ['Supplier price changes',       'Suppliers update their own portal',       'You manually re-enter prices'],
    ['Training content',             'Generated from your actual operations',   'Generic industry content'],
    ['Compliance evidence',          'Created as work happens',                 'Retrospective, often incomplete'],
    ['Interface',                    'Plain English — no training needed',      'Complex UI requiring onboarding'],
    ['Built by',                     'Hospitality operators',                   'Technology developers'],
  ];

  const quotes = [
    { q: "First piece of technology that actually thinks like a chef.", a: 'Head Chef, independent restaurant, London' },
    { q: "Within the hour we had allergen matrices for every dish. I kept waiting for the catch.", a: 'Operations Manager, pub group, Midlands' },
    { q: "Our last EHO visit was the smoothest we've ever had. Every record was there. Nothing to scramble for.", a: 'Owner, bistro group, South West' },
    { q: "I stopped worrying about GP the week we signed up. The dashboard just tells me when something needs attention.", a: 'General Manager, 3-site operator' },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>

        <div style={{ padding: '20px 36px 14px', borderBottom: `2px solid ${RULE}` }}>
          <Label text="Why HospitalitySupport.uk" />
          <h2 style={{ fontSize: 22, fontWeight: 900, color: INK, margin: 0, letterSpacing: '-0.025em' }}>
            Simple, intuitive, and built around<br />
            <span style={{ color: T }}>how kitchens actually operate.</span>
          </h2>
        </div>

        {/* Comparison table */}
        <div style={{ margin: '14px 28px 0',
          border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden' }}>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '38% 31% 31%', background: INK }}>
            <div style={{ padding: '7px 13px', color: FAINT, fontSize: 7.5, fontWeight: 700,
              textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>Capability</div>
            <div style={{ padding: '7px 13px', color: TL, fontSize: 8.5, fontWeight: 800,
              borderLeft: '1px solid rgba(255,255,255,0.07)' }}>HospitalitySupport.uk</div>
            <div style={{ padding: '7px 13px', color: MID, fontSize: 8.5, fontWeight: 700,
              borderLeft: '1px solid rgba(255,255,255,0.07)' }}>Everyone else</div>
          </div>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '38% 31% 31%',
              background: i % 2 === 0 ? WHITE : SNOW, borderTop: `1px solid ${RULE}` }}>
              <div style={{ padding: '5px 13px', fontSize: 9.5, color: INK, fontWeight: 600 }}>{row[0]}</div>
              <div style={{ padding: '5px 13px', fontSize: 9.5, color: T, fontWeight: 600,
                borderLeft: `1px solid ${RULE}` }}>{row[1]}</div>
              <div style={{ padding: '5px 13px', fontSize: 9.5, color: FAINT,
                borderLeft: `1px solid ${RULE}` }}>{row[2]}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '10px 14px', padding: '14px 28px 16px' }}>
          {quotes.map((q, i) => (
            <div key={i} style={{ background: SNOW, border: `1px solid ${RULE}`,
              borderRadius: 8, padding: '11px 13px',
              borderLeft: `3px solid ${T}` }}>
              <p style={{ fontSize: 9.5, lineHeight: 1.6, color: SLATE,
                fontStyle: 'italic', margin: '0 0 7px' }}>"{q.q}"</p>
              <p style={{ fontSize: 8, color: FAINT, fontWeight: 600, margin: 0 }}>{q.a}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer n={7} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 8 — CLOSE
   Dark full-bleed. Large typographic headline. Module strip. Bold CTA.
══════════════════════════════════════════════════════════════════════════ */
function ClosePage() {
  const modules = [
    { label: 'Menu Development', col: '#0d9488' },
    { label: 'Cost & GP',        col: '#0284c7' },
    { label: 'Ordering & POs',   col: '#ea580c' },
    { label: 'Supplier Pricing', col: '#7c3aed' },
    { label: 'Allergens',        col: '#dc2626' },
    { label: 'HACCP & Safety',   col: '#d97706' },
    { label: 'Training',         col: '#059669' },
    { label: 'Front of House',   col: '#0891b2' },
  ];

  return (
    <DocPage bg={DARK}>
      <div style={{ height: 6, background: `linear-gradient(90deg, ${T}, ${TL})`, flexShrink: 0 }} />

      {/* Decorative bg number */}
      <div style={{ position: 'absolute', right: -20, bottom: 60, fontSize: 320, fontWeight: 900,
        color: 'rgba(13,148,136,0.04)', lineHeight: 1, userSelect: 'none',
        letterSpacing: '-0.05em', pointerEvents: 'none' }}>
        08
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '44px 44px 36px', position: 'relative' }}>

        {/* Hero close copy */}
        <div>
          <Label text="The Bottom Line" colour={TL} />
          <h2 style={{ color: WHITE, fontSize: 40, fontWeight: 900, lineHeight: 1.0,
            letterSpacing: '-0.04em', margin: '0 0 6px', maxWidth: 460 }}>
            It doesn't change<br />what hospitality is.
          </h2>
          <div style={{ width: 50, height: 4, background: T, borderRadius: 2, margin: '0 0 20px' }} />

          <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7,
            maxWidth: 420, margin: '0 0 18px' }}>
            It changes what you personally have to carry.
          </p>
          <p style={{ color: MUTED, fontSize: 10, lineHeight: 1.75,
            maxWidth: 420, margin: '0 0 12px' }}>
            Menu development. GP control. Allergen management. Compliance. Training. Front-of-house support. Supplier pricing. Ordering. Deliveries. All of it — working together, always live, built around your actual operation.
          </p>
          <p style={{ color: MID, fontSize: 10, lineHeight: 1.75,
            maxWidth: 420, margin: '0 0 12px' }}>
            From £3.30 a day. Per kitchen, not per user. No setup fees. No implementation project. No training required. Live in under 5 minutes.
          </p>
          <p style={{ color: '#1e293b', fontSize: 10, lineHeight: 1.75, margin: 0 }}>
            No payroll. No politics. No sick days. No knowledge walking out the door.
          </p>
        </div>

        {/* Module colour strip */}
        <div>
          <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)', marginBottom: 20 }}>
            {modules.map((m, i) => (
              <div key={i} style={{ flex: 1, background: m.col,
                padding: '10px 0', textAlign: 'center' as const,
                borderRight: i < 7 ? '1px solid rgba(0,0,0,0.15)' : 'none' }}>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 6.8,
                  fontWeight: 800, lineHeight: 1.3,
                  display: 'block', padding: '0 4px',
                  textAlign: 'center' as const }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24 }}>
          <p style={{ color: TL, fontSize: 13, fontWeight: 800,
            margin: '0 0 8px', letterSpacing: '-0.01em' }}>
            Book a 30-minute demonstration
          </p>
          <p style={{ color: MUTED, fontSize: 10, lineHeight: 1.7,
            margin: '0 0 18px', maxWidth: 400 }}>
            We'll show your actual dishes recosting live against your supplier prices. No slides. No generic demo. Your data, your operation, in real time.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ background: T, color: WHITE, fontWeight: 900,
              fontSize: 12, padding: '12px 24px', borderRadius: 8,
              letterSpacing: '-0.01em' }}>
              hospitalitysupport.uk
            </div>
            <span style={{ color: MID, fontSize: 9.5, lineHeight: 1.55 }}>
              Or ask for a call —<br />we'll come to you.
            </span>
          </div>
        </div>
      </div>
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════════════════════════════════ */
export default function BrochurePage() {
  return (
    <div className="min-h-full bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">Brochure — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">8-page printed brochure · Print or save as PDF</p>
          </div>
          <button onClick={() => window.print()}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
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
          <CoverPage />
          <ProblemPage />
          <SolutionPage />
          <CapabilityPage />
          <AudiencePage />
          <PricingPage />
          <ComparisonPage />
          <ClosePage />
        </div>
      </div>
    </div>
  );
}
