import { useEffect, useState } from 'react';
import { Phone, Plus, Check, X, RefreshCw, UserCheck, Shield, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import PageHeader from './components/PageHeader';
import InviteMemberModal from './components/InviteMemberModal';
import { calcARR, calcL1Commission, fmtGbp } from '../../lib/commission';

interface TeamMember {
  id: string;
  display_name: string;
  role: string;
  phone: string | null;
  introduced_by_user_id: string | null;
  is_active: boolean;
  is_founder: boolean;
  notes: string | null;
  created_at: string;
}

interface MemberStats {
  [userId: string]: {
    active: number;
    won: number;
    pipelineArr: number;
    wonArr: number;
    commission: number;
  };
}

const inputCls =
  'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors';
const labelCls = 'text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2';

export default function TeamPage() {
  const { user, profile } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<MemberStats>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<TeamMember>>({});
  const [saving, setSaving] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  async function load() {
    setLoading(true);
    const [membersRes, dealsRes] = await Promise.all([
      supabase.from('user_profiles').select('*').eq('is_active', true).order('display_name'),
      supabase.from('deals').select('sourced_by_user_id, stage, num_sites, arr_override, commission_status'),
    ]);

    const memberList = (membersRes.data ?? []) as TeamMember[];
    setMembers(memberList);

    const s: MemberStats = {};
    for (const deal of (dealsRes.data ?? [])) {
      const uid = deal.sourced_by_user_id;
      if (!uid) continue;
      if (!s[uid]) s[uid] = { active: 0, won: 0, pipelineArr: 0, wonArr: 0, commission: 0 };
      const arr = calcARR(deal.num_sites, deal.arr_override);
      if (deal.stage === 'won') {
        s[uid].won++;
        s[uid].wonArr += arr;
        if (deal.commission_status === 'approved') s[uid].commission += calcL1Commission(deal.num_sites, deal.arr_override);
      } else if (deal.stage !== 'lost') {
        s[uid].active++;
        s[uid].pipelineArr += arr;
      }
    }
    setStats(s);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const isAdmin = profile?.role === 'admin';

  function startEdit(m: TeamMember) {
    setEditing(m.id);
    setDraft({ ...m });
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    await supabase.from('user_profiles').update({
      display_name: (draft.display_name ?? '').trim(),
      phone: draft.phone?.trim() || null,
      role: draft.role ?? 'salesperson',
      introduced_by_user_id: draft.introduced_by_user_id || null,
      is_founder: draft.is_founder ?? false,
      notes: draft.notes?.trim() || null,
    }).eq('id', editing);
    setEditing(null);
    setSaving(false);
    load();
  }

  const memberMap = Object.fromEntries(members.map(m => [m.id, m.display_name]));

  return (
    <div className="min-h-full">
      <PageHeader title="Team" subtitle="Everyone working the pipeline." badge="Live" />

      <div className="px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-slate-500 text-sm">{members.length} active member{members.length !== 1 ? 's' : ''}</p>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => setShowInvite(true)}
                className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
              >
                <Plus size={12} />
                Invite member
              </button>
            )}
            <button onClick={load} className="flex items-center gap-1.5 text-slate-500 hover:text-teal-400 text-xs transition-colors">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-600">
            <RefreshCw size={20} className="animate-spin mx-auto mb-3" />
          </div>
        ) : (
          <div className="space-y-3">
            {members.map(m => {
              const s = stats[m.id] ?? { active: 0, won: 0, pipelineArr: 0, wonArr: 0, commission: 0 };
              const isMe = m.id === user?.id;
              const isEditing = editing === m.id;

              return (
                <div key={m.id} className={`bg-slate-900 border rounded-2xl overflow-hidden ${isMe ? 'border-teal-500/30' : 'border-slate-800'}`}>
                  <div className="px-5 py-4 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm border ${
                      m.role === 'admin' ? 'bg-teal-500/15 border-teal-500/25 text-teal-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      {m.display_name?.charAt(0)?.toUpperCase() ?? '?'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-white font-bold text-sm">{m.display_name || <span className="text-slate-600 italic">No name set</span>}</span>
                        {m.role === 'admin' && (
                          <span className="text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full px-2 py-px flex items-center gap-1">
                            <Shield size={8} />admin
                          </span>
                        )}
                        {m.is_founder && (
                          <span className="text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full px-2 py-px flex items-center gap-1">
                            <Star size={8} />founder
                          </span>
                        )}
                        {isMe && (
                          <span className="text-[10px] font-bold bg-slate-700 text-slate-400 border border-slate-600 rounded-full px-2 py-px">
                            you
                          </span>
                        )}
                        {m.introduced_by_user_id && memberMap[m.introduced_by_user_id] && (
                          <span className="text-[10px] text-slate-600 flex items-center gap-1">
                            <UserCheck size={9} />via {memberMap[m.introduced_by_user_id]}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                        {m.phone && (
                          <a href={`tel:${m.phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
                            <Phone size={10} />{m.phone}
                          </a>
                        )}
                        {!m.phone && <span className="text-slate-700">No phone set</span>}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-slate-800 rounded-xl px-3 py-2 text-center">
                          <div className="text-white font-black text-lg">{s.active}</div>
                          <div className="text-slate-600 text-[10px]">Active deals</div>
                        </div>
                        <div className="bg-slate-800 rounded-xl px-3 py-2 text-center">
                          <div className="text-teal-400 font-black text-lg">{s.pipelineArr > 0 ? fmtGbp(s.pipelineArr) : '—'}</div>
                          <div className="text-slate-600 text-[10px]">Pipeline ARR</div>
                        </div>
                        <div className="bg-slate-800 rounded-xl px-3 py-2 text-center">
                          <div className="text-green-400 font-black text-lg">{s.won}</div>
                          <div className="text-slate-600 text-[10px]">Won</div>
                        </div>
                        <div className="bg-slate-800 rounded-xl px-3 py-2 text-center">
                          {m.is_founder ? (
                            <>
                              <div className="text-sky-400 font-bold text-lg">Business</div>
                              <div className="text-slate-600 text-[10px]">Commission</div>
                            </>
                          ) : (
                            <>
                              <div className="text-sky-400 font-bold text-lg">{s.commission > 0 ? fmtGbp(s.commission) : '—'}</div>
                              <div className="text-slate-600 text-[10px]">Comm. paid</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {(isAdmin || isMe) && !isEditing && (
                      <button onClick={() => startEdit(m)}
                        className="text-slate-600 hover:text-teal-400 text-xs transition-colors flex-shrink-0">
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing && (
                    <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Display name</label>
                          <input type="text" value={draft.display_name ?? ''} onChange={e => setDraft(p => ({ ...p, display_name: e.target.value }))} className={inputCls} />
                        </div>
                        <div>
                          <label className={labelCls}>Phone</label>
                          <input type="tel" value={draft.phone ?? ''} onChange={e => setDraft(p => ({ ...p, phone: e.target.value }))} placeholder="07700 900000" className={inputCls} />
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Role</label>
                            <select value={draft.role ?? 'salesperson'} onChange={e => setDraft(p => ({ ...p, role: e.target.value }))} className={inputCls}>
                              <option value="salesperson">Salesperson</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                          <div>
                            <label className={labelCls}>Introduced by</label>
                            <select value={draft.introduced_by_user_id ?? ''} onChange={e => setDraft(p => ({ ...p, introduced_by_user_id: e.target.value || null }))} className={inputCls}>
                              <option value="">None</option>
                              {members.filter(mb => mb.id !== m.id).map(mb => (
                                <option key={mb.id} value={mb.id}>{mb.display_name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                      {isAdmin && (
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={draft.is_founder ?? false}
                              onChange={e => setDraft(p => ({ ...p, is_founder: e.target.checked }))}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                              draft.is_founder ? 'bg-sky-500 border-sky-500' : 'bg-transparent border-slate-600 group-hover:border-slate-400'
                            }`}>
                              {draft.is_founder && <Check size={10} className="text-white" strokeWidth={3} />}
                            </div>
                          </div>
                          <span className="text-slate-400 text-xs">Founder — commission goes to the business, not personal</span>
                        </label>
                      )}
                      <div>
                        <label className={labelCls}>Notes</label>
                        <textarea rows={2} value={draft.notes ?? ''} onChange={e => setDraft(p => ({ ...p, notes: e.target.value }))} placeholder="Any relevant notes..." className={`${inputCls} resize-none`} />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveEdit} disabled={saving}
                          className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors">
                          <Check size={12} />{saving ? 'Saving...' : 'Save'}
                        </button>
                        <button onClick={() => setEditing(null)} className="text-slate-500 hover:text-white text-xs px-3 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showInvite && (
        <InviteMemberModal
          members={members}
          onClose={() => setShowInvite(false)}
          onSuccess={load}
        />
      )}
    </div>
  );
}
