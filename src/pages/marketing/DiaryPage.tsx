import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, User, Check, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import PageHeader from './components/PageHeader';

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
  business_name: string;
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
        .select('id, name, email, business_name'),
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

  return (
    <div className="min-h-full">
      <PageHeader
        title="Demo Diary"
        subtitle="Manage your available demo slots and see what's booked."
        badge="Live Calendar"
      />

      <div className="p-8">
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
        <div className="mt-10">
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
