import { useState } from 'react';
import { X, UserPlus, Check, AlertCircle, Mail, User, KeyRound } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Props {
  members: { id: string; display_name: string }[];
  onClose: () => void;
  onSuccess: () => void;
}

const inputCls =
  'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors';
const labelCls = 'text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2';

export default function InviteMemberModal({ members, onClose, onSuccess }: Props) {
  const [mode, setMode] = useState<'manual' | 'invite'>('manual');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('salesperson');
  const [phone, setPhone] = useState('');
  const [introducedBy, setIntroducedBy] = useState('');
  const [isFounder, setIsFounder] = useState(false);
  const [loginCode, setLoginCode] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const code = loginCode.trim().toUpperCase();
    if (!code) {
      setError('Login code is required');
      setSaving(false);
      return;
    }

    if (mode === 'manual') {
      // Manual mode: create profile + auth account via edge function
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setError('Not authenticated'); setSaving(false); return; }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const res = await fetch(`${supabaseUrl}/functions/v1/invite-team-member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          display_name: displayName.trim(),
          role,
          phone: phone.trim() || null,
          introduced_by_user_id: introducedBy || null,
          is_founder: isFounder,
          login_code: code,
          email: email.trim() || undefined,
        }),
      });

      const json = await res.json();
      setSaving(false);
      if (!res.ok) { setError(json.error ?? 'Something went wrong'); return; }
      setDone(true);
      setTimeout(() => { onSuccess(); onClose(); }, 1500);
    } else {
      // Invite mode: send email invite + store login code
      if (!email.trim()) {
        setError('Email is required for invite mode');
        setSaving(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setError('Not authenticated'); setSaving(false); return; }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const res = await fetch(`${supabaseUrl}/functions/v1/invite-team-member`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          display_name: displayName.trim(),
          role,
          phone: phone.trim() || null,
          introduced_by_user_id: introducedBy || null,
          login_code: code,
        }),
      });

      const json = await res.json();
      setSaving(false);
      if (!res.ok) { setError(json.error ?? 'Something went wrong'); return; }
      setDone(true);
      setTimeout(() => { onSuccess(); onClose(); }, 1800);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">

        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <UserPlus size={14} className="text-teal-400" />
            </div>
            <h2 className="text-white font-bold text-sm">Add team member</h2>
          </div>
          <button onClick={onClose} className="text-slate-600 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {done ? (
          <div className="px-6 py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-500/15 border border-teal-500/25 flex items-center justify-center mx-auto">
              <Check size={20} className="text-teal-400" />
            </div>
            <p className="text-white font-bold">
              {mode === 'manual' ? 'Member added' : 'Invite sent'}
            </p>
            <p className="text-slate-500 text-sm">
              {mode === 'manual'
                ? `${displayName} has been added with login code ${loginCode.trim().toUpperCase()}.`
                : `${email} will receive an email to set their password. Login code: ${loginCode.trim().toUpperCase()}.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

            {/* Mode toggle */}
            <div className="grid grid-cols-2 gap-1.5 bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMode('manual')}
                className={`flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg transition-colors ${
                  mode === 'manual'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <User size={11} />
                Add manually
              </button>
              <button
                type="button"
                onClick={() => setMode('invite')}
                className={`flex items-center justify-center gap-1.5 text-xs font-bold py-2 rounded-lg transition-colors ${
                  mode === 'invite'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Mail size={11} />
                Send email invite
              </button>
            </div>

            {/* Login code — always required */}
            <div>
              <label className={labelCls}>Login code</label>
              <div className="relative">
                <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="text"
                  required
                  value={loginCode}
                  onChange={e => setLoginCode(e.target.value.toUpperCase())}
                  placeholder="e.g. JM01"
                  className={inputCls + ' pl-10 uppercase'}
                />
              </div>
              <p className="text-slate-600 text-[11px] mt-1.5">
                They'll use this code to sign in — no password needed.
              </p>
            </div>

            {mode === 'invite' && (
              <div>
                <label className={labelCls}>Email address</label>
                <input
                  type="email"
                  required={mode === 'invite'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={inputCls}
                />
              </div>
            )}

            {mode === 'manual' && (
              <div>
                <label className={labelCls}>Email (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Leave blank if they don't have one"
                  className={inputCls}
                />
                <p className="text-slate-600 text-[11px] mt-1.5">
                  If left blank, a synthetic email is auto-generated for their account.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className={labelCls}>Display name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Full name"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} className={inputCls}>
                  <option value="salesperson">Salesperson</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Phone (optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="07700 900000"
                  className={inputCls}
                />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Introduced by (optional)</label>
                <select value={introducedBy} onChange={e => setIntroducedBy(e.target.value)} className={inputCls}>
                  <option value="">None</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.display_name}</option>
                  ))}
                </select>
              </div>
            </div>

            {mode === 'manual' && (
              <label className="flex items-start gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-slate-600 transition-colors">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={isFounder}
                    onChange={e => setIsFounder(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    isFounder ? 'bg-sky-500 border-sky-500' : 'bg-transparent border-slate-600'
                  }`}>
                    {isFounder && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Founder</p>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                    Their deals contribute to business revenue rather than personal commission.
                  </p>
                </div>
              </label>
            )}

            {error && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-xs">{error}</p>
              </div>
            )}

            {mode === 'invite' && (
              <p className="text-slate-600 text-xs leading-relaxed">
                They'll receive an email with a link to set their password. Their profile appears on the Team page immediately.
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                <UserPlus size={13} />
                {saving
                  ? (mode === 'manual' ? 'Adding...' : 'Sending...')
                  : (mode === 'manual' ? 'Add member' : 'Send invite')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-slate-500 hover:text-white text-sm px-4 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
