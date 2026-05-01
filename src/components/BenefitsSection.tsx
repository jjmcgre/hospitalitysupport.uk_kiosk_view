export default function BenefitsSection() {
  const frees = [
    {
      hours: '6 hrs',
      label: 'saved per week',
      task: 'Not chasing supplier prices',
      colour: 'from-teal-600 to-teal-500',
    },
    {
      hours: '0',
      label: 'allergen errors',
      task: 'Auto-generated from ingredients',
      colour: 'from-sky-600 to-sky-500',
    },
    {
      hours: 'Always',
      label: 'live GP',
      task: 'No more end-of-month surprises',
      colour: 'from-emerald-600 to-emerald-500',
    },
    {
      hours: '5 min',
      label: 'to go live',
      task: 'Upload. Connect. Done.',
      colour: 'from-teal-700 to-teal-500',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-5xl">

        {/* Big payoff line */}
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
          {frees.map((f) => (
            <div key={f.label} className={`bg-gradient-to-br ${f.colour} rounded-3xl p-6 text-center`}>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1 leading-none">{f.hours}</div>
              <div className="text-white/70 text-xs font-bold uppercase tracking-wider mb-3">{f.label}</div>
              <div className="text-white/60 text-xs leading-snug">{f.task}</div>
            </div>
          ))}
        </div>

        {/* The three role outcomes */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              role: 'Head Chef',
              icon: '👨‍🍳',
              old: 'Rebuilding costings every time a price changes',
              now: 'Every dish recosted automatically. You just cook.',
            },
            {
              role: 'Owner / Operator',
              icon: '📊',
              old: 'End-of-month surprises when margins have eroded',
              now: 'Live GP on every dish. You see problems before they cost you.',
            },
            {
              role: 'Multi-site Group',
              icon: '🏢',
              old: 'Calling each site to check compliance and spend',
              now: 'One dashboard shows every site\'s status in real time.',
            },
          ].map((r) => (
            <div key={r.role} className="bg-white/4 border border-white/8 rounded-3xl p-6 hover:border-teal-500/25 transition-colors">
              <div className="text-3xl mb-3">{r.icon}</div>
              <div className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">{r.role}</div>
              <div className="text-slate-500 text-xs line-through decoration-red-400/50 mb-3 leading-snug">{r.old}</div>
              <div className="text-white text-sm font-semibold leading-snug">{r.now}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
