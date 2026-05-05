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
        subject: "The gap between your menu price and your actual margin",
        preview: "Most operators find out too late. There's a better way.",
        timing: "Day 1 — Cold send",
        purpose: "Open with a commercial hook that speaks to a real, recognisable frustration — not invented stats. Introduce what HS.uk is before asking for anything.",
        body: `Hi [First Name],

When did you last know — with confidence — what your actual GP was on every dish you're serving today?

Not last month's figures. Today's. With this week's supplier prices.

For most hospitality businesses that question is genuinely hard to answer. Ingredient costs shift. Suppliers update prices without much notice. The margin on a dish can quietly erode for weeks before anyone spots it — if anyone spots it at all.

HospitalitySupport.uk was built to close that gap.

It's not a software platform you log into. It's a working operations team — Menu Development Chef, GP & Cost Controller, Allergen Specialist, Training Manager, Compliance Lead — available to your business around the clock, from £100 per kitchen per month.

You ask a question, flag a problem, or request a task. It gets handled. Properly.

No per-user fees. No setup. No onboarding overhead.

If you'd like to see what that looks like across your business, I'd be glad to walk you through it.`,
        cta: "Book a 30-minute walkthrough →",
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
        subject: "What happens to your GP when a supplier puts prices up?",
        preview: "The answer for most operators: not much, until it's too late.",
        timing: "Day 4 — No response to Email 1",
        purpose: "Make the cost of inaction tangible through a recognisable scenario, not invented numbers. Speak to the commercial director's instinct to stay in control.",
        body: `Hi [First Name],

Here's a scenario that plays out regularly in hospitality kitchens.

A key ingredient goes up in price — beef, fish, oil, whatever it is that week. The supplier invoice reflects it. The dish is still selling at the same price. The spec hasn't changed. No one has flagged it.

A week later, the dish has been sold dozens of times at a margin that no longer makes sense.

It's not negligence. It's the reality of running a busy kitchen without the systems to catch it automatically.

The question isn't whether this happens — it's how long it goes unnoticed, and how often.

HospitalitySupport.uk gives your business a dedicated GP & Cost Controller that works from your live data. When prices shift, the impact is calculated immediately. You get a clear decision — adjust the spec, change the price, or accept the margin — not a retrospective report.

One message. Decision made. Spec updated. Margin protected.

From £100 per kitchen per month.

Happy to show you how it works if that would be useful.`,
        cta: "Let's talk margins →",
      },
      {
        id: 3,
        subject: "Compliance shouldn't depend on who's in that week",
        preview: "The structural risk most multi-site operators carry — and how to remove it.",
        timing: "Day 7 — No response to Emails 1–2",
        purpose: "Shift to a risk and liability angle for those not moved by margin alone. Uses realistic scenarios, not invented statistics.",
        body: `Hi [First Name],

In most hospitality businesses, compliance is a person. Or more accurately, it's whoever happens to be in when an inspector arrives.

That creates a structural problem — particularly across multiple sites.

Training records that exist at head office but not at the site. Allergen documentation last updated before the menu changed. Temperature logs that rely on a specific team member being diligent that week. These aren't failures of intent. They're the predictable result of operational pressure falling on individuals rather than systems.

An environmental health visit doesn't give notice. Neither does an allergen incident.

HospitalitySupport.uk treats compliance as an ongoing system, not a pre-inspection task.

Food safety records are maintained continuously. Allergen information is updated when your menu changes. Training completions are logged and evidenced as they happen — not reconstructed afterwards.

When a visit happens, everything is in order. Because it always is.

From £3.30 a day per kitchen.`,
        cta: "See how compliance works →",
      },
    ],
  },
  {
    stage: 3,
    label: "Proof",
    description: "Specificity over claims. Show what a day in practice looks like — real tasks, real decisions, real outcomes.",
    emails: [
      {
        id: 4,
        subject: "How much of your managers' week is spent on things that shouldn't need a manager?",
        preview: "Operational repetition is the hidden tax on every hospitality business.",
        timing: "Day 10 — No response to Emails 1–3",
        purpose: "Reframe value from cost-saving to time and capacity recovery. Asks the reader to answer honestly rather than asserting numbers.",
        body: `Hi [First Name],

It's worth asking your senior team an honest question: how many hours a week are they spending on tasks that don't actually require their level?

Onboarding a new starter from scratch. Fielding allergen queries from front of house. Chasing training completions. Recalculating dish costs after a supplier price change. Building compliance records before a visit.

Each of these is necessary. None of them need a manager to do them.

HospitalitySupport.uk handles all of it — accurately, consistently, without adding to your headcount.

Training plans built for specific roles and sent directly to staff. Allergen queries resolved the same day. GP calculations updated as ingredient costs change. Compliance records maintained as work actually happens.

The goal isn't to reduce your team. It's to give them their time back for the work that actually requires them.

From £100 per kitchen per month — priced per kitchen, not per user, so there's no friction rolling it out across your estate.

I'd be glad to show you what a typical week looks like in practice.`,
        cta: "Request a walkthrough →",
      },
      {
        id: 5,
        subject: "New starters trained before Monday morning. Your managers didn't have to brief anyone.",
        preview: "This is what removing training admin from your team actually looks like in practice.",
        timing: "Day 13 — No response to Emails 1–4",
        purpose: "Scenario-based specificity. Makes the abstract tangible through a realistic before/after the reader can picture in their own business.",
        body: `Hi [First Name],

A practical example of how this works.

Two new starters joining on Monday. Friday afternoon, one message to HospitalitySupport.uk with their roles and start date.

By the end of the day, two training plans are ready — built around their specific roles, your current menu specs, and your allergen requirements.

Both sent directly to their phones.
Both completed over the weekend.
Completion records filed automatically.

Monday morning, your managers spend their time running service — not onboarding.

That's not a pitch. That's the task done. And it happens the same way every time, for every new starter, across every site.

HospitalitySupport.uk — unlimited staff access, one flat monthly price per kitchen.

Happy to walk through the training function specifically if that's the most relevant part for your business.`,
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
        preview: "Most operators do. Here's the question worth asking about them.",
        timing: "Day 17 — No response, or replied with 'not right now'",
        purpose: "Pre-empt the most common objection from established operators. Asks the reader to interrogate their own systems rather than asserting claims about them.",
        body: `Hi [First Name],

Most operators who come to us already have systems in place.

A food safety management system. A training programme. Experienced managers who know the operation well. Supplier relationships that have worked for years.

The question isn't whether the systems exist. It's whether they keep up automatically — when prices shift mid-week, when a menu changes, when a new starter joins on short notice, when a compliance visit happens with no warning.

Static systems — spreadsheets, printed records, recurring check-ins — require someone to update them. In a busy operation, that someone is usually already stretched. Things drift. Not because people are careless, but because the pace doesn't allow for it.

HospitalitySupport.uk doesn't replace what you have. It handles the parts that depend on someone finding the time — automatically, accurately, without adding to your headcount.

If your current setup already handles all of that without friction, there may not be a gap to close. But if there is — it's worth knowing what it's costing.

Worth 30 minutes to find out which applies to you?`,
        cta: "Book a conversation →",
      },
      {
        id: 7,
        subject: "The cost of not getting around to it",
        preview: "Every week without a system is a week the gaps are still open.",
        timing: "Day 21 — Still no response",
        purpose: "Create urgency without fabricated numbers. Make the cost of delay concrete by naming the ongoing reality, not a projected figure.",
        body: `Hi [First Name],

I won't keep filling your inbox — you've heard from me a few times and the timing may simply not be right.

One thing worth leaving with you before I stop.

Every week HospitalitySupport.uk isn't in place is a week where the gaps are still open:

→ GP is checked manually — when someone has time to check it
→ Training is delivered by whoever's available, not by a consistent process
→ Compliance records are built retrospectively, not as work happens
→ Allergen queries are handled by whoever picks up the phone

None of these are disasters. They're the background cost of running on manual systems. They're also the things that tend to surface at the worst possible moment — a busy service, a difficult week, an unannounced inspection.

If the timing genuinely isn't right, I understand completely. But if it's a case of not having got around to it — that's exactly the problem this solves.

Happy to do a 30-minute call whenever the timing works.`,
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
        purpose: "Break pattern with a direct, honest close. Lowest friction possible. Leave the door open without pressure.",
        body: `Hi [First Name],

This is the last email in this sequence — I won't keep landing in your inbox after this.

I'll keep it short.

HospitalitySupport.uk is a full hospitality operations team — GP control, menu development, allergen management, compliance, staff training — available to your business around the clock, from £100 per kitchen per month.

If you'd like to see it working before making any decision, I'm happy to do a no-agenda 30-minute walkthrough. I'll show you the system running on a real scenario, answer whatever questions come up, and leave you to decide whether it's relevant.

No follow-up pressure after that. Just a straightforward conversation.

If now isn't the right time, I'll leave it there. But if it is — the link below puts 30 minutes straight in the diary.`,
        cta: "Book a 30-minute demo →",
      },
      {
        id: 9,
        subject: "Growing your estate without growing your overhead",
        preview: "For operators with new sites planned in the next 12 months.",
        timing: "Day 28 — Alternative closer for multi-site / growth-focused prospects",
        purpose: "Growth-oriented close for operators who are expanding. Frames the commercial case around scale, not operational fixes.",
        body: `Hi [First Name],

The conventional model for growing a hospitality estate is well understood: more sites, more management infrastructure, more cost per site.

The question operators are asking more often now is whether that ratio has to hold.

HospitalitySupport.uk gives every kitchen in your estate access to a full operations team — GP control, menu development, allergen management, compliance, training — for a flat fee per kitchen. The same fee whether you have two sites or twenty.

Standards are consistent across every location because the system that maintains them is the same system. Compliance is evidenced at every site. Training happens the same way everywhere. GP visibility doesn't depend on which manager happens to be thorough.

You grow the number of sites. The operational infrastructure scales automatically.

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
