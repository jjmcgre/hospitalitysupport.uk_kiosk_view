import { useState, useEffect } from 'react';
import {
  X, ArrowRight, CheckCircle, Loader2, Mail, Phone,
  Building2, Users, AlertCircle, Video,
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

const EMPTY: FormData = {
  name: '', email: '', phone: '', business_name: '', num_sites: '1', message: '',
};

const CAL_LINK = 'james-mcgregor-6cvfzq/30mins';

type Step = 'details' | 'cal' | 'confirmed';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Cal: any;

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [step, setStep] = useState<Step>('details');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY);
      setStep('details');
      setError('');
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

  // Inject Cal.com script and init inline embed when on the cal step
  useEffect(() => {
    if (step !== 'cal') return;

    function initCal() {
      Cal('init', { origin: 'https://cal.com' });
      Cal('inline', {
        elementOrSelector: '#cal-inline-embed',
        calLink: CAL_LINK,
        config: {
          name: form.name,
          email: form.email,
          notes: [
            form.phone && `Phone: ${form.phone}`,
            `Business: ${form.business_name}`,
            `Sites: ${form.num_sites}`,
            form.message && `Message: ${form.message}`,
          ].filter(Boolean).join('\n'),
        },
      });
      Cal('ui', {
        styles: { branding: { brandColor: '#14b8a6' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
      Cal('on', {
        action: 'bookingSuccessful',
        callback: () => saveBooking(),
      });
    }

    // If already loaded from a previous open, just init
    if (typeof Cal !== 'undefined') {
      initCal();
      return;
    }

    // Bootstrap snippet from cal.com docs
    (function (C: Window & typeof globalThis, A: string, L: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = C as any;
      const p = function (a: IArguments | unknown[], ar: IArguments | unknown[]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a as any).q.push(ar);
      };
      const d = document;
      w.Cal =
        w.Cal ||
        function () {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const cal = w.Cal as any;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement('script');
            s.src = A;
            s.async = true;
            s.onload = initCal;
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    // Trigger the script load
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Cal('init', { origin: 'https://cal.com' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  async function saveBooking() {
    setSubmitting(true);
    await supabase.from('demo_bookings').insert([{
      id: crypto.randomUUID(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      business_name: form.business_name.trim(),
      num_sites: form.num_sites,
      message: form.message.trim(),
    }]);
    setSubmitting(false);
    setStep('confirmed');
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
    setStep('cal');
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeBooking} />

      <div className={`relative w-full bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
        step === 'cal' ? 'max-w-2xl max-h-[96vh]' : 'max-w-lg max-h-[92vh]'
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8 flex-shrink-0">
          <div>
            {step === 'details' && (
              <>
                <div className="text-white font-black text-lg leading-tight">Book your 30-minute demo</div>
                <div className="text-slate-500 text-xs mt-0.5">Live platform walkthrough. No slides, no sales pitch.</div>
              </>
            )}
            {step === 'cal' && (
              <>
                <div className="text-white font-black text-lg leading-tight">Pick a time</div>
                <div className="text-slate-500 text-xs mt-0.5">Choose a slot — a video call link is sent automatically.</div>
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
            {(['details', 'cal'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center border transition-colors ${
                  step === s
                    ? 'bg-teal-500 border-teal-500 text-white'
                    : s === 'details' && step === 'cal'
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

        {/* ── Step 2: Cal.com inline embed ── */}
        {step === 'cal' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 pt-3 pb-1 flex-shrink-0">
              <div className="bg-teal-500/8 border border-teal-500/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
                <Video size={13} className="text-teal-400 flex-shrink-0" />
                <span className="text-teal-300 text-xs font-semibold">
                  A video call link will be sent to <span className="text-teal-200">{form.email}</span> once you confirm.
                </span>
              </div>
            </div>

            {submitting && (
              <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center z-10 rounded-3xl">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <Loader2 size={28} className="animate-spin text-teal-400" />
                  <span className="text-sm">Confirming your booking…</span>
                </div>
              </div>
            )}

            {/* Cal.com mounts the iframe into this div */}
            <div
              id="cal-inline-embed"
              className="flex-1 overflow-y-auto"
              style={{ minHeight: '520px' }}
            />

            <div className="px-7 py-3 border-t border-white/5 flex-shrink-0">
              <button
                onClick={() => setStep('details')}
                className="w-full bg-transparent text-slate-500 hover:text-slate-300 text-sm py-1.5 transition-colors"
              >
                ← Back to your details
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Confirmed ── */}
        {step === 'confirmed' && (
          <div className="flex-1 flex flex-col px-7 py-10 text-center items-center justify-center gap-6">
            <div className="w-20 h-20 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
              <CheckCircle size={40} className="text-teal-400" />
            </div>
            <div>
              <div className="text-white font-black text-2xl mb-2">You're booked in!</div>
              <div className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-4">
                Check your inbox — a calendar invite and video call link are on their way to{' '}
                <span className="text-white font-semibold">{form.email}</span>.
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <Video size={13} className="text-teal-400" />
                  <span className="text-slate-500 text-[10px] uppercase tracking-widest">Video call included</span>
                </div>
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
