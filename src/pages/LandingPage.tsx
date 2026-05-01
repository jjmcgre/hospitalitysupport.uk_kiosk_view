import { Link } from 'react-router-dom';
import { LayoutDashboard, Instagram, Video, Facebook, Linkedin, Mail, MessageSquare, Palette, BookOpen, ArrowRight } from 'lucide-react';
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
  { to: '/marketing', label: 'Overview', desc: 'Campaign foundation and pricing', icon: LayoutDashboard },
  { to: '/marketing/brand', label: 'Brand & Positioning', desc: 'Master statements, headlines, message house', icon: Palette },
  { to: '/marketing/instagram', label: 'Instagram', desc: '3 Reel campaign briefs', icon: Instagram },
  { to: '/marketing/tiktok', label: 'TikTok', desc: '3 native video briefs', icon: Video },
  { to: '/marketing/facebook', label: 'Facebook', desc: '3 video campaign briefs', icon: Facebook },
  { to: '/marketing/linkedin', label: 'LinkedIn', desc: 'Videos, 10 posts, 20 ad copy variants', icon: Linkedin },
  { to: '/marketing/email', label: 'Email Campaign', desc: '5 fully written outreach emails', icon: Mail },
  { to: '/marketing/sales', label: 'Sales & Talking Points', desc: 'Pitches, objection handling', icon: MessageSquare },
  { to: '/marketing/brochure', label: 'Brochure / Sales Deck', desc: '8 pages of copy from cover to close', icon: BookOpen },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <span className="text-white font-bold text-sm tracking-tight">
          HospitalitySupport<span className="text-teal-400">.uk</span>
        </span>
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

      <section className="bg-slate-950 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1 mb-4 uppercase tracking-wider">
              Campaign Book
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Everything you need to launch
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              9 chapters of ready-to-use campaign material — social video, email, sales scripts, brand, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaignSections.map((section) => (
              <Link
                key={section.to}
                to={section.to}
                className="group bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:bg-slate-800/80"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/20 transition-colors">
                  <section.icon size={18} className="text-teal-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm mb-0.5 group-hover:text-teal-300 transition-colors">{section.label}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{section.desc}</p>
                </div>
                <ArrowRight size={14} className="text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all mt-0.5 flex-shrink-0" />
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/marketing"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base"
            >
              Open Campaign Book
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
