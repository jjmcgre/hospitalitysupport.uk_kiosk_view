import { useState } from 'react';
import CopyButton from './components/CopyButton';
import PageHeader from './components/PageHeader';

interface Email {
  id: number;
  subject: string;
  preview: string;
  body: string;
  cta: string;
}

const emails: Email[] = [
  {
    id: 1,
    subject: "Your kitchens are costing more than your P&L shows",
    preview: "Hidden margin loss across your sites — and how to close it without hiring anyone.",
    body: `Hi [First Name],

Most hospitality businesses lose 4–7 points of gross profit every quarter not through bad decisions — but through slow ones.

Ingredient prices change. No one catches it until month-end. A dish gets sold 300 times at the wrong margin. A new starter spends their first three shifts doing it wrong because no one had time to train them properly. Compliance records fall behind between audits.

None of this shows up as a line item. It shows up as underperformance that's hard to explain and harder to fix.

HospitalitySupport.uk was built for exactly this.

It's not a platform. It's an operational support team — Menu Development Chef, GP & Cost Controller, Allergen Specialist, Training Manager, Compliance Lead, Front-of-House Specialist — working from your live data, available via WhatsApp, 24 hours a day.

From £100 per kitchen per month. No per-user fees. No setup. No training required.

If you'd like to see what it would look like across your business, I'd be glad to walk you through it.`,
    cta: "Book a 20-minute walkthrough →",
  },
  {
    id: 2,
    subject: "What a 3-point GP swing is worth to your business",
    preview: "The maths most commercial directors haven't run — but should.",
    body: `Hi [First Name],

A single kitchen turning £40,000 a month at 68% GP is leaving roughly £1,200 on the table compared to a 71% target.

Across four sites, that's £4,800 a month. £57,600 a year. From margin drift alone — not volume, not pricing strategy, not anything visible on the surface.

This is where most hospitality businesses are right now.

Ingredient costs move weekly. Portion consistency drifts. Menu pricing lags supplier changes by weeks or months. And the people responsible for catching it are already stretched.

HospitalitySupport.uk gives your business a dedicated Cost & GP Controller — available any time, working from your actual data, flagging issues the moment they happen, and presenting options you can act on immediately.

One WhatsApp message. Decision made. Spec updated. GP protected.

From £100 per kitchen per month.

Happy to run the numbers for your estate if it would be useful.`,
    cta: "Let's look at your margins →",
  },
  {
    id: 3,
    subject: "Compliance shouldn't depend on who's in that week",
    preview: "How hospitality businesses are removing the liability without adding overhead.",
    body: `Hi [First Name],

In most hospitality businesses, compliance is a person. Or more accurately, it's the person who happens to be in when an inspector arrives.

That's a structural risk — and for multi-site operators, it compounds quickly.

Training records incomplete at one site. Allergen documentation not updated since the last menu change. Temperature logs missing for a Tuesday that was short-staffed. These aren't failings — they're the natural result of operational pressure. But they carry real consequences.

HospitalitySupport.uk treats compliance as a system, not a task.

Food safety records are maintained continuously. Allergen information updates automatically when menus change. Training completions are tracked and evidenced as they happen. Every site, every day.

When an environmental health officer walks in, everything is already in order. Because it always is.

This isn't audit prep. It's how the business runs.

From £3.30 a day per kitchen. Happy to show you how it works across multiple sites.`,
    cta: "See how compliance works →",
  },
  {
    id: 4,
    subject: "The overhead your business is carrying that doesn't appear on a headcount",
    preview: "Management time spent on operational repetition — and how to reclaim it.",
    body: `Hi [First Name],

Here's a question worth putting to your senior team: how many hours a week are your managers spending on things that shouldn't require a manager?

Onboarding a new starter. Answering allergen queries. Chasing training completions. Recalculating dish costs after a supplier price change. Preparing records before a compliance visit.

These are operational tasks. They're necessary. But they absorb management capacity that should be focused on performance, guest experience, and growth.

HospitalitySupport.uk handles all of it — automatically, accurately, and without adding to your headcount.

Training plans built for specific roles and sent directly to staff. Allergen queries resolved instantly. GP calculations updated as ingredient costs change. Compliance records maintained as work happens.

Your managers stop managing process. They start managing outcomes.

From £100 per kitchen per month. Priced per kitchen, not per user — so there's no disincentive to roll it out across your estate.

I'd welcome the chance to show you what that looks like in practice.`,
    cta: "Request a walkthrough →",
  },
  {
    id: 5,
    subject: "Scaling without scaling your overhead",
    preview: "How multi-site operators are growing without adding management layers.",
    body: `Hi [First Name],

The conventional model for growing a hospitality estate is well understood: more sites, more area managers, more oversight infrastructure, more cost.

A number of operators are now doing it differently.

HospitalitySupport.uk gives every kitchen in your estate access to a full operations team — GP control, menu development, allergen management, compliance, training — for a flat monthly fee per kitchen.

Central visibility across all sites. Consistent standards enforced without a layer of area management. Compliance maintained at every location without manual oversight. Training completed before staff start, not after they've been doing it wrong for a fortnight.

The commercial case is straightforward: you grow the number of sites. You don't grow the support infrastructure proportionally.

We work with operators running 2 sites and operators running 20. The model is the same. The efficiency gains compound as you scale.

If you're planning growth in the next 12 months and want to understand how this fits, I'd be glad to have that conversation.`,
    cta: "Talk to us about your estate →",
  },
];

function EmailCard({ email }: { email: Email }) {
  const [open, setOpen] = useState(false);
  const fullText = `Subject: ${email.subject}\nPreview: ${email.preview}\n\n${email.body}\n\n${email.cta}`;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-slate-750 transition-colors"
      >
        <div className="flex-1">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-1">Email {email.id}</span>
          <h3 className="text-white font-semibold text-base mb-1">{email.subject}</h3>
          <p className="text-slate-400 text-sm">{email.preview}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          {open && <CopyButton text={fullText} />}
          <span className="text-slate-400 text-sm">{open ? 'Hide' : 'View'}</span>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-700 pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Subject</p>
              <p className="text-white text-sm">{email.subject}</p>
            </div>
            <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Preview Text</p>
              <p className="text-slate-300 text-sm">{email.preview}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Body</p>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed bg-slate-900/40 rounded-xl p-4 border border-slate-700">{email.body}</pre>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">CTA</p>
              <p className="text-teal-300 text-sm font-medium">{email.cta}</p>
            </div>
            <CopyButton text={fullText} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function EmailPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="Email Campaign"
        subtitle="Five outreach emails targeting business owners and commercial directors. P&L-focused, ROI-led, written for decision-makers."
        badge="Email"
      />
      <div className="p-8 space-y-4">
        {emails.map((email) => (
          <EmailCard key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
}
