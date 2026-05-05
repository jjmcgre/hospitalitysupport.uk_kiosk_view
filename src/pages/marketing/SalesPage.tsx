import { useState } from 'react';
import CopyButton from './components/CopyButton';
import PageHeader from './components/PageHeader';

const talkingPoints = [
  {
    point: "It does the work — you don't operate it.",
    detail: "Most hospitality platforms require trained users, ongoing maintenance, and discipline to stay current. HospitalitySupport.uk handles the work automatically. You send a message or ask a question — it responds with accurate, live information built from your actual operation.",
  },
  {
    point: "Priced per kitchen, not per user.",
    detail: "In an industry with high turnover, per-seat pricing doesn't work. One flat monthly cost. Unlimited staff access. Your pricing doesn't change as your team does.",
  },
  {
    point: "GP monitored continuously — not at month end.",
    detail: "Supplier price changes are caught the moment they happen. Affected dishes are flagged. Adjustments recommended. By the time your P&L comes in, the problem's already been solved.",
  },
  {
    point: "Compliance without the scramble.",
    detail: "Evidence created as work happens. Training tracked. Records current. When an inspector arrives, everything's already in order — because it always is.",
  },
  {
    point: "Training that doesn't rely on memory walking out the door.",
    detail: "Training generated from your actual operation. Role-specific. Sent direct to their phone. Completion tracked automatically. Works for teams of 3 or 30.",
  },
  {
    point: "If you can send a message, you can use this.",
    detail: "No training required. No onboarding. No configuration. Your team already knows how to send a message. That's the entire interface.",
  },
  {
    point: "It builds around you — not the other way around.",
    detail: "You don't restructure your business around HospitalitySupport.uk. It works alongside your existing workflows, your existing systems, how your operation already runs.",
  },
  {
    point: "Multi-site clarity without multi-site overhead.",
    detail: "Central visibility across every kitchen. Same standards, every site. One price per kitchen — whether you have 2 or 20.",
  },
  {
    point: "£3.30 a day. Everything your kitchen operation needs.",
    detail: "Menu development, GP control, allergen management, compliance, training, front-of-house support — all connected, all live. For £3.30 a day per kitchen.",
  },
  {
    point: "It doesn't change what hospitality is. It changes what you personally have to carry.",
    detail: "The industry is still hard. Margins are still tight. Teams still change. HospitalitySupport.uk removes the operational work you shouldn't have to do — so you can focus on the work only you can do.",
  },
];

const objections = [
  {
    objection: "We already have systems in place.",
    response: "HospitalitySupport.uk doesn't replace your POS, your booking system, or your supplier portal. It works alongside them. It's the operations layer that holds everything together — the part most operators are currently doing manually or not at all.",
  },
  {
    objection: "We can't afford it right now.",
    response: "£3.30 a day is roughly the cost of one uncaught GP error per week. One supplier price increase that went unnoticed for a month. One EHO visit with records that weren't current. The cost of not having it is almost always higher than the cost of having it.",
  },
  {
    objection: "Our team won't use new technology.",
    response: "There's no new technology to use. If your team can send a message, they can use HospitalitySupport.uk. No training. No login flows. No dashboards they'll ignore after the first week.",
  },
  {
    objection: "We're too small to need something like this.",
    response: "The problems HospitalitySupport.uk solves — GP drift, compliance gaps, training inconsistency — exist in businesses with 5 staff as much as 50. The smaller the team, the more each person is relying on to hold things together. This takes the load off.",
  },
  {
    objection: "What does it actually do?",
    response: "It's a hospitality operations platform built from real industry expertise. You ask a question or flag a task — it responds with accurate, live information specific to your operation. Menu creation, cost calculations, training plans, compliance records, allergen data. All connected, all current, all accessible in a message.",
  },
  {
    objection: "We tried something like this before and it didn't work.",
    response: "Most hospitality tech fails because it assumes the business will change to fit the tool. HospitalitySupport.uk is designed to fit around how you already operate. No implementation project. No change management. It just works.",
  },
  {
    objection: "We need to think about it.",
    response: "That's fair. While you're thinking, it's worth asking: how much did GP drift cost you last month? How long did your last new starter take to train properly? When was your allergen data last updated? HospitalitySupport.uk is solving problems that are already costing you — the question is whether that cost continues.",
  },
  {
    objection: "Our chef handles all of this.",
    response: "Your head chef is one person carrying a full shift. HospitalitySupport.uk runs continuously — when your chef is on the pass, dealing with a delivery, or managing a Saturday service, the GP is still live, the allergens are still current, and the compliance is still in order. The knowledge doesn't walk out the door when they do.",
  },
  {
    objection: "Is this AI? We're not sure about AI.",
    response: "HospitalitySupport.uk is built from real hospitality expertise. The outputs are practical, accurate, and grounded in how real kitchens work — not generic answers from a chatbot. The question isn't whether you trust the technology. It's whether the results are reliable. And they are.",
  },
  {
    objection: "We'd need a demo first.",
    response: "Absolutely. The best demo is showing you a real conversation — your operation, your questions, your context. We can walk through exactly how it would handle the specific problems you're dealing with right now.",
  },
];

const shortPitch = `HospitalitySupport.uk is a hospitality operations platform built from real industry expertise. Menu development, GP control, allergen management, compliance, and training — all connected, all automatic, built around how you already work. From £3.30 a day, priced per kitchen, not per user.`;

const longPitch = `Running a hospitality business today means managing three relentless problems: skill erosion, compliance pressure, and margin protection.

Most operators manage all of this manually — spreadsheets, paper records, tribal knowledge, and constant supervision. It's expensive, inconsistent, and entirely dependent on a few experienced people staying on top of it.

HospitalitySupport.uk is a different model.

It's not a platform you configure and maintain. It's not a dashboard you have to remember to check. It does the work automatically — GP tracked as supplier prices move, allergens updated as the menu changes, compliance evidenced as work happens, training built and sent from your actual operation.

You access it the way you'd send a message — instantly, in plain language, from wherever you are. No training. No onboarding. No change management.

Menu development, GP control, allergen management, compliance, training, front-of-house support. All connected. All working from the same live data. Nothing duplicated. Nothing forgotten.

Priced per kitchen, not per user. From £100/month — that's £3.30 a day for a platform that never drifts, never needs managing, and never loses what it knows when someone leaves.

For operators who want to stop carrying everything themselves — and start running their business instead.`;

interface ExpandableCardProps {
  title: string;
  subtitle: string;
  content: string;
}

function ExpandableCard({ title, subtitle, content }: ExpandableCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-slate-750 transition-colors"
      >
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base">{title}</h3>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          {open && <CopyButton text={content} />}
          <span className="text-slate-400 text-sm">{open ? 'Hide' : 'View'}</span>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-700 pt-4">
          <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">{content}</pre>
          <div className="mt-4">
            <CopyButton text={content} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function SalesPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="Sales & Talking Points"
        subtitle="Talking points, objection responses, and pitch scripts — copy and use in conversations."
        badge="Sales"
      />
      <div className="px-4 py-6 sm:p-8 space-y-10">
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Pitch Scripts</h2>
          <div className="space-y-4">
            <ExpandableCard
              title="Short Pitch (30 seconds)"
              subtitle="For intros, elevator pitches, and conversation openers."
              content={shortPitch}
            />
            <ExpandableCard
              title="Long Pitch (2 minutes)"
              subtitle="For discovery calls, demos, and proposal conversations."
              content={longPitch}
            />
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-4">Talking Points</h2>
          <div className="space-y-3">
            {talkingPoints.map((tp, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-teal-300 text-xs font-semibold uppercase tracking-wider mb-1">Point {i + 1}</p>
                    <p className="text-white font-semibold text-base mb-2">{tp.point}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{tp.detail}</p>
                  </div>
                  <CopyButton text={`${tp.point}\n\n${tp.detail}`} className="flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-4">Objection Handling</h2>
          <div className="space-y-3">
            {objections.map((o, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Objection {i + 1}</p>
                    <p className="text-slate-300 font-medium text-sm mb-3 italic">"{o.objection}"</p>
                    <div className="border-l-2 border-teal-500/50 pl-4">
                      <p className="text-slate-300 text-sm leading-relaxed">{o.response}</p>
                    </div>
                  </div>
                  <CopyButton text={`Objection: "${o.objection}"\n\nResponse: ${o.response}`} className="flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
