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
    title: 'The Systems Question',
    text: `Hospitality has been sold a lot of software over the past decade.\n\nReservation platforms. EPOS systems. Recipe cost tools. Training portals. Compliance apps. Allergen spreadsheets.\n\nAnd yet — most operators I speak to are still managing GP on a spreadsheet. Still scrambling before an inspection. Still relying on one experienced person who holds everything in their head.\n\nSo the question worth asking isn't "have operators adopted technology?" It's a more uncomfortable one:\n\nWas the technology ever built for how hospitality actually works?\n\nBecause there's a difference between software built to solve an operator's daily reality — and software built for a procurement deck, with a six-week onboarding and a per-seat licence model that makes no sense in an industry with 70%+ staff turnover.\n\nWe're at an interesting moment. The operators who are growing aren't just working harder. They're working with systems that actually carry some of the load.\n\nThe question is whether the industry has the tools that make that possible — or whether we're still asking people to adapt to the technology, rather than the other way around.\n\n#HospitalityOperations #FoodAndBeverage #RestaurantManagement #HospitalityTech`,
  },
  {
    title: 'The Margin Conversation Nobody Has',
    text: `Hospitality has a margin problem that rarely gets discussed honestly.\n\nNot the headline — everyone knows margins are tight. But the mechanics of why they erode, quietly, week after week.\n\nA chicken breast goes up 8p. A portion of cream up 3p. Cheddar has a new price from next month.\n\nNone of it triggers a conversation. None of it shows up until the month-end P&L — by which point you've sold hundreds of portions at the wrong margin, and the adjustment you make is already three weeks behind.\n\nThe tools most operators use weren't built to catch this in real time. They were built to record information. To generate reports after the fact. To give you a picture of what already happened.\n\nProfitability in this industry isn't won on the big decisions. It's won — or lost — on the continuous, invisible drift that compounds across 12 dishes, seven services a week, fifty-two weeks a year.\n\nThat's the operational gap. And closing it isn't about working harder — it's about having a system that's actually watching.\n\n#GPControl #FoodCostManagement #HospitalityProfit #RestaurantOperations`,
  },
  {
    title: 'What Experience Used to Hold Together',
    text: `There's a structural shift happening in hospitality that doesn't get talked about enough.\n\nFor decades, operational knowledge lived in people. A head chef who knew the true cost of every dish. A manager who remembered which supplier had raised prices quietly six months ago. An experienced FOH lead who kept standards consistent without a written process in sight.\n\nThat model worked — when experience stayed.\n\nIt's not staying. Staff turnover in UK hospitality is running well above 70% annually in many segments. The people who carried institutional knowledge are leaving — or moving on — faster than it can be passed on.\n\nThe honest conversation the industry needs to have is this: the operational systems most kitchens run on were designed for a workforce that doesn't exist anymore. They assume continuity. They assume trained users. They assume someone who already knows what they're doing.\n\nThe reality is a kitchen that's often running with a new team, under real compliance pressure, with margins that can't absorb errors.\n\nBuilding for that reality — rather than the idealised version — is where the genuine opportunity is. Both for operators trying to hold standards, and for the industry trying to rebuild its profitability from the ground up.\n\n#HospitalityIndustry #KitchenOperations #HospitalityLeadership #FoodService`,
  },
  {
    title: 'The Price of Hospitality',
    text: `Why does eating out feel expensive — and yet hospitality businesses are still failing at record rates?\n\nIt's a question worth sitting with. Because the answer isn't simple, and the usual framing — "it's rents, it's wages, it's energy" — only gets you so far.\n\nA big part of the answer is operational inefficiency at scale. Not incompetence. Not laziness. Structural inefficiency — built into how kitchens are run, how margins are monitored, how standards are maintained — that leaks money continuously, quietly, and mostly unnoticed.\n\nAn operator running at 62% GP on a dish they priced at 70% isn't making a bad decision. They're often just missing the information they'd need to make a better one, fast enough to act.\n\nWhen the technology infrastructure of an industry improves, the whole industry benefits. Prices can be held. Margins can be protected. The best operators can grow rather than just survive.\n\nThat's the long-term case for building better operational tools in hospitality. Not to replace chefs or managers or the craft that makes great food. But to carry the administrative and financial weight that shouldn't be sitting on their shoulders — so the people running these businesses can focus on the part that actually matters.\n\nThe industry deserves better infrastructure. We're trying to build some of it.\n\n#Hospitality #FoodIndustry #HospitalityTech #RestaurantBusiness #UKHospitality`,
  },
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
        subtitle="Video scripts, editorial posts, and ad copy — copy and deploy directly."
        deployLabel="How to use: copy any post script and paste directly into LinkedIn. For video, copy the script and record to camera."
        badge="LinkedIn"
      />
      <div className="px-4 py-6 sm:p-8 space-y-8">
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
          <h2 className="text-white font-bold text-lg mb-1">Editorial Posts</h2>
          <p className="text-slate-400 text-sm mb-4">Industry-led. Contextual. Arrive at the why — not the sell.</p>
          <div className="space-y-4">
            {posts.slice(0, 4).map((p) => (
              <ScriptCard
                key={p.title}
                title={p.title}
                script={p.text}
                label="Editorial"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-1">Direct Posts</h2>
          <p className="text-slate-400 text-sm mb-4">Tighter, more direct — for when the audience already knows the problem.</p>
          <div className="space-y-4">
            {posts.slice(4).map((p) => (
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
