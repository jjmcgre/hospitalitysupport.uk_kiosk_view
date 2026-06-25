import { calcARR, calcL1Commission, calcL2Commission, fmtGbp, PRICE_PER_SITE } from '../lib/commission';
import { CheckCircle2, BarChart3, ClipboardList, GraduationCap, ShoppingCart, Users } from 'lucide-react';

const exampleSites = [1, 2, 3, 5, 8, 10, 15, 20];

const WHAT_IT_COVERS = [
  {
    icon: BarChart3,
    title: 'Menus, margins & supplier pricing',
    body: 'Every dish priced against live supplier data. The moment a price moves, every linked dish recoasts automatically. Live GP — always.',
  },
  {
    icon: ClipboardList,
    title: 'Allergens & compliance',
    body: 'All 14 allergens auto-generated from ingredients. HACCP built per dish. Audit-ready every day — no scrambling when an inspector arrives.',
  },
  {
    icon: GraduationCap,
    title: 'Training',
    body: 'Training built from the real operation — your dishes, your processes, your standards. Updates automatically when menus or procedures change.',
  },
  {
    icon: ShoppingCart,
    title: 'Ordering & deliveries',
    body: 'Shopping list auto-built from the live menu. Purchase orders raised in one action. Delivery discrepancies flagged immediately.',
  },
  {
    icon: Users,
    title: 'Front of house',
    body: 'FOH always has the live menu — what\'s on, allergens, specials. Allergen answers without "I\'ll just check."',
  },
];

const STEPS = [
  {
    step: '1',
    label: 'Make the introduction',
    detail: 'Put us in touch with a hospitality business — a manager, owner, or ops lead. That\'s your part done.',
  },
  {
    step: '2',
    label: 'We handle everything else',
    detail: 'We run the demo on a real scenario — their dishes, their suppliers. No slides, no pitch deck. The platform makes the case.',
  },
  {
    step: '3',
    label: 'They sign up, you get paid',
    detail: 'Once they\'re live on the platform, commission is confirmed and paid. No chasing, no paperwork.',
  },
];

export default function CommissionStructurePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <div className="border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-white font-black text-lg tracking-tight">
            ServiceSupport<span className="text-teal-400">.UK</span>
          </span>
          <span className="text-slate-500 text-sm">Partner commission</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">

        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-1.5 text-teal-400 text-sm font-semibold">
            Referral partner programme
          </div>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight">
            Introduce the right people.<br />
            <span className="text-teal-400">Get paid when they sign up.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            Your job is the introduction. We do the demo. If they sign up, you earn commission on their first year.
            Simple.
          </p>
        </div>

        {/* What is it */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">What is ServiceSupport.UK?</h2>
          <p className="text-slate-400 leading-relaxed">
            One platform that runs the entire operation for food and drink businesses — menus, margins, allergens,
            compliance, training, and supplier pricing. All connected. All live. All automatic.
          </p>
          <p className="text-slate-400 leading-relaxed">
            It's live in under 5 minutes. A dish goes from concept to full spec — recipe, allergens, HACCP,
            costing, training notes — in under 3 minutes. When a supplier changes a price, every linked dish
            recoasts in under a second.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Most hospitality operators are running on gut feel and spreadsheets. The demo makes the value
            obvious — which is why the introduction is the hard part, not the close.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { stat: '5 min', label: 'to go live' },
              { stat: '3 min', label: 'dish to full spec' },
              { stat: '14', label: 'allergens tracked' },
              { stat: '£3.30', label: 'per kitchen / day' },
            ].map(({ stat, label }) => (
              <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
                <div className="text-teal-400 font-black text-xl">{stat}</div>
                <div className="text-slate-500 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* What it covers */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">What it covers</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHAT_IT_COVERS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-teal-400" />
                  </div>
                  <p className="text-white font-bold text-sm">{title}</p>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
            {/* Pricing card — full width on small, normal on large */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-teal-400 font-black text-sm">£</span>
                </div>
                <p className="text-white font-bold text-sm">Priced to be a no-brainer</p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                £{PRICE_PER_SITE.toLocaleString()} per venue per year — £3.30 a day.
                Per kitchen, not per user. One meaningful margin improvement and it's paid for.
              </p>
            </div>
          </div>
        </div>

        {/* How commission works */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">How the commission works</h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="space-y-3">
              <p className="text-slate-300 leading-relaxed">
                Each venue pays <span className="text-teal-400 font-bold">£{PRICE_PER_SITE.toLocaleString()} per year</span>.
                Multi-site groups are charged by the number of venues they run.
              </p>
              <p className="text-slate-300 leading-relaxed">
                You earn <span className="text-white font-bold">£200 or 15% of the first year's contract value</span>,
                whichever is greater.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Commission is based on <span className="text-white font-bold">new business, first year only</span>.
                Once the account is live and confirmed, commission is approved and paid.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-5 space-y-2">
              <p className="text-white font-bold text-sm">Introducer bonus</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bring another sales partner onto the programme and you earn{' '}
                <span className="text-white font-semibold">5% commission</span> on every
                account they introduce that goes live.
              </p>
            </div>
          </div>

          {/* Example table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-800">
              <p className="text-white font-bold text-sm">Example payouts</p>
            </div>
            <div className="grid grid-cols-4 px-5 py-3 border-b border-slate-700/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Sites</span>
              <span>Contract value</span>
              <span>Your commission</span>
              <span>Introducer bonus</span>
            </div>
            {exampleSites.map(n => {
              const arr = calcARR(n);
              const l1 = calcL1Commission(n);
              const l2 = calcL2Commission(n);
              const atMin = l1 === 200;
              return (
                <div key={n} className="grid grid-cols-4 px-5 py-3.5 text-sm border-b border-slate-800/60 last:border-0 hover:bg-slate-800/30 transition-colors">
                  <span className="text-slate-300 font-semibold">{n}</span>
                  <span className="text-teal-400 font-semibold">{fmtGbp(arr)}</span>
                  <span className={`font-bold ${atMin ? 'text-slate-400' : 'text-yellow-400'}`}>
                    {fmtGbp(l1)}
                    {atMin && <span className="text-slate-600 font-normal text-xs ml-1">min</span>}
                  </span>
                  <span className="text-slate-500">{fmtGbp(l2)}</span>
                </div>
              );
            })}
          </div>
          <p className="text-slate-600 text-xs px-1">
            Introducer bonus is paid to whoever brought the sales partner onto the programme.
          </p>
        </div>

        {/* What you need to do */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">What you need to do</h2>
          <p className="text-slate-400">Three steps — and only the first one is yours.</p>
          <div className="space-y-3">
            {STEPS.map(({ step, label, detail }) => (
              <div key={step} className="flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
                <div className="w-8 h-8 rounded-full bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0 text-teal-400 font-black text-sm">
                  {step}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{label}</p>
                  <p className="text-slate-400 text-sm mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-900/50 border border-teal-500/15 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 text-sm leading-relaxed">
                Your introductions are logged in the pipeline so there's a clear record of every lead you've
                brought in. You can see the status of each one and track what's been paid.
              </p>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="space-y-4">
          <h2 className="text-white font-bold text-xl">The rules</h2>
          <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              Commission applies to <strong className="text-slate-300">new business only</strong>, based on the first year's contract value. Renewals are not included.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              If two partners claim the same venue, our team reviews the pipeline history. The partner with the earliest, clearest record of the introduction is the right call.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              Commission is confirmed once an account is live. You'll see the status in your pipeline view.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              The introducer bonus applies to year-one accounts only.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-slate-800 pt-10 text-center space-y-3">
          <p className="text-slate-500 text-sm">
            Ready to get started? Log in to the pipeline and record your first introduction.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Log in to the pipeline
          </a>
          <p className="text-slate-700 text-xs">
            Don't have an account? Ask whoever sent you this to add you to the team.
          </p>
        </div>

      </div>
    </div>
  );
}
