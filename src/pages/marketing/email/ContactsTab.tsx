import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Trash2, Mail, Send, CheckCircle, XCircle, Loader2,
  UserPlus, X, Eye, MousePointer, AlertTriangle, ChevronRight,
  Clock, Building2, Phone, FileText, Play, Square, Zap,
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { campaigns, type Email } from './campaignData';

interface Contact {
  id: string;
  name: string;
  email: string;
  business_name: string;
  phone: string;
  notes: string;
  status: string;
  current_campaign_id: string;
  current_stage: number;
  created_at: string;
  automation_active: boolean;
  automation_campaign_id: string | null;
  automation_next_email_id: number | null;
  automation_next_send_at: string | null;
  automation_paused: boolean;
}

interface SendRecord {
  id: string;
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
}

function statusBadge(status: string) {
  if (status === 'unsubscribed')
    return <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/25 rounded-full px-2 py-px">Unsub</span>;
  if (status === 'bounced')
    return <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/25 rounded-full px-2 py-px">Bounced</span>;
  return <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/25 rounded-full px-2 py-px">Active</span>;
}

function fmt(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function fmtShort(d: string) {
  return new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function fmtDate(d: string) {
  return new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const campaignLabel = (id: string) => campaigns.find(c => c.id === id)?.label ?? id;

// ── Add Contact Modal ──────────────────────────────────────────────────────────
function AddContactModal({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', business_name: '', phone: '', notes: '' });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const save = async () => {
    if (!form.name.trim() || !form.email.trim()) { setErr('Name and email are required.'); return; }
    setSaving(true); setErr('');
    const { error } = await supabase.from('email_contacts').insert({ ...form });
    setSaving(false);
    if (error) { setErr(error.message); return; }
    onAdded(); onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-base">Add contact</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        {(['name', 'email', 'business_name', 'phone', 'notes'] as const).map((field) => (
          <div key={field}>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {field === 'business_name' ? 'Business' : field.charAt(0).toUpperCase() + field.slice(1)}
              {(field === 'name' || field === 'email') && <span className="text-rose-400 ml-0.5">*</span>}
            </label>
            {field === 'notes' ? (
              <textarea rows={2} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 resize-none"
                placeholder="Optional notes..." />
            ) : (
              <input type={field === 'email' ? 'email' : 'text'} value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                placeholder={field === 'email' ? 'name@business.com' : ''} />
            )}
          </div>
        ))}
        {err && <p className="text-rose-400 text-xs">{err}</p>}
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-all">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
            Add contact
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Enroll Automation Modal ────────────────────────────────────────────────────
function EnrollModal({ contact, onClose, onEnrolled }: { contact: Contact; onClose: () => void; onEnrolled: () => void }) {
  const [selectedCampaignId, setSelectedCampaignId] = useState('founders');
  const [enrolling, setEnrolling] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const enroll = async () => {
    setEnrolling(true); setResult(null);
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/automated-campaign/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          contactId: contact.id,
          campaignId: selectedCampaignId,
          siteUrl: window.location.origin,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || data.error) {
        setResult({ ok: false, msg: data.error ?? 'Failed to enroll' });
      } else {
        setResult({ ok: true, msg: 'Enrolled — first email sent now, sequence continues automatically.' });
        onEnrolled();
      }
    } catch (e) {
      setResult({ ok: false, msg: String(e) });
    }
    setEnrolling(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-base">Start automated sequence</h3>
            <p className="text-slate-500 text-xs mt-0.5">{contact.name} — {contact.email}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <div className="bg-slate-800/60 border border-sky-500/20 rounded-xl p-3">
          <p className="text-sky-300 text-xs font-medium leading-relaxed">
            The first email sends immediately. Subsequent emails are sent automatically each morning at 8am on the schedule below. Automation stops if the recipient books a meeting or unsubscribes.
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Choose campaign</label>
          <div className="space-y-1.5">
            {campaigns.map(c => (
              <button key={c.id} onClick={() => setSelectedCampaignId(c.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${selectedCampaignId === c.id ? 'bg-teal-500/10 border-teal-500/40 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}>
                <span className="font-semibold">{c.label}</span>
                <span className="text-[11px] block opacity-60 mt-0.5">{c.description}</span>
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${result.ok ? 'bg-teal-500/10 border border-teal-500/30 text-teal-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'}`}>
            {result.ok ? <CheckCircle size={15} /> : <XCircle size={15} />}
            {result.msg}
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-all">
            {result?.ok ? 'Close' : 'Cancel'}
          </button>
          {!result?.ok && (
            <button onClick={enroll} disabled={enrolling}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-400 text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {enrolling ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              Start sequence
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Send Email Modal ───────────────────────────────────────────────────────────
function SendEmailModal({ contact, onClose, onSent }: { contact: Contact; onClose: () => void; onSent: () => void }) {
  const [selectedCampaignId, setSelectedCampaignId] = useState('founders');
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const campaign = campaigns.find(c => c.id === selectedCampaignId)!;
  const allEmails: (Email & { stageNum: number; stageLabel: string })[] = campaign.data.flatMap(s =>
    s.emails.map(e => ({ ...e, stageNum: s.stage, stageLabel: s.label }))
  );
  const selectedEmail = allEmails.find(e => e.id === selectedEmailId);

  const send = async () => {
    if (!selectedEmail) return;
    setSending(true); setResult(null);
    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-campaign-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          contactId: contact.id,
          campaignId: selectedCampaignId,
          emailId: selectedEmail.id,
          stage: selectedEmail.stageNum,
          subject: selectedEmail.subject,
          body: selectedEmail.body,
          cta: selectedEmail.cta,
          siteUrl: window.location.origin,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || data.error) {
        const detail = data.detail ? ` — ${JSON.stringify(data.detail)}` : '';
        setResult({ ok: false, msg: (data.error ?? 'Failed to send') + detail });
      } else {
        setResult({ ok: true, msg: `Sent to ${contact.email}` });
        onSent();
      }
    } catch (e) {
      setResult({ ok: false, msg: String(e) });
    }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-base">Send email</h3>
            <p className="text-slate-500 text-xs mt-0.5">{contact.name} — {contact.email}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Campaign</label>
          <div className="space-y-1.5">
            {campaigns.map(c => (
              <button key={c.id} onClick={() => { setSelectedCampaignId(c.id); setSelectedEmailId(null); }}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${selectedCampaignId === c.id ? 'bg-teal-500/10 border-teal-500/40 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}>
                <span className="font-semibold">{c.label}</span>
                <span className="text-[11px] block opacity-60 mt-0.5">{c.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Select email to send</label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {allEmails.map(e => (
              <button key={e.id} onClick={() => setSelectedEmailId(e.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${selectedEmailId === e.id ? 'bg-teal-500/10 border-teal-500/40 text-teal-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}>
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Stage {e.stageNum}</span>
                  <span className="text-[10px] opacity-50">{e.timing}</span>
                </div>
                <p className="font-semibold text-sm leading-snug">{e.subject}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedEmail && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Preview</p>
            <p className="text-white text-sm font-medium">{selectedEmail.subject}</p>
            <p className="text-slate-400 text-xs">{selectedEmail.preview}</p>
          </div>
        )}

        {result && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${result.ok ? 'bg-teal-500/10 border border-teal-500/30 text-teal-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'}`}>
            {result.ok ? <CheckCircle size={15} /> : <XCircle size={15} />}
            {result.msg}
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-all">Close</button>
          {!result?.ok && (
            <button onClick={send} disabled={sending || !selectedEmail}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              Send email
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Contact Detail Panel ───────────────────────────────────────────────────────
function ContactPanel({
  contact, onClose, onDeleted, onRefresh,
}: {
  contact: Contact;
  onClose: () => void;
  onDeleted: () => void;
  onRefresh: (id: string) => void;
}) {
  const [sends, setSends] = useState<SendRecord[]>([]);
  const [loadingSends, setLoadingSends] = useState(true);
  const [showSend, setShowSend] = useState(false);
  const [showEnroll, setShowEnroll] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [unenrolling, setUnenrolling] = useState(false);

  const loadSends = useCallback(async () => {
    setLoadingSends(true);
    const { data } = await supabase
      .from('email_sends')
      .select('id, campaign_id, email_id, stage, subject, sent_at, opened_at, clicked_at, bounced_at, open_count, click_count')
      .eq('contact_id', contact.id)
      .order('sent_at', { ascending: false });
    setSends((data as SendRecord[]) ?? []);
    setLoadingSends(false);
  }, [contact.id]);

  useEffect(() => { loadSends(); }, [loadSends]);

  const handleDelete = async () => {
    setDeleting(true);
    await supabase.from('email_contacts').delete().eq('id', contact.id);
    onDeleted();
  };

  const handleUnenroll = async () => {
    setUnenrolling(true);
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/automated-campaign/unenroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ contactId: contact.id }),
      });
      onRefresh(contact.id);
    } finally {
      setUnenrolling(false);
    }
  };

  const totalSends = sends.length;
  const opened = sends.filter(s => s.opened_at).length;
  const clicked = sends.filter(s => s.clicked_at).length;

  const nextCampaign = campaigns.find(c => c.id === contact.automation_campaign_id);
  const nextEmail = nextCampaign?.data.flatMap(s => s.emails).find(e => e.id === contact.automation_next_email_id);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-slate-900 border-l border-slate-700 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-start gap-4 px-6 py-5 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0 text-white font-bold text-base">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-white font-bold text-base">{contact.name}</h2>
              {statusBadge(contact.status)}
              {contact.automation_active && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/25 rounded-full px-2 py-px flex items-center gap-1">
                  <Zap size={8} />Auto
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm mt-0.5">{contact.email}</p>
            {contact.business_name && (
              <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
                <Building2 size={10} />{contact.business_name}
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors flex-shrink-0 mt-0.5">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Automation status */}
          {contact.automation_active ? (
            <div className="bg-sky-500/5 border border-sky-500/25 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-sky-400" />
                  <p className="text-sky-300 text-sm font-semibold">Automated sequence active</p>
                </div>
                <button
                  onClick={handleUnenroll}
                  disabled={unenrolling}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-rose-400 transition-colors"
                >
                  {unenrolling ? <Loader2 size={11} className="animate-spin" /> : <Square size={11} />}
                  Stop
                </button>
              </div>
              <p className="text-sky-400/70 text-xs">{campaignLabel(contact.automation_campaign_id ?? '')}</p>
              {nextEmail && (
                <p className="text-slate-400 text-xs">
                  Next: <span className="text-slate-300 font-medium">{nextEmail.subject}</span>
                </p>
              )}
              {contact.automation_next_send_at && (
                <p className="text-slate-500 text-xs flex items-center gap-1">
                  <Clock size={10} />
                  Scheduled: {fmtDate(contact.automation_next_send_at)} at 8:00am
                </p>
              )}
            </div>
          ) : contact.status === 'active' ? (
            <button
              onClick={() => setShowEnroll(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-slate-600 hover:border-sky-500/50 hover:bg-sky-500/5 text-slate-500 hover:text-sky-300 transition-all text-sm"
            >
              <Play size={14} />
              <span>Start automated email sequence</span>
            </button>
          ) : null}

          {/* Contact info */}
          <div className="grid grid-cols-2 gap-3">
            {contact.phone && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-3">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Phone size={9} />Phone</p>
                <p className="text-white text-sm">{contact.phone}</p>
              </div>
            )}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={9} />Added</p>
              <p className="text-white text-sm">{fmtShort(contact.created_at)}</p>
            </div>
            {contact.current_campaign_id && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 col-span-2">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Current sequence</p>
                <p className="text-white text-sm">{campaignLabel(contact.current_campaign_id)} · Stage {contact.current_stage}</p>
              </div>
            )}
            {contact.notes && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 col-span-2">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1"><FileText size={9} />Notes</p>
                <p className="text-slate-300 text-sm leading-relaxed">{contact.notes}</p>
              </div>
            )}
          </div>

          {/* Engagement summary */}
          {totalSends > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Sent', value: totalSends, colour: 'text-slate-300' },
                { label: 'Opened', value: opened, colour: 'text-teal-400' },
                { label: 'Clicked', value: clicked, colour: 'text-amber-400' },
              ].map(s => (
                <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                  <p className={`text-xl font-black ${s.colour}`}>{s.value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Correspondence history */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Correspondence history</p>
            {loadingSends ? (
              <div className="flex items-center justify-center py-8"><Loader2 size={18} className="animate-spin text-teal-400" /></div>
            ) : sends.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center bg-slate-800/50 border border-slate-700 rounded-xl">
                <Mail size={24} className="text-slate-600 mb-2" />
                <p className="text-slate-500 text-sm">No emails sent yet</p>
                <p className="text-slate-600 text-xs mt-0.5">Send the first email using the button below.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {sends.map((s) => (
                  <div key={s.id} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${s.bounced_at ? 'bg-rose-400' : s.clicked_at ? 'bg-amber-400' : s.opened_at ? 'bg-teal-400' : 'bg-slate-600'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold leading-snug">{s.subject}</p>
                        <p className="text-slate-500 text-[10px] mt-0.5">{campaignLabel(s.campaign_id)} · Stage {s.stage}</p>
                        <p className="text-slate-600 text-[10px] mt-0.5 flex items-center gap-1">
                          <Clock size={9} />Sent {fmt(s.sent_at)}
                        </p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {s.opened_at ? (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/25 rounded-full px-2 py-0.5">
                              <Eye size={9} />{s.open_count}× opened
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-700/50 rounded-full px-2 py-0.5">
                              <Eye size={9} />Not opened
                            </span>
                          )}
                          {s.clicked_at && (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/25 rounded-full px-2 py-0.5">
                              <MousePointer size={9} />{s.click_count}× clicked
                            </span>
                          )}
                          {s.bounced_at && (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/25 rounded-full px-2 py-0.5">
                              <AlertTriangle size={9} />Bounced
                            </span>
                          )}
                        </div>
                        {(s.opened_at || s.clicked_at) && (
                          <div className="mt-2 space-y-0.5">
                            {s.opened_at && <p className="text-slate-600 text-[10px]">First open: {fmt(s.opened_at)}</p>}
                            {s.clicked_at && <p className="text-slate-600 text-[10px]">First click: {fmt(s.clicked_at)}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center gap-3">
          {!confirmDelete ? (
            <>
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/25 transition-all"
              >
                <Trash2 size={13} />Delete
              </button>
              <div className="flex-1" />
              <button
                onClick={() => setShowSend(true)}
                disabled={contact.status !== 'active'}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={14} />Send email
              </button>
            </>
          ) : (
            <>
              <p className="text-slate-400 text-sm flex-1">Delete {contact.name}?</p>
              <button onClick={() => setConfirmDelete(false)} className="px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-white border border-slate-700 transition-all">Cancel</button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-rose-500 hover:bg-rose-400 text-white transition-colors disabled:opacity-50 flex items-center gap-1.5"
              >
                {deleting ? <Loader2 size={13} className="animate-spin" /> : null}
                Confirm delete
              </button>
            </>
          )}
        </div>
      </div>

      {showSend && (
        <SendEmailModal
          contact={contact}
          onClose={() => setShowSend(false)}
          onSent={() => { loadSends(); onRefresh(contact.id); }}
        />
      )}

      {showEnroll && (
        <EnrollModal
          contact={contact}
          onClose={() => setShowEnroll(false)}
          onEnrolled={() => { loadSends(); onRefresh(contact.id); }}
        />
      )}
    </>
  );
}

// ── Main Tab ───────────────────────────────────────────────────────────────────
export default function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Contact | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('email_contacts')
      .select('*')
      .order('created_at', { ascending: false });
    setContacts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const refreshOne = async (id: string) => {
    const { data } = await supabase.from('email_contacts').select('*').eq('id', id).maybeSingle();
    if (data) setContacts(cs => cs.map(c => c.id === id ? (data as Contact) : c));
    if (selected?.id === id && data) setSelected(data as Contact);
  };

  const activeAutomations = contacts.filter(c => c.automation_active).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-base">Contacts</h2>
          <p className="text-slate-500 text-xs mt-0.5">
            {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
            {activeAutomations > 0 && (
              <span className="ml-2 text-sky-400 font-medium">· {activeAutomations} in sequence</span>
            )}
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold transition-colors"
        >
          <Plus size={14} />Add contact
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={20} className="animate-spin text-teal-400" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Mail size={32} className="text-slate-700 mb-3" />
          <p className="text-slate-400 font-medium">No contacts yet</p>
          <p className="text-slate-600 text-sm mt-1">Add your first prospect to start sending.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {contacts.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="w-full bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-2xl px-5 py-4 flex items-center gap-4 text-left transition-all hover:bg-slate-750 group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-700 group-hover:bg-slate-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm transition-colors">
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="text-white font-semibold text-sm">{c.name}</p>
                  {statusBadge(c.status)}
                  {c.automation_active && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/25 rounded-full px-2 py-px">
                      <Zap size={8} />Auto
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-xs">{c.email}</p>
                {c.business_name && <p className="text-slate-500 text-xs mt-0.5">{c.business_name}</p>}
                {c.automation_active && c.automation_next_send_at ? (
                  <p className="text-sky-500/70 text-[10px] mt-1 flex items-center gap-1">
                    <Clock size={8} />Next email {fmtDate(c.automation_next_send_at)}
                  </p>
                ) : c.current_campaign_id ? (
                  <p className="text-slate-600 text-[10px] mt-1">
                    {campaignLabel(c.current_campaign_id)} · Stage {c.current_stage}
                  </p>
                ) : null}
              </div>
              <ChevronRight size={15} className="text-slate-600 group-hover:text-slate-400 flex-shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      )}

      {showAdd && <AddContactModal onClose={() => setShowAdd(false)} onAdded={load} />}

      {selected && (
        <ContactPanel
          contact={selected}
          onClose={() => setSelected(null)}
          onDeleted={() => { setSelected(null); load(); }}
          onRefresh={refreshOne}
        />
      )}
    </div>
  );
}
