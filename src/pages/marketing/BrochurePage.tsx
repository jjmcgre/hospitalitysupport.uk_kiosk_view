import React from 'react';

/* ── Tokens ─────────────────────────────────────────────────────────────── */
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
  A4 at 96dpi = 794 × 1123px exactly.
  We use px units on the page shell so the browser renders at screen resolution
  and "Print / Save PDF" at 96dpi maps 1px → 1px on paper.
  Each page is exactly 794 × 1123px with overflow hidden.
  Inner padding is tuned per page so content never escapes.
*/
const PW = 794;   // A4 width  px @ 96dpi
const PH = 1123;  // A4 height px @ 96dpi
const PAD_X = 44; // horizontal padding
const PAD_Y = 28; // vertical padding

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
      padding: '7px 44px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexShrink: 0,
      borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${RULE}`,
    }}>
      <span style={{ color: dark ? WHITE : INK, fontWeight: 900, fontSize: 10.5, letterSpacing: '-0.01em' }}>
        HospitalitySupport<span style={{ color: TL }}>.uk</span>
      </span>
      <span style={{ color: dark ? '#334155' : FAINT, fontSize: 7.5 }}>Confidential · Not for distribution</span>
    </div>
  );
}

function Footer({ n, dark }: { n: number; dark?: boolean }) {
  return (
    <div style={{
      padding: '6px 44px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexShrink: 0,
      borderTop: dark ? '1px solid rgba(255,255,255,0.07)' : `1px solid ${RULE}`,
    }}>
      <span style={{ color: dark ? '#1e293b' : FAINT, fontSize: 7.5 }}>hospitalitysupport.uk</span>
      <span style={{ color: dark ? '#1e293b' : FAINT, fontSize: 7.5 }}>{n} / 8</span>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' as const, margin: '0 0 8px', color: T }}>
      {text}
    </p>
  );
}

function Divider({ dark, slim }: { dark?: boolean; slim?: boolean }) {
  return <hr style={{ border: 'none', borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : RULE}`, margin: slim ? '12px 0' : '16px 0' }} />;
}

function H2({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 10px', color: dark ? WHITE : INK }}>
      {children}
    </h2>
  );
}

function H3({ children, colour }: { children: React.ReactNode; colour?: string }) {
  return (
    <h3 style={{ fontSize: 11, fontWeight: 800, lineHeight: 1.3, margin: '0 0 4px', letterSpacing: '-0.01em', color: colour ?? INK }}>
      {children}
    </h3>
  );
}

function Body({ children, size = 10 }: { children: React.ReactNode; size?: number }) {
  return <p style={{ fontSize: size, lineHeight: 1.7, margin: '0 0 10px', color: MUTED }}>{children}</p>;
}

function Bullets({ items, colour, size = 9.5 }: { items: string[]; colour?: string; size?: number }) {
  return (
    <ul style={{ margin: '0 0 10px', padding: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'flex-start' }}>
          <span style={{ color: colour ?? T, fontSize: 10, lineHeight: 1.4, flexShrink: 0 }}>→</span>
          <span style={{ color: '#374151', fontSize: size, lineHeight: 1.55 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <div style={{ borderLeft: `4px solid ${T}`, paddingLeft: 16, margin: '14px 0 0' }}>
      <p style={{ color: SLATE, fontSize: 12.5, fontWeight: 700, lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>{text}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 1 — COVER
══════════════════════════════════════════════════════════════════════════ */
function CoverPage() {
  return (
    <DocPage bg={DARK}>
      <div style={{ height: 5, background: T, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 50px 38px' }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: T, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 14, height: 14, borderRadius: 2, background: WHITE, opacity: 0.9 }} />
          </div>
          <span style={{ color: WHITE, fontWeight: 900, fontSize: 15, letterSpacing: '-0.02em' }}>
            HospitalitySupport<span style={{ color: TL }}>.uk</span>
          </span>
        </div>

        {/* Hero */}
        <div>
          <p style={{ color: TL, fontSize: 8, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' as const, margin: '0 0 16px' }}>
            The complete operations platform for hospitality
          </p>
          <h1 style={{ color: WHITE, fontSize: 46, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', margin: '0 0 6px', maxWidth: 440 }}>
            The operations team you never had to hire.
          </h1>
          <div style={{ width: 56, height: 4, background: T, borderRadius: 2, margin: '0 0 22px' }} />
          <p style={{ color: FAINT, fontSize: 12.5, lineHeight: 1.65, maxWidth: 380, margin: '0 0 34px' }}>
            Menu development. Live GP control. Allergen compliance. Food safety. Training. Front-of-house support. Supplier pricing. Ordering. All of it — connected, live, and working the moment you sign up.
          </p>
          {/* Stats */}
          <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: '#0f1623' }}>
            {[
              { val: '£3.30', sub: 'per kitchen / day' },
              { val: '3 min', sub: 'dish concept to live spec' },
              { val: '5 min', sub: 'to go live from sign-up' },
              { val: '0',     sub: 'spreadsheets required' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: '15px 12px', textAlign: 'center' as const, borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ color: TL, fontSize: 21, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: MUTED, fontSize: 7.5, marginTop: 4, lineHeight: 1.3 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ color: MID, fontSize: 7.5, margin: '0 0 3px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 700 }}>Pricing</p>
            <p style={{ color: '#475569', fontSize: 9.5, margin: 0, lineHeight: 1.5 }}>
              Standard Venue — £100/month &nbsp;·&nbsp; Dark Kitchen — £250/month<br />
              Multi-Site — £100 per kitchen per month &nbsp;·&nbsp; Annual billing
            </p>
          </div>
          <p style={{ color: '#1a2535', fontSize: 7.5, margin: 0 }}>Confidential · Not for distribution</p>
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
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 20px`, overflow: 'hidden' }}>
        <Label text="The Problem" />
        <H2>Hospitality doesn't have hundreds of problems. It has three.</H2>
        <Body>
          People. Process. Profit. Every challenge a hospitality operator faces traces back to one of these — and most businesses are fighting all three at once, without the resources to do any of them properly.
        </Body>

        <Divider slim />

        <div style={{ marginBottom: 14 }}>
          <H3 colour="#dc2626">01 — People</H3>
          <Body>
            Skill levels are eroding. Experience is leaving the industry. Turnover is constant. You're expected to deliver the same standards with less experienced staff on the floor — and most businesses are relying on one or two people to hold everything together.
          </Body>
          <Body>
            When that person leaves, the knowledge goes with them. Recipes, procedures, compliance history — often stored only in someone's head. The cost of that knowledge walking out the door is rarely counted, but always felt.
          </Body>
          <Bullets colour="#dc2626" items={[
            'High turnover means constant retraining — mostly informal and undocumented',
            'New starters cause service errors and compliance gaps before they reach full competence',
            'Operational knowledge concentrated in a few people creates fragility at scale',
          ]} />
        </div>

        <Divider slim />

        <div style={{ marginBottom: 14 }}>
          <H3 colour="#d97706">02 — Process</H3>
          <Body>
            Compliance is a constant battle — not because operators don't care, but because it's relentless, unforgiving, and mostly done reactively. Food safety records, allergen documentation, staff certifications — all falling on people who are already stretched.
          </Body>
          <Body>
            The paperwork gets done, but rarely in a way that builds useful evidence. When an inspector arrives, the scramble begins. When a guest asks about allergens, the answer starts with "I'll just check in the kitchen."
          </Body>
          <Bullets colour="#d97706" items={[
            'Compliance is reactive — records created after problems, not as work happens',
            'Allergen information is often out of date and not linked to the live menu',
            'Pre-service briefings are verbal and leave no evidence trail',
          ]} />
        </div>

        <Divider slim />

        <div>
          <H3 colour="#7c3aed">03 — Profit</H3>
          <Body>
            Margins erode quietly. Supplier prices creep. Portions drift. Menus age. Most businesses don't lose margin in one big hit — they bleed it slowly. By the time it's visible on the P&L, it's already cost thousands.
          </Body>
          <Bullets colour="#7c3aed" items={[
            'Supplier price changes rarely trigger an immediate menu recost',
            'GP is calculated at menu launch and not revisited until month-end',
            'Portion drift is invisible until stock variance makes it undeniable',
          ]} />
        </div>

        <PullQuote text="Every challenge a hospitality operator faces traces back to people, process, or profit. HospitalitySupport.uk is built to solve all three." />
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
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 20px`, overflow: 'hidden' }}>
        <Label text="The Solution" />
        <H2>Not software. Not a tool. An operations platform built around how hospitality actually works.</H2>
        <Body>
          Most hospitality technology is built for trained users with time, discipline, and structure. It assumes a stable team and a management layer with capacity to configure and maintain a system. That's not the reality of running a kitchen.
        </Body>
        <Body>
          HospitalitySupport.uk works differently. It behaves like a competent operations team — built from real hospitality expertise, available around the clock, designed to operate in real kitchens under real pressure. You don't configure it. You just use it.
        </Body>

        <Divider slim />

        <H3>Built by chefs, for chefs</H3>
        <Body>
          The platform was designed by people who have spent years in professional kitchens — not developers who read about hospitality. That means it understands how dishes get built, how service runs, and what compliance looks like on the floor rather than on paper.
        </Body>
        <Body>
          The interface is plain English. No training required. If a chef can describe a dish — its style, target GP, likely audience — the platform builds it. If a manager can describe a problem, the platform responds to it. Nothing needs configuring, importing, or setting up.
        </Body>

        <Divider slim />

        <H3>Everything connected. Always live.</H3>
        <Body>
          A dish is created. Instantly, its allergens are known. HACCP controls are generated. Cost is calculated against live supplier prices. Training notes are written. The FOH description is ready. When a supplier changes a price, every linked dish recoasts automatically. When a recipe changes, the allergen matrix updates.
        </Body>
        <Body>
          This is what live means in practice: the system never goes stale, and you never manually update anything.
        </Body>

        {/* Stat strip */}
        <div style={{ display: 'flex', gap: 0, border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden', margin: '0 0 14px' }}>
          {[
            { val: '3 min',   label: 'dish to full spec' },
            { val: '< 1 sec', label: 'price change to recost' },
            { val: '14',      label: 'allergens tracked per dish' },
            { val: '5 min',   label: 'sign-up to live' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: '10px 12px', textAlign: 'center' as const, background: SNOW, borderRight: i < 3 ? `1px solid ${RULE}` : 'none' }}>
              <div style={{ color: T, fontSize: 18, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: FAINT, fontSize: 7.5, marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <Divider slim />

        <H3>Intuitive by design</H3>
        <Body>
          No modules to activate, no data to import, no hierarchy to configure. A new dish, a compliance question, a training task — all handled in plain language from any device. The more you use it, the more it understands your operation.
        </Body>
        <Bullets items={[
          'No onboarding sessions or implementation projects',
          'No training required for kitchen or management teams',
          'Works on any device — phone, tablet, desktop',
          "Responds in the same way whether you're a head chef or a site director",
        ]} />

        <PullQuote text="You don't build your business around it. It builds itself around you." />
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
      body: 'Describe a dish in plain English — full spec ready in under 3 minutes: recipe, method, mise en place, portions, yield, batch notes, and pairings. Every dish feeds every other module automatically.' },
    { col: '#0284c7', title: 'Cost & GP Control',
      body: "Every dish priced against your live supplier catalogue the moment it's created. GP tracked continuously. When a supplier changes a price, every affected dish recoasts in under a second." },
    { col: '#ea580c', title: 'Ordering & Deliveries',
      body: 'Shopping list auto-built from the live menu. Purchase orders generated with one action. Delivery checker matches goods received against the PO, flags discrepancies, and keeps the audit record.' },
    { col: '#7c3aed', title: 'Supplier Pricing & Management',
      body: 'Suppliers maintain their own pricing in a dedicated portal. You see updates the moment they happen. Invoice scanning matches line items automatically. All supplier communication logged and auditable.' },
    { col: '#dc2626', title: 'Allergens & Nutrition',
      body: "All 14 allergens tracked per dish, automatically, from the ingredient list. Natasha's Law compliant. Updates itself when a recipe changes. Nutritional info calculated and kept live per portion." },
    { col: '#d97706', title: 'HACCP & Food Safety',
      body: 'Critical control points generated per dish at creation — receiving, storage, cooking, chilling, reheating. Specific critical limits and corrective actions. Evidence capture and inspection-ready reports built in.' },
    { col: '#059669', title: 'Training & Compliance',
      body: 'Training built from your actual menus, roles, and procedures. Level 2 food hygiene included. Legal compliance checked continuously. Certifications tracked with automatic expiry alerts.' },
    { col: '#0891b2', title: 'Front of House',
      body: "FOH always has the live menu — what's on, what's 86'd, allergens present, specials. Dish descriptions and pairings generated and current. Fewer errors, fewer complaints, better guest experience." },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 16px`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Label text="What It Covers" />
        <H2>Every area of your operation. All connected. Always live.</H2>
        <Body>
          HospitalitySupport.uk covers eight operational areas — all connected through the same live data, all updating automatically when anything changes. This is not a collection of separate tools. It is one platform that understands your whole operation.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', flex: 1 }}>
          {caps.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 0, border: `1px solid ${RULE}`, borderRadius: 7, overflow: 'hidden' }}>
              <div style={{ width: 3, background: c.col, flexShrink: 0 }} />
              <div style={{ padding: '9px 11px' }}>
                <H3 colour={c.col}>{c.title}</H3>
                <p style={{ fontSize: 9, lineHeight: 1.6, color: MUTED, margin: 0 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: `${T}0c`, border: `1px solid ${T}28`, borderRadius: 8, padding: '11px 16px', marginTop: 12 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: T, margin: '0 0 4px', lineHeight: 1.4 }}>Everything above is connected to everything else.</p>
          <p style={{ fontSize: 9, color: MUTED, margin: 0, lineHeight: 1.6 }}>
            Create a dish — allergens, costs, HACCP, training notes, and FOH description are generated simultaneously. Change a supplier price — every linked dish recoasts. Change a recipe — allergen matrix, nutrition, and training all update. One platform. Zero manual connections.
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
  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 16px`, overflow: 'hidden' }}>
        <Label text="Who It's For" />
        <H2>Built for operators who are done carrying everything themselves.</H2>
        <Body>
          HospitalitySupport.uk is built for the reality of running a hospitality business — not the ideal version of it. For operators managing with less than they need, who know things are slipping through the gaps, and want to fix the foundations without adding complexity.
        </Body>

        <Divider slim />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 36px', marginBottom: 14 }}>
          <div>
            <H3>Independent Restaurants & Pubs</H3>
            <Body size={9}>
              Owner-operators and working chefs responsible for everything but with capacity for none of it properly. The platform removes the administrative burden so time goes back to the food and the guest.
            </Body>
            <Bullets size={9} items={[
              'Full menu management without a food tech team',
              'Live GP without a finance department',
              'Compliance without a dedicated manager',
              'Training that runs without an HR function',
            ]} />
          </div>
          <div>
            <H3>Groups & Multi-Site Operators</H3>
            <Body size={9}>
              Operations directors who need visibility and consistency across sites without building a head office team. Consistent standards, live GP, and compliance across every site — visible in one place.
            </Body>
            <Bullets size={9} items={[
              'Group-level GP reporting across all sites',
              'Consistent menu and allergen standards everywhere',
              'Site-level compliance visible from the centre',
              'Uniform training without centralised delivery',
            ]} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 36px', marginBottom: 14 }}>
          <div>
            <H3>Dark Kitchens & Production Kitchens</H3>
            <Body size={9}>
              High-throughput operations where consistency and documentation are critical. Multiple brands, high staff turnover, no front-of-house to absorb errors.
            </Body>
            <Bullets size={9} items={[
              'Multiple menu brands from one platform',
              'Training that keeps pace with high churn',
              'Compliance that scales without headcount',
              'Allergen accuracy across every brand and shift',
            ]} />
          </div>
          <div>
            <H3>Contract Caterers & Managed Services</H3>
            <Body size={9}>
              Operators managing hospitality for third-party clients who need to demonstrate standards and evidence compliance across a portfolio with lean teams.
            </Body>
            <Bullets size={9} items={[
              'Client-ready compliance reporting',
              'Consistent standards across managed contracts',
              'Live cost visibility per site or contract',
              'Training evidence available on demand',
            ]} />
          </div>
        </div>

        <Divider slim />

        <H3>This is specifically for you if:</H3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
          <Bullets items={[
            'You manage GP on spreadsheets and catch problems too late',
            "Training relies on one or two key people — and you know the risk",
            'You spend more time on compliance than running the business',
            'Multiple sites are losing visibility as you scale',
          ]} />
          <Bullets items={[
            "You're paying for software your team doesn't fully use",
            'You want a complete operations capability without building one',
            'An experienced person is holding everything together',
            'You know what it costs when knowledge walks out the door',
          ]} />
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
      tier: 'Standard Venue', price: '£100', period: '/month', tag: '£3.30 per day',
      who: 'For pubs, restaurants, cafés, and independent hospitality businesses.',
      hi: true,
      includes: [
        'Full platform access — unlimited users',
        'Menu development & recipe spec',
        'Live GP & automatic recosting',
        "Allergen management — Natasha's Law compliant",
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
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 16px`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Label text="Pricing" />
        <H2>Priced per kitchen. Not per user. Not per seat.</H2>
        <Body>
          Every person who works in or manages your operation has full access. No user limits, no module fees, no professional services charges. The price you see is the price you pay — and it includes everything.
        </Body>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {tiers.map((p, i) => (
            <div key={i} style={{ border: `1px solid ${p.hi ? `${T}45` : RULE}`, borderRadius: 9, overflow: 'hidden', background: p.hi ? `${T}06` : WHITE }}>
              <div style={{ padding: '11px 18px', borderBottom: `1px solid ${p.hi ? `${T}25` : RULE}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: p.hi ? `${T}10` : SNOW }}>
                <div>
                  <p style={{ fontSize: 8.5, fontWeight: 800, color: T, textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 2px' }}>{p.tier}</p>
                  <p style={{ fontSize: 9, color: MUTED, margin: 0 }}>{p.who}</p>
                </div>
                <div style={{ textAlign: 'right' as const, flexShrink: 0, marginLeft: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, justifyContent: 'flex-end' }}>
                    <span style={{ color: INK, fontSize: 24, fontWeight: 900, lineHeight: 1 }}>{p.price}</span>
                    <span style={{ color: MUTED, fontSize: 9.5 }}>{p.period}</span>
                  </div>
                  {p.tag && <p style={{ color: T, fontSize: 8, fontWeight: 700, margin: '2px 0 0' }}>{p.tag}</p>}
                </div>
              </div>
              <div style={{ padding: '9px 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 14px' }}>
                {p.includes.map((inc, ii) => (
                  <div key={ii} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                    <span style={{ color: T, fontSize: 8.5, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 8.5, color: '#374151', lineHeight: 1.45 }}>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: SNOW, border: `1px solid ${RULE}`, borderRadius: 7, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <p style={{ color: MUTED, fontSize: 9, margin: 0 }}>Annual billing · No setup fees · No per-user fees · No hidden costs · No implementation charges</p>
          <p style={{ color: T, fontSize: 9, fontWeight: 700, margin: 0, flexShrink: 0, marginLeft: 14 }}>Cancel any time</p>
        </div>
      </div>
      <Footer n={6} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 7 — WHY US / COMPARISON
══════════════════════════════════════════════════════════════════════════ */
function ComparisonPage() {
  const rows = [
    ['Time to go live',              'Under 5 minutes',                     '4–8 week implementation'],
    ['Dish concept to full spec',    'Under 3 minutes',                     '2–3 hours of manual work'],
    ['Allergen management',          'Auto-generated, always live',          'Manual spreadsheets, updated infrequently'],
    ['HACCP documentation',          'Built per dish, automatically',        'Generic templates copied and pasted'],
    ['Ordering & purchase orders',   'Auto-built from live menu',            'Manual shopping lists'],
    ['Delivery checking',            'Automated scan vs PO matching',        'Paper-based, no records'],
    ['GP tracking',                  'Live — updates on every price change', 'Monthly recalculation, if at all'],
    ['Supplier price changes',       'Suppliers update their own portal',    'You manually re-enter prices'],
    ['Training content',             'From your actual operations',          'Generic industry content'],
    ['Compliance evidence',          'Created as work happens',              'Retrospective, often incomplete'],
    ['Interface',                    'Plain English — no training needed',   'Complex UI requiring onboarding'],
    ['Built by',                     'Hospitality operators',                'Technology developers'],
  ];

  const quotes = [
    { q: "First piece of technology that actually thinks like a chef.", a: 'Head Chef, independent restaurant, London' },
    { q: "Within the hour we had allergen matrices for every dish. I kept waiting for the catch.", a: 'Operations Manager, pub group, Midlands' },
    { q: "Our last EHO visit was the smoothest we've ever had. Every record was there — nothing to scramble for.", a: 'Owner, bistro group, South West' },
    { q: "I stopped worrying about GP the week we signed up. The dashboard just tells me when something needs attention.", a: 'General Manager, 3-site operator' },
  ];

  return (
    <DocPage>
      <Header />
      <div style={{ flex: 1, padding: `${PAD_Y}px ${PAD_X}px 16px`, overflow: 'hidden' }}>
        <Label text="Why HospitalitySupport.uk" />
        <H2>Simple, intuitive, and built around how kitchens actually operate.</H2>
        <Body>
          Most hospitality platforms were built by developers who studied the industry from the outside. They require implementation projects and training programmes. The result is software that sits unused, used partially, or used badly — and that doesn't fix the problems it was bought to solve.
        </Body>
        <Body>
          HospitalitySupport.uk was built by people who have run kitchens and managed sites. The design principle: if a chef has to stop and think about how to use it, it's wrong.
        </Body>

        <div style={{ border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '38% 31% 31%', background: INK }}>
            <div style={{ padding: '7px 12px', color: FAINT, fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Capability</div>
            <div style={{ padding: '7px 12px', color: TL, fontSize: 8, fontWeight: 800, borderLeft: '1px solid rgba(255,255,255,0.07)' }}>HospitalitySupport.uk</div>
            <div style={{ padding: '7px 12px', color: '#475569', fontSize: 8, fontWeight: 700, borderLeft: '1px solid rgba(255,255,255,0.07)' }}>Traditional platforms</div>
          </div>
          {rows.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '38% 31% 31%', background: i % 2 === 0 ? WHITE : SNOW, borderTop: `1px solid ${RULE}` }}>
              <div style={{ padding: '5px 12px', fontSize: 9, color: INK, fontWeight: 600 }}>{row[0]}</div>
              <div style={{ padding: '5px 12px', fontSize: 9, color: T, fontWeight: 600, borderLeft: `1px solid ${RULE}` }}>{row[1]}</div>
              <div style={{ padding: '5px 12px', fontSize: 9, color: FAINT, borderLeft: `1px solid ${RULE}` }}>{row[2]}</div>
            </div>
          ))}
        </div>

        <H3>What operators who use it say</H3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
          {quotes.map((q, i) => (
            <div key={i} style={{ background: SNOW, border: `1px solid ${RULE}`, borderRadius: 7, padding: '10px 12px', borderLeft: `3px solid ${T}` }}>
              <p style={{ fontSize: 9, lineHeight: 1.55, color: SLATE, fontStyle: 'italic', margin: '0 0 6px' }}>"{q.q}"</p>
              <p style={{ fontSize: 7.5, color: FAINT, fontWeight: 600, margin: 0 }}>{q.a}</p>
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
    { label: 'Supplier Pricing', col: '#7c3aed' },
    { label: 'Allergens',        col: '#dc2626' },
    { label: 'HACCP & Safety',   col: '#d97706' },
    { label: 'Training',         col: '#059669' },
    { label: 'Front of House',   col: '#0891b2' },
  ];

  return (
    <DocPage bg={DARK}>
      <div style={{ height: 4, background: T, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '46px 50px 38px', overflow: 'hidden' }}>

        <div>
          <p style={{ color: TL, fontSize: 8.5, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' as const, margin: '0 0 14px' }}>
            The Bottom Line
          </p>
          <h2 style={{ color: WHITE, fontSize: 36, fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 4px', maxWidth: 440 }}>
            It doesn't change what hospitality is.
          </h2>
          <div style={{ width: 50, height: 4, background: T, borderRadius: 2, margin: '0 0 18px' }} />
          <p style={{ color: FAINT, fontSize: 12.5, lineHeight: 1.7, margin: '0 0 16px', maxWidth: 430 }}>
            It changes what you personally have to carry.
          </p>
          <p style={{ color: MUTED, fontSize: 10, lineHeight: 1.75, maxWidth: 440, margin: '0 0 10px' }}>
            Menu development. GP control. Allergen management. Compliance. Training. Front-of-house support. Supplier pricing. Ordering. Deliveries. All of it — working together, always live, built around your actual operation.
          </p>
          <p style={{ color: MID, fontSize: 10, lineHeight: 1.75, maxWidth: 420, margin: '0 0 10px' }}>
            From £3.30 a day. Per kitchen, not per user. No setup fees. No implementation project. No training required. Live in under 5 minutes.
          </p>
          <p style={{ color: '#334155', fontSize: 10, lineHeight: 1.75, margin: 0 }}>
            No payroll. No politics. No sick days. No knowledge walking out the door.
          </p>
        </div>

        {/* Module strip */}
        <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
          {modules.map((m, i) => (
            <div key={i} style={{ flex: 1, padding: '12px 0', textAlign: 'center' as const, background: m.col, borderRight: i < 7 ? '1px solid rgba(0,0,0,0.12)' : 'none' }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 7, fontWeight: 800, display: 'block', padding: '0 3px', lineHeight: 1.3 }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 22 }}>
          <p style={{ color: TL, fontSize: 13, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
            Book a 30-minute demonstration
          </p>
          <p style={{ color: MUTED, fontSize: 9.5, lineHeight: 1.65, margin: '0 0 16px', maxWidth: 400 }}>
            We'll show your actual dishes recosting live against your supplier prices. No slides. No generic demo. Your data, your operation, in real time.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ background: T, color: WHITE, fontWeight: 900, fontSize: 11, padding: '12px 24px', borderRadius: 8 }}>
              hospitalitysupport.uk
            </div>
            <span style={{ color: MID, fontSize: 9.5, lineHeight: 1.55 }}>
              Or ask for a call — we'll come to you.
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
      <div style={{ maxWidth: PW + 48 }} className="mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">Brochure — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">8 pages · Each page fits exactly on A4 · Print or save as PDF</p>
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
              width: 210mm !important;
              height: 297mm !important;
            }
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
