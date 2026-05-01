export default function Print5Page() {
  return (
    <div className="min-h-full bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">5-Pager — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">Full sales brochure — 5 A4 pages</p>
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
            button { display: none !important; }
            .no-print { display: none !important; }
          }
          @page { size: A4 portrait; margin: 0; }
        `}</style>

        <div className="space-y-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

          {/* PAGE 1 — COVER */}
          <div
            className="print-page bg-white shadow-2xl rounded-2xl overflow-hidden"
            style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', position: 'relative' }}
          >
            <div style={{ background: '#0f1623', minHeight: '100%', padding: '0 0 40px', display: 'flex', flexDirection: 'column' }}>
              {/* Decorative blur */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 320, height: 320, background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Top bar */}
              <div style={{ padding: '28px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontWeight: 900, fontSize: 15 }}>HospitalitySupport<span style={{ color: '#2dd4bf' }}>.uk</span></span>
                  <span style={{ background: '#0d9488', color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 999 }}>CONFIDENTIAL SALES DOCUMENT</span>
                </div>
              </div>

              {/* Hero content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 40px 40px' }}>
                <div style={{ maxWidth: 480 }}>
                  <div style={{ color: '#0d9488', fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 18 }}>
                    The Operating System for Modern Hospitality
                  </div>
                  <h1 style={{ color: '#fff', fontSize: 44, fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.025em' }}>
                    Built by operators,<br />
                    for operators.<br />
                    <span style={{ color: '#2dd4bf' }}>Live in 5 minutes.</span>
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0, maxWidth: 420 }}>
                    We built this because nothing else worked. Every system we tried was built by software people who had never sweated through a Friday night service or chased a supplier for an updated price list.
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginTop: 14 }}>
                    So we built our own. From inside the kitchen. From inside the supply chain. From inside the compliance nightmare.
                  </p>
                  <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7, marginTop: 14, fontWeight: 600 }}>
                    One platform that handles recipes, ordering, supplier relationships, staff training, compliance, waste tracking, and analytics — with a Brain that genuinely understands food because it was trained by people who cook it.
                  </p>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 48 }}>
                  {[
                    { val: '5 min', label: 'From sign-up to operational' },
                    { val: '134', label: 'Backend functions' },
                    { val: '2,000+', label: 'Products per supplier' },
                    { val: '£3.30', label: 'Per day — any size venue' },
                  ].map((s) => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
                      <div style={{ color: '#2dd4bf', fontSize: 22, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                      <div style={{ color: '#64748b', fontSize: 10, marginTop: 5, lineHeight: 1.4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '0 40px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#334155', fontSize: 11 }}>Page 1 of 5</span>
                  <span style={{ color: '#334155', fontSize: 11 }}>hospitality<span style={{ color: '#0d9488' }}>support.uk</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 — THE BRAIN */}
          <div
            className="print-page bg-white shadow-2xl rounded-2xl overflow-hidden"
            style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <PageHeader number={2} title="The Brain" subtitle="Built over months by operators who live this" accentLight />

              <div style={{ flex: 1, padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  {
                    title: 'It Understands Food, Not Just Data',
                    body: 'Search for "medium diced onion 2cm cube" and it knows that is different from "whole peeled onion." It understands culinary preparation, pack sizes, portion relevance, and supplier context. This is not keyword matching — this is months of operator knowledge encoded into an intelligent system.',
                  },
                  {
                    title: 'It Learns Your Operation',
                    body: 'The Brain remembers what you chose last time and why. It adapts to your preferences: your preferred suppliers, your portion sizes, your cost thresholds. Every interaction makes it sharper for your specific business.',
                  },
                  {
                    title: 'It Self-Corrects',
                    body: 'Built-in quality validation catches errors before they reach your kitchen. Confidence scoring tells you when data is incomplete rather than guessing. Continuous self-improvement through a proprietary training system refined over months.',
                  },
                  {
                    title: 'It Generates, Not Just Retrieves',
                    body: 'Production sheets with allergen matrices, nutrition data, and per-portion costing — generated automatically. Menu concepts with flavour profiles, seasonal awareness, and pricing suggestions. Recipe extraction from any document format: PDF, Word, image, handwritten scan.',
                  },
                  {
                    title: 'It Protects You',
                    body: 'Legal risk classification flags compliance-critical tasks. Allergen confidence scoring highlights gaps before they become incidents. Training content validation ensures your programmes meet UK legislative requirements.',
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: i % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                    <div style={{ color: '#0d9488', fontWeight: 900, fontSize: 18, lineHeight: 1, flexShrink: 0, paddingTop: 1 }}>→</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13, color: '#0f172a', marginBottom: 5, lineHeight: 1.3 }}>{item.title}</div>
                      <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.6 }}>{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>

              <PageFooter number={2} />
            </div>
          </div>

          {/* PAGE 3 — SPEED TO VALUE */}
          <div
            className="print-page bg-white shadow-2xl rounded-2xl overflow-hidden"
            style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <PageHeader number={3} title="Speed to Value" subtitle="Live in 5 minutes. Legacy data refreshed in minutes." />

              <div style={{ flex: 1, padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    {
                      heading: 'Onboarding That Respects Your Time',
                      points: [
                        'Sign up and be inside your dashboard in under 5 minutes',
                        'No implementation consultants. No 6-week projects.',
                        'Designed for hospitality people who are busy, not IT departments',
                      ],
                    },
                    {
                      heading: 'Legacy Data Ingestion',
                      points: [
                        'Upload existing recipe documents (any format) — structured and costed within minutes',
                        'Drop supplier price lists — parsed, categorised, and activated within minutes',
                        'Your historical data does not die in a migration — it lives immediately',
                      ],
                    },
                    {
                      heading: 'Supplier Connection',
                      points: [
                        'Invite suppliers with one click — they get their own portal instantly',
                        'SFTP automation: suppliers drop files, data populates automatically overnight',
                        'Invoice scanning: upload a PDF, line items extracted without manual entry',
                      ],
                    },
                    {
                      heading: 'No Training Required',
                      points: [
                        'PIN-based staff login — no passwords in a busy kitchen',
                        'Voice control for hands-free operation during service',
                        'Mobile and tablet optimised for real kitchen environments',
                      ],
                    },
                  ].map((block, i) => (
                    <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: '16px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, fontSize: 12.5, color: '#0f172a', marginBottom: 10, lineHeight: 1.3 }}>{block.heading}</div>
                      {block.points.map((p, j) => (
                        <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                          <span style={{ color: '#0d9488', fontSize: 12, flexShrink: 0, fontWeight: 900, lineHeight: 1.4 }}>✓</span>
                          <span style={{ fontSize: 11, color: '#475569', lineHeight: 1.5 }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div style={{ background: '#0f1623', borderRadius: 14, padding: '20px 24px' }}>
                  <div style={{ color: '#64748b', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Key metrics</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {[
                      { val: '5 min', label: 'Sign-up to live' },
                      { val: '24', label: 'Product categories auto-detected' },
                      { val: '8+', label: 'Role types with screen-level permissions' },
                      { val: '14', label: 'Compliance form types built-in' },
                    ].map((s) => (
                      <div key={s.label} style={{ textAlign: 'center' }}>
                        <div style={{ color: '#2dd4bf', fontSize: 20, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                        <div style={{ color: '#475569', fontSize: 10, marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <PageFooter number={3} />
            </div>
          </div>

          {/* PAGE 4 — SUPPLIER ECOSYSTEM */}
          <div
            className="print-page bg-white shadow-2xl rounded-2xl overflow-hidden"
            style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <PageHeader number={4} title="The Supplier Ecosystem" subtitle="Suppliers are partners, not passengers" accentLight />

              <div style={{ flex: 1, padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  {
                    title: 'Supplier Self-Service Portal',
                    body: 'Suppliers get their own full dashboard: products, pricing, promotions, compliance, waste, team management, purchase orders, and analytics. They maintain their own data — you benefit from always-current information. Real-time subscription model with instant approval workflows.',
                  },
                  {
                    title: 'Two-Tier Supply Chain Visibility',
                    body: 'Suppliers register their own upstream vendors — the people they buy from. Track vendor price changes with percentages and reasons. Lead times, payment terms, and minimum orders all visible. When a supplier\'s costs rise, you see the ripple effect before it hits your invoice.',
                  },
                  {
                    title: 'Promotional Campaigns & Special Pricing',
                    body: 'Suppliers create targeted promotions by category, product, and customer segment. Bulk discount bands with tiered pricing. Time-limited campaigns with automatic activation and expiry. Businesses see live promotions directly in their ordering interface.',
                  },
                  {
                    title: 'B2B Messaging',
                    body: 'Direct messaging threads between businesses and suppliers. No more lost emails, missed WhatsApp messages, or voicemails nobody returns. Document sharing within conversations. Complete communication audit trail.',
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: '16px', background: i % 2 === 0 ? '#f8fafc' : '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <div style={{ background: '#0d9488', color: '#fff', fontWeight: 900, fontSize: 12, width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13, color: '#0f172a', marginBottom: 5 }}>{item.title}</div>
                      <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.6 }}>{item.body}</div>
                    </div>
                  </div>
                ))}

                {/* Pull quote */}
                <div style={{ background: '#0f1623', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid #0d9488', marginTop: 4 }}>
                  <p style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                    "Sub-second price propagation across all linked recipes. The moment a supplier updates their price, your entire menu is recosted. Before you even open your inbox."
                  </p>
                </div>
              </div>

              <PageFooter number={4} />
            </div>
          </div>

          {/* PAGE 5 — COMPLIANCE, MULTI-SITE & CLOSE */}
          <div
            className="print-page bg-white shadow-2xl rounded-2xl overflow-hidden"
            style={{ width: '210mm', minHeight: '297mm', margin: '0 auto' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <PageHeader number={5} title="Compliance, Multi-Site & Analytics" subtitle="Audit-ready every day. Every location. Without thinking about it." />

              <div style={{ flex: 1, padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  {[
                    {
                      heading: 'Compliance That Runs Itself',
                      items: [
                        'Allergen matrices auto-generated with confidence scoring',
                        'Pre-service briefings with digital signatures',
                        'Task evidence: photos, forms, timestamps',
                        'One-click FSA & HSE inspection reports',
                        'Natasha\'s Law handled automatically',
                      ],
                    },
                    {
                      heading: 'Multi-Site Command Centre',
                      items: [
                        'Regional dashboards with site comparison',
                        'Centralised buying with local control',
                        'See compliance, waste, and training across all sites',
                        'Group admin with site-level permissions',
                        'Consolidated spend, waste, and task analytics',
                      ],
                    },
                    {
                      heading: 'Financial Intelligence',
                      items: [
                        'Live recipe costing on every price change',
                        'Spend analytics by supplier, category, location',
                        'Waste cost tracking with root cause analysis',
                        'Margin analysis at recipe, menu, and portion level',
                        'Price volatility alerts before it is too late',
                      ],
                    },
                  ].map((col, i) => (
                    <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: '16px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontWeight: 800, fontSize: 12, color: '#0f172a', marginBottom: 10, lineHeight: 1.3 }}>{col.heading}</div>
                      {col.items.map((item, j) => (
                        <div key={j} style={{ display: 'flex', gap: 7, marginBottom: 7 }}>
                          <span style={{ color: '#0d9488', fontWeight: 900, fontSize: 11, flexShrink: 0, lineHeight: 1.4 }}>→</span>
                          <span style={{ fontSize: 10.5, color: '#475569', lineHeight: 1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Why we win table */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Why We Win</div>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#0f1623' }}>
                      <div style={{ padding: '8px 14px', color: '#2dd4bf', fontSize: 10.5, fontWeight: 800 }}>What We Do</div>
                      <div style={{ padding: '8px 14px', color: '#64748b', fontSize: 10.5, fontWeight: 800, borderLeft: '1px solid rgba(255,255,255,0.08)' }}>What Everyone Else Does</div>
                    </div>
                    {[
                      ['Live in 5 minutes, legacy data ingested in minutes', '6-week implementation with consultants'],
                      ['The Brain understands culinary context', 'Basic keyword search'],
                      ['Suppliers manage their own portal', 'You manually update supplier info'],
                      ['Live recipe costing on every price change', 'Static costing until you recalculate'],
                      ['Allergen matrices auto-generated', 'You fill in allergen spreadsheets by hand'],
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <div style={{ padding: '8px 14px', fontSize: 10.5, color: '#0f172a', fontWeight: 600, borderTop: '1px solid #e2e8f0' }}>{row[0]}</div>
                        <div style={{ padding: '8px 14px', fontSize: 10.5, color: '#94a3b8', borderLeft: '1px solid #e2e8f0', borderTop: '1px solid #e2e8f0' }}>{row[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ background: '#0d9488', borderRadius: 14, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 900, fontSize: 17, lineHeight: 1.2 }}>See It In Action</div>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>
                      A 30-minute demo. Be live by end of week.<br />
                      No jargon. No consultants. Built by operators.
                    </div>
                  </div>
                  <div style={{ background: '#fff', color: '#0d9488', fontWeight: 900, fontSize: 13, padding: '12px 22px', borderRadius: 10 }}>
                    Request Your Demo
                  </div>
                </div>
              </div>

              <PageFooter number={5} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function PageHeader({ number, title, subtitle, accentLight }: { number: number; title: string; subtitle: string; accentLight?: boolean }) {
  return (
    <div style={{ background: accentLight ? '#f0fdfa' : '#0f1623', padding: '22px 40px', borderBottom: `2px solid ${accentLight ? '#0d9488' : 'rgba(255,255,255,0.06)'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: accentLight ? '#0d9488' : '#2dd4bf', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 5 }}>
            Page {number} of 5 · HospitalitySupport.uk
          </div>
          <h2 style={{ color: accentLight ? '#0f172a' : '#fff', fontSize: 22, fontWeight: 900, margin: 0, letterSpacing: '-0.015em', lineHeight: 1.2 }}>{title}</h2>
          <p style={{ color: accentLight ? '#475569' : '#64748b', fontSize: 12, margin: '4px 0 0', lineHeight: 1.4 }}>{subtitle}</p>
        </div>
        <span style={{ background: '#0d9488', color: '#fff', fontSize: 9, fontWeight: 800, padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
          The Operating System for Hospitality
        </span>
      </div>
    </div>
  );
}

function PageFooter({ number }: { number: number }) {
  return (
    <div style={{ padding: '12px 40px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#94a3b8', fontSize: 10 }}>Page {number} of 5</span>
      <span style={{ color: '#94a3b8', fontSize: 10 }}>hospitality<span style={{ color: '#0d9488' }}>support.uk</span> · Built by operators, for operators</span>
    </div>
  );
}
