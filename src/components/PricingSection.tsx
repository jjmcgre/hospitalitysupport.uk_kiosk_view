export default function PricingSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-white tracking-tight">
              Pricing
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 leading-relaxed">
              Annual billing. Priced per kitchen, not per user.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-emerald-900/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <h3 className="text-xl md:text-2xl font-bold">Standard Venue</h3>
              </div>

              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">£100</div>
                <div className="text-lg text-gray-300">per month</div>
              </div>

              <p className="text-gray-300 mb-6 text-sm md:text-base border-l-4 border-blue-500/50 pl-4">
                For pubs, restaurants, cafés.
              </p>

              <div className="space-y-3 mb-6 bg-white/5 rounded-xl p-4 md:p-5">
                <p className="text-gray-300 text-sm md:text-base">Live menu creation & GP control</p>
                <p className="text-gray-300 text-sm md:text-base">Training & compliance management</p>
                <p className="text-gray-300 text-sm md:text-base">Supplier price monitoring</p>
                <p className="text-gray-300 text-sm md:text-base">Unlimited staff access</p>
                <p className="text-gray-300 text-sm md:text-base">No per-user pricing</p>
              </div>

              <p className="text-sm md:text-base text-gray-400 italic">
                For about the price of a coffee a day, it stops the mistakes that cost far more.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-emerald-900/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-emerald-300 rounded-sm"></div>
                <h3 className="text-xl md:text-2xl font-bold">High-Intensity Kitchen</h3>
              </div>

              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">£180</div>
                <div className="text-lg text-emerald-100">per month</div>
              </div>

              <p className="text-emerald-100 mb-6 text-sm md:text-base border-l-4 border-emerald-300/50 pl-4">
                For dark kitchens, production kitchens, high-churn operations.
              </p>

              <div className="space-y-3 mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20">
                <p className="text-emerald-50 text-sm md:text-base">Everything in Standard Venue</p>
                <p className="text-emerald-50 text-sm md:text-base">Larger teams & higher turnover supported</p>
                <p className="text-emerald-50 text-sm md:text-base">Multiple menus / brands per kitchen</p>
                <p className="text-emerald-50 text-sm md:text-base">Higher training & compliance throughput</p>
              </div>

              <p className="text-sm md:text-base text-emerald-200 italic">
                Priced for operational load — not headcount.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-gray-900/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                <h3 className="text-xl md:text-2xl font-bold">Multi-Site & Groups</h3>
              </div>

              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">£100</div>
                <div className="text-lg text-gray-300">per kitchen / month</div>
              </div>

              <p className="text-gray-300 mb-6 text-sm md:text-base border-l-4 border-gray-500/50 pl-4">
                Same price as Standard Venue. Priced per kitchen, always.
              </p>

              <div className="space-y-3 mb-6 bg-white/5 rounded-xl p-4 md:p-5">
                <p className="text-gray-300 text-sm md:text-base">Central compliance visibility</p>
                <p className="text-gray-300 text-sm md:text-base">Group-level reporting & oversight</p>
                <p className="text-gray-300 text-sm md:text-base">Shared admin access</p>
                <p className="text-gray-300 text-sm md:text-base">Consistent standards without micromanagement</p>
              </div>

              <p className="text-sm md:text-base text-gray-400 italic">
                You don't get it cheaper. You get it clearer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
