import { useState, useEffect } from 'react';
import { Loader2, Mail, Eye, MousePointer, AlertTriangle, UserMinus, TrendingUp, RefreshCw } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { campaigns } from './campaignData';

interface Send {
  id: string;
  contact_id: string;
  campaign_id: string;
  email_id: number;
  stage: number;
  subject: string;
  sent_at: string;
  opened_at: string | null;
  clicked_at: string | null;
  bounced_at: string | null;
  open_count: number;
  click_count: number;
  email_contacts: {
    name: string;
    email: string;
    business_name: string;
    status: string;
  } | null;
}

function StatCard({ icon: Icon, label, value, sub, colour }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; colour: string;
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colour}`}>
        <Icon size={16} />
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="text-slate-400 text-sm font-medium mt-0.5">{label}</p>
      {sub && <p className="text-slate-600 text-xs mt-0.5">{sub}</p>}
    </div>
  );
}

function pct(num: number, den: number) {
  if (den === 0) return '—';
  return `${Math.round((num / den) * 100)}%`;
}

export default function AnalyticsTab() {
  const [sends, setSends] = useState<Send[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCampaign, setFilterCampaign] = useState('all');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('email_sends')
      .select('*, email_contacts(name, email, business_name, status)')
      .order('sent_at', { ascending: false });
    setSends((data as Send[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();

    const channel = supabase
      .channel('email-analytics-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'email_sends' }, () => load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'email_contacts' }, () => load())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filtered = filterCampaign === 'all' ? sends : sends.filter(s => s.campaign_id === filterCampaign);
  const total = filtered.length;
  const opened = filtered.filter(s => s.opened_at).length;
  const clicked = filtered.filter(s => s.clicked_at).length;
  const bounced = filtered.filter(s => s.bounced_at).length;
  const multiOpen = filtered.filter(s => s.open_count > 1).length;

  const campaignLabel = (id: string) => campaigns.find(c => c.id === id)?.label?.replace('Campaign ', 'C') ?? id;

  function formatDate(d: string | null) {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-white font-bold text-base">Analytics</h2>
          <p className="text-slate-500 text-xs mt-0.5">{total} email{total !== 1 ? 's' : ''} sent</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterCampaign}
            onChange={e => setFilterCampaign(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-300 text-sm focus:outline-none focus:border-teal-500"
          >
            <option value="all">All campaigns</option>
            {campaigns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <button
            onClick={load}
            className="p-2 rounded-xl text-slate-500 hover:text-teal-400 hover:bg-teal-500/10 border border-slate-700 transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Mail} label="Total sent" value={total} colour="bg-blue-500/15 text-blue-400" />
        <StatCard icon={Eye} label="Opened" value={opened} sub={pct(opened, total)} colour="bg-teal-500/15 text-teal-400" />
        <StatCard icon={MousePointer} label="Clicked" value={clicked} sub={pct(clicked, total)} colour="bg-sky-500/15 text-sky-400" />
        <StatCard icon={TrendingUp} label="Multi-open" value={multiOpen} sub="opened 2+ times" colour="bg-sky-500/15 text-sky-400" />
      </div>

      {bounced > 0 && (
        <div className="flex items-center gap-3 bg-rose-500/10 border border-rose-500/25 rounded-xl px-4 py-3">
          <AlertTriangle size={15} className="text-rose-400 flex-shrink-0" />
          <p className="text-rose-300 text-sm">{bounced} bounce{bounced !== 1 ? 's' : ''} — contacts marked accordingly.</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={20} className="animate-spin text-teal-400" /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <TrendingUp size={32} className="text-slate-700 mb-3" />
          <p className="text-slate-400 font-medium">No sends yet</p>
          <p className="text-slate-600 text-sm mt-1">Send your first email from the Contacts tab.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(s => (
            <div key={s.id} className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-white font-semibold text-sm truncate">{s.subject}</p>
                  </div>
                  <p className="text-slate-400 text-xs">{s.email_contacts?.name ?? '—'} · {s.email_contacts?.email ?? '—'}</p>
                  {s.email_contacts?.business_name && (
                    <p className="text-slate-600 text-xs">{s.email_contacts.business_name}</p>
                  )}
                  <p className="text-slate-600 text-[10px] mt-1">{campaignLabel(s.campaign_id)} · Stage {s.stage} · Sent {formatDate(s.sent_at)}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
                  <div className="flex items-center gap-1.5" title="Opens">
                    <Eye size={13} className={s.opened_at ? 'text-teal-400' : 'text-slate-600'} />
                    <span className={`text-xs font-semibold ${s.opened_at ? 'text-teal-400' : 'text-slate-600'}`}>
                      {s.open_count > 0 ? `${s.open_count}×` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5" title="Clicks">
                    <MousePointer size={13} className={s.clicked_at ? 'text-sky-400' : 'text-slate-600'} />
                    <span className={`text-xs font-semibold ${s.clicked_at ? 'text-sky-400' : 'text-slate-600'}`}>
                      {s.click_count > 0 ? `${s.click_count}×` : '—'}
                    </span>
                  </div>
                  {s.bounced_at && (
                    <div className="flex items-center gap-1.5" title="Bounced">
                      <AlertTriangle size={13} className="text-rose-400" />
                      <span className="text-xs font-semibold text-rose-400">Bounced</span>
                    </div>
                  )}
                  {s.email_contacts?.status === 'unsubscribed' && (
                    <div className="flex items-center gap-1.5">
                      <UserMinus size={13} className="text-sky-400" />
                      <span className="text-xs font-semibold text-sky-400">Unsub</span>
                    </div>
                  )}
                </div>
              </div>

              {s.opened_at && (
                <div className="mt-2 pt-2 border-t border-slate-700/50 flex gap-4 flex-wrap">
                  {s.opened_at && <p className="text-slate-600 text-[10px]">First open: {formatDate(s.opened_at)}</p>}
                  {s.clicked_at && <p className="text-slate-600 text-[10px]">First click: {formatDate(s.clicked_at)}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
