import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays, Clock, Building2, ArrowRight, RefreshCw, AlertCircle,
  CheckCircle2, CalendarCheck, Trophy, UserCheck, Plus, Copy, Check,
  ExternalLink, Flame, ChevronRight, GitBranch,
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
  commission_status: string;
  next_action: string | null;
  next_action_date: string | null;
  num_sites: number;
  arr_override: number | null;
  created_at: string;
  organisations: { trading_name: string; city: string | null } | null;
}

interface Slot {
  id: string;
  slot_date: string;
  slot_time: string;
  booked: boolean;
}

function KpiCard({
  icon: Icon, label, value, sub, tone = 'neutral', to,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  tone?: 'teal' | 'amber' | 'gold' | 'neutral';
  to?: string;
}) {
  const c = {
    teal: { wrap: 'bg-teal-500/8 border-teal-500/25 hover:border-teal-400/40', icon: 'bg-teal-500/20 border-teal-500/30', ic: 'text-teal-400', val: 'text-teal-400' },
    amber: { wrap: 'bg-amber-500/8 border-amber-500/25', icon: 'bg-amber-500/20 border-amber-500/30', ic: 'text-amber-400', val: 'text-amber-400' },
    gold: { wrap: 'bg-yellow-500/8 border-yellow-500/25', icon: 'bg-yellow-500/20 border-yellow-500/30', ic: 'text-yellow-400', val: 'text-yellow-300' },
    neutral: { wrap: 'bg-slate-800 border-slate-700 hover:border-slate-500', icon: 'bg-slate-700 border-slate-600', ic: 'text-slate-400', val: 'text-white' },
  }[tone];
  const cls = `rounded-2xl border p-5 flex flex-col gap-2 transition-all ${to ? 'cursor-pointer hover:scale-[1.02]' : ''} ${c.wrap}`;
  const inner = (
    <>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${c.icon}`}>
        <Icon size={16} className={c.ic} />
      </div>
      <div>
        <div className={`text-3xl font-black leading-none ${c.val}`}>{value}</div>
        <div className="text-slate-400 text-xs mt-1 font-medium">{label}</div>
        {sub && <div className="text-slate-600 text-[10px] mt-0.5">{sub}</div>}
      </div>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <div className={cls}>{inner}</div>;
}

function CopyLinkButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
        copied ? 'bg-teal-500/20 border-teal-500/40 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
      }`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy landing page link'}
    </button>
  );
}

export default function OverviewPage() {
  const { user, profile } = useAuth();
  const [deals, setDeals] = useState<DealRow[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [showAddLead, setShowAddLead] = useState(false);
  const [founderIds, setFounderIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    supabase.from('user_profiles').select('id, is_founder').eq('is_founder', true)
      .then(({ data }) => setFounderIds(new Set((data ?? []).map((p: { id: string }) => p.id))));
  }, [user]);

  async function load() {
    setLoading(true);
    const today = isoDate(new Date());
    const [dealsRes, slotRes] = await Promise.all([
      supabase.from('deals')
        .select('id,stage,sourced_by_user_id,sourced_by_name,commission_status,next_action,next_action_date,num_sites,arr_override,created_at,organisations(trading_name,city)')
        .order('next_action_date', { ascending: true, nullsFirst: false }),
      supabase.from('demo_availability').select('id,slot_date,slot_time,booked').gte('slot_date', today),
    ]);
    setDeals((dealsRes.data ?? []) as DealRow[]);
    setSlots(slotRes.data ?? []);
    setLastRefreshed(new Date());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const today = isoDate(new Date());
  const sevenAgo = isoDate(new Date(Date.now() - 7 * 86400000));

  const activeDeals = useMemo(() => deals.filter(d => d.stage !== 'won' && d.stage !== 'lost'), [deals]);
  const myDeals = useMemo(() => activeDeals.filter(d => d.sourced_by_user_id === user?.id), [activeDeals, user]);
  const newThisWeek = useMemo(() => deals.filter(d => d.created_at.slice(0, 10) >= sevenAgo).length, [deals, sevenAgo]);

  const myPipelineArr = useMemo(() => myDeals.reduce((s, d) => s + calcARR(d.num_sites, d.arr_override), 0), [myDeals]);
  const myCommission = useMemo(() => myDeals.reduce((s, d) => s + calcL1Commission(d.num_sites, d.arr_override), 0), [myDeals]);

  const totalPipelineArr = useMemo(() => activeDeals.reduce((s, d) => s + calcARR(d.num_sites, d.arr_override), 0), [activeDeals]);

  const bookedSlots = slots.filter(s => s.booked).length;
  const availableSlots = slots.filter(s => !s.booked).length;

  const nextSlot = slots
    .filter(s => !s.booked && s.slot_date >= today)
    .sort((a, b) => a.slot_date.localeCompare(b.slot_date) || a.slot_time.localeCompare(b.slot_time))[0];

  const leaderboard = useMemo(() => {
    const map = new Map<string, { userId: string; name: string; arr: number; commission: number; count: number }>();
    for (const d of activeDeals) {
      if (!d.sourced_by_user_id || !d.sourced_by_name) continue;
      const arr = calcARR(d.num_sites, d.arr_override);
      const comm = calcL1Commission(d.num_sites, d.arr_override);
      const ex = map.get(d.sourced_by_user_id);
      if (ex) { ex.arr += arr; ex.commission += comm; ex.count++; }
      else map.set(d.sourced_by_user_id, { userId: d.sourced_by_user_id, name: d.sourced_by_name, arr, commission: comm, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => b.arr - a.arr);
  }, [activeDeals]);

  // Actions due
  const overdueActions = useMemo(() =>
    myDeals.filter(d => d.next_action_date && d.next_action_date < today && d.next_action),
  [myDeals, today]);

  const dueTodayActions = useMemo(() =>
    myDeals.filter(d => d.next_action_date === today && d.next_action),
  [myDeals, today]);

  const comingUpActions = useMemo(() => {
    const threeDays = isoDate(new Date(Date.now() + 3 * 86400000));
    return myDeals.filter(d =>
      d.next_action_date &&
      d.next_action_date > today &&
      d.next_action_date <= threeDays &&
      d.next_action
    );
  }, [myDeals, today]);

  const userName = profile?.display_name || user?.email?.split('@')[0] || 'You';
  const landingUrl = typeof window !== 'undefined' ? `${window.location.origin}/demo` : '';

  return (
    <div className="min-h-full">
      <PageHeader title="Overview" subtitle="Your pipeline at a glance." badge="Live" />

      <div className="px-4 py-6 sm:p-8 space-y-7">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 -mt-2">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            <Clock size={11} />Updated {timeAgo(lastRefreshed.toISOString())}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <CopyLinkButton text={landingUrl} />
            <a href="/demo" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all">
              <ExternalLink size={13} />Open landing page
            </a>
            <button
              onClick={() => setShowAddLead(true)}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 transition-colors text-white text-xs font-bold px-4 py-2.5 rounded-xl"
            >
              <Plus size={13} />Log a lead
            </button>
            <button onClick={load} className="flex items-center gap-1.5 text-slate-500 hover:text-teal-400 text-xs transition-colors">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Actions today (system-led focus) */}
        {(overdueActions.length > 0 || dueTodayActions.length > 0 || comingUpActions.length > 0) && (
          <div className="space-y-3">
            {overdueActions.length > 0 && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-red-500/15">
                  <AlertCircle size={13} className="text-red-400" />
                  <h2 className="text-white font-bold text-sm">Overdue</h2>
                  <span className="text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded-full px-2 py-px ml-auto">
                    {overdueActions.length}
                  </span>
                </div>
                <div className="divide-y divide-red-500/10">
                  {overdueActions.map(d => (
                    <Link key={d.id} to={`/deals/${d.id}`}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-red-500/5 transition-colors group">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{d.organisations?.trading_name ?? '—'}</p>
                        <p className="text-red-400 text-xs mt-0.5">{d.next_action}</p>
                      </div>
                      <span className="text-red-500 text-[10px] font-bold flex-shrink-0">
                        {(() => {
                          const diff = Math.round((new Date(today).getTime() - new Date(d.next_action_date!).getTime()) / 86400000);
                          return `${diff}d overdue`;
                        })()}
                      </span>
                      <ChevronRight size={13} className="text-slate-600 group-hover:text-red-400 transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {dueTodayActions.length > 0 && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-amber-500/15">
                  <Flame size={13} className="text-amber-400" />
                  <h2 className="text-white font-bold text-sm">Due today</h2>
                </div>
                <div className="divide-y divide-amber-500/10">
                  {dueTodayActions.map(d => (
                    <Link key={d.id} to={`/deals/${d.id}`}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-amber-500/5 transition-colors group">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{d.organisations?.trading_name ?? '—'}</p>
                        <p className="text-amber-300 text-xs mt-0.5">{d.next_action}</p>
                      </div>
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-2 py-px flex-shrink-0">
                        {STAGE_LABELS[d.stage]}
                      </span>
                      <ChevronRight size={13} className="text-slate-600 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {comingUpActions.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-800">
                  <CalendarDays size={13} className="text-teal-400" />
                  <h2 className="text-white font-bold text-sm">Coming up</h2>
                </div>
                <div className="divide-y divide-slate-800">
                  {comingUpActions.map(d => (
                    <Link key={d.id} to={`/deals/${d.id}`}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800/60 transition-colors group">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{d.organisations?.trading_name ?? '—'}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{d.next_action}</p>
                      </div>
                      <span className="text-slate-600 text-[10px] flex-shrink-0">
                        {(() => {
                          const diff = Math.round((new Date(d.next_action_date!).getTime() - new Date(today).getTime()) / 86400000);
                          return diff === 1 ? 'Tomorrow' : `in ${diff}d`;
                        })()}
                      </span>
                      <ChevronRight size={13} className="text-slate-600 group-hover:text-teal-400 transition-colors flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard icon={GitBranch} label="Active deals" value={activeDeals.length} sub="in pipeline" tone="teal" to="/pipeline" />
          <KpiCard icon={CalendarDays} label="New this week" value={newThisWeek} tone={newThisWeek > 0 ? 'teal' : 'neutral'} to="/pipeline" />
          <KpiCard icon={CalendarCheck} label="Demos booked" value={bookedSlots} sub={`${availableSlots} slots open`} tone={bookedSlots > 0 ? 'amber' : 'neutral'} to="/diary" />
          <KpiCard icon={Building2} label="Pipeline ARR" value={totalPipelineArr > 0 ? fmtGbp(totalPipelineArr) : '—'} sub="if all convert" tone="teal" to="/pipeline" />
          <KpiCard icon={Trophy} label="My pipeline" value={myPipelineArr > 0 ? fmtGbp(myPipelineArr) : '—'} sub={`${myDeals.length} deal${myDeals.length !== 1 ? 's' : ''}`} tone="gold" to="/pipeline" />
          {profile?.is_founder ? (
            <KpiCard icon={CheckCircle2} label="Commission" value="Business" sub="goes to the company" tone="amber" to="/commission" />
          ) : (
            <KpiCard icon={CheckCircle2} label="My commission" value={myCommission > 0 ? fmtGbp(myCommission) : myDeals.length === 0 ? 'Log leads' : '—'} sub="£200 or 15%, whichever is greater" tone="gold" to="/commission" />
          )}
        </div>

        {/* Leaderboard + diary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Trophy size={14} className="text-amber-400" />
                <h2 className="text-white font-bold text-sm">Pipeline leaderboard</h2>
              </div>
              <Link to="/pipeline" className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs transition-colors font-semibold">
                View all <ArrowRight size={11} />
              </Link>
            </div>
            {loading ? (
              <div className="py-12 text-center text-slate-600 text-sm">
                <RefreshCw size={18} className="animate-spin mx-auto mb-2" />
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="py-12 text-center text-slate-600 text-sm">
                No pipeline data yet — log some leads.
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {leaderboard.map((entry, i) => (
                  <div key={entry.name} className={`px-6 py-4 flex items-center gap-4 ${i === 0 ? 'bg-amber-500/5' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm border ${
                      i === 0 ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}>
                      {i === 0 ? <Trophy size={13} /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-bold text-sm ${i === 0 ? 'text-amber-200' : 'text-white'}`}>{entry.name}</span>
                        <span className="text-[10px] text-slate-500">{entry.count} deal{entry.count !== 1 ? 's' : ''}</span>
                        {entry.name === userName && (
                          <span className="text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full px-2 py-px flex items-center gap-1">
                            <UserCheck size={8} />you
                          </span>
                        )}
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${i === 0 ? 'bg-amber-400' : 'bg-teal-500'}`}
                          style={{ width: `${Math.round((entry.arr / (leaderboard[0]?.arr || 1)) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-slate-400 text-xs">{fmtGbp(entry.arr)}/yr ARR</div>
                      {founderIds.has(entry.userId) ? (
                        <div className="font-bold text-sm text-amber-400">Business</div>
                      ) : (
                        <div className={`font-bold text-sm ${i === 0 ? 'text-yellow-300' : 'text-teal-400'}`}>
                          {fmtGbp(entry.commission)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className={`rounded-2xl border p-5 ${nextSlot ? 'bg-teal-500/5 border-teal-500/20' : 'bg-slate-900 border-slate-800'}`}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={14} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Next open slot</h2>
              </div>
              {nextSlot ? (
                <>
                  <div className="text-white font-black text-base mb-0.5">
                    {new Date(nextSlot.slot_date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </div>
                  <div className="text-teal-400 font-bold text-sm">{nextSlot.slot_time}</div>
                  <Link to="/diary" className="mt-3 flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors font-semibold">
                    Manage diary <ArrowRight size={11} />
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-1">
                    <AlertCircle size={14} />No open slots
                  </div>
                  <p className="text-slate-500 text-xs leading-snug">Add availability so prospects can book a demo.</p>
                  <Link to="/diary" className="mt-3 flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors font-semibold">
                    Open diary <ArrowRight size={11} />
                  </Link>
                </>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CalendarCheck size={14} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Diary</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><CheckCircle2 size={11} className="text-teal-400" />Open slots</span>
                  <span className="text-white font-bold">{availableSlots}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5"><CalendarCheck size={11} className="text-amber-400" />Booked demos</span>
                  <span className="text-amber-400 font-bold">{bookedSlots}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {showAddLead && user && (
        <LogDealModal
          userId={user.id}
          userName={userName}
          onClose={() => setShowAddLead(false)}
        />
      )}
    </div>
  );
}
