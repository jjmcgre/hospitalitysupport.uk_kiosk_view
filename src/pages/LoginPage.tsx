import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

type Tab = 'signin' | 'signup';

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (tab === 'signin') {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      navigate('/');
    } else {
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      setSuccess('Account created! You can now sign in.');
      setTab('signin');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-white font-black text-2xl tracking-tight">
            ServiceSupport<span className="text-teal-400">.UK</span>
          </span>
          <p className="text-slate-500 text-sm mt-2">Campaign Book &middot; Team Access</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl mb-7">
            {(['signin', 'signup'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setSuccess(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t === 'signin' ? <LogIn size={14} /> : <UserPlus size={14} />}
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {tab === 'signup' && (
                <p className="text-slate-600 text-[11px] mt-1.5">Minimum 6 characters</p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-teal-500/10 border border-teal-500/25 rounded-xl px-4 py-3 text-teal-300 text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-400 active:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white font-bold py-3 rounded-xl text-sm mt-1"
            >
              {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {tab === 'signup' && !success && (
            <p className="text-slate-600 text-[11px] text-center mt-5 leading-relaxed">
              After signing up, you'll be able to set your display name<br />
              so leads can be tracked against your profile.
            </p>
          )}
        </div>

        <p className="text-slate-700 text-[11px] text-center mt-6">
          Internal tool &mdash; ServiceSupport.UK
        </p>
      </div>
    </div>
  );
}
