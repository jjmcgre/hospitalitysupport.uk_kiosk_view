import { useState, useEffect } from 'react';
import {
  X, ArrowRight, CheckCircle, Loader2, Mail, Phone,
  Building2, Users, ChevronLeft, ChevronRight, Clock, AlertCircle,
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
}

const EMPTY: FormData = {
  name: '', email: '', phone: '', business_name: '', num_sites: '1', message: '',
};

function isoDate(d: Date) { return d.toISOString().slice(0, 10); }
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }

function groupByDate(slots: Slot[]): Record<string, Slot[]> {
  return slots.reduce((acc, s) => {
    (acc[s.slot_date] = acc[s.slot_date] ?? []).push(s);
    return acc;
  }, {} as Record<string, Slot[]>);
}

function friendlyDate(ds: string) {
  const d = new Date(ds + 'T00:00:00');
  const today = isoDate(new Date());
  const tomorrow = isoDate(addDays(new Date(), 1));
  if (ds === today) return 'Today';
  if (ds === tomorrow) return 'Tomorrow';
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

type Step = 'details' | 'slots' | 'confirmed';

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [step, setStep] = useState<Step>('details');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY);
      setStep('details');
      setError('');
      setSelectedSlot(null);
      setSelectedDate(null);
      setSlots([]);
      setBookingId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  async function loadSlots() {
    setSlotsLoading(true);
    const from = isoDate(new Date());
    const to = isoDate(addDays(new Date(), 60));
    const { data } = await supabase
      .from('demo_availability')
      .select('id, slot_date, slot_time')
      .eq('booked', false)
      .gte('slot_date', from)
      .lte('slot_date', to)
      .order('slot_date')
      .order('slot_time');
    setSlots(data ?? []);
    if (data && data.length > 0) setSelectedDate(data[0].slot_date);
    setSlotsLoading(false);
  }

  if (!isOpen) return null;

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleDetails(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.business_name.trim()) {
      setError('Please fill in your name, email, and business name.');
      return;
    }
    await loadSlots();
    setStep('slots');
  }

  async function handleConfirm() {
    if (!selectedSlot) return;
    setError('');
    setSubmitting(true);

    const { data: inserted, error: dbError } = await supabase
      .from('demo_bookings')
      .insert([{
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        business_name: form.business_name.trim(),
        num_sites: form.num_sites,
        message: form.message.trim(),
      }])
      .select('id')
      .single();

    if (dbError || !inserted) {
      setError('Something went wrong saving your details. Please try again.');
      setSubmitting(false);
      return;
    }

    await supabase
      .from('demo_availability')
      .update({ booked: true, booked_by_booking_id: inserted.id })
      .eq('id', selectedSlot.id);

    setBookingId(inserted.id);
    setSubmitting(false);
    setStep('confirmed');
  }

  const grouped = groupByDate(slots);
  const dates = Object.keys(grouped).sort();
  const slotsForDate = selectedDate ? (grouped[selectedDate] ?? []) : [];

  // Date navigation
  const dateIndex = selectedDate ? dates.indexOf(selectedDate) : 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeBooking} />

      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8 flex-shrink-0">
          <div>
            {step === 'details' && (
              <>
                <div className="text-white font-black text-lg leading-tight">Book your 30-minute demo</div>
                <div className="text-slate-500 text-xs mt-0.5">Live platform walkthrough. No slides, no sales pitch.</div>
              </>
            )}
            {step === 'slots' && (
              <>
                <div className="text-white font-black text-lg leading-tight">Pick a time</div>
                <div className="text-slate-500 text-xs mt-0.5">Choose a slot that works for you.</div>
              </>
            )}
            {step === 'confirmed' && (
              <>
                <div className="text-white font-black text-lg leading-tight">Demo booked!</div>
                <div className="text-slate-500 text-xs mt-0.5">See you then, {form.name.split(' ')[0]}.</div>
              </>
            )}
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
            {(['details', 'slots'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center border transition-colors ${
                  step === s
                    ? 'bg-teal-500 border-teal-500 text-white'
                    : s === 'details' && step === 'slots'
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
              <button type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 transition-colors rounded-2xl py-4 flex items-center justify-center gap-2 font-black text-white text-base">
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
        {step === 'slots' && (
          <div className="overflow-y-auto flex-1 flex flex-col">
            <div className="px-7 py-5 flex-1">
              {slotsLoading ? (
                <div className="py-16 flex flex-col items-center gap-3 text-slate-500">
                  <Loader2 size={24} className="animate-spin text-teal-400" />
                  <span className="text-sm">Loading available times…</span>
                </div>
              ) : dates.length === 0 ? (
                <div className="py-12 flex flex-col items-center gap-3 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                    <AlertCircle size={20} className="text-amber-400" />
                  </div>
                  <div className="text-white font-bold text-base">No slots available right now</div>
                  <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                    We don't have any open times at the moment. Drop us an email and we'll find something that works.
                  </p>
                  <a href="mailto:james@servicesupportgroup.uk"
                    className="mt-2 bg-teal-500 hover:bg-teal-400 transition-colors text-white font-bold rounded-xl px-6 py-2.5 text-sm">
                    Email us directly
                  </a>
                </div>
              ) : (
                <>
                  {/* Date carousel */}
                  <div className="flex items-center gap-2 mb-5">
                    <button
                      onClick={() => setSelectedDate(dates[Math.max(0, dateIndex - 1)])}
                      disabled={dateIndex === 0}
                      className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <div className="flex-1 overflow-x-auto flex gap-2 pb-1 scrollbar-none">
                      {dates.map(d => (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`flex-shrink-0 rounded-xl px-3 py-2 text-center transition-all border ${
                            selectedDate === d
                              ? 'bg-teal-500 border-teal-500 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-teal-500/40 hover:text-white'
                          }`}
                        >
                          <div className="text-[10px] font-bold uppercase tracking-widest leading-none mb-0.5">
                            {friendlyDate(d).split(' ')[0]}
                          </div>
                          <div className="text-sm font-black leading-none">
                            {new Date(d + 'T00:00:00').getDate()}
                          </div>
                          <div className="text-[10px] leading-none mt-0.5">
                            {new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { month: 'short' })}
                          </div>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedDate(dates[Math.min(dates.length - 1, dateIndex + 1)])}
                      disabled={dateIndex === dates.length - 1}
                      className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-slate-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Selected date label */}
                  {selectedDate && (
                    <div className="text-slate-400 text-xs mb-3 font-semibold">
                      {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                  )}

                  {/* Time slots grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {slotsForDate.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(s => s?.id === slot.id ? null : slot)}
                        className={`rounded-xl border px-3 py-3 text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                          selectedSlot?.id === slot.id
                            ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-white'
                        }`}
                      >
                        <Clock size={12} />
                        {slot.slot_time}
                      </button>
                    ))}
                  </div>

                  {error && <div className="mt-4"><ErrorBox msg={error} /></div>}
                </>
              )}
            </div>

            {dates.length > 0 && (
              <div className="px-7 pb-7 pt-4 border-t border-white/5 flex-shrink-0 space-y-2">
                {selectedSlot && (
                  <div className="bg-teal-500/8 border border-teal-500/20 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm text-teal-300 font-semibold">
                    <Clock size={13} />
                    {friendlyDate(selectedSlot.slot_date)} at {selectedSlot.slot_time}
                  </div>
                )}
                <button
                  onClick={handleConfirm}
                  disabled={!selectedSlot || submitting}
                  className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-2xl py-4 flex items-center justify-center gap-2 font-black text-white text-base"
                >
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> Confirming…</> : 'Confirm booking'}
                </button>
                <button
                  onClick={() => setStep('details')}
                  className="w-full bg-transparent text-slate-500 hover:text-slate-300 text-sm py-2 transition-colors"
                >
                  ← Back to your details
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Step 3: Confirmed ── */}
        {step === 'confirmed' && selectedSlot && (
          <div className="flex-1 flex flex-col px-7 py-10 text-center items-center justify-center gap-6">
            <div className="w-20 h-20 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <CheckCircle size={40} className="text-teal-400" />
            </div>
            <div>
              <div className="text-white font-black text-2xl mb-2">You're booked in!</div>
              <div className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-4">
                We'll see you on{' '}
                <span className="text-white font-semibold">
                  {new Date(selectedSlot.slot_date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>{' '}
                at <span className="text-white font-semibold">{selectedSlot.slot_time}</span>.
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-left max-w-xs mx-auto">
                <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">Confirmation sent to</div>
                <div className="text-teal-400 text-sm font-semibold">{form.email}</div>
                <div className="text-slate-400 text-xs mt-1">{form.business_name}</div>
              </div>
            </div>
            <button
              onClick={closeBooking}
              className="w-full max-w-xs bg-teal-500 hover:bg-teal-400 transition-colors text-white font-black rounded-2xl py-3.5 text-base"
            >
              Done
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
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</div>
        )}
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
