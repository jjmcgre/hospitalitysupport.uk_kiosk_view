import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DishJourneySection from '../components/DishJourneySection';
import BusinessAreasSection from '../components/BusinessAreasSection';
import ProblemsSection from '../components/ProblemsSection';
import WhatsAppSection from '../components/WhatsAppSection';
import TeamSection from '../components/TeamSection';
import BenefitsSection from '../components/BenefitsSection';
import DifferenceSection from '../components/DifferenceSection';
import PricingSection from '../components/PricingSection';
import ClosingSection from '../components/ClosingSection';
import { useBooking } from '../context/BookingContext';
import { captureRef } from '../lib/referral';

function Nav() {
  const { openBooking } = useBooking();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <span className="text-white font-bold text-sm tracking-tight">
        ServiceSupport<span className="text-teal-400">.UK</span>
      </span>
      <button
        onClick={openBooking}
        className="bg-teal-500 hover:bg-teal-400 active:bg-teal-600 transition-all text-white text-xs sm:text-sm font-bold px-4 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        Request a demo
      </button>
    </nav>
  );
}

export default function LandingPage() {
  const { openBooking } = useBooking();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    captureRef();
    if (searchParams.get('book') === '1') {
      openBooking();
    }
  }, [searchParams, openBooking]);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <HeroSection />
      <DishJourneySection />
      <BusinessAreasSection />
      <ProblemsSection />
      <TeamSection />
      <DifferenceSection />
      <BenefitsSection />
      <WhatsAppSection />
      <PricingSection />
      <ClosingSection />
    </div>
  );
}
