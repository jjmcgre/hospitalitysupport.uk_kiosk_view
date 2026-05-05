import WhatsAppChat from './WhatsAppChat';

export default function WhatsAppSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-950 px-4 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-14">
          <div className="inline-block bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold tracking-widest uppercase rounded-full px-3 py-1 mb-5">
            How you interact with it
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
            As simple as sending<br /><span className="text-teal-400">a message</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            No dashboards to learn. No forms to fill. Just ask — and watch it do the work.
          </p>
        </div>

        <WhatsAppChat />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              val: '< 2 min',
              label: 'From question to answer',
              sub: 'Costing, allergens, training — instant',
            },
            {
              val: '24/7',
              label: 'Always on',
              sub: 'No waiting for a chef, a manager, or a spreadsheet',
            },
            {
              val: 'Zero',
              label: 'Training required',
              sub: 'If your team can send a message, they can use this',
            },
          ].map((s) => (
            <div key={s.label} className="bg-teal-500/8 border border-teal-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-black text-teal-400 mb-1">{s.val}</div>
              <div className="text-white text-sm font-bold mb-2">{s.label}</div>
              <p className="text-slate-500 text-xs leading-snug">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
