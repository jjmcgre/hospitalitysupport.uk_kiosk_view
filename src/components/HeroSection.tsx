import { ArrowRight } from 'lucide-react';

const eliminated = [
  'Chasing supplier price lists',
  'Stale recipe costings',
  'Allergen spreadsheets',
  'Compliance paperwork',
  'Training from scratch',
  'GP guesswork',
];

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#080f1a] text-white relative overflow-hidden px-4 md:px-6">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10 py-24">
        <div className="max-w-5xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 border border-teal-500/30 bg-teal-500/10 rounded-full px-4 py-1.5 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 text-xs font-bold tracking-widest uppercase">HospitalitySupport.uk</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8">
            Stop doing<br />
            <span className="text-teal-400">the admin.</span><br />
            <span className="text-white/50 text-4xl sm:text-5xl md:text-6xl font-black">Start running the kitchen.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed">
            Connect your suppliers once. We track every price movement, recost every dish, and keep your margins protected — automatically, every day.
          </p>

          {/* Eliminated tasks — no strikethrough */}
          <div className="mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-5">Handled automatically from day one</p>
            <div className="flex flex-wrap justify-center gap-3">
              {eliminated.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 bg-teal-500/8 border border-teal-500/20 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300"
                >
                  <ArrowRight size={13} className="text-teal-400 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { val: '5 min', label: 'to go live' },
              { val: 'Live', label: 'price tracking' },
              { val: '14', label: 'allergens auto-tracked' },
              { val: '0', label: 'spreadsheets needed' },
            ].map((s) => (
              <div key={s.label} className="bg-white/4 border border-white/8 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-teal-400 leading-none mb-1">{s.val}</div>
                <div className="text-[11px] text-slate-500 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
