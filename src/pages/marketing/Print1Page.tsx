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
  const caps = [
    { label: 'Cost & GP',             note: 'Live against your suppliers. Every dish, every day.' },
    { label: 'Menu & Recipe',          note: 'Full spec from plain English. Auto-recosted on any change.' },
    { label: 'Allergens',             note: 'All 14 tracked. Natasha\'s Law. Updates with every recipe change.' },
    { label: 'Food Safety & HACCP',   note: 'Evidence built as work happens. Always inspection-ready.' },
    { label: 'Staff Training',         note: 'Built from your real operation. Role-specific. Tracked.' },
    { label: 'Front of House',         note: 'Live menu knowledge. Allergen answers on demand.' },
    { label: 'Ordering & Deliveries', note: 'Shopping list auto-built from the menu. POs and delivery checks.' },
    { label: 'Supplier Pricing',       note: 'Suppliers update their own portal. Every change visible instantly.' },
  ];

  const scenarios = [
    { trigger: 'Supplier raises prices overnight',  outcome: 'Dishes flagged. GP recalculated. Adjustments presented before service.' },
    { trigger: 'New starter begins tomorrow',        outcome: 'Role-specific training sent to their phone today. Ready before day one.' },
    { trigger: 'EHO inspection — 48hrs notice',     outcome: 'All records current. Evidence in order. Nothing to scramble for.' },
    { trigger: 'Menu changes mid-week',              outcome: 'Allergens, costs, HACCP and training all update in the same action.' },
  ];

  const comparisons = [
    { them: '6-week implementation',        us: 'Live in under 5 minutes' },
    { them: '2–3 hrs per dish spec',        us: 'Under 3 minutes, every time' },
    { them: 'Manual allergen spreadsheets', us: 'Auto-generated, always current' },
    { them: 'Monthly GP recalculation',     us: 'Live on every supplier change' },
  ];

  return (
    <div className={`${standalone ? 'min-h-screen' : 'min-h-full'} bg-slate-950 p-6`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            {standalone
              ? <p className="text-slate-400 text-sm">HospitalitySupport.uk · 1-Page Summary</p>
              : <>
                  <h1 className="text-white font-black text-2xl">1-Page Summary</h1>
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
            width: '210mm', height: '297mm', margin: '0 auto',
            fontFamily: F, display: 'flex', flexDirection: 'column',
            background: NAV, position: 'relative',
          }}
        >
          {/* Ambient glows */}
          <div style={{
            position: 'absolute', top: -60, left: '20%', width: 380, height: 240,
            background: 'rgba(20,184,166,0.08)', borderRadius: '50%',
            filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', bottom: 60, right: '8%', width: 280, height: 180,
            background: 'rgba(20,184,166,0.05)', borderRadius: '50%',
            filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
          }} />

          {/* ── HEADER ── */}
          <div style={{
            position: 'relative', zIndex: 1,
            padding: '10px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: `1.5px solid ${T}`,
            background: 'rgba(8,15,26,0.9)',
            flexShrink: 0,
          }}>
            <span style={{ color: W, fontWeight: 900, fontSize: 13.5, letterSpacing: '-0.02em' }}>
              HospitalitySupport<span style={{ color: TL }}>.uk</span>
            </span>
            <span style={{
              color: T3, fontSize: 8.5, fontWeight: 800,
              background: 'rgba(20,184,166,0.10)', border: '1px solid rgba(20,184,166,0.25)',
              borderRadius: 999, padding: '3px 11px', letterSpacing: '0.04em',
            }}>
              Full operations capability · from £100 per kitchen / month
            </span>
          </div>

          {/* ── HERO ── */}
          <div style={{
            position: 'relative', zIndex: 1,
            padding: '16px 24px 14px',
            background: `linear-gradient(160deg, ${DARK} 0%, rgba(12,20,32,0.95) 100%)`,
            borderBottom: '1px solid rgba(45,212,191,0.12)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block', fontSize: 7.5, fontWeight: 800, color: TL,
                  textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 7,
                  borderLeft: `2px solid ${T}`, paddingLeft: 8,
                }}>
                  Built by chefs · for operators
                </div>
                <h1 style={{
                  color: W, fontSize: 24, fontWeight: 900, margin: '0 0 8px',
                  lineHeight: 1.05, letterSpacing: '-0.03em',
                }}>
                  Every area of your operation.<br />
                  <span style={{ color: TL }}>All connected. Always live.</span>
                </h1>
                <p style={{ color: S4, fontSize: 10, margin: 0, lineHeight: 1.55, maxWidth: 420 }}>
                  Ingredient prices change without warning. Margin drift goes unnoticed. Training is inconsistent. Compliance depends on whoever's in that week.{' '}
                  <span style={{ color: S3, fontWeight: 700 }}>HospitalitySupport.uk closes every gap — automatically, for £3.30 a day.</span>
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, flexShrink: 0 }}>
                {[
                  { val: '3 min',   label: 'dish to live spec' },
                  { val: '< 1 sec', label: 'recost on change' },
                  { val: '14',      label: 'allergens tracked' },
                  { val: '£3.30',   label: 'per kitchen / day' },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: 'rgba(20,184,166,0.07)',
                    border: '1px solid rgba(20,184,166,0.18)',
                    borderRadius: 7, padding: '6px 11px', textAlign: 'center',
                  }}>
                    <div style={{ color: TL, fontSize: 15, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: S5, fontSize: 7.5, marginTop: 3, lineHeight: 1.2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BODY ── */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0, position: 'relative', zIndex: 1, overflow: 'hidden' }}>

            {/* LEFT */}
            <div style={{
              padding: '13px 11px 13px 24px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 12,
              overflow: 'hidden',
            }}>
              {/* Capabilities */}
              <div>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 7 }}>
                  What it covers
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  {caps.map((c, i) => (
                    <div key={i} style={{
                      padding: '7px 9px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderLeft: `2px solid ${TL}`,
                      borderRadius: '0 6px 6px 0',
                    }}>
                      <div style={{ color: W, fontWeight: 800, fontSize: 9, marginBottom: 2 }}>{c.label}</div>
                      <div style={{ color: S5, fontSize: 7.5, lineHeight: 1.35 }}>{c.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenarios */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 7 }}>
                  How it responds in practice
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {scenarios.map((s, i) => (
                    <div key={i} style={{
                      padding: '7px 9px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 7,
                      display: 'flex', gap: 8, flex: 1,
                    }}>
                      <div style={{ flexShrink: 0, width: 3, borderRadius: 3, background: 'rgba(248,113,113,0.5)', alignSelf: 'stretch' }} />
                      <div>
                        <div style={{ color: '#fca5a5', fontSize: 9, fontWeight: 700, marginBottom: 2 }}>{s.trigger}</div>
                        <div style={{ color: S4, fontSize: 8, lineHeight: 1.4 }}>{s.outcome}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{
              padding: '13px 24px 13px 11px',
              display: 'flex', flexDirection: 'column', gap: 10,
              overflow: 'hidden',
            }}>

              {/* Pricing */}
              <div style={{
                background: 'rgba(20,184,166,0.05)',
                border: '1px solid rgba(20,184,166,0.20)',
                borderRadius: 9, padding: '11px 13px',
                flexShrink: 0,
              }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: TL, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 9 }}>
                  Pricing
                </div>
                {[
                  { tier: 'Standard venue',  price: '£100', period: '/month',    sub: 'Restaurants, pubs, cafés' },
                  { tier: 'Dark kitchen',    price: '£250', period: '/month',    sub: 'Production & dark kitchens' },
                  { tier: 'Multi-site',      price: '£100', period: '/kitchen',  sub: 'Groups & estate operators' },
                ].map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: i > 0 ? 7 : 0, marginTop: i > 0 ? 7 : 0,
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <div>
                      <div style={{ color: W, fontSize: 10, fontWeight: 800 }}>{p.tier}</div>
                      <div style={{ color: S5, fontSize: 8, marginTop: 1 }}>{p.sub}</div>
                    </div>
                    <div style={{ textAlign: 'right', lineHeight: 1 }}>
                      <span style={{ color: TL, fontSize: 17, fontWeight: 900 }}>{p.price}</span>
                      <span style={{ color: S5, fontSize: 8.5, marginLeft: 2 }}>{p.period}</span>
                    </div>
                  </div>
                ))}
                <div style={{
                  marginTop: 9, paddingTop: 8,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', gap: 5, flexWrap: 'wrap',
                }}>
                  {['Per kitchen, not per user', 'Annual billing', 'No setup fees'].map((t) => (
                    <span key={t} style={{
                      color: S6, fontSize: 7.5, fontWeight: 700,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 999, padding: '2px 7px',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Multi-site */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 9, padding: '10px 13px',
                flexShrink: 0,
              }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: S4, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  Multi-site operators
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 10px' }}>
                  {[
                    'Central visibility across every kitchen',
                    'Consistent standards — no site chasing',
                    'GP tracked and compared per location',
                    'Scales without adding management overhead',
                    'Shared supplier relationships group-wide',
                    'Group compliance reporting on demand',
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                      <div style={{
                        width: 11, height: 11, borderRadius: 3,
                        background: 'rgba(20,184,166,0.15)',
                        border: '1px solid rgba(20,184,166,0.30)',
                        flexShrink: 0, marginTop: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 6.5, color: TL, fontWeight: 900,
                      }}>✓</div>
                      <span style={{ color: S3, fontSize: 8, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why different */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 7 }}>
                  Why it's different
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {comparisons.map((r, i) => (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 6, overflow: 'hidden',
                    }}>
                      <div style={{ padding: '5px 8px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: S6, fontSize: 8, textDecoration: 'line-through', lineHeight: 1.4 }}>{r.them}</span>
                      </div>
                      <div style={{ padding: '5px 8px', background: 'rgba(20,184,166,0.04)' }}>
                        <span style={{ color: TL, fontSize: 8, fontWeight: 700, lineHeight: 1.4 }}>{r.us}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: `linear-gradient(90deg, ${T} 0%, #0d9488 100%)`,
            padding: '12px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexShrink: 0,
          }}>
            <div>
              <div style={{ color: W, fontWeight: 900, fontSize: 12.5, letterSpacing: '-0.01em' }}>
                Book a 30-minute walkthrough. No slides. No pitch deck.
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9.5, marginTop: 2 }}>
                We'll show the system on a real scenario — your dishes, your suppliers, your operation.
              </div>
            </div>
            <div style={{
              background: W, color: T, fontWeight: 900, fontSize: 11,
              padding: '9px 18px', borderRadius: 8, whiteSpace: 'nowrap',
              flexShrink: 0, letterSpacing: '-0.01em',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}>
              hospitalitysupport.uk →
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
