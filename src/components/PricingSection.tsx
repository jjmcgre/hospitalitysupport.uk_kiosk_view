import { ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Standard Venue',
    price: '£100',
    period: 'per month',
    for: 'Pubs, restaurants, cafés',
    pitch: 'Less than the cost of one wasted delivery. More than enough to protect every margin, every day.',
    features: [
      'Full menu creation & live GP control',
      'Allergen compliance — Natasha\'s Law handled',
      'HACCP & food safety documentation',
      'Staff training generated from your ops',
      'Supplier price monitoring & auto-recosting',
      'Unlimited staff access — no per-user fees',
    ],
    highlight: false,
  },
  {
    name: 'High-Intensity Kitchen',
    price: '£250',
    period: 'per month',
    for: 'Dark kitchens & production kitchens',
    pitch: 'Priced for operational load, not headcount. Built for kitchens where margins move daily and errors cost thousands.',
    features: [
      'Everything in Standard Venue',
      'Multiple menus and brands per kitchen',
      'Higher-volume training & compliance throughput',
      'Larger teams and higher staff turnover supported',
    ],
    highlight: true,
  },
  {
    name: 'Multi-Site & Groups',
    price: '£100',
    period: 'per kitchen / month',
    for: 'Groups, estates, franchise operators',
    pitch: "Same per-kitchen price as Standard. You don't pay more to see more — you just get full visibility across your estate.",
    features: [
      'Everything in Standard Venue',
      'Group-level compliance and spend reporting',
      'Central oversight with local execution',
      'Consistent standards without micromanagement',
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-[#080f1a] px-4 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">

        <div className="text-center mb-14">
          <div className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-5">
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Priced per kitchen.<br />
            <span className="text-teal-400">Not per user.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Annual billing. Your whole team, one flat fee. No add-ons for compliance, training, or multi-user access.
          </p>
        </div>

        {/* Disruption callout */}
        <div className="mb-10 bg-slate-900/60 border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto text-center">
          <p className="text-white font-black text-xl mb-3">
            "That seems cheap. Is it actually any good?"
          </p>
          <p className="text-slate-400 text-base leading-relaxed mb-4">
            We hear this a lot. The platforms you're paying thousands for right now aren't better — they just got there first, locked you in, and charged accordingly. We built this from scratch, for how kitchens actually work, and we've priced it so cost is never the reason you don't try it.
          </p>
          <p className="text-teal-400 font-bold text-base">
            Don't take our word for it. Book a 30-minute demo and see your own operation running on it live.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl p-7 flex flex-col ${
                t.highlight
                  ? 'bg-teal-500/15 border-2 border-teal-500/50 shadow-xl shadow-teal-900/30'
                  : 'bg-slate-900/60 border border-white/8'
              }`}
            >
              {t.highlight && (
                <div className="inline-block self-start bg-teal-500/20 border border-teal-500/40 text-teal-300 text-[10px] font-black tracking-widest uppercase rounded-full px-3 py-1 mb-5">
                  High volume
                </div>
              )}

              <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">{t.for}</div>
              <h3 className="text-white font-black text-xl mb-5">{t.name}</h3>

              <div className="mb-6">
                <span className="text-5xl font-black text-white">{t.price}</span>
                <span className="text-slate-400 text-base ml-2">{t.period}</span>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <ArrowRight size={13} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm leading-snug ${t.highlight ? 'text-slate-200' : 'text-slate-400'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <p className={`text-xs leading-relaxed italic border-t pt-5 ${
                t.highlight ? 'text-teal-300/80 border-teal-500/30' : 'text-slate-500 border-white/8'
              }`}>
                {t.pitch}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-teal-500/8 border border-teal-500/20 rounded-3xl p-6 text-center">
          <p className="text-white font-black text-lg mb-1">The cost of one bad month pays for a year.</p>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Margin erosion, allergen errors, failed inspections, staff retraining — any one of these costs more than the annual subscription. This prevents all of them.
          </p>
        </div>
      </div>
    </section>
  );
}
