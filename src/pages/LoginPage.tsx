import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { getStoredRef } from '../lib/referral';

type Tab = 'signin' | 'signup';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref') || getStoredRef();
  const refRef = useRef(ref);
  refRef.current = ref;

  const [tab, setTab] = useState<Tab>('signin');
  const [loginMode, setLoginMode] = useState<'code' | 'email'>('code');
  const [loginCode, setLoginCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (loginMode === 'code') {
      const code = loginCode.trim().toUpperCase();
      if (!code) {
        setError('Please enter your login code');
        setLoading(false);
        return;
      }

      const { data: authEmail, error: rpcErr } = await supabase
        .rpc('get_login_email_by_code', { p_code: code });

      if (rpcErr) {
        setError(rpcErr.message);
        setLoading(false);
        return;
      }

      if (!authEmail) {
        setError('Login code not found. Check with your admin.');
        setLoading(false);
        return;
      }

      const { error: err } = await supabase.auth.signInWithPassword({
        email: authEmail,
        password: code,
      });

      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    } else {
      if (!email.trim() || !password) {
        setError('Please enter your email and password');
        setLoading(false);
        return;
      }

      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    }

    navigate('/');
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!displayName.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    const { data: signUpData, error: err } = await supabase.auth.signUp({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }

    const userId = signUpData.user?.id;
    if (!userId) {
      setError('Sign up failed — no user ID returned');
      setLoading(false);
      return;
    }

    const profileRow: Record<string, unknown> = {
      auth_user_id: userId,
      display_name: displayName.trim(),
      role: 'salesperson',
      is_active: true,
    };

    if (refRef.current) {
      const { data: referrer } = await supabase
        .from('user_profiles')
        .select('id')
        .or(`id.eq.${refRef.current},auth_user_id.eq.${refRef.current}`)
        .maybeSingle();

      if (referrer) {
        profileRow.introduced_by_user_id = referrer.id;
      }
    }

    const { error: profileErr } = await supabase.from('user_profiles').insert(profileRow);

    if (profileErr) {
      const { error: upsertErr } = await supabase.from('user_profiles').upsert({
        id: userId,
        ...profileRow,
      });
      if (upsertErr) {
        setError(`Account created but profile setup failed: ${upsertErr.message}. Please contact support.`);
        setLoading(false);
        return;
      }
    }

    setSuccess('Account created! You can now sign in.');
    setTab('signin');
    setDisplayName('');
    setEmail('');
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

          {tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl mb-4">
                {(['code', 'email'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setLoginMode(m); setError(''); }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      loginMode === m ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {m === 'code' ? <KeyRound size={12} /> : <Mail size={12} />}
                    {m === 'code' ? 'Login Code' : 'Email & Password'}
                  </button>
                ))}
              </div>

              {loginMode === 'code' ? (
                <div>
                  <label className="text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2">
                    Login code
                  </label>
                  <div className="relative">
                    <KeyRound size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input
                      type="text"
                      required
                      value={loginCode}
                      onChange={e => setLoginCode(e.target.value)}
                      placeholder="e.g. AMC123"
                      autoComplete="username"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors uppercase"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="username"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                      />
                    </div>
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
                        autoComplete="current-password"
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
                  </div>
                </>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 hover:bg-teal-400 active:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white font-bold py-3 rounded-xl text-sm mt-1"
              >
                {loading ? 'Please wait...' : 'Sign In'}
              </button>

              <p className="text-slate-600 text-[11px] text-center leading-relaxed">
                {loginMode === 'code'
                  ? "Just enter your code — that's it."
                  : 'Use the email and password you signed up with.'
                }
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                />
              </div>

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
                <p className="text-slate-600 text-[11px] mt-1.5">Minimum 6 characters</p>
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
                {loading ? 'Please wait...' : 'Create Account'}
              </button>

              {!success && (
                <p className="text-slate-600 text-[11px] text-center leading-relaxed">
                  {ref
                    ? <>You'll be linked to the person who sent you this link.<br />Sign up to join their team.</>
                    : <>After signing up, you'll be able to access the pipeline.<br />Ask an admin if you need to be added to a team.</>
                  }
                </p>
              )}
            </form>
          )}
        </div>

        <p className="text-slate-700 text-[11px] text-center mt-6">
          Internal tool &mdash; ServiceSupport.UK
        </p>
      </div>
    </div>
  );
}
