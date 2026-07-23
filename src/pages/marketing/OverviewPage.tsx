import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays, Clock, Building2, ArrowRight, RefreshCw, AlertCircle,
  CheckCircle2, CalendarCheck, Trophy, UserCheck,
  Flame, ChevronRight, GitBranch, TrendingUp, PoundSterling,
  Target, BarChart3,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import PageHeader from './components/PageHeader';
import LogDealModal from './components/LogDealModal';
import { calcARR, calcL1Commission, fmtGbp, STAGE_LABELS, Stage } from '../../lib/commission';

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function isoDate(d: Date) { return d.toISOString().slice(0, 10); }

interface DealRow {
  id: string;
  stage: Stage;
  sourced_by_user_id: string | null;
  sourced_by_name: string | null;
  assigned_to_user_id: string | null;
  assigned_to_name: string | null;
  num_sites: number;
  next_action_date: string | null;
  commission_status: string;
  arr_override: number | null;
  created_at: string;
  won_at: string | null;
  organisations: { trading_name: string; city: string | null } | null;
  next_action: string | null;
}

interface Slot {
  id: string;
  slot_date: string;
  slot_time: string;
  booked: boolean;
  notes: string;
}

function KpiCard({
  icon: Icon, label, value, sub, tone = 'neutral', to,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  tone?: 'teal' | 'sky' | 'green' | 'neutral';
  to?: string;
}) {
  const c = {
    teal: { wrap: 'bg-teal-500/8 border-teal-500/25 hover:border-teal-400/40', icon: 'bg-teal-500/20 border-teal-500/30', ic: 'text-teal-400', val: 'text-teal-300' },
    sky: { wrap: 'bg-sky-500/8 border-sky-500/25 hover:border-sky-400/40', icon: 'bg-sky-500/20 border-sky-500/30', ic: 'text-sky-400', val: 'text-sky-300' },
    green: { wrap: 'bg-emerald-500/8 border-emerald-500/25 hover:border-emerald-400/40', icon: 'bg-emerald-500/20 border-emerald-500/30', ic: 'text-emerald-400', val: 'text-emerald-300' },
    neutral: { wrap: 'bg-slate-800/60 border-slate-700 hover:border-slate-600', icon: 'bg-slate-700 border-slate-600', ic: 'text-slate-400', val: 'text-white' },
  }[tone];
  const cls = `rounded-xl border p-4 flex flex-col gap-3 transition-all ${to ? 'cursor-pointer' : ''} ${c.wrap}`;
  const inner = (
    <>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${c.icon}`}>
        <Icon size={14} className={c.ic} />
      </div>
      <div>
        <div className={`text-xl font-bold leading-none ${c.val}`}>{value}</div>
        <div className="text-slate-500 text-xs mt-1 font-medium">{label}</div>
        {sub && <div className="text-slate-600 text-[10px] mt-0.5">{sub}</div>}
      </div>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <div className={cls}>{inner}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">{children}</h2>
  );
}

function MonthlyTrend({ deals }: { deals: DealRow[] }) {
  const months = useMemo(() => {
    const now = new Date();
    const result: { label: string; key: string; count: number; arr: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      result.push({ label: d.toLocaleDateString('en-GB', { month: 'short' }), key, count: 0, arr: 0 });
    }
    for (const deal of deals) {
      if (!deal.won_at) continue;
      const key = deal.won_at.slice(0, 7);
      const m = result.find(r => r.key === key);
      if (m) { m.count++; m.arr += calcARR(deal.num_sites, deal.arr_override); }
    }
    return result;
  }, [deals]);

  const maxArr = Math.max(...months.map(m => m.arr), 1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 size={13} className="text-teal-400" />
        <span className="text-sm font-semibold text-white">Won by month</span>
        <span className="text-slate-600 text-xs ml-auto">6-month trend</span>
      </div>
      <div className="flex items-end gap-2" style={{ height: '72px' }}>
        {months.map((m) => (
          <div key={m.key} className="flex-1 flex flex-col items-center gap-1 h-full">
            <div className="w-full flex items-end flex-1">
              <div
                className="w-full rounded-t bg-teal-500/60 hover:bg-teal-500/80 transition-colors min-h-[2px]"
                style={{ height: `${Math.max(Math.round((m.arr / maxArr) * 52), m.arr > 0 ? 4 : 2)}px` }}
                title={`${m.count} deal${m.count !== 1 ? 's' : ''} — ${fmtGbp(m.arr)} ARR`}
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-1">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-600">
        <span>{months.reduce((s, m) => s + m.count, 0)} deals won</span>
        <span>{fmtGbp(months.reduce((s, m) => s + m.arr, 0))} ARR</span>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const { user, profile, founderIds } = useAuth();
  const [deals, setDeals] = useState<DealRow[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [showAddLead, setShowAddLead] = useState(false);
  const [leaderTab, setLeaderTab] = useState<'pipeline' | 'won'>('pipeline');

  async function load() {
    setLoading(true);
    const today = isoDate(new Date());
    const [dealsRes, slotRes] = await Promise.all([
      supabase.from('deals')
        .select('id,stage,sourced_by_user_id,sourced_by_name,assigned_to_user_id,assigned_to_name,commission_status,next_action,next_action_date,num_sites,arr_override,created_at,won_at,organisations(trading_name,city)')
        .order('next_action_date', { ascending: true, nullsFirst: false }),
      supabase.from('demo_availability').select('id,slot_date,slot_time,booked,notes').gte('slot_date', today),
    ]);
    setDeals((dealsRes.data ?? []) as DealRow[]);
    setSlots(slotRes.data ?? []);
    setLastRefreshed(new Date());
    setLoading(false);
  }

  useEffect(() => {
    load();

    const channel = supabase
      .channel('overview-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deals' }, () => load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_availability' }, () => load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_bookings' }, () => load())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const today = isoDate(new Date());
  const sevenAgo = isoDate(new Date(Date.now() - 7 * 86400000));

  const activeDeals = useMemo(() => deals.filter(d => d.stage !== 'won' && d.stage !== 'lost'), [deals]);
  const wonDeals = useMemo(() => deals.filter(d => d.stage === 'won'), [deals]);
  const lostDeals = useMemo(() => deals.filter(d => d.stage === 'lost'), [deals]);

  const myDeals = useMemo(() => activeDeals.filter(d => d.sourced_by_user_id === profile?.id || d.assigned_to_user_id === profile?.id), [activeDeals, profile]);
  const myWonDeals = useMemo(() => wonDeals.filter(d => d.sourced_by_user_id === profile?.id), [wonDeals, profile]);
  const newThisWeek = useMemo(() => deals.filter(d => d.created_at.slice(0, 10) >= sevenAgo).length, [deals, sevenAgo]);

  const totalPipelineArr = useMemo(() => activeDeals.reduce((s, d) => s + calcARR(d.num_sites, d.arr_override), 0), [activeDeals]);
  const totalWonArr = useMemo(() => wonDeals.reduce((s, d) => s + calcARR(d.num_sites, d.arr_override), 0), [wonDeals]);
  const conversionRate = useMemo(() => {
    const decided = wonDeals.length + lostDeals.length;
    return decided === 0 ? null : Math.round((wonDeals.length / decided) * 100);
  }, [wonDeals, lostDeals]);

  const commissionApproved = useMemo(() =>
    deals.filter(d => d.commission_status === 'approved' && !founderIds.has(d.sourced_by_user_id ?? '')).reduce((s, d) => s + calcL1Commission(d.num_sites, d.arr_override), 0),
  [deals, founderIds]);

  const myPipelineArr = useMemo(() => myDeals.reduce((s, d) => s + calcARR(d.num_sites, d.arr_override), 0), [myDeals]);
  const myWonArr = useMemo(() => myWonDeals.reduce((s, d) => s + calcARR(d.num_sites, d.arr_override), 0), [myWonDeals]);
  const myCommission = useMemo(() => myDeals.reduce((s, d) => s + calcL1Commission(d.num_sites, d.arr_override), 0), [myDeals]);

  const bookedSlots = new Set(slots.filter(s => s.booked).map(s => s.booked_by_booking_id ?? s.id)).size;
  const availableSlots = slots.filter(s => !s.booked).length;
  const nextSlot = slots
    .filter(s => !s.booked && s.slot_date >= today)
    .sort((a, b) => a.slot_date.localeCompare(b.slot_date) || a.slot_time.localeCompare(b.slot_time))[0];

  const pipelineLeaderboard = useMemo(() => {
    const map = new Map<string, { userId: string; name: string; arr: number; commission: number; count: number }>();
    for (const d of activeDeals) {
      const uid = d.assigned_to_user_id ?? d.sourced_by_user_id;
      const name = d.assigned_to_name ?? d.sourced_by_name;
      if (!uid || !name) continue;
      const arr = calcARR(d.num_sites, d.arr_override);
      const comm = calcL1Commission(d.num_sites, d.arr_override);
      const ex = map.get(uid);
      if (ex) { ex.arr += arr; ex.commission += comm; ex.count++; }
      else map.set(uid, { userId: uid, name, arr, commission: comm, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => b.arr - a.arr);
  }, [activeDeals]);

  const wonLeaderboard = useMemo(() => {
    const map = new Map<string, { userId: string; name: string; arr: number; commission: number; count: number }>();
    for (const d of wonDeals) {
      if (!d.sourced_by_user_id || !d.sourced_by_name) continue;
      const arr = calcARR(d.num_sites, d.arr_override);
      const comm = calcL1Commission(d.num_sites, d.arr_override);
      const ex = map.get(d.sourced_by_user_id);
      if (ex) { ex.arr += arr; ex.commission += comm; ex.count++; }
      else map.set(d.sourced_by_user_id, { userId: d.sourced_by_user_id, name: d.sourced_by_name, arr, commission: comm, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => b.arr - a.arr);
  }, [wonDeals]);

  const leaderboard = leaderTab === 'pipeline' ? pipelineLeaderboard : wonLeaderboard;

  const overdueActions = useMemo(() =>
    myDeals.filter(d => d.next_action_date && d.next_action_date < today && d.next_action),
  [myDeals, today]);
  const dueTodayActions = useMemo(() =>
    myDeals.filter(d => d.next_action_date === today && d.next_action),
  [myDeals, today]);
  const comingUpActions = useMemo(() => {
    const threeDays = isoDate(new Date(Date.now() + 3 * 86400000));
    return myDeals.filter(d =>
      d.next_action_date && d.next_action_date > today && d.next_action_date <= threeDays && d.next_action
    );
  }, [myDeals, today]);

  const userName = profile?.display_name || user?.email?.split('@')[0] || 'You';

  return (
    <div className="min-h-full">
      <PageHeader title="Overview" subtitle="Company performance and your activity." hideHome />

      <div className="px-4 py-5 sm:px-8 sm:py-6 space-y-8 max-w-[1400px] mx-auto">


        {/* ── COMPANY PERFORMANCE ── */}
        <section className="space-y-4">
          <SectionLabel>Company performance</SectionLabel>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <KpiCard icon={Trophy} label="Clients won" value={wonDeals.length} sub="all time" tone="green" to="/pipeline" />
            <KpiCard icon={PoundSterling} label="ARR won" value={totalWonArr > 0 ? fmtGbp(totalWonArr) : '—'} sub="total closed" tone="green" to="/pipeline" />
            <KpiCard icon={GitBranch} label="Active pipeline" value={totalPipelineArr > 0 ? fmtGbp(totalPipelineArr) : '—'} sub={`${activeDeals.length} deals`} tone="teal" to="/pipeline" />
            <KpiCard icon={Target} label="Conversion rate" value={conversionRate !== null ? `${conversionRate}%` : '—'} sub="won vs decided" tone="sky" />
            <KpiCard icon={CheckCircle2} label="Commission approved" value={commissionApproved > 0 ? fmtGbp(commissionApproved) : '—'} sub="ready to pay" tone="sky" to="/commission" />
            <KpiCard icon={CalendarDays} label="New this week" value={newThisWeek} sub="leads added" tone={newThisWeek > 0 ? 'teal' : 'neutral'} to="/pipeline" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <MonthlyTrend deals={deals} />
            </div>

            {/* Merged diary card */}
            <Link to="/diary" className="block">
              <div className={`h-full rounded-xl border p-5 transition-all hover:border-teal-500/40 cursor-pointer ${nextSlot ? 'bg-teal-500/5 border-teal-500/20' : 'bg-slate-900 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={13} className="text-teal-400" />
                    <span className="text-sm font-semibold text-white">Demo Diary</span>
                  </div>
                  <ArrowRight size={13} className="text-slate-600" />
                </div>
                {nextSlot ? (
                  <div className="mb-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Next open slot</p>
                    <div className="text-white font-bold text-base">
                      {new Date(nextSlot.slot_date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </div>
                    <div className="text-teal-400 font-semibold text-sm">{nextSlot.slot_time}</div>
                  </div>
                ) : (
                  <div className="mb-4 flex items-center gap-2 text-slate-400 text-sm">
                    <AlertCircle size={14} className="text-sky-400" />No open slots
                  </div>
                )}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5"><CheckCircle2 size={10} className="text-teal-400" />Open slots</span>
                    <span className="text-white font-semibold">{availableSlots}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5"><CalendarCheck size={10} className="text-sky-400" />Booked demos</span>
                    <span className="text-sky-400 font-semibold">{bookedSlots}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Leaderboard */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Trophy size={13} className="text-sky-400" />
                <h2 className="text-sm font-semibold text-white">Team leaderboard</h2>
              </div>
              <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
                {(['pipeline', 'won'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setLeaderTab(tab)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      leaderTab === tab ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab === 'pipeline' ? 'Pipeline' : 'Won'}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="py-10 text-center text-slate-600 text-sm">
                <RefreshCw size={16} className="animate-spin mx-auto mb-2" />
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="py-10 text-center text-slate-600 text-sm">
                {leaderTab === 'won' ? 'No won deals yet.' : 'No pipeline data yet — log some leads.'}
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {leaderboard.map((entry, i) => (
                  <div key={entry.name} className={`px-5 py-3.5 flex items-center gap-4 ${i === 0 ? 'bg-sky-500/5' : ''}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs border ${
                      i === 0 ? 'bg-sky-500/20 border-sky-500/30 text-sky-300' : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}>
                      {i === 0 ? <Trophy size={11} /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`font-semibold text-sm ${i === 0 ? 'text-sky-200' : 'text-white'}`}>{entry.name}</span>
                        <span className="text-[10px] text-slate-500">{entry.count} deal{entry.count !== 1 ? 's' : ''}</span>
                        {entry.name === userName && (
                          <span className="text-[10px] font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full px-2 py-px flex items-center gap-1">
                            <UserCheck size={8} />you
                          </span>
                        )}
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${i === 0 ? 'bg-sky-400' : 'bg-teal-500'}`}
                          style={{ width: `${Math.round((entry.arr / (leaderboard[0]?.arr || 1)) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-white font-semibold text-sm">{fmtGbp(entry.arr)}</div>
                      <div className="text-slate-500 text-[10px]">
                        {founderIds.has(entry.userId) ? 'Business' : fmtGbp(entry.commission) + ' comm.'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── MY ACTIVITY ── */}
        <section className="space-y-4">
          <SectionLabel>My activity</SectionLabel>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <KpiCard icon={GitBranch} label="My active deals" value={myDeals.length} sub="in pipeline" tone="teal" to="/pipeline" />
            <KpiCard icon={Building2} label="My pipeline ARR" value={myPipelineArr > 0 ? fmtGbp(myPipelineArr) : '—'} sub="if all convert" tone="teal" to="/pipeline" />
            <KpiCard icon={TrendingUp} label="My won ARR" value={myWonArr > 0 ? fmtGbp(myWonArr) : '—'} sub={`${myWonDeals.length} client${myWonDeals.length !== 1 ? 's' : ''}`} tone="green" to="/pipeline" />
            {profile?.is_founder ? (
              <KpiCard icon={CheckCircle2} label="Commission" value="Business" sub="goes to company" tone="sky" to="/commission" />
            ) : (
              <KpiCard icon={PoundSterling} label="My commission" value={myCommission > 0 ? fmtGbp(myCommission) : '—'} sub="pipeline est." tone="sky" to="/commission" />
            )}
          </div>

          {(overdueActions.length > 0 || dueTodayActions.length > 0 || comingUpActions.length > 0) ? (
            <div className="space-y-2">
              {overdueActions.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-2.5 border-b border-red-500/15">
                    <AlertCircle size={12} className="text-red-400" />
                    <h3 className="text-white font-semibold text-sm">Overdue</h3>
                    <span className="text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded-full px-2 py-px ml-auto">{overdueActions.length}</span>
                  </div>
                  <div className="divide-y divide-red-500/10">
                    {overdueActions.map(d => (
                      <Link key={d.id} to={`/deals/${d.id}`}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-red-500/5 transition-colors group">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{d.organisations?.trading_name ?? '—'}</p>
                          <p className="text-red-400 text-xs mt-0.5">{d.next_action}</p>
                        </div>
                        <span className="text-red-500 text-[10px] font-semibold flex-shrink-0">
                          {(() => { const diff = Math.round((new Date(today).getTime() - new Date(d.next_action_date!).getTime()) / 86400000); return `${diff}d overdue`; })()}
                        </span>
                        <ChevronRight size={13} className="text-slate-600 group-hover:text-red-400 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {dueTodayActions.length > 0 && (
                <div className="bg-sky-500/5 border border-sky-500/20 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-2.5 border-b border-sky-500/15">
                    <Flame size={12} className="text-sky-400" />
                    <h3 className="text-white font-semibold text-sm">Due today</h3>
                  </div>
                  <div className="divide-y divide-sky-500/10">
                    {dueTodayActions.map(d => (
                      <Link key={d.id} to={`/deals/${d.id}`}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-sky-500/5 transition-colors group">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{d.organisations?.trading_name ?? '—'}</p>
                          <p className="text-sky-300 text-xs mt-0.5">{d.next_action}</p>
                        </div>
                        <span className="text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full px-2 py-px flex-shrink-0">
                          {STAGE_LABELS[d.stage]}
                        </span>
                        <ChevronRight size={13} className="text-slate-600 group-hover:text-sky-400 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {comingUpActions.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800">
                    <CalendarDays size={12} className="text-teal-400" />
                    <h3 className="text-white font-semibold text-sm">Coming up</h3>
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    {comingUpActions.map(d => (
                      <Link key={d.id} to={`/deals/${d.id}`}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800/50 transition-colors group">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{d.organisations?.trading_name ?? '—'}</p>
                          <p className="text-slate-400 text-xs mt-0.5">{d.next_action}</p>
                        </div>
                        <span className="text-slate-500 text-[10px] flex-shrink-0">
                          {(() => { const diff = Math.round((new Date(d.next_action_date!).getTime() - new Date(today).getTime()) / 86400000); return diff === 1 ? 'Tomorrow' : `in ${diff}d`; })()}
                        </span>
                        <ChevronRight size={13} className="text-slate-600 group-hover:text-teal-400 flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-8 text-center text-slate-500 text-sm">
                No actions due — you're all caught up.
              </div>
            )
          )}
        </section>

      </div>

      {showAddLead && profile && (
        <LogDealModal
          userId={profile.id}
          userName={userName}
          onClose={() => setShowAddLead(false)}
        />
      )}
    </div>
  );
}
