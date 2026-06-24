import { useEffect, useState, useMemo } from 'react';
import {
  PoundSterling, CheckCircle2, AlertTriangle, XCircle, Clock,
  RefreshCw, TrendingUp, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import PageHeader from './components/PageHeader';
import {
  PRICE_PER_SITE, calcARR, calcL1Commission, calcL2Commission, fmtGbp,
  STAGE_LABELS, Stage, CommissionStatus,
} from '../../lib/commission';

interface DealRow {
  id: string;
  stage: Stage;
  num_sites: number;
  commission_status: CommissionStatus;
  commission_paid_at: string | null;
  sourced_by_user_id: string | null;
  sourced_by_name: string | null;
  created_at: string;
  organisations: { trading_name: string; city: string | null } | null;
}

interface UserProfile {
  id: string;
  display_name: string;
  role: string;
  introduced_by_user_id: string | null;
}

export default function CommissionPage() {
  const { user } = useAuth();
  const [deals, setDeals] = useState<DealRow[]>([]);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [approving, setApproving] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from('user_profiles').select('id, display_name, role, introduced_by_user_id').eq('id', user.id).maybeSingle()
      .then(({ data }) => setProfile(data as UserProfile | null));
  }, [user]);

  async function load() {
    setLoading(true);
    const [dealsRes, profilesRes] = await Promise.all([
      supabase.from('deals').select('id,stage,num_sites,commission_status,commission_paid_at,sourced_by_user_id,sourced_by_name,created_at,organisations(trading_name,city)'),
      supabase.from('user_profiles').select('id,display_name,role,introduced_by_user_id'),
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

  const myApprovedTotal = useMemo(() => myApproved.reduce((s, d) => s + calcL1Commission(d.num_sites), 0), [myApproved]);
  const myPaidTotal = useMemo(() => myApproved.filter(d => d.commission_paid_at).reduce((s, d) => s + calcL1Commission(d.num_sites), 0), [myApproved]);
  const myPipelineTotal = useMemo(() => myPending.reduce((s, d) => s + calcL1Commission(d.num_sites), 0), [myPending]);

  const profileMap = useMemo(() => Object.fromEntries(profiles.map(p => [p.id, p])), [profiles]);

  const l2Earnings = useMemo(() => {
    if (!profile?.introduced_by_user_id) return 0;
    return deals
      .filter(d => {
        const sp = d.sourced_by_user_id ? profileMap[d.sourced_by_user_id] : null;
        return sp?.introduced_by_user_id === user?.id && d.commission_status === 'approved';
      })
      .reduce((s, d) => s + calcL2Commission(d.num_sites), 0);
  }, [deals, profile, profileMap, user]);

  const flaggedDeals = deals.filter(d => d.commission_status === 'flagged');
  const pendingApproval = deals.filter(d => d.commission_status === 'pending' && d.stage === 'won');
  const approvedUnpaid = deals.filter(d => d.commission_status === 'approved' && !d.commission_paid_at && d.stage === 'won');

  const exampleSites = [1, 2, 3, 5, 8, 10, 15, 20];

  return (
    <div className="min-h-full">
      <PageHeader title="Commission" subtitle="How it works, what you're owed, what needs approving." />

      <div className="px-4 py-6 sm:px-8 space-y-8">

        {/* My commission summary */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3">Your commission</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <div className="text-yellow-400 font-black text-2xl">{myApprovedTotal > 0 ? fmtGbp(myApprovedTotal) : '—'}</div>
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
              <div className="text-amber-400 font-black text-2xl">{myFlagged.length > 0 ? myFlagged.length : '—'}</div>
              <div className="text-slate-500 text-xs mt-1">Flagged for review</div>
            </div>
          </div>
          {l2Earnings > 0 && (
            <div className="mt-3 bg-teal-500/5 border border-teal-500/20 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-teal-300 font-bold text-sm">Introducer override earnings</p>
                <p className="text-slate-500 text-xs mt-0.5">5% of ARR from people you've introduced</p>
              </div>
              <p className="text-teal-400 font-black text-xl">{fmtGbp(l2Earnings)}</p>
            </div>
          )}
        </div>

        {/* Admin: flagged + pending approval */}
        {isAdmin && (flaggedDeals.length > 0 || pendingApproval.length > 0 || approvedUnpaid.length > 0) && (
          <div className="space-y-4">
            {flaggedDeals.length > 0 && (
              <div className="bg-slate-900 border border-amber-500/25 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-amber-500/15">
                  <AlertTriangle size={14} className="text-amber-400" />
                  <h2 className="text-white font-bold text-sm">Flagged — needs your decision</h2>
                  <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-full px-2 py-px ml-auto">
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
                          {d.sourced_by_name} · {d.num_sites} site{d.num_sites !== 1 ? 's' : ''} · {fmtGbp(calcL1Commission(d.num_sites))}
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
                          {d.sourced_by_name} · {d.num_sites} site{d.num_sites !== 1 ? 's' : ''} · {fmtGbp(calcL1Commission(d.num_sites))}
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
                  <PoundSterling size={14} className="text-yellow-400" />
                  <h2 className="text-white font-bold text-sm">Approved — mark as paid</h2>
                </div>
                <div className="divide-y divide-slate-800">
                  {approvedUnpaid.map(d => (
                    <div key={d.id} className="px-5 py-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{d.organisations?.trading_name ?? '—'}</p>
                        <p className="text-slate-500 text-xs">{d.sourced_by_name} · {fmtGbp(calcL1Commission(d.num_sites))}</p>
                      </div>
                      <button onClick={() => markPaid(d.id)} disabled={approving === d.id}
                        className="flex items-center gap-1 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-2 rounded-xl transition-colors disabled:opacity-50 flex-shrink-0">
                        <CheckCircle2 size={11} />Mark paid
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Commission structure */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-teal-400" />
            <h2 className="text-white font-bold text-sm">The deal</h2>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
              <p>
                You earn <span className="text-white font-bold">15% of annual contract value</span> for every account you bring in.
                Minimum <span className="text-white font-bold">£200</span> per account regardless of size.
              </p>
              <p>
                Each venue pays <span className="text-teal-400 font-bold">£{PRICE_PER_SITE.toLocaleString()}/year</span>. Multi-site groups are a single account at the number of sites they run.
              </p>
              <p>
                If you introduce another salesperson and they bring in accounts,
                you earn <span className="text-white font-bold">5% of their ARR</span> — indefinitely,
                for as long as those accounts stay live.
              </p>
              <p className="text-slate-500">
                Commission is counted once a deal is marked Won and approved by an admin.
                Where two salespeople have attributed the same organisation, admin resolves the conflict before any commission is paid.
              </p>
            </div>
          </div>
        </div>

        {/* Example table */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3">Example payouts</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-5 py-3 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>Sites</span>
              <span>ARR</span>
              <span>L1 commission</span>
              <span>L2 override</span>
            </div>
            {exampleSites.map(n => {
              const arr = calcARR(n);
              const l1 = calcL1Commission(n);
              const l2 = calcL2Commission(n);
              const atMin = l1 === 200;
              return (
                <div key={n} className={`grid grid-cols-4 px-5 py-3 text-sm border-b border-slate-800 last:border-0 ${n === 1 ? 'text-slate-500' : ''}`}>
                  <span className="text-slate-300 font-semibold">{n}</span>
                  <span className="text-teal-400">{fmtGbp(arr)}</span>
                  <span className={`font-bold ${atMin ? 'text-slate-400' : 'text-yellow-400'}`}>
                    {fmtGbp(l1)}{atMin && <span className="text-slate-600 font-normal text-xs ml-1">(min)</span>}
                  </span>
                  <span className="text-slate-500">{fmtGbp(l2)}</span>
                </div>
              );
            })}
          </div>
          <p className="text-slate-600 text-xs mt-2 px-1">L2 = introducer override. Paid to whoever recruited the salesperson who won the deal.</p>
        </div>

        {/* The script */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3">Explaining it to a new recruit</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{`We pay 15% of the first year's contract value when an account goes live. Minimum £200 per account.

Every venue pays £1,200 a year. One pub is £200. Ten pubs is £1,800. Simple.

There's also an introducer structure. If you bring someone onto the team and they win deals, you earn 5% of those accounts' ARR — ongoing, for as long as the accounts are with us.

Commission is signed off by admin once a deal is confirmed won. If two of us are both claiming the same venue, admin sorts it out before anything gets paid. First one to properly log the relationship and move it through the pipeline is usually the right call.`}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
