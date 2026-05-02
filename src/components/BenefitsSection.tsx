import { ChefHat, User, BarChart3, ArrowRight } from 'lucide-react';

const stats = [
  { val: 'Weeks', label: 'of admin saved every month', sub: 'Menus, costings, compliance, training — automated' },
  { val: '£000s', label: 'in margin protected', sub: 'Price creep caught before it hits your P&L' },
  { val: 'Zero', label: 'allergen errors', sub: 'Auto-generated from ingredients, always current' },
  { val: '5 min', label: 'to go live', sub: 'Upload your data. You\'re operational immediately.' },
];

const roles = [
  {
    role: 'Head Chef',
    icon: ChefHat,
    old: 'Hours rebuilding costings every time a supplier price moves',
    now: 'Every dish recosted automatically. You focus on food, not figures.',
  },
  {
    role: 'Owner / Operator',
    icon: User,
    old: 'Discovering eroded margins at month end — when it\'s too late',
    now: 'Live GP on every dish. Problems surface in hours, not weeks.',
  },
  {
    role: 'Multi-site Group',
    icon: BarChart3,
    old: 'Calling each site to piece together compliance and spend data',
    now: 'One dashboard. Every site\'s status — compliance, GP, spend — in real time.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-950 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-5xl">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            <span className="text-slate-400">It does the heavy lifting.</span><br />
            <span className="text-white">So you can run the business.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            The admin, the paperwork, the chasing — it doesn't disappear. It just stops being your problem.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="bg-teal-500/8 border border-teal-500/20 rounded-3xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-teal-400 mb-1 leading-none">{s.val}</div>
              <div className="text-white text-xs font-bold uppercase tracking-wider mb-2">{s.label}</div>
              <div className="text-slate-500 text-xs leading-snug">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Role outcome cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.role} className="bg-white/4 border border-white/8 rounded-3xl p-6">
                <div className="w-10 h-10 bg-teal-500/15 border border-teal-500/25 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={18} className="text-teal-400" />
                </div>
                <div className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">{r.role}</div>
                <div className="text-slate-500 text-xs mb-4 leading-snug">{r.old}</div>
                <div className="flex items-start gap-2">
                  <ArrowRight size={13} className="text-teal-400 flex-shrink-0 mt-0.5" />
                  <div className="text-white text-sm font-semibold leading-snug">{r.now}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
