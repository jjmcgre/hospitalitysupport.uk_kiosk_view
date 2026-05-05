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
import BookingModal from '../components/BookingModal';
import { BookingProvider, useBooking } from '../context/BookingContext';

function Nav() {
  const { openBooking } = useBooking();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <span className="text-white font-bold text-sm tracking-tight">
        HospitalitySupport<span className="text-teal-400">.uk</span>
      </span>
      <button
        onClick={openBooking}
        className="bg-teal-500 hover:bg-teal-400 transition-colors text-white text-xs font-bold px-4 py-2 rounded-xl"
      >
        Request a demo
      </button>
    </nav>
  );
}

function PageContent() {
  const { openBooking } = useBooking();
  const [searchParams] = useSearchParams();

  useEffect(() => {
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
      <BookingModal />
    </div>
  );
}

export default function LandingPage() {
  return (
    <BookingProvider>
      <PageContent />
    </BookingProvider>
  );
}
