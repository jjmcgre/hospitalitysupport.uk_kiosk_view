import { useState } from 'react';
import CopyButton from './components/CopyButton';
import PageHeader from './components/PageHeader';

interface BrochureSection {
  page: number;
  label: string;
  headline: string;
  body: string;
}

const sections: BrochureSection[] = [
  {
    page: 1,
    label: "Cover",
    headline: "A team of experts in your pocket — built around how hospitality actually works.",
    body: `HospitalitySupport.uk

The operations team you never had to hire.

From £3.30 a day. Priced per kitchen, not per user.`,
  },
  {
    page: 2,
    label: "The Problem",
    headline: "Hospitality doesn't have hundreds of problems. It has three.",
    body: `People. Process. Profit.

Skill levels are eroding. Experience is leaving the industry. Turnover is constant. You're expected to deliver the same standards with less experience on the floor — and most businesses are still relying on one or two good people to make it work.

Compliance is a constant battle. Food safety, allergens, training, records. Not because people don't care — but because it's relentless, unforgiving, and mostly done reactively.

Margins are eroding quietly. Supplier prices creep. Portions drift. Menus age. Most hospitality businesses don't lose margin in one big hit. They bleed it slowly — and by the time you notice, it's already cost you.

Everything else in the industry sits underneath these three problems. HospitalitySupport.uk is built to solve all three.`,
  },
  {
    page: 3,
    label: "The Solution",
    headline: "Not software. Not a tool. A team.",
    body: `Most hospitality technology is built for trained users with time, discipline, and structure. That's not the reality of hospitality.

HospitalitySupport.uk works differently.

It behaves like a reliable operations team — built from real hospitality expertise, available any time, and designed to operate in real kitchens with real pressures.

You don't configure it. You just tell it what you need.
You don't build your business around it. It builds itself around you.
You don't manage it. It manages the work for you.

The interface is WhatsApp. If your team can send a message, they can use this.`,
  },
  {
    page: 4,
    label: "Meet the Team",
    headline: "A full hospitality operations team — without the payroll.",
    body: `Menu Development Chef
Builds menus in under an hour. Individual dishes in under two minutes. Includes allergens, nutrition, GP, and wine pairings.

Cost & GP Controller
Monitors margin continuously. Catches supplier price changes. Recommends adjustments before you notice on the P&L.

Supplier & Price Watcher
Tracks supplier prices in real time. Flags affected dishes. Monitors availability and risk.

Allergen & Nutrition Specialist
Allergens calculated from ingredients. Nutrition kept live as recipes change. Records always aligned.

Training Manager
Training generated from your real roles. Sent direct to staff. Tracked automatically. Updates as your menu changes.

Compliance Lead
Live visibility of food safety and operational compliance. Evidence created as work happens. No inspection scramble.

Wine & Bar Specialist
Lists aligned with pricing and margin. Yield loss flagged early. Supports confident upselling.

Front-of-House Specialist
FOH knowledge matches the live menu. Staff know what's being served. Fewer errors. Better guest experience.

All of them work from the same live reality. Nothing duplicated. Nothing forgotten.`,
  },
  {
    page: 5,
    label: "How It Works",
    headline: "If you can use WhatsApp, you can use this.",
    body: `There's no onboarding. No training. No configuration project.

You access HospitalitySupport.uk the same way you'd message a team member.

Ask about a dish. Get full specs, allergens, GP, and portion guidance — in under two minutes.

Tell it your lamb prices went up. Get three options for protecting your margin — before service starts.

Send two new starters' roles. Receive training plans for both, sent to their phones, tracked automatically.

Ask where your compliance stands. Get a live view of what's current, what's drifting, and what needs attention.

One message. Real answers. Built from your actual operation.

The system learns your business as you use it. It doesn't need configuring. It just needs a conversation.`,
  },
  {
    page: 6,
    label: "Pricing",
    headline: "Priced per kitchen. Not per user. Not per seat.",
    body: `Standard Venue — £100/month
For pubs, restaurants, and cafés.
Full team access. Unlimited staff. Live menu creation, GP control, training, compliance, allergen management, and supplier monitoring.

High-Intensity Kitchen (Dark Kitchens) — £250/month
For dark kitchens, production kitchens, and high-churn operations.
Everything in Standard Venue, plus larger team support, multiple menus and brands per kitchen, and higher training and compliance throughput.

Multi-Site & Groups — £100/month per kitchen
Same price as Standard Venue. Priced per kitchen, always.
Central compliance visibility, group-level reporting, shared admin access, and consistent standards across every site.

Annual billing. No setup fees. No per-user pricing. No hidden costs.

For about the price of a coffee a day, it stops the mistakes that cost far more.`,
  },
  {
    page: 7,
    label: "Who It's For",
    headline: "Built for operators who are done carrying everything themselves.",
    body: `HospitalitySupport.uk is for hospitality operators who:

→ Are managing GP on spreadsheets and catching problems too late
→ Have high staff turnover and need training that doesn't rely on the same few people
→ Are spending more time managing compliance than managing their business
→ Are running multiple sites and losing visibility as they scale
→ Have one experienced person holding everything together — and know what happens when they leave
→ Are paying for software their team doesn't fully use
→ Want a team in their pocket, not another platform to manage

If any of these are true, HospitalitySupport.uk is for you.`,
  },
  {
    page: 8,
    label: "Close",
    headline: "The truth that holds it all together.",
    body: `HospitalitySupport.uk doesn't change what hospitality is.

It changes what you personally have to carry.

It's a team of experts in your pocket — working the way you already do.

Menu development. GP control. Allergen management. Compliance. Training. Front-of-house support.

From £3.30 a day.

No payroll. No politics. No sick days.

Talk to us at HospitalitySupport.uk`,
  },
];

function BrochureCard({ section }: { section: BrochureSection }) {
  const [open, setOpen] = useState(false);
  const fullText = `Page ${section.page}: ${section.label}\n\n${section.headline}\n\n${section.body}`;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-slate-750 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded px-2 py-0.5">
              Page {section.page}
            </span>
            <span className="text-xs text-slate-500">{section.label}</span>
          </div>
          <h3 className="text-white font-semibold text-base">{section.headline}</h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          {open && <CopyButton text={fullText} />}
          <span className="text-slate-400 text-sm">{open ? 'Hide' : 'View'}</span>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-700 pt-4 space-y-4">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Headline</p>
            <p className="text-white font-bold text-lg leading-snug">{section.headline}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Body Copy</p>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">{section.body}</pre>
          </div>
          <div className="flex justify-end">
            <CopyButton text={fullText} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrochurePage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="Brochure / Sales Deck Copy"
        subtitle="Eight pages of copy for a printed brochure or sales deck — from cover through to close."
        badge="Brochure"
      />
      <div className="p-8 space-y-4">
        {sections.map((s) => (
          <BrochureCard key={s.page} section={s} />
        ))}
      </div>
    </div>
  );
}
