import React from 'react';

/*
  250×200mm landscape at 96dpi = 945 × 756px.
  Brand: dark navy #080f1a, teal #14b8a6 / #2dd4bf, white text.
*/
const PW  = 945;
const PH  = 756;
const NAV = '#080f1a';
const T   = '#14b8a6';
const TL  = '#2dd4bf';
const T3  = '#99f6e4';
const W   = '#ffffff';
const S9  = '#0f172a';
const S8  = '#1e293b';
const S4  = '#94a3b8';
const S5  = '#64748b';
const F   = "'Inter', system-ui, sans-serif";

/* ── Reusable primitives ─────────────────────────────────────────────── */

function Page({ children, bg = NAV }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="print-page"
      style={{
        width: PW, height: PH, flexShrink: 0,
        fontFamily: F, background: bg,
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px', opacity: 0.025,
      }} />
      {children}
    </div>
  );
}

function PageHeader({ n, total = 8 }: { n: number; total?: number }) {
  return (
    <div style={{
      padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0, position: 'relative', zIndex: 1,
    }}>
      <span style={{ color: W, fontWeight: 900, fontSize: 11, letterSpacing: '-0.02em', fontFamily: F }}>
        HospitalitySupport<span style={{ color: TL }}>.uk</span>
      </span>
      <span style={{ color: S5, fontSize: 8.5, fontFamily: F }}>{n} / {total}</span>
    </div>
  );
}

function PageFooter({ text }: { text?: string }) {
  return (
    <div style={{
      padding: '8px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0, position: 'relative', zIndex: 1,
    }}>
      <span style={{ color: '#1e3a4a', fontSize: 8, fontFamily: F }}>{text ?? 'hospitalitysupport.uk'}</span>
      <span style={{ color: '#1e3a4a', fontSize: 8, fontFamily: F }}>Confidential · Not for distribution</span>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div style={{
      display: 'inline-block',
      background: 'rgba(20,184,166,0.10)', border: '1px solid rgba(20,184,166,0.25)',
      color: T3, fontSize: 8, fontWeight: 800, letterSpacing: '0.15em',
      textTransform: 'uppercase' as const, borderRadius: 999, padding: '4px 12px',
      marginBottom: 12, fontFamily: F,
    }}>
      {text}
    </div>
  );
}

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{ color: W, fontWeight: 900, fontSize: 42, lineHeight: 0.95, letterSpacing: '-0.04em', margin: '0 0 12px', fontFamily: F }}>
      {children}
    </h1>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ color: W, fontWeight: 900, fontSize: 24, lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 10px', fontFamily: F }}>
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ color: W, fontWeight: 900, fontSize: 13, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 6px', fontFamily: F }}>
      {children}
    </h3>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: S5, fontWeight: 700, fontSize: 8.5, letterSpacing: '0.15em', textTransform: 'uppercase' as const, margin: '0 0 5px', fontFamily: F }}>
      {children}
    </p>
  );
}

function Body({ children, size = 11, muted = false }: { children: React.ReactNode; size?: number; muted?: boolean }) {
  return (
    <p style={{ color: muted ? S5 : S4, fontSize: size, lineHeight: 1.6, margin: '0 0 10px', fontFamily: F }}>
      {children}
    </p>
  );
}

function Arrows({ items, size = 10 }: { items: string[]; size?: number }) {
  return (
    <ul style={{ margin: '0 0 10px', padding: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 7, marginBottom: 5, alignItems: 'flex-start' }}>
          <span style={{ color: TL, fontSize: size + 1, lineHeight: 1.5, flexShrink: 0, fontWeight: 700 }}>→</span>
          <span style={{ color: S4, fontSize: size, lineHeight: 1.5, fontFamily: F }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Card({ children, teal, style }: { children: React.ReactNode; teal?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: teal ? 'rgba(20,184,166,0.08)' : 'rgba(15,23,42,0.7)',
      border: teal ? '1px solid rgba(20,184,166,0.20)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16, padding: '14px 18px',
      ...style,
    }}>
      {children}
    </div>
  );
}

function CardHL({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(20,184,166,0.15)',
      border: '2px solid rgba(20,184,166,0.50)',
      borderRadius: 16, padding: '14px 18px',
      boxShadow: '0 6px 24px rgba(13,148,136,0.20)',
      ...style,
    }}>
      {children}
    </div>
  );
}

function Teal({ children }: { children: React.ReactNode }) {
  return <span style={{ color: TL }}>{children}</span>;
}

function TealMuted({ children }: { children: React.ReactNode }) {
  return <span style={{ color: S5, opacity: 0.7 }}>{children}</span>;
}

function Stat({ val, label }: { val: string; label: string }) {
  return (
    <Card style={{ textAlign: 'center' as const, padding: '12px 8px' }}>
      <div style={{ color: TL, fontSize: 20, fontWeight: 900, lineHeight: 1, marginBottom: 4, fontFamily: F }}>{val}</div>
      <div style={{ color: S5, fontSize: 8.5, lineHeight: 1.35, fontFamily: F }}>{label}</div>
    </Card>
  );
}

function Rule() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '14px 0' }} />;
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE 1 — COVER
══════════════════════════════════════════════════════════════════════ */
function CoverPage() {
  const caps = [
    { label: 'Menu creation',       sub: 'Full spec in under 3 minutes' },
    { label: 'Live GP & costing',   sub: 'Every dish, every day' },
    { label: 'Allergens',           sub: "Natasha's Law, always live" },
    { label: 'HACCP & safety',      sub: 'Audit-ready automatically' },
    { label: 'Staff training',      sub: 'Built from your real ops' },
    { label: 'Supplier pricing',    sub: 'Real-time, zero spreadsheets' },
    { label: 'Ordering & delivery', sub: 'POs, reconciliation, discrepancies' },
    { label: 'Multi-site control',  sub: 'Every site, one dashboard' },
  ];

  return (
    <Page>
      <div style={{ height: 4, background: T, flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div style={{
          position: 'absolute', top: -150, left: '38%', width: 550, height: 400,
          background: 'rgba(20,184,166,0.08)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        {/* Left — hero copy */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 36px 28px 40px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: T, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: W, opacity: 0.9 }} />
            </div>
            <span style={{ color: W, fontWeight: 900, fontSize: 13, letterSpacing: '-0.02em', fontFamily: F }}>
              HospitalitySupport<span style={{ color: TL }}>.uk</span>
            </span>
          </div>

          <div>
            <Badge text="The complete operations platform for hospitality" />
            <H1>
              Stop doing<br />
              <Teal>the admin.</Teal><br />
              <TealMuted>Start running the kitchen.</TealMuted>
            </H1>
            <p style={{ color: S4, fontSize: 12, lineHeight: 1.6, maxWidth: 340, margin: '0 0 20px', fontFamily: F }}>
              One platform that runs your entire operation — menus, margins, allergens, compliance, training, and supplier pricing. All connected. All live. All automatic.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, maxWidth: 380 }}>
              {[
                { val: '5 min',  label: 'to go live' },
                { val: 'Live',   label: 'price tracking' },
                { val: '14',     label: 'allergens tracked' },
                { val: '0',      label: 'spreadsheets needed' },
              ].map((s, i) => <Stat key={i} val={s.val} label={s.label} />)}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
            <p style={{ color: '#1a3040', fontSize: 8, margin: 0, fontFamily: F }}>Confidential · Not for distribution · hospitalitysupport.uk</p>
          </div>
        </div>

        {/* Right — capability grid */}
        <div style={{ width: 310, background: 'rgba(15,23,42,0.5)', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '36px 24px', gap: 0 }}>
          <Label>Everything it covers</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8 }}>
            {caps.map((c, i) => (
              <Card key={i} teal style={{ padding: '9px 11px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 2 }}>
                  <span style={{ color: TL, fontWeight: 700, fontSize: 9.5, lineHeight: 1.4, flexShrink: 0 }}>→</span>
                  <span style={{ color: W, fontWeight: 900, fontSize: 9.5, lineHeight: 1.2, fontFamily: F }}>{c.label}</span>
                </div>
                <span style={{ color: S5, fontSize: 8.5, lineHeight: 1.35, display: 'block', paddingLeft: 16, fontFamily: F }}>{c.sub}</span>
              </Card>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <Card teal style={{ padding: '12px 14px', textAlign: 'center' as const }}>
              <div style={{ color: W, fontWeight: 900, fontSize: 10, marginBottom: 3, fontFamily: F }}>Book a 30-minute demo</div>
              <div style={{ color: TL, fontWeight: 900, fontSize: 12, fontFamily: F }}>hospitalitysupport.uk</div>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE 2 — THE PROBLEM
══════════════════════════════════════════════════════════════════════ */
function ProblemPage() {
  return (
    <Page>
      <PageHeader n={2} />
      <div style={{ flex: 1, padding: '24px 40px 20px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Badge text="The Problem" />
        <H2>Hospitality doesn't have hundreds of problems. It has <Teal>three.</Teal></H2>
        <Body size={10.5}>
          Every challenge an operator faces traces back to people, process, or profit. Most businesses are fighting all three at once, with no resource to fix any of them properly.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, flex: 1 }}>

          <div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 12 }} />
            <Label>01 — People</Label>
            <H3>The knowledge walks out with them.</H3>
            <Body size={10}>
              Skill levels are eroding. Turnover is constant. You're expected to deliver the same standards with less experienced staff — and most operations rely on one or two people to hold everything together.
            </Body>
            <Arrows size={9.5} items={[
              'High turnover means constant informal retraining',
              'New starters cause errors and compliance gaps before they reach full competence',
              'Knowledge concentrated in a few people creates fragility',
            ]} />
          </div>

          <div>
            <div style={{ height: 3, background: 'rgba(20,184,166,0.4)', borderRadius: 2, marginBottom: 12 }} />
            <Label>02 — Process</Label>
            <H3>Compliance is reactive, not embedded.</H3>
            <Body size={10}>
              Food safety records, allergen documentation, certifications — all falling on people who are already stretched. When an inspector arrives, the scramble begins.
            </Body>
            <Arrows size={9.5} items={[
              'Records created after problems, not as work happens',
              'Allergen information out of date and disconnected from the live menu',
              'Pre-service briefings verbal — no evidence trail',
            ]} />
          </div>

          <div>
            <div style={{ height: 3, background: TL, borderRadius: 2, marginBottom: 12 }} />
            <Label>03 — Profit</Label>
            <H3>Margin erodes quietly, then all at once.</H3>
            <Body size={10}>
              Supplier prices creep. Portions drift. Menus age. Most businesses don't lose margin in one big hit — they bleed it slowly.
            </Body>
            <Arrows size={9.5} items={[
              "Supplier price changes don't trigger an immediate menu recost",
              'GP calculated at menu launch, not tracked continuously',
              'Portion drift invisible until stock variance makes it undeniable',
            ]} />
          </div>
        </div>

        <Card teal style={{ marginTop: 14 }}>
          <p style={{ color: W, fontWeight: 900, fontSize: 11, margin: 0, fontFamily: F, lineHeight: 1.5 }}>
            "Every challenge a hospitality operator faces traces back to people, process, or profit.
            <span style={{ color: TL }}> HospitalitySupport.uk is built to solve all three.</span>"
          </p>
        </Card>
      </div>
      <PageFooter />
    </Page>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE 3 — THE SOLUTION
══════════════════════════════════════════════════════════════════════ */
function SolutionPage() {
  return (
    <Page>
      <PageHeader n={3} />
      <div style={{ flex: 1, padding: '24px 40px 20px', display: 'flex', gap: 36, position: 'relative', zIndex: 1 }}>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Badge text="The Solution" />
          <H2>Not software.<br /><Teal>An operations platform.</Teal></H2>
          <Body size={10.5}>
            Most hospitality technology is built for trained users with time, discipline, and structure. It assumes a stable team with capacity to configure and maintain a system. That's not the reality of running a kitchen.
          </Body>
          <Body size={10.5}>
            HospitalitySupport.uk behaves like a competent operations team — built from real hospitality expertise, available around the clock, designed for real kitchens under real pressure. You don't configure it. You just use it.
          </Body>

          <Rule />

          <H3>Built by chefs, for chefs</H3>
          <Body size={10}>
            Designed by people who have spent years in professional kitchens — not developers who studied the industry from the outside. Plain English. No training required.
          </Body>

          <Rule />

          <H3>Everything connected. Always live.</H3>
          <Body size={10}>
            Create a dish — allergens, cost, HACCP, training notes, and FOH description are generated simultaneously. Change a supplier price — every linked dish recoasts in under a second.
          </Body>

          <Card teal style={{ marginTop: 'auto' }}>
            <p style={{ color: TL, fontWeight: 700, fontSize: 11, fontStyle: 'italic', margin: 0, lineHeight: 1.5, fontFamily: F }}>
              "You don't build your business around it. It builds itself around you."
            </p>
          </Card>
        </div>

        <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div>
            <Label>Platform speed</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
              {[
                { val: '3 min',   label: 'dish concept to full spec' },
                { val: '< 1s',    label: 'price change to full recost' },
                { val: '5 min',   label: 'sign-up to fully live' },
                { val: '14',      label: 'allergens tracked per dish' },
              ].map((s, i) => <Stat key={i} val={s.val} label={s.label} />)}
            </div>
          </div>

          <Card>
            <Label>Why it works differently</Label>
            <Arrows size={10} items={[
              'No onboarding sessions or implementation projects',
              'No training required for kitchen or management teams',
              'Works on any device — phone, tablet, desktop',
              'Plain English — no modules or menus to navigate',
              'Responds the same for a head chef or a site director',
            ]} />
          </Card>

        </div>
      </div>
      <PageFooter />
    </Page>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE 4 — WHAT IT COVERS
══════════════════════════════════════════════════════════════════════ */
function CapabilityPage() {
  const caps = [
    { label: 'Menu Development & Recipe Spec',
      body: 'Describe a dish in plain English — full spec in under 3 minutes: recipe, method, mise en place, portions, yield, batch notes, and pairings.' },
    { label: 'Cost & GP Control',
      body: "Every dish priced against your live supplier catalogue the moment it's created. GP tracked continuously. Supplier price change recoasts every dish in under a second." },
    { label: 'Ordering & Deliveries',
      body: 'Shopping list auto-built from the live menu. Purchase orders generated with one action. Delivery checker flags discrepancies and keeps the audit record.' },
    { label: 'Supplier Pricing & Management',
      body: 'Suppliers maintain their own pricing in a dedicated portal. You see updates the moment they happen. Invoice scanning matches line items automatically.' },
    { label: 'Allergens & Nutrition',
      body: "All 14 allergens tracked per dish, automatically. Natasha's Law compliant. Updates itself when a recipe changes. Nutritional info calculated per portion." },
    { label: 'HACCP & Food Safety',
      body: 'Critical control points generated per dish at creation. Specific critical limits and corrective actions. Inspection-ready reports built in.' },
    { label: 'Training & Compliance',
      body: 'Training built from your actual menus, roles, and procedures. Level 2 food hygiene included. Certifications tracked with automatic expiry alerts.' },
    { label: 'Front of House',
      body: "FOH always has the live menu — what's on, what's 86'd, allergens present, specials. Dish descriptions and pairings generated and current." },
  ];

  return (
    <Page>
      <PageHeader n={4} />
      <div style={{ flex: 1, padding: '24px 40px 18px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Badge text="What It Covers" />
        <H2>Every area of your operation. <Teal>All connected. Always live.</Teal></H2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, flex: 1 }}>
          {caps.map((c, i) => (
            <Card key={i} style={{ display: 'flex', flexDirection: 'column', padding: '12px 14px' }}>
              <div style={{ width: 3, height: 22, background: TL, borderRadius: 2, marginBottom: 9, flexShrink: 0 }} />
              <H3>{c.label}</H3>
              <p style={{ color: S4, fontSize: 9.5, lineHeight: 1.55, margin: 0, fontFamily: F }}>{c.body}</p>
            </Card>
          ))}
        </div>

        <Card teal style={{ marginTop: 10 }}>
          <p style={{ fontWeight: 900, fontSize: 10.5, color: W, margin: '0 0 4px', fontFamily: F }}>Everything above is connected to everything else.</p>
          <p style={{ color: S4, fontSize: 9.5, margin: 0, lineHeight: 1.55, fontFamily: F }}>
            Create a dish — allergens, costs, HACCP, training notes, and FOH description are generated simultaneously. Change a supplier price — every linked dish recoasts. Change a recipe — allergen matrix, nutrition, and training all update.
          </p>
        </Card>
      </div>
      <PageFooter />
    </Page>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE 5 — WHO IT'S FOR
══════════════════════════════════════════════════════════════════════ */
function AudiencePage() {
  const segments = [
    {
      title: 'Independent Restaurants & Pubs',
      body: 'Owner-operators and working chefs responsible for everything but with capacity for none of it properly.',
      items: [
        'Full menu management without a food tech team',
        'Live GP without a finance department',
        'Compliance without a dedicated manager',
        'Training that runs without an HR function',
      ],
    },
    {
      title: 'Groups & Multi-Site Operators',
      body: 'Operations directors who need visibility and consistency across sites without building a head office team.',
      items: [
        'Group-level GP reporting across all sites',
        'Consistent menu and allergen standards everywhere',
        'Site-level compliance visible from the centre',
        'Uniform training without centralised delivery',
      ],
    },
    {
      title: 'Dark Kitchens & Production',
      body: 'High-throughput operations where consistency and documentation are critical. Multiple brands, high staff turnover.',
      items: [
        'Multiple menu brands from one platform',
        'Training that keeps pace with high churn',
        'Compliance that scales without headcount',
        'Allergen accuracy across every brand and shift',
      ],
    },
    {
      title: 'Contract Caterers',
      body: 'Operators managing hospitality for third-party clients who need to demonstrate standards across a portfolio.',
      items: [
        'Client-ready compliance reporting on demand',
        'Consistent standards across managed contracts',
        'Live cost visibility per site or contract',
        'Training evidence available at any time',
      ],
    },
  ];

  return (
    <Page>
      <PageHeader n={5} />
      <div style={{ flex: 1, padding: '24px 40px 18px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Badge text="Who It's For" />
        <H2>Built for operators who are done <Teal>carrying everything themselves.</Teal></H2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
          {segments.map((s, i) => (
            <Card key={i} style={{ display: 'flex', flexDirection: 'column', padding: '14px 16px' }}>
              <H3>{s.title}</H3>
              <Body size={10}>{s.body}</Body>
              <Arrows size={9.5} items={s.items} />
            </Card>
          ))}
        </div>

        <Rule />

        <div>
          <Label>This is specifically for you if:</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px', marginTop: 8 }}>
            <Arrows size={10} items={[
              'You manage GP on spreadsheets and catch problems too late',
              'Training relies on one or two key people — and you know the risk',
              'You spend more time on compliance than running the business',
              'Multiple sites are losing visibility as you scale',
            ]} />
            <Arrows size={10} items={[
              "You're paying for software your team doesn't fully use",
              'You want complete operations capability without building it',
              'An experienced person is holding everything together',
              'You know what it costs when knowledge walks out the door',
            ]} />
          </div>
        </div>
      </div>
      <PageFooter />
    </Page>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE 6 — PRICING
══════════════════════════════════════════════════════════════════════ */
function PricingPage() {
  const tiers = [
    {
      name: 'Standard Venue', price: '£100', period: 'per month',
      for: 'Pubs, restaurants, cafés',
      pitch: 'Less than the cost of one wasted delivery. More than enough to protect every margin, every day.',
      hi: false,
      features: [
        'Full menu creation & live GP control',
        "Allergen compliance — Natasha's Law handled",
        'HACCP & food safety documentation',
        'Staff training generated from your ops',
        'Supplier price monitoring & auto-recosting',
        'Unlimited staff access — no per-user fees',
        'Ordering, purchase orders & delivery checking',
        'Front-of-house knowledge base',
      ],
    },
    {
      name: 'High-Intensity Kitchen', price: '£250', period: 'per month',
      for: 'Dark kitchens & production kitchens',
      pitch: 'Priced for operational load, not headcount. Built for kitchens where margins move daily and errors cost thousands.',
      hi: true,
      features: [
        'Everything in Standard Venue',
        'Multiple menus and brands per kitchen',
        'Higher-volume training & compliance throughput',
        'Larger teams and higher staff turnover supported',
        'Priority support',
      ],
    },
    {
      name: 'Multi-Site & Groups', price: '£100', period: 'per kitchen / month',
      for: 'Groups, estates, franchise operators',
      pitch: "Same per-kitchen price as Standard. You don't pay more to see more — full visibility across your estate.",
      hi: false,
      features: [
        'Everything in Standard Venue',
        'Group-level compliance and spend reporting',
        'Central oversight with local execution',
        'Consistent standards without micromanagement',
        'Shared supplier relationships across the group',
      ],
    },
  ];

  return (
    <Page>
      <PageHeader n={6} />
      <div style={{ flex: 1, padding: '24px 40px 18px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Badge text="Pricing" />
        <H2>Priced per kitchen.<br /><Teal>Not per user. Not per seat.</Teal></H2>
        <Body size={10.5}>
          Annual billing. Your whole team, one flat fee. No add-ons for compliance, training, or multi-user access. The price you see is the price you pay.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, flex: 1 }}>
          {tiers.map((t, i) => {
            const Inner = t.hi ? CardHL : Card;
            return (
              <Inner key={i} style={{ display: 'flex', flexDirection: 'column', padding: '16px 18px' }}>
                {t.hi && (
                  <div style={{
                    display: 'inline-block', alignSelf: 'flex-start',
                    background: 'rgba(20,184,166,0.20)', border: '1px solid rgba(20,184,166,0.40)',
                    color: T3, fontSize: 7.5, fontWeight: 900, letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const, borderRadius: 999, padding: '3px 10px', marginBottom: 10, fontFamily: F,
                  }}>High volume</div>
                )}
                <Label>{t.for}</Label>
                <H3>{t.name}</H3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '8px 0 12px' }}>
                  <span style={{ color: W, fontSize: 32, fontWeight: 900, lineHeight: 1, fontFamily: F }}>{t.price}</span>
                  <span style={{ color: S4, fontSize: 10 }}>{t.period}</span>
                </div>
                <Arrows size={10} items={t.features} />
                <p style={{ color: t.hi ? 'rgba(153,246,228,0.7)' : S5, fontSize: 9.5, lineHeight: 1.55, fontStyle: 'italic', margin: 'auto 0 0', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: F }}>
                  {t.pitch}
                </p>
              </Inner>
            );
          })}
        </div>

        <Card teal style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: W, fontWeight: 900, fontSize: 12, margin: '0 0 3px', fontFamily: F }}>The cost of one bad month pays for a year.</p>
              <p style={{ color: S4, fontSize: 10, margin: 0, fontFamily: F }}>
                Margin erosion, allergen errors, failed inspections, staff retraining — any one costs more than the annual subscription.
              </p>
            </div>
            <div style={{ flexShrink: 0, marginLeft: 20 }}>
              <p style={{ color: S5, fontSize: 8.5, margin: '0 0 3px', textAlign: 'right' as const, fontFamily: F }}>Annual billing · No setup fees</p>
              <p style={{ color: S5, fontSize: 8.5, margin: 0, textAlign: 'right' as const, fontFamily: F }}>Cancel any time</p>
            </div>
          </div>
        </Card>
      </div>
      <PageFooter />
    </Page>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE 7 — COMPARISON
══════════════════════════════════════════════════════════════════════ */
function ComparisonPage() {
  const rows = [
    ['Time to go live',        'Under 5 minutes',                    '4–8 week implementation'],
    ['Dish to full spec',      'Under 3 minutes',                    '2–3 hours of manual work'],
    ['Allergen management',    'Auto-generated, always live',         'Manual spreadsheets, updated infrequently'],
    ['HACCP documentation',    'Built per dish, automatically',       'Generic templates copied and pasted'],
    ['Ordering & POs',         'Auto-built from live menu',           'Manual shopping lists'],
    ['GP tracking',            'Live — every price change',           'Monthly recalculation, if at all'],
    ['Supplier price changes', 'Suppliers update their own portal',   'You manually re-enter prices'],
    ['Training content',       'From your actual operations',         'Generic industry content'],
    ['Interface',              'Plain English — no training needed',  'Complex UI requiring onboarding'],
    ['Built by',               'Hospitality operators',               'Technology developers'],
  ];

  const quotes = [
    { q: "First piece of technology that actually thinks like a chef.", a: 'Head Chef, independent restaurant, London' },
    { q: "Within the hour we had allergen matrices for every dish. I kept waiting for the catch.", a: 'Operations Manager, pub group, Midlands' },
    { q: "Our last EHO visit was the smoothest we've ever had. Every record was there.", a: 'Owner, bistro group, South West' },
    { q: "I stopped worrying about GP the week we signed up.", a: 'General Manager, 3-site operator' },
  ];

  return (
    <Page>
      <PageHeader n={7} />
      <div style={{ flex: 1, padding: '24px 40px 18px', display: 'flex', gap: 32, position: 'relative', zIndex: 1 }}>

        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column' }}>
          <Badge text="Why HospitalitySupport.uk" />
          <H2>Simple, intuitive, <Teal>built around how kitchens actually operate.</Teal></H2>
          <Body size={10}>
            Most platforms were built by developers who studied hospitality from the outside. They require implementation projects and training — then sit unused. HospitalitySupport.uk was built by people who have run kitchens.
          </Body>

          <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden', flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '30% 35% 35%', background: S9 }}>
              <div style={{ padding: '7px 12px', color: S5, fontSize: 8, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', fontFamily: F }}>Capability</div>
              <div style={{ padding: '7px 12px', color: TL, fontSize: 9, fontWeight: 900, borderLeft: '1px solid rgba(255,255,255,0.05)', fontFamily: F }}>HospitalitySupport.uk</div>
              <div style={{ padding: '7px 12px', color: S5, fontSize: 8.5, fontWeight: 700, borderLeft: '1px solid rgba(255,255,255,0.05)', fontFamily: F }}>Traditional platforms</div>
            </div>
            {rows.map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '30% 35% 35%',
                background: i % 2 === 0 ? 'rgba(15,23,42,0.4)' : 'rgba(15,23,42,0.7)',
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{ padding: '5px 12px', fontSize: 9.5, color: S4, fontWeight: 600, fontFamily: F }}>{row[0]}</div>
                <div style={{ padding: '5px 12px', fontSize: 9.5, color: TL, fontWeight: 700, borderLeft: '1px solid rgba(255,255,255,0.04)', fontFamily: F }}>{row[1]}</div>
                <div style={{ padding: '5px 12px', fontSize: 9.5, color: S5, borderLeft: '1px solid rgba(255,255,255,0.04)', fontFamily: F }}>{row[2]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 270, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, paddingTop: 60 }}>
          <Label>What operators say</Label>
          {quotes.map((q, i) => (
            <Card key={i} teal style={{ padding: '11px 13px' }}>
              <p style={{ fontSize: 10, lineHeight: 1.5, color: S4, fontStyle: 'italic', margin: '0 0 6px', fontFamily: F }}>"{q.q}"</p>
              <p style={{ fontSize: 8.5, color: S5, fontWeight: 600, margin: 0, fontFamily: F }}>{q.a}</p>
            </Card>
          ))}
        </div>
      </div>
      <PageFooter />
    </Page>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE 8 — CLOSE
══════════════════════════════════════════════════════════════════════ */
function ClosePage() {
  const modules = [
    'Menu Development', 'Cost & GP', 'Ordering & POs',
    'Supplier Pricing', 'Allergens', 'HACCP & Safety',
    'Training', 'Front of House',
  ];

  return (
    <Page>
      <div style={{ height: 4, background: T, flexShrink: 0 }} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div style={{
          position: 'absolute', bottom: -80, right: '28%', width: 480, height: 320,
          background: 'rgba(20,184,166,0.06)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
        }} />

        {/* Left — main copy */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '40px 36px 32px 40px' }}>
          <div>
            <Badge text="The Bottom Line" />
            <h2 style={{ color: W, fontWeight: 900, fontSize: 36, lineHeight: 0.95, letterSpacing: '-0.04em', margin: '0 0 10px', fontFamily: F }}>
              It doesn't change<br />what hospitality is.<br />
              <span style={{ color: TL }}>It changes what you<br />have to carry.</span>
            </h2>
            <div style={{ width: 48, height: 4, background: T, borderRadius: 2, margin: '16px 0 18px' }} />
            <p style={{ color: S4, fontSize: 11.5, lineHeight: 1.65, maxWidth: 380, margin: '0 0 10px', fontFamily: F }}>
              Menu development. GP control. Allergen management. Compliance. Training. Front-of-house support. Supplier pricing. Ordering. All of it — working together, always live, built around your actual operation.
            </p>
            <p style={{ color: S5, fontSize: 11, lineHeight: 1.65, maxWidth: 360, margin: 0, fontFamily: F }}>
              From £3.30 a day. Per kitchen, not per user. No setup fees. Live in under 5 minutes.
            </p>
          </div>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 5, marginBottom: 14 }}>
              {modules.map((m, i) => (
                <Card key={i} teal style={{ padding: '8px 5px', textAlign: 'center' as const }}>
                  <span style={{ color: W, fontSize: 8, fontWeight: 800, lineHeight: 1.25, display: 'block', fontFamily: F }}>{m}</span>
                </Card>
              ))}
            </div>
            <p style={{ color: '#0d2030', fontSize: 8.5, margin: 0, fontFamily: F }}>No payroll. No politics. No sick days. No knowledge walking out the door.</p>
          </div>
        </div>

        {/* Right — CTA panel */}
        <div style={{ width: 280, background: 'rgba(10,18,30,0.8)', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 32px', gap: 22 }}>

          <div>
            <p style={{ color: TL, fontWeight: 900, fontSize: 14, margin: '0 0 10px', letterSpacing: '-0.01em', fontFamily: F }}>
              Book a 30-minute demo
            </p>
            <p style={{ color: S4, fontSize: 10.5, lineHeight: 1.6, margin: '0 0 18px', fontFamily: F }}>
              We'll show your actual dishes recosting live against your supplier prices. No slides. No generic demo. Your data, your operation, in real time.
            </p>
            <div style={{ background: T, color: W, fontWeight: 900, fontSize: 13, padding: '12px 0', borderRadius: 10, textAlign: 'center' as const, letterSpacing: '-0.01em', fontFamily: F }}>
              hospitalitysupport.uk
            </div>
          </div>

          <Rule />

          <p style={{ color: '#0d1f2d', fontSize: 8.5, margin: 0, lineHeight: 1.6, fontFamily: F }}>
            Confidential · Not for distribution
          </p>
        </div>
      </div>
    </Page>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════════════════════════════ */
export default function BrochurePage({ standalone = false }: { standalone?: boolean }) {
  return (
    <div className={`${standalone ? 'min-h-screen' : 'min-h-full'} bg-slate-950 p-6`}>
      <div style={{ maxWidth: PW + 48 }} className="mx-auto">

        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            {standalone
              ? <p className="text-slate-400 text-sm">HospitalitySupport.uk · Sales Brochure</p>
              : <><h1 className="text-white font-black text-2xl">Brochure</h1>
                  <p className="text-slate-400 text-sm mt-1">250×200mm landscape — save as PDF or print. Share via <span className="text-teal-400 font-mono">/brochure</span></p>
                </>
            }
          </div>
          <button
            onClick={() => window.print()}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Save as PDF / Print
          </button>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
          @media print {
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            body { margin: 0; padding: 0; background: #080f1a !important; }
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
              width: 250mm !important;
              height: 200mm !important;
            }
          }
          @page { size: 250mm 200mm landscape; margin: 0; }
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
