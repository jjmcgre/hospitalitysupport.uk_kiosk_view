import { useState, useEffect, useRef } from 'react';
import { Link, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

/*
  1-Pager — A4 portrait 794×1123px at 96dpi.
  Visual language mirrors DishJourneySection / landing page exactly:
  bg #080f1a, slate-900 panels, teal-400 accents, traffic-light window chrome,
  monospace labels, ghost numbers, white headlines.
*/

const PAGE_W = 794;
const PAGE_H = 1123;

// Exact brand tokens matching the landing page
const BG    = '#080f1a';
const PANEL = '#0d1424';
const CARD  = '#111827';
const T     = '#14b8a6';
const TL    = '#2dd4bf';
const W     = '#ffffff';
const S3    = '#cbd5e1';
const S4    = '#94a3b8';
const S5    = '#64748b';
const S6    = '#475569';
const F     = "'Inter', system-ui, sans-serif";
const FM    = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace";

function MockWindow({ title, children, live }: { title: string; children: React.ReactNode; live?: boolean }) {
  return (
    <div style={{
      background: PANEL, borderRadius: 14,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      {/* Chrome bar */}
      <div style={{
        background: '#0a1120', padding: '7px 14px',
        display: 'flex', alignItems: 'center', gap: 6,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(239,68,68,0.5)', display: 'inline-block' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(234,179,8,0.5)', display: 'inline-block' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(34,197,94,0.5)', display: 'inline-block' }} />
        <span style={{ color: S6, fontSize: 8.5, fontFamily: FM, marginLeft: 8, flex: 1 }}>{title}</span>
        {live && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: TL, display: 'inline-block' }} />
            <span style={{ color: TL, fontSize: 7.5, fontWeight: 700, fontFamily: FM }}>LIVE</span>
          </span>
        )}
      </div>
      <div style={{ padding: '12px 14px' }}>{children}</div>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span style={{
      display: 'inline-block',
      background: 'rgba(20,184,166,0.10)',
      border: '1px solid rgba(45,212,191,0.30)',
      color: TL, fontSize: 8, fontWeight: 800,
      letterSpacing: '0.12em', textTransform: 'uppercase' as const,
      borderRadius: 999, padding: '3px 10px',
    }}>{text}</span>
  );
}

export default function Print1Page({ standalone = false }: { standalone?: boolean }) {
  const { openBooking } = useBooking();
  const [linkCopied, setLinkCopied] = useState(false);
  const [scale, setScale] = useState(1);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const w = outerRef.current?.clientWidth ?? 0;
      if (!w) return;
      setScale(Math.min(1, w / PAGE_W));
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

  const scaledW = Math.round(PAGE_W * scale);
  const scaledH = Math.round(PAGE_H * scale);

  return (
    <div className="print1-outer bg-slate-950 py-6 px-4" style={{ minHeight: standalone ? '100vh' : '100%' }} ref={outerRef}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { margin: 0 !important; padding: 0 !important; background: #080f1a !important; }
          .no-print { display: none !important; }
          .print1-outer { padding: 0 !important; margin: 0 !important; background: transparent !important; }
          .print1-centering { width: auto !important; height: auto !important; overflow: visible !important; margin: 0 !important; }
          .print1-scaler { width: 210mm !important; transform: none !important; }
          .print-page { box-shadow: none !important; width: 210mm !important; height: 297mm !important; overflow: hidden !important; margin: 0 !important; }
        }
        @page { size: A4 portrait; margin: 0; }
      `}</style>

      {/* Toolbar */}
      <div className="no-print flex items-center justify-between mb-5 max-w-screen-xl mx-auto">
        <div>
          <h1 className="text-white font-black text-2xl">1-Page Summary</h1>
          {!standalone && (
            <p className="text-slate-400 text-sm mt-1">Single A4 portrait — save as PDF to email or print. Share via <span className="text-teal-400 font-mono">/one-pager</span></p>
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

      {/* Centering container */}
      <div
        className="print1-centering mx-auto overflow-hidden"
        style={{ width: scaledW, height: scaledH }}
      >
        <div
          className="print1-scaler"
          style={{ width: PAGE_W, transformOrigin: 'top left', transform: `scale(${scale})` }}
        >

          {/* ── A4 PAGE ── */}
          <div
            className="print-page"
            style={{
              width: PAGE_W, height: PAGE_H,
              fontFamily: F, background: BG,
              display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Subtle grid overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px', opacity: 0.02,
            }} />

            {/* ── HEADER ── */}
            <div style={{
              position: 'relative', zIndex: 1, flexShrink: 0,
              padding: '10px 28px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: `1.5px solid ${T}`,
              background: 'rgba(10,17,32,0.98)',
            }}>
              <span style={{ color: W, fontWeight: 900, fontSize: 14, letterSpacing: '-0.02em' }}>
                ServiceSupport<span style={{ color: TL }}>.UK</span>
              </span>
              <span style={{
                color: TL, fontSize: 8.5, fontWeight: 800,
                background: 'rgba(20,184,166,0.10)', border: '1px solid rgba(45,212,191,0.25)',
                borderRadius: 999, padding: '3px 12px', letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                Full operations · from £100 / kitchen / month
              </span>
            </div>

            {/* ── HERO ── */}
            <div style={{
              position: 'relative', zIndex: 1, flexShrink: 0,
              padding: '18px 28px 16px',
              background: 'rgba(13,20,36,0.95)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'inline-block', fontSize: 7.5, fontWeight: 800, color: TL,
                    textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 8,
                    borderLeft: `2px solid ${T}`, paddingLeft: 9,
                  }}>
                    Built by operators · for operators
                  </div>
                  <h1 style={{
                    color: W, fontSize: 27, fontWeight: 900, margin: '0 0 9px',
                    lineHeight: 1.05, letterSpacing: '-0.03em',
                  }}>
                    Every area of your operation.<br />
                    <span style={{ color: TL }}>All connected. Always live.</span>
                  </h1>
                  <p style={{ color: S4, fontSize: 11, margin: 0, lineHeight: 1.6, maxWidth: 400 }}>
                    Ingredient prices change without warning. Margin drift goes unnoticed. Training is inconsistent. Compliance depends on whoever's in that week.{' '}
                    <span style={{ color: S3, fontWeight: 700 }}>ServiceSupport.UK closes every gap — automatically, for £3.30 a day.</span>
                  </p>
                </div>

                {/* Stats 2×2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flexShrink: 0 }}>
                  {[
                    { val: '3 min',   label: 'dish to live spec' },
                    { val: '< 1 sec', label: 'recost on change'  },
                    { val: '14',      label: 'allergens tracked' },
                    { val: '£3.30',   label: 'per kitchen / day' },
                  ].map((s) => (
                    <div key={s.label} style={{
                      background: 'rgba(20,184,166,0.08)',
                      border: '1px solid rgba(45,212,191,0.20)',
                      borderRadius: 8, padding: '8px 12px', textAlign: 'center', minWidth: 88,
                    }}>
                      <div style={{ color: TL, fontSize: 16, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                      <div style={{ color: S5, fontSize: 8, marginTop: 4, lineHeight: 1.2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── BODY ── */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0, position: 'relative', zIndex: 1 }}>

              {/* ── LEFT COLUMN ── */}
              <div style={{
                padding: '14px 12px 14px 28px',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>

                {/* What it covers */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                    What it covers
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                    {[
                      { label: 'Cost & GP',             note: 'Live against your suppliers. Every dish, every day.' },
                      { label: 'Menu & Recipe',          note: 'Full spec from plain English. Auto-recosted on any change.' },
                      { label: 'Allergens',              note: "All 14 tracked. Natasha's Law. Updates with every recipe change." },
                      { label: 'Food Safety & HACCP',   note: 'Evidence built as work happens. Always inspection-ready.' },
                      { label: 'Staff Training',         note: 'Built from your real operation. Role-specific. Tracked.' },
                      { label: 'Front of House',         note: 'Live menu knowledge for all FOH. Allergen answers on demand.' },
                      { label: 'Ordering & Deliveries', note: 'Shopping list auto-built from the menu. POs and delivery checks.' },
                      { label: 'Supplier Pricing',       note: 'Suppliers update their own portal. Every change visible instantly.' },
                    ].map((c, i) => (
                      <div key={i} style={{
                        padding: '7px 9px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderLeft: `2px solid ${TL}`,
                        borderRadius: '0 7px 7px 0',
                      }}>
                        <div style={{ color: W, fontWeight: 800, fontSize: 10.5, marginBottom: 2 }}>{c.label}</div>
                        <div style={{ color: S5, fontSize: 8.5, lineHeight: 1.35 }}>{c.note}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How it responds */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                    How it responds in practice
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {[
                      { trigger: 'Supplier raises prices overnight',  outcome: 'Affected dishes flagged. GP recalculated. Adjustments presented before service.' },
                      { trigger: 'New starter begins tomorrow',        outcome: 'Role-specific training sent to their phone today. Ready before day one.' },
                      { trigger: 'EHO inspection — 48hrs notice',     outcome: 'All records current. Evidence already in order. Nothing to scramble for.' },
                      { trigger: 'Menu changes mid-week',              outcome: 'Allergens, costs, HACCP and training all update in the same action.' },
                      { trigger: 'Manager off sick',                   outcome: 'Compliance runs uninterrupted. No knowledge gap. No dropped ball.' },
                    ].map((s, i) => (
                      <div key={i} style={{
                        flex: 1, padding: '8px 10px',
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.055)',
                        borderRadius: 7, display: 'flex', gap: 9,
                      }}>
                        <div style={{ flexShrink: 0, width: 2.5, borderRadius: 3, background: 'rgba(248,113,113,0.55)', alignSelf: 'stretch' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <div style={{ color: '#fca5a5', fontSize: 10.5, fontWeight: 700, marginBottom: 2 }}>{s.trigger}</div>
                          <div style={{ color: S4, fontSize: 9.5, lineHeight: 1.4 }}>{s.outcome}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div style={{
                padding: '14px 28px 14px 12px',
                display: 'flex', flexDirection: 'column', gap: 11,
              }}>

                {/* The dish journey — compact mock */}
                <MockWindow title="hospitality support — dish live in 3 min" live>
                  {/* Step 1: concept */}
                  <div style={{ marginBottom: 9 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                      <Tag text="01 — Concept" />
                      <span style={{ color: S6, fontSize: 8, fontFamily: FM }}>0:30</span>
                    </div>
                    <div style={{
                      background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(45,212,191,0.18)',
                      borderRadius: 7, padding: '6px 10px',
                      color: S3, fontSize: 9, lineHeight: 1.5, fontStyle: 'italic',
                    }}>
                      "Spring fish special — elegant, max 5 ingredients, 70%+ GP, works on a junior chef section, pairs with white Burgundy."
                    </div>
                  </div>

                  {/* Step 2: recipe */}
                  <div style={{ marginBottom: 9 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                      <Tag text="02 — Recipe Built" />
                      <span style={{ color: S6, fontSize: 8, fontFamily: FM }}>1:15</span>
                    </div>
                    <div style={{ background: CARD, borderRadius: 7, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div style={{ padding: '5px 10px', background: 'rgba(0,0,0,0.25)', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: W, fontSize: 9, fontWeight: 700 }}>Pan-Seared Sea Trout, Lemon Beurre Blanc</span>
                        <span style={{ color: TL, fontSize: 9, fontWeight: 800, background: 'rgba(20,184,166,0.12)', padding: '0 6px', borderRadius: 4 }}>GP: 73%</span>
                      </div>
                      {[
                        { item: 'Sea trout fillet 140g', qty: '140g', cost: '£3.20', sup: 'Coastal Fresh' },
                        { item: 'Unsalted butter',        qty: '30g',  cost: '£0.18', sup: 'Premier Foods' },
                        { item: 'Lemon',                  qty: '½',    cost: '£0.12', sup: 'Fresh Direct'  },
                        { item: 'White wine',             qty: '50ml', cost: '£0.28', sup: 'Cellar Direct' },
                        { item: 'Dill (garnish)',          qty: '5g',   cost: '£0.09', sup: 'Fresh Direct'  },
                      ].map((r, i) => (
                        <div key={i} style={{
                          display: 'flex', gap: 6, padding: '3px 10px',
                          borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: 8.5, alignItems: 'center',
                        }}>
                          <span style={{ color: S4, flex: 1 }}>{r.item}</span>
                          <span style={{ color: S6, width: 28, textAlign: 'right' }}>{r.qty}</span>
                          <span style={{ color: TL, fontFamily: FM, fontWeight: 700, width: 32, textAlign: 'right' }}>{r.cost}</span>
                          <span style={{ color: S6, width: 68, textAlign: 'right', fontSize: 8 }}>{r.sup}</span>
                        </div>
                      ))}
                      <div style={{ padding: '4px 10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: 8.5 }}>
                        <span style={{ color: S5 }}>Total ingredient cost</span>
                        <span style={{ color: W, fontWeight: 800 }}>£3.87</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: allergens */}
                  <div style={{ marginBottom: 9 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
                      <Tag text="03 — Allergens" />
                      <span style={{ color: S6, fontSize: 8, fontFamily: FM }}>1:45</span>
                    </div>
                    <div style={{ background: CARD, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7, padding: '8px 10px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
                        {[
                          { n: 'Gluten', p: false }, { n: 'Crustaceans', p: false }, { n: 'Eggs', p: false },
                          { n: 'Fish', p: true }, { n: 'Peanuts', p: false }, { n: 'Soya', p: false },
                          { n: 'Dairy', p: true }, { n: 'Nuts', p: false }, { n: 'Celery', p: false },
                          { n: 'Mustard', p: false }, { n: 'Sesame', p: false }, { n: 'Sulphites', p: true },
                          { n: 'Lupin', p: false }, { n: 'Molluscs', p: false },
                        ].map(a => (
                          <span key={a.n} style={{
                            fontSize: 7.5, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                            background: a.p ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.04)',
                            color: a.p ? '#fca5a5' : S6,
                            border: `1px solid ${a.p ? 'rgba(239,68,68,0.30)' : 'rgba(255,255,255,0.07)'}`,
                          }}>
                            {a.p ? '⚠ ' : ''}{a.n}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: TL, fontSize: 8, fontWeight: 600 }}>3 allergens present · Auto-generated</span>
                        <span style={{ color: S6, fontSize: 8 }}>Natasha's Law compliant</span>
                      </div>
                    </div>
                  </div>

                  {/* Steps 04-06 inline summary */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
                    {[
                      { n: '04', label: 'HACCP', note: 'CCPs generated per dish. Inspection-ready on day one.', time: '2:10' },
                      { n: '05', label: 'Nutrition', note: 'Per portion breakdown. Auto-updates on any recipe change.', time: '2:40' },
                      { n: '06', label: 'Fully Live', note: 'Spec, allergens, HACCP, pricing, training — all live.', time: '3:00' },
                    ].map((s) => (
                      <div key={s.n} style={{
                        background: 'rgba(20,184,166,0.05)', border: '1px solid rgba(45,212,191,0.15)',
                        borderRadius: 7, padding: '7px 8px',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ color: TL, fontWeight: 900, fontSize: 9, fontFamily: FM }}>{s.n}</span>
                          <span style={{ color: S6, fontSize: 8, fontFamily: FM }}>{s.time}</span>
                        </div>
                        <div style={{ color: W, fontWeight: 800, fontSize: 9, marginBottom: 3 }}>{s.label}</div>
                        <div style={{ color: S5, fontSize: 8, lineHeight: 1.4 }}>{s.note}</div>
                      </div>
                    ))}
                  </div>
                </MockWindow>

                {/* Pricing */}
                <div style={{
                  flexShrink: 0, background: 'rgba(20,184,166,0.05)',
                  border: '1px solid rgba(45,212,191,0.20)', borderRadius: 10, padding: '11px 14px',
                }}>
                  <div style={{ fontSize: 7.5, fontWeight: 800, color: TL, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 9 }}>Pricing</div>
                  {[
                    { tier: 'Standard venue',  price: '£100', period: '/month',   sub: 'Restaurants, pubs, cafés' },
                    { tier: 'Dark kitchen',    price: '£250', period: '/month',   sub: 'Production & dark kitchens' },
                    { tier: 'Multi-site',      price: '£100', period: '/kitchen', sub: 'Groups & estate operators' },
                  ].map((p, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      paddingTop: i > 0 ? 8 : 0, marginTop: i > 0 ? 8 : 0,
                      borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}>
                      <div>
                        <div style={{ color: W, fontSize: 10.5, fontWeight: 800 }}>{p.tier}</div>
                        <div style={{ color: S5, fontSize: 8.5, marginTop: 1 }}>{p.sub}</div>
                      </div>
                      <div style={{ textAlign: 'right', lineHeight: 1 }}>
                        <span style={{ color: TL, fontSize: 19, fontWeight: 900 }}>{p.price}</span>
                        <span style={{ color: S5, fontSize: 8.5, marginLeft: 2 }}>{p.period}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {['Per kitchen, not per user', 'Annual billing', 'No setup fees'].map((t) => (
                      <span key={t} style={{
                        color: S6, fontSize: 7.5, fontWeight: 700,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 999, padding: '2px 8px',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Why different */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 7.5, fontWeight: 800, color: S5, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
                    Why it's different
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {[
                      { them: '6-week implementation',        us: 'Live in under 5 minutes' },
                      { them: '2–3 hrs per dish spec',        us: 'Under 3 minutes, every time' },
                      { them: 'Manual allergen spreadsheets', us: 'Auto-generated, always current' },
                      { them: 'Monthly GP recalculation',     us: 'Live on every supplier change' },
                      { them: 'Generic training content',     us: 'Built from your actual operation' },
                    ].map((r, i) => (
                      <div key={i} style={{
                        flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr',
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.055)',
                        borderRadius: 7, overflow: 'hidden',
                      }}>
                        <div style={{ padding: '0 10px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center' }}>
                          <span style={{ color: S6, fontSize: 10.5, textDecoration: 'line-through', lineHeight: 1.4 }}>{r.them}</span>
                        </div>
                        <div style={{ padding: '0 10px', background: 'rgba(20,184,166,0.04)', display: 'flex', alignItems: 'center' }}>
                          <span style={{ color: TL, fontSize: 10.5, fontWeight: 700, lineHeight: 1.4 }}>{r.us}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* ── CTA FOOTER ── */}
            <div style={{
              position: 'relative', zIndex: 1, flexShrink: 0,
              background: `linear-gradient(90deg, ${T} 0%, #0d9488 100%)`,
              padding: '13px 28px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ color: W, fontWeight: 900, fontSize: 13.5, letterSpacing: '-0.01em' }}>
                  Book a 30-minute walkthrough. No slides. No pitch deck.
                </div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10.5, marginTop: 2 }}>
                  We'll show the system on a real scenario — your dishes, your suppliers, your operation.
                </div>
              </div>
              {standalone ? (
                <a
                  href="/demo?book=1"
                  style={{
                    background: W, color: T, fontWeight: 900, fontSize: 12,
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
                    background: W, color: T, fontWeight: 900, fontSize: 12,
                    padding: '10px 20px', borderRadius: 8, whiteSpace: 'nowrap',
                    flexShrink: 0, letterSpacing: '-0.01em', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: 'none',
                  }}
                >
                  Book a demo →
                </button>
              )}
            </div>

          </div>{/* print-page */}
        </div>{/* print1-scaler */}
      </div>{/* print1-centering */}
    </div>
  );
}
