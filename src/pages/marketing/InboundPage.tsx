import { useEffect, useState } from 'react';
import { Inbox, RefreshCw, Mail, Phone, MessageSquare, Building2, Users, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import PageHeader from './components/PageHeader';
import { ORG_TYPE_LABELS } from '../../lib/commission';
import { useNavigate } from 'react-router-dom';

interface InboundLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  city: string | null;
  postcode: string | null;
  num_sites: string;
  message: string | null;
  created_at: string;
}

interface ConvertModal {
  lead: InboundLead;
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const inputCls = 'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors';
const labelCls = 'text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2';

export default function InboundPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<InboundLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState<ConvertModal | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Convert form state
  const [orgType, setOrgType] = useState('pub');
  const [orgCity, setOrgCity] = useState('');
  const [orgPostcode, setOrgPostcode] = useState('');
  const [orgNotes, setOrgNotes] = useState('');
  const [assignToId, setAssignToId] = useState('');
  const [assignToName, setAssignToName] = useState('');
  const [teamMembers, setTeamMembers] = useState<{ id: string; display_name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [convertError, setConvertError] = useState('');

  useEffect(() => {
    if (!user) return;
    supabase.from('user_profiles').select('id, display_name').eq('is_active', true)
      .then(({ data }) => setTeamMembers(data ?? []));
  }, [user]);

  async function load() {
    setLoading(true);
    const { data: dealLinks } = await supabase.from('deals').select('inbound_lead_id').not('inbound_lead_id', 'is', null);
    const convertedIds = new Set((dealLinks ?? []).map(d => d.inbound_lead_id));
    const { data: bookings } = await supabase.from('demo_bookings').select('*').order('created_at', { ascending: false });
    setLeads((bookings ?? []).filter(b => !convertedIds.has(b.id)) as InboundLead[]);
    setLoading(false);
  }

  useEffect(() => {
    load();

    const channel = supabase
      .channel('inbound-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'demo_bookings' }, () => load())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'deals' }, () => load())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  function openConvert(lead: InboundLead) {
    setConverting({ lead });
    setOrgCity(lead.city ?? '');
    setOrgPostcode(lead.postcode ?? '');
    setOrgType('pub');
    setOrgNotes('');
    setAssignToId(profile?.id ?? '');
    setAssignToName(profile?.display_name ?? '');
    setConvertError('');
  }

  async function handleConvert() {
    if (!converting || !profile) return;
    const { lead } = converting;
    setSaving(true);
    setConvertError('');

    try {
      const sites = parseInt(lead.num_sites, 10) || 1;

      const { data: org, error: orgErr } = await supabase.from('organisations').insert({
        trading_name: lead.business_name.trim(),
        city: orgCity.trim() || null,
        postcode: orgPostcode.trim() || null,
        org_type: orgType,
        num_sites: sites,
        notes: orgNotes.trim() || null,
        created_by_user_id: profile.id,
      }).select('id').single();
      if (orgErr) throw new Error(orgErr.message);

      const { data: contact, error: contactErr } = await supabase.from('contacts').insert({
        org_id: org.id,
        full_name: lead.name.trim(),
        email: lead.email?.trim() || null,
        phone: lead.phone?.trim() || null,
        is_primary: true,
        created_by_user_id: profile.id,
      }).select('id').single();
      if (contactErr) throw new Error(contactErr.message);

      const assignedId = assignToId || null;
      const assignedName = teamMembers.find(m => m.id === assignToId)?.display_name ?? null;

      const { data: newDeal, error: dealErr } = await supabase.from('deals').insert({
        org_id: org.id,
        primary_contact_id: contact.id,
        stage: 'new',
        source: 'inbound',
        confidence: 'warm',
        sourced_by_user_id: assignedId,
        sourced_by_name: assignedName,
        assigned_to_user_id: assignedId,
        assigned_to_name: assignedName,
        commission_status: assignedId ? 'pending' : 'pending',
        next_action: 'Make first contact',
        next_action_date: new Date().toISOString().slice(0, 10),
        num_sites: sites,
        inbound_lead_id: lead.id,
        created_by_user_id: profile.id,
      }).select('id').single();
      if (dealErr) throw new Error(dealErr.message);

      await supabase.from('deal_activity').insert({
        deal_id: newDeal.id,
        user_id: profile.id,
        user_name: profile?.display_name ?? 'Admin',
        action_type: 'created',
        payload: {
          source: 'inbound',
          org_name: lead.business_name,
          message: lead.message,
          assigned_to: assignedName,
        },
      });

      setConverting(null);
      navigate(`/deals/${newDeal.id}`);
    } catch (err: unknown) {
      setConvertError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  const isAdmin = profile?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={32} className="mx-auto mb-4 text-slate-600" />
          <p className="text-slate-500 text-sm font-semibold">Admin access required</p>
          <p className="text-slate-700 text-xs mt-1">Inbound leads are managed by admins only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <PageHeader title="Inbound Leads" subtitle="Raw submissions from the landing page, waiting to be converted." badge="Admin" />

      <div className="px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-slate-500 text-sm">{leads.length} unconverted lead{leads.length !== 1 ? 's' : ''}</p>
          <button onClick={load} className="flex items-center gap-1.5 text-slate-500 hover:text-teal-400 text-xs transition-colors">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-600">
            <RefreshCw size={20} className="animate-spin mx-auto mb-3" />
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center text-slate-600">
            <Inbox size={32} className="mx-auto mb-4 opacity-40" />
            <p className="font-semibold text-sm">All caught up</p>
            <p className="text-xs mt-1 text-slate-700">No unconverted inbound leads.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leads.map(lead => (
              <div key={lead.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 font-black text-sm">
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-white font-bold text-sm">{lead.name}</span>
                      <span className="text-slate-400 text-xs">{lead.business_name}</span>
                      {lead.num_sites && parseInt(lead.num_sites) > 1 && (
                        <span className="text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full px-2 py-px">
                          {lead.num_sites} sites
                        </span>
                      )}
                      {lead.message?.trim() && (
                        <span className="text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full px-2 py-px flex items-center gap-1">
                          <MessageSquare size={8} />Has message
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-xs">
                      {lead.email && <span className="flex items-center gap-1"><Mail size={9} />{lead.email}</span>}
                      {lead.phone && <span className="flex items-center gap-1"><Phone size={9} />{lead.phone}</span>}
                    </div>
                  </div>
                  <div className="text-slate-600 text-[10px] flex-shrink-0 flex items-center gap-1">
                    <Clock size={9} />{timeAgo(lead.created_at)}
                  </div>
                  <ChevronRight size={14} className={`text-slate-600 transition-transform ${expanded === lead.id ? 'rotate-90' : ''}`} />
                </button>

                {expanded === lead.id && (
                  <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2 text-sm">
                        {lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail size={13} className="text-slate-500 flex-shrink-0" />
                            <a href={`mailto:${lead.email}`} className="text-teal-400 hover:text-teal-300">{lead.email}</a>
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={13} className="text-slate-500 flex-shrink-0" />
                            <a href={`tel:${lead.phone}`} className="text-slate-300 hover:text-white">{lead.phone}</a>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Building2 size={13} className="text-slate-500 flex-shrink-0" />
                          <span className="text-slate-300">{lead.business_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={13} className="text-slate-500 flex-shrink-0" />
                          <span className="text-slate-300">{lead.num_sites} site{parseInt(lead.num_sites) !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      {lead.message?.trim() && (
                        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
                          <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Message</p>
                          <p className="text-slate-300 text-xs leading-relaxed">{lead.message}</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => openConvert(lead)}
                      className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 transition-colors text-white text-sm font-bold px-5 py-2.5 rounded-xl"
                    >
                      Convert to deal
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Convert modal */}
      {converting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-700">
              <h2 className="text-white font-bold text-base">Convert to deal</h2>
              <p className="text-slate-500 text-xs mt-0.5">{converting.lead.business_name} — {converting.lead.name}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Business type</label>
                  <select value={orgType} onChange={e => setOrgType(e.target.value)} className={inputCls}>
                    {Object.entries(ORG_TYPE_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Assign to</label>
                  <select value={assignToId} onChange={e => {
                    setAssignToId(e.target.value);
                    setAssignToName(teamMembers.find(m => m.id === e.target.value)?.display_name ?? '');
                  }} className={inputCls}>
                    <option value="">Unassigned</option>
                    {teamMembers.map(m => (
                      <option key={m.id} value={m.id}>{m.display_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>City / Town</label>
                  <input type="text" value={orgCity} onChange={e => setOrgCity(e.target.value)} placeholder="Bradford" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Postcode</label>
                  <input type="text" value={orgPostcode} onChange={e => setOrgPostcode(e.target.value)} placeholder="BD1 1AA" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Notes</label>
                <textarea rows={3} value={orgNotes} onChange={e => setOrgNotes(e.target.value)}
                  placeholder="Anything worth noting about this lead..."
                  className={`${inputCls} resize-none`} />
              </div>
              {convertError && (
                <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">{convertError}</div>
              )}
              <div className="flex gap-3">
                <button onClick={handleConvert} disabled={saving}
                  className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  {saving ? 'Converting...' : 'Convert to deal'}
                </button>
                <button onClick={() => setConverting(null)}
                  className="px-5 text-slate-400 hover:text-white border border-slate-700 rounded-xl text-sm transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
