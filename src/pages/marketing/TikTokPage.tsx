import PageHeader from './components/PageHeader';
import ScriptCard from './components/ScriptCard';

const campaigns = [
  {
    title: 'POV: Your kitchen just ran itself',
    hook: "POV: You're a chef-owner and your phone just sorted your GP before you even got to work.",
    scene: 'First person. Morning. Walking into kitchen. Phone in hand showing notification from HospitalitySupport.uk saying margin drift caught overnight.',
    script: `"POV: 6:45am. You're not even in yet.\n\nYour operations team already flagged that your chicken dish dropped 4 GP points overnight.\n\nThey already recommended a portion adjustment.\n\nThey already updated the spec.\n\nYou walk in. Everything's sorted.\n\nThat's HospitalitySupport.uk.\n\n£3.30 a day. Always on."`,
    cta: 'Link in bio.',
  },
  {
    title: "Things chefs know vs. things owners need to know",
    hook: "There are two very different problems in every hospitality business. One kitchen. Two perspectives.",
    scene: 'Split screen format. Chef side vs owner side. Both solved by same tool.',
    script: `"Chef knows:\n→ The lamb's underportioned\n→ New starter's not ready\n→ The allergen sheet is wrong\n\nOwner needs to know:\n→ GP is dropping\n→ Compliance is drifting\n→ The menu hasn't been updated in 6 weeks\n\nHospitalitySupport.uk bridges both.\n\nOne system. Both sides. £3.30 a day."`,
    cta: 'See it work. Link in bio.',
  },
  {
    title: 'Hospitality math nobody does',
    hook: "The maths that's quietly costing hospitality businesses thousands every month.",
    scene: 'Text-on-screen style. Fast cuts. Hook-heavy. Very TikTok native.',
    script: `"One dish drops 5 GP points.\nSells 40 covers a week.\nThat's £600 a month. Gone quietly.\n\nOne new hire gets it wrong on allergens.\nOne complaint. One inspection.\nThat's not a fine. That's a closure.\n\nOne chef leaves.\nMenu knowledge leaves with them.\nRetraining. Mistakes. Lost covers.\n\nHospitalitySupport.uk stops all three.\n\nEvery day.\nFor £3.30."`,
    cta: 'HospitalitySupport.uk — link in bio.',
  },
];

export default function TikTokPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="TikTok"
        subtitle="Three video campaign briefs for TikTok. Native format, hook-first, text-on-screen friendly."
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
            label="TikTok Campaign"
          />
        ))}
      </div>
    </div>
  );
}
