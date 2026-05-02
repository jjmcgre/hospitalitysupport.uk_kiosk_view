import { useState } from 'react';
import { ChefHat, TrendingUp, Eye, Shield, GraduationCap, ClipboardCheck, Wine, Users, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const team = [
  {
    icon: ChefHat,
    title: 'Menu Development Chef',
    description: 'Builds menus that work in real kitchens',
    details: {
      headline: 'Full menu generated in under one hour',
      subheadline: 'Individual dish with full spec in under two minutes',
      includes: ['recipe & portion', 'mise en place & batch-cooking guidance', 'allergens & nutritional values'],
      designedAround: ['your kitchen\'s skill level', 'service pressure', 'seasonal availability'],
      extra: 'Wine pairings suggested to match dish, price point, and margin',
      replaces: 'menu rewrites, allergen spreadsheets, nutrition guesswork',
    },
  },
  {
    icon: TrendingUp,
    title: 'Cost & GP Controller',
    description: 'Protects margin continuously',
    details: {
      headline: 'Prices dishes using live supplier data',
      points: ['GP calculated per dish and across the menu', 'Margin drift detected automatically'],
      recommends: ['ingredient swaps', 'portion adjustments', 'price changes'],
      replaces: 'spreadsheets, guesswork, and late GP surprises',
    },
  },
  {
    icon: Eye,
    title: 'Supplier & Price Watcher',
    description: 'Stops silent price creep',
    details: {
      points: [
        'Monitors supplier price changes in real time',
        'Flags which dishes are affected and by how much',
        'Tracks availability and risk',
        'Keeps menus tied to what you can actually buy',
      ],
      replaces: 'chasing suppliers and unnoticed margin erosion',
    },
  },
  {
    icon: Shield,
    title: 'Allergen & Nutrition Specialist',
    description: 'Keeps you safe by design',
    details: {
      points: [
        'Allergens calculated directly from ingredients',
        'Nutritional values kept live as recipes change',
        'Menu, specs, and records always aligned',
        'No manual checks or copy-paste',
      ],
      replaces: 'static allergen matrices and human error',
    },
  },
  {
    icon: GraduationCap,
    title: 'Training Manager',
    description: 'Stops knowledge walking out the door',
    details: {
      points: [
        'Training generated from real roles and real work',
        'Onboarding aligned to how you actually operate',
        'Training updates automatically as menus or processes change',
        'Supports consistency in lower-skill teams',
      ],
      replaces: 'tribal knowledge and constant retraining',
    },
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance Lead',
    description: 'Keeps inspections boring',
    details: {
      points: [
        'Live visibility of food safety and operational compliance',
        "Shows what's compliant, drifting, or missing",
        'Evidence created as work happens',
        'No inspection scramble',
      ],
      replaces: 'paperwork, stress, and compliance by hope',
    },
  },
  {
    icon: Wine,
    title: 'Wine & Bar Specialist',
    description: 'Aligns drinks, margin, and service',
    details: {
      points: [
        'Wine and bar lists kept aligned with pricing and margin',
        'Yield loss and margin drift flagged early',
        'Availability and substitutions managed automatically',
        'Supports confident upselling',
      ],
      replaces: 'outdated lists and quiet margin loss behind the bar',
    },
  },
  {
    icon: Users,
    title: 'Front-of-House Specialist',
    description: 'Keeps service consistent',
    details: {
      points: [
        'FOH knowledge always matches the live menu',
        "Staff know what's being served today",
        'Fewer service errors and "I\'ll check" moments',
        'Better guest confidence and experience',
      ],
      replaces: 'inconsistent service and lost sales',
    },
  },
];

export default function TeamSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-[#080f1a] px-4 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-14">
          <div className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-5">
            Your pocket team
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6 text-white">
            Meet your pocket team
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
            A full hospitality operations team — without payroll, politics, or turnover
          </p>
          <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
            It's not humans responding — it's a system built from real hospitality expertise, designed to behave like a reliable operations team.
          </p>
        </div>

        <div className="bg-teal-500/8 border border-teal-500/25 rounded-3xl p-6 md:p-8 mb-12 text-center">
          <p className="text-xl sm:text-2xl md:text-3xl text-teal-400 font-black">
            You're not buying software. You're gaining capability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.map((member, idx) => {
            const Icon = member.icon;
            const isOpen = expandedIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-slate-900/60 border rounded-3xl p-6 md:p-7 transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? 'border-teal-500/40 bg-slate-900 md:col-span-2'
                    : 'border-white/8 hover:border-teal-500/25 hover:bg-slate-900/80'
                }`}
                onClick={() => setExpandedIndex(isOpen ? null : idx)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-500/15 border border-teal-500/25 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className={`text-base md:text-lg font-black mb-1 transition-colors ${isOpen ? 'text-teal-400' : 'text-white'}`}>
                          {member.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{member.description}</p>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {isOpen
                          ? <ChevronUp size={18} className="text-teal-400" />
                          : <ChevronDown size={18} className="text-slate-500" />
                        }
                      </div>
                    </div>

                    {isOpen && (
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        {member.details.headline && (
                          <p className="text-base font-black text-teal-300">{member.details.headline}</p>
                        )}
                        {member.details.subheadline && (
                          <p className="text-sm text-slate-300">{member.details.subheadline}</p>
                        )}

                        {member.details.includes && (
                          <div>
                            <p className="text-sm font-bold text-white mb-2">Every dish includes:</p>
                            <ul className="space-y-1">
                              {member.details.includes.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                  <ArrowRight size={12} className="text-teal-400 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {member.details.designedAround && (
                          <div>
                            <p className="text-sm font-bold text-white mb-2">Designed around:</p>
                            <ul className="space-y-1">
                              {member.details.designedAround.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                  <ArrowRight size={12} className="text-teal-400 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {member.details.points && (
                          <ul className="space-y-1.5">
                            {member.details.points.map((point, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <ArrowRight size={12} className="text-teal-400 flex-shrink-0 mt-0.5" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}

                        {member.details.recommends && (
                          <div>
                            <p className="text-sm font-bold text-white mb-2">Recommends fixes:</p>
                            <ul className="space-y-1">
                              {member.details.recommends.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                  <ArrowRight size={12} className="text-teal-400 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {member.details.extra && (
                          <p className="text-sm text-slate-400 italic">{member.details.extra}</p>
                        )}

                        {member.details.replaces && (
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-sm text-slate-500">
                              <span className="font-bold text-teal-400">Replaces: </span>
                              {member.details.replaces}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            All of them work from the same live reality.<br />
            <span className="text-teal-400 font-black text-xl sm:text-2xl">Nothing duplicated. Nothing forgotten.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
