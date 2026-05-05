import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, User, Check, Trash2, RefreshCw, Calendar, ExternalLink, Mail, Phone, Building2, Users, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import PageHeader from './components/PageHeader';

const GOOGLE_CAL_LINK = 'https://calendar.app.google/qFyf25dnZVdiX5BW6';

interface Slot {
  id: string;
  slot_date: string;
  slot_time: string;
  duration_mins: number;
  booked: boolean;
  booked_by_booking_id: string | null;
  notes: string;
}

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

const TIMES = [
  '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30',
];

function formatDateDisplay(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function weekStart(d: Date) {
  const r = new Date(d);
  const day = r.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  r.setDate(r.getDate() + diff);
  return r;
}

const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function DiaryPage() {
  const [weekBase, setWeekBase] = useState(() => weekStart(new Date()));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<{ date: string; time: string } | null>(null);
  const [newNotes, setNewNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'enquiries'>('calendar');
  const [expandedEnquiry, setExpandedEnquiry] = useState<string | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekBase, i));

  async function load() {
    setLoading(true);
    const from = isoDate(weekBase);
    const to = isoDate(addDays(weekBase, 6));

    const [slotsRes, enqRes] = await Promise.all([
      supabase
        .from('demo_availability')
        .select('*')
        .gte('slot_date', from)
        .lte('slot_date', to)
        .order('slot_date')
        .order('slot_time'),
      supabase
        .from('demo_bookings')
        .select('*')
        .order('created_at', { ascending: false }),
    ]);

    setSlots(slotsRes.data ?? []);
    setEnquiries(enqRes.data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [weekBase]);

  async function addSlot() {
    if (!adding) return;
    setSaving(true);
    await supabase.from('demo_availability').insert([{
      slot_date: adding.date,
      slot_time: adding.time,
      notes: newNotes.trim(),
    }]);
    setSaving(false);
    setAdding(null);
    setNewNotes('');
    load();
  }

  async function toggleBooked(slot: Slot) {
    await supabase
      .from('demo_availability')
      .update({ booked: !slot.booked })
      .eq('id', slot.id);
    load();
  }

  async function deleteSlot(id: string) {
    await supabase.from('demo_availability').delete().eq('id', id);
    setSelectedSlot(null);
    load();
  }

  function slotsForDay(dateStr: string) {
    return slots.filter(s => s.slot_date === dateStr);
  }

  function enquiryFor(bookingId: string | null) {
    if (!bookingId) return null;
    return enquiries.find(e => e.id === bookingId) ?? null;
  }

  const today = isoDate(new Date());

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  const sitesLabel: Record<string, string> = {
    '1': '1 site', '2-5': '2–5 sites', '6-15': '6–15 sites', '16+': '16+ sites',
  };

  return (
    <div className="min-h-full">
      <PageHeader
        title="Demo Diary"
        subtitle="Book demos, manage slots, and track every enquiry in one place."
        badge="Live Calendar"
      />

      <div className="px-4 py-6 sm:p-8 space-y-6">

        {/* Tab switcher */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-1.5 flex gap-1.5">
          {([
            { id: 'calendar', label: 'Calendar & Slots', icon: <Calendar size={14} /> },
            { id: 'enquiries', label: `Enquiries${enquiries.length > 0 ? ` (${enquiries.length})` : ''}`, icon: <MessageSquare size={14} /> },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-700 text-white border border-slate-500 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/40 border border-transparent'
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* ── CALENDAR TAB ── */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">

            {/* Google Calendar booking embed */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-teal-400" />
                    <span className="text-white font-bold text-sm">Google Calendar — Demo Booking Page</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">This is your live booking page. Prospects pick a slot directly here.</p>
                </div>
                <a
                  href={GOOGLE_CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors border border-teal-500/30 rounded-xl px-3 py-1.5 flex-shrink-0"
                >
                  Open <ExternalLink size={11} />
                </a>
              </div>
              <div className="relative" style={{ height: '640px' }}>
                <iframe
                  src={GOOGLE_CAL_LINK}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title="Book a demo"
                  allow="camera; microphone"
                />
              </div>
            </div>

            {/* Week navigator */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setWeekBase(w => addDays(w, -7))}
            className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="text-center">
            <div className="text-white font-bold text-base">
              {weekDays[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              {' — '}
              {weekDays[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <button
              onClick={() => setWeekBase(weekStart(new Date()))}
              className="text-teal-400 text-xs hover:text-teal-300 transition-colors mt-0.5"
            >
              Back to this week
            </button>
          </div>
          <button
            onClick={() => setWeekBase(w => addDays(w, 7))}
            className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-3 rounded bg-teal-500/25 border border-teal-500/40 inline-block" />Available</span>
          <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-3 rounded bg-amber-500/25 border border-amber-500/40 inline-block" />Booked</span>
          <button onClick={load} className="ml-auto flex items-center gap-1.5 text-slate-500 hover:text-teal-400 transition-colors">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />Refresh
          </button>
        </div>

        {/* 7-column grid */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, i) => {
            const ds = isoDate(day);
            const daySlots = slotsForDay(ds);
            const isToday = ds === today;
            const isPast = ds < today;

            return (
              <div
                key={ds}
                className={`rounded-2xl border min-h-[120px] flex flex-col ${
                  isToday
                    ? 'border-teal-500/50 bg-teal-500/5'
                    : isPast
                    ? 'border-white/5 bg-slate-900/30 opacity-60'
                    : 'border-slate-700 bg-slate-800'
                }`}
              >
                {/* Day header */}
                <div className={`px-2 py-2 border-b text-center ${isToday ? 'border-teal-500/30' : 'border-slate-700'}`}>
                  <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{DAY_LABELS[i]}</div>
                  <div className={`text-base font-black leading-none mt-0.5 ${isToday ? 'text-teal-400' : isPast ? 'text-slate-600' : 'text-white'}`}>
                    {day.getDate()}
                  </div>
                </div>

                {/* Slots */}
                <div className="flex-1 p-1.5 space-y-1 overflow-y-auto max-h-48">
                  {daySlots.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full text-left rounded-lg px-2 py-1.5 text-[10px] font-bold border transition-colors ${
                        slot.booked
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                          : 'bg-teal-500/15 border-teal-500/30 text-teal-300 hover:bg-teal-500/25'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <Clock size={8} />
                        {slot.slot_time}
                      </div>
                      {slot.booked && <div className="text-[9px] text-amber-400/70 mt-0.5">Booked</div>}
                    </button>
                  ))}
                </div>

                {/* Add slot */}
                {!isPast && (
                  <button
                    onClick={() => { setAdding({ date: ds, time: '10:00' }); setNewNotes(''); }}
                    className="m-1.5 py-1 rounded-lg border border-dashed border-slate-600 hover:border-teal-500/50 hover:text-teal-400 text-slate-600 text-[10px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <Plus size={10} />Add
                  </button>
                )}
              </div>
            );
          })}
        </div>

            {/* Upcoming booked list */}
            <div>
              <h2 className="text-white font-bold text-base mb-4">Upcoming booked demos</h2>
              {slots.filter(s => s.booked && s.slot_date >= today).length === 0 ? (
                <p className="text-slate-600 text-sm">No booked demos this week.</p>
              ) : (
                <div className="space-y-3">
                  {slots
                    .filter(s => s.booked && s.slot_date >= today)
                    .map(slot => {
                      const enq = enquiryFor(slot.booked_by_booking_id);
                      return (
                        <div key={slot.id} className="bg-slate-800 border border-amber-500/30 rounded-2xl px-5 py-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                            <User size={16} className="text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-bold text-sm">{formatDateDisplay(slot.slot_date)} at {slot.slot_time}</div>
                            {enq && <div className="text-slate-400 text-xs mt-0.5">{enq.name} · {enq.business_name} · {enq.email}</div>}
                            {!enq && <div className="text-slate-600 text-xs mt-0.5">No linked enquiry</div>}
                            {slot.notes && <div className="text-slate-500 text-xs mt-0.5 italic">{slot.notes}</div>}
                          </div>
                          <button
                            onClick={() => toggleBooked(slot)}
                            className="text-xs text-slate-500 hover:text-teal-400 transition-colors flex items-center gap-1"
                          >
                            <Check size={12} />Mark free
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ── ENQUIRIES TAB ── */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Total', val: enquiries.length },
                { label: '1-site venues', val: enquiries.filter(e => e.num_sites === '1').length },
                { label: 'Multi-site', val: enquiries.filter(e => ['2-5','6-15','16+'].includes(e.num_sites)).length },
                { label: 'With message', val: enquiries.filter(e => e.message?.trim()).length },
              ].map(s => (
                <div key={s.label} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black text-teal-400 mb-0.5">{s.val}</div>
                  <div className="text-slate-500 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-sm">All enquiries</h2>
              <button onClick={load} className="flex items-center gap-1.5 text-slate-500 hover:text-teal-400 transition-colors text-xs">
                <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />Refresh
              </button>
            </div>

            {loading && (
              <div className="text-center py-16 text-slate-500">
                <RefreshCw size={20} className="animate-spin mx-auto mb-3" />Loading…
              </div>
            )}

            {!loading && enquiries.length === 0 && (
              <div className="text-center py-16 text-slate-600">
                <MessageSquare size={32} className="mx-auto mb-3 opacity-40" />
                <p className="font-semibold text-sm">No enquiries yet</p>
                <p className="text-xs mt-1">Submissions from the booking modal will appear here.</p>
              </div>
            )}

            {!loading && enquiries.length > 0 && (
              <div className="space-y-3">
                {enquiries.map(eq => (
                  <div key={eq.id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedEnquiry(expandedEnquiry === eq.id ? null : eq.id)}
                      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-slate-700/40 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0 text-teal-400 font-black text-sm">
                        {eq.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
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
                          <span className="flex items-center gap-1"><Mail size={9} />{eq.email}</span>
                          {eq.phone && <span className="flex items-center gap-1"><Phone size={9} />{eq.phone}</span>}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-slate-500 text-[10px]">{timeAgo(eq.created_at)}</div>
                        <div className={`text-slate-500 mt-1 transition-transform ${expandedEnquiry === eq.id ? 'rotate-180' : ''}`}>▾</div>
                      </div>
                    </button>

                    {expandedEnquiry === eq.id && (
                      <div className="px-5 pb-5 border-t border-slate-700 pt-4 grid sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Mail size={13} className="text-teal-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Email</div>
                              <a href={`mailto:${eq.email}`} className="text-teal-400 hover:text-teal-300 text-sm transition-colors">{eq.email}</a>
                            </div>
                          </div>
                          {eq.phone && (
                            <div className="flex items-start gap-3">
                              <Phone size={13} className="text-teal-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Phone</div>
                                <a href={`tel:${eq.phone}`} className="text-white text-sm hover:text-teal-300 transition-colors">{eq.phone}</a>
                              </div>
                            </div>
                          )}
                          <div className="flex items-start gap-3">
                            <Building2 size={13} className="text-teal-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Business</div>
                              <div className="text-white text-sm">{eq.business_name}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users size={13} className="text-teal-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Sites</div>
                              <div className="text-white text-sm">{sitesLabel[eq.num_sites] ?? eq.num_sites}</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          {eq.message?.trim() ? (
                            <div className="flex items-start gap-3 mb-4">
                              <MessageSquare size={13} className="text-teal-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Message</div>
                                <div className="text-slate-300 text-sm leading-relaxed bg-slate-900/60 rounded-xl p-3 border border-slate-700">{eq.message}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-slate-600 text-xs italic mb-4">No message provided.</div>
                          )}
                          <div className="flex gap-2">
                            <a
                              href={`mailto:${eq.email}?subject=Your HospitalitySupport.uk Demo&body=Hi ${eq.name.split(' ')[0]},%0A%0AThanks for your interest in HospitalitySupport.uk — I'd love to show you the platform live.%0A%0APlease use the link below to pick a time that works for you:%0A%0A${GOOGLE_CAL_LINK}%0A%0ABest regards,%0AJames`}
                              className="flex-1 text-center bg-teal-500 hover:bg-teal-400 transition-colors text-white text-xs font-bold py-2.5 rounded-xl"
                            >
                              Reply + booking link
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
        )}

      </div>

      {/* Add slot modal */}
      {adding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setAdding(null)} />
          <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Add available slot</h3>
              <button onClick={() => setAdding(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="mb-4">
              <div className="text-slate-400 text-xs mb-1">{formatDateDisplay(adding.date)}</div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Time</label>
              <select
                value={adding.time}
                onChange={e => setAdding(a => a ? { ...a, time: e.target.value } : null)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500/50"
              >
                {TIMES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
              </select>
            </div>
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Notes (optional)</label>
              <input
                type="text"
                value={newNotes}
                onChange={e => setNewNotes(e.target.value)}
                placeholder="e.g. prefer morning calls"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-teal-500/50 placeholder-slate-600"
              />
            </div>
            <button
              onClick={addSlot}
              disabled={saving}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-60 transition-colors text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 text-sm"
            >
              {saving ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
              Add slot
            </button>
          </div>
        </div>
      )}

      {/* Slot detail modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedSlot(null)} />
          <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold">Slot detail</h3>
              <button onClick={() => setSelectedSlot(null)} className="text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3 mb-5">
              <div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Date & time</div>
                <div className="text-white text-sm font-semibold">{formatDateDisplay(selectedSlot.slot_date)} at {selectedSlot.slot_time}</div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Status</div>
                <div className={`text-sm font-bold ${selectedSlot.booked ? 'text-amber-400' : 'text-teal-400'}`}>
                  {selectedSlot.booked ? 'Booked' : 'Available'}
                </div>
              </div>
              {selectedSlot.notes && (
                <div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-0.5">Notes</div>
                  <div className="text-slate-300 text-sm">{selectedSlot.notes}</div>
                </div>
              )}
              {selectedSlot.booked && enquiryFor(selectedSlot.booked_by_booking_id) && (
                <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3">
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Booked by</div>
                  {(() => {
                    const e = enquiryFor(selectedSlot.booked_by_booking_id)!;
                    return (
                      <div>
                        <div className="text-white text-sm font-semibold">{e.name}</div>
                        <div className="text-slate-400 text-xs">{e.business_name}</div>
                        <a href={`mailto:${e.email}`} className="text-teal-400 text-xs hover:text-teal-300">{e.email}</a>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleBooked(selectedSlot)}
                className="flex-1 bg-teal-500 hover:bg-teal-400 transition-colors text-white font-bold text-sm rounded-xl py-2.5 flex items-center justify-center gap-1.5"
              >
                <Check size={13} />
                {selectedSlot.booked ? 'Mark available' : 'Mark booked'}
              </button>
              <button
                onClick={() => deleteSlot(selectedSlot.id)}
                className="w-10 bg-red-500/15 hover:bg-red-500/25 border border-red-500/25 transition-colors text-red-400 rounded-xl flex items-center justify-center"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
