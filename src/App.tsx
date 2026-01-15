import HeroSection from './components/HeroSection';
import ProblemsSection from './components/ProblemsSection';
import WhatsAppSection from './components/WhatsAppSection';
import TeamSection from './components/TeamSection';
import BenefitsSection from './components/BenefitsSection';
import DifferenceSection from './components/DifferenceSection';
import PricingSection from './components/PricingSection';
import ClosingSection from './components/ClosingSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
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

export default App;
