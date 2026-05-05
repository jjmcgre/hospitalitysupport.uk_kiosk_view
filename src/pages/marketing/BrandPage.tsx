import CopyButton from './components/CopyButton';
import PageHeader from './components/PageHeader';

const masterStatement = `HospitalitySupport.uk is a full hospitality operations team — menu development, GP control, allergen management, compliance, and training — available in your pocket, built around how your business already works. From £3.30 a day, priced per kitchen, not per user.`;

const headlines = [
  "A team of experts in your pocket — built around how hospitality actually works.",
  "The operations team you never had to hire.",
  "Stop managing around your software. Start using a team.",
  "Menu. Margin. Compliance. Training. All in one place. All in your pocket.",
  "It doesn't change what hospitality is. It changes what you personally have to carry.",
  "Built for the reality of hospitality — not the ideal version.",
  "Not software. Not a tool. A team.",
  "The support your experienced staff never had time to give.",
];

const straplines = [
  "Expertise without the payroll.",
  "The team that's always already done it.",
  "A team in your pocket. A business that runs better.",
  "Priced per kitchen. Built for hospitality.",
  "Because one good person shouldn't have to carry everything.",
  "GP. Compliance. Training. Sorted.",
  "Your operations. Our team.",
];

const messageHouse = {
  mastermessage: "HospitalitySupport.uk gives hospitality operators a full operations team in their pocket — built around how they already work, priced per kitchen, available every day.",
  pillars: [
    {
      name: "People",
      headline: "Consistency that doesn't depend on who's in this week.",
      proof: "Training generated from your actual operation. Role-specific. Sent direct. Tracked automatically.",
      benefit: "Standards maintained even as teams change.",
    },
    {
      name: "Process",
      headline: "Compliance by design — not by panic.",
      proof: "Records current. Training tracked. Evidence created as work happens. Always inspection-ready.",
      benefit: "Inspections become boring. Not crises.",
    },
    {
      name: "Profit",
      headline: "GP protected continuously — not noticed at month end.",
      proof: "Supplier price changes caught in real time. Affected dishes flagged. Adjustments recommended before margin erodes.",
      benefit: "Quiet margin loss stopped before it compounds.",
    },
  ],
  proof: [
    "Priced per kitchen — not per user. No seat licences.",
    "Simple messaging interface. No training. No onboarding.",
    "Menu development, GP, allergens, training, compliance — all in one team.",
    "From £100/month. £3.30/day.",
    "Built for high-turnover, high-pressure environments.",
  ],
  avoid: [
    "Don't call it software or a platform.",
    "Don't use technical language or AI jargon.",
    "Don't lead with features — lead with outcomes.",
    "Don't make comparisons to tools the audience has been disappointed by.",
    "Don't promise it replaces all existing systems — it complements them.",
  ],
};

interface CopyRowProps {
  text: string;
  index: number;
}

function CopyRow({ text, index }: CopyRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 bg-slate-900/50 rounded-xl p-4 border border-slate-700">
      <div className="flex items-start gap-3">
        <span className="text-teal-500 text-xs font-bold mt-0.5 w-4 flex-shrink-0">{index + 1}</span>
        <p className="text-slate-300 text-sm">{text}</p>
      </div>
      <CopyButton text={text} />
    </div>
  );
}

export default function BrandPage() {
  return (
    <div className="min-h-full">
      <PageHeader
        title="Brand & Positioning"
        subtitle="Master brand statement, headlines, straplines, and the full message house."
        badge="Brand"
      />
      <div className="p-8 space-y-10">
        <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="text-white font-bold text-lg">Master Brand Statement</h2>
            <CopyButton text={masterStatement} />
          </div>
          <p className="text-slate-200 text-base leading-relaxed">{masterStatement}</p>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-4">Headline Alternatives</h2>
          <div className="space-y-3">
            {headlines.map((h, i) => <CopyRow key={i} text={h} index={i} />)}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-4">Strapline Alternatives</h2>
          <div className="space-y-3">
            {straplines.map((s, i) => <CopyRow key={i} text={s} index={i} />)}
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold text-lg mb-6">Message House</h2>

          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-teal-300 font-bold text-sm uppercase tracking-wider">Master Message</h3>
                <CopyButton text={messageHouse.mastermessage} />
              </div>
              <p className="text-slate-200 text-base leading-relaxed">{messageHouse.mastermessage}</p>
            </div>

            <div>
              <h3 className="text-white font-bold text-base mb-4">Core Pillars</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {messageHouse.pillars.map((p) => (
                  <div key={p.name} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-teal-400 font-bold text-sm uppercase tracking-wider">{p.name}</span>
                      <CopyButton text={`${p.name}\n\n${p.headline}\n\nProof: ${p.proof}\n\nBenefit: ${p.benefit}`} />
                    </div>
                    <p className="text-white font-semibold text-sm mb-3">{p.headline}</p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Proof</p>
                        <p className="text-slate-300 text-xs leading-relaxed">{p.proof}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Benefit</p>
                        <p className="text-teal-300 text-xs font-medium">{p.benefit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-4">Proof Points</h3>
                <ul className="space-y-2">
                  {messageHouse.proof.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-teal-400 mt-0.5">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-800 border border-red-900/30 rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-4">What to Avoid</h3>
                <ul className="space-y-2">
                  {messageHouse.avoid.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="text-red-400 mt-0.5">×</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
