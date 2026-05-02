import { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Minus, X, ArrowRight } from 'lucide-react';

const dishes = [
  { name: 'Pan-Seared Salmon', gp: 71, cost: '£4.20', sell: '£14.50', trend: 'up', delta: '+0.30' },
  { name: 'Beef Burger & Fries', gp: 68, cost: '£3.85', sell: '£12.00', trend: 'stable', delta: '—' },
  { name: 'Mushroom Risotto', gp: 74, cost: '£2.95', sell: '£11.50', trend: 'down', delta: '-0.15' },
  { name: 'Caesar Salad', gp: 76, cost: '£2.40', sell: '£10.00', trend: 'stable', delta: '—' },
];

const tasks = [
  { before: 'Phone your fish supplier for today\'s price', after: 'Price updates automatically overnight' },
  { before: 'Open a spreadsheet to recost the salmon dish', after: 'Every dish recosted the moment a price changes' },
  { before: 'Manually recalculate your GP', after: 'Live GP on every dish, always current' },
  { before: 'Email allergen info to front of house', after: 'Allergen matrix generated from ingredients' },
  { before: 'Print new menus after a price change', after: 'Digital menus reflect changes instantly' },
  { before: 'Chase a supplier for their latest catalogue', after: 'Supplier updates their own portal — you just see it' },
];

function GpBar({ gp }: { gp: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(gp), 200);
    return () => clearTimeout(t);
  }, [gp]);

  const colour = gp >= 70 ? '#2dd4bf' : gp >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden w-full">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, background: colour }}
      />
    </div>
  );
}

export default function ProblemsSection() {
  return (
    <>
      {/* SECTION 1 — Live price dashboard visual */}
      <section className="py-20 md:py-28 bg-[#080f1a] px-4 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <div className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-6">
                Live Price Intelligence
              </div>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6 text-white">
                Your suppliers change prices.<br />
                <span className="text-teal-400">Your dishes recost themselves.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                We connect directly with your existing suppliers. The moment a price moves — chicken up 8p, salmon down 12p — every linked dish recalculates instantly. Your GP is always live. No spreadsheets. No surprises.
              </p>
              <div className="space-y-4">
                {[
                  'Connect existing suppliers in one click',
                  'Sub-second price propagation across all recipes',
                  'Margin alerts before it hits your invoice',
                  'Supplier manages their own pricing — you just see the result',
                ].map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <ArrowRight size={14} className="text-teal-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock live dashboard */}
            <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-slate-950/80 px-5 py-3.5 flex items-center justify-between border-b border-white/8">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-slate-500 text-xs font-mono">live recipe costing</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-teal-400 text-xs font-semibold">LIVE</span>
                </div>
              </div>

              <div className="px-5 pt-4 pb-2 grid grid-cols-4 gap-2">
                {['Dish', 'Cost', 'GP %', 'Movement'].map((h) => (
                  <div key={h} className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{h}</div>
                ))}
              </div>

              <div className="px-5 pb-5 space-y-3">
                {dishes.map((d) => (
                  <div key={d.name} className="bg-white/4 border border-white/6 rounded-2xl p-3.5">
                    <div className="grid grid-cols-4 gap-2 items-center mb-2.5">
                      <div className="text-xs font-semibold text-white leading-tight col-span-1 truncate">{d.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{d.cost}</div>
                      <div className="text-xs font-black" style={{ color: d.gp >= 70 ? '#2dd4bf' : '#f59e0b' }}>{d.gp}%</div>
                      <div className={`flex items-center gap-1 text-xs font-semibold ${
                        d.trend === 'up' ? 'text-red-400' : d.trend === 'down' ? 'text-teal-400' : 'text-slate-500'
                      }`}>
                        {d.trend === 'up' && <TrendingUp size={11} />}
                        {d.trend === 'down' && <TrendingDown size={11} />}
                        {d.trend === 'stable' && <Minus size={11} />}
                        <span>{d.delta}</span>
                      </div>
                    </div>
                    <GpBar gp={d.gp} />
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 px-5 py-3 flex items-center justify-between">
                <span className="text-slate-600 text-[10px]">Prices last synced: just now</span>
                <span className="text-teal-500 text-[10px] font-semibold">4 suppliers connected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Before / After task list — no strikethroughs */}
      <section className="py-20 md:py-28 bg-slate-950 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              The work it takes<br />
              <span className="text-teal-400">off your plate.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Every row below is something you used to do manually. You don't any more.
            </p>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4 px-5 pb-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Manual task removed</div>
              <div className="text-xs font-bold text-teal-400/70 uppercase tracking-widest">What happens instead</div>
            </div>
            {tasks.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-2 gap-4 bg-white/3 border border-white/6 rounded-2xl p-4 sm:p-5 group hover:border-teal-500/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-700/60 border border-slate-600/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={9} className="text-slate-500" />
                  </div>
                  <span className="text-slate-500 text-sm leading-snug">{t.before}</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm leading-snug font-medium">{t.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
