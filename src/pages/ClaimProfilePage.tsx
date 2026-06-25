import { useEffect, useState } from 'react';
import { UserCheck, LogOut, AlertCircle, RefreshCw, Check, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface UnclaimedProfile {
  id: string;
  display_name: string;
  role: string;
  phone: string | null;
}

export default function ClaimProfilePage() {
  const { user, signOut, refetchProfile } = useAuth();
  const [profiles, setProfiles] = useState<UnclaimedProfile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [selected, setSelected] = useState<UnclaimedProfile | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoadingProfiles(true);
      const { data } = await supabase
        .from('user_profiles')
        .select('id, display_name, role, phone')
        .is('auth_user_id', null)
        .eq('is_active', true)
        .order('display_name');
      setProfiles((data ?? []) as UnclaimedProfile[]);
      setLoadingProfiles(false);
    }
    load();
  }, []);

  async function claim() {
    if (!selected || !user) return;
    setClaiming(true);
    setError(null);
    const { error: err } = await supabase
      .from('user_profiles')
      .update({ auth_user_id: user.id })
      .eq('id', selected.id)
      .is('auth_user_id', null);
    if (err) {
      setError(err.message);
      setClaiming(false);
      return;
    }
    await refetchProfile();
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center mx-auto mb-4">
            <UserCheck size={22} className="text-teal-400" />
          </div>
          <h1 className="text-white font-black text-2xl tracking-tight">
            ServiceSupport<span className="text-teal-400">.UK</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            You're in the system — select your name below<br />to link this login to your profile.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

          {loadingProfiles ? (
            <div className="py-16 flex items-center justify-center">
              <RefreshCw size={18} className="text-slate-600 animate-spin" />
            </div>
          ) : profiles.length === 0 ? (
            <div className="px-6 py-10 text-center space-y-3">
              <AlertCircle size={24} className="text-slate-600 mx-auto" />
              <p className="text-white font-bold text-sm">No profiles available to claim</p>
              <p className="text-slate-500 text-sm leading-relaxed">
                You haven't been added to the team yet. Ask an admin to add you via the Team page first.
              </p>
            </div>
          ) : (
            <>
              <div className="px-5 pt-5 pb-2">
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                  Who are you?
                </p>
              </div>
              <div className="divide-y divide-slate-800/60">
                {profiles.map(p => {
                  const isSelected = selected?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelected(isSelected ? null : p)}
                      className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all ${
                        isSelected
                          ? 'bg-teal-500/10'
                          : 'hover:bg-slate-800/60'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm border transition-all ${
                        isSelected
                          ? 'bg-teal-500 border-teal-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}>
                        {isSelected ? <Check size={14} /> : p.display_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm transition-colors ${isSelected ? 'text-teal-300' : 'text-white'}`}>
                          {p.display_name}
                        </p>
                        <p className="text-slate-500 text-xs capitalize">{p.role}{p.phone ? ` · ${p.phone}` : ''}</p>
                      </div>
                      <ChevronRight size={14} className={`flex-shrink-0 transition-colors ${isSelected ? 'text-teal-400' : 'text-slate-700'}`} />
                    </button>
                  );
                })}
              </div>

              {error && (
                <div className="mx-5 mb-4 flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-xs">{error}</p>
                </div>
              )}

              <div className="px-5 pb-5 pt-4 border-t border-slate-800 space-y-3">
                <button
                  onClick={claim}
                  disabled={!selected || claiming}
                  className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-bold py-3 rounded-xl text-sm"
                >
                  {claiming ? (
                    <><RefreshCw size={14} className="animate-spin" />Linking account…</>
                  ) : (
                    <><UserCheck size={14} />
                    {selected ? `That's me — ${selected.display_name}` : 'Select your name above'}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-5 text-center">
          <p className="text-slate-600 text-xs mb-3">
            Signed in as <span className="text-slate-500">{user?.email}</span>
          </p>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-400 text-xs transition-colors mx-auto"
          >
            <LogOut size={11} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
