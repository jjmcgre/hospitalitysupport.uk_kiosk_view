export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden px-4 md:px-6">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-teal-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-500/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 text-sm font-semibold tracking-wide">Built by operators, for operators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            The Operating System<br />
            <span className="text-teal-400">for Modern Hospitality</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10">
            Your entire operation — kitchen, suppliers, compliance, team — on one intelligent platform.{' '}
            <span className="text-white font-semibold">Live in under 5 minutes.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {[
              '5 min to go live',
              'Legacy data ingested in minutes',
              'No implementation consultants',
              'No per-user pricing',
            ].map((s) => (
              <span key={s} className="bg-white/8 border border-white/15 rounded-full px-4 py-2 text-sm text-slate-200 font-medium">
                {s}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { val: '5 min', label: 'Sign-up to live' },
              { val: '134', label: 'Backend functions' },
              { val: '14', label: 'Allergens tracked' },
              { val: '2,000+', label: 'Products per supplier' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/6 border border-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-black text-teal-400 mb-1">{stat.val}</div>
                <div className="text-xs text-slate-400 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
