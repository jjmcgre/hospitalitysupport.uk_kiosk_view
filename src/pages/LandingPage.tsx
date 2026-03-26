import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProblemsSection from '../components/ProblemsSection';
import WhatsAppSection from '../components/WhatsAppSection';
import TeamSection from '../components/TeamSection';
import BenefitsSection from '../components/BenefitsSection';
import DifferenceSection from '../components/DifferenceSection';
import PricingSection from '../components/PricingSection';
import ClosingSection from '../components/ClosingSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <span className="text-white font-bold text-sm">HospitalitySupport<span className="text-teal-400">.uk</span></span>
        <Link
          to="/marketing"
          className="text-sm font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/30 px-4 py-2 rounded-lg hover:bg-teal-500/20 transition-colors"
        >
          Campaign Book
        </Link>
      </nav>
      <HeroSection />
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
