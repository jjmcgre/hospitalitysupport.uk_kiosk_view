import PageHeader from './components/PageHeader';
import { Monitor, Smartphone, Tablet, PoundSterling, Users, TrendingUp, Shield } from 'lucide-react';

const platforms = [
  { icon: Smartphone, label: 'Instagram' },
  { icon: Smartphone, label: 'TikTok' },
  { icon: Monitor, label: 'Facebook' },
  { icon: Monitor, label: 'LinkedIn' },
  { icon: Tablet, label: 'Email' },
];

const pillars = [
  {
    icon: Users,
    title: 'People',
    description: 'Skill levels are eroding. This solves the consistency problem that comes with high turnover and lower-experience teams.',
    stat: 'No reliance on one experienced person',
  },
  {
    icon: Shield,
    title: 'Process',
    description: 'Compliance, training, and records handled as work happens — not in a panic before an inspection.',
    stat: 'Evidence created automatically',
  },
  {
    icon: TrendingUp,
    title: 'Profit',
    description: 'GP monitored live. Supplier price changes caught and acted on before they erode margin.',
    stat: 'Margin protected continuously',
  },
];

export default function OverviewPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="Campaign Overview"
        subtitle="Everything you need to run a full marketing campaign for HospitalitySupport.uk — across social, email, and sales."
        badge="Campaign Foundation"
      />

      <div className="p-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
                <PoundSterling size={18} className="text-teal-400" />
              </div>
              <h2 className="text-white font-bold text-lg">Pricing Model</h2>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-white">£3.30</span>
              <span className="text-slate-400 text-lg">per day</span>
            </div>
            <p className="text-slate-300 text-sm mb-6">Annual billing. Priced per kitchen, not per user. No headcount pricing. No seat licences.</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { tier: 'Standard Venue', price: '£100/mo', desc: 'Pubs, restaurants, cafés' },
                { tier: 'High-Intensity Kitchen', price: '£250/mo', desc: 'Dark kitchens, high churn' },
                { tier: 'Multi-Site & Groups', price: '£100/mo per kitchen', desc: 'Same price. More clarity.' },
              ].map((t) => (
                <div key={t.tier} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
                  <div className="text-teal-300 font-bold text-base mb-1">{t.price}</div>
                  <div className="text-white text-xs font-semibold mb-1">{t.tier}</div>
                  <div className="text-slate-500 text-xs">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-white font-bold text-lg mb-4">Cross-Platform Reach</h2>
              <div className="space-y-2">
                {platforms.map((p) => (
                  <div key={p.label} className="flex items-center gap-3 text-slate-300 text-sm">
                    <p.icon size={14} className="text-teal-400" />
                    {p.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-slate-400 text-xs">9 chapters of ready-to-use campaign material. Everything copy-pasteable.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-xl mb-6">Core Positioning Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
                    <p.icon size={18} className="text-teal-400" />
                  </div>
                  <h3 className="text-white font-bold text-base">{p.title}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="bg-slate-900/60 rounded-lg px-3 py-2 border border-slate-700">
                  <p className="text-teal-300 text-xs font-semibold">{p.stat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-3">The Core Message</h2>
          <blockquote className="text-slate-200 text-lg leading-relaxed border-l-4 border-teal-500 pl-5">
            "A team of experts in your pocket — built around how hospitality actually works."
          </blockquote>
          <p className="text-slate-400 text-sm mt-4">
            Every campaign asset should reinforce this. Not a tool. Not software. A team member that never leaves, never gets sick, and never has a bad shift.
          </p>
        </div>
      </div>
    </div>
  );
}
