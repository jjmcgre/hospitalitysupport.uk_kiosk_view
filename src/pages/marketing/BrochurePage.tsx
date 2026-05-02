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
const DARK    = '#080f1a';
const DARK_MID= '#0f1623';
const F       = "'Inter', system-ui, sans-serif";

/* ── Document page shell ────────────────────────────────────────────────── */
function DocPage({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className="print-page shadow-2xl overflow-hidden"
      style={{
        width: '210mm', minHeight: '297mm', margin: '0 auto',
        fontFamily: F, display: 'flex', flexDirection: 'column',
        background: dark ? DARK : WHITE,
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}

/* ── Running header ─────────────────────────────────────────────────────── */
function RunningHeader({ dark }: { dark?: boolean }) {
  return (
    <div style={{
      padding: '8px 40px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexShrink: 0,
      borderBottom: dark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${RULE}`,
    }}>
      <span style={{ color: dark ? WHITE : INK, fontWeight: 900, fontSize: 11, letterSpacing: '-0.01em' }}>
        HospitalitySupport<span style={{ color: TEAL_LT }}>.uk</span>
      </span>
      <span style={{ color: dark ? '#334155' : FAINT, fontSize: 8 }}>
        Confidential · Not for distribution
      </span>
    </div>
  );
}

/* ── Running footer ─────────────────────────────────────────────────────── */
function RunningFooter({ n, dark }: { n: number; dark?: boolean }) {
  return (
    <div style={{
      padding: '7px 40px', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', flexShrink: 0, marginTop: 'auto',
      borderTop: dark ? '1px solid rgba(255,255,255,0.07)' : `1px solid ${RULE}`,
    }}>
      <span style={{ color: dark ? '#1e293b' : FAINT, fontSize: 7.5 }}>
        hospitalitysupport.uk
      </span>
      <span style={{ color: dark ? '#1e293b' : FAINT, fontSize: 7.5 }}>{n}</span>
    </div>
  );
}

/* ── Pull quote ─────────────────────────────────────────────────────────── */
function PullQuote({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <div style={{
      borderLeft: `4px solid ${TEAL}`,
      paddingLeft: 20, margin: '22px 0',
    }}>
      <p style={{
        color: dark ? '#e2e8f0' : SLATE,
        fontSize: 13.5, fontWeight: 700, lineHeight: 1.55,
        fontStyle: 'italic', margin: 0,
      }}>{text}</p>
    </div>
  );
}

/* ── Section label ──────────────────────────────────────────────────────── */
function SectionLabel({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <p style={{
      fontSize: 8, fontWeight: 800, letterSpacing: '0.15em',
      textTransform: 'uppercase' as const, margin: '0 0 10px',
      color: TEAL,
    }}>{text}</p>
  );
}

/* ── Body text ──────────────────────────────────────────────────────────── */
function Body({ children, dark, size = 10.5 }: { children: React.ReactNode; dark?: boolean; size?: number }) {
  return (
    <p style={{
      fontSize: size, lineHeight: 1.75, margin: '0 0 14px',
      color: dark ? FAINT : MUTED,
    }}>{children}</p>
  );
}

/* ── H1 ─────────────────────────────────────────────────────────────────── */
function H1({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h1 style={{
      fontSize: 36, fontWeight: 900, lineHeight: 1.05,
      letterSpacing: '-0.03em', margin: '0 0 20px',
      color: dark ? WHITE : INK,
    }}>{children}</h1>
  );
}

/* ── H2 ─────────────────────────────────────────────────────────────────── */
function H2({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 style={{
      fontSize: 22, fontWeight: 900, lineHeight: 1.15,
      letterSpacing: '-0.025em', margin: '0 0 14px',
      color: dark ? WHITE : INK,
    }}>{children}</h2>
  );
}

/* ── H3 ─────────────────────────────────────────────────────────────────── */
function H3({ children, dark, colour }: { children: React.ReactNode; dark?: boolean; colour?: string }) {
  return (
    <h3 style={{
      fontSize: 12, fontWeight: 800, lineHeight: 1.3,
      margin: '0 0 5px', letterSpacing: '-0.01em',
      color: colour ?? (dark ? WHITE : INK),
    }}>{children}</h3>
  );
}

/* ── Divider ────────────────────────────────────────────────────────────── */
function Divider({ dark }: { dark?: boolean }) {
  return (
    <hr style={{
      border: 'none',
      borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${RULE}`,
      margin: '22px 0',
    }} />
  );
}

/* ── Bullet list ────────────────────────────────────────────────────────── */
function BulletList({ items, colour, dark }: { items: string[]; colour?: string; dark?: boolean }) {
  const c = colour ?? TEAL;
  return (
    <ul style={{ margin: '0 0 14px', padding: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{
          display: 'flex', gap: 10, marginBottom: 7,
          alignItems: 'flex-start',
        }}>
          <span style={{ color: c, fontSize: 11, lineHeight: 1.5, flexShrink: 0 }}>→</span>
          <span style={{ color: dark ? '#cbd5e1' : '#374151', fontSize: 10.5, lineHeight: 1.65 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Stat block ─────────────────────────────────────────────────────────── */
function StatRow({ stats, dark }: { stats: { val: string; label: string }[]; dark?: boolean }) {
  return (
    <div style={{
      display: 'flex', gap: 0,
      border: dark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${RULE}`,
      borderRadius: 8, overflow: 'hidden',
      margin: '0 0 22px',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: 1, padding: '12px 16px', textAlign: 'center' as const,
          borderRight: i < stats.length - 1
            ? (dark ? '1px solid rgba(255,255,255,0.08)' : `1px solid ${RULE}`)
            : 'none',
          background: dark ? 'rgba(255,255,255,0.03)' : CARD,
        }}>
          <div style={{ color: TEAL_LT, fontSize: 20, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
          <div style={{ color: dark ? MUTED : FAINT, fontSize: 8, marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 1 — COVER
══════════════════════════════════════════════════════════════════════════ */
function CoverPage() {
  return (
    <DocPage dark>
      {/* Top rule */}
      <div style={{ height: 5, background: TEAL, flexShrink: 0 }} />

      {/* Main content area */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '50px 50px 40px',
      }}>
        {/* Logo mark */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 60 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, background: TEAL,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 16, height: 16, borderRadius: 2, background: WHITE, opacity: 0.9 }} />
            </div>
            <span style={{ color: WHITE, fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em' }}>
              HospitalitySupport<span style={{ color: TEAL_LT }}>.uk</span>
            </span>
          </div>

          {/* Cover headline */}
          <p style={{ color: TEAL_LT, fontSize: 9, fontWeight: 800, letterSpacing: '0.15em',
            textTransform: 'uppercase' as const, margin: '0 0 20px' }}>
            The complete operations platform for hospitality
          </p>
          <h1 style={{
            color: WHITE, fontSize: 44, fontWeight: 900, lineHeight: 1.0,
            letterSpacing: '-0.035em', margin: '0 0 28px', maxWidth: 420,
          }}>
            The operations team you never had to hire.
          </h1>
          <p style={{
            color: '#94a3b8', fontSize: 13, lineHeight: 1.65,
            maxWidth: 380, margin: '0 0 40px',
          }}>
            Menu development. Live GP control. Allergen compliance. Food safety. Training. Front-of-house support. Supplier pricing. All of it — working together, from a single platform.
          </p>

          {/* Key stats */}
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { val: '£3.30', label: 'per kitchen, per day' },
              { val: '3 min',  label: 'dish concept to live spec' },
              { val: '5 min',  label: 'to go live — no onboarding' },
              { val: '0',      label: 'spreadsheets required' },
            ].map(s => (
              <div key={s.val} style={{
                borderLeft: `2px solid ${TEAL}40`,
                paddingLeft: 12,
              }}>
                <div style={{ color: TEAL_LT, fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: '#475569', fontSize: 8.5, marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom band */}
        <div>
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          }}>
            <div>
              <p style={{ color: '#334155', fontSize: 8, margin: '0 0 4px',
                textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 700 }}>
                Pricing
              </p>
              <p style={{ color: '#475569', fontSize: 10, margin: 0, lineHeight: 1.5 }}>
                Standard Venue — £100/month &nbsp;·&nbsp; Dark Kitchen — £250/month<br />
                Multi-Site — £100 per kitchen per month &nbsp;·&nbsp; Annual billing
              </p>
            </div>
            <div style={{ textAlign: 'right' as const }}>
              <p style={{ color: '#334155', fontSize: 8, margin: '0 0 4px' }}>hospitalitysupport.uk</p>
              <p style={{ color: '#1e293b', fontSize: 8, margin: 0 }}>Confidential · Not for distribution</p>
            </div>
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
      <RunningHeader />
      <div style={{ flex: 1, padding: '36px 50px 28px' }}>
        <SectionLabel text="The Problem" />
        <H2>Hospitality doesn't have hundreds of problems. It has three.</H2>
        <Body>
          People. Process. Profit. Every challenge a hospitality operator faces traces back to one of these — and most businesses are fighting all three at once, without the resources to do any of them properly.
        </Body>

        <Divider />

        {/* Problem 1 */}
        <div style={{ marginBottom: 24 }}>
          <H3 colour="#dc2626">01 — People</H3>
          <Body>
            Skill levels are eroding. Experience is leaving the industry. Turnover is constant. You're expected to deliver the same standards with less experienced staff on the floor — and most businesses are still relying on one or two people to hold everything together.
          </Body>
          <Body>
            When that person leaves, the knowledge goes with them. Recipes, procedures, supplier relationships, compliance history — often stored only in someone's head. The cost of that knowledge walking out the door is rarely counted, but it's always felt.
          </Body>
          <BulletList items={[
            'High turnover means constant retraining — but most training is informal and undocumented',
            'New starters cause service errors and compliance gaps before they reach full competence',
            'Operational knowledge is concentrated in a few people, creating fragility at scale',
          ]} colour="#dc2626" />
        </div>

        <Divider />

        {/* Problem 2 */}
        <div style={{ marginBottom: 24 }}>
          <H3 colour="#d97706">02 — Process</H3>
          <Body>
            Compliance is a constant battle — not because operators don't care, but because it's relentless, unforgiving, and mostly done reactively. Food safety records, allergen documentation, pre-service briefings, staff certifications — all of it falls on people who are already stretched.
          </Body>
          <Body>
            The paperwork gets done, but rarely in a way that builds useful evidence. When an inspector arrives, the scramble begins. When a guest asks about allergens, the answer starts with "I'll just check in the kitchen." When a new staff member joins, the briefing is verbal and never recorded.
          </Body>
          <BulletList items={[
            'Compliance is reactive — records created after problems, not as work happens',
            'Allergen information is often out of date and not linked to the live menu',
            'Pre-service briefings are verbal and leave no evidence trail',
          ]} colour="#d97706" />
        </div>

        <Divider />

        {/* Problem 3 */}
        <div style={{ marginBottom: 0 }}>
          <H3 colour="#7c3aed">03 — Profit</H3>
          <Body>
            Margins are eroding quietly. Supplier prices creep up. Portions drift. Menus age. Most hospitality businesses don't lose margin in one big hit — they bleed it slowly, and by the time it's visible on the P&L it's already cost them thousands.
          </Body>
          <Body>
            The real problem isn't that operators don't care about GP — it's that the tools to monitor it are either too expensive, too complicated, or too disconnected from the reality of a working kitchen. A spreadsheet updated once a month doesn't protect margin. Only live visibility does.
          </Body>
          <BulletList items={[
            'Supplier price changes rarely trigger an immediate menu recost',
            'GP is often calculated at menu launch and not revisited until month-end',
            'Portion drift is invisible until stock variance makes it undeniable',
          ]} colour="#7c3aed" />
        </div>

        <PullQuote text="Every challenge a hospitality operator faces traces back to people, process, or profit. HospitalitySupport.uk is built to solve all three." />
      </div>
      <RunningFooter n={2} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 3 — THE SOLUTION
══════════════════════════════════════════════════════════════════════════ */
function SolutionPage() {
  return (
    <DocPage>
      <RunningHeader />
      <div style={{ flex: 1, padding: '36px 50px 28px' }}>
        <SectionLabel text="The Solution" />
        <H2>Not software. Not a tool. An operations platform — built around how hospitality actually works.</H2>
        <Body>
          Most hospitality technology is built for trained users with time, discipline, and structure. It assumes a stable team, a management layer with capacity, and people who will open a laptop and configure a system. That's not the reality of running a kitchen.
        </Body>
        <Body>
          HospitalitySupport.uk works differently. It behaves like a competent operations team — built from real hospitality expertise, available around the clock, and designed to operate in real kitchens with real pressures. You don't configure it. You just use it.
        </Body>

        <Divider />

        <H3>Built by chefs, for chefs</H3>
        <Body>
          The platform was designed by people who have spent years in professional kitchens — not by developers who read about hospitality. That means it understands how dishes actually get built, how service actually runs, and what compliance looks like on the floor rather than on paper.
        </Body>
        <Body>
          The interface is plain English. There is no training required. If a chef can describe a dish — its style, target GP, likely audience — the platform builds it. If a manager can describe a problem, the platform responds to it. Nothing needs configuring, importing, or setting up.
        </Body>

        <Divider />

        <H3>Everything connected. Always live.</H3>
        <Body>
          The fundamental difference between HospitalitySupport.uk and every other hospitality platform is this: everything is connected to everything else — and all of it is live.
        </Body>
        <Body>
          A dish is created. Instantly, its allergens are known. Its HACCP controls are generated. Its cost is calculated against live supplier prices. Its training notes are written. Its FOH description is ready. When a supplier changes a price, every linked dish recoasts automatically. When a recipe changes, the allergen matrix updates. When a new dish goes on, the briefing is ready before service.
        </Body>
        <Body>
          This is what being connected and live means in practice: the system never goes stale, and you never have to manually update anything.
        </Body>

        <StatRow stats={[
          { val: '3 min',    label: 'dish concept to full spec' },
          { val: '< 1 sec',  label: 'price change to full recost' },
          { val: '14',       label: 'allergens tracked per dish' },
          { val: '5 min',    label: 'from sign-up to live' },
        ]} />

        <Divider />

        <H3>Intuitive by design</H3>
        <Body>
          The system is intentionally simple. There are no modules to activate, no data to import, no hierarchy to configure. You describe what you need and it responds. A new dish, a compliance question, a training task, a supplier query — all handled through the same interface, in plain language.
        </Body>
        <BulletList items={[
          'No onboarding sessions or implementation projects',
          'No training required for kitchen or management teams',
          'Works on any device — phone, tablet, desktop',
          'Responds in the same way whether you\'re a head chef or a site director',
          'The more you use it, the more it understands your operation',
        ]} />

        <PullQuote text="You don't build your business around it. It builds itself around you." />
      </div>
      <RunningFooter n={3} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 4 — WHAT IT COVERS (capability detail)
══════════════════════════════════════════════════════════════════════════ */
function CapabilityPage() {
  const capabilities = [
    {
      col: '#0d9488',
      title: 'Menu Development & Recipe Spec',
      body: 'Describe a dish in plain English and the platform builds a full specification: recipe, method, mise en place, portions, yield, batch scaling notes, and wine pairings. A dish that would take an experienced chef 2–3 hours to document is ready in under 3 minutes. Every dish lives in the system and feeds every other module automatically.',
    },
    {
      col: '#0284c7',
      title: 'Cost & GP Control',
      body: "Every dish is priced against your live supplier catalogue the moment it's created. GP is calculated automatically and tracked continuously. When a supplier changes a price — their own, through their portal — every affected dish recoasts in under a second. You always know your true margin, in real time, without touching a spreadsheet.",
    },
    {
      col: '#ea580c',
      title: 'Ordering & Deliveries',
      body: 'The shopping list is built automatically from the live menu — no manual compilation. Purchase orders are generated and sent to suppliers with one action. When the delivery arrives, the checker matches goods received against the PO, flags discrepancies immediately, and keeps a full audit record. Nothing gets missed and nothing gets charged incorrectly.',
    },
    {
      col: '#7c3aed',
      title: 'Supplier Pricing & Management',
      body: 'Suppliers connect to their own portal and maintain their own pricing. You see updates the moment they happen. Invoice scanning extracts and matches line items against expected prices automatically. All supplier communication is logged in one auditable thread. You always know where your costs are heading — not where they were last month.',
    },
    {
      col: '#dc2626',
      title: 'Allergens & Nutrition',
      body: "All 14 allergens are identified and tracked for every dish, automatically, from the ingredient list. The matrix is Natasha's Law compliant and updates itself whenever a recipe changes. Nutritional information — calories, protein, fat, carbohydrates, salt — is calculated per portion and kept live. There is no separate allergen process. It's built into everything.",
    },
    {
      col: '#d97706',
      title: 'HACCP & Food Safety',
      body: 'Critical control points are generated per dish at the point of creation — receiving, storage, cooking, chilling, reheating. Critical limits and corrective actions are specific to each dish, not copied from a generic template. Temperature logs, evidence capture, and inspection-ready reports are all built in. Audits become a formality rather than a scramble.',
    },
    {
      col: '#059669',
      title: 'Training & Compliance',
      body: "Training content is generated from your actual menus, roles, and procedures — not from generic industry templates. Level 2 food hygiene is already included. All legal compliance requirements are built in and checked continuously. Certifications are tracked with automatic expiry alerts. Signed briefings are captured digitally, creating an evidence trail that exists before you need it.",
    },
    {
      col: '#0891b2',
      title: 'Front of House',
      body: "FOH staff always have access to the live menu — what's on, what's 86'd, what allergens are present, what the specials are. Dish descriptions and beverage pairings are generated and kept current. Allergen questions are answered accurately without sending staff to the kitchen. The result is fewer errors, fewer complaints, and a noticeably better guest experience.",
    },
  ];

  return (
    <DocPage>
      <RunningHeader />
      <div style={{ flex: 1, padding: '36px 50px 28px' }}>
        <SectionLabel text="What It Covers" />
        <H2>Every area of your operation. All connected. Always live.</H2>
        <Body>
          HospitalitySupport.uk covers eight distinct operational areas — all of them connected through the same live data, all of them updating automatically when anything changes. This is not a collection of separate tools. It is one platform that understands your whole operation.
        </Body>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 28px' }}>
          {capabilities.map((c, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <div style={{ width: 3, height: 20, background: c.col, borderRadius: 2, flexShrink: 0 }} />
                <H3 colour={c.col}>{c.title}</H3>
              </div>
              <p style={{ fontSize: 9.5, lineHeight: 1.65, color: MUTED, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>

        <Divider />

        <div style={{ background: `${TEAL}0c`, border: `1px solid ${TEAL}28`, borderRadius: 8, padding: '14px 18px' }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: TEAL, margin: '0 0 6px', lineHeight: 1.4 }}>
            Everything above is connected to everything else.
          </p>
          <p style={{ fontSize: 9.5, color: MUTED, margin: 0, lineHeight: 1.65 }}>
            Create a dish and its allergens, costs, HACCP controls, training notes, and FOH description are generated simultaneously. Change a supplier price and every affected dish recoasts. Change a recipe and the allergen matrix, nutrition, and training content all update. This is what a truly connected platform means in practice — and it's what makes HospitalitySupport.uk fundamentally different from every other tool in the market.
          </p>
        </div>
      </div>
      <RunningFooter n={4} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 5 — WHO IT'S FOR
══════════════════════════════════════════════════════════════════════════ */
function AudiencePage() {
  return (
    <DocPage>
      <RunningHeader />
      <div style={{ flex: 1, padding: '36px 50px 28px' }}>
        <SectionLabel text="Who It's For" />
        <H2>Built for operators who are done carrying everything themselves.</H2>
        <Body>
          HospitalitySupport.uk is built for the reality of running a hospitality business — not for the ideal version of it. It is for operators who are managing with less than they need, who know things are slipping through the gaps, and who want to fix the foundations without adding complexity.
        </Body>

        <Divider />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px', marginBottom: 22 }}>
          <div>
            <H3>Independent Restaurants & Pubs</H3>
            <Body size={9.5}>
              Owner-operators and working chefs who are responsible for everything but have capacity for none of it properly. The platform removes the administrative burden so that time goes back to the food and the guest.
            </Body>
            <BulletList size={9.5 as never} items={[
              'Full menu management without a food tech team',
              'Live GP without a finance department',
              'Compliance without a dedicated compliance manager',
              'Training that runs without an HR function',
            ]} />
          </div>
          <div>
            <H3>Groups & Multi-Site Operators</H3>
            <Body size={9.5}>
              Operations directors and group managers who need visibility and consistency across sites without building a head office team to create it. Consistent standards, live GP, and compliance across every site — visible in one place.
            </Body>
            <BulletList size={9.5 as never} items={[
              'Group-level GP reporting across all sites',
              'Consistent menu and allergen standards everywhere',
              'Site-level compliance visible from the centre',
              'Uniform training without centralised delivery',
            ]} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px', marginBottom: 22 }}>
          <div>
            <H3>Dark Kitchens & Production Kitchens</H3>
            <Body size={9.5}>
              High-throughput operations where consistency, speed, and documentation are critical. Multiple brands, high staff turnover, and no front-of-house to absorb errors. The platform handles the complexity that scale creates.
            </Body>
            <BulletList size={9.5 as never} items={[
              'Multiple menu brands managed from one platform',
              'Training that keeps pace with high churn',
              'Compliance that scales without growing headcount',
              'Allergen accuracy across every brand and shift',
            ]} />
          </div>
          <div>
            <H3>Contract Caterers & Managed Services</H3>
            <Body size={9.5}>
              Operators managing hospitality for third-party clients who need to demonstrate standards, evidence compliance, and protect margin across a portfolio. The platform makes it possible to run tightly with lean teams.
            </Body>
            <BulletList size={9.5 as never} items={[
              'Client-ready compliance reporting',
              'Consistent standards across managed contracts',
              'Live cost visibility per site or contract',
              'Training evidence available on demand',
            ]} />
          </div>
        </div>

        <Divider />

        <H3>This is specifically for you if:</H3>
        <BulletList items={[
          'You are managing GP on spreadsheets and catching problems too late',
          'You have high staff turnover and need training that doesn\'t rely on one or two key people',
          'You are spending more time managing compliance than managing your business',
          'You are running multiple sites and losing visibility as you scale',
          'You have one experienced person holding everything together — and you know the risk that creates',
          'You are paying for software that your team doesn\'t actually use fully',
          'You want a complete operations capability without the overhead of building one',
        ]} />

        <PullQuote text="The question isn't whether you can afford it. It's whether you can afford what's happening without it." />
      </div>
      <RunningFooter n={5} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 6 — PRICING
══════════════════════════════════════════════════════════════════════════ */
function PricingPage() {
  return (
    <DocPage>
      <RunningHeader />
      <div style={{ flex: 1, padding: '36px 50px 28px' }}>
        <SectionLabel text="Pricing" />
        <H2>Priced per kitchen. Not per user. Not per seat.</H2>
        <Body>
          Every person who works in or manages your operation has full access. There are no user limits, no module fees, and no professional services charges. The price you see is the price you pay — and it includes everything.
        </Body>

        <Divider />

        {/* Pricing tiers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 26 }}>
          {[
            {
              tier: 'Standard Venue',
              price: '£100',
              period: '/month',
              daily: '£3.30 per day',
              who: 'For pubs, restaurants, cafés, and independent hospitality businesses.',
              includes: [
                'Full platform access for every member of your team',
                'Menu development, recipe spec, and dish management',
                'Live GP calculation and automatic recosting on supplier price changes',
                'Complete allergen management — 14 allergens, Natasha\'s Law compliant',
                'HACCP controls generated per dish, including CCPs and corrective actions',
                'Bespoke training content built from your own menus and procedures',
                'Level 2 food hygiene included',
                'Compliance tracking, digital sign-off, and inspection-ready reporting',
                'Ordering, purchase orders, and delivery checking',
                'Front-of-house knowledge base, always live',
              ],
              hi: true,
            },
            {
              tier: 'Dark Kitchen / Production Kitchen',
              price: '£250',
              period: '/month',
              daily: '',
              who: 'For dark kitchens, production kitchens, and high-churn, multi-brand operations.',
              includes: [
                'Everything in Standard Venue',
                'Multiple menu brands managed from a single kitchen',
                'Higher training throughput for high staff turnover environments',
                'Enhanced compliance throughput for multi-shift operations',
                'Priority support',
              ],
              hi: false,
            },
            {
              tier: 'Multi-Site & Group',
              price: '£100',
              period: '/site/month',
              daily: 'Same price, every site, always',
              who: 'For operators with two or more sites — pub groups, restaurant groups, managed estates.',
              includes: [
                'Full Standard Venue capability at every site',
                'Group-level dashboard — GP, compliance, and spend across all sites',
                'Centralised menu management with site-level customisation',
                'Group compliance reporting for head office or client use',
                'Shared supplier relationships across the group',
              ],
              hi: false,
            },
          ].map((p, i) => (
            <div key={i} style={{
              border: `1px solid ${p.hi ? `${TEAL}45` : RULE}`,
              borderRadius: 10, overflow: 'hidden',
              background: p.hi ? `${TEAL}06` : WHITE,
            }}>
              <div style={{
                padding: '14px 20px',
                borderBottom: `1px solid ${p.hi ? `${TEAL}25` : RULE}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                background: p.hi ? `${TEAL}10` : CARD,
              }}>
                <div>
                  <p style={{ fontSize: 9, fontWeight: 800, color: TEAL,
                    textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 3px' }}>
                    {p.tier}
                  </p>
                  <p style={{ fontSize: 9.5, color: MUTED, margin: 0 }}>{p.who}</p>
                </div>
                <div style={{ textAlign: 'right' as const, flexShrink: 0, marginLeft: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, justifyContent: 'flex-end' }}>
                    <span style={{ color: INK, fontSize: 26, fontWeight: 900, lineHeight: 1 }}>{p.price}</span>
                    <span style={{ color: MUTED, fontSize: 10 }}>{p.period}</span>
                  </div>
                  {p.daily && <p style={{ color: TEAL, fontSize: 8.5, fontWeight: 700, margin: '3px 0 0' }}>{p.daily}</p>}
                </div>
              </div>
              <div style={{ padding: '12px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 16px' }}>
                  {p.includes.map((inc, ii) => (
                    <div key={ii} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', padding: '2px 0' }}>
                      <span style={{ color: TEAL, fontSize: 9, flexShrink: 0 }}>✓</span>
                      <span style={{ color: '#374151', fontSize: 9, lineHeight: 1.5 }}>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: CARD, border: `1px solid ${RULE}`, borderRadius: 8,
          padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ color: MUTED, fontSize: 9.5, margin: 0, lineHeight: 1.5 }}>
            Annual billing &nbsp;·&nbsp; No setup fees &nbsp;·&nbsp; No per-user fees &nbsp;·&nbsp; No hidden costs &nbsp;·&nbsp; No implementation charges
          </p>
          <p style={{ color: TEAL, fontSize: 9.5, fontWeight: 700, margin: 0, flexShrink: 0, marginLeft: 20 }}>
            Cancel any time
          </p>
        </div>
      </div>
      <RunningFooter n={6} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 7 — WHY US / COMPARISON
══════════════════════════════════════════════════════════════════════════ */
function ComparisonPage() {
  return (
    <DocPage>
      <RunningHeader />
      <div style={{ flex: 1, padding: '36px 50px 28px' }}>
        <SectionLabel text="Why HospitalitySupport.uk" />
        <H2>Simple, intuitive, and built around how kitchens actually operate.</H2>
        <Body>
          The hospitality technology market is crowded with platforms that promise to solve operational problems. Most of them were built by developers who studied hospitality from the outside. They require implementation projects, training programmes, and dedicated administrators to make them work. The result is software that sits unused, or used partially, or used badly — and that doesn't actually fix the problems it was bought to solve.
        </Body>
        <Body>
          HospitalitySupport.uk was built by people who have run kitchens, managed sites, and dealt with the realities of service under pressure. The design principle is simple: if a chef has to stop and think about how to use it, it's wrong. Everything should be as natural as describing what you need.
        </Body>

        <Divider />

        {/* Comparison table */}
        <div style={{ border: `1px solid ${RULE}`, borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '40% 30% 30%', background: INK }}>
            <div style={{ padding: '8px 14px', color: FAINT, fontSize: 8.5, fontWeight: 700,
              textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Capability</div>
            <div style={{ padding: '8px 14px', color: TEAL_LT, fontSize: 8.5, fontWeight: 800,
              borderLeft: '1px solid rgba(255,255,255,0.07)' }}>HospitalitySupport.uk</div>
            <div style={{ padding: '8px 14px', color: '#475569', fontSize: 8.5, fontWeight: 700,
              borderLeft: '1px solid rgba(255,255,255,0.07)' }}>Traditional platforms</div>
          </div>
          {[
            ['Time to go live',                 'Under 5 minutes',               '4–8 week implementation'],
            ['Dish concept to full spec',        'Under 3 minutes',               '2–3 hours of manual work'],
            ['Allergen management',              'Auto-generated, always live',    'Manual spreadsheets, updated infrequently'],
            ['HACCP documentation',              'Built per dish, automatically',  'Generic templates copied and pasted'],
            ['Ordering & purchase orders',       'Auto-built from live menu',      'Manual shopping lists'],
            ['Delivery checking',                'Automated scan vs PO matching',  'Paper-based, no records'],
            ['GP tracking',                      'Live — updates on every price change', 'Monthly recalculation, if at all'],
            ['Supplier price changes',           'Suppliers update their own portal', 'You manually re-enter prices'],
            ['Training content',                 'Generated from your actual ops', 'Generic industry content'],
            ['Compliance evidence',              'Created automatically as work happens', 'Retrospective, often incomplete'],
            ['Interface',                        'Plain English — no training needed', 'Complex UI requiring onboarding'],
            ['Built by',                         'Hospitality operators',          'Technology developers'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '40% 30% 30%',
              background: i % 2 === 0 ? WHITE : CARD,
              borderTop: `1px solid ${RULE}`,
            }}>
              <div style={{ padding: '6px 14px', fontSize: 9.5, color: INK, fontWeight: 600 }}>{row[0]}</div>
              <div style={{ padding: '6px 14px', fontSize: 9.5, color: TEAL, fontWeight: 600,
                borderLeft: `1px solid ${RULE}` }}>{row[1]}</div>
              <div style={{ padding: '6px 14px', fontSize: 9.5, color: FAINT,
                borderLeft: `1px solid ${RULE}` }}>{row[2]}</div>
            </div>
          ))}
        </div>

        <Divider />

        <H3>What operators who use it say</H3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
          {[
            {
              quote: "I've been in kitchens for 18 years. This is the first piece of technology that actually thinks like a chef.",
              attr: 'Head Chef, independent restaurant, London',
            },
            {
              quote: "We went live in 20 minutes. Within the hour we had allergen matrices for every dish on the menu. I kept waiting for the catch.",
              attr: 'Operations Manager, pub group, Midlands',
            },
            {
              quote: "Our last EHO visit was the smoothest we've ever had. Every record was there, timestamped, signed. Nothing to scramble for.",
              attr: 'Owner, bistro group, South West',
            },
            {
              quote: "I stopped worrying about GP the week we signed up. The dashboard just tells me when something needs attention. That's all I wanted.",
              attr: 'General Manager, 3-site operator',
            },
          ].map((q, i) => (
            <div key={i} style={{
              padding: '12px 14px',
              background: CARD, border: `1px solid ${RULE}`, borderRadius: 8,
            }}>
              <p style={{ fontSize: 9.5, lineHeight: 1.6, color: SLATE,
                fontStyle: 'italic', margin: '0 0 8px' }}>"{q.quote}"</p>
              <p style={{ fontSize: 8, color: FAINT, fontWeight: 600, margin: 0 }}>{q.attr}</p>
            </div>
          ))}
        </div>
      </div>
      <RunningFooter n={7} />
    </DocPage>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE 8 — CLOSE
══════════════════════════════════════════════════════════════════════════ */
function ClosePage() {
  return (
    <DocPage dark>
      <div style={{ height: 4, background: TEAL, flexShrink: 0 }} />
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '50px 50px 42px',
      }}>

        {/* Top — the close */}
        <div>
          <p style={{ color: TEAL_LT, fontSize: 9, fontWeight: 800, letterSpacing: '0.15em',
            textTransform: 'uppercase' as const, margin: '0 0 18px' }}>
            The Bottom Line
          </p>
          <h2 style={{
            color: WHITE, fontSize: 34, fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.03em', margin: '0 0 24px', maxWidth: 440,
          }}>
            It doesn't change what hospitality is.
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.75, margin: '0 0 20px', maxWidth: 430 }}>
            It changes what you personally have to carry.
          </p>
          <p style={{ color: '#64748b', fontSize: 10.5, lineHeight: 1.75, maxWidth: 440, margin: '0 0 36px' }}>
            Menu development. GP control. Allergen management. Compliance. Training. Front-of-house support. Supplier pricing. Ordering. Deliveries. All of it — working together, always live, built around your actual operation.
          </p>
          <p style={{ color: '#475569', fontSize: 10.5, lineHeight: 1.75, maxWidth: 420, margin: '0 0 36px' }}>
            From £3.30 a day. Per kitchen, not per user. No setup fees. No implementation project. No training required. Live in under 5 minutes.
          </p>
          <p style={{ color: '#334155', fontSize: 10.5, lineHeight: 1.75, maxWidth: 400, margin: 0 }}>
            No payroll. No politics. No sick days. No knowledge walking out the door.
          </p>
        </div>

        {/* Middle — what's included */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '24px 0',
          margin: '36px 0',
        }}>
          {[
            { label: 'Menu Development', col: '#0d9488' },
            { label: 'Cost & GP',        col: '#0284c7' },
            { label: 'Ordering & POs',   col: '#ea580c' },
            { label: 'Supplier Pricing', col: '#7c3aed' },
            { label: 'Allergens',        col: '#dc2626' },
            { label: 'HACCP & Safety',   col: '#d97706' },
            { label: 'Training',         col: '#059669' },
            { label: 'Front of House',   col: '#0891b2' },
          ].map(m => (
            <div key={m.label} style={{
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
              <div style={{ width: 3, height: 16, background: m.col, borderRadius: 2, flexShrink: 0 }} />
              <span style={{ color: '#475569', fontSize: 9, fontWeight: 600, lineHeight: 1.3 }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div>
          <p style={{ color: TEAL_LT, fontSize: 12, fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
            Book a 30-minute demonstration
          </p>
          <p style={{ color: '#475569', fontSize: 10, lineHeight: 1.65, margin: '0 0 24px', maxWidth: 400 }}>
            We'll show your actual dishes recosting live against your supplier prices. No slides. No generic demo. Your data, your operation, in real time.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              background: TEAL, color: WHITE, fontWeight: 900,
              fontSize: 11, padding: '11px 22px', borderRadius: 8,
              letterSpacing: '-0.01em',
            }}>
              hospitalitysupport.uk
            </div>
            <span style={{ color: '#334155', fontSize: 9, lineHeight: 1.5 }}>
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
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">Brochure — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">8-page printed brochure · Print or save as PDF</p>
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
