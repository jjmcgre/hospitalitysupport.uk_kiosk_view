import { useState, useEffect } from 'react';
import { Plus, Trash2, Mail, Send, CheckCircle, XCircle, AlertCircle, Loader2, UserPlus, X } from 'lucide-react';
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
}

interface SendState {
  contactId: string;
  loading: boolean;
  success: boolean;
  error: string;
}

function statusBadge(status: string) {
  if (status === 'unsubscribed') return <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/25 rounded-full px-2 py-px">Unsub</span>;
  if (status === 'bounced') return <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/25 rounded-full px-2 py-px">Bounced</span>;
  return <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/25 rounded-full px-2 py-px">Active</span>;
}

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
    onAdded();
    onClose();
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
              <textarea
                rows={2}
                value={form[field]}
                onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500 resize-none"
                placeholder="Optional notes..."
              />
            ) : (
              <input
                type={field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                placeholder={field === 'email' ? 'name@business.com' : ''}
              />
            )}
          </div>
        ))}
        {err && <p className="text-rose-400 text-xs">{err}</p>}
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-all">Cancel</button>
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
            Add contact
          </button>
        </div>
      </div>
    </div>
  );
}

function SendEmailModal({ contact, onClose }: { contact: Contact; onClose: () => void }) {
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
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
      const resp = await fetch(`${supabaseUrl}/functions/v1/send-campaign-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          contactId: contact.id,
          campaignId: selectedCampaignId,
          emailId: selectedEmail.id,
          stage: selectedEmail.stageNum,
          subject: selectedEmail.subject,
          body: selectedEmail.body,
          cta: selectedEmail.cta,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || data.error) {
        setResult({ ok: false, msg: data.error ?? 'Failed to send' });
      } else {
        setResult({ ok: true, msg: `Sent to ${contact.email}` });
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

        {/* Campaign picker */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Campaign</label>
          <div className="space-y-1.5">
            {campaigns.map(c => (
              <button
                key={c.id}
                onClick={() => { setSelectedCampaignId(c.id); setSelectedEmailId(null); }}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  selectedCampaignId === c.id
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                <span className="font-semibold">{c.label}</span>
                <span className="text-[11px] block opacity-60 mt-0.5">{c.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Email picker */}
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Select email to send</label>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {allEmails.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedEmailId(e.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                  selectedEmailId === e.id
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
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
            <button
              onClick={send}
              disabled={sending || !selectedEmail}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              Send email
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [sendTarget, setSendTarget] = useState<Contact | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sendState] = useState<SendState | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('email_contacts').select('*').order('created_at', { ascending: false });
    setContacts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deleteContact = async (id: string) => {
    setDeletingId(id);
    await supabase.from('email_contacts').delete().eq('id', id);
    setContacts(c => c.filter(x => x.id !== id));
    setDeletingId(null);
  };

  const campaignLabel = (id: string) => campaigns.find(c => c.id === id)?.label ?? id;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-base">Contacts</h2>
          <p className="text-slate-500 text-xs mt-0.5">{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold transition-colors"
        >
          <Plus size={14} />
          Add contact
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><Loader2 size={20} className="animate-spin text-teal-400" /></div>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Mail size={32} className="text-slate-700 mb-3" />
          <p className="text-slate-400 font-medium">No contacts yet</p>
          <p className="text-slate-600 text-sm mt-1">Add your first prospect to start sending.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {contacts.map(c => (
            <div key={c.id} className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <p className="text-white font-semibold text-sm">{c.name}</p>
                  {statusBadge(c.status)}
                </div>
                <p className="text-slate-400 text-xs">{c.email}</p>
                {c.business_name && <p className="text-slate-500 text-xs mt-0.5">{c.business_name}</p>}
                {c.current_campaign_id && (
                  <p className="text-slate-600 text-[10px] mt-1">
                    {campaignLabel(c.current_campaign_id)} · Stage {c.current_stage}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setSendTarget(c)}
                  disabled={c.status !== 'active'}
                  title="Send email"
                  className="p-2 rounded-lg text-slate-500 hover:text-teal-400 hover:bg-teal-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send size={15} />
                </button>
                <button
                  onClick={() => deleteContact(c.id)}
                  disabled={deletingId === c.id}
                  title="Delete contact"
                  className="p-2 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                >
                  {deletingId === c.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {sendState && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${sendState.success ? 'bg-teal-500 text-slate-950' : sendState.error ? 'bg-rose-500 text-white' : 'bg-slate-800 text-white border border-slate-700'}`}>
          {sendState.loading && <Loader2 size={14} className="animate-spin" />}
          {sendState.success && <CheckCircle size={14} />}
          {sendState.error && <AlertCircle size={14} />}
          {sendState.loading ? 'Sending...' : sendState.success ? 'Sent!' : sendState.error}
        </div>
      )}

      {showAdd && <AddContactModal onClose={() => setShowAdd(false)} onAdded={load} />}
      {sendTarget && <SendEmailModal contact={sendTarget} onClose={() => { setSendTarget(null); load(); }} />}

      {/* suppress unused import */}
      <span className="hidden"><AlertCircle size={1} /></span>
    </div>
  );
}
