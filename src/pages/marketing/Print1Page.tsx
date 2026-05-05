/*
  1-Pager — A4 portrait, 210×297mm.
  Audience: business owners and commercial directors.
  Brand: dark navy #080f1a, teal #14b8a6 / #2dd4bf, white text.
*/
const NAV  = '#080f1a';
const DARK = '#0f1623';
const T    = '#14b8a6';
const TL   = '#2dd4bf';
const T3   = '#99f6e4';
const W    = '#ffffff';
const S3   = '#cbd5e1';
const S4   = '#94a3b8';
const S5   = '#64748b';
const S6   = '#475569';
const F    = "'Inter', system-ui, sans-serif";

export default function Print1Page({ standalone = false }: { standalone?: boolean }) {
  return (
    <div className={`${standalone ? 'min-h-screen' : 'min-h-full'} bg-slate-950 p-6`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            {standalone
              ? <p className="text-slate-400 text-sm">HospitalitySupport.uk · 1-Page Summary</p>
              : <><h1 className="text-white font-black text-2xl">1-Page Summary</h1>
                  <p className="text-slate-400 text-sm mt-1">Single A4 — save as PDF to email or print. Share via <span className="text-teal-400 font-mono">/one-pager</span></p>
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
            body { margin: 0; background: #080f1a !important; }
            .print-page { box-shadow: none !important; }
            .no-print { display: none !important; }
          }
          @page { size: A4 portrait; margin: 0; }
        `}</style>

        {/* ── A4 PAGE ── */}
        <div
          className="print-page shadow-2xl overflow-hidden"
          style={{
            width: '210mm', minHeight: '297mm', margin: '0 auto',
            fontFamily: F, display: 'flex', flexDirection: 'column',
            background: NAV, position: 'relative',
          }}
        >
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px', opacity: 0.025, zIndex: 0,
          }} />

          {/* TOP BAR */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'rgba(15,22,35,0.95)', padding: '11px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: `2px solid ${T}`,
          }}>
            <span style={{ color: W, fontWeight: 900, fontSize: 15, letterSpacing: '-0.02em' }}>
              HospitalitySupport<span style={{ color: TL }}>.uk</span>
            </span>
            <span style={{
              color: T3, fontSize: 9.5, fontWeight: 800,
              background: 'rgba(20,184,166,0.10)', border: '1px solid rgba(20,184,166,0.25)',
              borderRadius: 999, padding: '3px 12px', letterSpacing: '0.05em',
            }}>
              Full operations capability · from £100 per kitchen per month
            </span>
          </div>

          {/* HERO */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: DARK, padding: '20px 28px 18px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <h1 style={{
              color: W, fontSize: 26, fontWeight: 900, margin: '0 0 6px',
              lineHeight: 1.05, letterSpacing: '-0.03em',
            }}>
              Your kitchens are costing more{' '}
              <span style={{ color: TL }}>than your P&L shows.</span>
            </h1>
            <p style={{ color: S4, fontSize: 10.5, margin: 0, lineHeight: 1.6, maxWidth: 580 }}>
              Ingredient prices change without warning. Margin drift goes unnoticed until month end. Training is inconsistent. Compliance relies on whoever happens to be in that week.{' '}
              <span style={{ color: S3, fontWeight: 600 }}>HospitalitySupport.uk closes every one of those gaps — automatically, for £3.30 a day.</span>
            </p>
          </div>

          {/* KEY NUMBERS */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'rgba(10,18,30,0.8)', padding: '12px 28px',
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            {[
              { val: '£3.30',   label: 'per kitchen / day' },
              { val: '3 min',   label: 'dish concept to live spec' },
              { val: '14',      label: 'allergens tracked' },
              { val: '< 1 sec', label: 'to recost on price change' },
              { val: '0',       label: 'per-user fees' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ color: TL, fontSize: 18, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: S5, fontSize: 7.5, marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* MAIN BODY */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0, position: 'relative', zIndex: 1 }}>

            {/* LEFT — capabilities */}
            <div style={{
              background: DARK, padding: '16px 14px 16px 28px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ fontSize: 8, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>
                What it covers
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                {[
                  { icon: '↗', label: 'Cost & GP',               note: 'Live against your suppliers. Flags changes before they hit the P&L.' },
                  { icon: '◈', label: 'Menu & Recipe',            note: 'Full spec from a plain-English description. Auto-recosted on any price change.' },
                  { icon: '⚑', label: 'Allergens & Nutrition',    note: 'All 14 tracked. Natasha\'s Law compliant. Updates when recipes change.' },
                  { icon: '✓', label: 'Compliance & Food Safety', note: 'Evidence built as work happens. Always inspection-ready.' },
                  { icon: '▸', label: 'Staff Training',           note: 'Built from your real ops. Role-specific. Sent direct. Tracked.' },
                  { icon: '◇', label: 'Front of House',           note: 'Live menu knowledge for all FOH. Allergen answers on demand.' },
                  { icon: '⊡', label: 'Ordering & Deliveries',    note: 'Shopping list auto-built from the menu. POs and delivery checking built in.' },
                  { icon: '⊞', label: 'Supplier Pricing',         note: 'Suppliers update their own portal. You see every price change instantly.' },
                ].map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '8px 10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 7,
                  }}>
                    <span style={{ color: TL, fontSize: 10, fontWeight: 900, flexShrink: 0, width: 14, marginTop: 1 }}>{c.icon}</span>
                    <div>
                      <div style={{ color: W, fontWeight: 800, fontSize: 9.5, marginBottom: 1 }}>{c.label}</div>
                      <div style={{ color: S5, fontSize: 8, lineHeight: 1.4 }}>{c.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div style={{
              background: 'rgba(15,22,35,0.7)', padding: '16px 28px 16px 14px',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>

              {/* Scenario strip */}
              <div>
                <div style={{ fontSize: 8, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  Common scenarios — handled automatically
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {[
                    { trigger: 'Supplier price rises overnight',  outcome: 'Affected dishes flagged. GP recalculated. Adjustments presented.' },
                    { trigger: 'New starter begins tomorrow',     outcome: 'Role-specific training sent to their phone today.' },
                    { trigger: 'EHO inspection — 48hrs notice',  outcome: 'All records current. Evidence already in order.' },
                    { trigger: 'Menu changes mid-week',          outcome: 'Allergens, costs, and training all update automatically.' },
                  ].map((s, i) => (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '1fr auto',
                      gap: 8, padding: '7px 10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 7,
                    }}>
                      <div>
                        <div style={{ color: '#f87171', fontSize: 8.5, fontWeight: 700, marginBottom: 2 }}>{s.trigger}</div>
                        <div style={{ color: S4, fontSize: 8, lineHeight: 1.4 }}>{s.outcome}</div>
                      </div>
                      <span style={{
                        color: TL, fontSize: 7, fontWeight: 800,
                        background: 'rgba(45,212,191,0.08)',
                        border: '1px solid rgba(45,212,191,0.18)',
                        borderRadius: 4, padding: '2px 6px',
                        alignSelf: 'center', whiteSpace: 'nowrap',
                      }}>handled</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div style={{
                background: 'rgba(20,184,166,0.06)',
                border: '1px solid rgba(20,184,166,0.20)',
                borderRadius: 9, padding: '12px 13px',
              }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: TL, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
                  Pricing
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { tier: 'Standard venue',   price: '£100 / month', sub: 'Restaurants, pubs, cafés' },
                    { tier: 'Dark kitchen',     price: '£250 / month', sub: 'Production & dark kitchens' },
                    { tier: 'Multi-site',       price: '£100 / kitchen', sub: 'Groups & estate operators' },
                  ].map((p, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: i > 0 ? 6 : 0,
                      borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      <div>
                        <div style={{ color: W, fontSize: 9.5, fontWeight: 700 }}>{p.tier}</div>
                        <div style={{ color: S5, fontSize: 8 }}>{p.sub}</div>
                      </div>
                      <div style={{ color: TL, fontSize: 12, fontWeight: 900, textAlign: 'right' }}>{p.price}</div>
                    </div>
                  ))}
                </div>
                <div style={{ color: S6, fontSize: 7.5, marginTop: 8, paddingTop: 7, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  Per kitchen, not per user · Annual billing · No setup fees · Whole team, one flat fee
                </div>
              </div>

              {/* Multi-site */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 9, padding: '10px 12px',
              }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: S4, textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 8 }}>
                  Multi-site operators
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 14px' }}>
                  {[
                    'Central visibility across every kitchen',
                    'Consistent standards — no site-by-site chasing',
                    'GP tracked per location',
                    'Scales without adding management overhead',
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                      <span style={{
                        width: 9, height: 9, borderRadius: 2,
                        background: T, flexShrink: 0, marginTop: 2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 6, color: W, fontWeight: 900,
                      }}>✓</span>
                      <span style={{ color: S3, fontSize: 8, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* CTA */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: T, padding: '13px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ color: W, fontWeight: 900, fontSize: 13 }}>Book a 30-minute walkthrough. No slides. No pitch deck.</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9.5, marginTop: 2 }}>We'll show the system working on a real scenario — your dishes, your suppliers, your operation.</div>
            </div>
            <div style={{
              background: W, color: T, fontWeight: 900, fontSize: 11,
              padding: '9px 18px', borderRadius: 8, whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              hospitalitysupport.uk →
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
