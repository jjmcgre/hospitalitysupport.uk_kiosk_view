import { calcARR, calcL1Commission, calcL2Commission, fmtGbp, PRICE_PER_SITE } from '../lib/commission';
import { CheckCircle2, ClipboardList, GraduationCap, BarChart3, Layers, PoundSterling } from 'lucide-react';

const exampleSites = [1, 2, 3, 5, 8, 10, 15, 20];

const USPS = [
  {
    icon: BarChart3,
    title: 'Menu management & live margin tracking',
    body: 'Operators build and manage their menus in the platform, with live food cost and margin data updating as prices change. No more spreadsheet guesswork — they see their numbers in real time.',
  },
  {
    icon: ClipboardList,
    title: 'Compliance',
    body: 'Build and manage compliance processes directly in the platform. Custom checklists, sign-offs, and records — all in one place and fully tailored to how each venue operates.',
  },
  {
    icon: GraduationCap,
    title: 'Training',
    body: 'Create bespoke training content in minutes. Operators write their own courses, attach them to their own dishes and processes, and roll them out to their team — no third-party tools needed.',
  },
  {
    icon: Layers,
    title: 'Fully bespoke output',
    body: 'Everything in the platform is theirs. Import existing dishes, write their own compliance, build their own training. It reflects how they actually work, not a generic template.',
  },
  {
    icon: CheckCircle2,
    title: 'Up and running in minutes',
    body: 'No IT project, no lengthy onboarding. A venue can be live the same day they sign up — and importing what they already have is straightforward.',
  },
  {
    icon: PoundSterling,
    title: 'Priced to be a no-brainer',
    body: `£${PRICE_PER_SITE.toLocaleString()} per venue per year — around £3.29 a day. One meaningful margin improvement and it's paid for.`,
  },
];

const STEPS = [
  {
    step: '1',
    label: 'Make the introduction',
    detail: 'Connect us with someone in the right role at a hospitality business — a manager, owner, or ops lead who\'d benefit from having this data.',
  },
  {
    step: '2',
    label: 'We take it from there',
    detail: 'We handle the demo and the sales process. You don\'t need to know the product inside out — just make the introduction and we do the rest.',
  },
  {
    step: '3',
    label: 'They sign up, you get paid',
    detail: 'Once the business is live on the platform, the commission is confirmed and paid. No chasing, no paperwork.',
  },
];

export default function CommissionStructurePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <div className="border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="text-white font-black text-lg tracking-tight">ServiceSupport.UK</span>
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
            We pay a straightforward commission for every new account introduced through you during their first year with us.
            Your job is the introduction — we handle everything else.
          </p>
        </div>

        {/* What is it */}
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">What is ServiceSupport.UK?</h2>
          <p className="text-slate-400 leading-relaxed">
            ServiceSupport.UK is an operations platform for food and drink businesses — pubs, restaurants, hotels,
            cafes, and multi-site groups. It covers three areas: <span className="text-slate-300">menu management and live margin tracking</span>,{' '}
            <span className="text-slate-300">compliance</span>, and <span className="text-slate-300">training</span>.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The key is that it's fully bespoke to each operator — they create their own dishes, write their own compliance processes,
            and build their own training content, or import what they already have. The platform then manages it all going forward.
            No generic templates, no workarounds. Just how they actually work, in one place.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Most hospitality operators are running on gut feel and spreadsheets.
            ServiceSupport.UK gives them the numbers and the structure they need.
            The demo makes the value obvious — which is why the introduction is the hardest part, not the close.
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
                You earn <span className="text-white font-bold">15% of the first year's contract value</span> for every account you introduce,
                with a minimum of <span className="text-white font-bold">£200 per account</span> — whichever is greater.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Commission is based on the <span className="text-white font-bold">first year only</span>.
                Once an account is signed up and live, the deal is confirmed and commission is approved by our team.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-5 space-y-2">
              <p className="text-white font-bold text-sm">Introducer bonus</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bring another partner onto the programme and you earn{' '}
                <span className="text-white font-semibold">5% of the first-year contract value</span> on every account they introduce
                that goes live — for as long as those accounts remain active in year one.
                It's a bonus for growing the network, calculated on the same basis as the main commission.
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
                Your introductions are logged in our pipeline so there's a clear record of every lead you've brought in.
                You can see the status of each one and track what's been paid — no guesswork.
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
              Commission applies to <strong className="text-slate-300">new business only</strong>. Existing accounts or renewals are not eligible.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              If two partners claim the same venue, our team reviews the pipeline history and resolves it before anything is paid.
              The partner with the clearest, earliest record of the introduction is the right call.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              Commission is confirmed by our team once an account is live. You'll see the status in your pipeline view.
            </p>
            <p className="flex items-start gap-2">
              <span className="text-teal-400 font-bold flex-shrink-0">—</span>
              The introducer bonus applies to year-one accounts only — it is not an ongoing arrangement beyond that.
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
