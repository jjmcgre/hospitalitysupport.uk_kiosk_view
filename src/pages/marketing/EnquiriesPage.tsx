import { useEffect, useState, useMemo } from 'react';
import { Mail, Phone, Building2, Users, MessageSquare, Clock, RefreshCw, Inbox, Trophy, UserCheck, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { computeOrgKey } from '../../lib/commission';
import PageHeader from './components/PageHeader';
import AddLeadModal from './components/AddLeadModal';

const GOOGLE_CAL_LINK = 'https://calendar.app.google/qFyf25dnZVdiX5BW6';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  city: string | null;
  postcode: string | null;
  num_sites: string;
  message: string;
  created_at: string;
  sourced_by_user_id: string | null;
  sourced_by_name: string | null;
  deal_id: string | null;
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}


export default function EnquiriesPage() {
  const { user, profile } = useAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [claiming, setClaiming] = useState<Set<string>>(new Set());
  const [filterMine, setFilterMine] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    const { data, error: err } = await supabase
      .from('demo_bookings')
      .select('*')
      .order('created_at', { ascending: false });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setEnquiries(data ?? []);
  }

  useEffect(() => {
    load();

    const channel = supabase
      .channel('enquiries-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_bookings' }, () => load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deals' }, () => load())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function claimLead(id: string) {
    if (!profile) return;
    const name = profile?.display_name || user.email?.split('@')[0] || 'Unknown';
    setClaiming(prev => new Set(prev).add(id));

    const enquiry = enquiries.find(e => e.id === id);
    const { data: booking } = await supabase
      .from('demo_bookings')
      .update({ sourced_by_user_id: profile.id, sourced_by_name: name })
      .eq('id', id)
      .select('deal_id')
      .single();

    if (booking?.deal_id) {
      await supabase.from('deals').update({
        sourced_by_user_id: profile.id,
        sourced_by_name: name,
        assigned_to_user_id: profile.id,
        assigned_to_name: name,
        updated_at: new Date().toISOString(),
      }).eq('id', booking.deal_id);
      await supabase.from('deal_activity').insert({
        deal_id: booking.deal_id,
        user_id: profile.id,
        user_name: name,
        action_type: 'assigned',
        payload: { from: null, to: name },
      });
    } else if (enquiry) {
      const sites = parseInt(enquiry.num_sites, 10) || 1;
      const orgKey = computeOrgKey(enquiry.business_name, enquiry.postcode ?? '');
      const { data: orgData } = await supabase.from('organisations')
        .select('id').eq('org_key', orgKey).maybeSingle();

      let orgId: string | null = orgData?.id ?? null;

      if (!orgId) {
        const { data: newOrg } = await supabase.from('organisations').insert({
          trading_name: enquiry.business_name,
          city: enquiry.city,
          postcode: enquiry.postcode,
          org_type: 'pub',
          num_sites: sites,
          created_by_user_id: profile.id,
        }).select('id').single();
        orgId = newOrg?.id ?? null;
      }

      if (orgId) {
        const { data: newDeal } = await supabase.from('deals').insert({
          org_id: orgId,
          stage: 'new',
          source: 'inbound',
          confidence: 'warm',
          sourced_by_user_id: profile.id,
          sourced_by_name: name,
          assigned_to_user_id: profile.id,
          assigned_to_name: name,
          commission_status: 'pending',
          num_sites: sites,
          created_by_user_id: profile.id,
        }).select('id').single();

        if (newDeal?.id) {
          await supabase.from('demo_bookings').update({ deal_id: newDeal.id }).eq('id', id);
          await supabase.from('deal_activity').insert({
            deal_id: newDeal.id,
            user_id: profile.id,
            user_name: name,
            action_type: 'assigned',
            payload: { from: null, to: name },
          });
        }
      }
    }
    setClaiming(prev => { const s = new Set(prev); s.delete(id); return s; });
    await load();
  }

  async function releaseLead(id: string) {
    setClaiming(prev => new Set(prev).add(id));
    const { data: booking } = await supabase
      .from('demo_bookings')
      .update({ sourced_by_user_id: null, sourced_by_name: null })
      .eq('id', id)
      .select('deal_id')
      .single();
    if (booking?.deal_id) {
      await supabase.from('deals').update({
        sourced_by_user_id: null,
        sourced_by_name: null,
        assigned_to_user_id: null,
        assigned_to_name: null,
        updated_at: new Date().toISOString(),
      }).eq('id', booking.deal_id);
    }
    setClaiming(prev => { const s = new Set(prev); s.delete(id); return s; });
    await load();
  }

  const leaderboard = useMemo(() => {
    const counts = new Map<string, { name: string; count: number; userId: string }>();
    for (const eq of enquiries) {
      if (eq.sourced_by_name && eq.sourced_by_user_id) {
        const existing = counts.get(eq.sourced_by_user_id);
        if (existing) existing.count++;
        else counts.set(eq.sourced_by_user_id, { name: eq.sourced_by_name, count: 1, userId: eq.sourced_by_user_id });
      }
    }
    return Array.from(counts.values()).sort((a, b) => b.count - a.count);
  }, [enquiries]);

  const myLeadsCount = profile ? enquiries.filter(e => e.sourced_by_user_id === profile.id).length : 0;

  function sitesDisplay(n: string) {
    const count = parseInt(n, 10);
    if (isNaN(count)) return n;
    return `${count} site${count !== 1 ? 's' : ''}`;
  }

  const displayed = filterMine
    ? enquiries.filter(e => e.sourced_by_user_id === profile?.id)
    : enquiries;

  const sourcedByName = profile?.display_name || user?.email?.split('@')[0] || 'Unknown';

  return (
    <div className="min-h-full">
      <PageHeader
        title="Demo Enquiries"
        subtitle="Every request-a-demo submission from the landing page, in real time."
        badge="Live Data"
      />

      <div className="px-4 py-6 sm:p-8">
        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total enquiries', val: enquiries.length },
            { label: 'My leads', val: myLeadsCount, highlight: true },
            { label: 'Multi-site groups', val: enquiries.filter(e => parseInt(e.num_sites, 10) > 1).length },
            { label: 'With message', val: enquiries.filter(e => e.message?.trim()).length },
          ].map(s => (
            <div
              key={s.label}
              className={`border rounded-2xl p-5 text-center ${
                s.highlight
                  ? 'bg-teal-500/10 border-teal-500/30'
                  : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className={`text-3xl font-black mb-1 ${s.highlight ? 'text-teal-300' : 'text-teal-400'}`}>
                {s.val}
              </div>
              <div className="text-slate-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={15} className="text-sky-400" />
              <h3 className="text-white font-bold text-sm">Lead Leaderboard</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {leaderboard.map((entry, i) => (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${
                    i === 0
                      ? 'bg-sky-500/10 border-sky-500/30'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    i === 0 ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {i === 0 ? '🏆' : entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${i === 0 ? 'text-sky-200' : 'text-white'}`}>
                      {entry.name}
                    </p>
                    <p className={`text-[10px] ${i === 0 ? 'text-sky-400' : 'text-slate-500'}`}>
                      {entry.count} lead{entry.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-white font-bold text-base">All submissions</h2>
            <button
              onClick={() => setFilterMine(!filterMine)}
              className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors ${
                filterMine
                  ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                  : 'border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-600'
              }`}
            >
              My leads {myLeadsCount > 0 && `(${myLeadsCount})`}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddLead(true)}
              className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 transition-colors text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              <Plus size={14} />
              Log a lead
            </button>
            <button
              onClick={load}
              className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20 text-slate-500">
            <RefreshCw size={24} className="animate-spin mx-auto mb-3" />
            Loading enquiries...
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-6 text-red-300 text-sm">{error}</div>
        )}

        {!loading && !error && displayed.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            <Inbox size={36} className="mx-auto mb-4 opacity-40" />
            <p className="font-semibold">
              {filterMine ? "You haven't claimed any leads yet" : 'No enquiries yet'}
            </p>
            <p className="text-xs mt-1">
              {filterMine
                ? 'Expand a lead below and click "Claim this lead" to track it against your name.'
                : 'Submissions from the landing page will appear here, or log one manually above.'}
            </p>
          </div>
        )}

        {!loading && displayed.length > 0 && (
          <div className="space-y-3">
            {displayed.map(eq => {
              const isMyLead = eq.sourced_by_user_id === profile?.id;
              const isClaiming = claiming.has(eq.id);

              return (
                <div
                  key={eq.id}
                  className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpanded(expanded === eq.id ? null : eq.id)}
                    className="w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-slate-700/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0 text-teal-400 font-black text-sm">
                      {eq.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white font-bold text-sm">{eq.name}</span>
                        <span className="text-slate-400 text-xs truncate">{eq.business_name}</span>
                        {eq.num_sites && (
                          <span className="text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/25 rounded-full px-2 py-0.5">
                            {sitesDisplay(eq.num_sites)}
                          </span>
                        )}
                        {eq.message?.trim() && (
                          <span className="text-[10px] font-bold bg-sky-500/15 text-sky-300 border border-sky-500/25 rounded-full px-2 py-0.5">
                            Has message
                          </span>
                        )}
                        {eq.sourced_by_name && (
                          <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 flex items-center gap-1 ${
                            isMyLead
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                              : 'bg-slate-700 text-slate-400 border border-slate-600'
                          }`}>
                            <UserCheck size={9} />
                            {isMyLead ? 'My lead' : eq.sourced_by_name}
                          </span>
                        )}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-3">
                        {eq.email && <span className="flex items-center gap-1"><Mail size={10} />{eq.email}</span>}
                        {eq.phone && <span className="flex items-center gap-1"><Phone size={10} />{eq.phone}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 text-right">
                      <div>
                        <div className="text-slate-500 text-[10px] flex items-center gap-1 justify-end">
                          <Clock size={9} />{timeAgo(eq.created_at)}
                        </div>
                        <div className="text-slate-600 text-[10px]">{formatDate(eq.created_at)}</div>
                      </div>
                      <div className={`text-slate-500 transition-transform ${expanded === eq.id ? 'rotate-180' : ''}`}>
                        ▾
                      </div>
                    </div>
                  </button>

                  {expanded === eq.id && (
                    <div className="px-6 pb-5 border-t border-slate-700 pt-4 grid sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {eq.email && (
                          <div className="flex items-start gap-3">
                            <Mail size={14} className="text-teal-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Email</div>
                              <a href={`mailto:${eq.email}`} className="text-teal-400 hover:text-teal-300 text-sm transition-colors">{eq.email}</a>
                            </div>
                          </div>
                        )}
                        {eq.phone && (
                          <div className="flex items-start gap-3">
                            <Phone size={14} className="text-teal-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Phone</div>
                              <a href={`tel:${eq.phone}`} className="text-white text-sm hover:text-teal-300 transition-colors">{eq.phone}</a>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <Building2 size={14} className="text-teal-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Business</div>
                            <div className="text-white text-sm">{eq.business_name}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Users size={14} className="text-teal-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Sites</div>
                            <div className="text-white text-sm">{sitesDisplay(eq.num_sites)}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {eq.message?.trim() ? (
                          <div className="flex items-start gap-3">
                            <MessageSquare size={14} className="text-teal-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Message</div>
                              <div className="text-slate-300 text-sm leading-relaxed bg-slate-900/60 rounded-xl p-3 border border-slate-700">
                                {eq.message}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-600 text-xs italic">No message provided.</div>
                        )}

                        <div className="mt-4 flex gap-2">
                          {eq.email && (
                            <a
                              href={`mailto:${eq.email}?subject=Your ServiceSupport.UK Demo&body=Hi ${eq.name.split(' ')[0]},%0A%0AThanks for your interest in ServiceSupport.UK — I'd love to show you the platform live.%0A%0APlease use the link below to pick a time that works for you:%0A%0A${GOOGLE_CAL_LINK}%0A%0ABest regards,%0AJames`}
                              className="flex-1 text-center bg-teal-500 hover:bg-teal-400 transition-colors text-white text-xs font-bold py-2.5 rounded-xl"
                            >
                              Reply via email
                            </a>
                          )}
                          {eq.phone && (
                            <a
                              href={`tel:${eq.phone}`}
                              className="flex-1 text-center bg-slate-700 hover:bg-slate-600 transition-colors text-white text-xs font-bold py-2.5 rounded-xl"
                            >
                              Call
                            </a>
                          )}
                        </div>

                        {/* Lead attribution */}
                        <div className="mt-3">
                          {eq.sourced_by_name ? (
                            <div className="flex items-center justify-between bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                <UserCheck size={13} className={isMyLead ? 'text-teal-400' : 'text-slate-500'} />
                                <span className="text-slate-400 text-xs">
                                  Sourced by <span className={`font-bold ${isMyLead ? 'text-teal-300' : 'text-white'}`}>{eq.sourced_by_name}</span>
                                </span>
                              </div>
                              {isMyLead && (
                                <button
                                  onClick={() => releaseLead(eq.id)}
                                  disabled={isClaiming}
                                  className="text-[10px] text-slate-500 hover:text-red-400 transition-colors disabled:opacity-50 font-semibold"
                                >
                                  {isClaiming ? '...' : 'Release'}
                                </button>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => claimLead(eq.id)}
                              disabled={isClaiming}
                              className="w-full flex items-center justify-center gap-2 bg-slate-700/60 hover:bg-teal-500/15 hover:border-teal-500/30 border border-slate-600 rounded-xl py-2.5 text-xs font-bold text-slate-400 hover:text-teal-300 transition-all disabled:opacity-50"
                            >
                              <UserCheck size={13} />
                              {isClaiming ? 'Claiming...' : 'Claim this lead'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAddLead && user && (
        <AddLeadModal
          userId={profile!.id}
          sourcedByName={sourcedByName}
          onClose={() => setShowAddLead(false)}
          onSaved={() => { setShowAddLead(false); load(); }}
        />
      )}
    </div>
  );
}
