import { Check } from 'lucide-react';

const benefits = [
  "Chefs cook instead of managing spreadsheets",
  "Owners see problems before they cost money",
  "Juniors deliver consistency without constant supervision",
  "Businesses stop relying on one exhausted 'hero'"
];

const capabilities = [
  "Protect GP without daily attention",
  "Maintain standards in lower-skill environments",
  "Scale without losing control",
  "Reduce burnout and turnover"
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 md:mb-8 text-white tracking-tight">
            Why would I use it?
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-center text-gray-300 mb-12 md:mb-16 lg:mb-20 max-w-3xl mx-auto leading-relaxed">
            Because it removes work you shouldn't be doing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 lg:mb-20">
            <div className="bg-gradient-to-br from-teal-900/50 via-teal-800/30 to-slate-900/50 border-2 border-teal-700/50 rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-white">What changes</h3>
              <ul className="space-y-4 md:space-y-5">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 md:gap-4">
                    <Check size={24} className="text-teal-400 flex-shrink-0 mt-1 md:w-7 md:h-7" />
                    <span className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-900/50 via-teal-800/30 to-slate-900/50 border-2 border-teal-700/50 rounded-3xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-white">It allows you to</h3>
              <ul className="space-y-4 md:space-y-5">
                {capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-3 md:gap-4">
                    <Check size={24} className="text-teal-400 flex-shrink-0 mt-1 md:w-7 md:h-7" />
                    <span className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
