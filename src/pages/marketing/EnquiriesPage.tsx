import { useEffect, useState } from 'react';
import { Mail, Phone, Building2, Users, MessageSquare, Clock, RefreshCw, Inbox } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import PageHeader from './components/PageHeader';

const GOOGLE_CAL_LINK = 'https://calendar.app.google/qFyf25dnZVdiX5BW6';

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  num_sites: string;
  message: string;
  created_at: string;
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
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

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

  useEffect(() => { load(); }, []);

  const sitesLabel: Record<string, string> = {
    '1': '1 site',
    '2-5': '2–5 sites',
    '6-15': '6–15 sites',
    '16+': '16+ sites',
  };

  return (
    <div className="min-h-full">
      <PageHeader
        title="Demo Enquiries"
        subtitle="Every request-a-demo submission from the landing page, in real time."
        badge="Live Data"
      />

      <div className="px-4 py-6 sm:p-8">
        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total enquiries', val: enquiries.length },
            { label: '1-site venues', val: enquiries.filter(e => e.num_sites === '1').length },
            { label: 'Multi-site groups', val: enquiries.filter(e => ['2-5','6-15','16+'].includes(e.num_sites)).length },
            { label: 'With message', val: enquiries.filter(e => e.message?.trim()).length },
          ].map(s => (
            <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-center">
              <div className="text-3xl font-black text-teal-400 mb-1">{s.val}</div>
              <div className="text-slate-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-base">All submissions</h2>
          <button
            onClick={load}
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
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

        {!loading && !error && enquiries.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            <Inbox size={36} className="mx-auto mb-4 opacity-40" />
            <p className="font-semibold">No enquiries yet</p>
            <p className="text-xs mt-1">Submissions from the landing page will appear here instantly.</p>
          </div>
        )}

        {!loading && enquiries.length > 0 && (
          <div className="space-y-3">
            {enquiries.map(eq => (
              <div
                key={eq.id}
                className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden"
              >
                {/* Row summary */}
                <button
                  onClick={() => setExpanded(expanded === eq.id ? null : eq.id)}
                  className="w-full text-left px-6 py-4 flex items-center gap-4 hover:bg-slate-700/40 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0 text-teal-400 font-black text-sm">
                    {eq.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-white font-bold text-sm">{eq.name}</span>
                      <span className="text-slate-400 text-xs truncate">{eq.business_name}</span>
                      {eq.num_sites && (
                        <span className="text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/25 rounded-full px-2 py-0.5">
                          {sitesLabel[eq.num_sites] ?? eq.num_sites}
                        </span>
                      )}
                      {eq.message?.trim() && (
                        <span className="text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/25 rounded-full px-2 py-0.5">
                          Has message
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Mail size={10} />{eq.email}</span>
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

                {/* Expanded detail */}
                {expanded === eq.id && (
                  <div className="px-6 pb-5 border-t border-slate-700 pt-4 grid sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail size={14} className="text-teal-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Email</div>
                          <a href={`mailto:${eq.email}`} className="text-teal-400 hover:text-teal-300 text-sm transition-colors">{eq.email}</a>
                        </div>
                      </div>
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
                          <div className="text-white text-sm">{sitesLabel[eq.num_sites] ?? eq.num_sites}</div>
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
                        <a
                          href={`mailto:${eq.email}?subject=Your HospitalitySupport.uk Demo&body=Hi ${eq.name.split(' ')[0]},%0A%0AThanks for your interest in HospitalitySupport.uk — I'd love to show you the platform live.%0A%0APlease use the link below to pick a time that works for you:%0A%0A${GOOGLE_CAL_LINK}%0A%0ABest regards,%0AJames`}
                          className="flex-1 text-center bg-teal-500 hover:bg-teal-400 transition-colors text-white text-xs font-bold py-2.5 rounded-xl"
                        >
                          Reply via email
                        </a>
                        {eq.phone && (
                          <a
                            href={`tel:${eq.phone}`}
                            className="flex-1 text-center bg-slate-700 hover:bg-slate-600 transition-colors text-white text-xs font-bold py-2.5 rounded-xl"
                          >
                            Call
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
