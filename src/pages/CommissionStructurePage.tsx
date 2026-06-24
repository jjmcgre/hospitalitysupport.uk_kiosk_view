import { calcARR, calcL1Commission, calcL2Commission, fmtGbp, PRICE_PER_SITE } from '../lib/commission';
import { CheckCircle2, TrendingUp, Users, Zap, Shield, BarChart3, Utensils } from 'lucide-react';

const exampleSites = [1, 2, 3, 5, 8, 10, 15, 20];

const USPS = [
  {
    icon: Utensils,
    title: 'Built for hospitality',
    body: 'Every feature is designed around how kitchens and front-of-house actually work — not adapted from a generic platform.',
  },
  {
    icon: Zap,
    title: 'Up and running in minutes',
    body: 'No lengthy onboarding, no IT project. A venue can be live the same day they sign up.',
  },
  {
    icon: BarChart3,
    title: 'One view of the whole operation',
    body: 'Dish tracking, waste, margins, team performance — all in one place. No more spreadsheets or disconnected tools.',
  },
  {
    icon: Shield,
    title: 'Scales with the group',
    body: 'Single-site operators and multi-site groups use the same platform. Adding a new venue takes seconds.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable ROI from day one',
    body: 'Operators see real food cost and margin data immediately. The numbers make the case for you.',
  },
  {
    icon: Users,
    title: 'Priced to be a no-brainer',
    body: `£${PRICE_PER_SITE.toLocaleString()} per venue per year — less than £${Math.round(PRICE_PER_SITE / 365)} a day. The first improvement in food cost covers it.`,
  },
];

const STEPS = [
  { step: '1', label: 'Log the lead', detail: 'Add the business to the pipeline with a name, location, and contact.' },
  { step: '2', label: 'Run the demo', detail: 'Show them the platform — typically 20–30 minutes, often on a call.' },
  { step: '3', label: 'Get them live', detail: 'Once signed up and active, the deal is marked Won and commission is approved.' },
];

export default function CommissionStructurePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <div className="border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-white font-black text-lg tracking-tight">MenuMetrics</span>
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
            Introduce hospitality businesses.<br />
            <span className="text-teal-400">Get paid when they sign up.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            We pay a straightforward commission for every new account you bring in during their first year with us.
            No complexity, no chasing — just log your leads, run your demos, and get paid.
          </p>
        </div>

        {/* What is it */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">What is MenuMetrics?</h2>
          <p className="text-slate-400 leading-relaxed">
            MenuMetrics is an operations platform for food and drink businesses — pubs, restaurants, hotels,
            cafes, and multi-site groups. It brings dish tracking, waste management, margins, and team
            performance into one dashboard that operators actually use every day.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The pitch is simple: most hospitality operators are running on gut feel and spreadsheets.
            MenuMetrics gives them the numbers they need to cut waste, protect margins, and run a tighter operation.
            The platform pays for itself quickly — and that makes selling it straightforward.
          </p>
        </div>

        {/* USPs */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">Why operators buy it</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {USPS.map(({ icon: Icon, title, body }) => (
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
          </div>
        </div>

        {/* How commission works */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">How it works</h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="space-y-3">
              <p className="text-slate-300 leading-relaxed">
                Each venue pays <span className="text-teal-400 font-bold">£{PRICE_PER_SITE.toLocaleString()} per year</span>.
                Multi-site groups count as a single account at the number of venues they run.
              </p>
              <p className="text-slate-300 leading-relaxed">
                You earn <span className="text-white font-bold">15% of the first year's contract value</span> for every account that goes live.
                There's a minimum of <span className="text-white font-bold">£200 per account</span> — so even a small single-site venue pays.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Commission is calculated on the <span className="text-white font-bold">first year only</span>.
                Once an account is signed up and active, the deal is confirmed and commission is approved by our team.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-5 space-y-2">
              <p className="text-white font-bold text-sm">Introducer bonus</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bring another partner onto the programme and you earn{' '}
                <span className="text-white font-semibold">5% of the first-year ARR</span> on every account they close,
                for as long as those accounts remain live in year one.
                It's a bonus for growing the team — straightforward and capped to the accounts you helped bring in.
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
            Introducer bonus is paid to whoever brought the closing partner onto the programme.
          </p>
        </div>

        {/* What you need to do */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">What you need to do</h2>
          <p className="text-slate-400">Three steps. That's it.</p>
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
                Everything runs through our internal pipeline — you log leads, track progress, and see your commission
                all in one place. There's no separate process or paperwork. If you've logged it and moved it through,
                the system has the record.
              </p>
            </div>
          </div>
        </div>

        {/* Rules / fair play */}
        <div className="space-y-4">
          <h2 className="text-white font-bold text-xl">The rules</h2>
          <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              Commission applies to <strong className="text-slate-300">new business only</strong>. Existing accounts or renewals are not eligible.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              If two partners claim the same venue, our team reviews the pipeline history and resolves it before anything is paid.
              First one to have properly logged and progressed the relationship is usually the right call.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              Commission is signed off by an admin once a deal is confirmed live. You'll see the status in the pipeline.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              The introducer bonus tracks back to year-one accounts only — it's not a perpetual override.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-slate-800 pt-10 text-center space-y-3">
          <p className="text-slate-500 text-sm">
            Ready to get started? Get access to the pipeline and log your first lead.
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
