import { useState } from 'react';
import PageHeader from './components/PageHeader';
import ScriptCard from './components/ScriptCard';
import CopyButton from './components/CopyButton';

const videoBriefs = [
  {
    title: 'The Operators Briefing',
    hook: "Why most hospitality technology fails — and what a different approach looks like.",
    scene: 'Clean, professional. CEO / founder voice. Direct camera. Suit or smart casual.',
    script: `"Most hospitality technology is built for trained users with time and discipline.\n\nThat's not hospitality.\n\nHospitality is high turnover, low margins, compliance pressure, and a constant demand to do more with less.\n\nWe built HospitalitySupport.uk to operate in that reality.\n\nNot a tool. A team. A system that behaves like a reliable operations specialist — available every day, never needs managing, and builds itself around how you already work.\n\nFor operators, groups, and chains who are done managing around their software.\n\nHospitalitySupport.uk."`,
    cta: 'Learn more at HospitalitySupport.uk',
  },
  {
    title: 'The GP Bleed Problem',
    hook: "Hospitality businesses don't lose margin all at once. They bleed it slowly — and most never notice until it's too late.",
    scene: 'Data-driven. Charts or text-on-screen overlays. Calm but urgent.',
    script: `"One ingredient goes up 3%. A dish drifts 4 points.\nNo one notices.\n\nMultiplied across 12 dishes. Across 7 services a week.\nAcross 52 weeks.\n\nThat's the quiet problem in most hospitality businesses.\n\nHospitalitySupport.uk monitors GP continuously.\nCatches supplier price changes in real time.\nFlags which dishes are affected.\nRecommends adjustments before margin erodes.\n\nNot after the month-end P&L.\nBefore the damage is done.\n\nFor operators who want to lead with numbers, not react to them."`,
    cta: 'HospitalitySupport.uk',
  },
  {
    title: 'The Group Operations Brief',
    hook: "Managing 5 sites shouldn't mean 5x the work. Here's how multi-site operators are changing the model.",
    scene: 'Professional, multi-site context. Group operator perspective.',
    script: `"Every site added to a group adds operational complexity.\n\nStandards drift. Compliance varies. Training gaps widen.\n\nMost groups solve this with more management overhead. More area managers. More audits. More paper.\n\nHospitalitySupport.uk gives groups central visibility without centralised management.\n\nEvery kitchen operating to the same standard. Every compliance record live. Every training completion tracked.\n\nOne price per kitchen. No per-user licences. No hidden costs as you scale.\n\nFor groups who want to grow without losing control."`,
    cta: 'Talk to us at HospitalitySupport.uk',
  },
];

const posts = [
  {
    title: 'The Spreadsheet Problem',
    text: `Most hospitality businesses are still managing GP on spreadsheets.\n\nUpdated once a week. Maybe.\n\nBy which point the dish that was at 72% is now at 65% — and you've sold it 200 times at the wrong margin.\n\nHospitalitySupport.uk monitors margin continuously. Catches price changes. Flags affected dishes. Recommends adjustments.\n\nBefore the damage is done.\n\nNot a dashboard. An operations team.\n\n#Hospitality #FoodAndBeverage #RestaurantManagement #GPControl`,
  },
  {
    title: 'The Skill Erosion Post',
    text: `The biggest operational risk in hospitality right now isn't supplier prices.\n\nIt's skill erosion.\n\nExperience is leaving the industry. Turnover is high. Kitchens are running on lower-experience teams expected to deliver the same standards.\n\nHospitalitySupport.uk was built for exactly this reality.\n\nTraining that generates itself from your actual operation. Standards that don't depend on who's in this week. Knowledge that doesn't walk out the door.\n\n#HospitalityOperations #ChefLife #KitchenManagement`,
  },
  {
    title: 'The Compliance Before Crisis Post',
    text: `Environmental health shouldn't be a crisis.\n\nFor most operators, it is — because compliance is reactive.\n\nRecords get rushed before inspections. Training gets done in bulk. Allergen matrices are static documents nobody updates.\n\nHospitalitySupport.uk makes compliance continuous.\n\nEvidence created as work happens. Training tracked. Records current.\n\nSo an inspection is just a Tuesday.\n\n#FoodSafety #ComplianceManagement #Hospitality #EHO`,
  },
  {
    title: 'The Per-User Pricing Problem',
    text: `Most hospitality software charges per user.\n\nWhich means the more staff you have, the more you pay.\n\nIn an industry with high turnover, that's not pricing that works.\n\nHospitalitySupport.uk is priced per kitchen. Not per user. Not per seat.\n\nUnlimited staff access. One flat monthly cost.\n\nBecause hospitality teams change. Your pricing shouldn't.\n\n#HospitalityTech #RestaurantSoftware #FoodServiceManagement`,
  },
  {
    title: 'The Not-Software Post',
    text: `HospitalitySupport.uk isn't software.\n\nIt's a team.\n\nMenu Development Chef. Cost & GP Controller. Allergen Specialist. Training Manager. Compliance Lead. Front-of-House Specialist.\n\nAll of them working from the same live data. Nothing duplicated. Nothing forgotten.\n\nFor £3.30 a day.\n\nNo payroll. No politics. No sick days.\n\n#HospitalitySupport #TeamWithoutPayroll #RestaurantOperations`,
  },
  {
    title: 'The Margin Maths Post',
    text: `Here's some hospitality maths that's rarely done:\n\n1 dish at 5% below target GP\n× 40 covers per week\n× 52 weeks\n= £2,000–£5,000 in quiet, unnoticed margin loss\n\nMultiply that by 3–4 dishes drifting at the same time.\n\nHospitalitySupport.uk catches this before it compounds.\n\nProactive GP management. Continuous. Automatic. £3.30 a day.\n\n#GPManagement #RestaurantProfit #FoodCostControl`,
  },
  {
    title: 'The Inspection Prep Scramble',
    text: `The week before an EHO inspection.\n\nYou know the one.\n\nPrinting records. Checking training sheets. Hunting for allergen matrices that might not be current.\n\nHospitalitySupport.uk removes this entirely.\n\nBecause compliance is maintained every day — not prepared for.\n\nWhen the inspector arrives, everything's already in order. Because it always is.\n\n#FoodSafetyFirst #Compliance #KitchenOperations`,
  },
  {
    title: 'The Training Consistency Post',
    text: `Consistency in hospitality is the hardest thing to maintain.\n\nEspecially when your team changes every few months.\n\nHospitalitySupport.uk generates training from your actual operation — your menu, your roles, your service standards.\n\nNewstarters get trained on what they'll actually be doing. Before their first shift. On their phone.\n\nConsistency that doesn't depend on who's in this week.\n\n#HospitalityTraining #OnboardingDoneRight #KitchenConsistency`,
  },
  {
    title: 'The Multi-Site Visibility Post',
    text: `Managing multiple sites shouldn't mean multiple problems.\n\nBut for most groups, adding sites adds complexity: drifting standards, inconsistent compliance, variable training quality.\n\nHospitalitySupport.uk gives multi-site operators central visibility.\n\nEvery site. Same standards. One price per kitchen.\n\nNot more management overhead. More operational clarity.\n\n#MultiSiteHospitality #HospitalityGroups #OperationsManagement`,
  },
  {
    title: 'The £100 Reframe Post',
    text: `£100 a month for a full hospitality operations team.\n\nMenu development. GP control. Allergen management. Compliance. Training. Supplier monitoring.\n\nFor pubs, restaurants and cafés.\n\nFor context:\n→ A part-time operations manager costs £1,500–£3,000/month\n→ Replacing one chef costs £2,000+ in time and errors\n→ One failed inspection can close your doors\n\nHospitalitySupport.uk: £100/month. Per kitchen. Always on.\n\n#HospitalityBusiness #RestaurantOwner #SmartOperations`,
  },
];

const adHeadlines = [
  "The operations team that never calls in sick",
  "GP monitored. Compliance current. Training done. £3.30/day.",
  "Stop managing around your software. Start using a team.",
  "Every kitchen. Same standards. One flat price.",
  "Menu development, cost control, compliance — all in your pocket.",
  "Built for how hospitality actually works.",
  "Your team changes. Your pricing shouldn't.",
  "Priced per kitchen. Not per user. Not per seat.",
  "The support your experienced staff never had time to give.",
  "HospitalitySupport.uk — expertise without the payroll.",
];

const adBodies = [
  "HospitalitySupport.uk gives hospitality operators a full operations team — menu development, GP control, compliance, training, and allergen management — for £3.30 a day. Priced per kitchen, not per user.",
  "Supplier prices change. Margins drift. Staff turn over. HospitalitySupport.uk monitors all of it, continuously — so you don't have to.",
  "Most hospitality software assumes trained users, time, and discipline. HospitalitySupport.uk is built for the reality: high turnover, low margins, constant pressure. It builds itself around how you work.",
  "Training that generates itself from your actual operation. Compliance tracked live. GP monitored continuously. One team. One price. No headcount restrictions.",
  "From £100/month per kitchen, HospitalitySupport.uk is the operations team you never had to hire. No payroll. No sick days. No politics.",
  "Multi-site operators: one price per kitchen, central visibility across all sites, consistent standards without micromanagement. HospitalitySupport.uk scales with you.",
  "Dark kitchens and production kitchens have unique operational demands. HospitalitySupport.uk High-Intensity Kitchen tier is built for high-churn, multi-brand environments.",
  "If you can send a message, you can use HospitalitySupport.uk. No training required. No onboarding. Just ask what you need.",
  "The hospitality industry is losing experienced people. HospitalitySupport.uk maintains standards that don't depend on who's in this week.",
  "£3.30 a day. No per-user pricing. No seat licences. Just a full operations team — always available, always current.",
];

interface CopyListCardProps {
  title: string;
  items: string[];
}

function CopyListCard({ title, items }: CopyListCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-750 transition-colors"
      >
        <h3 className="text-white font-semibold text-base">{title}</h3>
        <span className="text-slate-400 text-sm">{open ? 'Hide' : `Show ${items.length} items`}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-slate-700 pt-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-4 bg-slate-900/50 rounded-xl p-3 border border-slate-700">
              <p className="text-slate-300 text-sm flex-1">{item}</p>
              <CopyButton text={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LinkedInPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="LinkedIn"
        subtitle="Three video briefs, ten post scripts, ten ad headlines, and ten ad body copy variants."
        badge="LinkedIn"
      />
      <div className="p-8 space-y-8">
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Video Briefs</h2>
          <div className="space-y-4">
            {videoBriefs.map((v) => (
              <ScriptCard
                key={v.title}
                title={v.title}
                hook={v.hook}
                scene={v.scene}
                script={v.script}
                cta={v.cta}
                label="LinkedIn Video"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-4">Post Scripts</h2>
          <div className="space-y-4">
            {posts.map((p) => (
              <ScriptCard
                key={p.title}
                title={p.title}
                script={p.text}
                label="LinkedIn Post"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-4">Ad Copy</h2>
          <div className="space-y-4">
            <CopyListCard title="Ad Headlines (10)" items={adHeadlines} />
            <CopyListCard title="Ad Body Copy (10)" items={adBodies} />
          </div>
        </div>
      </div>
    </div>
  );
}
