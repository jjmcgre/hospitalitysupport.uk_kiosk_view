export default function Print1Page() {
  return (
    <div className="min-h-full bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white font-black text-2xl">1-Pager — A4 Printable</h1>
            <p className="text-slate-400 text-sm mt-1">Print-ready single page sales document</p>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors print:hidden"
          >
            Print / Save PDF
          </button>
        </div>

        <style>{`
          @media print {
            body { margin: 0; background: white !important; }
            .print-page { box-shadow: none !important; }
            button { display: none !important; }
            .no-print { display: none !important; }
          }
          @page { size: A4 portrait; margin: 0; }
        `}</style>

        <div
          className="print-page bg-white shadow-2xl rounded-2xl overflow-hidden"
          style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {/* Header band */}
          <div style={{ background: '#0f1623', padding: '28px 36px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'inline-block', background: '#0d9488', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, marginBottom: 10 }}>
                  HospitalitySupport.uk
                </div>
                <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 900, lineHeight: 1.2, margin: 0, letterSpacing: '-0.02em' }}>
                  Your Entire Operation.<br />
                  One Platform.<br />
                  <span style={{ color: '#2dd4bf' }}>Five Minutes to Go Live.</span>
                </h1>
              </div>
              <div style={{ textAlign: 'right', paddingTop: 4 }}>
                <div style={{ color: '#2dd4bf', fontSize: 28, fontWeight: 900, lineHeight: 1 }}>£3.30</div>
                <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>per day</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 12, lineHeight: 1.5, maxWidth: 480 }}>
              Built by operators, for operators. A hospitality platform with a Brain that understands food, suppliers, and compliance — because we built it from inside the kitchen, not a boardroom.
            </p>
          </div>

          {/* Problem */}
          <div style={{ background: '#f8fafc', padding: '20px 36px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ background: '#fee2e2', borderRadius: 8, padding: '6px 10px', fontSize: 11, fontWeight: 800, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>
                The Problem
              </div>
              <p style={{ color: '#475569', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                You are drowning in spreadsheets, supplier PDFs, allergen paperwork, and training logs. Your recipe costs are out of date before the ink dries. Your suppliers email price lists that sit in inboxes for weeks. Your compliance folder is a prayer, not a system.
              </p>
            </div>
          </div>

          {/* Solution */}
          <div style={{ background: '#f0fdfa', padding: '20px 36px', borderBottom: '2px solid #0d9488' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ background: '#0d9488', borderRadius: 8, padding: '6px 10px', fontSize: 11, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>
                The Solution
              </div>
              <p style={{ color: '#134e4a', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                One platform. Sign up, connect your suppliers, upload your legacy data — and be operational in under 5 minutes. Your existing recipes, price lists, supplier catalogues, and staff records are ingested and refreshed within minutes. Not days. Not weeks. Minutes.
              </p>
            </div>
          </div>

          {/* 6 pillars */}
          <div style={{ padding: '24px 36px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>
              Six reasons operators choose us
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
              {[
                { num: '01', title: 'The Brain — Built by Operators', body: 'Months of development by people who have run kitchens. It understands culinary context, learns your preferences, and gets smarter every day.' },
                { num: '02', title: 'Live From Day One', body: 'Onboard in 5 minutes. Upload existing recipes, supplier lists, and staff data. Ingested and activated in minutes, not weeks.' },
                { num: '03', title: 'Suppliers Manage Themselves', body: 'Suppliers get their own portal to update pricing, compliance docs, and promotions. You stay in control without doing their admin.' },
                { num: '04', title: 'Live Recipe Costing', body: 'When ingredient prices change, every dish recalculates instantly. No stale margins. You always know your true food cost.' },
                { num: '05', title: 'Compliance Without Clipboards', body: 'Allergen briefings, HACCP, training, and evidence — all timestamped and audit-ready. One-click inspection reports.' },
                { num: '06', title: 'Multi-Site Command Centre', body: 'One dashboard for every location. See who is compliant, wasting money, and who needs attention — instantly.' },
              ].map((p) => (
                <div key={p.num} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ color: '#0d9488', fontWeight: 900, fontSize: 13, flexShrink: 0, minWidth: 22, lineHeight: 1.4 }}>{p.num}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 11.5, color: '#0f172a', marginBottom: 3, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ fontSize: 10.5, color: '#64748b', lineHeight: 1.5 }}>{p.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ padding: '20px 36px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {[
                { val: '5 min', label: 'To go live' },
                { val: '134', label: 'Backend functions' },
                { val: '2,000+', label: 'Products/supplier' },
                { val: '14', label: 'Allergens tracked' },
                { val: '14', label: 'Compliance form types' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ color: '#0d9488', fontSize: 17, fontWeight: 900, lineHeight: 1 }}>{s.val}</div>
                  <div style={{ color: '#94a3b8', fontSize: 9.5, marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA footer */}
          <div style={{ background: '#0f1623', padding: '20px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 15, lineHeight: 1 }}>Book a 30-minute demo.</div>
              <div style={{ color: '#2dd4bf', fontWeight: 900, fontSize: 15, lineHeight: 1.3 }}>Be live by the end of the week.</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ background: '#0d9488', color: '#fff', fontWeight: 900, fontSize: 13, padding: '10px 22px', borderRadius: 10 }}>
                Request Your Demo
              </div>
              <div style={{ color: '#475569', fontSize: 10, marginTop: 6 }}>HospitalitySupport.uk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
