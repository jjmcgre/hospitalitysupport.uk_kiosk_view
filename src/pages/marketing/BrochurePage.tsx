import React from 'react';

/* ── Design tokens ───────────────────────────────────────────────────────── */
const T     = '#0d9488';
const TL    = '#2dd4bf';
const INK   = '#0f172a';
const SLATE = '#1e293b';
const MID   = '#334155';
const MUTED = '#64748b';
const FAINT = '#94a3b8';
const RULE  = '#e2e8f0';
const SNOW  = '#f8fafc';
const WHITE = '#ffffff';
const DARK  = '#080f1a';
const F     = "'Inter', system-ui, sans-serif";

/*
  300×300mm at 96dpi = 1134 × 1134px exactly.
  Landscape square format — all pages are the same size.
*/
const PW    = 1134;  // 300mm @ 96dpi
const PH    = 1134;  // 300mm @ 96dpi
const PAD_X = 64;
const PAD_Y = 40;

function DocPage({ children, bg = WHITE }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="print-page shadow-2xl"
      style={{
        width: PW, height: PH, margin: '0 auto',
        fontFamily: F, display: 'flex', flexDirection: 'column',
        background: bg, position: 'relative', overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function Header({ dark }: { dark?: boolean }) {
  return (
    <div style={{
      padding: '10px 64px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexShrink: 0,
      borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${RULE}`,
    }}>
      <span style={{ color: dark ? WHITE : INK, fontWeight: 900, fontSize: 13, letterSpacing: '-0.01em' }}>
        HospitalitySupport<span style={{ color: TL }}>.uk</span>
      </span>
      <span style={{ color: dark ? '#334155' : FAINT, fontSize: 9 }}>Confidential · Not for distribution</span>
    </div>
  );
}

function Footer({ n, dark }: { n: number; dark?: boolean }) {
  return (
    <div style={{
      padding: '8px 64px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexShrink: 0,
      borderTop: dark ? '1px solid rgba(255,255,255,0.07)' : `1px solid ${RULE}`,
    }}>
      <span style={{ color: dark ? '#1e293b' : FAINT, fontSize: 9 }}>hospitalitysupport.uk</span>
      <span style={{ color: dark ? '#1e293b' : FAINT, fontSize: 9 }}>{n} / 8</span>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' as const, margin: '0 0 10px', color: T }}>
      {text}
    </p>
  );
}

function Divider({ dark, slim }: { dark?: boolean; slim?: boolean }) {
  return <hr style={{ border: 'none', borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : RULE}`, margin: slim ? '14px 0' : '20px 0' }} />;
}

function H2({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 14px', color: dark ? WHITE : INK }}>
      {children}
    </h2>
  );
}

function H3({ children, colour }: { children: React.ReactNode; colour?: string }) {
  return (
    <h3 style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.3, margin: '0 0 5px', letterSpacing: '-0.01em', color: colour ?? INK }}>
      {children}
    </h3>
  );
}

function Body({ children, size = 12 }: { children: React.ReactNode; size?: number }) {
  return <p style={{ fontSize: size, lineHeight: 1.7, margin: '0 0 12px', color: MUTED }}>{children}</p>;
}

function Bullets({ items, colour, size = 11 }: { items: string[]; colour?: string; size?: number }) {
  return (
    <ul style={{ margin: '0 0 12px', padding: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 6, alignItems: 'flex-start' }}>
          <span style={{ color: colour ?? T, fontSize: 12, lineHeight: 1.4, flexShrink: 0 }}>→</span>
          <span style={{ color: '#374151', fontSize: size, lineHeight: 1.55 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <div style={{ borderLeft: `5px solid ${T}`, paddingLeft: 20, margin: '16px 0 0' }}>
      <p style={{ color: SLATE, fontSize: 15, fontWeight: 700, lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>{text}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 1 — COVER
══════════════════════════════════════════════════════════════════════════ */
function CoverPage() {
  return (
    <DocPage bg={DARK}>
      <div style={{ height: 6, background: T, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>

        {/* Left panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 48px 44px 64px' }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: T, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, background: WHITE, opacity: 0.9 }} />
            </div>
            <span style={{ color: WHITE, fontWeight: 900, fontSize: 17, letterSpacing: '-0.02em' }}>
              HospitalitySupport<span style={{ color: TL }}>.uk</span>
            </span>
          </div>

          {/* Hero */}
          <div>
            <p style={{ color: TL, fontSize: 9.5, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' as const, margin: '0 0 18px' }}>
              The complete operations platform for hospitality
            </p>
            <h1 style={{ color: WHITE, fontSize: 54, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', margin: '0 0 8px', maxWidth: 460 }}>
              The operations team you never had to hire.
            </h1>
            <div style={{ width: 64, height: 5, background: T, borderRadius: 2, margin: '0 0 26px' }} />
            <p style={{ color: FAINT, fontSize: 14, lineHeight: 1.65, maxWidth: 380, margin: '0 0 34px' }}>
              Menu development. Live GP. Allergen compliance. Food safety. Training. FOH support. Supplier pricing. Ordering. All connected, live, and working the moment you sign up.
            </p>
          </div>

          {/* CTA */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
            <p style={{ color: MID, fontSize: 9, margin: '0 0 4px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 700 }}>Book a 30-minute demo</p>
            <div style={{ background: T, color: WHITE, fontWeight: 900, fontSize: 13, padding: '13px 26px', borderRadius: 9, display: 'inline-block' }}>
              hospitalitysupport.uk
            </div>
          </div>
        </div>

        {/* Right panel — stats */}
        <div style={{ width: 320, background: '#0d1420', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 40px', gap: 0, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: MUTED, fontSize: 9, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.12em', margin: '0 0 28px' }}>At a glance</p>

          {[
            { val: '£3.30',  sub: 'per kitchen / day' },
            { val: '3 min',  sub: 'dish concept to live spec' },
            { val: '5 min',  sub: 'sign-up to fully live' },
            { val: '0',      sub: 'spreadsheets required' },
            { val: '14',     sub: 'allergens tracked per dish' },
            { val: '< 1s',   sub: 'price change to full recost' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: TL, fontSize: 28, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: MUTED, fontSize: 9.5, marginTop: 5, lineHeight: 1.3 }}>{s.sub}</div>
            </div>
          ))}

          <div style={{ marginTop: 28 }}>
            <p style={{ color: '#1e293b', fontSize: 9, margin: 0 }}>Confidential · Not for distribution</p>
          </div>
        </div>
      </div>
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 2 — THE PROBLEM
══════════════════════════════════════════════════════════════════════════ */
function ProblemPage() {
  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 24px`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Label text="The Problem" />
        <H2>Hospitality doesn't have hundreds of problems. It has three.</H2>
        <Body>
          Every challenge a hospitality operator faces traces back to people, process, or profit — and most businesses are fighting all three at once, without the resources to do any of them properly.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 40px', flex: 1 }}>
          <div>
            <div style={{ height: 4, background: '#dc2626', borderRadius: 2, marginBottom: 14 }} />
            <H3 colour="#dc2626">01 — People</H3>
            <Body size={11}>
              Skill levels are eroding. Experience is leaving the industry. You're expected to deliver the same standards with less experienced staff — and most businesses rely on one or two people to hold everything together.
            </Body>
            <Body size={11}>
              When that person leaves, the knowledge goes with them. Recipes, procedures, compliance history — stored only in someone's head.
            </Body>
            <Bullets colour="#dc2626" size={10} items={[
              'High turnover means constant informal retraining',
              'New starters cause service errors and compliance gaps',
              'Knowledge concentrated in few people creates fragility',
            ]} />
          </div>

          <div>
            <div style={{ height: 4, background: '#d97706', borderRadius: 2, marginBottom: 14 }} />
            <H3 colour="#d97706">02 — Process</H3>
            <Body size={11}>
              Compliance is a constant battle — not because operators don't care, but because it's relentless and mostly done reactively. Food safety records, allergen documentation, certifications — all falling on people who are already stretched.
            </Body>
            <Body size={11}>
              When an inspector arrives, the scramble begins. When a guest asks about allergens, the answer starts with "I'll just check."
            </Body>
            <Bullets colour="#d97706" size={10} items={[
              'Records created after problems, not as work happens',
              'Allergen info out of date and not linked to live menu',
              'Pre-service briefings verbal — no evidence trail',
            ]} />
          </div>

          <div>
            <div style={{ height: 4, background: T, borderRadius: 2, marginBottom: 14 }} />
            <H3 colour={T}>03 — Profit</H3>
            <Body size={11}>
              Margins erode quietly. Supplier prices creep. Portions drift. Menus age. Most businesses don't lose margin in one hit — they bleed it slowly. By the time it's visible on the P&L, it's already cost thousands.
            </Body>
            <Body size={11}>
              GP is calculated at menu launch and not revisited until month-end, if at all.
            </Body>
            <Bullets colour={T} size={10} items={[
              "Supplier price changes don't trigger immediate recost",
              'GP calculated at launch, not tracked continuously',
              'Portion drift invisible until stock variance is undeniable',
            ]} />
          </div>
        </div>

        <PullQuote text="Every challenge traces back to people, process, or profit. HospitalitySupport.uk is built to solve all three." />
      </div>
      <Footer n={2} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 3 — THE SOLUTION
══════════════════════════════════════════════════════════════════════════ */
function SolutionPage() {
  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 24px`, display: 'flex', overflow: 'hidden', gap: 56 }}>

        {/* Left column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Label text="The Solution" />
          <H2>Not software. An operations platform built around how hospitality actually works.</H2>
          <Body>
            Most hospitality technology is built for trained users with time, discipline, and structure. It assumes a stable team with capacity to configure and maintain a system. That's not the reality of running a kitchen.
          </Body>
          <Body>
            HospitalitySupport.uk behaves like a competent operations team — built from real hospitality expertise, available around the clock, designed to operate under real pressure. You don't configure it. You just use it.
          </Body>

          <Divider slim />

          <H3>Built by chefs, for chefs</H3>
          <Body>
            The platform was designed by people who have spent years in professional kitchens. The interface is plain English. No training required. If a chef can describe a dish, the platform builds it.
          </Body>

          <Divider slim />

          <H3>Everything connected. Always live.</H3>
          <Body>
            A dish is created. Instantly, allergens are known. HACCP controls are generated. Cost is calculated against live supplier prices. When a supplier changes a price, every linked dish recoasts in under a second. When a recipe changes, the allergen matrix updates.
          </Body>

          <PullQuote text="You don't build your business around it. It builds itself around you." />
        </div>

        {/* Right column */}
        <div style={{ width: 380, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

          {/* Speed stats */}
          <div style={{ border: `1px solid ${RULE}`, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ background: INK, padding: '12px 20px' }}>
              <p style={{ color: TL, fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' as const, margin: 0 }}>Platform speed</p>
            </div>
            {[
              { val: '3 min',   label: 'Dish concept to full spec' },
              { val: '< 1 sec', label: 'Price change to full recost' },
              { val: '5 min',   label: 'Sign-up to fully live' },
              { val: '14',      label: 'Allergens tracked per dish' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '14px 20px', background: i % 2 === 0 ? WHITE : SNOW, borderTop: `1px solid ${RULE}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: MUTED, fontSize: 11 }}>{s.label}</span>
                <span style={{ color: T, fontSize: 18, fontWeight: 900 }}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* Why it works */}
          <div style={{ background: `${T}08`, border: `1px solid ${T}25`, borderRadius: 10, padding: '20px 24px' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: T, margin: '0 0 12px' }}>Why it works differently</p>
            <Bullets size={10.5} items={[
              'No onboarding sessions or implementation projects',
              'No training required for kitchen or management teams',
              'Works on any device — phone, tablet, desktop',
              'Plain English — no modules, no menus to navigate',
            ]} />
          </div>

          {/* Pipeline context */}
          <div style={{ background: SNOW, border: `1px solid ${RULE}`, borderRadius: 10, padding: '16px 20px' }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: MUTED, textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 8px' }}>Pipeline value by site size</p>
            {[
              { label: '1 site',       mrr: '£100/mo' },
              { label: '2–5 sites',    mrr: '£300/mo' },
              { label: '6–15 sites',   mrr: '£900/mo' },
              { label: '16+ sites',    mrr: '£1,600/mo' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 3 ? `1px solid ${RULE}` : 'none' }}>
                <span style={{ fontSize: 11, color: MUTED }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: T }}>{r.mrr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer n={3} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 4 — WHAT IT COVERS
══════════════════════════════════════════════════════════════════════════ */
function CapabilityPage() {
  const caps = [
    { col: '#0d9488', title: 'Menu Development & Recipe Spec',
      body: 'Describe a dish in plain English — full spec in under 3 minutes: recipe, method, mise en place, portions, yield, batch notes, and pairings. Every dish feeds every other module automatically.' },
    { col: '#0284c7', title: 'Cost & GP Control',
      body: "Every dish priced against your live supplier catalogue the moment it's created. GP tracked continuously. When a supplier changes a price, every affected dish recoasts in under a second." },
    { col: '#ea580c', title: 'Ordering & Deliveries',
      body: 'Shopping list auto-built from the live menu. Purchase orders generated with one action. Delivery checker matches goods received against the PO, flags discrepancies, keeps the audit record.' },
    { col: '#0891b2', title: 'Supplier Pricing & Management',
      body: 'Suppliers maintain their own pricing in a dedicated portal. You see updates the moment they happen. Invoice scanning matches line items automatically. All communication logged and auditable.' },
    { col: '#dc2626', title: 'Allergens & Nutrition',
      body: "All 14 allergens tracked per dish, automatically, from the ingredient list. Natasha's Law compliant. Updates itself when a recipe changes. Nutritional info calculated and kept live per portion." },
    { col: '#d97706', title: 'HACCP & Food Safety',
      body: 'Critical control points generated per dish at creation — receiving, storage, cooking, chilling, reheating. Specific critical limits and corrective actions. Inspection-ready reports built in.' },
    { col: '#059669', title: 'Training & Compliance',
      body: 'Training built from your actual menus, roles, and procedures. Level 2 food hygiene included. Legal compliance checked continuously. Certifications tracked with automatic expiry alerts.' },
    { col: '#7c3aed', title: 'Front of House',
      body: "FOH always has the live menu — what's on, what's 86'd, allergens present, specials. Dish descriptions and pairings generated and current. Fewer errors, fewer complaints, better guest experience." },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 20px`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Label text="What It Covers" />
        <H2>Every area of your operation. All connected. Always live.</H2>
        <Body>
          Eight operational areas — all connected through the same live data, all updating automatically when anything changes. Not a collection of tools. One platform that understands your whole operation.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px 20px', flex: 1 }}>
          {caps.map((c, i) => (
            <div key={i} style={{ border: `1px solid ${RULE}`, borderRadius: 9, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 4, background: c.col, flexShrink: 0 }} />
              <div style={{ padding: '12px 14px', flex: 1 }}>
                <H3 colour={c.col}>{c.title}</H3>
                <p style={{ fontSize: 10.5, lineHeight: 1.6, color: MUTED, margin: 0 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: `${T}0c`, border: `1px solid ${T}28`, borderRadius: 9, padding: '14px 20px', marginTop: 14 }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, color: T, margin: '0 0 5px', lineHeight: 1.4 }}>Everything above is connected to everything else.</p>
          <p style={{ fontSize: 10.5, color: MUTED, margin: 0, lineHeight: 1.6 }}>
            Create a dish — allergens, costs, HACCP, training notes, and FOH description generated simultaneously. Change a supplier price — every linked dish recoasts. Change a recipe — allergen matrix, nutrition, and training all update. Zero manual connections.
          </p>
        </div>
      </div>
      <Footer n={4} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 5 — WHO IT'S FOR
══════════════════════════════════════════════════════════════════════════ */
function AudiencePage() {
  const segments = [
    {
      title: 'Independent Restaurants & Pubs',
      body: 'Owner-operators and working chefs responsible for everything but with capacity for none of it properly.',
      bullets: [
        'Full menu management without a food tech team',
        'Live GP without a finance department',
        'Compliance without a dedicated manager',
        'Training that runs without an HR function',
      ],
    },
    {
      title: 'Groups & Multi-Site Operators',
      body: 'Operations directors who need visibility and consistency across sites without building a head office team.',
      bullets: [
        'Group-level GP reporting across all sites',
        'Consistent menu and allergen standards everywhere',
        'Site-level compliance visible from the centre',
        'Uniform training without centralised delivery',
      ],
    },
    {
      title: 'Dark Kitchens & Production',
      body: 'High-throughput operations where consistency and documentation are critical. Multiple brands, high staff turnover.',
      bullets: [
        'Multiple menu brands from one platform',
        'Training that keeps pace with high churn',
        'Compliance that scales without headcount',
        'Allergen accuracy across every brand and shift',
      ],
    },
    {
      title: 'Contract Caterers',
      body: 'Operators managing hospitality for third-party clients who need to demonstrate standards across a portfolio.',
      bullets: [
        'Client-ready compliance reporting on demand',
        'Consistent standards across managed contracts',
        'Live cost visibility per site or contract',
        'Training evidence available at any time',
      ],
    },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 20px`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Label text="Who It's For" />
        <H2>Built for operators who are done carrying everything themselves.</H2>
        <Body>
          HospitalitySupport.uk is built for the reality of running a hospitality business — not the ideal version. For operators managing with less than they need, who know things are slipping through the gaps.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0 32px', flex: 1 }}>
          {segments.map((s, i) => (
            <div key={i}>
              <div style={{ height: 3, background: T, borderRadius: 2, marginBottom: 12 }} />
              <H3>{s.title}</H3>
              <Body size={10.5}>{s.body}</Body>
              <Bullets size={10} items={s.bullets} />
            </div>
          ))}
        </div>

        <Divider slim />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
          <div>
            <H3>This is specifically for you if:</H3>
            <Bullets size={10.5} items={[
              'You manage GP on spreadsheets and catch problems too late',
              "Training relies on one or two key people — and you know the risk",
              'You spend more time on compliance than running the business',
              'Multiple sites are losing visibility as you scale',
            ]} />
          </div>
          <div style={{ paddingTop: 22 }}>
            <Bullets size={10.5} items={[
              "You're paying for software your team doesn't fully use",
              'You want complete operations capability without building it',
              'An experienced person is holding everything together',
              'You know what it costs when knowledge walks out the door',
            ]} />
          </div>
        </div>

        <PullQuote text="The question isn't whether you can afford it. It's whether you can afford what's happening without it." />
      </div>
      <Footer n={5} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 6 — PRICING
══════════════════════════════════════════════════════════════════════════ */
function PricingPage() {
  const tiers = [
    {
      tier: 'Standard Venue', price: '£100', period: '/month', tag: '£3.30 per kitchen / day',
      who: 'Pubs, restaurants, cafés, and independent hospitality businesses.',
      hi: true,
      includes: [
        'Full platform access — unlimited users',
        'Menu development & recipe spec',
        'Live GP & automatic recosting',
        "Allergen management — Natasha's Law compliant",
        'HACCP controls generated per dish',
        'Ordering, purchase orders & delivery checking',
        'Bespoke training from your own menus & procedures',
        'Level 2 food hygiene included',
        'Compliance tracking & digital sign-off',
        'Front-of-house knowledge base',
      ],
    },
    {
      tier: 'Dark Kitchen / Production Kitchen', price: '£250', period: '/month', tag: '',
      who: 'Dark kitchens, production kitchens, and multi-brand high-churn operations.',
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
      who: 'Operators with two or more sites — pub groups, restaurant groups, managed estates.',
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
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 20px`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Label text="Pricing" />
        <H2>Priced per kitchen. Not per user. Not per seat.</H2>
        <Body>
          Every person who works in or manages your operation has full access. No user limits, no module fees, no professional services charges. The price you see is the price you pay — and it includes everything.
        </Body>

        <div style={{ display: 'flex', gap: 20, flex: 1 }}>
          {tiers.map((p, i) => (
            <div key={i} style={{ flex: 1, border: `1px solid ${p.hi ? `${T}45` : RULE}`, borderRadius: 11, overflow: 'hidden', background: p.hi ? `${T}06` : WHITE, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '14px 20px', borderBottom: `1px solid ${p.hi ? `${T}25` : RULE}`, background: p.hi ? `${T}10` : SNOW }}>
                <p style={{ fontSize: 9.5, fontWeight: 800, color: T, textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 3px' }}>{p.tier}</p>
                <p style={{ fontSize: 10.5, color: MUTED, margin: '0 0 10px' }}>{p.who}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                  <span style={{ color: INK, fontSize: 30, fontWeight: 900, lineHeight: 1 }}>{p.price}</span>
                  <span style={{ color: MUTED, fontSize: 11 }}>{p.period}</span>
                </div>
                {p.tag && <p style={{ color: T, fontSize: 9, fontWeight: 700, margin: '3px 0 0' }}>{p.tag}</p>}
              </div>
              <div style={{ padding: '14px 20px', flex: 1 }}>
                {p.includes.map((inc, ii) => (
                  <div key={ii} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
                    <span style={{ color: T, fontSize: 10, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 10.5, color: '#374151', lineHeight: 1.45 }}>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: SNOW, border: `1px solid ${RULE}`, borderRadius: 8, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
          <p style={{ color: MUTED, fontSize: 10.5, margin: 0 }}>Annual billing · No setup fees · No per-user fees · No hidden costs · No implementation charges</p>
          <p style={{ color: T, fontSize: 10.5, fontWeight: 700, margin: 0, flexShrink: 0, marginLeft: 16 }}>Cancel any time</p>
        </div>
      </div>
      <Footer n={6} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 7 — COMPARISON
══════════════════════════════════════════════════════════════════════════ */
function ComparisonPage() {
  const rows = [
    ['Time to go live',           'Under 5 minutes',                     '4–8 week implementation'],
    ['Dish to full spec',         'Under 3 minutes',                     '2–3 hours of manual work'],
    ['Allergen management',       'Auto-generated, always live',          'Manual spreadsheets, updated infrequently'],
    ['HACCP documentation',       'Built per dish, automatically',        'Generic templates copied and pasted'],
    ['Ordering & POs',            'Auto-built from live menu',            'Manual shopping lists'],
    ['Delivery checking',         'Automated scan vs PO matching',        'Paper-based, no records'],
    ['GP tracking',               'Live — updates every price change',    'Monthly recalculation, if at all'],
    ['Supplier price changes',    'Suppliers update their own portal',    'You manually re-enter prices'],
    ['Training content',          'From your actual operations',          'Generic industry content'],
    ['Compliance evidence',       'Created as work happens',              'Retrospective, often incomplete'],
    ['Interface',                 'Plain English — no training needed',   'Complex UI requiring onboarding'],
    ['Built by',                  'Hospitality operators',                'Technology developers'],
  ];

  const quotes = [
    { q: "First piece of technology that actually thinks like a chef.", a: 'Head Chef, independent restaurant, London' },
    { q: "Within the hour we had allergen matrices for every dish. I kept waiting for the catch.", a: 'Operations Manager, pub group, Midlands' },
    { q: "Our last EHO visit was the smoothest we've ever had. Every record was there.", a: 'Owner, bistro group, South West' },
    { q: "I stopped worrying about GP the week we signed up.", a: 'General Manager, 3-site operator' },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 20px`, overflow: 'hidden', display: 'flex', gap: 40 }}>

        {/* Left — comparison table */}
        <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column' }}>
          <Label text="Why HospitalitySupport.uk" />
          <H2>Simple, intuitive, built around how kitchens actually operate.</H2>
          <Body>
            Most hospitality platforms were built by developers who studied the industry from the outside. They require implementation projects and training. The result is software that sits unused or used badly — and doesn't fix the problems it was bought to solve.
          </Body>

          <div style={{ border: `1px solid ${RULE}`, borderRadius: 9, overflow: 'hidden', flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '34% 33% 33%', background: INK }}>
              <div style={{ padding: '8px 14px', color: FAINT, fontSize: 9, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Capability</div>
              <div style={{ padding: '8px 14px', color: TL, fontSize: 9.5, fontWeight: 800, borderLeft: '1px solid rgba(255,255,255,0.07)' }}>HospitalitySupport.uk</div>
              <div style={{ padding: '8px 14px', color: '#475569', fontSize: 9, fontWeight: 700, borderLeft: '1px solid rgba(255,255,255,0.07)' }}>Traditional platforms</div>
            </div>
            {rows.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '34% 33% 33%', background: i % 2 === 0 ? WHITE : SNOW, borderTop: `1px solid ${RULE}` }}>
                <div style={{ padding: '5.5px 14px', fontSize: 10, color: INK, fontWeight: 600 }}>{row[0]}</div>
                <div style={{ padding: '5.5px 14px', fontSize: 10, color: T, fontWeight: 600, borderLeft: `1px solid ${RULE}` }}>{row[1]}</div>
                <div style={{ padding: '5.5px 14px', fontSize: 10, color: FAINT, borderLeft: `1px solid ${RULE}` }}>{row[2]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — quotes */}
        <div style={{ width: 340, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 14, paddingTop: 88 }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: T, letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: 0 }}>What operators say</p>
          {quotes.map((q, i) => (
            <div key={i} style={{ background: SNOW, border: `1px solid ${RULE}`, borderRadius: 9, padding: '14px 16px', borderLeft: `4px solid ${T}` }}>
              <p style={{ fontSize: 11, lineHeight: 1.55, color: SLATE, fontStyle: 'italic', margin: '0 0 7px' }}>"{q.q}"</p>
              <p style={{ fontSize: 9, color: FAINT, fontWeight: 600, margin: 0 }}>{q.a}</p>
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
══════════════════════════════════════════════════════════════════════════ */
function ClosePage() {
  const modules = [
    { label: 'Menu Development', col: '#0d9488' },
    { label: 'Cost & GP',        col: '#0284c7' },
    { label: 'Ordering & POs',   col: '#ea580c' },
    { label: 'Supplier Pricing', col: '#0891b2' },
    { label: 'Allergens',        col: '#dc2626' },
    { label: 'HACCP & Safety',   col: '#d97706' },
    { label: 'Training',         col: '#059669' },
    { label: 'Front of House',   col: '#7c3aed' },
  ];

  return (
    <DocPage bg={DARK}>
      <div style={{ height: 5, background: T, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '56px 48px 44px 64px' }}>
          <div>
            <p style={{ color: TL, fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' as const, margin: '0 0 16px' }}>
              The Bottom Line
            </p>
            <h2 style={{ color: WHITE, fontSize: 42, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 6px', maxWidth: 460 }}>
              It doesn't change what hospitality is.
            </h2>
            <div style={{ width: 60, height: 5, background: T, borderRadius: 2, margin: '0 0 20px' }} />
            <p style={{ color: FAINT, fontSize: 15, lineHeight: 1.7, margin: '0 0 18px', maxWidth: 440 }}>
              It changes what you personally have to carry.
            </p>
            <p style={{ color: MUTED, fontSize: 11.5, lineHeight: 1.75, maxWidth: 440, margin: '0 0 10px' }}>
              Menu development. GP control. Allergen management. Compliance. Training. Front-of-house support. Supplier pricing. Ordering. All of it — working together, always live, built around your actual operation.
            </p>
            <p style={{ color: MID, fontSize: 11.5, lineHeight: 1.75, maxWidth: 420, margin: 0 }}>
              From £3.30 a day. Per kitchen, not per user. No setup fees. No implementation project. No training required. Live in under 5 minutes.
            </p>
          </div>

          {/* Module strip */}
          <div style={{ display: 'flex', gap: 0, borderRadius: 9, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            {modules.map((m, i) => (
              <div key={i} style={{ flex: 1, padding: '14px 0', textAlign: 'center' as const, background: m.col, borderRight: i < 7 ? '1px solid rgba(0,0,0,0.12)' : 'none' }}>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 8.5, fontWeight: 800, display: 'block', padding: '0 4px', lineHeight: 1.3 }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — CTA panel */}
        <div style={{ width: 340, background: '#0d1420', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 40px', gap: 24 }}>
          <div>
            <p style={{ color: TL, fontSize: 14, fontWeight: 800, margin: '0 0 10px', letterSpacing: '-0.01em' }}>
              Book a 30-minute demo
            </p>
            <p style={{ color: MUTED, fontSize: 11, lineHeight: 1.65, margin: '0 0 20px' }}>
              We'll show your actual dishes recosting live against your supplier prices. No slides. No generic demo. Your data, your operation, in real time.
            </p>
            <div style={{ background: T, color: WHITE, fontWeight: 900, fontSize: 13, padding: '14px 24px', borderRadius: 9, textAlign: 'center' as const }}>
              hospitalitysupport.uk
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
            <p style={{ color: '#1e293b', fontSize: 9, margin: '0 0 16px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 700 }}>Pipeline value</p>
            {[
              { label: '1 site',     mrr: '£100/mo',    note: 'Standard Venue' },
              { label: '2–5 sites',  mrr: '£300/mo',    note: 'Multi-Site' },
              { label: '6–15 sites', mrr: '£900/mo',    note: 'Multi-Site' },
              { label: '16+ sites',  mrr: '£1,600/mo',  note: 'Multi-Site' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <span style={{ fontSize: 10.5, color: '#334155' }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: TL }}>{r.mrr}</span>
              </div>
            ))}
          </div>

          <p style={{ color: '#111827', fontSize: 9, margin: 0, lineHeight: 1.55 }}>
            No payroll. No politics. No sick days. No knowledge walking out the door.
          </p>
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
      <div style={{ maxWidth: PW + 48 }} className="mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">Brochure — 300×300mm Square</h1>
            <p className="text-slate-400 text-sm mt-1">8 pages · Landscape square format · Print or save as PDF</p>
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
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body { margin: 0; padding: 0; background: white !important; }
            .no-print { display: none !important; }
            .print-page {
              box-shadow: none !important;
              page-break-before: always;
              page-break-after: always;
              page-break-inside: avoid;
              break-before: page;
              break-after: page;
              break-inside: avoid;
              margin: 0 !important;
              width: 300mm !important;
              height: 300mm !important;
            }
          }
          @page { size: 300mm 300mm; margin: 0; }
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
