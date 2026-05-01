export default function ClosingSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden px-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight">
            See It In Action
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            A 30-minute conversation that will change how you think about your operation. We will show you legacy data ingested live, recipes costed against real pricing, and compliance generated without a single spreadsheet.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto text-left">
            {[
              'Legacy data ingested live within the demo',
              'Recipes costed against real supplier pricing',
              'Allergen docs generated without a spreadsheet',
              'Suppliers managing their own data',
              'Compliance evidence captured without clipboards',
              'The Brain understanding your food, not just keywords',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-teal-400 font-black mt-0.5 flex-shrink-0">→</span>
                <span className="text-slate-300 text-sm leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-teal-500 hover:bg-teal-400 transition-colors rounded-xl px-10 py-4 cursor-pointer">
              <span className="text-white font-black text-lg">Request Your Demo</span>
            </div>
            <p className="text-slate-400 text-sm">
              Built by operators. No jargon. No 6-week onboarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
