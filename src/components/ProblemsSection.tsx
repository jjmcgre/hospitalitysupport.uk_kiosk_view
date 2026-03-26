import { TrendingDown, AlertTriangle, PoundSterling } from 'lucide-react';

const problems = [
  {
    icon: TrendingDown,
    number: "1",
    subtitle: "People",
    title: "Skill levels are eroding",
    description: "Experience is leaving the industry. Turnover is constant. You're expected to deliver the same standards with less experience on the floor.",
    points: [
      "one or two good people",
      "memory",
      "constant supervision"
    ],
    conclusion: "That model doesn't scale and doesn't last."
  },
  {
    icon: AlertTriangle,
    number: "2",
    subtitle: "Process",
    title: "Compliance is a constant battle",
    description: "Food safety, allergens, training, records, inspections. Not because people don't care — but because it's relentless, boring, and unforgiving.",
    points: [
      "rushed before inspections",
      "inconsistent between sites",
      "dependent on paperwork and hope"
    ],
    conclusion: "That's not compliance. That's exposure."
  },
  {
    icon: PoundSterling,
    number: "3",
    subtitle: "Profit",
    title: "Margins are eroding quietly",
    description: "Supplier prices creep. Portions drift. Menus age. GP leaks without anyone noticing until it hurts.",
    points: [
      "Most hospitality businesses don't lose margin in one big hit",
      "They bleed it slowly"
    ],
    conclusion: "By the time you notice, it's already cost you."
  }
];

export default function ProblemsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 md:mb-16 lg:mb-20 text-gray-900 tracking-tight">
            The reality of hospitality today
          </h2>
          <p className="text-lg md:text-xl text-center text-gray-600 mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed">
            Hospitality doesn't have hundreds of problems.<br />
            It has three, and everything else sits underneath them.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {problems.map((problem, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-300 rounded-3xl p-6 md:p-10 shadow-lg hover:border-teal-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6 md:mb-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <problem.icon size={24} className="text-white md:w-7 md:h-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-base font-semibold text-teal-600 uppercase tracking-wider mb-1">{problem.subtitle}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{problem.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                  {problem.description}
                </p>

                <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                  <p className="text-sm font-semibold text-gray-600 mb-3 md:mb-4 uppercase tracking-wide">Consistency depends on:</p>
                  <ul className="space-y-2 md:space-y-3">
                    {problem.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start gap-3 md:gap-4">
                        <span className="text-teal-600 text-xl md:text-2xl">•</span>
                        <span className="text-gray-700 text-base md:text-lg pt-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {problem.conclusion && (
                  <p className="text-gray-500 italic text-base md:text-lg border-l-4 border-gray-300 pl-4 md:pl-6">
                    {problem.conclusion}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
