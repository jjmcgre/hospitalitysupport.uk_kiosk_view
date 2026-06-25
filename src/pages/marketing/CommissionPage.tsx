import { useEffect, useState, useMemo } from 'react';
import {
  PoundSterling, CheckCircle2, AlertTriangle, XCircle, Clock,
  RefreshCw, ChevronRight, ExternalLink, Star,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { UserProfile } from '../../context/AuthContext';
import PageHeader from './components/PageHeader';
import {
  calcARR, calcL1Commission, calcL2Commission, fmtGbp,
  Stage, CommissionStatus,
} from '../../lib/commission';

interface DealRow {
  id: string;
  stage: Stage;
  num_sites: number;
  arr_override: number | null;
  commission_status: CommissionStatus;
  commission_paid_at: string | null;
  sourced_by_user_id: string | null;
  sourced_by_name: string | null;
  created_at: string;
  organisations: { trading_name: string; city: string | null } | null;
}

export default function CommissionPage() {
  const { user, profile, founderIds } = useAuth();
  const [deals, setDeals] = useState<DealRow[]>([]);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const [dealsRes, profilesRes] = await Promise.all([
      supabase.from('deals').select('id,stage,num_sites,arr_override,commission_status,commission_paid_at,sourced_by_user_id,sourced_by_name,created_at,organisations(trading_name,city)'),
      supabase.from('user_profiles').select('id,display_name,role,is_founder,introduced_by_user_id,phone'),
    ]);
    setDeals((dealsRes.data ?? []) as DealRow[]);
    setProfiles((profilesRes.data ?? []) as UserProfile[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const isAdmin = profile?.role === 'admin';

  async function approveCommission(dealId: string) {
    if (!user) return;
    setApproving(dealId);
    const myName = profile?.display_name ?? user.email ?? 'Admin';
    await supabase.from('deals').update({
      commission_status: 'approved',
      commission_paid_at: null,
      updated_at: new Date().toISOString(),
    }).eq('id', dealId);
    await supabase.from('deal_activity').insert({
      deal_id: dealId,
      user_id: user.id,
      user_name: myName,
      action_type: 'commission_approved',
      payload: {},
    });
    setApproving(null);
    load();
  }

  async function declineCommission(dealId: string) {
    if (!user) return;
    setApproving(dealId);
    const myName = profile?.display_name ?? user.email ?? 'Admin';
    await supabase.from('deals').update({
      commission_status: 'declined',
      updated_at: new Date().toISOString(),
    }).eq('id', dealId);
    await supabase.from('deal_activity').insert({
      deal_id: dealId,
      user_id: user.id,
      user_name: myName,
      action_type: 'commission_declined',
      payload: {},
    });
    setApproving(null);
    load();
  }

  async function markPaid(dealId: string) {
    if (!user) return;
    setApproving(dealId);
    await supabase.from('deals').update({
      commission_paid_at: new Date().toISOString(),
      commission_paid_by_user_id: user.id,
      updated_at: new Date().toISOString(),
    }).eq('id', dealId);
    setApproving(null);
    load();
  }

  const myDeals = useMemo(() => deals.filter(d => d.sourced_by_user_id === user?.id), [deals, user]);
  const myApproved = useMemo(() => myDeals.filter(d => d.commission_status === 'approved'), [myDeals]);
  const myPending = useMemo(() => myDeals.filter(d => d.commission_status === 'pending'), [myDeals]);
  const myFlagged = useMemo(() => myDeals.filter(d => d.commission_status === 'flagged'), [myDeals]);

  const myApprovedTotal = useMemo(() => myApproved.reduce((s, d) => s + calcL1Commission(d.num_sites, d.arr_override), 0), [myApproved]);
  const myPaidTotal = useMemo(() => myApproved.filter(d => d.commission_paid_at).reduce((s, d) => s + calcL1Commission(d.num_sites, d.arr_override), 0), [myApproved]);
  const myPipelineTotal = useMemo(() => myPending.reduce((s, d) => s + calcL1Commission(d.num_sites, d.arr_override), 0), [myPending]);

  const profileMap = useMemo(() => Object.fromEntries(profiles.map(p => [p.id, p])), [profiles]);

  const l2Earnings = useMemo(() => {
    if (!profile?.introduced_by_user_id) return 0;
    return deals
      .filter(d => {
        const sp = d.sourced_by_user_id ? profileMap[d.sourced_by_user_id] : null;
        return sp?.introduced_by_user_id === user?.id && d.commission_status === 'approved';
      })
      .reduce((s, d) => s + calcL2Commission(d.num_sites, d.arr_override), 0);
  }, [deals, profile, profileMap, user]);

  const flaggedDeals = deals.filter(d => d.commission_status === 'flagged' && !founderIds.has(d.sourced_by_user_id ?? ''));
  const pendingApproval = deals.filter(d => d.commission_status === 'pending' && d.stage === 'won' && !founderIds.has(d.sourced_by_user_id ?? ''));
  const approvedUnpaid = deals.filter(d => d.commission_status === 'approved' && !d.commission_paid_at && d.stage === 'won' && !founderIds.has(d.sourced_by_user_id ?? ''));

  return (
    <div className="min-h-full">
      <PageHeader title="Commission" subtitle="What you're owed and what needs approving." />

      <div className="px-4 py-6 sm:px-8 space-y-8">

        {/* Share link */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm font-bold">Commission structure</p>
            <p className="text-slate-500 text-xs mt-0.5">Share this link with anyone you're bringing onto the team.</p>
          </div>
          <a
            href="/commission-structure"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex-shrink-0"
          >
            <ExternalLink size={12} />
            Open page
          </a>
        </div>

        {/* My commission summary */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3">Your commission</h2>

          {profile?.is_founder ? (
            <div className="bg-slate-900 border border-sky-500/20 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                <Star size={18} className="text-sky-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Founder — revenue goes to the business</p>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  As a founder, commission from your deals contributes directly to business revenue
                  rather than being paid out personally. Your pipeline activity is still tracked and
                  attributed to you.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 max-w-xs">
                  <div className="bg-slate-800 rounded-xl px-3 py-2 text-center">
                    <div className="text-white font-black text-xl">{myDeals.filter(d => d.stage === 'won').length}</div>
                    <div className="text-slate-600 text-[10px]">Won</div>
                  </div>
                  <div className="bg-slate-800 rounded-xl px-3 py-2 text-center">
                    <div className="text-teal-400 font-black text-xl">{myDeals.filter(d => d.stage !== 'won' && d.stage !== 'lost').length}</div>
                    <div className="text-slate-600 text-[10px]">Active deals</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <div className="text-sky-400 font-bold text-2xl">{myApprovedTotal > 0 ? fmtGbp(myApprovedTotal) : '—'}</div>
                  <div className="text-slate-500 text-xs mt-1">Approved total</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <div className="text-green-400 font-black text-2xl">{myPaidTotal > 0 ? fmtGbp(myPaidTotal) : '—'}</div>
                  <div className="text-slate-500 text-xs mt-1">Paid to date</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <div className="text-teal-400 font-black text-2xl">{myPipelineTotal > 0 ? fmtGbp(myPipelineTotal) : '—'}</div>
                  <div className="text-slate-500 text-xs mt-1">In pipeline</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <div className="text-sky-400 font-black text-2xl">{myFlagged.length > 0 ? myFlagged.length : '—'}</div>
                  <div className="text-slate-500 text-xs mt-1">Flagged for review</div>
                </div>
              </div>
              {l2Earnings > 0 && (
                <div className="mt-3 bg-teal-500/5 border border-teal-500/20 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-teal-300 font-bold text-sm">Introducer override earnings</p>
                    <p className="text-slate-500 text-xs mt-0.5">5% commission on accounts introduced by people you brought on</p>
                  </div>
                  <p className="text-teal-400 font-black text-xl">{fmtGbp(l2Earnings)}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Admin: flagged + pending approval */}
        {isAdmin && (flaggedDeals.length > 0 || pendingApproval.length > 0 || approvedUnpaid.length > 0) && (
          <div className="space-y-4">
            {flaggedDeals.length > 0 && (
              <div className="bg-slate-900 border border-sky-500/25 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-sky-500/15">
                  <AlertTriangle size={14} className="text-sky-400" />
                  <h2 className="text-white font-bold text-sm">Flagged — needs your decision</h2>
                  <span className="text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/25 rounded-full px-2 py-px ml-auto">
                    {flaggedDeals.length}
                  </span>
                </div>
                <div className="divide-y divide-slate-800">
                  {flaggedDeals.map(d => (
                    <div key={d.id} className="px-5 py-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">
                          {d.organisations?.trading_name ?? '—'}
                          {d.organisations?.city && <span className="text-slate-500 font-normal text-xs ml-2">{d.organisations.city}</span>}
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {d.sourced_by_name} · {d.num_sites} site{d.num_sites !== 1 ? 's' : ''} · {fmtGbp(calcL1Commission(d.num_sites, d.arr_override))}
                        </p>
                      </div>
                      <Link to={`/deals/${d.id}`} className="text-slate-500 hover:text-teal-400 flex items-center gap-1 text-xs transition-colors flex-shrink-0">
                        View deal <ChevronRight size={12} />
                      </Link>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => approveCommission(d.id)} disabled={approving === d.id}
                          className="flex items-center gap-1 bg-green-500/15 hover:bg-green-500/25 border border-green-500/25 text-green-400 text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50">
                          <CheckCircle2 size={11} />Approve
                        </button>
                        <button onClick={() => declineCommission(d.id)} disabled={approving === d.id}
                          className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50">
                          <XCircle size={11} />Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pendingApproval.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800">
                  <Clock size={14} className="text-teal-400" />
                  <h2 className="text-white font-bold text-sm">Won deals — pending approval</h2>
                  <span className="text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 rounded-full px-2 py-px ml-auto">
                    {pendingApproval.length}
                  </span>
                </div>
                <div className="divide-y divide-slate-800">
                  {pendingApproval.map(d => (
                    <div key={d.id} className="px-5 py-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">
                          {d.organisations?.trading_name ?? '—'}
                        </p>
                        <p className="text-slate-500 text-xs mt-0.5">
                          {d.sourced_by_name} · {d.num_sites} site{d.num_sites !== 1 ? 's' : ''} · {fmtGbp(calcL1Commission(d.num_sites, d.arr_override))}
                        </p>
                      </div>
                      <button onClick={() => approveCommission(d.id)} disabled={approving === d.id}
                        className="flex items-center gap-1 bg-green-500/15 hover:bg-green-500/25 border border-green-500/25 text-green-400 text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50 flex-shrink-0">
                        <CheckCircle2 size={11} />Approve
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {approvedUnpaid.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800">
                  <PoundSterling size={14} className="text-sky-400" />
                  <h2 className="text-white font-bold text-sm">Approved — mark as paid</h2>
                </div>
                <div className="divide-y divide-slate-800">
                  {approvedUnpaid.map(d => (
                    <div key={d.id} className="px-5 py-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{d.organisations?.trading_name ?? '—'}</p>
                        <p className="text-slate-500 text-xs">{d.sourced_by_name} · {fmtGbp(calcL1Commission(d.num_sites, d.arr_override))}</p>
                      </div>
                      <button onClick={() => markPaid(d.id)} disabled={approving === d.id}
                        className="flex items-center gap-1 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50 flex-shrink-0">
                        <CheckCircle2 size={11} />Mark paid
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
