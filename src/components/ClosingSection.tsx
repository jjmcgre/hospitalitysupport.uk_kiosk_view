import { ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function ClosingSection() {
  const { openBooking } = useBooking();

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
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          We'll walk you through the platform live — menus built, dishes costed, allergens generated, compliance running. No slides. No sales pitch. Just the platform doing exactly what it does.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-12 text-left">
          {[
            'A full dish — spec, allergens, HACCP, nutrition — built live in the demo',
            'Your supplier pricing connected and auto-recosting your menu',
            'Compliance evidence generated without a clipboard in sight',
            'Staff training created from your actual roles and processes',
            'Multi-site GP and compliance visibility in one dashboard',
            'The full picture of what it replaces — and what it costs you not to have it',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-xl px-4 py-3">
              <ArrowRight size={13} className="text-teal-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300 text-sm leading-snug">{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={openBooking}
          className="bg-teal-500 hover:bg-teal-400 transition-colors rounded-2xl px-10 py-4 mb-5 cursor-pointer"
        >
          <span className="text-white font-black text-xl">Request Your Demo</span>
        </button>

        <div className="text-slate-600 text-sm mb-3">Built by operators. No 6-week onboarding. No consultants. No contract lock-in.</div>
        <div className="text-slate-600 text-sm">
          Or email us:{' '}
          <a href="mailto:james@servicesupportgroup.uk" className="text-teal-500 hover:text-teal-400 transition-colors">
            james@servicesupportgroup.uk
          </a>
        </div>
      </div>
    </section>
  );
}
