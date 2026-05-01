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

        {/* ── A4 PAGE ── */}
        <div
          className="print-page bg-white shadow-2xl overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}
        >
          {/* TOP BAND */}
          <div style={{ background: '#080f1a', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: '-0.01em' }}>
              HospitalitySupport<span style={{ color: '#2dd4bf' }}>.uk</span>
            </span>
            <span style={{ color: '#2dd4bf', fontSize: 10, fontWeight: 800, background: 'rgba(45,212,191,0.12)', border: '1px solid rgba(45,212,191,0.25)', borderRadius: 99, padding: '2px 10px' }}>
              From concept to live dish in under 3 minutes
            </span>
          </div>

          {/* HERO */}
          <div style={{ background: '#0f1623', padding: '18px 28px 14px', borderBottom: '2px solid #2dd4bf' }}>
            <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 900, margin: 0, lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Type a dish idea.<br />
              <span style={{ color: '#2dd4bf' }}>Get everything. Instantly.</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 11, marginTop: 8, lineHeight: 1.55, maxWidth: 500 }}>
              Recipe. Costings. Allergens. HACCP controls. Nutrition. FOH copy. Wine pairing. Live GP tracking — all generated in under 3 minutes. Then your suppliers connect once, and every price movement recoasts every dish automatically. Forever.
            </p>
          </div>

          {/* DISH JOURNEY STRIP */}
          <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '10px 28px' }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 7 }}>
              Concept → Live dish in 3 minutes
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
              {[
                { num: '01', label: 'Concept', sub: 'Describe your dish', time: '0:30' },
                { num: '02', label: 'Recipe Built', sub: 'Portions, method, mise en place', time: '1:15' },
                { num: '03', label: 'Allergens', sub: 'All 14, auto-generated', time: '1:45' },
                { num: '04', label: 'HACCP', sub: 'CCPs, temps, controls', time: '2:10' },
                { num: '05', label: 'Nutrition', sub: 'Per portion, live', time: '2:40' },
                { num: '06', label: 'Live', sub: 'Spec, FOH copy, GP tracking', time: '3:00' },
              ].map((s, i) => (
                <div key={i} style={{ background: i === 5 ? '#0d9488' : '#fff', border: `1px solid ${i === 5 ? '#0d9488' : '#e2e8f0'}`, borderRadius: 7, padding: '7px 6px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ color: i === 5 ? 'rgba(255,255,255,0.4)' : '#e2e8f0', fontSize: 16, fontWeight: 900, lineHeight: 1, position: 'absolute', top: 4, right: 6 }}>{s.num}</div>
                  <div style={{ color: i === 5 ? '#fff' : '#0f172a', fontSize: 9.5, fontWeight: 800, lineHeight: 1.2 }}>{s.label}</div>
                  <div style={{ color: i === 5 ? 'rgba(255,255,255,0.7)' : '#94a3b8', fontSize: 8, marginTop: 2, lineHeight: 1.3 }}>{s.sub}</div>
                  <div style={{ color: i === 5 ? 'rgba(255,255,255,0.8)' : '#2dd4bf', fontSize: 8, fontWeight: 700, marginTop: 4 }}>{s.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

            {/* LEFT — mock UI screenshots */}
            <div style={{ background: '#f1f5f9', padding: '14px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ fontSize: 8.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Platform preview</div>

              {/* Live recipe costing mock */}
              <div style={{ background: '#1a2535', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ background: '#0d1a26', padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: 8, fontFamily: 'monospace' }}>live recipe costing</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2dd4bf', display: 'inline-block' }} />
                    <span style={{ color: '#2dd4bf', fontSize: 7, fontWeight: 700 }}>LIVE</span>
                  </span>
                </div>
                {[
                  { name: 'Pan-Seared Sea Trout', cost: '£3.87', gp: '73%', alert: true },
                  { name: 'Beef Burger & Fries', cost: '£3.85', gp: '68%', alert: false },
                  { name: 'Mushroom Risotto', cost: '£2.95', gp: '74%', alert: false },
                  { name: 'Caesar Salad', cost: '£2.40', gp: '76%', alert: false },
                ].map((d, i) => (
                  <div key={i} style={{ padding: '5px 10px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: d.alert ? 'rgba(248,113,113,0.04)' : 'transparent' }}>
                    <span style={{ color: '#cbd5e1', fontSize: 8.5, fontWeight: 600 }}>{d.name}</span>
                    <span style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                      <span style={{ color: '#475569', fontSize: 8, fontFamily: 'monospace' }}>{d.cost}</span>
                      <span style={{ color: '#2dd4bf', fontSize: 9, fontWeight: 800 }}>{d.gp}</span>
                      {d.alert && <span style={{ color: '#f87171', fontSize: 8 }}>↑</span>}
                    </span>
                  </div>
                ))}
                <div style={{ padding: '4px 10px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#334155', fontSize: 7 }}>4 suppliers · auto-recosted</span>
                  <span style={{ color: '#2dd4bf', fontSize: 7 }}>Synced: just now</span>
                </div>
              </div>

              {/* Allergen matrix mock */}
              <div style={{ background: '#1a2535', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ background: '#0d1a26', padding: '5px 10px' }}>
                  <span style={{ color: '#64748b', fontSize: 8, fontFamily: 'monospace' }}>allergen matrix — auto-generated</span>
                </div>
                <div style={{ padding: '7px 10px' }}>
                  <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginBottom: 5 }}>
                    {[
                      { name: 'Fish', p: true }, { name: 'Dairy', p: true }, { name: 'Sulphites', p: true },
                      { name: 'Gluten', p: false }, { name: 'Eggs', p: false }, { name: 'Nuts', p: false },
                      { name: 'Soya', p: false }, { name: 'Sesame', p: false },
                    ].map(a => (
                      <span key={a.name} style={{
                        fontSize: 7.5, fontWeight: 700, padding: '2px 5px', borderRadius: 4,
                        background: a.p ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.04)',
                        color: a.p ? '#fca5a5' : '#475569',
                        border: `1px solid ${a.p ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      }}>
                        {a.p ? '⚠ ' : ''}{a.name}
                      </span>
                    ))}
                  </div>
                  <div style={{ color: '#334155', fontSize: 7 }}>14 allergens tracked · Natasha's Law compliant · Auto-updates on recipe change</div>
                </div>
              </div>

              {/* HACCP mock */}
              <div style={{ background: '#1a2535', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ background: '#0d1a26', padding: '5px 10px' }}>
                  <span style={{ color: '#64748b', fontSize: 8, fontFamily: 'monospace' }}>HACCP controls — Sea Trout</span>
                </div>
                <div style={{ padding: '7px 10px' }}>
                  {[
                    { ccp: 'CCP1', step: 'Receiving', control: 'Temp ≤3°C on delivery' },
                    { ccp: 'CCP2', step: 'Storage', control: 'Fridge ≤5°C, covered, labelled' },
                    { ccp: 'CCP3', step: 'Cooking', control: 'Core temp ≥63°C for 2 min' },
                  ].map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: i < 2 ? 4 : 0 }}>
                      <span style={{ color: '#2dd4bf', fontSize: 7, fontWeight: 800, background: 'rgba(45,212,191,0.1)', padding: '1px 5px', borderRadius: 3, flexShrink: 0 }}>{c.ccp}</span>
                      <div>
                        <div style={{ color: '#e2e8f0', fontSize: 8, fontWeight: 600 }}>{c.step}</div>
                        <div style={{ color: '#64748b', fontSize: 7.5 }}>{c.control}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance tasks */}
              <div style={{ background: '#1a2535', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ background: '#0d1a26', padding: '5px 10px' }}>
                  <span style={{ color: '#64748b', fontSize: 8, fontFamily: 'monospace' }}>compliance — today</span>
                </div>
                <div style={{ padding: '7px 10px' }}>
                  {[
                    { task: 'Pre-service allergen briefing', done: true, sig: 'J. Smith' },
                    { task: 'Fridge temperature check', done: true, sig: 'Auto' },
                    { task: 'Delivery note reconciliation', done: true, sig: 'M. Jones' },
                    { task: 'Evening HACCP check', done: false, sig: '' },
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: i < 3 ? 4 : 0 }}>
                      <span style={{ width: 11, height: 11, borderRadius: 2, background: t.done ? '#0d9488' : 'rgba(255,255,255,0.06)', border: t.done ? 'none' : '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 7, color: '#fff', fontWeight: 900 }}>
                        {t.done ? '✓' : ''}
                      </span>
                      <span style={{ color: t.done ? '#475569' : '#e2e8f0', fontSize: 8.5, flex: 1, textDecoration: t.done ? 'line-through' : 'none' }}>{t.task}</span>
                      {t.sig && <span style={{ color: '#334155', fontSize: 7 }}>{t.sig}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — what it does */}
            <div style={{ padding: '14px 28px 14px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ fontSize: 8.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
                Works across every part of your business
              </div>

              {[
                { icon: '🍳', title: 'Kitchen', body: 'Full menus built in hours. Every dish spec\'d with portions, method, mise en place. Designed around your skill level and service pressure.' },
                { icon: '📈', title: 'Cost & GP', body: 'Supplier changes price → your dish recoasts in seconds. GP always live. No spreadsheets. Margin drift flagged before it hits your P&L.' },
                { icon: '🛡️', title: 'Allergens & HACCP', body: '14 allergens auto-generated. CCPs built per dish. Natasha\'s Law handled. One-click FSA inspection report.' },
                { icon: '🎓', title: 'Training', body: 'Generated from your real operations. Auto-updates when menus change. Onboarding that mirrors how you actually work.' },
                { icon: '🍷', title: 'Bar & Wine', body: 'Yield loss and pour drift flagged early. Wine lists aligned with food menus and live pricing.' },
                { icon: '🏢', title: 'Multi-Site', body: 'Every site. One dashboard. GP, compliance, and spend across your estate. Centralised buying with local control.' },
              ].map((c) => (
                <div key={c.title} style={{ display: 'flex', gap: 7, padding: '7px 9px', background: '#f8fafc', borderRadius: 7, border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: 12, lineHeight: 1, flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 10, color: '#0f172a', marginBottom: 1.5 }}>{c.title}</div>
                    <div style={{ fontSize: 9, color: '#64748b', lineHeight: 1.45 }}>{c.body}</div>
                  </div>
                </div>
              ))}

              {/* Never do again */}
              <div style={{ marginTop: 2, padding: '8px 10px', background: '#fef2f2', borderRadius: 7, border: '1px solid #fecaca' }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>You'll never again</div>
                {[
                  'Manually recost dishes after a price change',
                  'Fill in allergen spreadsheets by hand',
                  'Scramble before an FSA inspection',
                  'Spend 3 hours building a dish spec',
                ].map((t) => (
                  <div key={t} style={{ fontSize: 9, color: '#94a3b8', textDecoration: 'line-through', marginBottom: 2 }}>{t}</div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS BAR */}
          <div style={{ background: '#0f172a', padding: '10px 28px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {[
              { val: '3 min', label: 'Concept to live dish' },
              { val: '14', label: 'Allergens tracked' },
              { val: '5 min', label: 'To go live overall' },
              { val: '2,000+', label: 'Products/supplier' },
              { val: '134', label: 'Backend functions' },
              { val: '0', label: 'Spreadsheets needed' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#2dd4bf', fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: '#475569', fontSize: 7.5, marginTop: 2, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: '#0d9488', padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 13 }}>Book a 30-minute demo. See your dishes recosted live.</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 1 }}>We'll upload your data, connect a supplier, and show it all happening in front of you. No slides.</div>
            </div>
            <div style={{ background: '#fff', color: '#0d9488', fontWeight: 900, fontSize: 11, padding: '8px 16px', borderRadius: 7, whiteSpace: 'nowrap' }}>
              Request Your Demo →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
