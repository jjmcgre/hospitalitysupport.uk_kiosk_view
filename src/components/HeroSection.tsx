import { ArrowRight } from 'lucide-react';

const capabilities = [
  { label: 'Menu creation', sub: 'Full menu in under an hour' },
  { label: 'Live GP & costing', sub: 'Every dish, every day' },
  { label: 'Allergens & nutrition', sub: "Natasha's Law + full nutritional values" },
  { label: 'HACCP & food safety', sub: 'Audit-ready automatically' },
  { label: 'Staff training', sub: 'Built from your real ops' },
  { label: 'Supplier pricing', sub: 'Real-time, zero spreadsheets' },
  { label: 'Ordering & delivery', sub: 'POs, reconciliation, discrepancies caught' },
  { label: 'Multi-site control', sub: 'Every site, one dashboard' },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#080f1a] text-white relative overflow-hidden px-4 md:px-6">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 py-24 sm:py-28">
        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 border border-teal-500/30 bg-teal-500/10 rounded-full px-4 py-1.5 mb-8 sm:mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 text-xs font-bold tracking-widest uppercase">ServiceSupport.UK</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6 sm:mb-8">
            Stop doing<br />
            <span className="text-teal-400">the admin.</span><br />
            <span className="text-white/50 text-3xl sm:text-5xl md:text-6xl font-black">Start running the kitchen.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 sm:mb-14 leading-relaxed">
            One platform that runs your entire operation — menus, margins, allergens, compliance, training, and supplier pricing. All connected. All live. All automatic.
          </p>

          {/* Capability grid */}
          <div className="mb-10 sm:mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4 sm:mb-5">Everything it covers</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto">
              {capabilities.map((c) => (
                <div
                  key={c.label}
                  className="bg-teal-500/8 border border-teal-500/20 rounded-2xl px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowRight size={12} className="text-teal-400 flex-shrink-0" />
                    <span className="text-white text-sm font-bold leading-tight">{c.label}</span>
                  </div>
                  <span className="text-slate-500 text-xs leading-snug pl-5">{c.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-2xl mx-auto">
            {[
              { val: '5 min', label: 'to go live' },
              { val: 'Live', label: 'price tracking' },
              { val: '14', label: 'allergens auto-tracked' },
              { val: '0', label: 'spreadsheets needed' },
            ].map((s) => (
              <div key={s.label} className="bg-white/4 border border-white/8 rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-black text-teal-400 leading-none mb-1">{s.val}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
