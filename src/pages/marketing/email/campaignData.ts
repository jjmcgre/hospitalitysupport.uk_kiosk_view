export interface Email {
  id: number;
  subject: string;
  preview: string;
  timing: string;
  purpose: string;
  body: string;
  cta: string;
}

export interface Stage {
  stage: number;
  label: string;
  description: string;
  emails: Email[];
}

export const outboundCampaign: Stage[] = [
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
        purpose: "Make the cost of inaction tangible through a recognisable scenario, not invented numbers.",
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
        purpose: "Shift to a risk and liability angle for those not moved by margin alone.",
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
        purpose: "Reframe value from cost-saving to time and capacity recovery.",
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
        purpose: "Scenario-based specificity. Makes the abstract tangible through a realistic before/after.",
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
        purpose: "Pre-empt the most common objection from established operators.",
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
        purpose: "Create urgency without fabricated numbers.",
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
        purpose: "Break pattern with a direct, honest close.",
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
        purpose: "Growth-oriented close for operators who are expanding.",
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

export const foundersCampaign: Stage[] = [
  {
    stage: 1,
    label: "Origin",
    description: "Establish credibility through lived experience.",
    emails: [
      {
        id: 1,
        subject: "We built this because everything else let us down",
        preview: "Not a tech pitch. A note from people who've actually run kitchens.",
        timing: "Day 1 — Cold send",
        purpose: "Lead with authenticity and shared experience.",
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
    description: "Name the frustrations with existing solutions directly.",
    emails: [
      {
        id: 2,
        subject: "Every system we tried solved the wrong problem",
        preview: "Built for compliance officers and accountants. Not for kitchens.",
        timing: "Day 4 — No response to Email 1",
        purpose: "Build resonance by naming specific frustrations with existing tools.",
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
        purpose: "Specific, emotionally resonant scenario from lived experience.",
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
    description: "Show the practical difference through feel, not features.",
    emails: [
      {
        id: 4,
        subject: "Your GP just dropped. Nobody told you. Nobody had to.",
        preview: "Because by the time we told you, it was already fixed.",
        timing: "Day 10 — No response to Emails 1–3",
        purpose: "Hit the commercial nerve first — GP, cost, margin.",
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
    description: "A direct, confident close backed by genuine belief.",
    emails: [
      {
        id: 5,
        subject: "Give us 30 minutes. We guarantee it'll be worth it.",
        preview: "Not a sales pitch. A demonstration from people who know your operation from the inside.",
        timing: "Day 14 — No response to Emails 1–4",
        purpose: "The guarantee email. Confident, direct, backed by credibility.",
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
        purpose: "Social proof through the common reaction.",
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
    description: "Direct close. Genuine, low-pressure, confident.",
    emails: [
      {
        id: 7,
        subject: "One last note — from one operator to another",
        preview: "We built something we're proud of. We'd like you to see it.",
        timing: "Day 21 — Final email in sequence",
        purpose: "Warm, direct, personal close. Operator-to-operator tone.",
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

export const chefsCampaign: Stage[] = [
  {
    stage: 1,
    label: "The Drift",
    description: "Open on the uncomfortable truth — your best chefs are drowning in admin.",
    emails: [
      {
        id: 1,
        subject: "Your head chef is spending half their week not cooking",
        preview: "The best hire you ever made. Now mostly a filing system.",
        timing: "Day 1 — Cold send",
        purpose: "Open with the human cost before the commercial one.",
        body: `Hi [First Name],

Think about the person you hired as head chef.

What you hired them for: flavour, creativity, craft, standards, consistency across the pass, mentoring the section chefs, pushing the menu forward.

What they're actually doing this week: allergen queries from front of house, chasing training completions, recalculating dish costs because a supplier updated a price, updating specs because a menu item changed, building records because a compliance visit is due.

None of that is cooking.

None of it requires a chef.

But it lands on a chef — because in most hospitality businesses, the kitchen carries the operational admin that no one else has time for. And the person who carries most of it is usually the one you can least afford to lose to a spreadsheet.

HospitalitySupport.uk takes all of it off the kitchen. GP control, allergen management, compliance records, staff training — handled by a dedicated ops team, from £100 per kitchen per month.

For the price of a coffee a day, your head chef gets their week back.

The kitchen does what kitchens are for.`,
        cta: "See how it works — 30 minutes →",
      },
    ],
  },
  {
    stage: 2,
    label: "The Commercial Leak",
    description: "Margin, skill, and compliance — the three places where the status quo is quietly costing money.",
    emails: [
      {
        id: 2,
        subject: "The margin you're losing while your chef fields allergen calls",
        preview: "It's not just their time. It's what they're not doing while they answer.",
        timing: "Day 4 — No response to Email 1",
        purpose: "Connect the time cost to a commercial cost.",
        body: `Hi [First Name],

There's a direct line between operational admin and margin — it just runs through your chef's attention.

Every hour your head chef spends on allergen queries, training admin, or compliance paperwork is an hour not spent on:

— Tightening portion consistency across the section
— Catching the dish that's drifted from spec
— Working with the sous chef on menu development
— Fixing the food cost on the table that's quietly underperforming

These aren't abstract benefits. They're the things a skilled chef does when they have time to do them. And they show up in your GP and your repeat covers.

The operational admin doesn't disappear when it's left undone — it just creates risk. And it doesn't get done well when it's squeezed into the gaps — it creates a different kind of risk.

HospitalitySupport.uk removes it entirely. A dedicated GP Controller, Allergen Specialist, Compliance Lead, and Training Manager — handling everything that shouldn't be on the chef's list, from £100 per kitchen per month.

That's the price of protecting the margin the chef should be focusing on.`,
        cta: "Talk to us about what this looks like for your kitchen →",
      },
      {
        id: 3,
        subject: "Your kitchen is losing skill. Not because of recruitment.",
        preview: "When your best people spend years doing the wrong work, the kitchen forgets how to be great.",
        timing: "Day 7 — No response to Emails 1–2",
        purpose: "The skill attrition angle.",
        body: `Hi [First Name],

Skill attrition in a kitchen doesn't always look like a resignation.

Sometimes it looks like a head chef who used to develop three new dishes a month and now barely has time to review what's on the current menu.

A sous chef who was promoted because of their food but now spends most of the job coordinating training records and fielding compliance queries.

A kitchen that used to win on creativity and craft and now wins on nothing in particular — because the people who drove that are buried in operational repetition.

You didn't hire them for that. They didn't become chefs for that.

But the admin has to go somewhere. And in most kitchens, it goes to whoever can't say no — which is usually the most capable person in the room.

HospitalitySupport.uk was built specifically to stop that drift. The operational work is handled. Properly. Continuously. By people who understand kitchens — so the people who understand kitchens can get back to the work they're actually good at.

From £100 per kitchen per month. The cost of one hour of management time.`,
        cta: "Let's talk about what your kitchen gets back →",
      },
    ],
  },
  {
    stage: 3,
    label: "The Compliance Reckoning",
    description: "Compliance isn't a paperwork problem — it's a risk sitting in your kitchen right now.",
    emails: [
      {
        id: 4,
        subject: "£2,500 fine. Closure notice. Reputation hit. All preventable.",
        preview: "The inspection didn't give notice. The records weren't in order. That's the whole story.",
        timing: "Day 10 — No response to Emails 1–3",
        purpose: "Hard commercial consequence of compliance failures.",
        body: `Hi [First Name],

Environmental health visits don't give notice.

When one happens, the question isn't whether your team intended to be compliant. It's whether the records are in order right now, today, as the officer walks through the door.

For most kitchens, compliance is reactive. Records are updated before visits. Training completions are chased when someone remembers. Allergen documentation is current for the main menu — less certain for the specials, the seasonal items, the supplier substitutions from last week.

That gap is where improvement notices, closure risks, and fines live.

HospitalitySupport.uk treats compliance as a continuous system, not a pre-inspection task. Food safety records are maintained as the work happens. Allergen information updates when the menu changes. Training is evidenced as completions occur — not reconstructed from memory.

When an officer arrives — announced or otherwise — everything is already in order. Not because someone prepared. Because it always is.

From £100 per kitchen per month. Less than the cost of a single improvement notice. Considerably less than a closure.`,
        cta: "See how compliance works in practice →",
      },
    ],
  },
  {
    stage: 4,
    label: "The Number",
    description: "Make the price land. £100 is almost nothing.",
    emails: [
      {
        id: 5,
        subject: "£3.30 a day to give your chef their kitchen back",
        preview: "Less than a round of coffees. More than any hire you could make.",
        timing: "Day 14 — No response to Emails 1–4",
        purpose: "Price anchoring done right.",
        body: `Hi [First Name],

£3.30 a day.

That's what HospitalitySupport.uk costs per kitchen.

For that, every single day, your kitchen has access to:

A GP & Cost Controller keeping your margins live as supplier prices move.
An Allergen Specialist maintaining your allergen records as the menu changes.
A Compliance Lead ensuring your food safety documentation is always current.
A Training Manager handling new starter onboarding and completion tracking.
A Menu Development Chef available when you need a fresh set of eyes on the food.

Not a platform. Not a portal. A team — responding to your kitchen, handling the work, giving your head chef their time back.

The alternative is your chef doing all of this between services, in the margins of a job they were hired to do something else. Or it doesn't get done. Or it gets done badly.

£3.30 a day is not a budget decision. It's a decision about what your kitchen is for.

We'd like to show you exactly what it looks like in practice — 30 minutes, your scenario, no sales pressure.`,
        cta: "Book the 30 minutes →",
      },
    ],
  },
  {
    stage: 5,
    label: "The Call to Arms",
    description: "Final email. Rallying cry for operators who care about their kitchens.",
    emails: [
      {
        id: 6,
        subject: "Great kitchens deserve great chefs. Great chefs deserve to cook.",
        preview: "This is why we built it. This is what it's for.",
        timing: "Day 21 — Final email in sequence",
        purpose: "Conviction close. Statement of belief.",
        body: `Hi [First Name],

The best thing a kitchen can do is cook extraordinary food.

Not manage compliance records. Not build training decks. Not recalculate GP on seventeen dishes because a distributor changed their price list overnight.

But that's what kitchens do — because no one else has taken it off them.

We built HospitalitySupport.uk because we believe the hospitality industry is too good, and its people too skilled, to spend their careers buried in operational admin that any decent system should handle automatically.

Your head chef should be in the kitchen.
Your sous chef should be developing their craft.
Your managers should be leading — not filing.

For £100 a month per kitchen, we handle everything that's getting in the way of that. GP, allergens, compliance, training — continuously, accurately, without adding to your headcount.

This isn't about efficiency. It's about what kitchens are for.

If you agree — give us 30 minutes. We'll show you what it looks like when a kitchen gets to focus on the only thing that actually matters.`,
        cta: "Book a call — let's talk about your kitchen →",
      },
    ],
  },
];

export const legacyCostCampaign: Stage[] = [
  {
    stage: 1,
    label: "The Legacy Tax",
    description: "Open on the uncomfortable truth — operators are still paying 2015 prices for 2015 software.",
    emails: [
      {
        id: 1,
        subject: "You're still paying legacy prices for legacy software",
        preview: "The platforms haven't changed. Neither has their pricing logic.",
        timing: "Day 1 — Cold send",
        purpose: "Establish the core premise: incumbent platforms charge what the market bore years ago, not what the value is today.",
        body: `Hi [First Name],

The hospitality software market hasn't changed much in a decade. The same platforms. The same per-user pricing model. The same onboarding fees, annual contracts, and training overhead before you can do anything useful. Prices that made sense when these systems were the only option — before anyone had seriously rethought how operations support could work.

Most operators are still on those platforms. Not because they're the best option. Because switching felt harder than staying.

We rewrote the approach from scratch.

HospitalitySupport.uk isn't a legacy platform with a new interface. It's a full hospitality operations team — GP & Cost Controller, Menu Development Chef, Allergen Specialist, Training Manager, Compliance Lead — available around the clock, from £100 per kitchen per month.

No per-user fees. No setup costs. No annual contract. No onboarding overhead. Just the work, done properly, from day one.

I've put together a quick comparison of what the typical platforms charge versus what you get with us — worth a look before your next renewal lands.`,
        cta: "See the full comparison →",
      },
    ],
  },
  {
    stage: 2,
    label: "The Numbers",
    description: "Make the cost comparison impossible to ignore.",
    emails: [
      {
        id: 2,
        subject: "What you're actually paying for hospitality operations software",
        preview: "We ran the numbers. The difference is harder to justify than you'd think.",
        timing: "Day 4 — No response to Email 1",
        purpose: "Lead with a clear cost comparison. Let the numbers do the work.",
        body: `Hi [First Name],

Here's what hospitality operators typically spend on the software that's supposed to support their operations — and what they actually get for it.

Compliance platforms run £200–£400 a month plus per-user fees. What you get: forms and checklists your team fills in manually. Recipe and costing tools cost £150–£350 a month plus a setup fee. What you get: a database someone has to keep updated. Training platforms are £300–£600 a month plus a per-learner charge. What you get: content libraries most teams never finish. Allergen software adds another £100–£250 a month. What you get: static records someone has to maintain every time the menu changes.

Run the full stack and you're looking at £750–£1,600 a month per site — four separate logins, four sets of data, and someone in your team carrying the admin burden for all of it.

HospitalitySupport.uk is £100 per kitchen per month, all in. No per-user fees. No setup costs. And unlike the platforms above, the work gets done for you — by a dedicated team, not a tool waiting to be operated.

The platforms charge what they charge because operators have kept paying it. We started with a blank sheet and asked what this should actually cost. The answer was £100 a month.

Full detail on what's included in our brochure — [view it here][BROCHURE_LINK].`,
        cta: "See the full comparison →",
      },
      {
        id: 3,
        subject: "Four platforms. Four logins. Four sets of data to maintain.",
        preview: "The per-user model was never designed with your kitchen in mind.",
        timing: "Day 7 — No response to Emails 1–2",
        purpose: "Attack the structural problem with the incumbent model — fragmentation and admin overhead.",
        body: `Hi [First Name],

Here's what the legacy platform model actually looks like in practice.

You subscribe to a compliance platform. It requires someone to log in and complete the checklists — the system doesn't do it, it just stores what a human enters. You subscribe to a recipe costing tool. Someone has to keep it updated when supplier prices change. If they don't, the numbers are wrong and you don't know it. You subscribe to a training platform. Someone has to build the content, assign it to the right people, and chase completions. You subscribe to allergen software. Someone has to update it every time the menu changes.

Four subscriptions. Four separate data problems. And the common thread: someone in your team is the system. The platform is just where they store the results.

You're paying for tools. You still need the people to use them.

HospitalitySupport.uk is different by design. The team does the work. You send a message, flag a task, ask a question — it gets handled. The records are kept. The margins are live. The compliance is current. One price. One team. Everything covered.

See exactly what's included in our brochure — [download here][BROCHURE_LINK].`,
        cta: "See what's included →",
      },
    ],
  },
  {
    stage: 3,
    label: "The Rewrite",
    description: "Explain the philosophy behind the new approach — not a feature list, a different model.",
    emails: [
      {
        id: 4,
        subject: "We didn't build a better version of what already exists",
        preview: "We asked a different question entirely.",
        timing: "Day 10 — No response to Emails 1–3",
        purpose: "Position HS.uk as a category break, not an incremental improvement.",
        body: `Hi [First Name],

Most hospitality software is built on the same underlying assumption: give operators the tools, and they'll find the time to use them. After fifteen years of watching busy kitchen teams deprioritise every platform they've ever been sold, it's clear that assumption is wrong.

When we built HospitalitySupport.uk, we didn't ask how to build a better compliance platform or improve recipe costing software. We asked what a hospitality business actually needs — and what's the most useful form that support could take.

The answer wasn't another dashboard. It was a team.

A GP & Cost Controller who keeps your margins live as prices shift, without anyone in your kitchen triggering a recalculation. An Allergen Specialist who updates your allergen records when your menu changes. A Compliance Lead who maintains your food safety documentation continuously — always in order, not just before a visit. A Training Manager who builds plans, sends them to staff, and tracks completions without your managers coordinating any of it. A Menu Development Chef available when you need a fresh perspective on the food.

One team. One price. From £100 per kitchen per month. Legacy platforms charge more than this for a fraction of what's covered.

Full detail on everything that's included — [read our brochure][BROCHURE_LINK].`,
        cta: "Read the full breakdown →",
      },
    ],
  },
  {
    stage: 4,
    label: "The Renewal Question",
    description: "Target the moment operators question their existing contracts.",
    emails: [
      {
        id: 5,
        subject: "When does your current contract renew?",
        preview: "Before it auto-renews, it's worth knowing what else is available.",
        timing: "Day 14 — No response to Emails 1–4",
        purpose: "Create a natural urgency trigger around renewal timing.",
        body: `Hi [First Name],

A straightforward question worth asking before your current hospitality software contracts renew.

Are you getting full value from what you're paying? Not "are the tools useful in principle" — but are they actually being used, kept current, and delivering the outcomes you subscribed for?

In our experience, most operators could answer honestly: probably not. The compliance system isn't updated between visits. The recipe costing tool drifted when someone left and hasn't been properly maintained since. The training platform has modules that were never completed.

That's not a failure of intent. It's the predictable result of selling software to people who don't have time to operate it.

Before the next renewal hits, it's worth knowing what £100 per kitchen per month actually covers with us — and how it compares to what you're currently spending. We've laid out the full comparison in our brochure — [it's a straightforward read][BROCHURE_LINK].

If you'd like to see the system in practice, a 30-minute walkthrough covers your scenario with no sales pressure. The link below puts time straight in the diary.`,
        cta: "Book a walkthrough before your renewal →",
      },
    ],
  },
  {
    stage: 5,
    label: "Final Close",
    description: "Direct, confident, low-friction close anchored to the price point.",
    emails: [
      {
        id: 6,
        subject: "£3.30 a day. Everything your kitchen operations need.",
        preview: "Legacy platforms charge five times this. For a fraction of the outcome.",
        timing: "Day 21 — Final email in sequence",
        purpose: "Bring it back to the price point. Simple, direct, confident close.",
        body: `Hi [First Name],

Last note from me on this.

£3.30 a day per kitchen. That's what HospitalitySupport.uk costs — all in, with no per-user fees, no setup charge, no annual contract, and no add-ons required to make the core function work.

For that, every day, your kitchen has live GP and margin control as supplier prices move, allergen records maintained as the menu changes, continuous food safety compliance documentation, staff training built and tracked automatically, and menu development support on demand.

The legacy platforms charge £300–£600 a month for individual pieces of this — and they still require your team to operate them. The work falls on your people.

We handle the work. That's the difference.

If you'd like to see what that looks like for your business, the walkthrough takes 30 minutes. If you'd prefer to read first, our brochure covers everything — [view it here][BROCHURE_LINK]. Either way, worth knowing what the alternative looks like before the next invoice arrives.`,
        cta: "Book a 30-minute walkthrough →",
      },
    ],
  },
];

export const campaigns = [
  {
    id: 'founders',
    label: 'Campaign 1: Founder Story',
    description: 'Authenticity-led. Built by operators who felt the pain.',
    data: foundersCampaign,
  },
  {
    id: 'outbound',
    label: 'Campaign 2: Outbound',
    description: 'Problem-led cold outreach. Builds commercial case across 5 stages.',
    data: outboundCampaign,
  },
  {
    id: 'chefs',
    label: 'Campaign 3: Chefs Back to the Kitchen',
    description: 'A call to arms for operators who care about their kitchens.',
    data: chefsCampaign,
  },
  {
    id: 'legacy-cost',
    label: 'Campaign 4: Legacy Cost Comparison',
    description: 'Cost-led. Exposes the legacy pricing model and demonstrates the new approach.',
    data: legacyCostCampaign,
  },
];
