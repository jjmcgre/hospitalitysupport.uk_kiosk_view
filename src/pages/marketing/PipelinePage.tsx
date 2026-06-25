import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, RefreshCw, Search, MapPin, UserCheck, AlertCircle,
  ChevronRight, Flame, Thermometer, Snowflake, AlertTriangle, GitBranch,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import {
  STAGE_LABELS, STAGE_ORDER, Stage, calcARR, calcL1Commission,
  fmtGbp, ORG_TYPE_LABELS, CommissionStatus,
} from '../../lib/commission';
import PageHeader from './components/PageHeader';
import LogDealModal from './components/LogDealModal';

interface DealRow {
  id: string;
  stage: Stage;
  source: string;
  confidence: string;
  sourced_by_user_id: string | null;
  sourced_by_name: string | null;
  assigned_to_name: string | null;
  commission_status: CommissionStatus;
  next_action: string | null;
  next_action_date: string | null;
  num_sites: number;
  arr_override: number | null;
  created_at: string;
  organisations: {
    trading_name: string;
    city: string | null;
    postcode: string | null;
    org_type: string;
  } | null;
}

type FilterTab = 'all' | 'mine' | 'overdue' | 'flagged' | 'won' | 'lost';

const STAGE_COLOURS: Record<Stage, string> = {
  new: 'bg-slate-700 text-slate-300 border-slate-600',
  contacted: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  demo_booked: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  demo_done: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  proposal_sent: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  won: 'bg-green-500/15 text-green-300 border-green-500/30',
  lost: 'bg-red-500/15 text-red-400 border-red-500/25',
};

const CONFIDENCE_ICONS: Record<string, React.ElementType> = {
  hot: Flame,
  warm: Thermometer,
  cold: Snowflake,
};

const CONFIDENCE_COLOURS: Record<string, string> = {
  hot: 'text-red-400',
  warm: 'text-sky-400',
  cold: 'text-blue-400',
};

function isOverdue(date: string | null): boolean {
  if (!date) return false;
  return date < new Date().toISOString().slice(0, 10);
}

function formatNextDate(date: string | null): string {
  if (!date) return '';
  const d = new Date(date + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  return `in ${diff}d`;
}

export default function PipelinePage() {
  const { user, profile } = useAuth();
  const [deals, setDeals] = useState<DealRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterTab>('all');
  const [search, setSearch] = useState('');
  const [showLog, setShowLog] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('deals')
      .select('id,stage,source,confidence,sourced_by_user_id,sourced_by_name,assigned_to_name,commission_status,next_action,next_action_date,num_sites,arr_override,created_at,organisations(trading_name,city,postcode,org_type)')
      .order('next_action_date', { ascending: true, nullsFirst: false });
    setDeals((data ?? []) as DealRow[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    let list = deals;
    if (filter === 'mine') list = list.filter(d => d.sourced_by_user_id === user?.id);
    else if (filter === 'overdue') list = list.filter(d => d.next_action_date && d.next_action_date < today && d.stage !== 'won' && d.stage !== 'lost');
    else if (filter === 'flagged') list = list.filter(d => d.commission_status === 'flagged');
    else if (filter === 'won') list = list.filter(d => d.stage === 'won');
    else if (filter === 'lost') list = list.filter(d => d.stage === 'lost');
    else list = list.filter(d => d.stage !== 'won' && d.stage !== 'lost');

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(d =>
        d.organisations?.trading_name.toLowerCase().includes(q) ||
        d.organisations?.city?.toLowerCase().includes(q) ||
        d.organisations?.postcode?.toLowerCase().includes(q) ||
        d.sourced_by_name?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [deals, filter, search, user, today]);

  const counts = useMemo(() => ({
    all: deals.filter(d => d.stage !== 'won' && d.stage !== 'lost').length,
    mine: deals.filter(d => d.sourced_by_user_id === user?.id && d.stage !== 'won' && d.stage !== 'lost').length,
    overdue: deals.filter(d => d.next_action_date && d.next_action_date < today && d.stage !== 'won' && d.stage !== 'lost').length,
    flagged: deals.filter(d => d.commission_status === 'flagged').length,
    won: deals.filter(d => d.stage === 'won').length,
    lost: deals.filter(d => d.stage === 'lost').length,
  }), [deals, user, today]);

  const userName = profile?.display_name || user?.email?.split('@')[0] || 'You';

  const tabs: { key: FilterTab; label: string; count: number; danger?: boolean }[] = [
    { key: 'all', label: 'Active', count: counts.all },
    { key: 'mine', label: 'Mine', count: counts.mine },
    { key: 'overdue', label: 'Overdue', count: counts.overdue, danger: counts.overdue > 0 },
    { key: 'flagged', label: 'Flagged', count: counts.flagged, danger: counts.flagged > 0 },
    { key: 'won', label: 'Won', count: counts.won },
    { key: 'lost', label: 'Lost', count: counts.lost },
  ];

  return (
    <div className="min-h-full">
      <PageHeader title="Pipeline" subtitle="Every active deal in one place." badge="Live" />

      <div className="px-4 py-6 sm:px-8 sm:py-6">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search deals..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors"
            />
          </div>
          <button onClick={load} className="text-slate-500 hover:text-teal-400 transition-colors flex items-center gap-1.5 text-xs">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={() => setShowLog(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 transition-colors text-white text-sm font-bold px-4 py-2.5 rounded-xl ml-auto"
          >
            <Plus size={14} />
            Log a lead
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                filter === tab.key
                  ? tab.danger
                    ? 'bg-red-500/15 border-red-500/30 text-red-300'
                    : 'bg-teal-500/15 border-teal-500/30 text-teal-300'
                  : 'border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600'
              }`}
            >
              {tab.danger && tab.count > 0 && <AlertTriangle size={10} />}
              {tab.label}
              {tab.count > 0 && (
                <span className={`rounded-full px-1.5 py-px text-[10px] font-black ${
                  filter === tab.key ? 'bg-white/10' : 'bg-slate-800'
                }`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="py-20 text-center text-slate-600 text-sm">
            <RefreshCw size={20} className="animate-spin mx-auto mb-3" />
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-600">
            <GitBranch size={32} className="mx-auto mb-4 opacity-40" />
            <p className="font-semibold text-sm">
              {filter === 'all' ? 'No active deals yet' : `Nothing in this filter`}
            </p>
            {filter === 'all' && (
              <p className="text-xs mt-1 text-slate-700">Log a lead to get started.</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(deal => {
              const org = deal.organisations;
              const overdue = isOverdue(deal.next_action_date) && deal.stage !== 'won' && deal.stage !== 'lost';
              const ConfIcon = CONFIDENCE_ICONS[deal.confidence] ?? Thermometer;
              const arr = calcARR(deal.num_sites, deal.arr_override);
              const comm = calcL1Commission(deal.num_sites, deal.arr_override);
              const isMyDeal = deal.sourced_by_user_id === user?.id;
              const dateLabel = formatNextDate(deal.next_action_date);

              return (
                <Link
                  key={deal.id}
                  to={`/deals/${deal.id}`}
                  className="block bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl px-5 py-4 transition-all hover:bg-slate-800/60 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-white font-bold text-sm group-hover:text-teal-300 transition-colors">
                          {org?.trading_name ?? '—'}
                        </span>
                        {org?.city && (
                          <span className="text-slate-500 text-xs flex items-center gap-1">
                            <MapPin size={9} />
                            {org.city}{org.postcode ? ` · ${org.postcode}` : ''}
                          </span>
                        )}
                        <span className="text-slate-600 text-[10px]">
                          {ORG_TYPE_LABELS[org?.org_type ?? ''] ?? org?.org_type}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-bold rounded-full px-2 py-px border ${STAGE_COLOURS[deal.stage]}`}>
                          {STAGE_LABELS[deal.stage]}
                        </span>

                        <span className="text-[10px] text-slate-500">
                          {deal.num_sites} site{deal.num_sites !== 1 ? 's' : ''}
                        </span>

                        <span className="text-[10px] text-teal-500 font-bold">{fmtGbp(arr)}/yr</span>
                        {deal.commission_status !== 'n/a' && !(isMyDeal && profile?.is_founder) && (
                          <span className="text-[10px] text-sky-400 font-bold">{fmtGbp(comm)} comm.</span>
                        )}

                        {deal.sourced_by_name && (
                          <span className={`text-[10px] font-bold rounded-full px-2 py-px flex items-center gap-1 ${
                            isMyDeal ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'
                          }`}>
                            <UserCheck size={9} />
                            {isMyDeal ? 'Mine' : deal.sourced_by_name}
                          </span>
                        )}

                        {deal.commission_status === 'flagged' && (
                          <span className="text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/25 rounded-full px-2 py-px flex items-center gap-1">
                            <AlertTriangle size={9} />
                            Commission flagged
                          </span>
                        )}
                        {deal.commission_status === 'approved' && (
                          <span className="text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/25 rounded-full px-2 py-px">
                            Approved
                          </span>
                        )}
                      </div>

                      {deal.next_action && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`text-xs ${overdue ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                            {overdue && <AlertCircle size={11} className="inline mr-1" />}
                            {deal.next_action}
                          </span>
                          {dateLabel && (
                            <span className={`text-[10px] font-bold rounded-full px-2 py-px ${
                              overdue
                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                : 'bg-slate-800 text-slate-500 border border-slate-700'
                            }`}>{dateLabel}</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <ConfIcon size={14} className={CONFIDENCE_COLOURS[deal.confidence] ?? 'text-slate-500'} />
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {showLog && user && (
        <LogDealModal
          userId={user.id}
          userName={userName}
          onClose={() => setShowLog(false)}
        />
      )}
    </div>
  );
}

