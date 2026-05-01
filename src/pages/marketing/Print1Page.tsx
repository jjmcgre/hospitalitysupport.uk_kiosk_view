export default function Print1Page() {
  return (
    <div className="min-h-full bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">1-Pager — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">Print-ready single page sales document</p>
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
            .print-page { box-shadow: none !important; }
            .no-print { display: none !important; }
          }
          @page { size: A4 portrait; margin: 0; }
        `}</style>

        {/* A4 PAGE */}
        <div
          className="print-page bg-white shadow-2xl overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", display: 'flex', flexDirection: 'column' }}
        >
          {/* TOP BAND */}
          <div style={{ background: '#080f1a', padding: '20px 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 16, letterSpacing: '-0.01em' }}>
                HospitalitySupport<span style={{ color: '#2dd4bf' }}>.uk</span>
              </span>
              <div style={{ color: '#475569', fontSize: 9.5, marginTop: 2 }}>Built by operators, for operators</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#2dd4bf', fontSize: 11, fontWeight: 800, background: 'rgba(45,212,191,0.12)', border: '1px solid rgba(45,212,191,0.25)', borderRadius: 99, padding: '3px 10px' }}>
                Live in 5 minutes
              </div>
            </div>
          </div>

          {/* HERO ROW */}
          <div style={{ background: '#0f1f2e', padding: '24px 32px 20px', borderBottom: '2px solid #2dd4bf' }}>
            <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: 0, lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Stop doing the admin.<br />
              <span style={{ color: '#2dd4bf' }}>Start running the kitchen.</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 11.5, marginTop: 10, lineHeight: 1.55, maxWidth: 440, margin: '10px 0 0' }}>
              Connect your existing suppliers once. Every price movement is tracked automatically. Every dish recosted instantly. Your GP always live — without a spreadsheet in sight.
            </p>
          </div>

          {/* MAIN CONTENT — two columns */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>

            {/* LEFT — Mock UI screenshot */}
            <div style={{ background: '#f1f5f9', padding: '18px 16px 18px 32px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 2 }}>
                Platform Preview
              </div>

              {/* Mock: Live Recipe Costing panel */}
              <div style={{ background: '#1a2535', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ background: '#0d1a26', padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontSize: 9, fontFamily: 'monospace' }}>live recipe costing</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2dd4bf', display: 'inline-block' }} />
                    <span style={{ color: '#2dd4bf', fontSize: 8, fontWeight: 700 }}>LIVE</span>
                  </span>
                </div>
                {[
                  { name: 'Pan-Seared Salmon', cost: '£4.20', gp: '71%', bar: 71, up: true },
                  { name: 'Beef Burger & Fries', cost: '£3.85', gp: '68%', bar: 68, up: false },
                  { name: 'Mushroom Risotto', cost: '£2.95', gp: '74%', bar: 74, up: false },
                  { name: 'Caesar Salad', cost: '£2.40', gp: '76%', bar: 76, up: false },
                ].map((d, i) => (
                  <div key={i} style={{ padding: '7px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ color: '#e2e8f0', fontSize: 9.5, fontWeight: 600 }}>{d.name}</span>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ color: '#64748b', fontSize: 9, fontFamily: 'monospace' }}>{d.cost}</span>
                        <span style={{ color: '#2dd4bf', fontSize: 10, fontWeight: 800 }}>{d.gp}</span>
                        {d.up && <span style={{ color: '#f87171', fontSize: 8 }}>↑</span>}
                      </div>
                    </div>
                    <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${d.bar}%`, background: '#2dd4bf', borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
                <div style={{ padding: '6px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#334155', fontSize: 8 }}>4 suppliers connected</span>
                  <span style={{ color: '#2dd4bf', fontSize: 8 }}>Synced: just now</span>
                </div>
              </div>

              {/* Mock: Allergen matrix strip */}
              <div style={{ background: '#1a2535', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ background: '#0d1a26', padding: '7px 12px' }}>
                  <span style={{ color: '#64748b', fontSize: 9, fontFamily: 'monospace' }}>allergen matrix — auto-generated</span>
                </div>
                <div style={{ padding: '8px 12px' }}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {['Gluten', 'Dairy', 'Fish', 'Crustacean', 'Nuts', 'Eggs', 'Soya', 'Celery'].map((a, i) => (
                      <span key={a} style={{
                        fontSize: 8,
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: [0, 2, 5].includes(i) ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.05)',
                        color: [0, 2, 5].includes(i) ? '#fca5a5' : '#475569',
                        border: `1px solid ${[0, 2, 5].includes(i) ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      }}>
                        {a}
                      </span>
                    ))}
                  </div>
                  <div style={{ color: '#334155', fontSize: 8, marginTop: 6 }}>Confidence: 98% · Last updated: ingredient change</div>
                </div>
              </div>

              {/* Mock: Compliance task */}
              <div style={{ background: '#1a2535', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ background: '#0d1a26', padding: '7px 12px' }}>
                  <span style={{ color: '#64748b', fontSize: 9, fontFamily: 'monospace' }}>compliance tasks — today</span>
                </div>
                <div style={{ padding: '8px 12px' }}>
                  {[
                    { task: 'Pre-service allergen briefing', done: true },
                    { task: 'Fridge temperature check', done: true },
                    { task: 'Delivery note reconciliation', done: false },
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                      <span style={{ width: 12, height: 12, borderRadius: 3, background: t.done ? '#0d9488' : 'rgba(255,255,255,0.08)', border: t.done ? 'none' : '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {t.done && <span style={{ color: '#fff', fontSize: 8, fontWeight: 900 }}>✓</span>}
                      </span>
                      <span style={{ color: t.done ? '#64748b' : '#e2e8f0', fontSize: 9, textDecoration: t.done ? 'line-through' : 'none' }}>{t.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Callouts + key points */}
            <div style={{ padding: '18px 32px 18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 2 }}>
                What it does for you
              </div>

              {[
                {
                  icon: '📈',
                  title: 'Live recipe costing',
                  body: 'Supplier updates their price → your dish recoasts in seconds. GP always current. No spreadsheets.',
                  colour: '#0d9488',
                },
                {
                  icon: '🛡️',
                  title: 'Auto allergen matrix',
                  body: 'Generated directly from recipe ingredients. 14 allergens tracked. Natasha\'s Law handled automatically.',
                  colour: '#0284c7',
                },
                {
                  icon: '✅',
                  title: 'Compliance on autopilot',
                  body: 'Tasks, evidence, signatures — timestamped as work happens. One-click FSA inspection report.',
                  colour: '#059669',
                },
                {
                  icon: '🔗',
                  title: 'Supplier-connected',
                  body: 'Suppliers manage their own portal. Pricing, catalogues, promotions — always current, zero admin from you.',
                  colour: '#0d9488',
                },
                {
                  icon: '⚡',
                  title: 'Live in 5 minutes',
                  body: 'Upload existing recipes and supplier lists. Ingested, structured, and active immediately.',
                  colour: '#d97706',
                },
              ].map((c) => (
                <div key={c.title} style={{ display: 'flex', gap: 9, padding: '8px 10px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 10.5, color: '#0f172a', marginBottom: 2 }}>{c.title}</div>
                    <div style={{ fontSize: 9.5, color: '#64748b', lineHeight: 1.5 }}>{c.body}</div>
                  </div>
                </div>
              ))}

              {/* Crossed out tasks */}
              <div style={{ marginTop: 4, padding: '10px 12px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca' }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Things you'll never do again</div>
                {[
                  'Chase supplier price lists',
                  'Manually recost dishes',
                  'Fill in allergen spreadsheets',
                  'Scramble before inspections',
                ].map((t) => (
                  <div key={t} style={{ fontSize: 9.5, color: '#94a3b8', textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS BAR */}
          <div style={{ background: '#0f172a', padding: '12px 32px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {[
              { val: '5 min', label: 'To go live' },
              { val: '2,000+', label: 'Products/supplier' },
              { val: '14', label: 'Allergens tracked' },
              { val: '134', label: 'Backend functions' },
              { val: '0', label: 'Spreadsheets needed' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#2dd4bf', fontSize: 16, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: '#475569', fontSize: 8.5, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA FOOTER */}
          <div style={{ background: '#0d9488', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 14, lineHeight: 1.2 }}>Book a 30-minute demo.</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10.5, marginTop: 2 }}>We'll show it live with your data. No slides. No jargon.</div>
            </div>
            <div style={{ background: '#fff', color: '#0d9488', fontWeight: 900, fontSize: 11.5, padding: '9px 18px', borderRadius: 8 }}>
              Request Your Demo →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
