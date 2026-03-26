export default function ClosingSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 tracking-tight">
            The truth that holds it all together
          </h2>

          <div className="space-y-6 md:space-y-8 text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            <p>
              HospitalitySupport.uk doesn't change what hospitality is.
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-teal-400 font-bold">
              It changes what you personally have to carry.
            </p>
            <p>
              It's a team of experts in your pocket —<br className="hidden sm:block" />
              working the way you already do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
