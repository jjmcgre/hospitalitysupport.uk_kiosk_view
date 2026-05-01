import React from 'react';

const T = '#0d9488';
const DARK = '#080f1a';
const MID = '#0f1623';
const SLATE_UI = '#1a2535';

function PageShell({ children, n }: { children: React.ReactNode; n: number }) {
  return (
    <div
      className="print-page bg-white shadow-2xl overflow-hidden"
      style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ background: DARK, padding: '9px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: 13 }}>
          HospitalitySupport<span style={{ color: '#2dd4bf' }}>.uk</span>
        </span>
        <span style={{ color: '#334155', fontSize: 8.5 }}>Page {n} of 5</span>
      </div>
      {children}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '6px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <span style={{ color: '#94a3b8', fontSize: 7.5 }}>Built by operators, for operators · No 6-week onboarding · No consultants</span>
        <span style={{ color: T, fontSize: 7.5, fontWeight: 700 }}>hospitality<span style={{ color: '#475569' }}>support.uk</span></span>
      </div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-block', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', color: T, fontSize: 8, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 9px', borderRadius: 99, marginBottom: 9 }}>
      {text}
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', gap: 7, marginBottom: 5 }}>
      <span style={{ color: T, fontSize: 9, marginTop: 1, flexShrink: 0 }}>→</span>
      <span style={{ color: '#475569', fontSize: 10, lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

function Win({ us, them }: { us: string; them: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{ padding: '5px 10px', fontSize: 9, color: '#0f172a', fontWeight: 600 }}>{us}</div>
      <div style={{ padding: '5px 10px', fontSize: 9, color: '#94a3b8', borderLeft: '1px solid #e2e8f0' }}>{them}</div>
    </div>
  );
}

function MockBar({ title, live, children }: { title: string; live?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: SLATE_UI, borderRadius: 9, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
      <div style={{ background: '#0d1a26', padding: '6px 11px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#475569', fontSize: 8, fontFamily: 'monospace' }}>{title}</span>
        {live && <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2dd4bf', display: 'inline-block' }} /><span style={{ color: '#2dd4bf', fontSize: 7, fontWeight: 700 }}>LIVE</span></span>}
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

          {/* ═══════════════════════════════════════════════════════════
              PAGE 1 — COVER
          ═══════════════════════════════════════════════════════════ */}
          <PageShell n={1}>
            <div style={{ background: MID, flex: 1, padding: '24px 28px 18px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -80, right: -80, width: 340, height: 340, background: 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <Badge text="The Operating System for Modern Hospitality" />
              <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 10px', maxWidth: 400 }}>
                Type a dish idea.<br />
                <span style={{ color: '#2dd4bf' }}>Get everything.<br />Instantly.</span>
              </h1>
              <p style={{ color: '#94a3b8', fontSize: 11.5, lineHeight: 1.6, maxWidth: 420, margin: '0 0 20px' }}>
                Recipe. Costings. Allergens. HACCP controls. Nutrition. FOH copy. Wine pairing. Live GP tracking. All in under 3 minutes — then every supplier price change recoasts every dish, forever.
              </p>

              {/* Journey steps */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 18 }}>
                {[
                  { n: '01', label: 'Concept', time: '0:30' },
                  { n: '02', label: 'Recipe', time: '1:15' },
                  { n: '03', label: 'Allergens', time: '1:45' },
                  { n: '04', label: 'HACCP', time: '2:10' },
                  { n: '05', label: 'Nutrition', time: '2:40' },
                  { n: '06', label: 'LIVE', time: '3:00' },
                ].map((s, i) => (
                  <div key={i} style={{ background: i === 5 ? T : 'rgba(255,255,255,0.05)', border: `1px solid ${i === 5 ? T : 'rgba(255,255,255,0.08)'}`, borderRadius: 7, padding: '8px 7px', textAlign: 'center' }}>
                    <div style={{ color: i === 5 ? '#fff' : '#2dd4bf', fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{s.n}</div>
                    <div style={{ color: i === 5 ? '#fff' : '#94a3b8', fontSize: 9, fontWeight: 700, marginTop: 3 }}>{s.label}</div>
                    <div style={{ color: i === 5 ? 'rgba(255,255,255,0.7)' : '#475569', fontSize: 8, marginTop: 2 }}>{s.time}</div>
                  </div>
                ))}
              </div>

              {/* Business areas grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5, marginBottom: 18 }}>
                {[
                  { icon: '🍳', label: 'Kitchen' },
                  { icon: '📈', label: 'Cost & GP' },
                  { icon: '🛡️', label: 'Allergens' },
                  { icon: '✅', label: 'HACCP' },
                  { icon: '🎓', label: 'Training' },
                  { icon: '🍷', label: 'Bar & Wine' },
                  { icon: '👥', label: 'Front of House' },
                  { icon: '🚚', label: 'Procurement' },
                  { icon: '📊', label: 'Analytics' },
                  { icon: '🏢', label: 'Multi-Site' },
                ].map((a, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7, padding: '8px 6px', textAlign: 'center' }}>
                    <div style={{ fontSize: 14 }}>{a.icon}</div>
                    <div style={{ color: '#94a3b8', fontSize: 8.5, marginTop: 3, fontWeight: 600 }}>{a.label}</div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {[
                  { val: '3 min', label: 'Concept → live dish' },
                  { val: '14', label: 'Allergens tracked' },
                  { val: '5 min', label: 'Overall go-live' },
                  { val: '134', label: 'Backend functions' },
                  { val: '0', label: 'Spreadsheets' },
                ].map((s) => (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7, padding: '9px 6px', textAlign: 'center' }}>
                    <div style={{ color: '#2dd4bf', fontSize: 17, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: '#475569', fontSize: 8, marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: T, padding: '12px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 900, fontSize: 13 }}>See it live — 30-minute demo</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 1 }}>We'll show your dishes recosting in front of you. Your data. No slides.</div>
              </div>
              <div style={{ background: '#fff', color: T, fontWeight: 900, fontSize: 11, padding: '8px 15px', borderRadius: 7, whiteSpace: 'nowrap' }}>Request Your Demo →</div>
            </div>
          </PageShell>

          {/* ═══════════════════════════════════════════════════════════
              PAGE 2 — DISH JOURNEY: CONCEPT → RECIPE → ALLERGENS → HACCP
          ═══════════════════════════════════════════════════════════ */}
          <PageShell n={2}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', minHeight: 0 }}>
              {/* Left — mocks */}
              <div style={{ background: '#f1f5f9', padding: '16px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 9 }}>
                <Badge text="Concept → Live Dish · Under 3 Minutes" />
                <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  Type what you want.<br />
                  <span style={{ color: T }}>Get a fully-built dish.</span>
                </h2>

                {/* Step 1: The prompt */}
                <MockBar title="step 01 — concept input · 0:30">
                  <div style={{ padding: '8px 11px' }}>
                    <div style={{ background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.2)', borderRadius: 6, padding: '8px 10px', color: '#e2e8f0', fontSize: 9.5, lineHeight: 1.5 }}>
                      "Spring fish special — elegant, max 5 ingredients, 70%+ GP, works junior chef section, pairs white Burgundy."
                    </div>
                  </div>
                </MockBar>

                {/* Step 2: Recipe */}
                <MockBar title="step 02 — recipe built · 1:15" live>
                  <div style={{ padding: '0 0 6px' }}>
                    <div style={{ padding: '7px 11px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: '#e2e8f0', fontSize: 9.5, fontWeight: 700 }}>Pan-Seared Sea Trout, Lemon Beurre Blanc</span>
                      <span style={{ color: '#2dd4bf', fontSize: 10, fontWeight: 800 }}>GP: 73%</span>
                    </div>
                    {[
                      { item: 'Sea trout fillet 140g', cost: '£3.20', supplier: 'Coastal Fresh' },
                      { item: 'Unsalted butter 30g', cost: '£0.18', supplier: 'Premier Foods' },
                      { item: 'Lemon ½', cost: '£0.12', supplier: 'Fresh Direct' },
                      { item: 'White wine 50ml', cost: '£0.28', supplier: 'Cellar Direct' },
                      { item: 'Dill 5g', cost: '£0.09', supplier: 'Fresh Direct' },
                    ].map((r, i) => (
                      <div key={i} style={{ padding: '4px 11px', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ color: '#94a3b8', fontSize: 8.5, flex: 1 }}>{r.item}</span>
                        <span style={{ color: '#2dd4bf', fontSize: 8.5, fontFamily: 'monospace', fontWeight: 700 }}>{r.cost}</span>
                        <span style={{ color: '#334155', fontSize: 8, width: 70, textAlign: 'right' }}>{r.supplier}</span>
                      </div>
                    ))}
                    <div style={{ padding: '5px 11px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b', fontSize: 8 }}>Total ingredient cost</span>
                      <span style={{ color: '#fff', fontSize: 9, fontWeight: 800 }}>£3.87</span>
                    </div>
                  </div>
                </MockBar>

                {/* Step 3: Allergens */}
                <MockBar title="step 03 — allergens · 1:45">
                  <div style={{ padding: '8px 11px' }}>
                    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginBottom: 5 }}>
                      {[
                        { n: 'Fish', p: true }, { n: 'Dairy', p: true }, { n: 'Sulphites', p: true },
                        { n: 'Gluten', p: false }, { n: 'Eggs', p: false }, { n: 'Nuts', p: false },
                        { n: 'Soya', p: false }, { n: 'Sesame', p: false }, { n: 'Celery', p: false },
                        { n: 'Mustard', p: false }, { n: 'Peanuts', p: false },
                      ].map(a => (
                        <span key={a.n} style={{ fontSize: 7.5, fontWeight: 700, padding: '2px 5px', borderRadius: 4, background: a.p ? 'rgba(248,113,113,0.15)' : 'rgba(255,255,255,0.04)', color: a.p ? '#fca5a5' : '#475569', border: `1px solid ${a.p ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
                          {a.p ? '⚠ ' : ''}{a.n}
                        </span>
                      ))}
                    </div>
                    <span style={{ color: T, fontSize: 7.5, fontWeight: 700 }}>14 allergens tracked · Natasha's Law compliant · Auto-updates on recipe change</span>
                  </div>
                </MockBar>

                {/* Step 4: HACCP */}
                <MockBar title="step 04 — HACCP controls · 2:10">
                  <div style={{ padding: '8px 11px' }}>
                    {[
                      { ccp: 'CCP1', step: 'Receiving', control: 'Core temp ≤3°C on delivery', action: 'Reject if above 3°C' },
                      { ccp: 'CCP2', step: 'Storage', control: 'Fridge ≤5°C, covered, labelled', action: 'Move/discard if drift' },
                      { ccp: 'CCP3', step: 'Cooking', control: 'Core temp ≥63°C for 2 min', action: 'Re-cook or discard' },
                    ].map((c, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 5, padding: '5px 8px', marginBottom: i < 2 ? 5 : 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                          <span style={{ color: '#2dd4bf', fontSize: 7, fontWeight: 800, background: 'rgba(45,212,191,0.1)', padding: '1px 5px', borderRadius: 3 }}>{c.ccp}</span>
                          <span style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 700 }}>{c.step}</span>
                        </div>
                        <div style={{ color: '#64748b', fontSize: 8 }}>{c.control}</div>
                        <div style={{ color: '#fbbf24', fontSize: 7.5, marginTop: 1 }}>Fail: {c.action}</div>
                      </div>
                    ))}
                  </div>
                </MockBar>
              </div>

              {/* Right — callouts */}
              <div style={{ padding: '16px 28px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ color: '#475569', fontSize: 11, lineHeight: 1.6, margin: '0 0 6px' }}>
                  A head chef used to spend 2–3 hours building a single dish spec. Now it's a conversation. Every element — generated, structured, connected to live data — in under 3 minutes.
                </p>

                <div style={{ padding: '9px 11px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>What's generated per dish</div>
                  {[
                    'Full recipe with portions, method, mise en place, batch notes',
                    'Ingredient list priced against live supplier data',
                    'Gross profit calculation and sell price suggestion',
                    '14-allergen matrix — auto-updated on any change',
                    'HACCP controls: CCPs, critical limits, corrective actions',
                    'Full nutritional breakdown per portion (kcal, protein, fat…)',
                    'FOH dish description, ready for menu printing',
                    'Wine and beverage pairing recommendations',
                    'Training notes for BOH and FOH staff',
                    'Live price tracking — recosted every time a supplier changes a price',
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
                      <span style={{ color: '#16a34a', fontSize: 9, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ color: '#374151', fontSize: 9.5, lineHeight: 1.45 }}>{t}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '9px 11px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Before this platform</div>
                  {[
                    '2–3 hours per dish spec',
                    'Allergen spreadsheets done manually',
                    'HACCP copied from a template',
                    'GP recalculated only at month end',
                  ].map((t) => (
                    <div key={t} style={{ fontSize: 9.5, color: '#94a3b8', textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </PageShell>

          {/* ═══════════════════════════════════════════════════════════
              PAGE 3 — LIVE PRICING & SUPPLIER ECOSYSTEM
          ═══════════════════════════════════════════════════════════ */}
          <PageShell n={3}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', minHeight: 0 }}>
              {/* Left — callouts */}
              <div style={{ padding: '16px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Badge text="Live Price Intelligence" />
                <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  Supplier changes price.<br />
                  <span style={{ color: T }}>Your dishes recost themselves.</span>
                </h2>
                <p style={{ color: '#475569', fontSize: 10.5, lineHeight: 1.6, margin: '0 0 4px' }}>
                  Connect your existing suppliers once. Every price update cascades through every linked recipe instantly. You see exactly which dishes are affected — and by how much — before it costs you.
                </p>

                <Bullet text="Sub-second propagation: supplier updates their portal, every linked dish recoasts immediately" />
                <Bullet text="Margin drift flagged the morning after any price change — before service, before it hits your P&L" />
                <Bullet text="Ingredient substitution suggestions when GP drops below target" />
                <Bullet text="Suppliers maintain their own catalogues — you never enter a price manually again" />
                <Bullet text="Two-tier supply chain visibility: see what your supplier is paying their vendor" />
                <Bullet text="SFTP overnight sync: suppliers drop files, data updates before morning prep" />
                <Bullet text="Invoice PDF scanning: upload a delivery note, line items extracted and reconciled automatically" />
                <Bullet text="B2B messaging: all supplier communication in one auditable thread — no lost WhatsApp chains" />

                <div style={{ marginTop: 4, padding: '9px 11px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Typical impact</div>
                  {[
                    'Salmon price +8p → flagged 06:12. Dish recosted before morning service.',
                    'Fish & Chips GP drops to 61% → alert sent + substitute suggested.',
                    '3 dishes exceed budget threshold → review list ready before weekly meeting.',
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 4 }}>
                      <span style={{ color: '#0284c7', fontSize: 9, flexShrink: 0, marginTop: 1 }}>→</span>
                      <span style={{ color: '#374151', fontSize: 9, lineHeight: 1.45 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — mocks */}
              <div style={{ background: '#f1f5f9', padding: '16px 28px 14px 12px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {/* Full recipe costing table */}
                <MockBar title="recipe costing — all dishes" live>
                  <div style={{ padding: '5px 11px 2px', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8 }}>
                    {['Dish', 'Cost', 'Sell', 'GP'].map(h => (
                      <span key={h} style={{ color: '#334155', fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                    ))}
                  </div>
                  {[
                    { name: 'Pan-Seared Sea Trout', cost: '£3.87', sell: '£14.50', gp: '73%', alert: true },
                    { name: 'Beef Burger & Fries', cost: '£3.85', sell: '£12.00', gp: '68%', alert: false },
                    { name: 'Mushroom Risotto', cost: '£2.95', sell: '£11.50', gp: '74%', alert: false },
                    { name: 'Fish & Chips', cost: '£5.10', sell: '£15.50', gp: '67%', alert: true },
                    { name: 'Caesar Salad', cost: '£2.40', sell: '£10.00', gp: '76%', alert: false },
                    { name: 'Chicken Supreme', cost: '£3.60', sell: '£13.00', gp: '72%', alert: false },
                  ].map((d, i) => (
                    <div key={i} style={{ padding: '5px 11px', borderTop: '1px solid rgba(255,255,255,0.04)', background: d.alert ? 'rgba(248,113,113,0.04)' : 'transparent', display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, alignItems: 'center' }}>
                      <span style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {d.alert && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#f87171', display: 'inline-block', flexShrink: 0 }} />}
                        {d.name}
                      </span>
                      <span style={{ color: '#64748b', fontSize: 8, fontFamily: 'monospace', textAlign: 'right' }}>{d.cost}</span>
                      <span style={{ color: '#475569', fontSize: 8, fontFamily: 'monospace', textAlign: 'right' }}>{d.sell}</span>
                      <span style={{ color: parseInt(d.gp) >= 70 ? '#2dd4bf' : '#f59e0b', fontSize: 9, fontWeight: 800, textAlign: 'right' }}>{d.gp}</span>
                    </div>
                  ))}
                  <div style={{ padding: '5px 11px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#f87171', fontSize: 7.5, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#f87171', display: 'inline-block' }} />
                      2 dishes flagged after overnight salmon price update
                    </span>
                    <span style={{ color: '#2dd4bf', fontSize: 7.5 }}>Synced 06:12</span>
                  </div>
                </MockBar>

                {/* Supplier portal */}
                <MockBar title="supplier portal — Coastal Fresh Ltd">
                  <div style={{ padding: '8px 11px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ color: '#cbd5e1', fontSize: 9.5, fontWeight: 700 }}>Coastal Fresh Ltd</span>
                      <span style={{ color: T, fontSize: 7.5, fontWeight: 700, background: 'rgba(13,148,136,0.1)', padding: '1px 7px', borderRadius: 3 }}>ACTIVE · 124 products</span>
                    </div>
                    {[
                      { item: 'Salmon fillet 140g', old: '£4.12', new: '£4.20', change: '+1.9%', up: true },
                      { item: 'Sea trout fillet 140g', old: '£3.79', new: '£3.87', change: '+2.1%', up: true },
                      { item: 'Cod loin 180g', old: '£5.05', new: '£5.10', change: '+1.0%', up: true },
                      { item: 'Sea bass 200g', old: '£6.80', new: '£6.80', change: '—', up: false },
                    ].map((r, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, padding: '4px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none', alignItems: 'center' }}>
                        <span style={{ color: '#94a3b8', fontSize: 8.5 }}>{r.item}</span>
                        <span style={{ color: '#475569', fontSize: 8, textDecoration: 'line-through' }}>{r.old}</span>
                        <span style={{ color: '#e2e8f0', fontSize: 8.5, fontFamily: 'monospace' }}>{r.new}</span>
                        <span style={{ color: r.up ? '#f87171' : '#475569', fontSize: 8, fontWeight: 700 }}>{r.change}</span>
                      </div>
                    ))}
                    <div style={{ color: '#334155', fontSize: 7, marginTop: 5 }}>Supplier updated their own portal · All linked dishes recosted automatically · No action needed from you</div>
                  </div>
                </MockBar>

                {/* B2B message */}
                <MockBar title="messages — Coastal Fresh Ltd">
                  <div style={{ padding: '8px 11px' }}>
                    {[
                      { from: 'You', msg: 'Price on sea trout — any flexibility this week?', time: '08:14', mine: true },
                      { from: 'Coastal Fresh', msg: 'Wholesale market up 3% this week. Best we can do is £3.87. Updated on portal — your dishes will have recosted already.', time: '08:18', mine: false },
                    ].map((m, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
                        <div style={{ background: m.mine ? T : 'rgba(255,255,255,0.06)', color: m.mine ? '#fff' : '#cbd5e1', fontSize: 8.5, padding: '5px 9px', borderRadius: 7, maxWidth: '85%', lineHeight: 1.45 }}>{m.msg}</div>
                        <span style={{ color: '#334155', fontSize: 7, marginTop: 2 }}>{m.time}</span>
                      </div>
                    ))}
                  </div>
                </MockBar>
              </div>
            </div>
          </PageShell>

          {/* ═══════════════════════════════════════════════════════════
              PAGE 4 — COMPLIANCE, TRAINING & FRONT OF HOUSE
          ═══════════════════════════════════════════════════════════ */}
          <PageShell n={4}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', minHeight: 0 }}>
              {/* Left — mocks */}
              <div style={{ background: '#f1f5f9', padding: '16px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 9 }}>
                <Badge text="Compliance · Training · Front of House" />
                <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  Audit-ready every day.<br />
                  <span style={{ color: T }}>Staff always current.</span>
                </h2>

                {/* Pre-service briefing */}
                <MockBar title="pre-service allergen briefing — lunch service">
                  <div style={{ padding: '8px 11px' }}>
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ color: '#64748b', fontSize: 8, marginBottom: 3 }}>Staff sign-in</div>
                      {[
                        { name: 'Jamie Smith', role: 'Head Chef', signed: true },
                        { name: 'Maria Garcia', role: 'Sous Chef', signed: true },
                        { name: 'Tom Lee', role: 'FOH Lead', signed: true },
                        { name: 'New Start', role: 'KP', signed: false },
                      ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <span style={{ color: '#e2e8f0', fontSize: 8.5 }}>{s.name} <span style={{ color: '#475569' }}>· {s.role}</span></span>
                          <span style={{ color: s.signed ? T : '#f87171', fontSize: 8, fontWeight: 700 }}>{s.signed ? '✓ SIGNED' : 'PENDING'}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 5, padding: '5px 8px' }}>
                      <div style={{ color: '#fca5a5', fontSize: 7.5, fontWeight: 800, marginBottom: 2 }}>HIGH RISK TODAY</div>
                      <div style={{ color: '#94a3b8', fontSize: 8 }}>Pan-Seared Sea Trout — Fish, Dairy, Sulphites present · New item — brief all FOH</div>
                    </div>
                  </div>
                </MockBar>

                {/* Compliance tasks */}
                <MockBar title="compliance tasks — this week">
                  <div style={{ padding: '7px 11px' }}>
                    {[
                      { label: 'Mon — Pre-service allergen briefing', done: true, sig: 'J. Smith' },
                      { label: 'Mon — Fridge temperature log AM', done: true, sig: 'Auto' },
                      { label: 'Tue — Delivery note reconciliation', done: true, sig: 'M. Jones' },
                      { label: 'Tue — Pre-service briefing', done: true, sig: 'J. Smith' },
                      { label: 'Wed — HACCP weekly review', done: false, sig: '' },
                    ].map((t, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: t.done ? T : 'rgba(245,158,11,0.2)', border: t.done ? 'none' : '1px solid rgba(245,158,11,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 7, color: '#fff', fontWeight: 900 }}>
                          {t.done ? '✓' : ''}
                        </span>
                        <span style={{ color: t.done ? '#475569' : '#fbbf24', fontSize: 8.5, flex: 1, textDecoration: t.done ? 'line-through' : 'none' }}>{t.label}</span>
                        {t.sig && <span style={{ color: '#334155', fontSize: 7.5 }}>{t.sig}</span>}
                      </div>
                    ))}
                    <div style={{ color: T, fontSize: 7.5, marginTop: 5, fontWeight: 700 }}>4/5 complete · All timestamped & signed · Inspection-ready</div>
                  </div>
                </MockBar>

                {/* Training tracker */}
                <MockBar title="training — staff certifications">
                  <div style={{ padding: '7px 11px' }}>
                    {[
                      { name: 'Jamie Smith', cert: 'Level 3 Food Safety', expires: 'Jan 2027', status: 'current' },
                      { name: 'Maria Garcia', cert: 'Level 2 Food Safety', expires: 'Jun 2025', status: 'due' },
                      { name: 'Tom Lee', cert: 'Allergen Awareness', expires: 'Mar 2026', status: 'current' },
                      { name: 'New Start', cert: 'Induction', expires: 'Ongoing', status: 'in_progress' },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <div>
                          <div style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 600 }}>{s.name}</div>
                          <div style={{ color: '#64748b', fontSize: 7.5 }}>{s.cert}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: s.status === 'due' ? '#f87171' : s.status === 'in_progress' ? '#fbbf24' : T, fontSize: 8, fontWeight: 700 }}>
                            {s.status === 'due' ? 'DUE SOON' : s.status === 'in_progress' ? 'IN PROGRESS' : 'CURRENT'}
                          </div>
                          <div style={{ color: '#334155', fontSize: 7.5 }}>{s.expires}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </MockBar>
              </div>

              {/* Right — callouts */}
              <div style={{ padding: '16px 28px 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ color: '#475569', fontSize: 10.5, lineHeight: 1.6, margin: '0 0 4px' }}>
                  Every task timestamped. Every signature captured. Every briefing recorded. Inspectors don't care about your intentions — they want evidence. This gives you that evidence, automatically.
                </p>

                <div style={{ padding: '9px 11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Compliance</div>
                  <Bullet text="Evidence captured as work happens — timestamps, photos, signatures" />
                  <Bullet text="One-click FSA, HSE, and local authority inspection reports" />
                  <Bullet text="Pre-service allergen briefings with digital staff sign-off" />
                  <Bullet text="Temperature logs, HACCP records, delivery checks all in one place" />
                </div>

                <div style={{ padding: '9px 11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Training</div>
                  <Bullet text="Training content generated from your real menu and processes" />
                  <Bullet text="Certifications tracked with automatic expiry reminders" />
                  <Bullet text="Onboarding that mirrors how your kitchen actually works" />
                  <Bullet text="Auto-updates when menus or procedures change" />
                </div>

                <div style={{ padding: '9px 11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Front of House</div>
                  <Bullet text="FOH always knows exactly what's on — specials, 86'd items, allergen notes" />
                  <Bullet text="Allergen answers without 'I'll just check in the kitchen'" />
                  <Bullet text="Dish descriptions and wine pairings generated and kept current" />
                  <Bullet text="Fewer errors, fewer complaints, better guest experience" />
                </div>

                <div style={{ marginTop: 2, padding: '9px 11px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8 }}>
                  <div style={{ fontSize: 8.5, fontWeight: 800, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>You'll never again</div>
                  {[
                    'Scramble to find paperwork before an inspection',
                    'Chase staff for signed compliance forms',
                    'Brief FOH verbally and hope they remember',
                    'Let a certification expire by accident',
                  ].map(t => (
                    <div key={t} style={{ fontSize: 9, color: '#94a3b8', textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </PageShell>

          {/* ═══════════════════════════════════════════════════════════
              PAGE 5 — MULTI-SITE, ANALYTICS & CLOSE
          ═══════════════════════════════════════════════════════════ */}
          <PageShell n={5}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', minHeight: 0 }}>
              {/* Left — callouts + comparison */}
              <div style={{ padding: '16px 12px 14px 28px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Badge text="Multi-Site · Analytics · Close" />
                <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  Every site.<br />
                  <span style={{ color: T }}>One view. Always live.</span>
                </h2>
                <p style={{ color: '#475569', fontSize: 10.5, lineHeight: 1.6, margin: '0 0 4px' }}>
                  See which sites are compliant, which are overspending, which have GP problems — across your entire estate, in real time. One platform. All connected.
                </p>

                <Bullet text="Regional and site-level GP, compliance, and spend dashboards" />
                <Bullet text="Centralised buying power with local menu execution" />
                <Bullet text="Top 10 waste drivers with root cause analysis" />
                <Bullet text="Spend analytics by supplier, category, and location" />
                <Bullet text="Margin analysis at recipe, menu item, and portion level" />

                {/* Comparison table */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', marginTop: 4 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: MID }}>
                    <div style={{ padding: '5px 10px', color: '#2dd4bf', fontSize: 8.5, fontWeight: 800 }}>HospitalitySupport.uk</div>
                    <div style={{ padding: '5px 10px', color: '#475569', fontSize: 8.5, fontWeight: 800, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>Everyone else</div>
                  </div>
                  {[
                    ['Live in 5 minutes', '6-week implementation'],
                    ['Dish concept → live in 3 min', 'Hours of chef admin per dish'],
                    ['Allergens auto-generated', 'Manual spreadsheet updates'],
                    ['HACCP built per dish', 'Copy-pasted from a template'],
                    ['Suppliers update themselves', 'You manually update prices'],
                    ['Live GP on every price change', 'Recalculated monthly'],
                    ['Built by operators', 'Built by developers'],
                  ].map((row, i) => (
                    <Win key={i} us={row[0]} them={row[1]} />
                  ))}
                </div>
              </div>

              {/* Right — mocks + CTA */}
              <div style={{ background: '#f1f5f9', padding: '16px 28px 14px 12px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {/* Group dashboard */}
                <MockBar title="group dashboard — all sites">
                  <div style={{ padding: '7px 11px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, marginBottom: 8 }}>
                      {[{ val: '6', label: 'Sites' }, { val: '71%', label: 'Avg GP' }, { val: '5/6', label: 'Compliant' }, { val: '£12.4k', label: 'This week' }].map(s => (
                        <div key={s.label} style={{ background: 'rgba(13,148,136,0.1)', borderRadius: 5, padding: '5px 6px', textAlign: 'center' }}>
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
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 8, alignItems: 'center', padding: '4px 0', borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                        <span style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 600 }}>{s.site}</span>
                        <span style={{ color: parseInt(s.gp) >= 70 ? '#2dd4bf' : '#f59e0b', fontSize: 8.5, fontWeight: 700 }}>{s.gp}</span>
                        <span style={{ color: s.comp ? T : '#f87171', fontSize: 8, fontWeight: 700 }}>{s.comp ? '✓' : '⚠'}</span>
                        <span style={{ color: '#475569', fontSize: 8, fontFamily: 'monospace' }}>{s.spend}</span>
                      </div>
                    ))}
                  </div>
                </MockBar>

                {/* Spend analytics */}
                <MockBar title="spend analytics — this month">
                  <div style={{ padding: '8px 11px' }}>
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
                          <div style={{ height: '100%', width: `${s.pct}%`, background: T, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </MockBar>

                {/* CTA */}
                <div style={{ background: MID, borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(13,148,136,0.3)', marginTop: 'auto' }}>
                  <div style={{ color: '#fff', fontWeight: 900, fontSize: 15, lineHeight: 1.2, marginBottom: 5 }}>
                    See your dishes recosting live. In 30 minutes.
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 9.5, lineHeight: 1.55, marginBottom: 11 }}>
                    We'll upload your actual recipes and connect a real supplier. You'll watch a dish concept become a fully priced, allergen-compliant, HACCP-controlled live dish — in front of you. No slides. No pitch deck. Just your operation on the platform.
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ background: T, color: '#fff', fontWeight: 900, fontSize: 11, padding: '8px 15px', borderRadius: 7 }}>
                      Request Your Demo →
                    </div>
                    <span style={{ color: '#334155', fontSize: 8.5 }}>HospitalitySupport.uk</span>
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
