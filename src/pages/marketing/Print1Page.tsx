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
    { label: 'Cost & GP',               note: 'Live against your suppliers. Every dish, every day.' },
    { label: 'Menu & Recipe',            note: 'Full spec from plain English. Auto-recosted on any change.' },
    { label: 'Allergens',               note: 'All 14 tracked. Natasha\'s Law. Updates with every recipe change.' },
    { label: 'Food Safety & HACCP',     note: 'Evidence built as work happens. Always inspection-ready.' },
    { label: 'Staff Training',           note: 'Built from your real operation. Role-specific. Tracked.' },
    { label: 'Front of House',           note: 'Live menu knowledge for all FOH. Allergen answers on demand.' },
    { label: 'Ordering & Deliveries',   note: 'Shopping list auto-built from the menu. POs and delivery checking.' },
    { label: 'Supplier Pricing',         note: 'Suppliers update their own portal. You see every change instantly.' },
  ];

  const scenarios = [
    { trigger: 'Supplier raises prices overnight',  outcome: 'Affected dishes flagged. GP recalculated. Adjustments presented before service.' },
    { trigger: 'New starter begins tomorrow',        outcome: 'Role-specific training sent to their phone today. Ready before day one.' },
    { trigger: 'EHO inspection — 48hrs notice',     outcome: 'All records current. Evidence already in order. Nothing to scramble for.' },
    { trigger: 'Menu changes mid-week',              outcome: 'Allergens, costs, HACCP, and training all update in the same action.' },
    { trigger: 'Manager off sick',                   outcome: 'Compliance runs uninterrupted. No knowledge gap. No dropped ball.' },
  ];

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
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: -60, left: '20%', width: 420, height: 280,
            background: 'rgba(20,184,166,0.07)', borderRadius: '50%',
            filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', bottom: 80, right: '10%', width: 320, height: 200,
            background: 'rgba(20,184,166,0.05)', borderRadius: '50%',
            filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
          }} />

          {/* ── HEADER ── */}
          <div style={{
            position: 'relative', zIndex: 1,
            padding: '12px 28px 11px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: `1.5px solid ${T}`,
            background: 'rgba(8,15,26,0.9)',
          }}>
            <span style={{ color: W, fontWeight: 900, fontSize: 14, letterSpacing: '-0.02em' }}>
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
            padding: '22px 28px 20px',
            background: `linear-gradient(160deg, ${DARK} 0%, rgba(12,20,32,0.95) 100%)`,
            borderBottom: '1px solid rgba(45,212,191,0.12)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block', fontSize: 7.5, fontWeight: 800, color: TL,
                  textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 8,
                  borderLeft: `2px solid ${T}`, paddingLeft: 8,
                }}>
                  Built by chefs · for operators
                </div>
                <h1 style={{
                  color: W, fontSize: 28, fontWeight: 900, margin: '0 0 10px',
                  lineHeight: 1.0, letterSpacing: '-0.035em',
                }}>
                  Every area of your operation.<br />
                  <span style={{ color: TL }}>All connected. Always live.</span>
                </h1>
                <p style={{ color: S4, fontSize: 10.5, margin: 0, lineHeight: 1.6, maxWidth: 460 }}>
                  Ingredient prices change without warning. Margin drift goes unnoticed. Training is inconsistent. Compliance depends on whoever's in that week.
                  HospitalitySupport.uk closes every one of those gaps — continuously, automatically, for <span style={{ color: S3, fontWeight: 700 }}>£3.30 a day</span>.
                </p>
              </div>

              {/* Stat pills — vertical stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
                {[
                  { val: '3 min',   label: 'dish to live spec' },
                  { val: '< 1 sec', label: 'to recost on price change' },
                  { val: '14',      label: 'allergens tracked' },
                  { val: '£3.30',   label: 'per kitchen / day' },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: 'rgba(20,184,166,0.07)',
                    border: '1px solid rgba(20,184,166,0.18)',
                    borderRadius: 7, padding: '5px 12px',
                    display: 'flex', alignItems: 'center', gap: 8, minWidth: 140,
                  }}>
                    <span style={{ color: TL, fontSize: 14, fontWeight: 900, lineHeight: 1, flexShrink: 0 }}>{s.val}</span>
                    <span style={{ color: S5, fontSize: 7.5, lineHeight: 1.3 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BODY ── */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0, position: 'relative', zIndex: 1 }}>

            {/* LEFT — capabilities + scenarios */}
            <div style={{
              padding: '16px 12px 16px 28px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>

              {/* Capabilities grid */}
              <div>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 9 }}>
                  What it covers
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                  {caps.map((c, i) => (
                    <div key={i} style={{
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderLeft: `2px solid ${TL}`,
                      borderRadius: '0 6px 6px 0',
                    }}>
                      <div style={{ color: W, fontWeight: 800, fontSize: 9, marginBottom: 2 }}>{c.label}</div>
                      <div style={{ color: S5, fontSize: 7.5, lineHeight: 1.4 }}>{c.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenarios */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 9 }}>
                  How it responds in practice
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {scenarios.map((s, i) => (
                    <div key={i} style={{
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 7,
                      display: 'flex', gap: 8,
                    }}>
                      <div style={{ flexShrink: 0, width: 5, borderRadius: 3, background: 'rgba(248,113,113,0.5)', alignSelf: 'stretch' }} />
                      <div>
                        <div style={{ color: '#fca5a5', fontSize: 8.5, fontWeight: 700, marginBottom: 2 }}>{s.trigger}</div>
                        <div style={{ color: S4, fontSize: 8, lineHeight: 1.45 }}>{s.outcome}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT — pricing + multi-site + why */}
            <div style={{
              padding: '16px 28px 16px 14px',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>

              {/* Pricing */}
              <div style={{
                background: 'rgba(20,184,166,0.05)',
                border: '1px solid rgba(20,184,166,0.20)',
                borderRadius: 10, padding: '13px 14px',
              }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: TL, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>
                  Pricing
                </div>
                {[
                  { tier: 'Standard venue',   price: '£100', period: '/month',   sub: 'Restaurants, pubs, cafés' },
                  { tier: 'Dark kitchen',     price: '£250', period: '/month',   sub: 'Production & dark kitchens' },
                  { tier: 'Multi-site',       price: '£100', period: '/kitchen', sub: 'Groups & estate operators' },
                ].map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: i > 0 ? '8px 0 0' : '0',
                    marginTop: i > 0 ? 8 : 0,
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <div>
                      <div style={{ color: W, fontSize: 10, fontWeight: 800 }}>{p.tier}</div>
                      <div style={{ color: S5, fontSize: 8, marginTop: 1 }}>{p.sub}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: TL, fontSize: 18, fontWeight: 900, lineHeight: 1 }}>{p.price}</span>
                      <span style={{ color: S5, fontSize: 8.5, marginLeft: 2 }}>{p.period}</span>
                    </div>
                  </div>
                ))}
                <div style={{
                  marginTop: 10, paddingTop: 9,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', gap: 6, flexWrap: 'wrap',
                }}>
                  {['Per kitchen, not per user', 'Annual billing', 'No setup fees', 'No per-user fees'].map((t) => (
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
                borderRadius: 10, padding: '12px 14px',
              }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: S4, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 9 }}>
                  Multi-site operators
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
                  {[
                    'Central visibility across every kitchen',
                    'Consistent standards — no site chasing',
                    'GP tracked and compared per location',
                    'Scales without adding management overhead',
                    'Shared supplier relationships group-wide',
                    'Group compliance reporting on demand',
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <div style={{
                        width: 12, height: 12, borderRadius: 3,
                        background: 'rgba(20,184,166,0.15)',
                        border: '1px solid rgba(20,184,166,0.30)',
                        flexShrink: 0, marginTop: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 7, color: TL, fontWeight: 900,
                      }}>✓</div>
                      <span style={{ color: S3, fontSize: 8, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why different */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 9 }}>
                  Why it's different
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {[
                    { them: '6-week implementation',        us: 'Live in under 5 minutes' },
                    { them: '2–3 hrs per dish spec',        us: 'Under 3 minutes, every time' },
                    { them: 'Manual allergen spreadsheets', us: 'Auto-generated, always current' },
                    { them: 'Monthly GP recalculation',     us: 'Live on every supplier change' },
                    { them: 'Generic training content',     us: 'Built from your actual operation' },
                  ].map((r, i) => (
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

          {/* ── CTA BAR ── */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: `linear-gradient(90deg, ${T} 0%, #0d9488 100%)`,
            padding: '13px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ color: W, fontWeight: 900, fontSize: 13, letterSpacing: '-0.01em' }}>
                Book a 30-minute walkthrough. No slides. No pitch deck.
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9.5, marginTop: 2 }}>
                We'll show the system working on a real scenario — your dishes, your suppliers, your operation.
              </div>
            </div>
            <div style={{
              background: W, color: T, fontWeight: 900, fontSize: 11,
              padding: '10px 20px', borderRadius: 8, whiteSpace: 'nowrap',
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
