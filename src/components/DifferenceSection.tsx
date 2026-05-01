export default function DifferenceSection() {
  const pillars = [
    {
      icon: '🧠',
      title: 'The Brain',
      sub: 'Understands food, not just data',
      body: '"60g flat fish fillet skin-off" is not the same as "frozen fish block." It knows the difference — and prices them correctly.',
    },
    {
      icon: '⚡',
      title: 'Live in 5 minutes',
      sub: 'Your data, not ours',
      body: 'Upload your existing recipes, supplier lists, staff records. Ingested and live in minutes. No 6-week implementation. No consultants.',
    },
    {
      icon: '🔗',
      title: 'Supplier-connected',
      sub: 'They update. You benefit.',
      body: 'Suppliers get their own portal. They manage their own pricing and catalogues. You always have live, accurate data without lifting a finger.',
    },
    {
      icon: '📋',
      title: 'Compliance on autopilot',
      sub: 'Audit-ready every day',
      body: 'Allergen matrices, HACCP, training logs, and pre-service briefings — all timestamped and signed. One click for inspection reports.',
    },
    {
      icon: '📍',
      title: 'Multi-site command',
      sub: 'One view, every location',
      body: 'See which sites are compliant, which are overspending, and who needs attention — across your entire estate, in one dashboard.',
    },
    {
      icon: '🛡️',
      title: 'Built by operators',
      sub: 'Not a boardroom product',
      body: 'Every feature was built by people who ran kitchens and managed supply chains. If it didn\'t solve a real problem, it didn\'t get built.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#080f1a] px-4 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <div className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-5">
            Why it's different
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Built to do the work.<br />
            <span className="text-teal-400">Not to be managed.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Most platforms need you to keep them updated. This one keeps itself updated — and keeps you protected.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group bg-slate-900/60 border border-white/8 rounded-3xl p-7 hover:border-teal-500/30 hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <div className="text-white font-black text-lg mb-1 leading-tight">{p.title}</div>
              <div className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-3">{p.sub}</div>
              <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
