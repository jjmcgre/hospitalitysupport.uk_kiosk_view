import { useState } from 'react';
import CopyButton from './components/CopyButton';
import PageHeader from './components/PageHeader';

interface Email {
  id: number;
  subject: string;
  preview: string;
  timing: string;
  purpose: string;
  body: string;
  cta: string;
}

interface Stage {
  stage: number;
  label: string;
  description: string;
  emails: Email[];
}

const campaign: Stage[] = [
  {
    stage: 1,
    label: "Awareness",
    description: "Cold outreach. First contact with a business owner or commercial director who doesn't know you yet. Goal: earn a second open.",
    emails: [
      {
        id: 1,
        subject: "Your kitchens are costing more than your P&L shows",
        preview: "Hidden margin loss across your sites — and how to close it without hiring anyone.",
        timing: "Day 1 — Cold send",
        purpose: "Open with a commercial hook. Identify the hidden cost problem before introducing the solution.",
        body: `Hi [First Name],

Most hospitality businesses lose 4–7 points of gross profit every quarter — not through bad decisions, but through slow ones.

Ingredient prices change. No one catches it until month-end. A dish gets sold 300 times at the wrong margin. A new starter spends their first week doing it wrong because no one had time to brief them properly. Compliance records fall behind between audits.

None of this shows up as a line item. It shows up as underperformance that's hard to explain and harder to fix.

HospitalitySupport.uk was built for this.

It's not a platform. It's a full hospitality operations team — Menu Development Chef, GP & Cost Controller, Allergen Specialist, Training Manager, Compliance Lead, Front-of-House Specialist — working from your live data, available around the clock.

From £100 per kitchen per month. No per-user fees. No setup. No onboarding overhead.

If you'd like to see what it would look like across your business, I'd be glad to walk you through it.`,
        cta: "Book a 20-minute walkthrough →",
      },
    ],
  },
  {
    stage: 2,
    label: "Problem",
    description: "Follow-up to non-openers or non-responders. Go deeper on the specific pain. Different angle, same audience.",
    emails: [
      {
        id: 2,
        subject: "What a 3-point GP swing is worth to your business",
        preview: "The maths most commercial directors haven't run — but should.",
        timing: "Day 4 — No response to Email 1",
        purpose: "Make the cost of inaction concrete and financial. Speak to the commercial director's instinct to quantify.",
        body: `Hi [First Name],

A single kitchen turning £40,000 a month at 68% GP is leaving roughly £1,200 on the table compared to a 71% target.

Across four sites, that's £4,800 a month. £57,600 a year. From margin drift alone — not volume, not pricing strategy, not anything visible on the surface.

This is where most hospitality businesses are right now.

Ingredient costs move weekly. Portion consistency drifts. Menu pricing lags supplier changes by weeks or months. And the people responsible for catching it are already stretched.

HospitalitySupport.uk gives your business a dedicated Cost & GP Controller — working from your actual data, flagging issues the moment they happen, presenting decisions you can act on immediately.

One message. Decision made. Spec updated. GP protected.

From £100 per kitchen per month.

Happy to run the numbers for your estate if that would be useful.`,
        cta: "Let's look at your margins →",
      },
      {
        id: 3,
        subject: "Compliance shouldn't depend on who's in that week",
        preview: "How hospitality businesses are removing the liability without adding overhead.",
        timing: "Day 7 — No response to Emails 1–2",
        purpose: "Shift to a risk and liability angle for those not moved by margin alone. Resonates strongly with owners.",
        body: `Hi [First Name],

In most hospitality businesses, compliance is a person. Or more accurately, it's whoever happens to be in when an inspector arrives.

That's a structural risk — and for multi-site operators, it compounds quickly.

Training records incomplete at one site. Allergen documentation not updated since the last menu change. Temperature logs missing for a Tuesday that was short-staffed. These aren't failings — they're the natural result of operational pressure. But they carry real consequences.

HospitalitySupport.uk treats compliance as a system, not a task.

Food safety records are maintained continuously. Allergen information updates automatically when menus change. Training completions are tracked and evidenced as they happen. Every site, every day.

When an environmental health officer walks in, everything is already in order. Because it always is.

This isn't audit prep. It's how the business runs.

From £3.30 a day per kitchen.`,
        cta: "See how compliance works →",
      },
    ],
  },
  {
    stage: 3,
    label: "Proof",
    description: "Social proof and specificity. Show what it looks like in practice — real scenarios, real decisions, real outcomes.",
    emails: [
      {
        id: 4,
        subject: "The overhead your business is carrying that doesn't appear on a headcount",
        preview: "Management time spent on operational repetition — and how to reclaim it.",
        timing: "Day 10 — No response to Emails 1–3",
        purpose: "Reframe the value proposition from cost-saving to time and capacity recovery. Resonates with owners who feel stretched.",
        body: `Hi [First Name],

Here's a question worth putting to your senior team: how many hours a week are your managers spending on things that shouldn't require a manager?

Onboarding a new starter. Answering allergen queries. Chasing training completions. Recalculating dish costs after a supplier price change. Preparing records before a compliance visit.

These are operational tasks. Necessary ones. But they absorb management capacity that should be focused on performance, guest experience, and commercial outcomes.

HospitalitySupport.uk handles all of it — automatically, accurately, without adding to your headcount.

Training plans built for specific roles and sent directly to staff. Allergen queries resolved instantly. GP calculations updated as ingredient costs change. Compliance records maintained as work happens.

Your managers stop managing process. They start managing outcomes.

From £100 per kitchen per month. Priced per kitchen, not per user — so there's no disincentive to roll it out across your estate.

I'd welcome the chance to show you what that looks like in practice.`,
        cta: "Request a walkthrough →",
      },
      {
        id: 5,
        subject: "Two new starters. Fully trained before their first shift. You did nothing.",
        preview: "This is what removing training admin from your managers actually looks like.",
        timing: "Day 13 — No response to Emails 1–4",
        purpose: "Concrete scenario-based proof. Make the abstract tangible with a specific before/after.",
        body: `Hi [First Name],

Picture this.

Two new starters joining Monday morning. Friday afternoon, one message to HospitalitySupport.uk.

Training plans created for their specific roles — chef de partie and front of house.

Chef de partie: food safety fundamentals, your current menu specs, allergen handling. 80 minutes.
Front of house: allergen customer communication, your service standards, live menu knowledge. 60 minutes.

Both plans sent directly to their phones.
Both completed over the weekend.
You received the completion records automatically.

No briefing. No printing. No repeating yourself on shift.

That's not a feature. That's what your managers' Monday morning looks like when this is in place.

HospitalitySupport.uk — unlimited staff access, one flat monthly price per kitchen.

Still happy to walk you through it if the timing is better now.`,
        cta: "See training in action →",
      },
    ],
  },
  {
    stage: 4,
    label: "Objection Handling",
    description: "Address the most common reasons decision-makers stall. Anticipate hesitation before it's raised.",
    emails: [
      {
        id: 6,
        subject: "\"We already have systems in place\"",
        preview: "Most operators do. Here's why that's exactly the problem.",
        timing: "Day 17 — No response, or replied with 'not right now'",
        purpose: "Pre-empt the most common objection from established operators. Reframe their existing systems as the gap, not the solution.",
        body: `Hi [First Name],

The operators who tell us they already have systems in place are usually right.

They have a food safety management system. A training programme of some kind. Supplier relationships built over years. Experienced managers who know what they're doing.

And they're still losing 4–6 points of GP to margin drift, spending management time on operational repetition, and carrying compliance risk that depends entirely on who's in that week.

The issue isn't the absence of systems. It's the gap between what those systems were designed to do and the pace at which hospitality actually operates.

Prices change weekly. Staff turn over constantly. Menus evolve. Compliance requirements update. No static system keeps up with that automatically.

HospitalitySupport.uk doesn't replace your systems. It works alongside them — filling the gaps that manual processes can't close, at a speed that keeps up with the business.

If you're already well-run, this makes you more efficient. If there are gaps, it closes them.

Worth 20 minutes to find out which applies to you?`,
        cta: "Book a conversation →",
      },
      {
        id: 7,
        subject: "The real cost of waiting until Q4",
        preview: "Every month this isn't in place is a month the numbers are drifting.",
        timing: "Day 21 — Still no response",
        purpose: "Create urgency without being pushy. Make the cost of delay concrete and time-bound.",
        body: `Hi [First Name],

I won't labour the point — you've heard from me a few times now and the timing may simply not be right.

But before I stop, one observation worth leaving with you.

Every month HospitalitySupport.uk isn't in place across your kitchens is a month where:

→ GP is calculated manually — or not at all — when ingredient costs shift
→ Training completions are tracked by whoever has time to track them
→ Compliance evidence is built retrospectively rather than as work happens
→ Allergen queries are answered by whoever picks up the question

None of these are crises. They're slow bleeds. And the longer they run, the harder they are to attribute to a specific cause on a P&L.

If the timing is wrong, I understand. But if it's a case of not having got around to it — that's exactly the problem this solves.

Happy to do a 20-minute call whenever it works for you.`,
        cta: "Find a time that works →",
      },
    ],
  },
  {
    stage: 5,
    label: "Close",
    description: "Final push. Direct, confident, low-friction ask. No new information — just a clear path to the next step.",
    emails: [
      {
        id: 8,
        subject: "Last one from me — for now",
        preview: "A straightforward ask before I stop. No pitch.",
        timing: "Day 28 — Final email in sequence",
        purpose: "Break pattern with a direct, honest close. Lowest friction possible. Leave the door open without being persistent.",
        body: `Hi [First Name],

This is the last email in this sequence — I won't keep landing in your inbox after this.

I'll keep it short.

HospitalitySupport.uk is a full hospitality operations team, available to your business the moment you need them, from £100 per kitchen per month.

GP control. Menu development. Allergen management. Compliance. Staff training. All of it. All the time.

If you'd like to see it working before committing to anything, I'm happy to do a no-agenda 20-minute walkthrough — show you the system on a real scenario, answer any questions, and let you decide.

No follow-up sequence after that. Just a straightforward conversation.

If now isn't the right time, I'll leave it there. But if it is — the link below puts 20 minutes straight in the diary.`,
        cta: "Book a 20-minute demo →",
      },
      {
        id: 9,
        subject: "Scaling without scaling your overhead",
        preview: "For operators with growth planned in the next 12 months.",
        timing: "Day 28 — Alternative closer for multi-site / growth-focused prospects",
        purpose: "Growth-oriented close for operators who are expanding. Commercial case for scale efficiency rather than operational fixes.",
        body: `Hi [First Name],

The conventional model for growing a hospitality estate is well understood: more sites, more area managers, more oversight infrastructure, more cost.

A number of operators are now doing it differently.

HospitalitySupport.uk gives every kitchen in your estate access to a full operations team — GP control, menu development, allergen management, compliance, training — for a flat monthly fee per kitchen.

Central visibility across all sites. Consistent standards without a layer of area management. Compliance maintained at every location without manual oversight. Training completed before staff start, not after they've been doing it wrong for two weeks.

The commercial case is straightforward: you grow the number of sites. You don't grow the support infrastructure proportionally.

If you're planning growth in the next 12 months and want to understand how this fits, I'd be glad to have that conversation.`,
        cta: "Talk to us about your estate →",
      },
    ],
  },
];

function EmailCard({ email }: { email: Email; stageNum: number }) {
  const [open, setOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Clean sendable copies — no internal labels
  const subjectText = email.subject;
  const bodyText = `${email.body}\n\n${email.cta}`;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-slate-700/40 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Email {email.id}</span>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-700 rounded-full px-2 py-px">{email.timing}</span>
          </div>
          <h3 className="text-white font-semibold text-base mb-1 leading-snug">{email.subject}</h3>
          <p className="text-slate-400 text-sm">{email.preview}</p>
        </div>
        <span className="text-slate-400 text-sm flex-shrink-0 mt-0.5">{open ? 'Hide' : 'View'}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-700 pt-4 space-y-4">

          {/* Subject line — ready to copy */}
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject line</p>
              <CopyButton text={subjectText} />
            </div>
            <p className="text-white text-sm font-medium">{email.subject}</p>
            <p className="text-slate-500 text-xs mt-1">Preview: {email.preview}</p>
          </div>

          {/* Body — ready to copy and send */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email body</p>
              <CopyButton text={bodyText} />
            </div>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed bg-slate-900/40 rounded-xl p-4 border border-slate-700 overflow-x-auto break-words">{email.body}</pre>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between bg-slate-900/40 rounded-xl px-4 py-3 border border-slate-700">
            <p className="text-teal-300 text-sm font-semibold">{email.cta}</p>
            <CopyButton text={email.cta} />
          </div>

          {/* Notes toggle — internal only */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-2"
          >
            {showNotes ? 'Hide notes' : 'Show internal notes'}
          </button>
          {showNotes && (
            <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Purpose (internal)</p>
              <p className="text-slate-400 text-sm leading-relaxed">{email.purpose}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const stageAccent: Record<number, string> = {
  1: 'border-blue-500/30 bg-blue-500/5',
  2: 'border-amber-500/30 bg-amber-500/5',
  3: 'border-teal-500/30 bg-teal-500/5',
  4: 'border-orange-500/30 bg-orange-500/5',
  5: 'border-rose-500/30 bg-rose-500/5',
};

const stageLabelColour: Record<number, string> = {
  1: 'text-blue-400 bg-blue-500/15 border-blue-500/25',
  2: 'text-amber-400 bg-amber-500/15 border-amber-500/25',
  3: 'text-teal-400 bg-teal-500/15 border-teal-500/25',
  4: 'text-orange-400 bg-orange-500/15 border-orange-500/25',
  5: 'text-rose-400 bg-rose-500/15 border-rose-500/25',
};

function StageBlock({ stage }: { stage: Stage }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${stageAccent[stage.stage]}`}>
      <div className="flex items-start gap-4">
        <div className={`text-2xl font-black leading-none w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${stageLabelColour[stage.stage]}`}>
          {stage.stage}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-white font-bold text-base">{stage.label}</h2>
            <span className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-px ${stageLabelColour[stage.stage]}`}>
              Stage {stage.stage}
            </span>
            <button
              onClick={() => setShowDesc(!showDesc)}
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-2 ml-1"
            >
              {showDesc ? 'hide notes' : 'notes'}
            </button>
          </div>
          {showDesc && (
            <p className="text-slate-400 text-sm leading-relaxed mt-1">{stage.description}</p>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {stage.emails.map((email) => (
          <EmailCard key={email.id} email={email} stageNum={stage.stage} />
        ))}
      </div>
    </div>
  );
}

export default function EmailPage() {
  const totalEmails = campaign.reduce((acc, s) => acc + s.emails.length, 0);

  return (
    <div className="min-h-full">
      <PageHeader
        title="Email Campaign"
        subtitle={`${totalEmails} emails across 5 stages — copy subject line and body, ready to send.`}
        deployLabel="How to use: expand an email, copy the subject line into your email client, paste the body, send."
        badge="Email"
      />
      <div className="px-4 py-6 sm:p-8 space-y-6">
        {/* Sequence overview */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sequence overview</p>
          <div className="flex flex-wrap gap-2">
            {campaign.map((s) => (
              <div key={s.stage} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ${stageLabelColour[s.stage]}`}>
                <span className="font-black">{s.stage}.</span>
                <span>{s.label}</span>
                <span className="opacity-60">({s.emails.length} email{s.emails.length > 1 ? 's' : ''})</span>
              </div>
            ))}
          </div>
        </div>

        {campaign.map((stage) => (
          <StageBlock key={stage.stage} stage={stage} />
        ))}
      </div>
    </div>
  );
}
