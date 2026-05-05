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

const foundersCampaign: Stage[] = [
  {
    stage: 1,
    label: "Origin",
    description: "Establish credibility through lived experience. We're not a tech company that spotted a market — we're operators who got frustrated enough to build something better.",
    emails: [
      {
        id: 1,
        subject: "We built this because everything else let us down",
        preview: "Not a tech pitch. A note from people who've actually run kitchens.",
        timing: "Day 1 — Cold send",
        purpose: "Lead with authenticity and shared experience. Position HospitalitySupport.uk as built by operators for operators — not sold to them by outsiders.",
        body: `Hi [First Name],

I'll be straight with you.

HospitalitySupport.uk wasn't built by developers who spotted a gap in the market. It was built by people who've worked in kitchens, managed multi-site operations, dealt with EHO visits on a bad week, and spent far too many late nights trying to reconcile GP figures that should have been obvious.

We used the existing solutions. The expensive software that required three days of training to set up. The compliance systems that were technically impressive but completely disconnected from how a busy kitchen actually operates. The training platforms that looked great in a demo and gathered dust two weeks in.

None of them were built by people who'd actually had to run a pass on a Saturday night.

So we built HospitalitySupport.uk differently.

It's not a platform you manage. It's a team that works for you — GP Controller, Menu Development Chef, Allergen Specialist, Training Manager, Compliance Lead — available around the clock, from £100 per kitchen per month.

You talk to it the way you'd talk to a trusted ops colleague. It handles the rest.

We know what the problems actually feel like. That's why this works differently.`,
        cta: "Give us 30 minutes — we'll show you the difference →",
      },
    ],
  },
  {
    stage: 2,
    label: "The Problem With Everything Else",
    description: "Name the frustrations with existing solutions directly. The reader should be nodding.",
    emails: [
      {
        id: 2,
        subject: "Every system we tried solved the wrong problem",
        preview: "Built for compliance officers and accountants. Not for kitchens.",
        timing: "Day 4 — No response to Email 1",
        purpose: "Build resonance by naming specific frustrations with existing tools. Not attacking competitors — articulating the gap they all share.",
        body: `Hi [First Name],

We've tried most of the systems that exist for hospitality operations. Here's what we found.

The food safety platforms are designed for someone whose entire job is compliance. Not for a head chef who has forty minutes between prep and service to deal with anything administrative.

The GP and costing tools are powerful if you have the time to keep them updated. Which, in a working kitchen, you rarely do. So they drift. And then you trust them less. And then you stop using them.

The training platforms work if you have an L&D team to build the content and chase completions. Most hospitality businesses don't have that. They have a manager who's already doing three other jobs.

None of them were built by people who'd actually had to use them under pressure. You can feel it in every click.

HospitalitySupport.uk was built by operators who'd lived with that frustration long enough to do something about it.

It works the way a good ops colleague works — you ask for something, it gets done, properly, without you having to manage the process.

That's not a feature list. That's a fundamentally different approach.`,
        cta: "Book 30 minutes — see what different actually looks like →",
      },
      {
        id: 3,
        subject: "The allergen query that arrived at 6pm on a Friday",
        preview: "We've been that chef. That's exactly why we built this.",
        timing: "Day 7 — No response to Emails 1–2",
        purpose: "Specific, emotionally resonant scenario from lived experience. The reader should recognise it immediately.",
        body: `Hi [First Name],

You'll recognise this.

6pm Friday. Kitchen's in the middle of service. A front-of-house team member comes through with a customer query — can they confirm whether a specific dish contains any tree nuts, because the customer has a serious allergy.

The head chef is on the pass. The allergen folder is somewhere in the office. The dish in question went through a recipe change three weeks ago. No one's sure if the documentation was updated.

That moment — the uncertainty, the pressure, the calculation of risk — is something we've all lived through.

It's not a system failure. It's the reality of hospitality operations running faster than documentation can keep pace with.

HospitalitySupport.uk keeps allergen information current as your menu changes. A query like that gets a clear, evidenced answer immediately — not a search through a folder, not a phone call to someone who might know.

We built this because we've been that chef. We know exactly how much is at stake in that moment.`,
        cta: "See how allergen management actually works →",
      },
    ],
  },
  {
    stage: 3,
    label: "What We Built Instead",
    description: "Show the practical difference. Not features — how it feels to actually use something built by people who understand the work.",
    emails: [
      {
        id: 4,
        subject: "Your GP just dropped. Nobody told you. Nobody had to.",
        preview: "Because by the time we told you, it was already fixed.",
        timing: "Day 10 — No response to Emails 1–3",
        purpose: "Hit the commercial nerve first — GP, cost, margin. Then land the 'automatic' point through a single, vivid scenario rather than a list.",
        body: `Hi [First Name],

Supplier increases their price on a Tuesday.

You don't get an email. You don't get an alert. You don't find out three weeks later when the GP report looks wrong and someone has to go digging.

The dish cost updates. The margin recalculates. If it pushes a dish below your target GP, it flags — with the exact price adjustment needed to bring it back.

Before service. Before it costs you anything.

You didn't ask for that. You didn't set up a workflow for it. It just happened — because that's what the system does.

That's the difference between software you operate and support that operates for you.

Every day, without prompting: costs are live, allergens are current, compliance is evidenced, records are in order.

Not because someone is on top of it.

Because it doesn't need someone to be on top of it.

From £100 per kitchen per month — for an operation that runs itself.`,
        cta: "See it working in 30 minutes →",
      },
    ],
  },
  {
    stage: 4,
    label: "The Guarantee",
    description: "A direct, confident close backed by genuine belief. We've worked in these kitchens. We know this is the best use of 30 minutes.",
    emails: [
      {
        id: 5,
        subject: "Give us 30 minutes. We guarantee it'll be worth it.",
        preview: "Not a sales pitch. A demonstration from people who know your operation from the inside.",
        timing: "Day 14 — No response to Emails 1–4",
        purpose: "The guarantee email. Confident, direct, backed by credibility earned through the sequence. No hedging.",
        body: `Hi [First Name],

We don't say this lightly, and we don't say it to everyone.

Give us 30 minutes — a live walkthrough of HospitalitySupport.uk on a real scenario from your business — and we guarantee it will be the most useful half hour you've invested in your operation in a long time.

Not because we have a polished deck. Because we know what your problems actually feel like.

We've managed the kitchens. We've dealt with the compliance visits. We've sat with the spreadsheets at midnight trying to work out where the margin went. We've watched good managers leave because the operational admin was relentless.

We built HospitalitySupport.uk to fix the things that were genuinely unfixable with everything else we tried.

In 30 minutes we'll show you it working on a real task — your menu, your margins, your training requirements. Not a demo environment. The actual thing.

If you don't think it's worth the time, that's a fair call. But we've yet to have that conversation.

Book the 30 minutes. See it for yourself.`,
        cta: "Book 30 minutes — we'll make it worth it →",
      },
      {
        id: 6,
        subject: "The question we always get asked after the demo",
        preview: "\"Why hasn't anyone built this before?\"",
        timing: "Day 17 — No response, or replied with 'not right now'",
        purpose: "Social proof through the common reaction — without fabricating testimonials. Builds confidence by anticipating the outcome of the demo.",
        body: `Hi [First Name],

The question we hear most often at the end of a walkthrough is some version of: why hasn't anyone built this before?

The honest answer is that most people who build software for hospitality have never worked a service. They've spoken to operators, done market research, built features they were told people wanted.

They built tools. Not support.

The difference shows up in how it actually works. Not in a feature comparison — in what happens when a problem lands on your desk at the wrong moment and you need it handled by someone who already understands the context.

We built HospitalitySupport.uk because we were the ones who needed it and couldn't find it.

If you'd like to see why that difference matters in practice, the walkthrough takes 30 minutes. We'll cover whatever's most relevant to your business — GP, allergens, compliance, training, or all of it.

No obligation. Just the conversation.`,
        cta: "Book the walkthrough →",
      },
    ],
  },
  {
    stage: 5,
    label: "Final Ask",
    description: "Direct close. Genuine, low-pressure, confident. Built on everything that came before.",
    emails: [
      {
        id: 7,
        subject: "One last note — from one operator to another",
        preview: "We built something we're proud of. We'd like you to see it.",
        timing: "Day 21 — Final email in sequence",
        purpose: "Warm, direct, personal close. Operator-to-operator tone. No new pitch — just a genuine final ask.",
        body: `Hi [First Name],

Last one from me, and I'll keep it honest.

We built HospitalitySupport.uk because we spent years working in kitchens and operations, watching good businesses run harder than they needed to because the support available to them was either too expensive, too complicated, or too far removed from how a kitchen actually works.

We know the problems from the inside. That's what makes this different. Not just different from other software — different from having to figure it all out yourself.

From £100 per kitchen per month, you get a full operations team that already understands the work: GP control, menu development, allergen management, compliance, training — available any time you need it.

If you'd like to see it, we'll give you 30 minutes of our time and show you exactly what it does on a real scenario.

We're confident enough in what we've built to guarantee it's worth yours.

If the timing isn't right, that's completely fine. But if it is — the link below is all it takes.`,
        cta: "Book 30 minutes →",
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

const campaigns = [
  {
    id: 'outbound',
    label: 'Campaign 1: Outbound',
    description: 'Problem-led cold outreach. Builds commercial case across 5 stages.',
    data: campaign,
  },
  {
    id: 'founders',
    label: 'Campaign 2: Founder Story',
    description: 'Authenticity-led. Built by operators who felt the pain — and built something better.',
    data: foundersCampaign,
  },
];

export default function EmailPage() {
  const [activeCampaign, setActiveCampaign] = useState<'outbound' | 'founders'>('outbound');
  const current = campaigns.find((c) => c.id === activeCampaign)!;
  const totalEmails = current.data.reduce((acc, s) => acc + s.emails.length, 0);

  return (
    <div className="min-h-full">
      <PageHeader
        title="Email Campaigns"
        subtitle="Two sequences, ready to send — copy subject line and body directly into your email client."
        deployLabel="How to use: select a campaign, expand an email, copy the subject line and body, send."
        badge="Email"
      />
      <div className="px-4 py-6 sm:p-8 space-y-6">

        {/* Campaign switcher */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-2 flex gap-2">
          {campaigns.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCampaign(c.id as 'outbound' | 'founders')}
              className={`flex-1 rounded-xl px-4 py-3 text-left transition-all ${
                activeCampaign === c.id
                  ? 'bg-slate-700 border border-slate-500 shadow-sm'
                  : 'hover:bg-slate-700/40 border border-transparent'
              }`}
            >
              <p className={`text-sm font-bold leading-snug ${activeCampaign === c.id ? 'text-white' : 'text-slate-400'}`}>{c.label}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">{c.description}</p>
            </button>
          ))}
        </div>

        {/* Sequence overview */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {current.label} — {totalEmails} email{totalEmails !== 1 ? 's' : ''} across {current.data.length} stages
          </p>
          <div className="flex flex-wrap gap-2">
            {current.data.map((s) => (
              <div key={s.stage} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ${stageLabelColour[s.stage]}`}>
                <span className="font-black">{s.stage}.</span>
                <span>{s.label}</span>
                <span className="opacity-60">({s.emails.length} email{s.emails.length > 1 ? 's' : ''})</span>
              </div>
            ))}
          </div>
        </div>

        {current.data.map((stage) => (
          <StageBlock key={stage.stage} stage={stage} />
        ))}
      </div>
    </div>
  );
}
