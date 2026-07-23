import { useState } from 'react';
import { Send, Mail, Phone, X, Check, Loader2, ExternalLink } from 'lucide-react';

interface SendLinkModalProps {
  linkName: string;
  linkUrl: string;
  senderName: string;
  onClose: () => void;
}

export default function SendLinkModal({ linkName, linkUrl, senderName, onClose }: SendLinkModalProps) {
  const [channel, setChannel] = useState<'email' | 'sms'>('email');
  const [recipient, setRecipient] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSend() {
    const target = recipient.trim();
    if (!target) return;
    setSending(true);
    setError('');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const endpoint = `${supabaseUrl}/functions/v1/send-share-link`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          to: target,
          channel,
          linkUrl,
          linkName,
          senderName,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error ?? 'Failed to send');
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSending(false);
    }
  }

  const placeholder = channel === 'email'
    ? 'name@example.com'
    : '07700 900000';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
          <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0">
            <Send size={18} className="text-teal-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold text-base">Send share link</h2>
            <p className="text-slate-500 text-xs mt-0.5 truncate">{linkName}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800 flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-teal-500/15 border border-teal-500/25 flex items-center justify-center mx-auto mb-4">
              <Check size={28} className="text-teal-400" />
            </div>
            <p className="text-white font-semibold text-sm mb-1">Link sent!</p>
            <p className="text-slate-500 text-xs">
              Sent via {channel === 'email' ? 'email' : 'SMS'} to {recipient}
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-4">
            {/* Channel toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => { setChannel('email'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  channel === 'email'
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                <Mail size={14} /> Email
              </button>
              <button
                onClick={() => { setChannel('sms'); setError(''); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  channel === 'sms'
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                <Phone size={14} /> SMS
              </button>
            </div>

            {/* Recipient input */}
            <div>
              <label className="text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2">
                {channel === 'email' ? 'Email address' : 'Phone number'}
              </label>
              <input
                type={channel === 'email' ? 'email' : 'tel'}
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !sending) handleSend(); }}
                placeholder={placeholder}
                autoFocus
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors"
              />
            </div>

            {/* Link preview */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5">
                <ExternalLink size={11} className="text-slate-600 flex-shrink-0" />
                <span className="text-slate-500 text-[10px] font-mono truncate">{linkUrl}</span>
              </div>
              <p className="text-slate-600 text-[10px] mt-1">
                Includes your referral tag — any demo booked through this link is attributed to you.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleSend}
                disabled={!recipient.trim() || sending}
                className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                {sending ? (
                  <><Loader2 size={14} className="animate-spin" /> Sending...</>
                ) : (
                  <><Send size={14} /> Send link</>
                )}
              </button>
              <button
                onClick={onClose}
                className="px-4 text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
