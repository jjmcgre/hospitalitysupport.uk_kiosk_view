import { ChefHat, TrendingUp, Eye, Shield, GraduationCap, ClipboardCheck, Wine, Users } from 'lucide-react';

const team = [
  {
    icon: ChefHat,
    title: "Menu Development Chef",
    description: "Builds menus that actually work for your business, not generic templates."
  },
  {
    icon: TrendingUp,
    title: "Cost & GP Controller",
    description: "Protects margin continuously using live supplier data."
  },
  {
    icon: Eye,
    title: "Supplier & Price Watcher",
    description: "Stops silent price creep and availability shocks."
  },
  {
    icon: Shield,
    title: "Allergen & Nutrition Specialist",
    description: "Keeps you safe by design, not by checking."
  },
  {
    icon: GraduationCap,
    title: "Training Manager",
    description: "Turns knowledge into something that survives staff turnover."
  },
  {
    icon: ClipboardCheck,
    title: "Compliance Lead",
    description: "Keeps inspections boring and predictable."
  },
  {
    icon: Wine,
    title: "Wine & Bar Specialist",
    description: "Keeps service, pricing, and knowledge aligned."
  },
  {
    icon: Users,
    title: "Front-of-House Specialist",
    description: "Ensures consistent guest experience across all touchpoints."
  }
];

export default function TeamSection() {
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
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A full hospitality operations team — without payroll, politics, or turnover<br />
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
                className="group bg-white/5 backdrop-blur-xl border-2 border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <member.icon size={24} className="text-white md:w-7 md:h-7" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-emerald-400 transition-colors">{member.title}</h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">{member.description}</p>
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
