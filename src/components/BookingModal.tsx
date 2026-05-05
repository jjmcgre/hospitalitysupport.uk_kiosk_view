import { useState, useEffect } from 'react';
import {
  X, ArrowRight, CheckCircle, Mail, Phone,
  Building2, Users, AlertCircle, Calendar, Clock, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  business_name: string;
  num_sites: string;
  message: string;
}

interface Slot {
  id: string;
  slot_date: string;
  slot_time: string;
  duration_mins: number;
}

const EMPTY: FormData = {
  name: '', email: '', phone: '', business_name: '', num_sites: '1', message: '',
};

type Step = 'details' | 'slot' | 'confirmed';

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
  r.setDate(r.getDate() + (day === 0 ? -6 : 1 - day));
  return r;
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  });
}

function formatDateLong(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [step, setStep] = useState<Step>('details');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Slot picker state
  const [weekBase, setWeekBase] = useState(() => weekStart(new Date()));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekBase, i));
  const today = isoDate(new Date());

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY);
      setStep('details');
      setError('');
      setSelectedSlot(null);
      setBookingId(null);
      setVideoLink(null);
      setWeekBase(weekStart(new Date()));
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  async function loadSlots(base: Date) {
    setSlotsLoading(true);
    const from = isoDate(base);
    const to = isoDate(addDays(base, 6));
    const { data } = await supabase
      .from('demo_availability')
      .select('id, slot_date, slot_time, duration_mins')
      .eq('booked', false)
      .gte('slot_date', from)
      .lte('slot_date', to)
      .gte('slot_date', today)
      .order('slot_date')
      .order('slot_time');
    setSlots(data ?? []);
    setSlotsLoading(false);
  }

  function changeWeek(dir: number) {
    const next = addDays(weekBase, dir * 7);
    setWeekBase(next);
    loadSlots(next);
    setSelectedSlot(null);
  }

  async function handleDetails(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.business_name.trim()) {
      setError('Please fill in your name, email, and business name.');
      return;
    }
    setSubmitting(true);
    const id = crypto.randomUUID();
    await supabase.from('demo_bookings').insert([{
      id,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      business_name: form.business_name.trim(),
      num_sites: form.num_sites,
      message: form.message.trim(),
    }]);
    setBookingId(id);
    setSubmitting(false);
    loadSlots(weekBase);
    setStep('slot');
  }

  async function confirmSlot() {
    if (!selectedSlot || !bookingId) return;
    setSubmitting(true);
    setError('');

    const roomCode = crypto.randomUUID().replace(/-/g, '').slice(0, 10);
    const meetLink = `https://meet.google.com/${roomCode.slice(0, 3)}-${roomCode.slice(3, 7)}-${roomCode.slice(7, 10)}`;

    const { data: rpcResult, error: rpcError } = await supabase.rpc('claim_slot', {
      p_slot_id:    selectedSlot.id,
      p_booking_id: bookingId,
      p_video_link: meetLink,
    });

    if (rpcError || !rpcResult?.ok) {
      const msg = rpcError?.message ?? rpcResult?.error ?? 'Failed to confirm booking. Please try again.';
      setError(`Booking error: ${msg} (slot: ${selectedSlot.id}, booking: ${bookingId})`);
      setSubmitting(false);
      return;
    }

    // Send confirmation emails (fire-and-forget)
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    fetch(`${supabaseUrl}/functions/v1/send-booking-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        to: form.email.trim(),
        name: form.name.trim(),
        businessName: form.business_name.trim(),
        date: selectedSlot.slot_date,
        time: selectedSlot.slot_time,
        duration: selectedSlot.duration_mins,
        videoLink: meetLink,
        adminEmail: 'james@servicesupportgroup.uk',
      }),
    }).catch(() => {});

    setVideoLink(meetLink);
    setSubmitting(false);
    setStep('confirmed');
  }

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  if (!isOpen) return null;

  const slotsThisWeek = weekDays.map(day => ({
    date: isoDate(day),
    slots: slots.filter(s => s.slot_date === isoDate(day)),
  }));

  const hasAnySlots = slotsThisWeek.some(d => d.slots.length > 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeBooking} />

      <div className="relative w-full bg-slate-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col max-w-lg max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8 flex-shrink-0">
          <div>
            {step === 'details' && <>
              <div className="text-white font-black text-lg leading-tight">Book your 30-minute demo</div>
              <div className="text-slate-500 text-xs mt-0.5">Live platform walkthrough. No slides, no sales pitch.</div>
            </>}
            {step === 'slot' && <>
              <div className="text-white font-black text-lg leading-tight">Pick a time</div>
              <div className="text-slate-500 text-xs mt-0.5">Choose an available slot below.</div>
            </>}
            {step === 'confirmed' && <>
              <div className="text-white font-black text-lg leading-tight">You're booked in!</div>
              <div className="text-slate-500 text-xs mt-0.5">See you then, {form.name.split(' ')[0]}.</div>
            </>}
          </div>
          <button
            onClick={closeBooking}
            className="w-8 h-8 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center transition-colors flex-shrink-0 ml-4"
          >
            <X size={15} className="text-slate-400" />
          </button>
        </div>

        {/* Step indicator */}
        {step !== 'confirmed' && (
          <div className="flex px-7 pt-4 pb-0 gap-2 flex-shrink-0">
            {(['details', 'slot'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center border transition-colors ${
                  step === s
                    ? 'bg-teal-500 border-teal-500 text-white'
                    : s === 'details' && step === 'slot'
                    ? 'bg-teal-500/20 border-teal-500/40 text-teal-400'
                    : 'bg-slate-800 border-slate-700 text-slate-600'
                }`}>{i + 1}</div>
                <span className={`text-xs font-semibold ${step === s ? 'text-white' : 'text-slate-600'}`}>
                  {s === 'details' ? 'Your details' : 'Choose a slot'}
                </span>
                {i === 0 && <div className="w-6 h-px bg-slate-700 mx-1" />}
              </div>
            ))}
          </div>
        )}

        {/* ── Step 1: Details ── */}
        {step === 'details' && (
          <form onSubmit={handleDetails} className="overflow-y-auto flex-1 flex flex-col">
            <div className="px-7 py-5 space-y-4 flex-1">
              <div className="bg-teal-500/8 border border-teal-500/20 rounded-2xl p-4">
                <div className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-2">What happens in the demo</div>
                <div className="space-y-1.5">
                  {[
                    'We walk through the platform live — menus, costings, allergens, HACCP',
                    'You see exactly what it does and how fast it works',
                    'No slides. No prep needed. Just the platform, live.',
                  ].map(pt => (
                    <div key={pt} className="flex items-start gap-2">
                      <ArrowRight size={11} className="text-teal-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-xs leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Field label="Your name" required>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="James Smith"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 transition-colors" required />
              </Field>

              <Field label="Email" required icon={<Mail size={14} className="text-slate-600" />}>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="you@yourbusiness.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 transition-colors" required />
              </Field>

              <Field label="Phone" optional icon={<Phone size={14} className="text-slate-600" />}>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="07700 900000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 transition-colors" />
              </Field>

              <Field label="Business / venue name" required icon={<Building2 size={14} className="text-slate-600" />}>
                <input type="text" value={form.business_name} onChange={e => set('business_name', e.target.value)}
                  placeholder="The Crown, Manchester"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 transition-colors" required />
              </Field>

              <Field label="Number of sites / kitchens" icon={<Users size={14} className="text-slate-600" />}>
                <select value={form.num_sites} onChange={e => set('num_sites', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 transition-colors appearance-none">
                  <option value="1" className="bg-slate-900">1 site</option>
                  <option value="2-5" className="bg-slate-900">2–5 sites</option>
                  <option value="6-15" className="bg-slate-900">6–15 sites</option>
                  <option value="16+" className="bg-slate-900">16+ sites</option>
                </select>
              </Field>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Anything you want us to know? <span className="text-slate-600 font-normal normal-case">(optional)</span>
                </label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)}
                  placeholder="Your biggest pain point, current systems, what you'd like to see..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 transition-colors resize-none" />
              </div>

              {error && <ErrorBox msg={error} />}
            </div>

            <div className="px-7 pb-7 pt-4 border-t border-white/5 flex-shrink-0">
              <button type="submit" disabled={submitting}
                className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-60 transition-colors rounded-2xl py-4 flex items-center justify-center gap-2 font-black text-white text-base">
                Next: choose a time <ArrowRight size={16} />
              </button>
              <div className="text-center mt-3 text-slate-600 text-xs">
                Or email:{' '}
                <a href="mailto:james@servicesupportgroup.uk" className="text-teal-500 hover:text-teal-400 transition-colors">
                  james@servicesupportgroup.uk
                </a>
              </div>
            </div>
          </form>
        )}

        {/* ── Step 2: Slot picker ── */}
        {step === 'slot' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-7 py-5 space-y-4">

              {/* Week navigator */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => changeWeek(-1)}
                  disabled={isoDate(weekBase) <= today}
                  className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <div className="text-center">
                  <div className="text-white font-bold text-sm">
                    {weekDays[0].toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    {' — '}
                    {weekDays[6].toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <button
                  onClick={() => changeWeek(1)}
                  className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>

              {slotsLoading ? (
                <div className="text-center py-12 text-slate-500 text-sm">Loading available slots…</div>
              ) : !hasAnySlots ? (
                <div className="text-center py-12 space-y-2">
                  <Calendar size={28} className="text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm font-semibold">No slots available this week</p>
                  <p className="text-slate-600 text-xs">Try the next week using the arrow above.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {slotsThisWeek.filter(d => d.slots.length > 0).map(({ date, slots: daySlots }, i) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={12} className="text-teal-400" />
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                          {DAY_LABELS[new Date(date + 'T00:00:00').getDay() === 0 ? 6 : new Date(date + 'T00:00:00').getDay() - 1]}
                          {' · '}{formatDateShort(date)}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {daySlots.map(slot => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`rounded-xl py-2.5 px-3 text-sm font-bold border transition-all flex items-center justify-center gap-1.5 ${
                              selectedSlot?.id === slot.id
                                ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-white'
                            }`}
                          >
                            <Clock size={11} />
                            {slot.slot_time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected slot summary */}
              {selectedSlot && (
                <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <CheckCircle size={16} className="text-teal-400 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm font-bold">{formatDateLong(selectedSlot.slot_date)}</div>
                    <div className="text-teal-300 text-xs">{selectedSlot.slot_time} · {selectedSlot.duration_mins} minutes</div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-7 pb-7 pt-4 border-t border-white/5 flex-shrink-0 space-y-3">
              {error && <ErrorBox msg={error} />}
              <button
                onClick={confirmSlot}
                disabled={!selectedSlot || submitting}
                className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-40 transition-colors rounded-2xl py-4 flex items-center justify-center gap-2 font-black text-white text-base"
              >
                Confirm booking <CheckCircle size={16} />
              </button>
              <button
                onClick={() => setStep('details')}
                className="w-full text-slate-500 hover:text-slate-300 text-sm transition-colors py-1"
              >
                ← Back to your details
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Confirmed ── */}
        {step === 'confirmed' && (
          <div className="flex-1 flex flex-col px-7 py-8 text-center items-center justify-center gap-5 overflow-y-auto">
            <div className="w-20 h-20 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <CheckCircle size={40} className="text-teal-400" />
            </div>
            <div>
              <div className="text-white font-black text-2xl mb-2">Demo booked!</div>
              <div className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                A confirmation email has been sent to{' '}
                <span className="text-white font-semibold">{form.email}</span>. Your video call link will be sent closer to the date.
              </div>
            </div>

            {selectedSlot && (
              <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 w-full max-w-xs text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Date</span>
                  <span className="text-white font-semibold">{formatDateLong(selectedSlot.slot_date)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Time</span>
                  <span className="text-white font-semibold">{selectedSlot.slot_time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Duration</span>
                  <span className="text-white font-semibold">{selectedSlot.duration_mins} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Business</span>
                  <span className="text-white font-semibold">{form.business_name}</span>
                </div>
              </div>
            )}

            <button
              onClick={closeBooking}
              className="w-full max-w-xs bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300 font-semibold rounded-2xl py-3 text-sm"
            >
              Close
            </button>
            <div className="text-slate-600 text-xs">
              Questions?{' '}
              <a href="mailto:james@servicesupportgroup.uk" className="text-teal-500 hover:text-teal-400 transition-colors">
                james@servicesupportgroup.uk
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, optional, icon, children }: {
  label: string; required?: boolean; optional?: boolean;
  icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-teal-400 ml-1">*</span>}
        {optional && <span className="text-slate-600 font-normal normal-case ml-1">(optional)</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</div>}
        {children}
      </div>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm flex items-start gap-2">
      <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />{msg}
    </div>
  );
}
