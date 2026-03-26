import PageHeader from './components/PageHeader';
import ScriptCard from './components/ScriptCard';

const campaigns = [
  {
    title: 'The Sunday Supplier Spike',
    hook: "Your lamb just went up 8%. Here's what we did about it — in under 30 seconds.",
    scene: 'Screen recording of a WhatsApp conversation with HospitalitySupport.uk. Real-looking, fast, clean.',
    script: `"Sunday morning. Supplier email. Lamb up 8%.\n\nI sent one message.\n\n30 seconds later — three options. Adjusted portion. Switched cut. Updated price point.\n\nGP protected. Menu updated. Done before the team arrived.\n\nThis is HospitalitySupport.uk. £3.30 a day."`,
    cta: 'Link in bio. Try it free.',
  },
  {
    title: 'The New Starter Problem',
    hook: "Two new starters Monday. Fully trained before their first shift — without me doing anything.",
    scene: 'Cut between: overwhelmed manager, phone with WhatsApp chat, confident staff on service.',
    script: `"Monday. Two new starters.\n\nOne message to my operations team.\n\nTraining plans built for their roles. Allergen modules. Menu knowledge. Service standards.\n\nThey did it on their phones before they started.\n\nI got completion alerts.\n\nI didn't lift a finger.\n\nHospitalitySupport.uk — the team that's always already done it."`,
    cta: 'See how it works. Link in bio.',
  },
  {
    title: 'The £3.30 Reveal',
    hook: "How much does a daily coffee cost vs. the mistakes it stops?",
    scene: 'Split screen: coffee on a counter / WhatsApp chat with cost savings shown.',
    script: `"£3.30 a day.\n\nThat's what a full hospitality operations team costs with HospitalitySupport.uk.\n\nMenu development chef. Cost controller. Compliance lead. Training manager. Allergen specialist.\n\nAll of them. In your pocket. Always available.\n\n£3.30 a day.\n\nNo payroll. No politics. No sick days."`,
    cta: 'HospitalitySupport.uk — link in bio.',
  },
];

export default function InstagramPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="Instagram"
        subtitle="Three video campaign briefs for Instagram Reels. Short, punchy, designed for the scroll."
        badge="Social Video"
      />
      <div className="p-8 space-y-4">
        {campaigns.map((c) => (
          <ScriptCard
            key={c.title}
            title={c.title}
            hook={c.hook}
            scene={c.scene}
            script={c.script}
            cta={c.cta}
            label="Reel Campaign"
          />
        ))}
      </div>
    </div>
  );
}
