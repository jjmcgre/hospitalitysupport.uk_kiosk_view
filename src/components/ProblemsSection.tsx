import { Brain, Zap, Truck, TrendingUp, ShieldCheck, Building2 } from 'lucide-react';

const pillars = [
  {
    icon: Brain,
    number: '01',
    title: 'The Brain — Built by Operators',
    description: 'Months of development by people who have run kitchens and managed supply chains. It understands "60g flat fish fillet skin-off" differently from "frozen fish block." It learns your preferences and gets smarter every day.',
    tag: 'Proprietary Intelligence',
  },
  {
    icon: Zap,
    number: '02',
    title: 'Live From Day One',
    description: 'Onboard in 5 minutes. Upload your existing recipes, supplier lists, and staff data. Legacy data ingested, structured, and activated within minutes — not a 6-week implementation project.',
    tag: 'Speed to Value',
  },
  {
    icon: Truck,
    number: '03',
    title: 'Suppliers Manage Themselves',
    description: 'Suppliers get their own portal. They update their own pricing, upload their own compliance docs, manage their own promotions. You stay in control without doing their admin.',
    tag: 'Supplier Ecosystem',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Live Recipe Costing',
    description: 'When ingredient prices change, every dish recalculates instantly. No stale margins. No surprises. You always know your true food cost — in real time, every time.',
    tag: 'Financial Intelligence',
  },
  {
    icon: ShieldCheck,
    number: '05',
    title: 'Compliance Without Clipboards',
    description: 'Allergen briefings, HACCP, training, task evidence — all timestamped, signed, and audit-ready. One-click reports for inspections. Natasha\'s Law handled automatically.',
    tag: 'Compliance',
  },
  {
    icon: Building2,
    number: '06',
    title: 'Multi-Site Command Centre',
    description: 'One dashboard for every location. Centralised buying power with local control. See who is compliant, who is wasting money, and who needs attention — instantly.',
    tag: 'Multi-Site',
  },
];

export default function ProblemsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
              One platform.<br className="hidden sm:block" /> Six ways it changes everything.
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Every feature built by operators who lived the problem before they solved it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p) => (
              <div
                key={p.number}
                className="bg-gray-50 border border-gray-200 rounded-3xl p-7 hover:border-teal-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shadow-md group-hover:bg-teal-600 transition-colors">
                    <p.icon size={22} className="text-white" />
                  </div>
                  <span className="text-xs font-black text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 uppercase tracking-wide">
                    {p.tag}
                  </span>
                </div>
                <div className="text-[11px] font-black text-slate-400 mb-1 tracking-widest uppercase">{p.number}</div>
                <h3 className="text-lg font-black text-gray-900 mb-3 leading-tight">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
