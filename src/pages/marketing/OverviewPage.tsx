import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox, CalendarDays, TrendingUp, Users, Clock,
  Building2, ArrowRight, RefreshCw, PoundSterling,
  AlertCircle, CheckCircle2, CalendarCheck,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import PageHeader from './components/PageHeader';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  business_name: string;
  num_sites: string;
  created_at: string;
}

interface Slot {
  id: string;
  slot_date: string;
  slot_time: string;
  booked: boolean;
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

function estimateArr(enqs: Enquiry[]) {
  return enqs.reduce((acc, e) => {
    const sites = parseInt(e.num_sites, 10);
    return acc + (isNaN(sites) ? 0 : sites * 1200);
  }, 0);
}

function Stat({
  label, value, sub, icon: Icon, accent = false, warn = false, to,
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; accent?: boolean; warn?: boolean; to?: string;
}) {
  const cls = `rounded-2xl border p-5 flex flex-col gap-2 transition-all ${
    to ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]' : ''
  } ${
    accent ? 'bg-teal-500/8 border-teal-500/25 hover:border-teal-400/40' :
    warn ? 'bg-amber-500/8 border-amber-500/25 hover:border-amber-400/40' :
    'bg-slate-800 border-slate-700 hover:border-slate-500'
  }`;
  const inner = (
    <>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
        accent ? 'bg-teal-500/20 border border-teal-500/30' :
        warn ? 'bg-amber-500/20 border border-amber-500/30' :
        'bg-slate-700 border border-slate-600'
      }`}>
        <Icon size={16} className={accent ? 'text-teal-400' : warn ? 'text-amber-400' : 'text-slate-400'} />
      </div>
      <div>
        <div className={`text-3xl font-black leading-none ${
          accent ? 'text-teal-400' : warn ? 'text-amber-400' : 'text-white'
        }`}>{value}</div>
        <div className="text-slate-400 text-xs mt-1 font-medium">{label}</div>
        {sub && <div className="text-slate-600 text-[10px] mt-0.5">{sub}</div>}
      </div>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <div className={cls}>{inner}</div>;
}

function ActivityBar({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = max === 0 ? 0 : Math.round((count / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="text-slate-400 text-xs w-20 flex-shrink-0">{label}</div>
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-white text-xs font-bold w-5 text-right">{count}</div>
    </div>
  );
}

export default function OverviewPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  async function load() {
    setLoading(true);
    const today = isoDate(new Date());
    const [enqRes, slotRes] = await Promise.all([
      supabase.from('demo_bookings').select('id,name,email,business_name,num_sites,created_at').order('created_at', { ascending: false }),
      supabase.from('demo_availability').select('id,slot_date,slot_time,booked').gte('slot_date', today),
    ]);
    setEnquiries(enqRes.data ?? []);
    setSlots(slotRes.data ?? []);
    setLastRefreshed(new Date());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const today = isoDate(new Date());
  const sevenDaysAgo = isoDate(new Date(Date.now() - 7 * 86400000));
  const thirtyDaysAgo = isoDate(new Date(Date.now() - 30 * 86400000));

  const last7 = enquiries.filter(e => e.created_at.slice(0, 10) >= sevenDaysAgo).length;
  const last30 = enquiries.filter(e => e.created_at.slice(0, 10) >= thirtyDaysAgo).length;
  const bookedSlots = slots.filter(s => s.booked).length;
  const availableSlots = slots.filter(s => !s.booked).length;
  const potentialArr = estimateArr(enquiries);
  const totalSites = enquiries.reduce((acc, e) => {
    const n = parseInt(e.num_sites, 10);
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  const siteCounts: Record<string, number> = { '1': 0, '2-5': 0, '6-15': 0, '16+': 0 };
  enquiries.forEach(e => {
    const n = parseInt(e.num_sites, 10);
    if (isNaN(n)) return;
    if (n === 1) siteCounts['1']++;
    else if (n <= 5) siteCounts['2-5']++;
    else if (n <= 15) siteCounts['6-15']++;
    else siteCounts['16+']++;
  });
  const maxSiteCount = Math.max(1, ...Object.values(siteCounts));

  const nextSlot = slots
    .filter(s => !s.booked && s.slot_date >= today)
    .sort((a, b) => a.slot_date.localeCompare(b.slot_date) || a.slot_time.localeCompare(b.slot_time))[0];

  const recentEnquiries = enquiries.slice(0, 5);

  const pipelineColour = potentialArr >= 1000 ? 'accent' : potentialArr > 0 ? '' : '';

  return (
    <div className="min-h-full">
      <PageHeader
        title="Marketing Dashboard"
        subtitle="Live pipeline, enquiries, and demo diary at a glance."
        badge="Live"
      />

      <div className="px-4 py-6 sm:p-8 space-y-8">

        {/* Refresh row */}
        <div className="flex items-center justify-between -mt-2">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            <Clock size={11} />
            Refreshed {timeAgo(lastRefreshed.toISOString())}
          </p>
          <button
            onClick={load}
            className="flex items-center gap-1.5 text-slate-500 hover:text-teal-400 text-xs transition-colors"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={Inbox} label="Total enquiries" value={enquiries.length} sub="all time" accent to="/enquiries" />
          <Stat icon={TrendingUp} label="Last 7 days" value={last7} sub={`${last30} in 30 days`} accent={last7 > 0} to="/enquiries" />
          <Stat icon={CalendarCheck} label="Demos booked" value={bookedSlots} sub={`${availableSlots} slots open`} warn={bookedSlots > 0} to="/diary" />
          <Stat
            icon={PoundSterling}
            label="Pipeline ARR"
            value={potentialArr > 0 ? `£${potentialArr.toLocaleString()}` : '—'}
            sub="if all enquiries convert"
            accent={potentialArr > 0}
            to="/enquiries"
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent enquiries */}
          <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Inbox size={15} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Recent enquiries</h2>
              </div>
              <Link
                to="/enquiries"
                className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs transition-colors font-semibold"
              >
                View all <ArrowRight size={11} />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-600 text-sm">
                <RefreshCw size={18} className="animate-spin mx-auto mb-2" />Loading...
              </div>
            ) : recentEnquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-600 text-sm">
                No enquiries yet — share the landing page to get started.
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {recentEnquiries.map(eq => (
                  <div key={eq.id} className="px-6 py-3.5 flex items-center gap-3 hover:bg-slate-700/30 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 font-black text-xs">
                      {eq.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white text-sm font-semibold">{eq.name}</span>
                        <span className="text-slate-500 text-xs truncate">{eq.business_name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-slate-500 text-xs">{eq.email}</span>
                        {eq.num_sites && (
                          <span className="text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/20 rounded-full px-2 py-px">
                            {eq.num_sites} site{eq.num_sites !== '1' ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-slate-600 text-[10px] flex-shrink-0 flex items-center gap-1">
                      <Clock size={9} />{timeAgo(eq.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Next open slot */}
            <div className={`rounded-2xl border p-5 ${
              nextSlot
                ? 'bg-teal-500/5 border-teal-500/20'
                : 'bg-slate-800 border-slate-700'
            }`}>
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
                  <Link
                    to="/diary"
                    className="mt-3 flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors font-semibold"
                  >
                    Manage diary <ArrowRight size={11} />
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-1">
                    <AlertCircle size={14} />No open slots
                  </div>
                  <p className="text-slate-500 text-xs leading-snug">Add availability in the diary so enquiries can book a time.</p>
                  <Link
                    to="/diary"
                    className="mt-3 flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 transition-colors font-semibold"
                  >
                    Open diary <ArrowRight size={11} />
                  </Link>
                </>
              )}
            </div>

            {/* Diary summary */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CalendarCheck size={15} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Diary status</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs flex items-center gap-1.5">
                    <CheckCircle2 size={11} className="text-teal-400" />Available slots
                  </span>
                  <span className="text-white font-bold text-sm">{availableSlots}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs flex items-center gap-1.5">
                    <CalendarCheck size={11} className="text-amber-400" />Booked demos
                  </span>
                  <span className="text-amber-400 font-bold text-sm">{bookedSlots}</span>
                </div>
                <div className="h-px bg-slate-700" />
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Conversion rate</span>
                  <span className="text-white font-bold text-sm">
                    {enquiries.length === 0 ? '—' : `${Math.round((bookedSlots / enquiries.length) * 100)}%`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Site-size breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Building2 size={15} className="text-teal-400" />
              <h2 className="text-white font-bold text-sm">Enquiries by site size</h2>
            </div>
            {enquiries.length === 0 ? (
              <p className="text-slate-600 text-sm">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {[
                  { key: '1', label: '1 site' },
                  { key: '2-5', label: '2–5 sites' },
                  { key: '6-15', label: '6–15 sites' },
                  { key: '16+', label: '16+ sites' },
                ].map(({ key, label }) => (
                  <ActivityBar key={key} label={label} count={siteCounts[key] ?? 0} max={maxSiteCount} />
                ))}
              </div>
            )}
          </div>

          {/* Pipeline ARR breakdown */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <PoundSterling size={15} className="text-teal-400" />
              <h2 className="text-white font-bold text-sm">Pipeline ARR breakdown</h2>
            </div>
            {enquiries.length === 0 ? (
              <p className="text-slate-600 text-sm">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 5).map(e => {
                  const sites = parseInt(e.num_sites, 10);
                  const arr = isNaN(sites) ? 0 : sites * 1200;
                  return (
                    <div key={e.id} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 mr-3">
                        <span className="text-slate-300 text-xs truncate block">{e.business_name || e.name}</span>
                        <span className="text-slate-500 text-xs">{isNaN(sites) ? '?' : sites} site{sites !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex-1 mx-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all duration-700"
                          style={{ width: potentialArr === 0 ? '0%' : `${(arr / potentialArr) * 100}%` }}
                        />
                      </div>
                      <span className="text-white text-xs font-bold w-20 text-right">
                        {arr > 0 ? `£${arr.toLocaleString()}/yr` : '—'}
                      </span>
                    </div>
                  );
                })}
                <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-xs font-bold">Total pipeline ARR</span>
                    <span className="text-slate-500 text-xs block">{totalSites} sites × £1,200</span>
                  </div>
                  <span className="text-teal-400 text-sm font-black">
                    {potentialArr > 0 ? `£${potentialArr.toLocaleString()}/yr` : '—'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Campaign channels quick-nav */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Users size={15} className="text-teal-400" />
            <h2 className="text-white font-bold text-sm">Campaign channels</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { to: '/instagram', label: 'Instagram' },
              { to: '/tiktok', label: 'TikTok' },
              { to: '/facebook', label: 'Facebook' },
              { to: '/linkedin', label: 'LinkedIn' },
              { to: '/email', label: 'Email' },
              { to: '/sales', label: 'Sales' },
            ].map(ch => (
              <Link
                key={ch.to}
                to={ch.to}
                className="bg-slate-900/60 border border-slate-700 hover:border-teal-500/40 hover:bg-teal-500/5 rounded-xl p-3 text-center text-xs font-semibold text-slate-400 hover:text-teal-300 transition-all duration-200"
              >
                {ch.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
