import { useState } from 'react';

const steps = [
  {
    number: '01',
    time: '0:30',
    label: 'Concept',
    headline: 'Say what you want to cook.',
    description: 'Type a dish idea — or describe your constraints. Season, skill level, what\'s available, what margin you need.',
    tag: 'Natural language input',
    mock: (
      <div className="space-y-2">
        <div className="bg-slate-800 rounded-xl p-3 border border-white/8">
          <div className="text-slate-500 text-[10px] mb-1.5 font-mono">new dish request</div>
          <div className="bg-teal-500/10 border border-teal-500/25 rounded-lg p-2.5 text-sm text-white leading-relaxed">
            "I need a spring fish special — something elegant, max 5 ingredients, 70%+ GP target, works with a junior chef section, pairs well with white Burgundy."
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 text-[10px] font-semibold">Processing...</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    time: '1:15',
    label: 'Recipe Built',
    headline: 'Full recipe. Priced against your live suppliers.',
    description: 'A complete recipe is generated — portions, method, mise en place. Every ingredient costed against your actual supplier catalogue in real time.',
    tag: 'Live supplier pricing',
    mock: (
      <div className="space-y-2">
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-white/8">
          <div className="bg-slate-900 px-3 py-2 flex justify-between items-center">
            <span className="text-white text-xs font-bold">Pan-Seared Sea Trout, Lemon Beurre Blanc</span>
            <span className="text-teal-400 text-[10px] font-bold bg-teal-500/15 px-2 py-0.5 rounded-full">GP: 73%</span>
          </div>
          <div className="p-3 space-y-1.5">
            {[
              { item: 'Sea trout fillet 140g', qty: '140g', cost: '£3.20', supplier: 'Coastal Fresh' },
              { item: 'Unsalted butter', qty: '30g', cost: '£0.18', supplier: 'Premier Foods' },
              { item: 'Lemon', qty: '½', cost: '£0.12', supplier: 'Fresh Direct' },
              { item: 'White wine', qty: '50ml', cost: '£0.28', supplier: 'Cellar Direct' },
              { item: 'Dill (garnish)', qty: '5g', cost: '£0.09', supplier: 'Fresh Direct' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px]">
                <span className="text-slate-400 flex-1">{r.item}</span>
                <span className="text-slate-500 w-8 text-right">{r.qty}</span>
                <span className="text-teal-400 font-mono font-bold w-10 text-right">{r.cost}</span>
                <span className="text-slate-600 w-20 text-right truncate">{r.supplier}</span>
              </div>
            ))}
            <div className="pt-1.5 mt-1 border-t border-white/8 flex justify-between">
              <span className="text-slate-400 text-[10px]">Total ingredient cost</span>
              <span className="text-white font-bold text-[10px]">£3.87</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    time: '1:45',
    label: 'Allergens',
    headline: '14 allergens. Zero effort.',
    description: 'The allergen matrix is generated automatically from the ingredient list. Every allergen flagged. Natasha\'s Law compliance built in.',
    tag: 'Auto-generated',
    mock: (
      <div className="space-y-2">
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-white/8">
          <div className="bg-slate-900 px-3 py-2">
            <span className="text-slate-400 text-[10px] font-mono">allergen matrix — Pan-Seared Sea Trout</span>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {[
                { name: 'Gluten', p: false }, { name: 'Crustaceans', p: false },
                { name: 'Eggs', p: false }, { name: 'Fish', p: true },
                { name: 'Peanuts', p: false }, { name: 'Soya', p: false },
                { name: 'Dairy', p: true }, { name: 'Nuts', p: false },
                { name: 'Celery', p: false }, { name: 'Mustard', p: false },
                { name: 'Sesame', p: false }, { name: 'Sulphites', p: true },
                { name: 'Lupin', p: false }, { name: 'Molluscs', p: false },
              ].map(a => (
                <span key={a.name} className={`text-[9px] font-bold px-2 py-0.5 rounded ${a.p ? 'bg-red-500/15 text-red-300 border border-red-500/30' : 'bg-white/4 text-slate-600 border border-white/6'}`}>
                  {a.p ? '⚠ ' : ''}{a.name}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-teal-400 text-[10px] font-semibold">3 allergens present · Auto-generated</span>
              <span className="text-slate-600 text-[10px]">Natasha's Law compliant</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    time: '2:10',
    label: 'HACCP & Food Safety',
    headline: 'Every critical control point. Built in.',
    description: 'HACCP controls, storage temps, cooking temps, cross-contamination steps — all generated and linked to the dish spec. Inspection-ready on day one.',
    tag: 'Compliance built-in',
    mock: (
      <div className="space-y-2">
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-white/8">
          <div className="bg-slate-900 px-3 py-2">
            <span className="text-slate-400 text-[10px] font-mono">HACCP controls — Sea Trout</span>
          </div>
          <div className="p-3 space-y-2">
            {[
              { ccp: 'CCP1', step: 'Receiving — fish', control: 'Temp ≤3°C on delivery', action: 'Reject if above' },
              { ccp: 'CCP2', step: 'Storage', control: 'Fridge ≤5°C, covered', action: 'Move/discard if drift' },
              { ccp: 'CCP3', step: 'Cooking', control: 'Core temp ≥63°C for 2 min', action: 'Re-cook or discard' },
            ].map((c, i) => (
              <div key={i} className="bg-white/4 rounded-lg p-2 border border-white/6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black text-teal-400 bg-teal-500/15 px-1.5 py-0.5 rounded">{c.ccp}</span>
                  <span className="text-white text-[10px] font-semibold">{c.step}</span>
                </div>
                <div className="text-[9px] text-slate-400">{c.control}</div>
                <div className="text-[9px] text-amber-400/80 mt-0.5">If fail: {c.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '05',
    time: '2:40',
    label: 'Nutrition',
    headline: 'Nutritional values. No guessing.',
    description: 'Full nutritional breakdown per portion — calories, protein, fat, carbs, fibre, salt. Updated automatically any time the recipe changes.',
    tag: 'Per portion',
    mock: (
      <div className="space-y-2">
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-white/8">
          <div className="bg-slate-900 px-3 py-2 flex justify-between">
            <span className="text-slate-400 text-[10px] font-mono">nutrition — per portion</span>
            <span className="text-slate-600 text-[10px]">Sea Trout, 140g</span>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[
                { val: '387', label: 'kcal' },
                { val: '32g', label: 'protein' },
                { val: '18g', label: 'fat' },
              ].map(n => (
                <div key={n.label} className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-2 text-center">
                  <div className="text-teal-300 text-sm font-black leading-none">{n.val}</div>
                  <div className="text-slate-500 text-[9px] mt-1">{n.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              {[
                { label: 'Carbohydrates', val: '4g' },
                { label: 'of which sugars', val: '1g' },
                { label: 'Fibre', val: '0g' },
                { label: 'Salt', val: '0.8g' },
              ].map(r => (
                <div key={r.label} className="flex justify-between text-[10px]">
                  <span className="text-slate-500">{r.label}</span>
                  <span className="text-slate-300 font-mono">{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '06',
    time: '3:00',
    label: 'Fully Live',
    headline: 'On menu. On every system. In 3 minutes.',
    description: 'The dish is live — spec sheet, allergen docs, HACCP controls, pricing, training notes, FOH description. Supplier price changes from this moment are tracked automatically.',
    tag: 'Dish is live',
    mock: (
      <div className="space-y-2">
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-white/8">
          <div className="bg-slate-900 px-3 py-2 flex items-center justify-between">
            <span className="text-slate-400 text-[10px] font-mono">dish live — all systems updated</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-400 text-[10px] font-bold">LIVE</span>
            </span>
          </div>
          <div className="p-3 space-y-1.5">
            {[
              { label: 'Dish spec sheet', status: 'Generated' },
              { label: 'Allergen matrix', status: 'Generated' },
              { label: 'HACCP controls', status: 'Generated' },
              { label: 'Nutritional values', status: 'Generated' },
              { label: 'FOH dish description', status: 'Generated' },
              { label: 'Wine pairing', status: 'Generated' },
              { label: 'Live price tracking', status: 'Active' },
              { label: 'GP monitoring', status: 'Active' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px]">{item.label}</span>
                <span className="text-teal-400 text-[10px] font-bold flex items-center gap-1">
                  <span className="text-teal-500">✓</span> {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export default function DishJourneySection() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section className="py-20 md:py-28 bg-[#080f1a] px-4 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-5">
            A dish live in under 3 minutes
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            <span className="text-white">Type a dish idea.</span><br />
            <span className="text-teal-400">Get everything. Instantly.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Recipe. Costings. Allergens. HACCP. Nutrition. FOH copy. Wine pairing. Live GP tracking — all generated in a single conversation. A full menu in under an hour.
          </p>
        </div>

        {/* Step tabs */}
        <p className="text-center text-xs font-bold tracking-widest uppercase text-teal-500/60 mb-3">
          Select a step to explore
        </p>
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide justify-center flex-wrap">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                active === i
                  ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
                  : 'bg-white/4 border-white/8 text-slate-500 hover:text-slate-300 hover:border-white/15'
              }`}
            >
              <span className={`text-xs font-black ${active === i ? 'text-teal-400' : 'text-slate-600'}`}>{s.number}</span>
              {s.label}
              <span className={`text-[10px] font-mono ml-1 ${active === i ? 'text-teal-500' : 'text-slate-700'}`}>{s.time}</span>
            </button>
          ))}
        </div>

        {/* Main panel */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left — copy */}
          <div>
            <div className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-400 text-[11px] font-bold tracking-wider uppercase rounded-full px-3 py-1 mb-4">
              {step.tag}
            </div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-5xl font-black text-white/10">{step.number}</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{step.headline}</h3>
            </div>
            <p className="text-slate-400 text-base leading-relaxed mb-6">{step.description}</p>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all rounded-full ${i === active ? 'w-8 h-2 bg-teal-400' : 'w-2 h-2 bg-white/15 hover:bg-white/30'}`}
                />
              ))}
            </div>

            {/* Time callout */}
            <div className="bg-slate-900/80 border border-white/8 rounded-2xl p-5 inline-block">
              <div className="text-3xl font-black text-teal-400 leading-none">{step.time}</div>
              <div className="text-slate-500 text-xs mt-1">Minutes from "go" to this step</div>
            </div>
          </div>

          {/* Right — mock UI */}
          <div className="bg-slate-900/60 border border-white/8 rounded-3xl p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
              <span className="ml-2 text-slate-600 text-[10px] font-mono">service support — {step.label.toLowerCase()}</span>
            </div>
            {step.mock}
          </div>
        </div>

        {/* Bottom summary bar */}
        <div className="mt-12 bg-teal-500/8 border border-teal-500/20 rounded-3xl p-8 text-center">
          <p className="text-white font-black text-2xl mb-3">From idea to fully compliant, priced, live dish: under 3 minutes.</p>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            What used to take a chef the best part of a day — recipe, costing, allergens, HACCP, nutrition, FOH notes — is now a single conversation. Businesses running this are saving weeks of admin every month.
          </p>
        </div>
      </div>
    </section>
  );
}
