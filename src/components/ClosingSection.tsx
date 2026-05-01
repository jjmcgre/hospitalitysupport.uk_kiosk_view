export default function ClosingSection() {
  return (
    <section className="py-20 md:py-28 bg-[#080f1a] px-4 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight mb-6">
          <span className="text-slate-400">30 minutes.</span><br />
          <span className="text-white">See it live.</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          We'll ingest your real data, connect a supplier, and show your dishes recosting in front of you. No slides. No jargon. Just your operation, running on the platform.
        </p>

        {/* What you'll see */}
        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-12 text-left">
          {[
            'Your legacy data ingested and live within the demo',
            'Recipes recosted against real supplier pricing',
            'Allergen docs generated without a spreadsheet',
            'Compliance evidence captured without clipboards',
            'Suppliers managing their own data — you just see it',
            'Your GP protected, automatically, from day one',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-xl px-4 py-3">
              <span className="text-teal-400 font-black text-sm mt-0.5 flex-shrink-0">→</span>
              <span className="text-slate-300 text-sm leading-snug">{item}</span>
            </div>
          ))}
        </div>

        <div className="inline-block bg-teal-500 hover:bg-teal-400 transition-colors rounded-2xl px-10 py-4 cursor-pointer mb-5">
          <span className="text-white font-black text-xl">Request Your Demo</span>
        </div>
        <div className="text-slate-600 text-sm">Built by operators. No 6-week onboarding. No consultants.</div>
      </div>
    </section>
  );
}
