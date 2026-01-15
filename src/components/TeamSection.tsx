import { useState } from 'react';
import { ChefHat, TrendingUp, Eye, Shield, GraduationCap, ClipboardCheck, Wine, Users, ChevronDown, ChevronUp } from 'lucide-react';

const team = [
  {
    icon: ChefHat,
    title: "Menu Development Chef",
    description: "Builds menus that work in real kitchens",
    details: {
      headline: "Full menu generated in under one hour",
      subheadline: "Individual dish with full spec in under two minutes",
      includes: [
        "recipe & portion",
        "mise en place & batch-cooking guidance",
        "allergens & nutritional values"
      ],
      designedAround: [
        "your kitchen's skill level",
        "service pressure",
        "seasonal availability"
      ],
      extra: "Wine pairings suggested to match dish, price point, and margin",
      replaces: "menu rewrites, allergen spreadsheets, nutrition guesswork"
    }
  },
  {
    icon: TrendingUp,
    title: "Cost & GP Controller",
    description: "Protects margin continuously",
    details: {
      headline: "Prices dishes using live supplier data",
      points: [
        "GP calculated per dish and across the menu",
        "Margin drift detected automatically"
      ],
      recommends: [
        "ingredient swaps",
        "portion adjustments",
        "price changes"
      ],
      replaces: "spreadsheets, guesswork, and late GP surprises"
    }
  },
  {
    icon: Eye,
    title: "Supplier & Price Watcher",
    description: "Stops silent price creep",
    details: {
      points: [
        "Monitors supplier price changes in real time",
        "Flags which dishes are affected and by how much",
        "Tracks availability and risk",
        "Keeps menus tied to what you can actually buy"
      ],
      replaces: "chasing suppliers and unnoticed margin erosion"
    }
  },
  {
    icon: Shield,
    title: "Allergen & Nutrition Specialist",
    description: "Keeps you safe by design",
    details: {
      points: [
        "Allergens calculated directly from ingredients",
        "Nutritional values kept live as recipes change",
        "Menu, specs, and records always aligned",
        "No manual checks or copy-paste"
      ],
      replaces: "static allergen matrices and human error"
    }
  },
  {
    icon: GraduationCap,
    title: "Training Manager",
    description: "Stops knowledge walking out the door",
    details: {
      points: [
        "Training generated from real roles and real work",
        "Onboarding aligned to how you actually operate",
        "Training updates automatically as menus or processes change",
        "Supports consistency in lower-skill teams"
      ],
      replaces: "tribal knowledge and constant retraining"
    }
  },
  {
    icon: ClipboardCheck,
    title: "Compliance Lead",
    description: "Keeps inspections boring",
    details: {
      points: [
        "Live visibility of food safety and operational compliance",
        "Shows what's compliant, drifting, or missing",
        "Evidence created as work happens",
        "No inspection scramble"
      ],
      replaces: "paperwork, stress, and compliance by hope"
    }
  },
  {
    icon: Wine,
    title: "Wine & Bar Specialist",
    description: "Aligns drinks, margin, and service",
    details: {
      points: [
        "Wine and bar lists kept aligned with pricing and margin",
        "Yield loss and margin drift flagged early",
        "Availability and substitutions managed automatically",
        "Supports confident upselling"
      ],
      replaces: "outdated lists and quiet margin loss behind the bar"
    }
  },
  {
    icon: Users,
    title: "Front-of-House Specialist",
    description: "Keeps service consistent",
    details: {
      points: [
        "FOH knowledge always matches the live menu",
        "Staff know what's being served today",
        "Fewer service errors and \"I'll check\" moments",
        "Better guest confidence and experience"
      ],
      replaces: "inconsistent service and lost sales"
    }
  }
];

export default function TeamSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden px-4">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-40 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight">Meet your pocket team</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
              A full hospitality operations team — without payroll, politics, or turnover
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              It's not humans responding — it's a system built from real hospitality expertise, designed to behave like a reliable operations team.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 mb-12 md:mb-16">
            <p className="text-xl sm:text-2xl md:text-3xl text-center text-emerald-400 font-bold">
              You're not buying software. You're gaining capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className={`group bg-white/5 backdrop-blur-xl border-2 rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer ${
                  expandedIndex === idx
                    ? 'bg-white/10 border-emerald-400/60 shadow-2xl md:col-span-2'
                    : 'border-white/10 hover:bg-white/10 hover:border-emerald-400/40 hover:shadow-xl'
                }`}
                onClick={() => toggleExpand(idx)}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
                      expandedIndex === idx ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      <member.icon size={24} className="text-white md:w-7 md:h-7" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors ${
                          expandedIndex === idx ? 'text-emerald-400' : 'group-hover:text-emerald-400'
                        }`}>{member.title}</h3>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">{member.description}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {expandedIndex === idx ? (
                          <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                        )}
                      </div>
                    </div>

                    {expandedIndex === idx && (
                      <div className="mt-6 pt-6 border-t border-white/20 space-y-4 animate-fadeIn">
                        {member.details.headline && (
                          <p className="text-base md:text-lg font-semibold text-emerald-300">{member.details.headline}</p>
                        )}
                        {member.details.subheadline && (
                          <p className="text-sm md:text-base text-gray-300">{member.details.subheadline}</p>
                        )}

                        {member.details.includes && (
                          <div>
                            <p className="text-sm md:text-base font-semibold text-white mb-2">Every dish includes:</p>
                            <ul className="space-y-1 ml-4">
                              {member.details.includes.map((item, i) => (
                                <li key={i} className="text-sm md:text-base text-gray-300 before:content-['•'] before:mr-2 before:text-emerald-400">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {member.details.designedAround && (
                          <div>
                            <p className="text-sm md:text-base font-semibold text-white mb-2">Designed around:</p>
                            <ul className="space-y-1 ml-4">
                              {member.details.designedAround.map((item, i) => (
                                <li key={i} className="text-sm md:text-base text-gray-300 before:content-['•'] before:mr-2 before:text-emerald-400">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {member.details.points && (
                          <ul className="space-y-2">
                            {member.details.points.map((point, i) => (
                              <li key={i} className="text-sm md:text-base text-gray-300 before:content-['•'] before:mr-2 before:text-emerald-400">{point}</li>
                            ))}
                          </ul>
                        )}

                        {member.details.recommends && (
                          <div>
                            <p className="text-sm md:text-base font-semibold text-white mb-2">Recommends fixes:</p>
                            <ul className="space-y-1 ml-4">
                              {member.details.recommends.map((item, i) => (
                                <li key={i} className="text-sm md:text-base text-gray-300 before:content-['•'] before:mr-2 before:text-emerald-400">{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {member.details.extra && (
                          <p className="text-sm md:text-base text-gray-300 italic">{member.details.extra}</p>
                        )}

                        {member.details.replaces && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-sm md:text-base text-gray-400">
                              <span className="font-semibold text-emerald-400">Replaces:</span> {member.details.replaces}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 text-center">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              All of them work from the same live reality.<br />
              <span className="text-emerald-400 font-bold text-xl sm:text-2xl md:text-3xl">Nothing duplicated. Nothing forgotten.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
