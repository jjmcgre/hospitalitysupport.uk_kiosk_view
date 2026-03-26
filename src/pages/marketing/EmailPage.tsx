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
    subject: "The team you never had to hire",
    preview: "For £3.30 a day, here's what's waiting for you.",
    body: `Hi [First Name],

Running a hospitality business is relentless.

Supplier prices changing weekly. Staff turning over every few months. Compliance records to maintain. Margins to protect. Menus to keep current.

Most operators manage all of this manually. Spreadsheets. Paper records. Chases. Hope.

HospitalitySupport.uk is different.

It's not software. It's a team — a full hospitality operations team in your pocket, built around how you already work.

Menu Development Chef. Cost & GP Controller. Allergen Specialist. Training Manager. Compliance Lead. Front-of-House Specialist.

All of them. Working from your real data. Available any time. No setup. No training.

From £3.30 a day. Priced per kitchen, not per user.

If you can use WhatsApp, you can use HospitalitySupport.uk.`,
    cta: "See how it works →",
  },
  {
    id: 2,
    subject: "Your lamb just went up 8%",
    preview: "Here's how operators using HospitalitySupport.uk dealt with it in under 60 seconds.",
    body: `Hi [First Name],

Last month, lamb prices went up 8% across most major suppliers.

For a dish selling at £24 with a 71% GP target, that's a 6-point drop — without anyone doing anything wrong.

Most operators don't catch this until month-end. By then, they've sold the dish 200 times at the wrong margin.

HospitalitySupport.uk catches it the moment it happens.

One WhatsApp message. Three options:
→ Adjust portion (180g → 165g, back to 70% GP)
→ Switch cut (lamb loin, similar price point)
→ Adjust selling price (£24 → £26, 72% GP)

One reply. Decision made. Spec updated. Team notified.

That's GP management that actually works in a busy kitchen.

£100/month per kitchen. No per-user pricing. Always on.`,
    cta: "Protect your margins →",
  },
  {
    id: 3,
    subject: "The inspection that wasn't a panic",
    preview: "How one operator went from scrambling to confident — without changing anything about how they work.",
    body: `Hi [First Name],

Most environmental health inspections in hospitality start the same way.

Someone gets an advance notice — sometimes not even that — and spends the next 48 hours printing records, checking training sheets, and hoping the allergen matrix is current.

HospitalitySupport.uk changes this.

Because compliance is maintained every day, not prepared for.

Food safety records: live.
Training completions: tracked.
Allergen information: updated automatically when menus change.
Evidence: created as work happens.

When an inspector walks through the door, everything's already in order. Because it always is.

That's what we mean by compliance by design — not by panic.

From £3.30 a day. Priced per kitchen.`,
    cta: "See how compliance works →",
  },
  {
    id: 4,
    subject: "Two new starters Monday. Fully trained before their first shift.",
    preview: "Without a single briefing from you.",
    body: `Hi [First Name],

Two new starters on Monday morning.

One message to HospitalitySupport.uk on Friday afternoon.

Training plans created for their specific roles — chef de partie and front of house.

Chef de partie: food safety, your current menu specs, allergen awareness. 80 minutes total.
Front of house: allergen customer service, your service standards, live menu knowledge. 60 minutes total.

Both plans sent to their phones.
Both completed before their first shift.
You received the completion alerts.

You didn't brief anyone. You didn't print anything. You didn't repeat yourself.

That's what training without the burden looks like.

HospitalitySupport.uk — unlimited staff access, one flat monthly price.`,
    cta: "See training in action →",
  },
  {
    id: 5,
    subject: "Re: your multi-site question",
    preview: "One price per kitchen. Central visibility. No extra overhead.",
    body: `Hi [First Name],

We get asked a lot about how HospitalitySupport.uk works for operators with multiple sites.

Here's the simple version:

Every kitchen gets the full team — menu development, GP control, compliance, training, allergen management. Priced per kitchen, not per group.

You get central visibility across all sites from one place:
→ Which kitchens are compliant
→ Where training is complete or drifting
→ GP performance per site
→ Supplier price changes affecting any location

Same standards. Every site. One flat cost per kitchen.

You don't get it cheaper for having more sites. You get it clearer.

No area manager overhead. No audit prep. No site-by-site chasing.

If you're running 2 sites or 20, HospitalitySupport.uk scales without adding management weight.`,
    cta: "Talk to us about multi-site →",
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
        subtitle="Five fully written emails for a cold or warm outreach sequence. Subject line, preview text, full body, and CTA included."
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
