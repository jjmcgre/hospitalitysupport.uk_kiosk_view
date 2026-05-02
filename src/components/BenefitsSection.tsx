import { ChefHat, User, BarChart3, ArrowRight } from 'lucide-react';

const stats = [
  { val: '6 hrs', label: 'saved per week', sub: 'Not chasing supplier prices' },
  { val: '0', label: 'allergen errors', sub: 'Auto-generated from ingredients' },
  { val: 'Always', label: 'live GP', sub: 'No more end-of-month surprises' },
  { val: '5 min', label: 'to go live', sub: 'Upload. Connect. Done.' },
];

const roles = [
  {
    role: 'Head Chef',
    icon: ChefHat,
    old: 'Rebuilding costings every time a price changes',
    now: 'Every dish recosted automatically. You just cook.',
  },
  {
    role: 'Owner / Operator',
    icon: User,
    old: 'End-of-month surprises when margins have eroded',
    now: 'Live GP on every dish. You see problems before they cost you.',
  },
  {
    role: 'Multi-site Group',
    icon: BarChart3,
    old: 'Calling each site to check compliance and spend',
    now: 'One dashboard shows every site\'s status in real time.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-950 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-5xl">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            <span className="text-slate-400">It does the heavy lifting.</span><br />
            <span className="text-white">So you can cook.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Every hour you spend on admin is an hour not spent on food, guests, and growing your business.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="bg-teal-500/10 border border-teal-500/25 rounded-3xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-black text-teal-400 mb-1 leading-none">{s.val}</div>
              <div className="text-white text-xs font-bold uppercase tracking-wider mb-3">{s.label}</div>
              <div className="text-slate-400 text-xs leading-snug">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Role outcome cards — no strikethroughs */}
        <div className="grid sm:grid-cols-3 gap-4">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.role} className="bg-white/4 border border-white/8 rounded-3xl p-6 hover:border-teal-500/25 transition-colors">
                <div className="w-10 h-10 bg-teal-500/15 border border-teal-500/30 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={18} className="text-teal-400" />
                </div>
                <div className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">{r.role}</div>
                <div className="text-slate-500 text-xs mb-3 leading-snug">{r.old}</div>
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
