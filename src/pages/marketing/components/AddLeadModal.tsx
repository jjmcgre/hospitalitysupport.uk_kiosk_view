import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

const emptyForm = { name: '', email: '', phone: '', business_name: '', num_sites: '', message: '' };

interface Props {
  userId: string;
  sourcedByName: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddLeadModal({ userId, sourcedByName, onClose, onSaved }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(field: keyof typeof emptyForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.business_name.trim()) {
      setError('Name and business name are required.');
      return;
    }
    setSaving(true);
    setError('');
    const { error: err } = await supabase.from('demo_bookings').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      business_name: form.business_name.trim(),
      num_sites: form.num_sites.trim() || '1',
      message: form.message.trim(),
      sourced_by_user_id: userId,
      sourced_by_name: sourcedByName,
    });
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
  }

  const inputCls = 'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors';
  const labelCls = 'text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <div>
            <h2 className="text-white font-bold text-base">Log a new lead</h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Attributed to <span className="text-teal-400 font-semibold">{sourcedByName}</span>
            </p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Contact name <span className="text-red-400">*</span></label>
              <input type="text" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Business name <span className="text-red-400">*</span></label>
              <input type="text" required value={form.business_name} onChange={e => set('business_name', e.target.value)} placeholder="The Crown Hotel" className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@example.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="07700 900000" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Number of sites</label>
            <input type="text" value={form.num_sites} onChange={e => set('num_sites', e.target.value)} placeholder="e.g. 3" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Notes / message</label>
            <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="How you met them, what they said, next steps..." rows={3} className={`${inputCls} resize-none`} />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>
          )}

          <div className="flex gap-3 pt-1">
            <button type="submit" disabled={saving} className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors">
              {saving ? 'Saving...' : 'Save lead'}
            </button>
            <button type="button" onClick={onClose} className="px-5 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
