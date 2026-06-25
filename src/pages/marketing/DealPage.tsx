import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Building2, MapPin, Globe, Hash, Phone, Mail, MessageSquare,
  Plus, ChevronRight, Check, X, AlertTriangle, Flame, Thermometer, Snowflake,
  UserCheck, Clock, RefreshCw, CheckCircle2, ExternalLink, Pencil,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import {
  Stage, STAGE_LABELS, STAGE_ORDER, nextStage, DEFAULT_NEXT_ACTIONS,
  CommissionStatus, Confidence, calcARR, calcL1Commission, fmtGbp,
  ORG_TYPE_LABELS, ORG_TYPES, LOST_REASONS, isoDate, addDays,
} from '../../lib/commission';

interface OrgData {
  id: string;
  trading_name: string;
  address_line1: string | null;
  city: string | null;
  postcode: string | null;
  county: string | null;
  website: string | null;
  org_type: string;
  num_sites: number;
  notes: string | null;
  created_by_user_id: string | null;
}

interface ContactData {
  id: string;
  org_id: string;
  full_name: string;
  job_title: string | null;
  email: string | null;
  phone: string | null;
  is_primary: boolean;
}

interface DealData {
  id: string;
  org_id: string;
  primary_contact_id: string | null;
  stage: Stage;
  source: string;
  confidence: Confidence;
  sourced_by_user_id: string | null;
  sourced_by_name: string | null;
  assigned_to_user_id: string | null;
  assigned_to_name: string | null;
  commission_status: CommissionStatus;
  next_action: string | null;
  next_action_date: string | null;
  num_sites: number;
  arr_override: number | null;
  video_link: string | null;
  lost_reason: string | null;
  handoff_note: string | null;
  commission_paid_at: string | null;
  created_at: string;
  won_at: string | null;
}

interface ActivityRow {
  id: string;
  user_name: string;
  action_type: string;
  payload: Record<string, unknown> | null;
  created_at: string;
}

const ACTION_LABELS: Record<string, string> = {
  created: 'Deal created',
  stage_changed: 'Stage updated',
  note_added: 'Note',
  contact_added: 'Contact added',
  assigned: 'Assigned',
  commission_approved: 'Commission approved',
  commission_flagged: 'Commission flagged',
  commission_declined: 'Commission declined',
  next_action_set: 'Next action set',
  won: 'Deal won',
  lost: 'Deal lost',
};

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function fullDate(d: string) {
  return new Date(d).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

const inputCls = 'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors';
const labelCls = 'text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-1.5';

const STAGE_COLOURS: Record<Stage, string> = {
  new: 'bg-slate-700 text-slate-300 border-slate-600',
  contacted: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  demo_booked: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
  demo_done: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  proposal_sent: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  won: 'bg-green-500/15 text-green-300 border-green-500/30',
  lost: 'bg-red-500/15 text-red-400 border-red-500/25',
};

const CONFIDENCE_DATA = {
  hot: { Icon: Flame, colour: 'text-red-400' },
  warm: { Icon: Thermometer, colour: 'text-sky-400' },
  cold: { Icon: Snowflake, colour: 'text-blue-400' },
};

function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className={`text-xs font-bold rounded-full px-3 py-1 border ${STAGE_COLOURS[stage]}`}>
      {STAGE_LABELS[stage]}
    </span>
  );
}

export default function DealPage() {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [deal, setDeal] = useState<DealData | null>(null);
  const [org, setOrg] = useState<OrgData | null>(null);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [activity, setActivity] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourcerIsFounder, setSourcerIsFounder] = useState(false);

  // Editing states
  const [editOrg, setEditOrg] = useState(false);
  const [orgDraft, setOrgDraft] = useState<Partial<OrgData>>({});
  const [savingOrg, setSavingOrg] = useState(false);

  const [editNextAction, setEditNextAction] = useState(false);
  const [nextActionText, setNextActionText] = useState('');
  const [nextActionDate, setNextActionDate] = useState('');
  const [savingAction, setSavingAction] = useState(false);

  const [noteText, setNoteText] = useState('');
  const [postingNote, setPostingNote] = useState(false);

  const [showLostModal, setShowLostModal] = useState(false);
  const [lostReason, setLostReason] = useState('');
  const [advancingStage, setAdvancingStage] = useState(false);

  const [showAddContact, setShowAddContact] = useState(false);
  const [contactDraft, setContactDraft] = useState({ full_name: '', job_title: '', email: '', phone: '' });
  const [savingContact, setSavingContact] = useState(false);

  const [editConfidence, setEditConfidence] = useState(false);

  const [editArr, setEditArr] = useState(false);
  const [arrDraft, setArrDraft] = useState('');
  const [savingArr, setSavingArr] = useState(false);

  const noteRef = useRef<HTMLTextAreaElement>(null);

  async function load() {
    if (!id) return;
    setLoading(true);
    const [dealRes, actRes] = await Promise.all([
      supabase.from('deals').select('*').eq('id', id).single(),
      supabase.from('deal_activity').select('id,user_name,action_type,payload,created_at')
        .eq('deal_id', id).order('created_at', { ascending: false }),
    ]);

    if (dealRes.data) {
      const d = dealRes.data as DealData;
      setDeal(d);
      setNextActionText(d.next_action ?? '');
      setNextActionDate(d.next_action_date ?? '');
      const [orgRes, contactRes, profRes] = await Promise.all([
        supabase.from('organisations').select('*').eq('id', d.org_id).single(),
        supabase.from('contacts').select('*').eq('org_id', d.org_id).order('is_primary', { ascending: false }),
        d.sourced_by_user_id
          ? supabase.from('user_profiles').select('is_founder').eq('id', d.sourced_by_user_id).maybeSingle()
          : Promise.resolve({ data: null }),
      ]);
      if (orgRes.data) { setOrg(orgRes.data as OrgData); setOrgDraft(orgRes.data as OrgData); }
      setContacts((contactRes.data ?? []) as ContactData[]);
      setSourcerIsFounder(profRes.data?.is_founder === true);
    }
    setActivity((actRes.data ?? []) as ActivityRow[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, [id]);

  const userName = profile?.display_name || user?.email?.split('@')[0] || 'Unknown';
  const isAdmin = profile?.role === 'admin';
  const canEdit = deal
    ? (deal.sourced_by_user_id === user?.id ||
       deal.assigned_to_user_id === user?.id ||
       deal.created_by_user_id === user?.id ||
       isAdmin)
    : false;

  async function writeActivity(type: string, payload: Record<string, unknown>) {
    if (!id || !user) return;
    await supabase.from('deal_activity').insert({
      deal_id: id,
      user_id: user.id,
      user_name: userName,
      action_type: type,
      payload,
    });
  }

  async function saveArr() {
    if (!deal || !user) return;
    setSavingArr(true);
    const val = arrDraft.trim() === '' ? null : parseInt(arrDraft.replace(/[^0-9]/g, ''), 10) || null;
    await supabase.from('deals').update({ arr_override: val, updated_at: new Date().toISOString() }).eq('id', deal.id);
    setDeal(prev => prev ? { ...prev, arr_override: val } : prev);
    setEditArr(false);
    setSavingArr(false);
  }

  async function saveOrg() {
    if (!org || !orgDraft.trading_name?.trim()) return;
    setSavingOrg(true);
    const { error } = await supabase.from('organisations').update({
      trading_name: orgDraft.trading_name?.trim(),
      address_line1: orgDraft.address_line1?.trim() || null,
      city: orgDraft.city?.trim() || null,
      postcode: orgDraft.postcode?.trim() || null,
      county: orgDraft.county?.trim() || null,
      website: orgDraft.website?.trim() || null,
      org_type: orgDraft.org_type,
      num_sites: orgDraft.num_sites,
      notes: orgDraft.notes?.trim() || null,
      updated_at: new Date().toISOString(),
    }).eq('id', org.id);
    if (!error) {
      setOrg({ ...org, ...orgDraft } as OrgData);
      setEditOrg(false);
    }
    setSavingOrg(false);
  }

  async function saveNextAction() {
    if (!deal) return;
    setSavingAction(true);
    await supabase.from('deals').update({
      next_action: nextActionText.trim() || null,
      next_action_date: nextActionDate || null,
      updated_at: new Date().toISOString(),
    }).eq('id', deal.id);
    await writeActivity('next_action_set', {
      action: nextActionText.trim(),
      date: nextActionDate,
    });
    setDeal(prev => prev ? { ...prev, next_action: nextActionText.trim() || null, next_action_date: nextActionDate || null } : prev);
    setEditNextAction(false);
    setSavingAction(false);
  }

  async function postNote() {
    if (!noteText.trim() || !deal) return;
    setPostingNote(true);
    await writeActivity('note_added', { text: noteText.trim() });
    const { data } = await supabase.from('deal_activity')
      .select('id,user_name,action_type,payload,created_at')
      .eq('deal_id', deal.id).order('created_at', { ascending: false });
    setActivity((data ?? []) as ActivityRow[]);
    setNoteText('');
    setPostingNote(false);
  }

  async function advanceStage() {
    if (!deal) return;
    const next = nextStage(deal.stage);
    if (!next) return;
    setAdvancingStage(true);
    const defaultAct = DEFAULT_NEXT_ACTIONS[next];
    const newNextDate = isoDate(addDays(new Date(), defaultAct.daysAhead));
    await supabase.from('deals').update({
      stage: next,
      next_action: defaultAct.action || null,
      next_action_date: defaultAct.action ? newNextDate : null,
      won_at: next === 'won' ? new Date().toISOString() : undefined,
      ...(next === 'won' && sourcerIsFounder ? { commission_status: 'n/a' } : {}),
      updated_at: new Date().toISOString(),
    }).eq('id', deal.id);
    await writeActivity('stage_changed', { from: deal.stage, to: next });
    setDeal(prev => prev ? {
      ...prev,
      stage: next,
      next_action: defaultAct.action || null,
      next_action_date: defaultAct.action ? newNextDate : null,
    } : prev);
    setNextActionText(defaultAct.action || '');
    setNextActionDate(defaultAct.action ? newNextDate : '');
    const { data } = await supabase.from('deal_activity')
      .select('id,user_name,action_type,payload,created_at')
      .eq('deal_id', deal.id).order('created_at', { ascending: false });
    setActivity((data ?? []) as ActivityRow[]);
    setAdvancingStage(false);
  }

  async function markLost() {
    if (!deal || !lostReason) return;
    setAdvancingStage(true);
    await supabase.from('deals').update({
      stage: 'lost',
      lost_reason: lostReason,
      next_action: null,
      next_action_date: null,
      updated_at: new Date().toISOString(),
    }).eq('id', deal.id);
    await writeActivity('lost', { reason: lostReason });
    setDeal(prev => prev ? { ...prev, stage: 'lost', lost_reason: lostReason } : prev);
    setShowLostModal(false);
    setAdvancingStage(false);
    const { data } = await supabase.from('deal_activity')
      .select('id,user_name,action_type,payload,created_at')
      .eq('deal_id', deal.id).order('created_at', { ascending: false });
    setActivity((data ?? []) as ActivityRow[]);
  }

  async function saveContact() {
    if (!contactDraft.full_name.trim() || !org) return;
    setSavingContact(true);
    const { data, error } = await supabase.from('contacts').insert({
      org_id: org.id,
      full_name: contactDraft.full_name.trim(),
      job_title: contactDraft.job_title.trim() || null,
      email: contactDraft.email.trim() || null,
      phone: contactDraft.phone.trim() || null,
      is_primary: false,
      created_by_user_id: user!.id,
    }).select('*').single();
    if (!error && data) {
      setContacts(prev => [...prev, data as ContactData]);
      await writeActivity('contact_added', { name: contactDraft.full_name.trim() });
      setShowAddContact(false);
      setContactDraft({ full_name: '', job_title: '', email: '', phone: '' });
    }
    setSavingContact(false);
  }

  async function changeConfidence(c: Confidence) {
    if (!deal) return;
    await supabase.from('deals').update({ confidence: c, updated_at: new Date().toISOString() }).eq('id', deal.id);
    setDeal(prev => prev ? { ...prev, confidence: c } : prev);
    setEditConfidence(false);
  }

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <RefreshCw size={24} className="animate-spin text-slate-600" />
      </div>
    );
  }

  if (!deal || !org) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-sm">Deal not found.</p>
          <Link to="/pipeline" className="text-teal-400 text-sm mt-2 inline-flex items-center gap-1">
            <ArrowLeft size={13} /> Back to pipeline
          </Link>
        </div>
      </div>
    );
  }

  const arr = calcARR(deal.num_sites, deal.arr_override);
  const commission = calcL1Commission(deal.num_sites, deal.arr_override);
  const next = nextStage(deal.stage);
  const conf = CONFIDENCE_DATA[deal.confidence] ?? CONFIDENCE_DATA.warm;
  const ConfIcon = conf.Icon;
  const isOverdue = deal.next_action_date && deal.next_action_date < isoDate(new Date());
  const primaryContact = contacts.find(c => c.id === deal.primary_contact_id) ?? contacts[0] ?? null;

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="border-b border-slate-800 px-4 py-4 sm:px-8 flex items-center gap-4">
        <Link to="/pipeline" className="flex items-center gap-1.5 text-slate-500 hover:text-white text-sm transition-colors flex-shrink-0">
          <ArrowLeft size={14} />
          Pipeline
        </Link>
        <div className="h-4 w-px bg-slate-700" />
        <h1 className="text-white font-bold text-base truncate">{org.trading_name}</h1>
        <StageBadge stage={deal.stage} />
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setEditConfidence(!editConfidence)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors relative"
            title="Change confidence"
          >
            <ConfIcon size={14} className={conf.colour} />
            <span className="capitalize hidden sm:inline">{deal.confidence}</span>
            {editConfidence && (
              <div className="absolute top-full right-0 mt-1 bg-slate-800 border border-slate-700 rounded-xl p-2 z-20 flex gap-1">
                {(['hot', 'warm', 'cold'] as Confidence[]).map(c => {
                  const cd = CONFIDENCE_DATA[c];
                  return (
                    <button key={c} onClick={() => changeConfidence(c)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${deal.confidence === c ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}>
                      <cd.Icon size={12} className={cd.colour} />{c}
                    </button>
                  );
                })}
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-8 grid lg:grid-cols-3 gap-6">
        {/* Left: Org + Contacts */}
        <div className="lg:col-span-2 space-y-5">

          {/* Organisation card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 size={14} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Organisation</h2>
              </div>
              {canEdit && !editOrg && (
                <button onClick={() => setEditOrg(true)}
                  className="text-slate-500 hover:text-teal-400 text-xs transition-colors">
                  Edit
                </button>
              )}
            </div>

            {editOrg ? (
              <div className="p-5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Trading name <span className="text-red-400">*</span></label>
                    <input type="text" value={orgDraft.trading_name ?? ''} onChange={e => setOrgDraft(p => ({ ...p, trading_name: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Type</label>
                    <select value={orgDraft.org_type ?? 'pub'} onChange={e => setOrgDraft(p => ({ ...p, org_type: e.target.value }))} className={inputCls}>
                      {ORG_TYPES.map(t => <option key={t} value={t}>{ORG_TYPE_LABELS[t]}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Street address</label>
                  <input type="text" value={orgDraft.address_line1 ?? ''} onChange={e => setOrgDraft(p => ({ ...p, address_line1: e.target.value }))} className={inputCls} />
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className={labelCls}>City</label>
                    <input type="text" value={orgDraft.city ?? ''} onChange={e => setOrgDraft(p => ({ ...p, city: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Postcode</label>
                    <input type="text" value={orgDraft.postcode ?? ''} onChange={e => setOrgDraft(p => ({ ...p, postcode: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Sites</label>
                    <input type="number" min="1" value={orgDraft.num_sites ?? 1} onChange={e => setOrgDraft(p => ({ ...p, num_sites: parseInt(e.target.value, 10) || 1 }))} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Website</label>
                  <input type="text" value={orgDraft.website ?? ''} onChange={e => setOrgDraft(p => ({ ...p, website: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Notes</label>
                  <textarea rows={3} value={orgDraft.notes ?? ''} onChange={e => setOrgDraft(p => ({ ...p, notes: e.target.value }))} className={`${inputCls} resize-none`} />
                </div>
                <div className="flex gap-2">
                  <button onClick={saveOrg} disabled={savingOrg} className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors">
                    <Check size={13} />{savingOrg ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => { setEditOrg(false); setOrgDraft(org); }} className="text-slate-500 hover:text-white text-sm px-4 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div>
                  <span className={labelCls}>Type</span>
                  <span className="text-slate-300">{ORG_TYPE_LABELS[org.org_type] ?? org.org_type}</span>
                </div>
                <div>
                  <span className={labelCls}>Sites</span>
                  <span className="text-slate-300">{org.num_sites} site{org.num_sites !== 1 ? 's' : ''}</span>
                </div>
                {org.address_line1 && (
                  <div>
                    <span className={labelCls}>Address</span>
                    <span className="text-slate-300">{org.address_line1}</span>
                  </div>
                )}
                <div>
                  <span className={labelCls}><MapPin size={9} className="inline mr-1" />Location</span>
                  <span className="text-slate-300">
                    {[org.city, org.postcode, org.county].filter(Boolean).join(', ') || '—'}
                  </span>
                </div>
                {org.website && (
                  <div>
                    <span className={labelCls}><Globe size={9} className="inline mr-1" />Website</span>
                    <a href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-sm">
                      {org.website} <ExternalLink size={10} />
                    </a>
                  </div>
                )}
                {org.notes && (
                  <div className="sm:col-span-2">
                    <span className={labelCls}>Notes</span>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{org.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Contacts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserCheck size={14} className="text-teal-400" />
                <h2 className="text-white font-bold text-sm">Contacts</h2>
                <span className="text-slate-600 text-xs">{contacts.length}</span>
              </div>
              {canEdit && (
                <button onClick={() => setShowAddContact(!showAddContact)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-teal-400 transition-colors">
                  <Plus size={12} />Add
                </button>
              )}
            </div>

            {showAddContact && (
              <div className="px-5 py-4 border-b border-slate-800 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Full name <span className="text-red-400">*</span></label>
                    <input type="text" value={contactDraft.full_name} onChange={e => setContactDraft(p => ({ ...p, full_name: e.target.value }))} placeholder="Jane Smith" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Job title</label>
                    <input type="text" value={contactDraft.job_title} onChange={e => setContactDraft(p => ({ ...p, job_title: e.target.value }))} placeholder="General Manager" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" value={contactDraft.email} onChange={e => setContactDraft(p => ({ ...p, email: e.target.value }))} placeholder="jane@example.com" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="tel" value={contactDraft.phone} onChange={e => setContactDraft(p => ({ ...p, phone: e.target.value }))} placeholder="07700 900000" className={inputCls} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={saveContact} disabled={savingContact || !contactDraft.full_name.trim()}
                    className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
                    <Check size={12} />{savingContact ? 'Saving...' : 'Save contact'}
                  </button>
                  <button onClick={() => setShowAddContact(false)} className="text-slate-500 hover:text-white text-xs px-3 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {contacts.length === 0 ? (
              <p className="px-5 py-4 text-slate-600 text-sm">No contacts yet.</p>
            ) : (
              <div className="divide-y divide-slate-800">
                {contacts.map(c => (
                  <div key={c.id} className="px-5 py-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/15 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-400 font-black text-xs">
                      {c.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white text-sm font-semibold">{c.full_name}</span>
                        {c.job_title && <span className="text-slate-500 text-xs">{c.job_title}</span>}
                        {c.is_primary && <span className="text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full px-2 py-px">Primary</span>}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1.5">
                        {c.email && (
                          <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-teal-400 hover:text-teal-300 text-xs transition-colors">
                            <Mail size={10} />{c.email}
                          </a>
                        )}
                        {c.phone && (
                          <a href={`tel:${c.phone}`} className="flex items-center gap-1 text-slate-400 hover:text-white text-xs transition-colors">
                            <Phone size={10} />{c.phone}
                          </a>
                        )}
                        {c.phone && (
                          <a href={`https://wa.me/${c.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-green-500 hover:text-green-400 text-xs transition-colors">
                            <MessageSquare size={10} />WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick contact actions for primary contact */}
          {primaryContact && (
            <div className="flex flex-wrap gap-2">
              {primaryContact.email && (
                <a href={`mailto:${primaryContact.email}?subject=Following up — ServiceSupport.UK`}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
                  <Mail size={13} className="text-teal-400" />Reply via email
                </a>
              )}
              {primaryContact.phone && (
                <a href={`tel:${primaryContact.phone}`}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
                  <Phone size={13} className="text-teal-400" />Call
                </a>
              )}
              {primaryContact.phone && (
                <a href={`https://wa.me/${primaryContact.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
                  <MessageSquare size={13} className="text-green-400" />WhatsApp
                </a>
              )}
              {deal.video_link && (
                <a href={deal.video_link} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all">
                  <ExternalLink size={13} className="text-teal-400" />Video link
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right: Stage, Commission, Next action, Activity */}
        <div className="space-y-4">

          {/* Stage card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={14} className="text-teal-400" />
              <h2 className="text-white font-bold text-sm">Stage</h2>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <StageBadge stage={deal.stage} />
            </div>

            {deal.stage === 'lost' ? (
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-3 py-2.5">
                <p className="text-red-400 text-xs font-bold">Lost reason</p>
                <p className="text-slate-300 text-sm mt-0.5">
                  {LOST_REASONS.find(r => r.value === deal.lost_reason)?.label ?? deal.lost_reason ?? 'Not specified'}
                </p>
              </div>
            ) : deal.stage === 'won' ? (
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl px-3 py-2.5">
                <p className="text-green-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 size={11} />Won
                </p>
                {deal.won_at && <p className="text-slate-500 text-xs mt-0.5">{fullDate(deal.won_at)}</p>}
              </div>
            ) : canEdit ? (
              <div className="space-y-2">
                {next && (
                  <button
                    onClick={advanceStage}
                    disabled={advancingStage}
                    className="w-full flex items-center justify-between bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white font-bold px-4 py-3 rounded-xl text-sm transition-colors"
                  >
                    <span>Move to: {STAGE_LABELS[next]}</span>
                    <ChevronRight size={14} />
                  </button>
                )}
                <button
                  onClick={() => setShowLostModal(true)}
                  className="w-full text-center text-slate-500 hover:text-red-400 text-xs py-2 transition-colors"
                >
                  Mark as lost
                </button>
              </div>
            ) : null}

            {deal.stage === 'won' && canEdit && (
              <div className="mt-3">
                <label className={labelCls}>Handoff note</label>
                <textarea rows={3} defaultValue={deal.handoff_note ?? ''}
                  onBlur={async (e) => {
                    await supabase.from('deals').update({ handoff_note: e.target.value.trim() || null }).eq('id', deal.id);
                  }}
                  placeholder="Who takes it from here? What needs to happen?"
                  className={`${inputCls} resize-none text-xs`} />
              </div>
            )}
          </div>

          {/* Commission card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-sm">Commission</h2>
              <span className={`text-[10px] font-bold rounded-full px-2 py-px border ${
                deal.commission_status === 'n/a' ? 'bg-slate-800 text-slate-500 border-slate-700' :
                deal.commission_status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/25' :
                deal.commission_status === 'flagged' ? 'bg-sky-500/10 text-sky-400 border-sky-500/25' :
                deal.commission_status === 'declined' ? 'bg-red-500/10 text-red-400 border-red-500/25' :
                'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {deal.commission_status === 'flagged' && <AlertTriangle size={9} className="inline mr-1" />}
                {deal.commission_status === 'n/a' ? 'Business revenue' : deal.commission_status}
              </span>
            </div>
            {deal.commission_status === 'n/a' || sourcerIsFounder ? (
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sites</span>
                  <span className="text-white font-bold">{deal.num_sites}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">ARR</span>
                  <span className="text-teal-400 font-bold">{fmtGbp(arr)}/yr</span>
                </div>
                <div className="h-px bg-slate-800" />
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Sourced by</span>
                  <span className="text-white text-xs">{deal.sourced_by_name ?? '—'}</span>
                </div>
                <p className="text-slate-600 text-[10px] leading-snug mt-1">
                  This deal was sourced by a founder. Revenue goes directly to the business — no commission is payable.
                </p>
              </div>
            ) : (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Sites</span>
                <span className="text-white font-bold">{deal.num_sites}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">ARR</span>
                {editArr ? (
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-xs">£</span>
                    <input
                      type="number"
                      min="0"
                      autoFocus
                      value={arrDraft}
                      onChange={e => setArrDraft(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveArr(); if (e.key === 'Escape') setEditArr(false); }}
                      placeholder={String(deal.num_sites * 1200)}
                      className="w-24 bg-slate-800 border border-teal-500/50 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                    />
                    <button onClick={saveArr} disabled={savingArr} className="p-1 rounded text-teal-400 hover:text-teal-300 transition-colors">
                      <Check size={12} />
                    </button>
                    <button onClick={() => setEditArr(false)} className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors">
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setArrDraft(deal.arr_override ? String(deal.arr_override) : ''); setEditArr(true); }}
                    className="flex items-center gap-1.5 group"
                    title="Override ARR"
                  >
                    <span className="text-teal-400 font-bold">{fmtGbp(arr)}/yr</span>
                    {deal.arr_override && (
                      <span className="text-[9px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full px-1.5 py-px">custom</span>
                    )}
                    <Pencil size={10} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">L1 commission</span>
                <span className="text-sky-400 font-bold">{fmtGbp(commission)}</span>
              </div>
              <div className="h-px bg-slate-800" />
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Sourced by</span>
                <span className="text-white text-xs">{deal.sourced_by_name ?? '—'}</span>
              </div>
              {deal.assigned_to_name && deal.assigned_to_name !== deal.sourced_by_name && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Assigned to</span>
                  <span className="text-white text-xs">{deal.assigned_to_name}</span>
                </div>
              )}
              {deal.commission_paid_at && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Paid</span>
                  <span className="text-green-400 text-xs font-bold">
                    <CheckCircle2 size={10} className="inline mr-1" />
                    {fullDate(deal.commission_paid_at)}
                  </span>
                </div>
              )}
              {deal.commission_status === 'flagged' && (
                <p className="text-sky-400/80 text-[10px] leading-snug mt-1">
                  Another active deal exists for this organisation. Admin must review before commission is paid.
                </p>
              )}
            </div>
            )}
          </div>

          {/* Next action */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold text-sm">Next action</h2>
              {canEdit && deal.stage !== 'won' && deal.stage !== 'lost' && (
                <button onClick={() => setEditNextAction(!editNextAction)}
                  className="text-slate-500 hover:text-teal-400 text-xs transition-colors">
                  Edit
                </button>
              )}
            </div>
            {editNextAction ? (
              <div className="space-y-2">
                <input type="text" value={nextActionText} onChange={e => setNextActionText(e.target.value)}
                  placeholder="What needs to happen next?" className={inputCls} />
                <input type="date" value={nextActionDate} onChange={e => setNextActionDate(e.target.value)}
                  className={inputCls} />
                <div className="flex gap-2">
                  <button onClick={saveNextAction} disabled={savingAction}
                    className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors">
                    <Check size={12} />{savingAction ? '...' : 'Save'}
                  </button>
                  <button onClick={() => setEditNextAction(false)} className="text-slate-500 hover:text-white text-xs px-3 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {deal.next_action ? (
                  <>
                    <p className={`text-sm font-semibold ${isOverdue ? 'text-red-300' : 'text-white'}`}>
                      {isOverdue && <AlertTriangle size={11} className="inline mr-1 text-red-400" />}
                      {deal.next_action}
                    </p>
                    {deal.next_action_date && (
                      <p className={`text-xs mt-1 flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-slate-500'}`}>
                        <Clock size={10} />
                        {new Date(deal.next_action_date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                        {isOverdue && ' — OVERDUE'}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-slate-600 text-sm">No action set.</p>
                )}
              </div>
            )}
          </div>

          {/* Activity timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800">
              <h2 className="text-white font-bold text-sm">Activity</h2>
            </div>

            {canEdit && deal.stage !== 'lost' && (
              <div className="px-5 py-3 border-b border-slate-800">
                <textarea
                  ref={noteRef}
                  rows={2}
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) postNote(); }}
                  placeholder="Log a call, add a note..."
                  className={`${inputCls} resize-none text-xs`}
                />
                <button
                  onClick={postNote}
                  disabled={!noteText.trim() || postingNote}
                  className="mt-2 flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                >
                  <Check size={12} />{postingNote ? 'Posting...' : 'Add note'}
                </button>
              </div>
            )}

            <div className="divide-y divide-slate-800 max-h-96 overflow-y-auto">
              {activity.length === 0 ? (
                <p className="px-5 py-4 text-slate-600 text-xs">No activity yet.</p>
              ) : (
                activity.map(a => {
                  const isNote = a.action_type === 'note_added';
                  return (
                    <div key={a.id} className="px-5 py-3">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-xs font-bold ${isNote ? 'text-teal-400' : 'text-slate-400'}`}>
                          {ACTION_LABELS[a.action_type] ?? a.action_type}
                        </span>
                        <span className="text-slate-600 text-[10px] flex items-center gap-1" title={fullDate(a.created_at)}>
                          <Clock size={9} />{timeAgo(a.created_at)}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mb-1">by {a.user_name}</div>
                      {isNote && a.payload?.text && (
                        <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap bg-slate-800/60 rounded-lg px-3 py-2 mt-1">
                          {String(a.payload.text)}
                        </p>
                      )}
                      {a.action_type === 'stage_changed' && a.payload && (
                        <p className="text-slate-500 text-xs flex items-center gap-1.5">
                          <span>{STAGE_LABELS[String(a.payload.from) as Stage] ?? String(a.payload.from)}</span>
                          <ChevronRight size={10} />
                          <span className="text-white">{STAGE_LABELS[String(a.payload.to) as Stage] ?? String(a.payload.to)}</span>
                        </p>
                      )}
                      {a.action_type === 'lost' && a.payload?.reason && (
                        <p className="text-red-400 text-xs">
                          {LOST_REASONS.find(r => r.value === String(a.payload?.reason))?.label ?? String(a.payload.reason)}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lost modal */}
      {showLostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-white font-bold text-base mb-1">Mark as lost</h2>
            <p className="text-slate-500 text-sm mb-4">Why didn't this one go ahead?</p>
            <div className="space-y-2 mb-5">
              {LOST_REASONS.map(r => (
                <button
                  key={r.value}
                  onClick={() => setLostReason(r.value)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    lostReason === r.value
                      ? 'bg-red-500/15 border border-red-500/30 text-red-300'
                      : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={markLost}
                disabled={!lostReason || advancingStage}
                className="flex-1 bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
              >
                {advancingStage ? 'Saving...' : 'Mark as lost'}
              </button>
              <button onClick={() => setShowLostModal(false)}
                className="px-4 text-slate-500 hover:text-white border border-slate-700 rounded-xl text-sm transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
