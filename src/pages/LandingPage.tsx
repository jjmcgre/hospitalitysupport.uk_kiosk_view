import { Link } from 'react-router-dom';
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

const campaignSections = [
  { to: '/', label: 'Overview', desc: 'Campaign foundation and pricing', icon: LayoutDashboard },
  { to: '/brand', label: 'Brand & Positioning', desc: 'Master statements, headlines, message house', icon: Palette },
  { to: '/instagram', label: 'Instagram', desc: '3 Reel campaign briefs', icon: Instagram },
  { to: '/tiktok', label: 'TikTok', desc: '3 native video briefs', icon: Video },
  { to: '/facebook', label: 'Facebook', desc: '3 video campaign briefs', icon: Facebook },
  { to: '/linkedin', label: 'LinkedIn', desc: 'Videos, 10 posts, 20 ad copy variants', icon: Linkedin },
  { to: '/email', label: 'Email Campaign', desc: '5 fully written outreach emails', icon: Mail },
  { to: '/sales', label: 'Sales & Talking Points', desc: 'Pitches, objection handling', icon: MessageSquare },
  { to: '/brochure', label: 'Brochure / Sales Deck', desc: '8 pages of copy from cover to close', icon: BookOpen },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <span className="text-white font-bold text-sm tracking-tight">
          HospitalitySupport<span className="text-teal-400">.uk</span>
        </span>
        <Link
          to="/"
          className="text-slate-400 hover:text-teal-400 transition-colors text-xs font-medium"
        >
          Campaign Book
        </Link>
      </nav>

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
