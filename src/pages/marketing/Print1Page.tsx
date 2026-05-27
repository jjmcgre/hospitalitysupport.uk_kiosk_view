import { useState, useEffect, useRef } from 'react';
import { Link, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

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
  const { openBooking } = useBooking();
  const [linkCopied, setLinkCopied] = useState(false);
  const [scale, setScale] = useState(1);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const w = outerRef.current?.clientWidth;
      if (!w) return;
      setScale(Math.min(1, w / 794));
    };
    update();
    const ro = new ResizeObserver(update);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, []);
  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/one-pager`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };
  const caps = [
    { label: 'Cost & GP',              note: 'Live against your suppliers. Every dish, every day.' },
    { label: 'Menu & Recipe',           note: 'Full spec from plain English. Auto-recosted on any change.' },
    { label: 'Allergens',              note: 'All 14 tracked. Natasha\'s Law. Updates with every recipe change.' },
    { label: 'Food Safety & HACCP',    note: 'Evidence built as work happens. Always inspection-ready.' },
    { label: 'Staff Training',          note: 'Built from your real operation. Role-specific. Tracked.' },
    { label: 'Front of House',          note: 'Live menu knowledge for all FOH. Allergen answers on demand.' },
    { label: 'Ordering & Deliveries',  note: 'Shopping list auto-built from the menu. POs and delivery checks.' },
    { label: 'Supplier Pricing',        note: 'Suppliers update their own portal. Every change visible instantly.' },
  ];

  const scenarios = [
    { trigger: 'Supplier raises prices overnight',  outcome: 'Affected dishes flagged. GP recalculated. Adjustments presented before service.' },
    { trigger: 'New starter begins tomorrow',        outcome: 'Role-specific training sent to their phone today. Ready before day one.' },
    { trigger: 'EHO inspection — 48hrs notice',     outcome: 'All records current. Evidence already in order. Nothing to scramble for.' },
    { trigger: 'Menu changes mid-week',              outcome: 'Allergens, costs, HACCP and training all update in the same action.' },
    { trigger: 'Manager off sick',                   outcome: 'Compliance runs uninterrupted. No knowledge gap. No dropped ball.' },
  ];

  const comparisons = [
    { them: '6-week implementation',        us: 'Live in under 5 minutes' },
    { them: '2–3 hrs per dish spec',        us: 'Under 3 minutes, every time' },
    { them: 'Manual allergen spreadsheets', us: 'Auto-generated, always current' },
    { them: 'Monthly GP recalculation',     us: 'Live on every supplier change' },
    { them: 'Generic training content',     us: 'Built from your actual operation' },
  ];

  return (
    <div className={`${standalone ? 'min-h-screen' : 'min-h-full'} bg-slate-950 p-6`}>
      <div className="max-w-[900px] mx-auto" ref={outerRef}>
        <div className="flex items-center justify-between mb-6 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">1-Page Summary</h1>
            {!standalone && (
              <p className="text-slate-400 text-sm mt-1">Single A4 — save as PDF to email or print. Share via <span className="text-teal-400 font-mono">/one-pager</span></p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              className={`flex items-center gap-1.5 border font-semibold px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${linkCopied ? 'bg-teal-500/20 text-teal-300 border-teal-500/40' : 'bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600 hover:text-white'}`}
            >
              {linkCopied ? <Check size={14} /> : <Link size={14} />}
              {linkCopied ? 'Link Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={() => window.print()}
              className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Save as PDF / Print
            </button>
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
          @media print {
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            html, body { margin: 0; padding: 0; background: #080f1a !important; }
            .print-scale-wrap { transform: none !important; width: 210mm !important; height: auto !important; }
            .print-page { box-shadow: none !important; width: 210mm !important; height: 297mm !important; }
            .no-print { display: none !important; }
          }
          @page { size: A4 portrait; margin: 0; }
        `}</style>

        {/* ── A4 PAGE ── */}
        <div
          className="print-scale-wrap"
          style={{
            width: 794,
            height: 1123 * scale,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
          }}
        >
        <div
          className="print-page shadow-2xl"
          style={{
            width: 794, height: 1123,
            fontFamily: F, display: 'flex', flexDirection: 'column',
            background: NAV, position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Ambient glows */}
          <div style={{
            position: 'absolute', top: -80, left: '15%', width: 420, height: 260,
            background: 'rgba(20,184,166,0.09)', borderRadius: '50%',
            filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
          }} />
          <div style={{
            position: 'absolute', bottom: 40, right: '5%', width: 340, height: 220,
            background: 'rgba(20,184,166,0.06)', borderRadius: '50%',
            filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
          }} />

          {/* ── HEADER ── */}
          <div style={{
            position: 'relative', zIndex: 1, flexShrink: 0,
            padding: '11px 26px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderBottom: `1.5px solid ${T}`,
            background: 'rgba(8,15,26,0.9)',
          }}>
            <span style={{ color: W, fontWeight: 900, fontSize: 14, letterSpacing: '-0.02em' }}>
              HospitalitySupport<span style={{ color: TL }}>.uk</span>
            </span>
            <span style={{
              color: T3, fontSize: 9, fontWeight: 800,
              background: 'rgba(20,184,166,0.10)', border: '1px solid rgba(20,184,166,0.25)',
              borderRadius: 999, padding: '3px 12px', letterSpacing: '0.04em',
            }}>
              Full operations capability · from £100 per kitchen / month
            </span>
          </div>

          {/* ── HERO ── */}
          <div style={{
            position: 'relative', zIndex: 1, flexShrink: 0,
            padding: '20px 26px 18px',
            background: `linear-gradient(160deg, ${DARK} 0%, rgba(12,20,32,0.95) 100%)`,
            borderBottom: '1px solid rgba(45,212,191,0.12)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22 }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block', fontSize: 8, fontWeight: 800, color: TL,
                  textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 9,
                  borderLeft: `2px solid ${T}`, paddingLeft: 9,
                }}>
                  Built by chefs · for operators
                </div>
                <h1 style={{
                  color: W, fontSize: 27, fontWeight: 900, margin: '0 0 10px',
                  lineHeight: 1.05, letterSpacing: '-0.03em',
                }}>
                  Every area of your operation.<br />
                  <span style={{ color: TL }}>All connected. Always live.</span>
                </h1>
                <p style={{ color: S4, fontSize: 11, margin: 0, lineHeight: 1.6, maxWidth: 430 }}>
                  Ingredient prices change without warning. Margin drift goes unnoticed. Training is inconsistent. Compliance depends on whoever's in that week.{' '}
                  <span style={{ color: S3, fontWeight: 700 }}>HospitalitySupport.uk closes every gap — automatically, for £3.30 a day.</span>
                </p>
              </div>

              {/* Stats 2×2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flexShrink: 0 }}>
                {[
                  { val: '3 min',   label: 'dish to live spec' },
                  { val: '< 1 sec', label: 'recost on change' },
                  { val: '14',      label: 'allergens tracked' },
                  { val: '£3.30',   label: 'per kitchen / day' },
                ].map((s) => (
                  <div key={s.label} style={{
                    background: 'rgba(20,184,166,0.07)',
                    border: '1px solid rgba(20,184,166,0.18)',
                    borderRadius: 8, padding: '8px 12px', textAlign: 'center', minWidth: 90,
                  }}>
                    <div style={{ color: TL, fontSize: 16, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: S5, fontSize: 8, marginTop: 4, lineHeight: 1.2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── BODY — fills remaining height ── */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0, position: 'relative', zIndex: 1 }}>

            {/* LEFT */}
            <div style={{
              padding: '14px 12px 14px 26px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>

              {/* Capabilities */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  What it covers
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                  {caps.map((c, i) => (
                    <div key={i} style={{
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderLeft: `2px solid ${TL}`,
                      borderRadius: '0 7px 7px 0',
                    }}>
                      <div style={{ color: W, fontWeight: 800, fontSize: 11, marginBottom: 3 }}>{c.label}</div>
                      <div style={{ color: S5, fontSize: 9.5, lineHeight: 1.4 }}>{c.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenarios — flex: 1 so it fills leftover height */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  How it responds in practice
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {scenarios.map((s, i) => (
                    <div key={i} style={{
                      flex: 1,
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 7,
                      display: 'flex', gap: 9,
                    }}>
                      <div style={{ flexShrink: 0, width: 3, borderRadius: 3, background: 'rgba(248,113,113,0.55)', alignSelf: 'stretch' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ color: '#fca5a5', fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{s.trigger}</div>
                        <div style={{ color: S4, fontSize: 10.5, lineHeight: 1.45 }}>{s.outcome}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{
              padding: '14px 26px 14px 12px',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>

              {/* Pricing */}
              <div style={{
                flexShrink: 0,
                background: 'rgba(20,184,166,0.05)',
                border: '1px solid rgba(20,184,166,0.20)',
                borderRadius: 10, padding: '13px 14px',
              }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: TL, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 11 }}>
                  Pricing
                </div>
                {[
                  { tier: 'Standard venue',  price: '£100', period: '/month',    sub: 'Restaurants, pubs, cafés' },
                  { tier: 'Dark kitchen',    price: '£250', period: '/month',    sub: 'Production & dark kitchens' },
                  { tier: 'Multi-site',      price: '£100', period: '/kitchen',  sub: 'Groups & estate operators' },
                ].map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: i > 0 ? 9 : 0, marginTop: i > 0 ? 9 : 0,
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <div>
                      <div style={{ color: W, fontSize: 10.5, fontWeight: 800 }}>{p.tier}</div>
                      <div style={{ color: S5, fontSize: 8.5, marginTop: 2 }}>{p.sub}</div>
                    </div>
                    <div style={{ textAlign: 'right', lineHeight: 1 }}>
                      <span style={{ color: TL, fontSize: 19, fontWeight: 900 }}>{p.price}</span>
                      <span style={{ color: S5, fontSize: 9, marginLeft: 2 }}>{p.period}</span>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 10, paddingTop: 9, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {['Per kitchen, not per user', 'Annual billing', 'No setup fees'].map((t) => (
                    <span key={t} style={{
                      color: S6, fontSize: 8, fontWeight: 700,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 999, padding: '2px 8px',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Multi-site */}
              <div style={{
                flexShrink: 0,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10, padding: '11px 14px',
              }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: S4, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 9 }}>
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
                      <span style={{ color: S3, fontSize: 10, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why different — flex:1 fills remaining height */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 8, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                  Why it's different
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {comparisons.map((r, i) => (
                    <div key={i} style={{
                      flex: 1,
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 7, overflow: 'hidden',
                    }}>
                      <div style={{ padding: '0 10px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: S6, fontSize: 11, textDecoration: 'line-through', lineHeight: 1.4 }}>{r.them}</span>
                      </div>
                      <div style={{ padding: '0 10px', background: 'rgba(20,184,166,0.04)', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: TL, fontSize: 11, fontWeight: 700, lineHeight: 1.4 }}>{r.us}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── CTA ── */}
          <div style={{
            position: 'relative', zIndex: 1, flexShrink: 0,
            background: `linear-gradient(90deg, ${T} 0%, #0d9488 100%)`,
            padding: '14px 26px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ color: W, fontWeight: 900, fontSize: 13, letterSpacing: '-0.01em' }}>
                Book a 30-minute walkthrough. No slides. No pitch deck.
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, marginTop: 3 }}>
                We'll show the system on a real scenario — your dishes, your suppliers, your operation.
              </div>
            </div>
            {standalone ? (
              <a
                href="/demo?book=1"
                style={{
                  background: W, color: T, fontWeight: 900, fontSize: 11.5,
                  padding: '10px 20px', borderRadius: 8, whiteSpace: 'nowrap',
                  flexShrink: 0, letterSpacing: '-0.01em', textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)', display: 'block',
                }}
              >
                Book a demo →
              </a>
            ) : (
              <button
                onClick={openBooking}
                style={{
                  background: W, color: T, fontWeight: 900, fontSize: 11.5,
                  padding: '10px 20px', borderRadius: 8, whiteSpace: 'nowrap',
                  flexShrink: 0, letterSpacing: '-0.01em', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: 'none',
                }}
              >
                Book a demo →
              </button>
            )}
          </div>

        </div>
        </div>{/* print-scale-wrap */}
      </div>
    </div>
  );
}
