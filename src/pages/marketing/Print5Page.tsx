import React, { useState, useEffect, useRef } from 'react';
import { Link, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

/*
  5-Pager — A4 portrait, 794×1123px at 96dpi.
  Brand: dark navy #080f1a, teal #14b8a6 / #2dd4bf, white text.
  Matches HospitalitySupport.uk landing page visual language exactly.
*/
const NAV   = '#080f1a';
const DARK  = '#0f1623';
const UI    = '#1a2535';
const T     = '#14b8a6';
const TL    = '#2dd4bf';
const T3    = '#99f6e4';
const W     = '#ffffff';
const S4    = '#94a3b8';
const S5    = '#64748b';
const S6    = '#475569';
const S8    = '#1e293b';
const F     = "'Inter', system-ui, sans-serif";

/* ── Shared primitives ──────────────────────────────────────────────── */

const PW = 1123; // page width px (landscape)
const PH = 794;  // page height px (landscape)

function Page({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div
      className="print-page shadow-2xl overflow-hidden"
      style={{
        width: PW, height: PH, margin: '0 auto',
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

      {/* Header */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(15,22,35,0.95)', padding: '7px 20mm',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0,
      }}>
        <span style={{ color: W, fontWeight: 900, fontSize: 13, letterSpacing: '-0.02em' }}>
          HospitalitySupport<span style={{ color: TL }}>.uk</span>
        </span>
        <span style={{ color: S6, fontSize: 8, fontWeight: 600 }}>Page {n} of 5</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(10,18,30,0.9)', borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '5px 20mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
      }}>
        <span style={{ color: S8, fontSize: 7.5 }}>Built by operators, for operators · No 6-week onboarding · No consultants</span>
        <span style={{ color: T, fontSize: 7.5, fontWeight: 700 }}>hospitalitysupport.uk</span>
      </div>
    </div>
  );
}

// Teal pill badge
function Badge({ text }: { text: string }) {
  return (
    <span style={{
      display: 'inline-block',
      background: 'rgba(20,184,166,0.10)', border: '1px solid rgba(20,184,166,0.25)',
      color: T3, fontSize: 7.5, fontWeight: 800, letterSpacing: '0.12em',
      textTransform: 'uppercase' as const, padding: '3px 10px', borderRadius: 999,
    }}>
      {text}
    </span>
  );
}

// Dark card — matches bg-slate-900/60 border border-white/8
function Card({ children, teal, style }: { children: React.ReactNode; teal?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: teal ? 'rgba(20,184,166,0.08)' : 'rgba(255,255,255,0.04)',
      border: teal ? '1px solid rgba(20,184,166,0.20)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10, padding: '10px 12px',
      ...style,
    }}>
      {children}
    </div>
  );
}

// Dark UI window (platform mockup)
function DarkWindow({ title, live, children }: { title: string; live?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ background: UI, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{
        background: NAV, padding: '5px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: S5, fontSize: 7.5, fontFamily: 'monospace' }}>{title}</span>
        {live && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: TL, display: 'inline-block' }} />
            <span style={{ color: TL, fontSize: 7, fontWeight: 700 }}>LIVE</span>
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// Arrow list — teal arrow + slate-400 text
function Arrows({ items, size = 9.5 }: { items: string[]; size?: number }) {
  return (
    <ul style={{ margin: '0', padding: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 7, marginBottom: 5, alignItems: 'flex-start' }}>
          <span style={{ color: TL, fontSize: size + 1, lineHeight: 1.4, flexShrink: 0, fontWeight: 700 }}>→</span>
          <span style={{ color: S4, fontSize: size, lineHeight: 1.5 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Rule() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />;
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE 1 — OVERVIEW / MIND MAP
═══════════════════════════════════════════════════════════════════════ */

function SpokeMap() {
  // Centre point placed at roughly 55% x for visual balance with 8 spokes
  const cx = 560, cy = 255;

  type CardDef = {
    col: string; title: string; lines: string[];
    x: number; y: number; w: number; sx: number; sy: number;
  };

  // Cards repositioned for a 1100×480 landscape canvas
  const cards: CardDef[] = [
    { col: T,         title: 'Recipe & Spec',
      lines: ['Full recipe, method & mise en place', 'Portions, yield & scaling', 'Batch notes per serving size'],
      x: 390, y: 6, w: 236, sx: 560, sy: 72 },
    { col: '#0284c7', title: 'Cost & GP',
      lines: ['Live ingredient costs vs your suppliers', 'GP auto-calculated per dish', 'Sell-price guidance & margin alerts'],
      x: 660, y: 20, w: 236, sx: 693, sy: 82 },
    { col: '#0891b2', title: 'Supplier Pricing',
      lines: ['Live price tracking from your suppliers', 'Invoice scan & match', 'Auto-recost when prices change', 'Direct supplier messaging'],
      x: 840, y: 168, w: 236, sx: 840, sy: 230 },
    { col: '#dc2626', title: 'Allergens & Nutrition',
      lines: ['14 allergens auto-generated per dish', "Natasha's Law compliant matrix", 'Nutrition per portion — auto-updated'],
      x: 662, y: 368, w: 238, sx: 694, sy: 378 },
    { col: '#d97706', title: 'HACCP & Safety',
      lines: ['CCPs generated per dish', 'Critical limits & corrective actions', 'Temp logs, evidence & inspection reports'],
      x: 388, y: 396, w: 232, sx: 538, sy: 396 },
    { col: '#059669', title: 'Training & Compliance',
      lines: ['Bespoke training from your menus & ops', 'Level 2 food hygiene included', 'All legal compliance checks built in', 'Cert tracking & auto-renewal alerts'],
      x: 22, y: 340, w: 246, sx: 282, sy: 380 },
    { col: TL,        title: 'Front of House',
      lines: ['Live menu knowledge for all staff', 'Instant allergen answers', 'Dish descriptions & wine pairings'],
      x: 22, y: 176, w: 236, sx: 268, sy: 248 },
    { col: '#ea580c', title: 'Ordering & Deliveries',
      lines: ['Shopping list auto-built from menu', 'One-click POs to suppliers', 'Delivery checker — scan vs PO', 'Discrepancy alerts & records'],
      x: 22, y: 18, w: 242, sx: 272, sy: 100 },
  ];

  const ROW = 15, HDR = 19, PAD = 7;

  return (
    <svg viewBox="0 0 1100 485" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <radialGradient id="glow5" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={T} stopOpacity="0.12" />
          <stop offset="100%" stopColor={T} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={200} ry={180} fill="url(#glow5)" />

      {cards.map(c => (
        <line key={c.title + 's'} x1={cx} y1={cy} x2={c.sx} y2={c.sy}
          stroke={c.col} strokeWidth="0.8" strokeOpacity="0.22" strokeDasharray="3,5" />
      ))}

      {cards.map(c => {
        const h = HDR + PAD + c.lines.length * ROW + PAD;
        return (
          <g key={c.title}>
            <rect x={c.x} y={c.y} width={c.w} height={h} rx={6}
              fill={NAV} stroke={c.col} strokeWidth="1" strokeOpacity="0.5" />
            <rect x={c.x} y={c.y} width={c.w} height={HDR} rx={6}
              fill={c.col} fillOpacity="0.12" />
            <rect x={c.x} y={c.y + HDR - 2} width={c.w} height={2}
              fill={c.col} fillOpacity="0.20" />
            <text x={c.x + 10} y={c.y + HDR - 5}
              fill={c.col} fontSize="10.5" fontWeight="800" fontFamily={F}>{c.title}</text>
            {c.lines.map((ln, li) => (
              <g key={ln}>
                <circle cx={c.x + 12} cy={c.y + HDR + PAD + li * ROW + 5} r={1.8} fill={c.col} fillOpacity="0.6" />
                <text x={c.x + 20} y={c.y + HDR + PAD + li * ROW + 9}
                  fill={S4} fontSize="8.5" fontFamily={F}>{ln}</text>
              </g>
            ))}
          </g>
        );
      })}

      <rect x={cx - 85} y={cy - 44} width={170} height={88} rx={8}
        fill={NAV} stroke={TL} strokeWidth="2" />
      <rect x={cx - 85} y={cy - 44} width={170} height={88} rx={8}
        fill={T} fillOpacity="0.07" />
      <text x={cx} y={cy - 13} textAnchor="middle" fill={W} fontSize="17" fontWeight="900" fontFamily={F}>Menu</text>
      <text x={cx} y={cy + 8}  textAnchor="middle" fill={W} fontSize="17" fontWeight="900" fontFamily={F}>Development</text>
      <text x={cx} y={cy + 25} textAnchor="middle" fill={TL} fontSize="8" fontWeight="700" fontFamily={F}>· everything starts here ·</text>
    </svg>
  );
}

function Page1() {
  const noiseItems = [
    'allergen spreadsheets', 'HACCP paperwork', "GP that's never right",
    'last-minute menu changes', 'supplier invoice queries', 'compliance checklists',
    'delivery discrepancies', 'staff no-shows', 'training records',
    'price increases you missed', 'FOH asking about allergens', 'certification renewals',
    'portion drift', 'menu costing', 'spec sheets', 'food safety records',
  ];

  return (
    <Page n={1}>
      {/* Top strip — 3 columns — fixed height so spoke map always fills the rest */}
      <div style={{ display: 'grid', gridTemplateColumns: '38% 32% 30%', flexShrink: 0, height: 240, overflow: 'hidden', borderBottom: `2px solid ${T}` }}>

        {/* Col 1 — emotional hook */}
        <div style={{
          background: DARK, padding: '12px 14px 12px 20mm',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 7, fontWeight: 800, color: TL, textTransform: 'uppercase' as const, letterSpacing: '0.14em', marginBottom: 6 }}>
              Built by chefs · for chefs
            </div>
            <p style={{ color: W, fontSize: 17, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 7px' }}>
              You became a chef<br />because you love to cook.
            </p>
            <p style={{ color: S4, fontSize: 9, lineHeight: 1.5, margin: '0 0 8px' }}>
              Somewhere between the first job and running your own kitchen, the cooking became the thing you squeeze in around everything else. The admin. The compliance. The costing. The supplier calls that never end.
            </p>
            <p style={{
              color: '#e2e8f0', fontSize: 9.5, fontWeight: 600, lineHeight: 1.4,
              fontStyle: 'italic', borderLeft: `3px solid ${T}`, paddingLeft: 10, margin: 0,
            }}>
              "I didn't go to catering college to update an allergen spreadsheet at midnight."
            </p>
          </div>
        </div>

        {/* Col 2 — noise cloud */}
        <div style={{ background: 'rgba(8,15,26,0.85)', padding: '12px 12px 10px 12px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 7, fontWeight: 800, color: S8, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 8 }}>
            What actually fills the day
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '6px 5px' }}>
            {noiseItems.map((item, i) => (
              <span key={i} style={{
                fontSize: 8, fontWeight: 600, color: S4,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 999, padding: '3px 8px', whiteSpace: 'nowrap' as const,
              }}>
                {item}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ color: S8, fontSize: 8.5, fontStyle: 'italic', margin: 0 }}>
              None of this is why you got into hospitality.
            </p>
          </div>
        </div>

        {/* Col 3 — stats + platform intro */}
        <div style={{
          background: 'rgba(20,184,166,0.04)', padding: '12px 20mm 12px 12px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 7, fontWeight: 800, color: TL, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 }}>
              The fix
            </div>
            <p style={{ color: W, fontSize: 11.5, fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
              Every area of your operation.{' '}
              <span style={{ color: TL }}>All connected. Always live.</span>
            </p>
            <p style={{ color: S5, fontSize: 8, lineHeight: 1.5, margin: '0 0 10px' }}>
              Describe a dish in plain English. Recipe, costing, allergens, HACCP, training — built and kept live automatically.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              { val: '3 min',   label: 'Dish live',         hi: false },
              { val: '14',      label: 'Allergens tracked',  hi: false },
              { val: '5 min',   label: 'To go live',         hi: false },
              { val: '£3.30',   label: 'per kitchen / day',  hi: true  },
            ].map(s => (
              <div key={s.label} style={{
                background: s.hi ? T : 'rgba(255,255,255,0.04)',
                border: `1px solid ${s.hi ? T : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 7, padding: '6px 8px', textAlign: 'center' as const,
              }}>
                <div style={{ color: s.hi ? W : TL, fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: s.hi ? 'rgba(255,255,255,0.7)' : S5, fontSize: 7, marginTop: 2, lineHeight: 1.2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spoke map — fills remaining landscape height */}
      <div style={{ background: DARK, flex: 1, minHeight: 0 }}>
        <SpokeMap />
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE 2 — MENU, RECIPE & GP
═══════════════════════════════════════════════════════════════════════ */
function Page2() {
  return (
    <Page n={2}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '30% 38% 32%', minHeight: 0 }}>

        {/* Col 1 — hero intro + before/after */}
        <div style={{
          background: 'rgba(15,22,35,0.8)', padding: '16px 14px 14px 20mm',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div>
            <Badge text="Menu · Cost · Allergens · HACCP" />
            <h2 style={{
              color: W, fontSize: 20, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '8px 0 6px',
            }}>
              Full dish.<br />Fully priced.<br />
              <span style={{ color: TL }}>Under 3 minutes.</span>
            </h2>
            <p style={{ color: S4, fontSize: 9.5, lineHeight: 1.6, margin: 0 }}>
              A head chef used to spend 2–3 hours per dish. Recipe, costing, allergen checks, HACCP, portioning — all separate, all manual. Describe it once and the platform handles everything.
            </p>
          </div>

          <Card teal>
            <div style={{ fontSize: 8, fontWeight: 800, color: TL, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 7 }}>
              Generated per dish — automatically
            </div>
            <Arrows size={9} items={[
              'Full recipe — portions, method, mise en place, batch notes',
              'Ingredient list priced against live suppliers',
              'GP calculation and sell-price recommendation',
              '14-allergen matrix, auto-updated on any change',
              'HACCP controls — CCPs, critical limits, corrective actions',
              'Nutritional breakdown per portion',
              'FOH dish description, wine pairings',
              'Training notes for kitchen and front of house',
              'Live GP recosted on every supplier price change',
            ]} />
          </Card>

          <Card style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: 8, fontWeight: 800, color: S5, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 5 }}>
              Before this platform
            </div>
            {[
              '2–3 hrs per dish spec — every menu change',
              'Allergen spreadsheets done manually, usually behind',
              'HACCP copied from a generic template',
              'GP recalculated at month end — if at all',
            ].map(t => (
              <div key={t} style={{ fontSize: 9, color: S5, textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
            ))}
          </Card>
        </div>

        {/* Col 2 — 4-step mockup flow */}
        <div style={{
          background: DARK, padding: '16px 14px 14px 14px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 9,
        }}>
          <DarkWindow title="step 01 — describe your dish">
            <div style={{ padding: '8px 12px' }}>
              <div style={{
                background: 'rgba(45,212,191,0.06)', border: '1px solid rgba(45,212,191,0.18)',
                borderRadius: 6, padding: '7px 10px', color: '#e2e8f0', fontSize: 9, lineHeight: 1.55,
              }}>
                "Spring fish special — elegant, max 5 ingredients, 70%+ GP, works on a junior chef section, pairs well with white Burgundy."
              </div>
            </div>
          </DarkWindow>

          <DarkWindow title="step 02 — recipe built, priced against live suppliers" live>
            <div style={{
              padding: '5px 12px', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <span style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 700 }}>Pan-Seared Sea Trout, Lemon Beurre Blanc</span>
              <span style={{ color: TL, fontSize: 10, fontWeight: 800 }}>GP 73%</span>
            </div>
            {[
              { item: 'Sea trout fillet 140g', cost: '£3.20', sup: 'Coastal Fresh' },
              { item: 'Unsalted butter 30g',   cost: '£0.18', sup: 'Premier Foods' },
              { item: 'Lemon ½',               cost: '£0.12', sup: 'Fresh Direct' },
              { item: 'White wine 50ml',        cost: '£0.28', sup: 'Cellar Direct' },
              { item: 'Dill garnish 5g',        cost: '£0.09', sup: 'Fresh Direct' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '3px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ color: S4, fontSize: 8.5, flex: 1 }}>{r.item}</span>
                <span style={{ color: TL, fontSize: 8.5, fontFamily: 'monospace', fontWeight: 700, width: 34, textAlign: 'right' as const }}>{r.cost}</span>
                <span style={{ color: S8, fontSize: 8, width: 72, textAlign: 'right' as const }}>{r.sup}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 12px' }}>
              <span style={{ color: S5, fontSize: 8 }}>Total cost per portion</span>
              <span style={{ color: W, fontSize: 8.5, fontWeight: 800 }}>£3.87 → sell £14.50</span>
            </div>
          </DarkWindow>

          <DarkWindow title="step 03 — allergen matrix, auto-generated">
            <div style={{ padding: '7px 12px' }}>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const, marginBottom: 5 }}>
                {[
                  { n: 'Fish', p: true }, { n: 'Dairy', p: true }, { n: 'Sulphites', p: true },
                  { n: 'Gluten', p: false }, { n: 'Eggs', p: false }, { n: 'Nuts', p: false },
                  { n: 'Soya', p: false }, { n: 'Sesame', p: false }, { n: 'Celery', p: false },
                  { n: 'Mustard', p: false }, { n: 'Crustaceans', p: false },
                ].map(a => (
                  <span key={a.n} style={{
                    fontSize: 7.5, fontWeight: 700, padding: '2px 5px', borderRadius: 4,
                    background: a.p ? 'rgba(248,113,113,0.14)' : 'rgba(255,255,255,0.05)',
                    color: a.p ? '#fca5a5' : S6,
                    border: `1px solid ${a.p ? 'rgba(248,113,113,0.30)' : 'rgba(255,255,255,0.07)'}`,
                  }}>
                    {a.p ? '! ' : ''}{a.n}
                  </span>
                ))}
              </div>
              <span style={{ color: T, fontSize: 7.5, fontWeight: 700 }}>
                14 allergens tracked · Natasha's Law compliant · Auto-updates on any ingredient change
              </span>
            </div>
          </DarkWindow>

          <DarkWindow title="step 04 — HACCP controls, per dish">
            <div style={{ padding: '7px 12px' }}>
              {[
                { ccp: 'CCP1', step: 'Receiving', control: 'Core temp ≤3°C on delivery',      action: 'Reject if above' },
                { ccp: 'CCP2', step: 'Storage',   control: 'Fridge ≤5°C, covered, labelled',  action: 'Move/discard' },
                { ccp: 'CCP3', step: 'Cooking',   control: 'Core temp ≥63°C for 2 min',       action: 'Re-cook or discard' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: i < 2 ? 6 : 0 }}>
                  <span style={{
                    color: TL, fontSize: 7, fontWeight: 800,
                    background: 'rgba(45,212,191,0.10)', padding: '1px 5px',
                    borderRadius: 3, flexShrink: 0, marginTop: 1,
                  }}>{c.ccp}</span>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 8.5, fontWeight: 700 }}>
                      {c.step} — <span style={{ color: S5, fontWeight: 400 }}>{c.control}</span>
                    </div>
                    <div style={{ color: '#fbbf24', fontSize: 8 }}>Corrective: {c.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </DarkWindow>
        </div>

        {/* Col 3 — full recipe output mockup */}
        <div style={{
          background: 'rgba(10,16,28,0.9)', padding: '16px 20mm 14px 14px',
          display: 'flex', flexDirection: 'column', gap: 9,
        }}>
          <DarkWindow title="full output — sea trout, beurre blanc" live>
            <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              {/* Method */}
              <div>
                <div style={{ color: TL, fontSize: 7.5, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>Method</div>
                {['Season fillet, heat pan until smoking.', 'Sear skin-side 3 min. Flip, add butter, baste 90 sec.', 'Rest 2 min. Core temp ≥63°C.', 'Reduce wine, add butter gradually, finish with lemon.'].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 3 }}>
                    <span style={{ color: TL, fontSize: 7.5, fontWeight: 800, flexShrink: 0, width: 12 }}>{i + 1}.</span>
                    <span style={{ color: S4, fontSize: 8.5, lineHeight: 1.4 }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
              {/* Nutrition */}
              <div>
                <div style={{ color: TL, fontSize: 7.5, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>Nutrition per portion</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4 }}>
                  {[{ l: 'Kcal', v: '312' }, { l: 'Protein', v: '28g' }, { l: 'Fat', v: '19g' }, { l: 'Carbs', v: '3g' }].map(n => (
                    <div key={n.l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 5, padding: '4px 0', textAlign: 'center' as const }}>
                      <div style={{ color: W, fontSize: 11, fontWeight: 800, lineHeight: 1 }}>{n.v}</div>
                      <div style={{ color: S6, fontSize: 7, marginTop: 1 }}>{n.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
              {/* FOH desc */}
              <div>
                <div style={{ color: TL, fontSize: 7.5, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>FOH Menu Description</div>
                <div style={{ color: '#e2e8f0', fontSize: 8.5, fontStyle: 'italic', lineHeight: 1.5 }}>
                  "Pan-seared sea trout fillet, golden crisp skin, lemon beurre blanc, fresh dill."
                </div>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
              {/* Wine */}
              <div>
                <div style={{ color: TL, fontSize: 7.5, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>Wine Pairing</div>
                <div style={{ color: S4, fontSize: 8.5, lineHeight: 1.4 }}>Chablis Premier Cru or Pouilly-Fumé — crisp acidity cuts the beurre blanc.</div>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
              {/* Training */}
              <div>
                <div style={{ color: TL, fontSize: 7.5, fontWeight: 800, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>Training Note</div>
                <div style={{ color: S4, fontSize: 8.5, lineHeight: 1.4 }}>Contains Fish, Dairy, Sulphites. Always confirm allergens at table before ordering.</div>
              </div>
            </div>
          </DarkWindow>

          <Card teal style={{ marginTop: 'auto' }}>
            <div style={{ color: TL, fontSize: 10.5, fontWeight: 800, lineHeight: 1.35 }}>
              From concept to fully priced, allergen-compliant, HACCP-controlled live dish.
            </div>
            <div style={{ color: S5, fontSize: 8.5, marginTop: 4 }}>Under 3 minutes. Every time.</div>
          </Card>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE 3 — LIVE PRICING & SUPPLIER ECOSYSTEM
═══════════════════════════════════════════════════════════════════════ */
function Page3() {
  return (
    <Page n={3}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        {/* Left — dark context */}
        <div style={{
          background: 'rgba(15,22,35,0.8)', padding: '18px 14px 16px 16mm',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 9,
        }}>
          <div>
            <Badge text="Live Supplier Pricing · Cost & GP Intelligence" />
            <h2 style={{
              color: W, fontSize: 21, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '8px 0 4px',
            }}>
              Supplier changes price.<br />
              <span style={{ color: TL }}>Every dish recoasts itself.</span>
            </h2>
            <p style={{ color: S4, fontSize: 10, lineHeight: 1.6, margin: 0 }}>
              Connect your suppliers once. When they update prices, every linked recipe recoasts in seconds. You see exactly which dishes are affected — before service, before you're committed.
            </p>
          </div>

          {[
            { label: 'Connect existing suppliers',
              body: 'One invitation. Suppliers get their own portal — they keep pricing current. You see the results instantly.' },
            { label: 'Sub-second propagation',
              body: 'Supplier changes a price at 06:00. By 06:01 every linked dish is recosted and your dashboard shows the impact.' },
            { label: 'Flagged before service',
              body: 'Dishes below GP target are highlighted automatically. You know before a cover is served.' },
            { label: 'Two-tier supply chain',
              body: 'See what your supplier pays their vendor. Understand cost pressure before it hits your invoice.' },
            { label: 'Invoice scanning',
              body: 'Upload a PDF delivery note. Line items extracted, matched, and reconciled automatically.' },
            { label: 'Supplier messaging',
              body: 'All supplier communication in one auditable thread. No lost emails, no missed price changes.' },
          ].map((c, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, padding: '8px 11px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 9,
            }}>
              <span style={{ color: TL, fontWeight: 700, fontSize: 12, lineHeight: 1.3, flexShrink: 0, marginTop: 1 }}>→</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 10, color: W, marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontSize: 9, color: S4, lineHeight: 1.5 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — dark mockups */}
        <div style={{
          background: DARK, padding: '18px 16mm 16px 14px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>

          <DarkWindow title="recipe costing — all dishes" live>
            <div style={{ padding: '5px 12px', display: 'grid', gridTemplateColumns: '1fr 42px 42px 38px', gap: 6 }}>
              {['Dish', 'Cost', 'Sell', 'GP'].map(h => (
                <span key={h} style={{ color: S8, fontSize: 7, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{h}</span>
              ))}
            </div>
            {[
              { name: 'Sea Trout, Beurre Blanc',   cost: '£3.87', sell: '£14.50', gp: 73, alert: false },
              { name: 'Salmon Fillet, Crushed Pea', cost: '£4.28', sell: '£14.50', gp: 70, alert: true  },
              { name: 'Beef Burger & Fries',        cost: '£3.85', sell: '£12.00', gp: 68, alert: false },
              { name: 'Fish & Chips',               cost: '£5.10', sell: '£15.50', gp: 67, alert: true  },
              { name: 'Mushroom Risotto',           cost: '£2.95', sell: '£11.50', gp: 74, alert: false },
              { name: 'Caesar Salad',               cost: '£2.40', sell: '£10.00', gp: 76, alert: false },
              { name: 'Chicken Supreme',            cost: '£3.60', sell: '£13.00', gp: 72, alert: false },
            ].map((d, i) => (
              <div key={i} style={{
                padding: '4px 12px',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                background: d.alert ? 'rgba(248,113,113,0.04)' : 'transparent',
                display: 'grid', gridTemplateColumns: '1fr 42px 42px 38px',
                gap: 6, alignItems: 'center',
              }}>
                <span style={{ color: '#e2e8f0', fontSize: 9, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {d.alert && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#f87171', display: 'inline-block', flexShrink: 0 }} />}
                  {d.name}
                </span>
                <span style={{ color: S5, fontSize: 8.5, fontFamily: 'monospace', textAlign: 'right' as const }}>{d.cost}</span>
                <span style={{ color: S6, fontSize: 8.5, fontFamily: 'monospace', textAlign: 'right' as const }}>{d.sell}</span>
                <span style={{ color: d.gp >= 70 ? TL : '#f59e0b', fontSize: 9.5, fontWeight: 800, textAlign: 'right' as const }}>{d.gp}%</span>
              </div>
            ))}
            <div style={{ padding: '5px 12px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#f87171', fontSize: 8 }}>2 dishes flagged — salmon price +8p overnight</span>
              <span style={{ color: TL, fontSize: 8 }}>Synced 06:12</span>
            </div>
          </DarkWindow>

          <DarkWindow title="supplier portal — Coastal Fresh Ltd">
            <div style={{ padding: '9px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ color: '#cbd5e1', fontSize: 9, fontWeight: 700 }}>Price update — uploaded 05:58</span>
                <span style={{
                  color: T, fontSize: 7.5, fontWeight: 700,
                  background: 'rgba(20,184,166,0.10)', padding: '1px 7px', borderRadius: 3,
                }}>AUTO-SYNCED</span>
              </div>
              {[
                { item: 'Salmon fillet 140g',    old: '£4.12', new: '£4.20', pct: '+1.9%', up: true  },
                { item: 'Sea trout fillet 140g',  old: '£3.79', new: '£3.87', pct: '+2.1%', up: true  },
                { item: 'Cod loin 180g',          old: '£5.05', new: '£5.08', pct: '+0.6%', up: true  },
                { item: 'Sea bass 200g',           old: '£6.80', new: '£6.80', pct: '—',     up: false },
              ].map((r, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr 38px 42px 38px',
                  gap: 6, padding: '4px 0',
                  borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  alignItems: 'center',
                }}>
                  <span style={{ color: S4, fontSize: 9 }}>{r.item}</span>
                  <span style={{ color: S8, fontSize: 8.5, textDecoration: 'line-through', textAlign: 'right' as const }}>{r.old}</span>
                  <span style={{ color: '#e2e8f0', fontSize: 9, fontFamily: 'monospace', textAlign: 'right' as const }}>{r.new}</span>
                  <span style={{ color: r.up ? '#f87171' : S6, fontSize: 8.5, fontWeight: 700, textAlign: 'right' as const }}>{r.pct}</span>
                </div>
              ))}
              <div style={{ color: S8, fontSize: 8, marginTop: 6 }}>
                Supplier updated their own portal · All linked dishes recosted automatically
              </div>
            </div>
          </DarkWindow>

          <DarkWindow title="supplier messages — Coastal Fresh Ltd">
            <div style={{ padding: '9px 12px' }}>
              {[
                { msg: 'Any flexibility on sea trout this week?', mine: true, time: '08:12' },
                { msg: 'Wholesale market up 3%. Best we can do is £3.87. Already updated on portal — your dishes will have recosted.', mine: false, time: '08:16' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start', marginBottom: 7 }}>
                  <div style={{
                    background: m.mine ? T : 'rgba(255,255,255,0.07)',
                    color: m.mine ? W : '#cbd5e1',
                    fontSize: 9, padding: '6px 10px', borderRadius: 7,
                    maxWidth: '88%', lineHeight: 1.5,
                  }}>{m.msg}</div>
                  <span style={{ color: S8, fontSize: 7.5, marginTop: 2 }}>{m.time}</span>
                </div>
              ))}
            </div>
          </DarkWindow>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE 4 — COMPLIANCE, TRAINING & FRONT OF HOUSE
═══════════════════════════════════════════════════════════════════════ */
function Page4() {
  return (
    <Page n={4}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        {/* Left — dark mockups */}
        <div style={{
          background: DARK, padding: '18px 14px 16px 16mm',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div>
            <Badge text="Compliance · Training · Front of House" />
            <h2 style={{
              color: W, fontSize: 21, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '8px 0 4px',
            }}>
              Audit-ready every day.<br />
              <span style={{ color: TL }}>Always current. Always evidenced.</span>
            </h2>
            <p style={{ color: S4, fontSize: 9.5, lineHeight: 1.55, margin: 0 }}>
              Every task timestamped. Every signature captured. Inspectors don't care about intentions — they want evidence. The platform creates it automatically, as work happens.
            </p>
          </div>

          <DarkWindow title="pre-service briefing — lunch service">
            <div style={{ padding: '8px 12px' }}>
              <div style={{ color: S5, fontSize: 8, marginBottom: 6 }}>Staff sign-in — 11:45</div>
              {[
                { name: 'Jamie Smith',  role: 'Head Chef', done: true  },
                { name: 'Maria Garcia', role: 'Sous Chef', done: true  },
                { name: 'Tom Lee',      role: 'FOH Lead',  done: true  },
                { name: 'New Start',    role: 'KP',        done: false },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '3px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <span style={{ color: '#e2e8f0', fontSize: 9 }}>
                    {s.name} <span style={{ color: S6 }}>· {s.role}</span>
                  </span>
                  <span style={{ color: s.done ? TL : '#f87171', fontSize: 8, fontWeight: 700 }}>
                    {s.done ? 'SIGNED' : 'PENDING'}
                  </span>
                </div>
              ))}
              <div style={{
                marginTop: 8, background: 'rgba(248,113,113,0.07)',
                border: '1px solid rgba(248,113,113,0.2)', borderRadius: 5, padding: '5px 9px',
              }}>
                <div style={{ color: '#fca5a5', fontSize: 8, fontWeight: 800, marginBottom: 2 }}>HIGH RISK — new dish on today</div>
                <div style={{ color: S4, fontSize: 8.5 }}>Sea Trout — Fish, Dairy, Sulphites · Brief all FOH before service</div>
              </div>
            </div>
          </DarkWindow>

          <DarkWindow title="compliance tasks — this week">
            <div style={{ padding: '8px 12px' }}>
              {[
                { task: 'Pre-service allergen briefing', done: true,  sig: 'J. Smith' },
                { task: 'Fridge temperature log AM',     done: true,  sig: 'Auto'     },
                { task: 'Delivery note reconciliation',  done: true,  sig: 'M. Jones' },
                { task: 'Pre-service briefing — PM',     done: true,  sig: 'J. Smith' },
                { task: 'HACCP weekly review',           done: false, sig: ''         },
              ].map((t, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '4px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <span style={{
                    width: 11, height: 11, borderRadius: 3,
                    background: t.done ? T : 'rgba(245,158,11,0.18)',
                    border: t.done ? 'none' : '1px solid rgba(245,158,11,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: 7.5, color: W, fontWeight: 900,
                  }}>{t.done ? '✓' : ''}</span>
                  <span style={{ color: t.done ? S6 : '#fbbf24', fontSize: 9, flex: 1, textDecoration: t.done ? 'line-through' : 'none' }}>{t.task}</span>
                  {t.sig && <span style={{ color: S8, fontSize: 8 }}>{t.sig}</span>}
                </div>
              ))}
              <div style={{ color: TL, fontSize: 8, marginTop: 6, fontWeight: 700 }}>
                4/5 complete · All timestamped · Inspection-ready
              </div>
            </div>
          </DarkWindow>

          <DarkWindow title="training — staff certifications">
            <div style={{ padding: '8px 12px' }}>
              {[
                { name: 'Jamie Smith',  cert: 'Level 3 Food Safety', expires: 'Jan 2027', status: 'ok'   },
                { name: 'Maria Garcia', cert: 'Level 2 Food Safety', expires: 'Jun 2025', status: 'due'  },
                { name: 'Tom Lee',      cert: 'Allergen Awareness',  expires: 'Mar 2026', status: 'ok'   },
                { name: 'New Start',    cert: 'BOH Induction',       expires: 'In progress', status: 'prog' },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '4px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ color: S5, fontSize: 8 }}>{s.cert}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ color: s.status === 'due' ? '#f87171' : s.status === 'prog' ? '#fbbf24' : TL, fontSize: 8, fontWeight: 700 }}>
                      {s.status === 'due' ? 'DUE SOON' : s.status === 'prog' ? 'IN PROGRESS' : 'CURRENT'}
                    </div>
                    <div style={{ color: S8, fontSize: 8 }}>{s.expires}</div>
                  </div>
                </div>
              ))}
            </div>
          </DarkWindow>
        </div>

        {/* Right — dark content */}
        <div style={{
          background: 'rgba(15,22,35,0.8)', padding: '18px 16mm 16px 16px',
          display: 'flex', flexDirection: 'column', gap: 9,
        }}>
          <Card teal>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: TL, textTransform: 'uppercase' as const, letterSpacing: '0.09em', marginBottom: 8 }}>Training & Compliance</div>
            <Arrows size={9.5} items={[
              'Bespoke training content built from your own menus and procedures — not generic templates',
              'Level 2 food hygiene already included — ready for your team on day one',
              'All legal compliance checks built in — nothing to configure',
              'Certification tracking with automatic expiry alerts sent to managers',
              'Signed briefings captured digitally — evidence as it happens, every service',
              'Training auto-updates when your menus or procedures change',
            ]} />
          </Card>

          <Card>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: S4, textTransform: 'uppercase' as const, letterSpacing: '0.09em', marginBottom: 8 }}>Compliance</div>
            <Arrows size={9.5} items={[
              'Evidence captured in real time — forms, signatures, timestamps',
              'Pre-service allergen briefings with digital sign-off, every service',
              'Temperature logs, HACCP records, delivery checks in one place',
              'One-click FSA, HSE, and local authority inspection reports',
            ]} />
          </Card>

          <Card>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: S4, textTransform: 'uppercase' as const, letterSpacing: '0.09em', marginBottom: 8 }}>Front of House</div>
            <Arrows size={9.5} items={[
              "FOH always knows what's on — specials, allergens, 86'd items",
              "Allergen answers without 'I'll just check in the kitchen'",
              'Dish descriptions and wine pairings generated and kept current',
              'Fewer errors, fewer complaints, better guest experience',
            ]} />
          </Card>

          <Card style={{ marginTop: 'auto' }}>
            <div style={{
              fontSize: 8.5, fontWeight: 800, color: S5,
              textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 6,
            }}>
              You will never again
            </div>
            {[
              'Scramble to find paperwork before an inspection',
              'Chase staff to sign compliance records after the fact',
              'Brief FOH verbally and hope it sticks',
              'Let a training certification expire unnoticed',
            ].map(t => (
              <div key={t} style={{ fontSize: 9.5, color: S5, textDecoration: 'line-through', marginBottom: 3 }}>{t}</div>
            ))}
          </Card>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE 5 — WHO IT'S FOR, MULTI-SITE, PRICING & CLOSE
═══════════════════════════════════════════════════════════════════════ */
function Page5({ standalone, openBooking }: { standalone: boolean; openBooking: () => void }) {
  return (
    <Page n={5}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

        {/* Left — dark context */}
        <div style={{
          background: 'rgba(15,22,35,0.8)', padding: '18px 14px 16px 16mm',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', gap: 9,
        }}>
          <div>
            <Badge text="Who It's For · Pricing · Why Us" />
            <h2 style={{
              color: W, fontSize: 21, fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.025em', margin: '8px 0 6px',
            }}>
              Built for operators who are done<br />
              <span style={{ color: TL }}>carrying everything themselves.</span>
            </h2>
          </div>

          <Card>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: S5, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 8 }}>
              This is for you if you're
            </div>
            <Arrows size={9.5} items={[
              'Managing GP on spreadsheets and catching problems too late',
              'Dealing with high turnover and knowledge walking out the door',
              'Spending more time on compliance than running the business',
              'Running multiple sites and losing visibility as you scale',
              'Relying on one experienced person who holds everything together',
              "Paying for software that your operation doesn't actually fully use",
            ]} />
          </Card>

          {/* Comparison table */}
          <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, overflow: 'hidden', flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(10,18,30,0.9)' }}>
              <div style={{ padding: '6px 11px', color: TL, fontSize: 9, fontWeight: 800 }}>HospitalitySupport.uk</div>
              <div style={{ padding: '6px 11px', color: S6, fontSize: 9, fontWeight: 800, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>Everyone else</div>
            </div>
            {[
              ['Live in 5 minutes',             '6-week implementation'],
              ['Dish concept → live in 3 min',  '2–3 hours of chef admin'],
              ['Allergens auto-generated',       'Manual spreadsheet updates'],
              ['HACCP built per dish',           'Generic template, copied'],
              ['Ordering auto-built from menu',  'Manual shopping lists'],
              ['Delivery checker built in',      'Paper-based, no records'],
              ['Suppliers update themselves',    'You manually enter prices'],
              ['Live GP on every price change',  'Recalculated monthly (maybe)'],
              ['Built by operators',             'Built by developers'],
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ padding: '5px 11px', fontSize: 9.5, color: W, fontWeight: 600 }}>{row[0]}</div>
                <div style={{ padding: '5px 11px', fontSize: 9.5, color: S5, borderLeft: '1px solid rgba(255,255,255,0.05)' }}>{row[1]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dark */}
        <div style={{
          background: DARK, padding: '18px 16mm 16px 14px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>

          <DarkWindow title="group dashboard — all sites" live>
            <div style={{ padding: '8px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, marginBottom: 9 }}>
                {[
                  { val: '6',      label: 'Sites'      },
                  { val: '71%',    label: 'Avg GP'     },
                  { val: '5/6',    label: 'Compliant'  },
                  { val: '£12.4k', label: 'This week'  },
                ].map(s => (
                  <div key={s.label} style={{
                    background: 'rgba(20,184,166,0.10)',
                    border: '1px solid rgba(20,184,166,0.15)',
                    borderRadius: 6, padding: '5px 6px', textAlign: 'center' as const,
                  }}>
                    <div style={{ color: TL, fontSize: 14, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: S5, fontSize: 7.5, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {[
                { site: 'Kings Cross',  gp: 72, comp: true,  spend: '£2,100' },
                { site: 'Shoreditch',   gp: 69, comp: true,  spend: '£1,840' },
                { site: 'Camden',       gp: 74, comp: true,  spend: '£2,250' },
                { site: 'Brixton',      gp: 71, comp: false, spend: '£1,960' },
                { site: 'Canary Wharf', gp: 68, comp: true,  spend: '£2,400' },
                { site: 'Hackney',      gp: 75, comp: true,  spend: '£1,850' },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 9,
                  alignItems: 'center', padding: '4px 0',
                  borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <span style={{ color: '#e2e8f0', fontSize: 9, fontWeight: 600 }}>{s.site}</span>
                  <span style={{ color: s.gp >= 70 ? TL : '#f59e0b', fontSize: 9, fontWeight: 700 }}>{s.gp}%</span>
                  <span style={{ color: s.comp ? TL : '#f87171', fontSize: 9, fontWeight: 700 }}>{s.comp ? '✓' : '!'}</span>
                  <span style={{ color: S5, fontSize: 8.5, fontFamily: 'monospace' }}>{s.spend}</span>
                </div>
              ))}
            </div>
          </DarkWindow>

          <DarkWindow title="pricing — per kitchen, not per user">
            <div style={{ padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { tier: 'Standard Venue',  price: '£100/mo',   sub: 'Pubs, restaurants, cafés',         tag: '£3.30 per day',           hi: true  },
                { tier: 'Dark Kitchen',    price: '£250/mo',   sub: 'Dark kitchens, production kitchens', tag: '',                        hi: false },
                { tier: 'Multi-Site',      price: '£100/site', sub: 'Same price, every site, always',    tag: 'Group reporting included', hi: false },
              ].map((p, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '7px 10px',
                  background: p.hi ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${p.hi ? 'rgba(20,184,166,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 8,
                }}>
                  <div>
                    <div style={{ color: '#e2e8f0', fontSize: 9.5, fontWeight: 700 }}>{p.tier}</div>
                    <div style={{ color: S5, fontSize: 8 }}>{p.sub}</div>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ color: p.hi ? TL : S4, fontSize: 13, fontWeight: 900, lineHeight: 1 }}>{p.price}</div>
                    {p.tag && <div style={{ color: S5, fontSize: 7.5, marginTop: 1 }}>{p.tag}</div>}
                  </div>
                </div>
              ))}
              <div style={{ color: S8, fontSize: 8, marginTop: 2 }}>
                Annual billing · No setup fees · No per-user pricing · No hidden costs
              </div>
            </div>
          </DarkWindow>

          {/* Closing CTA */}
          <div style={{
            background: UI, borderRadius: 10, padding: '16px',
            border: '1px solid rgba(20,184,166,0.25)', marginTop: 'auto',
            boxShadow: '0 0 32px rgba(20,184,166,0.08)',
          }}>
            <div style={{ color: W, fontWeight: 900, fontSize: 15, lineHeight: 1.2, marginBottom: 7 }}>
              It doesn't change what hospitality is.
            </div>
            <div style={{ color: S4, fontSize: 10, lineHeight: 1.65, marginBottom: 14 }}>
              It changes what you personally have to carry. Menu development. GP control. Allergens. Compliance. Training. Front-of-house. All of it. From £3.30 a day. No payroll. No politics. No sick days.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {standalone ? (
                <a
                  href="/demo?book=1"
                  style={{
                    background: T, color: W, fontWeight: 900,
                    fontSize: 11, padding: '9px 16px', borderRadius: 8,
                    whiteSpace: 'nowrap' as const, letterSpacing: '-0.01em',
                    textDecoration: 'none', display: 'inline-block',
                  }}
                >
                  Book a 30-min demo →
                </a>
              ) : (
                <button
                  onClick={openBooking}
                  style={{
                    background: T, color: W, fontWeight: 900,
                    fontSize: 11, padding: '9px 16px', borderRadius: 8,
                    whiteSpace: 'nowrap' as const, letterSpacing: '-0.01em',
                    cursor: 'pointer', border: 'none',
                  }}
                >
                  Book a 30-min demo →
                </button>
              )}
              <span style={{ color: S5, fontSize: 9, lineHeight: 1.5 }}>
                We'll show your dishes recosting live.<br />
                Your data. No slides. No pitch deck.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════════════════════════ */
export default function Print5Page({ standalone = false }: { standalone?: boolean }) {
  const { openBooking } = useBooking();
  const [linkCopied, setLinkCopied] = useState(false);
  const [scale, setScale] = useState(1);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const w = outerRef.current?.clientWidth;
      if (!w) return;
      setScale(Math.min(1, w / 1123));
    };
    update();
    const ro = new ResizeObserver(update);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/sales-pack`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const PAGE_W = 1123;
  const PAGE_H = 794;
  const GAP = 24;
  const totalH = 5 * PAGE_H + 4 * GAP;

  return (
    <div className={`${standalone ? 'min-h-screen' : 'min-h-full'} bg-slate-950 pt-4 pr-4 pb-6 pl-4`}>
      <div className="w-full" ref={outerRef}>
        <div className="flex items-center justify-between mb-3 no-print">
          <div>
            <h1 className="text-white font-black text-2xl">5-Page Brochure</h1>
            {!standalone && (
              <p className="text-slate-400 text-sm mt-1">5 A4 pages — save as PDF to email or print. Share via <span className="text-teal-400 font-mono">/sales-pack</span></p>
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
            .print5-scale-wrap { width: 297mm !important; height: auto !important; overflow: visible !important; margin: 0 !important; }
            .print5-scale-wrap > div { width: 297mm !important; transform: none !important; }
            .print-page { box-shadow: none !important; width: 297mm !important; min-height: 210mm !important; page-break-after: always; }
            .print-page:last-child { page-break-after: avoid; }
            .no-print { display: none !important; }
          }
          @page { size: A4 landscape; margin: 0; }
        `}</style>

        <div
          className="print5-scale-wrap"
          style={{
            width: Math.round(PAGE_W * scale),
            height: Math.round(totalH * scale),
            overflow: 'hidden',
          }}
        >
          <div style={{
            width: PAGE_W,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            display: 'flex', flexDirection: 'column', gap: GAP,
          }}>
            <Page1 />
            <Page2 />
            <Page3 />
            <Page4 />
            <Page5 standalone={standalone} openBooking={openBooking} />
          </div>
        </div>
      </div>
    </div>
  );
}
