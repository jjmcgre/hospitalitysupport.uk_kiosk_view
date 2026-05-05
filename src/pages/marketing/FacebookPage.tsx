import PageHeader from './components/PageHeader';
import ScriptCard from './components/ScriptCard';

const campaigns = [
  {
    title: 'The Operators Post',
    hook: "If you run a pub, restaurant or café and you're still managing GP on spreadsheets — this is for you.",
    scene: 'Calm talking-head video. Owner/manager voice. Not sales-y. Real.',
    script: `"Running a hospitality business right now is relentless.\n\nYou're managing food costs while suppliers change prices weekly. You're training staff in teams that turn over every few months. You're trying to stay compliant while keeping a kitchen moving.\n\nMost operators do all of this manually. Spreadsheets, chases, paper records, and hope.\n\nWe built something different.\n\nHospitalitySupport.uk works like a team of specialists — menu development, cost control, allergen management, training, compliance — all in one place, available any time, and it builds itself around how you already work.\n\nNot a system you have to learn. Not software you have to configure.\n\nA team in your pocket.\n\nFrom £3.30 a day."`,
    cta: 'Find out more at HospitalitySupport.uk',
  },
  {
    title: 'The Training Problem Ad',
    hook: "Two new starters every month. How do you keep standards consistent when experience keeps walking out the door?",
    scene: 'Documentary style. Busy kitchen. Staff changing.',
    script: `"The average hospitality business trains the same things every few months.\n\nBecause turnover is high. Because experience leaves. Because knowledge doesn't stay.\n\nHospitalitySupport.uk changes that.\n\nTraining plans built from your actual menu and your actual operation. Allergen modules, service standards, kitchen knowledge — all generated for each role, sent direct to their phone.\n\nThey do it before their first shift. You get the completion report.\n\nNo briefing. No printouts. No repeating yourself.\n\nConsistency that doesn't depend on who's in this week."`,
    cta: 'See it at HospitalitySupport.uk',
  },
  {
    title: 'The Compliance Reality Check',
    hook: "An environmental health inspection shouldn't feel like a crisis. It should be boring.",
    scene: 'Calm, authoritative. Cut between inspection context and clean dashboard.',
    script: `"Most hospitality businesses prepare for inspections.\n\nThey shouldn't have to.\n\nIf your compliance is live — your records current, your training complete, your food safety evidence in order — an inspection is just a Tuesday.\n\nHospitalitySupport.uk keeps compliance visible every day.\n\nNot what you hope is in order. What actually is.\n\nFood safety. Allergen records. Training completion. All current. All accessible.\n\nSo when someone walks through your door with a clipboard, you're already ready.\n\nHospitalitySupport.uk. Compliance by design, not by panic."`,
    cta: 'HospitalitySupport.uk',
  },
];

export default function FacebookPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="Facebook"
        subtitle="Three video scripts — copy the script, brief a videographer, or record direct to camera."
        deployLabel="How to use: expand a campaign, copy the script, record to camera or brief a videographer, upload to Facebook."
        badge="Social Video"
      />
      <div className="px-4 py-6 sm:p-8 space-y-4">
        {campaigns.map((c) => (
          <ScriptCard
            key={c.title}
            title={c.title}
            hook={c.hook}
            scene={c.scene}
            script={c.script}
            cta={c.cta}
            label="Facebook Campaign"
          />
        ))}
      </div>
    </div>
  );
}
