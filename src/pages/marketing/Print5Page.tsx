const TEAL = '#0d9488';
const DARK = '#080f1a';
const MID = '#0f1623';
const SLATE = '#1a2535';

function PageShell({ children, number }: { children: React.ReactNode; number: number }) {
  return (
    <div
      className="print-page bg-white shadow-2xl overflow-hidden"
      style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}
    >
      {/* Top nav strip */}
      <div style={{ background: DARK, padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 13 }}>
          HospitalitySupport<span style={{ color: '#2dd4bf' }}>.uk</span>
        </span>
        <span style={{ color: '#334155', fontSize: 9 }}>Page {number} of 5</span>
      </div>
      {children}
      {/* Footer */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '8px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#94a3b8', fontSize: 8.5 }}>Built by operators, for operators · No 6-week onboarding · No consultants</span>
        <span style={{ color: TEAL, fontSize: 8.5, fontWeight: 700 }}>hospitality<span style={{ color: '#475569' }}>support.uk</span></span>
      </div>
    </div>
  );
}

function SectionBadge({ text, light }: { text: string; light?: boolean }) {
  return (
    <div style={{
      display: 'inline-block',
      background: light ? 'rgba(13,148,136,0.1)' : 'rgba(13,148,136,0.2)',
      border: `1px solid rgba(13,148,136,0.3)`,
      color: light ? TEAL : '#2dd4bf',
      fontSize: 8.5,
      fontWeight: 800,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      borderRadius: 99,
      marginBottom: 10,
    }}>
      {text}
    </div>
  );
}

function Callout({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '9px 11px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 6 }}>
      <span style={{ fontSize: 13, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontWeight: 800, fontSize: 10.5, color: '#0f172a', marginBottom: 2, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 9.5, color: '#64748b', lineHeight: 1.5 }}>{body}</div>
      </div>
    </div>
  );
}

function MockWindow({ title, children, live }: { title: string; children: React.ReactNode; live?: boolean }) {
  return (
    <div style={{ background: SLATE, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
      <div style={{ background: '#0d1a26', padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(239,68,68,0.5)', display: 'inline-block' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(245,158,11,0.5)', display: 'inline-block' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(34,197,94,0.5)', display: 'inline-block' }} />
        </div>
        <span style={{ color: '#475569', fontSize: 8.5, fontFamily: 'monospace' }}>{title}</span>
        {live && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2dd4bf', display: 'inline-block' }} />
            <span style={{ color: '#2dd4bf', fontSize: 7.5, fontWeight: 700 }}>LIVE</span>
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default function Print5Page() {
  return (
    <div className="min-h-full bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">5-Pager — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">Full sales brochure — 5 A4 pages</p>
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

          {/* ─────────────── PAGE 1 — COVER ─────────────── */}
          <PageShell number={1}>
            <div style={{ background: MID, flex: 1, padding: '32px 32px 24px', position: 'relative', overflow: 'hidden' }}>
              {/* bg glow */}
              <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <SectionBadge text="The Operating System for Modern Hospitality" />

              <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 10px', maxWidth: 380 }}>
                Stop doing<br />the admin.<br />
                <span style={{ color: '#2dd4bf' }}>Start running<br />the kitchen.</span>
              </h1>

              <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6, maxWidth: 380, margin: '0 0 24px' }}>
                Connect your existing suppliers once. Every price movement tracked. Every dish recosted automatically. Your GP always live — without a spreadsheet, without a consultant, without 6 weeks of setup.
              </p>

              {/* Mock hero dashboard */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {/* Recipe costing mock */}
                <MockWindow title="live recipe costing" live>
                  {[
                    { name: 'Pan-Seared Salmon', gp: '71%', cost: '£4.20', up: true },
                    { name: 'Beef Burger & Fries', gp: '68%', cost: '£3.85', up: false },
                    { name: 'Mushroom Risotto', gp: '74%', cost: '£2.95', up: false },
                    { name: 'Caesar Salad', gp: '76%', cost: '£2.40', up: false },
                  ].map((d, i) => (
                    <div key={i} style={{ padding: '6px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#cbd5e1', fontSize: 9, fontWeight: 600 }}>{d.name}</span>
                      <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ color: '#475569', fontSize: 8.5 }}>{d.cost}</span>
                        <span style={{ color: '#2dd4bf', fontSize: 10, fontWeight: 800 }}>{d.gp}</span>
                        {d.up && <span style={{ color: '#f87171', fontSize: 9 }}>↑</span>}
                      </span>
                    </div>
                  ))}
                  <div style={{ padding: '5px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#334155', fontSize: 7.5 }}>4 suppliers active</span>
                    <span style={{ color: '#2dd4bf', fontSize: 7.5 }}>Synced: just now</span>
                  </div>
                </MockWindow>

                {/* Compliance mock */}
                <MockWindow title="compliance — today">
                  {[
                    { label: 'Pre-service allergen briefing', done: true, sig: 'J. Smith' },
                    { label: 'Fridge temperature log', done: true, sig: 'Auto' },
                    { label: 'Delivery reconciliation', done: true, sig: 'M. Jones' },
                    { label: 'Evening HACCP check', done: false, sig: '' },
                  ].map((t, i) => (
                    <div key={i} style={{ padding: '6px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 12, height: 12, borderRadius: 3, background: t.done ? TEAL : 'rgba(255,255,255,0.05)', border: t.done ? 'none' : '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 8, color: '#fff', fontWeight: 900 }}>
                        {t.done ? '✓' : ''}
                      </span>
                      <span style={{ color: t.done ? '#475569' : '#e2e8f0', fontSize: 9, flex: 1, textDecoration: t.done ? 'line-through' : 'none' }}>{t.label}</span>
                      {t.sig && <span style={{ color: '#334155', fontSize: 7.5 }}>{t.sig}</span>}
                    </div>
                  ))}
                  <div style={{ padding: '5px 12px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: '#0d9488', fontSize: 7.5, fontWeight: 700 }}>3/4 complete · 1 outstanding</span>
                  </div>
                </MockWindow>
              </div>

              {/* Stat strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {[
                  { val: '5 min', label: 'To go live' },
                  { val: '2,000+', label: 'Products/supplier' },
                  { val: '14', label: 'Allergens' },
                  { val: '134', label: 'Functions' },
                  { val: '0', label: 'Spreadsheets' },
                ].map((s) => (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 8px', textAlign: 'center' }}>
                    <div style={{ color: '#2dd4bf', fontSize: 18, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: '#475569', fontSize: 8.5, marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </PageShell>

          {/* ─────────────── PAGE 2 — LIVE PRICING & THE BRAIN ─────────────── */}
          <PageShell number={2}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: 0 }}>
              {/* Left — UI mockup */}
              <div style={{ background: '#f1f5f9', padding: '20px 16px 20px 32px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <SectionBadge text="Live Price Intelligence" light />
                <h2 style={{ color: '#0f172a', fontSize: 19, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                  Your suppliers change prices.<br />
                  <span style={{ color: TEAL }}>Your dishes recost themselves.</span>
                </h2>

                {/* Full recipe costing mock */}
                <MockWindow title="recipe costing — all dishes" live>
                  <div style={{ padding: '7px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8 }}>
                    {['Dish', 'Ingredient cost', 'Sell price', 'GP'].map(h => (
                      <span key={h} style={{ color: '#334155', fontSize: 7.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                    ))}
                  </div>
                  {[
                    { name: 'Pan-Seared Salmon', cost: '£4.20', sell: '£14.50', gp: '71%', alert: true },
                    { name: 'Beef Burger & Fries', cost: '£3.85', sell: '£12.00', gp: '68%', alert: false },
                    { name: 'Mushroom Risotto', cost: '£2.95', sell: '£11.50', gp: '74%', alert: false },
                    { name: 'Caesar Salad', cost: '£2.40', sell: '£10.00', gp: '76%', alert: false },
                    { name: 'Fish & Chips', cost: '£5.10', sell: '£15.50', gp: '67%', alert: true },
                    { name: 'Chicken Supreme', cost: '£3.60', sell: '£13.00', gp: '72%', alert: false },
                  ].map((d, i) => (
                    <div key={i} style={{ padding: '6px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', background: d.alert ? 'rgba(248,113,113,0.05)' : 'transparent', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, alignItems: 'center' }}>
                      <span style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {d.alert && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f87171', display: 'inline-block', flexShrink: 0 }} />}
                        {d.name}
                      </span>
                      <span style={{ color: '#64748b', fontSize: 8.5, fontFamily: 'monospace', textAlign: 'right' }}>{d.cost}</span>
                      <span style={{ color: '#94a3b8', fontSize: 8.5, fontFamily: 'monospace', textAlign: 'right' }}>{d.sell}</span>
                      <span style={{ color: parseInt(d.gp) >= 70 ? '#2dd4bf' : '#f59e0b', fontSize: 10, fontWeight: 800, textAlign: 'right' }}>{d.gp}</span>
                    </div>
                  ))}
                  <div style={{ padding: '7px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#f87171', fontSize: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f87171', display: 'inline-block' }} />
                      2 dishes flagged — salmon price +8p overnight
                    </span>
                    <span style={{ color: '#2dd4bf', fontSize: 7.5 }}>Synced 06:12</span>
                  </div>
                </MockWindow>

                {/* Supplier portal mock */}
                <MockWindow title="supplier portal — Coastal Fresh Ltd">
                  <div style={{ padding: '8px 12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                      <span style={{ color: '#cbd5e1', fontSize: 10, fontWeight: 700 }}>Coastal Fresh Ltd</span>
                      <span style={{ color: TEAL, fontSize: 8, fontWeight: 700, background: 'rgba(13,148,136,0.1)', padding: '1px 7px', borderRadius: 4 }}>ACTIVE</span>
                    </div>
                    {[
                      { item: 'Salmon fillet 140g', old: '£4.12', new: '£4.20', change: '+1.9%' },
                      { item: 'Cod loin 180g', old: '£5.05', new: '£5.10', change: '+1.0%' },
                      { item: 'Sea bass 200g', old: '£6.80', new: '£6.80', change: '—' },
                    ].map((r, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, padding: '4px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center' }}>
                        <span style={{ color: '#94a3b8', fontSize: 8.5 }}>{r.item}</span>
                        <span style={{ color: '#475569', fontSize: 8, textDecoration: 'line-through' }}>{r.old}</span>
                        <span style={{ color: '#e2e8f0', fontSize: 8.5, fontFamily: 'monospace' }}>{r.new}</span>
                        <span style={{ color: r.change === '—' ? '#475569' : '#f87171', fontSize: 8, fontWeight: 700 }}>{r.change}</span>
                      </div>
                    ))}
                    <div style={{ color: '#334155', fontSize: 7.5, marginTop: 6 }}>Supplier updated their own portal · All linked dishes recosted automatically</div>
                  </div>
                </MockWindow>
              </div>

              {/* Right — callouts */}
              <div style={{ padding: '20px 32px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ color: '#475569', fontSize: 11, lineHeight: 1.6, margin: '0 0 10px' }}>
                  We connect with your existing suppliers. When they update their prices, every linked recipe recoasts in seconds. You see exactly which dishes are affected — before it costs you.
                </p>
                <Callout icon="🔗" title="Connect existing suppliers" body="One click to invite. They get their own portal. No setup needed from you." />
                <Callout icon="⚡" title="Sub-second propagation" body="Price changes cascade instantly across every linked dish. Real-time, every time." />
                <Callout icon="📊" title="GP always current" body="No more end-of-month margin surprises. Your true food cost is always visible." />
                <Callout icon="🔔" title="Alerts before invoices" body="Flagged dishes highlighted the morning after a price change. Negotiate before it hits your P&L." />
                <Callout icon="🧠" title="The Brain understands food" body='"60g flat fish fillet skin-off" ≠ "frozen fish block." It knows the difference — and prices accordingly.' />
              </div>
            </div>
          </PageShell>

          {/* ─────────────── PAGE 3 — COMPLIANCE & ALLERGENS ─────────────── */}
          <PageShell number={3}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', minHeight: 0 }}>
              {/* Left — callouts */}
              <div style={{ padding: '20px 16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <SectionBadge text="Compliance Without Clipboards" light />
                <h2 style={{ color: '#0f172a', fontSize: 19, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                  Audit-ready<br />
                  <span style={{ color: TEAL }}>every single day.</span>
                </h2>
                <p style={{ color: '#475569', fontSize: 11, lineHeight: 1.6, margin: '0 0 8px' }}>
                  Every task timestamped as it happens. Every signature captured. Every briefing recorded. One click to generate inspection reports for FSA, HSE, or local authority.
                </p>
                <Callout icon="🛡️" title="14 allergens auto-tracked" body="Matrices generated directly from recipe ingredients. Natasha's Law handled — automatically." />
                <Callout icon="📋" title="Pre-service briefings" body="Staff attendance, high-risk items, digital signatures — all captured at the start of every service." />
                <Callout icon="📸" title="Evidence as work happens" body="Photo evidence, form submissions, signatures timestamped in real time. No retrospective paperwork." />
                <Callout icon="📄" title="One-click inspection reports" body="Pre-formatted for FSA, HSE, and local authority requirements. No scramble before inspections." />
                <Callout icon="🎓" title="Training with expiry tracking" body="Certifications tracked automatically. Reassessment scheduled before expiry. Staff always current." />

                {/* Never do again box */}
                <div style={{ marginTop: 4, padding: '10px 12px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca' }}>
                  <div style={{ fontSize: 8.5, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>You'll never again</div>
                  {['Scramble before an inspection', 'Chase staff for signed paperwork', 'Manually update allergen spreadsheets', 'Guess who completed their training'].map(t => (
                    <div key={t} style={{ fontSize: 9.5, color: '#94a3b8', textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
                  ))}
                </div>
              </div>

              {/* Right — UI mocks */}
              <div style={{ background: '#f1f5f9', padding: '20px 32px 20px 16px', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Allergen matrix mock */}
                <MockWindow title="allergen matrix — Pan-Seared Salmon">
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                      {[
                        { name: 'Gluten', present: false },
                        { name: 'Crustaceans', present: false },
                        { name: 'Eggs', present: false },
                        { name: 'Fish', present: true },
                        { name: 'Peanuts', present: false },
                        { name: 'Soya', present: false },
                        { name: 'Dairy', present: true },
                        { name: 'Nuts', present: false },
                        { name: 'Celery', present: false },
                        { name: 'Mustard', present: false },
                        { name: 'Sesame', present: true },
                        { name: 'Sulphites', present: false },
                        { name: 'Lupin', present: false },
                        { name: 'Molluscs', present: false },
                      ].map(a => (
                        <span key={a.name} style={{
                          fontSize: 8,
                          fontWeight: 700,
                          padding: '3px 7px',
                          borderRadius: 5,
                          background: a.present ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.05)',
                          color: a.present ? '#fca5a5' : '#475569',
                          border: `1px solid ${a.present ? 'rgba(248,113,113,0.35)' : 'rgba(255,255,255,0.07)'}`,
                        }}>
                          {a.present ? '⚠ ' : ''}{a.name}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: TEAL, fontSize: 8, fontWeight: 700 }}>Confidence: 98% · Auto-generated from ingredients</span>
                      <span style={{ color: '#334155', fontSize: 7.5 }}>Last updated: today</span>
                    </div>
                  </div>
                </MockWindow>

                {/* Pre-service briefing mock */}
                <MockWindow title="pre-service allergen briefing — lunch">
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ color: '#94a3b8', fontSize: 9, marginBottom: 4 }}>Staff sign-in</div>
                      {[
                        { name: 'Jamie Smith', role: 'Head Chef', signed: true },
                        { name: 'Maria Garcia', role: 'Sous Chef', signed: true },
                        { name: 'Tom Lee', role: 'FOH Lead', signed: true },
                        { name: 'New Start', role: 'KP', signed: false },
                      ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <span style={{ color: '#e2e8f0', fontSize: 9 }}>{s.name} <span style={{ color: '#475569' }}>· {s.role}</span></span>
                          <span style={{ color: s.signed ? TEAL : '#f87171', fontSize: 8, fontWeight: 700 }}>{s.signed ? 'SIGNED' : 'PENDING'}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 6, padding: '6px 8px' }}>
                      <div style={{ color: '#fca5a5', fontSize: 8, fontWeight: 700, marginBottom: 3 }}>HIGH RISK TODAY</div>
                      <div style={{ color: '#94a3b8', fontSize: 8 }}>Pan-Seared Salmon — Fish, Dairy, Sesame present</div>
                    </div>
                  </div>
                </MockWindow>

                {/* Compliance tasks mock */}
                <MockWindow title="compliance — this week">
                  <div style={{ padding: '8px 12px' }}>
                    {[
                      { label: 'Mon — Pre-service briefing', status: 'complete' },
                      { label: 'Mon — Fridge log AM', status: 'complete' },
                      { label: 'Tue — Delivery check', status: 'complete' },
                      { label: 'Tue — Pre-service briefing', status: 'complete' },
                      { label: 'Wed — HACCP review', status: 'due' },
                    ].map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '4px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: t.status === 'complete' ? TEAL : 'rgba(245,158,11,0.3)', border: t.status === 'complete' ? 'none' : '1px solid rgba(245,158,11,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {t.status === 'complete' && <span style={{ color: '#fff', fontSize: 7, fontWeight: 900 }}>✓</span>}
                        </span>
                        <span style={{ color: t.status === 'complete' ? '#475569' : '#fbbf24', fontSize: 8.5 }}>{t.label}</span>
                      </div>
                    ))}
                    <div style={{ color: TEAL, fontSize: 7.5, marginTop: 6, fontWeight: 700 }}>4/5 complete · All timestamped & signed</div>
                  </div>
                </MockWindow>
              </div>
            </div>
          </PageShell>

          {/* ─────────────── PAGE 4 — SUPPLIER ECOSYSTEM & ONBOARDING ─────────────── */}
          <PageShell number={4}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: 0 }}>
              {/* Left — UI mocks */}
              <div style={{ background: '#f1f5f9', padding: '20px 16px 20px 32px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <SectionBadge text="Supplier Ecosystem" light />
                <h2 style={{ color: '#0f172a', fontSize: 19, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  Suppliers manage<br />
                  <span style={{ color: TEAL }}>themselves.</span>
                </h2>

                {/* Supplier portal mock */}
                <MockWindow title="supplier dashboard — Coastal Fresh Ltd">
                  <div style={{ padding: '8px 12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 8 }}>
                      {[
                        { val: '124', label: 'Active products' },
                        { val: '3', label: 'Price updates today' },
                        { val: '98%', label: 'Catalogue complete' },
                      ].map(s => (
                        <div key={s.label} style={{ background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.15)', borderRadius: 6, padding: '6px 8px', textAlign: 'center' }}>
                          <div style={{ color: '#2dd4bf', fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                          <div style={{ color: '#475569', fontSize: 7.5, marginTop: 2 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ color: '#64748b', fontSize: 8.5, marginBottom: 5, fontWeight: 700 }}>Recent activity</div>
                    {[
                      'Updated 3 product prices',
                      'Added new promotional campaign',
                      'Uploaded Q2 compliance certificate',
                    ].map((a, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <span style={{ color: TEAL, fontSize: 8 }}>→</span>
                        <span style={{ color: '#94a3b8', fontSize: 8.5 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </MockWindow>

                {/* Onboarding mock */}
                <MockWindow title="onboarding — upload your data">
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {[
                        { label: 'Recipe documents uploaded', status: 'done', detail: '47 recipes ingested' },
                        { label: 'Supplier price lists imported', status: 'done', detail: '4 suppliers connected' },
                        { label: 'Staff records imported', status: 'done', detail: '12 staff, roles assigned' },
                        { label: 'Go live', status: 'done', detail: 'Operational in 4 min 38 sec' },
                      ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', background: 'rgba(13,148,136,0.07)', border: '1px solid rgba(13,148,136,0.12)', borderRadius: 6 }}>
                          <span style={{ color: TEAL, fontSize: 11, fontWeight: 900, flexShrink: 0 }}>✓</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 600 }}>{s.label}</div>
                            <div style={{ color: '#475569', fontSize: 8 }}>{s.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 8, textAlign: 'center' }}>
                      <span style={{ color: '#2dd4bf', fontSize: 9, fontWeight: 800 }}>Total time from sign-up to operational: 4 minutes 38 seconds</span>
                    </div>
                  </div>
                </MockWindow>

                {/* B2B message mock */}
                <MockWindow title="messages — Coastal Fresh Ltd">
                  <div style={{ padding: '8px 12px' }}>
                    {[
                      { from: 'You', msg: 'Can you confirm today\'s salmon price?', time: '08:14', mine: true },
                      { from: 'Coastal Fresh', msg: 'Updated on portal — £4.20/portion. Your dishes recosted automatically.', time: '08:17', mine: false },
                    ].map((m, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
                        <div style={{ background: m.mine ? TEAL : 'rgba(255,255,255,0.07)', color: m.mine ? '#fff' : '#cbd5e1', fontSize: 9, padding: '5px 9px', borderRadius: 8, maxWidth: '80%', lineHeight: 1.45 }}>{m.msg}</div>
                        <span style={{ color: '#334155', fontSize: 7.5, marginTop: 2 }}>{m.time}</span>
                      </div>
                    ))}
                  </div>
                </MockWindow>
              </div>

              {/* Right — callouts */}
              <div style={{ padding: '20px 32px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ color: '#475569', fontSize: 11, lineHeight: 1.6, margin: '0 0 8px' }}>
                  Invite your suppliers once. They get their own full portal — products, pricing, promotions, compliance — and they keep it updated. You just see the results.
                </p>
                <Callout icon="🚀" title="Live in under 5 minutes" body="Upload your existing data in any format. Ingested, structured, and active immediately." />
                <Callout icon="🔗" title="Supplier self-service" body="Suppliers maintain their own pricing and catalogues. Zero admin from your side." />
                <Callout icon="📦" title="Two-tier supply chain" body="Track your supplier's own vendor prices. See cost pressures coming before they hit your invoice." />
                <Callout icon="💬" title="B2B messaging" body="All supplier communication in one auditable thread. No more lost emails or WhatsApp chains." />
                <Callout icon="📑" title="Invoice scanning" body="Upload a PDF invoice — line items extracted and reconciled automatically." />
                <Callout icon="🌙" title="SFTP overnight sync" body="Suppliers drop files in a secure inbox. Data populates automatically before your morning prep." />
              </div>
            </div>
          </PageShell>

          {/* ─────────────── PAGE 5 — MULTI-SITE, ANALYTICS & CLOSE ─────────────── */}
          <PageShell number={5}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', minHeight: 0 }}>
              {/* Left — callouts + CTA */}
              <div style={{ padding: '20px 16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 8, borderRight: '1px solid #e2e8f0' }}>
                <SectionBadge text="Multi-Site & Analytics" light />
                <h2 style={{ color: '#0f172a', fontSize: 19, fontWeight: 900, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  Every site.<br />
                  <span style={{ color: TEAL }}>One dashboard.</span>
                </h2>
                <p style={{ color: '#475569', fontSize: 11, lineHeight: 1.6, margin: '0 0 8px' }}>
                  See which sites are compliant, which are overspending, and who needs attention — across your entire estate, in real time.
                </p>
                <Callout icon="🏢" title="Multi-site command centre" body="Regional dashboards with site-level comparison. Centralised buying power with local control." />
                <Callout icon="📈" title="Spend analytics" body="Spend by supplier, category, and location. Identify waste and negotiate better terms." />
                <Callout icon="⚠️" title="Waste tracking" body="Top 10 waste drivers with root cause analysis. Know what you're throwing away and why." />
                <Callout icon="📊" title="Margin analysis" body="At recipe, menu item, and portion level. Always current against live supplier pricing." />

                {/* Why we win table */}
                <div style={{ marginTop: 4, border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: MID }}>
                    <div style={{ padding: '6px 10px', color: '#2dd4bf', fontSize: 8.5, fontWeight: 800 }}>Us</div>
                    <div style={{ padding: '6px 10px', color: '#475569', fontSize: 8.5, fontWeight: 800, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>Everyone else</div>
                  </div>
                  {[
                    ['Live in 5 minutes', '6-week implementation'],
                    ['Suppliers update themselves', 'You update supplier info'],
                    ['Live GP on every price change', 'Static until you recalculate'],
                    ['Allergens auto-generated', 'Manual spreadsheets'],
                    ['Built by operators', 'Built by developers'],
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                      <div style={{ padding: '5px 10px', fontSize: 9, color: '#0f172a', fontWeight: 600, borderTop: '1px solid #e2e8f0' }}>{row[0]}</div>
                      <div style={{ padding: '5px 10px', fontSize: 9, color: '#94a3b8', borderLeft: '1px solid #e2e8f0', borderTop: '1px solid #e2e8f0' }}>{row[1]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — multi-site UI mock + CTA */}
              <div style={{ background: '#f1f5f9', padding: '20px 32px 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* Multi-site dashboard mock */}
                <MockWindow title="group dashboard — all sites">
                  <div style={{ padding: '8px 12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 8 }}>
                      {[
                        { val: '6', label: 'Sites' },
                        { val: '94%', label: 'Avg GP' },
                        { val: '5/6', label: 'Compliant' },
                        { val: '£12.4k', label: 'Spend this wk' },
                      ].map(s => (
                        <div key={s.label} style={{ background: 'rgba(13,148,136,0.1)', borderRadius: 5, padding: '5px 6px', textAlign: 'center' }}>
                          <div style={{ color: '#2dd4bf', fontSize: 13, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                          <div style={{ color: '#475569', fontSize: 7, marginTop: 2 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {[
                      { site: 'Kings Cross', gp: '72%', comp: true, spend: '£2,100', flag: '' },
                      { site: 'Shoreditch', gp: '69%', comp: true, spend: '£1,840', flag: '' },
                      { site: 'Camden', gp: '74%', comp: true, spend: '£2,250', flag: '' },
                      { site: 'Brixton', gp: '71%', comp: false, spend: '£1,960', flag: '⚠ compliance' },
                      { site: 'Canary Wharf', gp: '68%', comp: true, spend: '£2,400', flag: '' },
                      { site: 'Hackney', gp: '75%', comp: true, spend: '£1,850', flag: '' },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, alignItems: 'center', padding: '4px 0', borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <span style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 600 }}>{s.site}</span>
                        <span style={{ color: parseInt(s.gp) >= 70 ? '#2dd4bf' : '#f59e0b', fontSize: 9, fontWeight: 700 }}>{s.gp}</span>
                        <span style={{ color: s.comp ? TEAL : '#f87171', fontSize: 8, fontWeight: 700 }}>{s.comp ? '✓' : '✗'}</span>
                        <span style={{ color: '#475569', fontSize: 8.5 }}>{s.spend}</span>
                      </div>
                    ))}
                  </div>
                </MockWindow>

                {/* Spend analytics mock */}
                <MockWindow title="spend analytics — this month">
                  <div style={{ padding: '8px 12px' }}>
                    <div style={{ marginBottom: 6 }}>
                      {[
                        { supplier: 'Coastal Fresh Ltd', amount: '£4,280', pct: 85 },
                        { supplier: 'Premier Foods', amount: '£2,940', pct: 58 },
                        { supplier: 'Fresh Direct', amount: '£1,820', pct: 36 },
                        { supplier: 'Bakery Co', amount: '£960', pct: 19 },
                      ].map((s, i) => (
                        <div key={i} style={{ marginBottom: 6 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                            <span style={{ color: '#94a3b8', fontSize: 8.5 }}>{s.supplier}</span>
                            <span style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 700 }}>{s.amount}</span>
                          </div>
                          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${s.pct}%`, background: TEAL, borderRadius: 2 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MockWindow>

                {/* CTA box */}
                <div style={{ background: MID, borderRadius: 10, padding: '16px', border: `1px solid rgba(13,148,136,0.3)`, marginTop: 'auto' }}>
                  <div style={{ color: '#fff', fontWeight: 900, fontSize: 15, lineHeight: 1.2, marginBottom: 6 }}>
                    See it live in 30 minutes.
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.55, marginBottom: 12 }}>
                    We'll ingest your real data, connect a supplier, and show your dishes recosting in front of you. No slides. Just your operation on the platform.
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ background: TEAL, color: '#fff', fontWeight: 900, fontSize: 11, padding: '9px 16px', borderRadius: 7 }}>
                      Request Your Demo →
                    </div>
                    <span style={{ color: '#334155', fontSize: 9 }}>HospitalitySupport.uk</span>
                  </div>
                </div>
              </div>
            </div>
          </PageShell>

        </div>
      </div>
    </div>
  );
}
