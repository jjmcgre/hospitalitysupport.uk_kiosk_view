import { Wrench, Users } from 'lucide-react';

export default function DifferenceSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 md:mb-16 lg:mb-20 text-gray-900 tracking-tight">
            Why is it different from everything else?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-3xl p-6 md:p-10 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6 md:mb-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Wrench size={24} className="text-white md:w-7 md:h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Most hospitality systems are tools</h3>
              </div>

              <p className="text-gray-200 mb-4 md:mb-6 text-base md:text-lg">They assume:</p>
              <div className="space-y-4 md:space-y-5">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="font-bold text-base md:text-lg">Trained users</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="font-bold text-base md:text-lg">Discipline</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="font-bold text-base md:text-lg">Structure</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="font-bold text-base md:text-lg">Someone remembering to keep things updated</p>
                </div>
              </div>

              <p className="text-gray-300 italic mt-6 md:mt-8 text-base md:text-lg border-l-4 border-white/30 pl-4 md:pl-6">That's not the reality of hospitality.</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-3xl p-6 md:p-10 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-6 md:mb-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-white md:w-7 md:h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">HospitalitySupport.uk behaves like a team member</h3>
              </div>

              <p className="text-emerald-100 mb-6 md:mb-8 text-base md:text-lg font-semibold">Not a tool.</p>

              <div className="space-y-4 md:space-y-5">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="font-bold mb-2 text-base md:text-lg">You don't build your business around it.</p>
                  <p className="text-emerald-100 text-sm md:text-base">It builds itself around you.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="font-bold mb-2 text-base md:text-lg">You don't configure it.</p>
                  <p className="text-emerald-100 text-sm md:text-base">You just tell it what you need.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="font-bold mb-2 text-base md:text-lg">You don't manage it.</p>
                  <p className="text-emerald-100 text-sm md:text-base">It manages the work for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
