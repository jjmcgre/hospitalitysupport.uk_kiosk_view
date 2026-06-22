import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox, CalendarDays, TrendingUp, Clock, Building2, ArrowRight,
  RefreshCw, PoundSterling, AlertCircle, CheckCircle2, CalendarCheck,
  Trophy, UserCheck, Plus, Copy, Check, ExternalLink, Coins,
  Star, Flame,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import PageHeader from './components/PageHeader';
import AddLeadModal from './components/AddLeadModal';

const PRICE_PER_SITE = 1200;
const COMMISSION_LOW = 0.15;
const COMMISSION_HIGH = 0.20;
const COMMISSION_THRESHOLD = 10;

function arr(sites: number) {
  return sites * PRICE_PER_SITE;
}

function commission(sites: number) {
  if (sites <= 0) return 0;
  const rate = sites < COMMISSION_THRESHOLD ? COMMISSION_LOW : COMMISSION_HIGH;
  return arr(sites) * rate;
}

function fmtGbp(n: number) {
  return `£${Math.round(n).toLocaleString('en-GB')}`;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  business_name: string;
  num_sites: string;
  created_at: string;
  sourced_by_user_id: string | null;
  sourced_by_name: string | null;
  status: string | null;
}

interface Slot {
  id: string;
  slot_date: string;
  slot_time: string;
  booked: boolean;
}

// ── Reusable UI components ────────────────────────────────────────────────

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
  const colours = {
    teal:    { wrap: 'bg-teal-500/8 border-teal-500/25 hover:border-teal-400/40', icon: 'bg-teal-500/20 border-teal-500/30', ic: 'text-teal-400', val: 'text-teal-400' },
    amber:   { wrap: 'bg-amber-500/8 border-amber-500/25 hover:border-amber-400/40', icon: 'bg-amber-500/20 border-amber-500/30', ic: 'text-amber-400', val: 'text-amber-400' },
    gold:    { wrap: 'bg-yellow-500/8 border-yellow-500/25 hover:border-yellow-400/40', icon: 'bg-yellow-500/20 border-yellow-500/30', ic: 'text-yellow-400', val: 'text-yellow-300' },
    neutral: { wrap: 'bg-slate-800 border-slate-700 hover:border-slate-500', icon: 'bg-slate-700 border-slate-600', ic: 'text-slate-400', val: 'text-white' },
  };
  const c = colours[tone];
  const cls = `rounded-2xl border p-5 flex flex-col gap-2 transition-all ${to ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]' : ''} ${c.wrap}`;
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

function ProgressBar({ count, max, tone = 'teal' }: { count: number; max: number; tone?: 'teal' | 'amber' | 'gold' }) {
  const pct = max === 0 ? 0 : Math.round((count / max) * 100);
  const bg = tone === 'gold' ? 'bg-yellow-400' : tone === 'amber' ? 'bg-amber-400' : 'bg-teal-500';
  return (
    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
      <div className={`h-full ${bg} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function CopyLinkButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
        copied
          ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
      }`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy landing page link'}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export default function OverviewPage() {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [showAddLead, setShowAddLead] = useState(false);
  const [profile, setProfile] = useState<{ display_name: string } | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from('user_profiles').select('display_name').eq('id', user.id).maybeSingle();
      setProfile(data ?? null);
    })();
  }, [user]);

  async function load() {
    setLoading(true);
    const today = isoDate(new Date());
    const [enqRes, slotRes] = await Promise.all([
      supabase.from('demo_bookings')
        .select('id,name,email,business_name,num_sites,created_at,sourced_by_user_id,sourced_by_name,status')
        .order('created_at', { ascending: false }),
      supabase.from('demo_availability').select('id,slot_date,slot_time,booked').gte('slot_date', today),
    ]);
    setEnquiries(enqRes.data ?? []);
    setSlots(slotRes.data ?? []);
    setLastRefreshed(new Date());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  // ── Derived values ────────────────────────────────────────────────────

  const today = isoDate(new Date());
  const sevenAgo = isoDate(new Date(Date.now() - 7 * 86400000));

  const last7 = enquiries.filter(e => e.created_at.slice(0, 10) >= sevenAgo).length;
  const bookedSlots = slots.filter(s => s.booked).length;
  const availableSlots = slots.filter(s => !s.booked).length;

  const totalPipelineArr = useMemo(() =>
    enquiries.reduce((sum, e) => { const n = parseInt(e.num_sites, 10); return sum + (isNaN(n) ? 0 : arr(n)); }, 0)
  , [enquiries]);

  const totalPipelineCommission = useMemo(() =>
    enquiries.reduce((sum, e) => { const n = parseInt(e.num_sites, 10); return sum + (isNaN(n) ? 0 : commission(n)); }, 0)
  , [enquiries]);

  const myLeads = useMemo(() => enquiries.filter(e => e.sourced_by_user_id === user?.id), [enquiries, user]);

  const myPipelineArr = useMemo(() =>
    myLeads.reduce((sum, e) => { const n = parseInt(e.num_sites, 10); return sum + (isNaN(n) ? 0 : arr(n)); }, 0)
  , [myLeads]);

  const myCommission = useMemo(() =>
    myLeads.reduce((sum, e) => { const n = parseInt(e.num_sites, 10); return sum + (isNaN(n) ? 0 : commission(n)); }, 0)
  , [myLeads]);

  const leaderboard = useMemo(() => {
    const map = new Map<string, { name: string; count: number; pipelineArr: number; commission: number }>();
    for (const e of enquiries) {
      if (!e.sourced_by_user_id || !e.sourced_by_name) continue;
      const n = parseInt(e.num_sites, 10);
      const a = isNaN(n) ? 0 : arr(n);
      const c = isNaN(n) ? 0 : commission(n);
      const existing = map.get(e.sourced_by_user_id);
      if (existing) { existing.count++; existing.pipelineArr += a; existing.commission += c; }
      else map.set(e.sourced_by_user_id, { name: e.sourced_by_name, count: 1, pipelineArr: a, commission: c });
    }
    return Array.from(map.values()).sort((a, b) => b.pipelineArr - a.pipelineArr);
  }, [enquiries]);

  const maxLbArr = leaderboard[0]?.pipelineArr ?? 1;

  const nextSlot = slots
    .filter(s => !s.booked && s.slot_date >= today)
    .sort((a, b) => a.slot_date.localeCompare(b.slot_date) || a.slot_time.localeCompare(b.slot_time))[0];

  const siteCounts: Record<string, number> = { '1': 0, '2–5': 0, '6–9': 0, '10+': 0 };
  enquiries.forEach(e => {
    const n = parseInt(e.num_sites, 10);
    if (isNaN(n)) return;
    if (n === 1) siteCounts['1']++;
    else if (n <= 5) siteCounts['2–5']++;
    else if (n <= 9) siteCounts['6–9']++;
    else siteCounts['10+']++;
  });
  const maxSiteCount = Math.max(1, ...Object.values(siteCounts));

  const sourcedByName = profile?.display_name || user?.email?.split('@')[0] || 'Unknown';
  const landingUrl = typeof window !== 'undefined' ? `${window.location.origin}/demo` : '';

  return (
    <div className="min-h-full">
      <PageHeader
        title="Marketing Dashboard"
        subtitle="Live pipeline, commissions, and demo diary."
        badge="Live"
      />

      <div className="px-4 py-6 sm:p-8 space-y-8">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 -mt-2">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            <Clock size={11} />
            Updated {timeAgo(lastRefreshed.toISOString())}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <CopyLinkButton text={landingUrl} />
            <a
              href="/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
            >
              <ExternalLink size={13} />
              Open landing page
            </a>
            <button
              onClick={() => setShowAddLead(true)}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 transition-colors text-white text-xs font-bold px-4 py-2.5 rounded-xl"
            >
              <Plus size={13} />
              Log a lead
            </button>
            <button onClick={load} className="flex items-center gap-1.5 text-slate-500 hover:text-teal-400 text-xs transition-colors">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <KpiCard icon={Inbox}         label="Total enquiries"  value={enquiries.length}                                      sub="all time"                              tone="teal"    to="/enquiries" />
          <KpiCard icon={TrendingUp}    label="This week"        value={last7}                                                  sub="new enquiries"                         tone={last7 > 0 ? 'teal' : 'neutral'} to="/enquiries" />
          <KpiCard icon={CalendarCheck} label="Demos booked"     value={bookedSlots}                                            sub={`${availableSlots} slots open`}        tone={bookedSlots > 0 ? 'amber' : 'neutral'} to="/diary" />
          <KpiCard icon={PoundSterling} label="Pipeline ARR"     value={totalPipelineArr > 0 ? fmtGbp(totalPipelineArr) : '—'} sub="if all convert"                        tone="teal"    to="/enquiries" />
          <KpiCard icon={Coins}         label="Team commission"  value={totalPipelineCommission > 0 ? fmtGbp(totalPipelineCommission) : '—'} sub="15–20% tiered" tone="gold" />
          <KpiCard
            icon={Star}
            label="My commission"
            value={myCommission > 0 ? fmtGbp(myCommission) : myLeads.length === 0 ? 'Claim leads!' : '—'}
            sub={myLeads.length > 0 ? `${myLeads.length} lead${myLeads.length !== 1 ? 's' : ''}` : 'Log or claim leads'}
            tone="gold"
            to="/enquiries"
          />
        </div>

        {/* Commission info banner */}
        <div className="flex items-start gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl px-5 py-3.5">
          <Coins size={15} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-200/70 text-xs leading-relaxed">
            Commission is calculated on <span className="font-bold text-yellow-300">potential annual contract value</span> (sites &times; £1,200/yr).
            Rate is <span className="font-bold text-yellow-300">15%</span> for accounts under 10 sites and <span className="font-bold text-yellow-300">20%</span> for 10+ sites.
            All figures are pipeline estimates — not confirmed revenue.
          </p>
        </div>

        {/* My Earnings */}
        {myLeads.length > 0 && (
          <div className="bg-slate-900 border border-yellow-500/25 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-yellow-500/15">
              <div className="flex items-center gap-2">
                <Star size={15} className="text-yellow-400" />
                <h2 className="text-white font-bold text-sm">My pipeline — {sourcedByName}</h2>
              </div>
              <div className="text-yellow-300 font-black text-lg">{fmtGbp(myCommission)} potential commission</div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-slate-800 border-b border-slate-800">
              {[
                { label: 'Leads sourced', val: myLeads.length.toString() },
                { label: 'Pipeline ARR', val: fmtGbp(myPipelineArr) },
                { label: 'Potential commission', val: fmtGbp(myCommission) },
              ].map(s => (
                <div key={s.label} className="px-6 py-4 text-center">
                  <div className="text-white font-black text-xl">{s.val}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="divide-y divide-slate-800">
              {myLeads.map(e => {
                const n = parseInt(e.num_sites, 10);
                const isHighTier = !isNaN(n) && n >= COMMISSION_THRESHOLD;
                const leadArr = isNaN(n) ? 0 : arr(n);
                const leadComm = isNaN(n) ? 0 : commission(n);
                return (
                  <div key={e.id} className="px-6 py-3.5 flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black border ${
                      isHighTier ? 'bg-yellow-500/15 border-yellow-500/25 text-yellow-400' : 'bg-teal-500/15 border-teal-500/20 text-teal-400'
                    }`}>
                      {e.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{e.business_name || e.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-slate-500 text-xs">{isNaN(n) ? e.num_sites : `${n} site${n !== 1 ? 's' : ''}`}</span>
                        {isHighTier ? (
                          <span className="text-[10px] font-bold bg-yellow-500/15 text-yellow-300 border border-yellow-500/25 rounded-full px-2 py-px flex items-center gap-1">
                            <Flame size={9} />20% tier
                          </span>
                        ) : !isNaN(n) && (
                          <span className="text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full px-2 py-px">15% tier</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-slate-400 text-xs">{leadArr > 0 ? `${fmtGbp(leadArr)}/yr ARR` : '—'}</div>
                      <div className={`font-bold text-sm ${isHighTier ? 'text-yellow-300' : 'text-teal-400'}`}>
                        {leadComm > 0 ? fmtGbp(leadComm) : '—'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Team leaderboard */}
        {leaderboard.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700">
              <Trophy size={15} className="text-amber-400" />
              <h2 className="text-white font-bold text-sm">Team leaderboard</h2>
              <span className="text-slate-500 text-xs ml-1">ranked by pipeline value</span>
            </div>
            <div className="divide-y divide-slate-700">
              {leaderboard.map((entry, i) => (
                <div key={entry.name} className={`px-6 py-4 flex items-center gap-4 ${i === 0 ? 'bg-amber-500/5' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm border ${
                    i === 0 ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                    : i === 1 ? 'bg-slate-600/60 border-slate-600 text-slate-300'
                    : 'bg-slate-700 border-slate-600 text-slate-500'
                  }`}>
                    {i === 0 ? <Trophy size={14} /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-bold text-sm ${i === 0 ? 'text-amber-200' : 'text-white'}`}>{entry.name}</span>
                      <span className={`text-[10px] font-bold rounded-full px-2 py-px ${
                        i === 0 ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25' : 'bg-slate-700 text-slate-400 border border-slate-600'
                      }`}>
                        {entry.count} lead{entry.count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressBar count={entry.pipelineArr} max={maxLbArr} tone={i === 0 ? 'gold' : 'teal'} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-slate-400 text-xs">{fmtGbp(entry.pipelineArr)}/yr ARR</div>
                    <div className={`font-bold text-sm ${i === 0 ? 'text-yellow-300' : 'text-teal-400'}`}>
                      {fmtGbp(entry.commission)} comm.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Activity feed */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Inbox size={15} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Recent enquiries</h2>
              </div>
              <Link to="/enquiries" className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs transition-colors font-semibold">
                View all <ArrowRight size={11} />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-600 text-sm">
                <RefreshCw size={18} className="animate-spin mx-auto mb-2" />Loading...
              </div>
            ) : enquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-600 text-sm">
                No enquiries yet — share the landing page or log a lead above.
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {enquiries.slice(0, 8).map(e => {
                  const n = parseInt(e.num_sites, 10);
                  const leadArr = isNaN(n) ? 0 : arr(n);
                  const leadComm = isNaN(n) ? 0 : commission(n);
                  const isHighTier = !isNaN(n) && n >= COMMISSION_THRESHOLD;
                  return (
                    <div key={e.id} className="px-6 py-3.5 flex items-center gap-3 hover:bg-slate-700/30 transition-colors">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs border ${
                        isHighTier ? 'bg-yellow-500/15 border-yellow-500/20 text-yellow-400' : 'bg-teal-500/15 border-teal-500/20 text-teal-400'
                      }`}>
                        {e.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white text-sm font-semibold">{e.name}</span>
                          <span className="text-slate-500 text-xs truncate">{e.business_name}</span>
                          {e.num_sites && (
                            <span className={`text-[10px] font-bold rounded-full px-2 py-px border ${
                              isHighTier ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25' : 'bg-teal-500/15 text-teal-300 border-teal-500/20'
                            }`}>
                              {isNaN(n) ? e.num_sites : `${n} site${n !== 1 ? 's' : ''}`}
                            </span>
                          )}
                          {e.sourced_by_name && (
                            <span className="text-[10px] font-bold bg-slate-700 text-slate-400 border border-slate-600 rounded-full px-2 py-px flex items-center gap-1">
                              <UserCheck size={9} />{e.sourced_by_name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          {leadArr > 0 && <span className="text-slate-500 text-[10px]">{fmtGbp(leadArr)}/yr ARR</span>}
                          {leadComm > 0 && <span className={`text-[10px] font-bold ${isHighTier ? 'text-yellow-400' : 'text-teal-500'}`}>{fmtGbp(leadComm)} comm.</span>}
                        </div>
                      </div>
                      <div className="text-slate-600 text-[10px] flex-shrink-0 flex items-center gap-1">
                        <Clock size={9} />{timeAgo(e.created_at)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Next open slot */}
            <div className={`rounded-2xl border p-5 ${nextSlot ? 'bg-teal-500/5 border-teal-500/20' : 'bg-slate-800 border-slate-700'}`}>
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays size={15} className="text-teal-400" />
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
                  <p className="text-slate-500 text-xs leading-snug">Add availability so enquiries can book a demo.</p>
                  <Link to="/diary" className="mt-3 flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors font-semibold">
                    Open diary <ArrowRight size={11} />
                  </Link>
                </>
              )}
            </div>

            {/* Diary status */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CalendarCheck size={15} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Diary status</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs flex items-center gap-1.5"><CheckCircle2 size={11} className="text-teal-400" />Available slots</span>
                  <span className="text-white font-bold text-sm">{availableSlots}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs flex items-center gap-1.5"><CalendarCheck size={11} className="text-amber-400" />Booked demos</span>
                  <span className="text-amber-400 font-bold text-sm">{bookedSlots}</span>
                </div>
                <div className="h-px bg-slate-700" />
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Demo conversion</span>
                  <span className="text-white font-bold text-sm">
                    {enquiries.length === 0 ? '—' : `${Math.round((bookedSlots / enquiries.length) * 100)}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* Top leads by value */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <PoundSterling size={15} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Top leads by value</h2>
              </div>
              {enquiries.length === 0 ? (
                <p className="text-slate-600 text-xs">No data yet.</p>
              ) : (
                <div className="space-y-3">
                  {[...enquiries]
                    .filter(e => !isNaN(parseInt(e.num_sites, 10)))
                    .sort((a, b) => parseInt(b.num_sites, 10) - parseInt(a.num_sites, 10))
                    .slice(0, 6)
                    .map(e => {
                      const n = parseInt(e.num_sites, 10);
                      const leadArr = arr(n);
                      const leadComm = commission(n);
                      const isHigh = n >= COMMISSION_THRESHOLD;
                      return (
                        <div key={e.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-slate-300 text-xs truncate flex-1 mr-2">{e.business_name || e.name}</span>
                            <div className="text-right flex-shrink-0">
                              <span className="text-white text-xs font-bold">{fmtGbp(leadArr)}</span>
                              <span className={`text-[10px] font-bold ml-1.5 ${isHigh ? 'text-yellow-400' : 'text-teal-500'}`}>{fmtGbp(leadComm)}</span>
                            </div>
                          </div>
                          <ProgressBar count={leadArr} max={totalPipelineArr || 1} tone={isHigh ? 'gold' : 'teal'} />
                        </div>
                      );
                    })}
                  <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                    <span className="text-slate-500 text-xs">Total</span>
                    <div className="text-right">
                      <span className="text-teal-400 text-xs font-black">{fmtGbp(totalPipelineArr)}/yr</span>
                      <span className="text-yellow-400 text-xs font-bold ml-2">{fmtGbp(totalPipelineCommission)} comm.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Site size breakdown */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={15} className="text-teal-400" />
            <h2 className="text-white font-bold text-sm">Enquiries by site count</h2>
          </div>
          <p className="text-slate-600 text-xs mb-5 ml-5">Accounts with 10+ sites qualify for the 20% commission tier</p>
          {enquiries.length === 0 ? (
            <p className="text-slate-600 text-sm">No data yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { key: '1',   label: '1 site',    tier: '15%', tone: 'teal' as const },
                { key: '2–5', label: '2–5 sites',  tier: '15%', tone: 'teal' as const },
                { key: '6–9', label: '6–9 sites',  tier: '15%', tone: 'teal' as const },
                { key: '10+', label: '10+ sites',  tier: '20%', tone: 'gold' as const },
              ].map(({ key, label, tier, tone }) => (
                <div key={key} className={`rounded-xl border p-4 ${tone === 'gold' ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-slate-900/60 border-slate-700'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold ${tone === 'gold' ? 'text-yellow-300' : 'text-slate-300'}`}>{label}</span>
                    <span className={`text-[10px] font-bold rounded-full px-2 py-px border ${tone === 'gold' ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25' : 'bg-teal-500/10 text-teal-400 border-teal-500/20'}`}>
                      {tier} comm.
                    </span>
                  </div>
                  <div className={`text-3xl font-black ${tone === 'gold' ? 'text-yellow-300' : 'text-teal-400'}`}>{siteCounts[key] ?? 0}</div>
                  <div className="mt-2">
                    <ProgressBar count={siteCounts[key] ?? 0} max={maxSiteCount} tone={tone} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {showAddLead && user && (
        <AddLeadModal
          userId={user.id}
          sourcedByName={sourcedByName}
          onClose={() => setShowAddLead(false)}
          onSaved={() => { setShowAddLead(false); load(); }}
        />
      )}
    </div>
  );
}
