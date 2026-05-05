/*
  1-Pager — A4 portrait, 210×297mm.
  Audience: business owners and commercial directors.
  Brand: dark navy #080f1a, teal #14b8a6 / #2dd4bf, white text.
*/
const NAV  = '#080f1a';
const DARK = '#0f1623';
const UI   = '#1a2535';
const T    = '#14b8a6';
const TL   = '#2dd4bf';
const T3   = '#99f6e4';
const W    = '#ffffff';
const S3   = '#cbd5e1';
const S4   = '#94a3b8';
const S5   = '#64748b';
const S6   = '#475569';
const S8   = '#1e293b';
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
          {/* Subtle grid overlay */}
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
              A full operations team · from £100 per kitchen per month
            </span>
          </div>

          {/* HERO */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: DARK, padding: '18px 28px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <h1 style={{
              color: W, fontSize: 24, fontWeight: 900, margin: 0,
              lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: 520,
            }}>
              Your kitchens are costing more<br />
              <span style={{ color: TL }}>than your P&L shows.</span>
            </h1>
            <p style={{ color: S4, fontSize: 11, marginTop: 8, lineHeight: 1.65, maxWidth: 540 }}>
              Most hospitality businesses lose 4–7 points of gross profit every quarter — not through bad decisions, but through slow ones. Ingredient prices change. Margin drift goes unnoticed. Training is inconsistent. Compliance relies on whoever is in that week. HospitalitySupport.uk closes every one of those gaps, continuously, for £3.30 a day.
            </p>
          </div>

          {/* THE HIDDEN COST STRIP */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'rgba(15,23,42,0.6)', padding: '10px 28px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{
              fontSize: 8, fontWeight: 800, color: S5,
              textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8,
            }}>
              Where the margin goes — and how it's recovered
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {[
                { problem: 'Supplier price rise',   fix: 'Flagged immediately. Options presented. Spec updated.',       saving: 'GP protected' },
                { problem: 'New starter on shift',  fix: 'Role-specific training sent to their phone before day one.',  saving: 'No margin lost to errors' },
                { problem: 'EHO inspection notice', fix: 'All records current. Evidence already in order.',             saving: 'No audit scramble' },
                { problem: 'Manager stretched thin', fix: 'Operational tasks handled automatically. Capacity returned.', saving: 'Focus on growth' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8, padding: '8px 9px',
                }}>
                  <div style={{ color: '#f87171', fontSize: 8.5, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{s.problem}</div>
                  <div style={{ color: S4, fontSize: 8, lineHeight: 1.45, marginBottom: 5 }}>{s.fix}</div>
                  <div style={{
                    color: TL, fontSize: 7.5, fontWeight: 800,
                    background: 'rgba(45,212,191,0.08)',
                    border: '1px solid rgba(45,212,191,0.2)',
                    borderRadius: 4, padding: '2px 6px', display: 'inline-block',
                  }}>{s.saving}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0, position: 'relative', zIndex: 1 }}>

            {/* LEFT — what the team does */}
            <div style={{
              background: DARK, padding: '14px 12px 14px 28px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ fontSize: 8, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Your operations team — always on
              </div>

              {[
                {
                  role: 'GP & Cost Controller',
                  desc: 'Monitors every dish against your GP targets. Flags supplier price changes the moment they happen. Presents adjustment options. Keeps your margins live — not month-end.',
                },
                {
                  role: 'Menu Development Chef',
                  desc: 'Builds menus and dish specs around your kitchen, your skill level, your service pressure. Recosts automatically when ingredients change.',
                },
                {
                  role: 'Allergen Specialist',
                  desc: 'All 14 allergens tracked across your menu. Updates automatically when recipes change. Natasha\'s Law compliance maintained without manual intervention.',
                },
                {
                  role: 'Compliance Lead',
                  desc: 'Food safety records maintained continuously. Evidence built as work happens. When an inspector arrives, everything is already in order — because it always is.',
                },
                {
                  role: 'Training Manager',
                  desc: 'Role-specific training plans built from your actual operation. Sent to staff directly. Completions tracked. New starters ready before their first shift.',
                },
                {
                  role: 'Front-of-House Specialist',
                  desc: 'Allergen queries answered accurately. Service standards documented. FOH product knowledge current whenever the menu changes.',
                },
              ].map((c, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 9, padding: '7px 9px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8,
                }}>
                  <span style={{
                    color: TL, fontWeight: 900, fontSize: 11,
                    lineHeight: 1.3, flexShrink: 0, marginTop: 1,
                  }}>→</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 9.5, color: W, marginBottom: 2 }}>{c.role}</div>
                    <div style={{ fontSize: 8.5, color: S4, lineHeight: 1.5 }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — commercial case + how it works */}
            <div style={{
              background: 'rgba(15,22,35,0.7)', padding: '14px 28px 14px 14px',
              display: 'flex', flexDirection: 'column', gap: 9,
            }}>

              {/* The commercial case */}
              <div style={{
                background: 'rgba(20,184,166,0.06)',
                border: '1px solid rgba(20,184,166,0.18)',
                borderRadius: 9, padding: '10px 11px',
              }}>
                <div style={{
                  fontSize: 8, fontWeight: 800, color: TL,
                  textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6,
                }}>The commercial case</div>
                {[
                  { label: '1 kitchen at 68% GP vs 71% target', value: '−£1,200/mo per site' },
                  { label: '4 sites · same drift undetected',   value: '−£57,600/yr' },
                  { label: 'HospitalitySupport.uk · 4 kitchens', value: '£400/mo' },
                  { label: 'Return on first GP improvement',    value: '3× in month one' },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '4px 0',
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <span style={{ color: S4, fontSize: 8.5 }}>{r.label}</span>
                    <span style={{
                      color: i === 3 ? TL : i >= 2 ? T3 : '#fca5a5',
                      fontSize: 9, fontWeight: 800,
                    }}>{r.value}</span>
                  </div>
                ))}
              </div>

              {/* How it works */}
              <div>
                <div style={{ fontSize: 8, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
                  How it works
                </div>
                {[
                  { step: '01', title: 'Just send a message', body: 'No new software. No dashboards. No training required. Your team asks a question. The operations team responds.' },
                  { step: '02', title: 'Built from your operation', body: 'Your menus. Your suppliers. Your kitchen. Every answer is specific to your business — not a generic template.' },
                  { step: '03', title: 'Always current', body: 'When prices change, when menus update, when a new starter joins — the system keeps pace. Nothing goes stale.' },
                  { step: '04', title: 'One flat price per kitchen', body: 'No per-user fees. No tiered plans. £100/month per kitchen. Whether your team is 3 or 30.' },
                ].map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 9, padding: '7px 9px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 8, marginBottom: i < 3 ? 5 : 0,
                  }}>
                    <span style={{
                      color: S6, fontSize: 9, fontWeight: 900,
                      flexShrink: 0, width: 18, paddingTop: 1,
                    }}>{s.step}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 9.5, color: W, marginBottom: 2 }}>{s.title}</div>
                      <div style={{ fontSize: 8.5, color: S4, lineHeight: 1.5 }}>{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Multi-site note */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 9, padding: '9px 11px',
              }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: S4, textTransform: 'uppercase', letterSpacing: '0.10em', marginBottom: 5 }}>
                  Multi-site operators
                </div>
                {[
                  'Central visibility across every kitchen',
                  'Consistent standards — no site-by-site chasing',
                  'GP performance tracked per location',
                  'Scales without adding management overhead',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: i < 3 ? 4 : 0 }}>
                    <span style={{
                      width: 10, height: 10, borderRadius: 2,
                      background: T, flexShrink: 0, marginTop: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 7, color: W, fontWeight: 900,
                    }}>✓</span>
                    <span style={{ color: S3, fontSize: 8.5, lineHeight: 1.4 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS BAR */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'rgba(10,18,30,0.9)', padding: '10px 28px',
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6,
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            {[
              { val: '£3.30',  label: 'Per kitchen / day' },
              { val: '6',      label: 'Specialists in your team' },
              { val: '24/7',   label: 'Always available' },
              { val: '14',     label: 'Allergens tracked' },
              { val: '0',      label: 'Per-user fees' },
              { val: '< 1 min', label: 'Response time' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ color: TL, fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: S5, fontSize: 7.5, marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: T, padding: '12px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ color: W, fontWeight: 900, fontSize: 13 }}>Book a 20-minute walkthrough. No slides. No pitch deck.</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, marginTop: 2 }}>We'll show you the system working on a real scenario — your operation, your questions, your context.</div>
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
