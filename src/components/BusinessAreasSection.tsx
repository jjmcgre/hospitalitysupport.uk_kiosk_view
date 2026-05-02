import { ChefHat, TrendingUp, Shield, GraduationCap, ClipboardCheck, Wine, Users, Eye, Truck, BarChart3 } from 'lucide-react';

const areas = [
  {
    icon: ChefHat,
    area: 'Kitchen',
    headline: 'Menus built in hours, not weeks',
    points: ['Full menu from concept to spec in under an hour', 'Each dish with recipe, portions, mise en place, batch notes', 'Designed around your skill level and service pressure'],
  },
  {
    icon: TrendingUp,
    area: 'Cost & GP',
    headline: 'Your margin. Always live.',
    points: ['Every dish priced against real supplier data', 'Margin drift flagged before it hits your P&L', 'Ingredient swaps and price change recommendations'],
  },
  {
    icon: Eye,
    area: 'Supplier Pricing',
    headline: 'Real-time price intelligence',
    points: ['Connected to your existing suppliers', 'Every price movement tracked overnight', 'Dishes recosted automatically — no spreadsheets'],
  },
  {
    icon: Shield,
    area: 'Allergens',
    headline: "Natasha's Law. Handled.",
    points: ['14 allergens auto-generated from ingredients', 'Matrix updates when a recipe changes', 'Zero manual checks. Zero copy-paste errors'],
  },
  {
    icon: ClipboardCheck,
    area: 'HACCP & Compliance',
    headline: 'Audit-ready. Every day.',
    points: ['CCPs generated per dish, per process', 'Evidence timestamped as work happens', 'One-click FSA-formatted inspection report'],
  },
  {
    icon: GraduationCap,
    area: 'Training',
    headline: "Knowledge that doesn't walk out the door.",
    points: ['Training generated from your real operations', 'Onboarding that mirrors how you actually work', 'Auto-updates when menus or processes change'],
  },
  {
    icon: Wine,
    area: 'Bar & Wine',
    headline: 'Margins behind the bar, protected.',
    points: ['Wine lists kept aligned with food and pricing', 'Yield loss and pour drift flagged early', 'Confident upselling for front of house'],
  },
  {
    icon: Users,
    area: 'Front of House',
    headline: 'Service that matches the kitchen.',
    points: ["FOH always knows what's on the menu today", 'Allergen answers without "I\'ll just check"', 'Fewer errors, better guest experience'],
  },
  {
    icon: Truck,
    area: 'Procurement',
    headline: 'Buy smarter. Every order.',
    points: ['Supplier-managed catalogues, always current', 'Invoice scanning and reconciliation automatic', 'Spend visibility by supplier, site, and category'],
  },
  {
    icon: BarChart3,
    area: 'Multi-Site Operations',
    headline: 'Every site. One view.',
    points: ['GP, compliance, and spend across your estate', 'Regional benchmarks and site comparison', 'Centralised buying with local execution'],
  },
];

export default function BusinessAreasSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-950 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-14">
          <div className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-5">
            Every area of your business
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            <span className="text-white">One platform.</span><br />
            <span className="text-teal-400">End to end.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Kitchen to bar. Compliance to training. Procurement to FOH. Every function covered — all connected, all live.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.area}
                className="bg-slate-900/60 border border-white/8 rounded-3xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-500/15 border border-teal-500/25 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-teal-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-teal-400/70">{a.area}</div>
                    <div className="text-white font-black text-sm leading-tight mt-0.5">{a.headline}</div>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {a.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 text-xs mt-0.5 flex-shrink-0">→</span>
                      <span className="text-slate-400 text-xs leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="sm:col-span-2 lg:col-span-3 bg-teal-500/8 border border-teal-500/25 rounded-3xl p-8 text-center">
            <p className="text-white font-black text-2xl mb-2">Not 10 systems. One.</p>
            <p className="text-slate-400 text-base max-w-lg mx-auto">
              Every module shares the same live data — supplier prices, recipes, allergens, staff, compliance. When anything changes, everything updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
