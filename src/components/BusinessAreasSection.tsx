import { ChefHat, TrendingUp, Shield, GraduationCap, ClipboardCheck, Wine, Users, Eye, Truck, BarChart3 } from 'lucide-react';

const areas = [
  {
    icon: ChefHat,
    area: 'Kitchen',
    headline: 'Menus built in hours, not weeks',
    points: ['Full menu from concept to spec in under an hour', 'Each dish with recipe, portions, mise en place, batch notes', 'Designed around your skill level and service pressure'],
    colour: 'from-teal-600/20 to-teal-500/5',
    border: 'border-teal-500/20',
    iconBg: 'bg-teal-500/15',
    iconColor: 'text-teal-400',
  },
  {
    icon: TrendingUp,
    area: 'Cost & GP',
    headline: 'Your margin. Always live.',
    points: ['Every dish priced against real supplier data', 'Margin drift flagged before it hits your P&L', 'Ingredient swaps and price change recommendations'],
    colour: 'from-emerald-600/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Eye,
    area: 'Supplier Pricing',
    headline: 'Real-time price intelligence',
    points: ['Connected to your existing suppliers', 'Every price movement tracked overnight', 'Dishes recosted automatically — no spreadsheets'],
    colour: 'from-sky-600/20 to-sky-500/5',
    border: 'border-sky-500/20',
    iconBg: 'bg-sky-500/15',
    iconColor: 'text-sky-400',
  },
  {
    icon: Shield,
    area: 'Allergens',
    headline: 'Natasha\'s Law. Handled.',
    points: ['14 allergens auto-generated from ingredients', 'Matrix updates when a recipe changes', 'Zero manual checks. Zero copy-paste errors'],
    colour: 'from-red-600/20 to-red-500/5',
    border: 'border-red-500/20',
    iconBg: 'bg-red-500/15',
    iconColor: 'text-red-400',
  },
  {
    icon: ClipboardCheck,
    area: 'HACCP & Compliance',
    headline: 'Audit-ready. Every day.',
    points: ['CCPs generated per dish, per process', 'Evidence timestamped as work happens', 'One-click FSA-formatted inspection report'],
    colour: 'from-amber-600/20 to-amber-500/5',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
  },
  {
    icon: GraduationCap,
    area: 'Training',
    headline: 'Knowledge that doesn\'t walk out the door.',
    points: ['Training generated from your real operations', 'Onboarding that mirrors how you actually work', 'Auto-updates when menus or processes change'],
    colour: 'from-violet-600/20 to-violet-500/5',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
  },
  {
    icon: Wine,
    area: 'Bar & Wine',
    headline: 'Margins behind the bar, protected.',
    points: ['Wine lists kept aligned with food and pricing', 'Yield loss and pour drift flagged early', 'Confident upselling for front of house'],
    colour: 'from-rose-600/20 to-rose-500/5',
    border: 'border-rose-500/20',
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
  },
  {
    icon: Users,
    area: 'Front of House',
    headline: 'Service that matches the kitchen.',
    points: ['FOH always knows what\'s on the menu today', 'Allergen answers without "I\'ll just check"', 'Fewer errors, better guest experience'],
    colour: 'from-cyan-600/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Truck,
    area: 'Procurement',
    headline: 'Buy smarter. Every order.',
    points: ['Supplier-managed catalogues, always current', 'Invoice scanning and reconciliation automatic', 'Spend visibility by supplier, site, and category'],
    colour: 'from-orange-600/20 to-orange-500/5',
    border: 'border-orange-500/20',
    iconBg: 'bg-orange-500/15',
    iconColor: 'text-orange-400',
  },
  {
    icon: BarChart3,
    area: 'Multi-Site Operations',
    headline: 'Every site. One view.',
    points: ['GP, compliance, and spend across your estate', 'Regional benchmarks and site comparison', 'Centralised buying with local execution'],
    colour: 'from-teal-700/20 to-teal-600/5',
    border: 'border-teal-600/20',
    iconBg: 'bg-teal-600/15',
    iconColor: 'text-teal-300',
  },
];

export default function BusinessAreasSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-950 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
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

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.area}
                className={`group bg-gradient-to-br ${a.colour} border ${a.border} rounded-3xl p-6 hover:scale-[1.01] transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${a.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={a.iconColor} />
                  </div>
                  <div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${a.iconColor} opacity-70`}>{a.area}</div>
                    <div className="text-white font-black text-sm leading-tight mt-0.5">{a.headline}</div>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {a.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`${a.iconColor} text-xs mt-0.5 flex-shrink-0`}>→</span>
                      <span className="text-slate-400 text-xs leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Closing card */}
          <div className="sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-teal-900/40 to-slate-900/40 border border-teal-500/25 rounded-3xl p-8 text-center">
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
