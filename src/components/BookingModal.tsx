import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle, Loader2, Calendar, Mail, Phone, Building2, Users } from 'lucide-react';
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
  name: '',
  email: '',
  phone: '',
  business_name: '',
  num_sites: '1',
  message: '',
};

const CALENDLY_URL = 'https://calendly.com/james-servicesupportgroup/hospitality-support-demo';

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [step, setStep] = useState<'form' | 'calendar'>('form');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setForm(EMPTY);
      setStep('form');
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

  if (!isOpen) return null;

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.business_name.trim()) {
      setError('Please fill in your name, email, and business name.');
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from('demo_bookings').insert([{
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      business_name: form.business_name.trim(),
      num_sites: form.num_sites,
      message: form.message.trim(),
    }]);
    setSubmitting(false);
    if (dbError) {
      setError('Something went wrong. Please try again or email james@servicesupportgroup.uk');
      return;
    }
    setStep('calendar');
  }

  const calendlyParams = new URLSearchParams({
    name: form.name,
    email: form.email,
    a1: form.business_name,
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeBooking}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8 flex-shrink-0">
          <div>
            <div className="text-white font-black text-lg leading-tight">
              {step === 'form' ? 'Book your 30-minute demo' : 'Pick a time that works'}
            </div>
            <div className="text-slate-500 text-xs mt-0.5">
              {step === 'form'
                ? 'Your operation. Live. No slides, no sales pitch.'
                : 'Choose a slot and we\'ll confirm via email.'}
            </div>
          </div>
          <button
            onClick={closeBooking}
            className="w-8 h-8 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center transition-colors flex-shrink-0 ml-4"
          >
            <X size={15} className="text-slate-400" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
            <div className="px-7 py-6 space-y-4">

              {/* What to expect */}
              <div className="bg-teal-500/8 border border-teal-500/20 rounded-2xl p-4 mb-2">
                <div className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-2">What happens in the demo</div>
                <div className="space-y-1.5">
                  {[
                    'We load your actual dishes and show live recosting',
                    'Allergens, HACCP, and nutrition built in real time',
                    'No slides. Your data. Your operation.',
                  ].map(pt => (
                    <div key={pt} className="flex items-start gap-2">
                      <ArrowRight size={11} className="text-teal-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-xs leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Your name <span className="text-teal-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="James Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email <span className="text-teal-400">*</span>
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="you@yourbusiness.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Phone <span className="text-slate-600 font-normal normal-case">(optional)</span>
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="07700 900000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-colors"
                  />
                </div>
              </div>

              {/* Business name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Business / venue name <span className="text-teal-400">*</span>
                </label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    value={form.business_name}
                    onChange={e => set('business_name', e.target.value)}
                    placeholder="The Crown, Manchester"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Number of sites */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Number of sites / kitchens
                </label>
                <div className="relative">
                  <Users size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
                  <select
                    value={form.num_sites}
                    onChange={e => set('num_sites', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-colors appearance-none"
                  >
                    <option value="1" className="bg-slate-900">1 site</option>
                    <option value="2-5" className="bg-slate-900">2–5 sites</option>
                    <option value="6-15" className="bg-slate-900">6–15 sites</option>
                    <option value="16+" className="bg-slate-900">16+ sites</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Anything you want us to know? <span className="text-slate-600 font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  placeholder="Your biggest pain point, current systems, what you'd like to see..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-7 pb-7 flex-shrink-0 border-t border-white/5 pt-5">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-2xl py-4 flex items-center justify-center gap-2 font-black text-white text-base"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Saving...</>
                ) : (
                  <><Calendar size={16} /> Choose a time slot</>
                )}
              </button>
              <div className="text-center mt-3 text-slate-600 text-xs">
                Or email us directly:{' '}
                <a href="mailto:james@servicesupportgroup.uk" className="text-teal-500 hover:text-teal-400 transition-colors">
                  james@servicesupportgroup.uk
                </a>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Success banner */}
            <div className="flex items-center gap-3 px-7 py-4 bg-teal-500/10 border-b border-teal-500/20 flex-shrink-0">
              <CheckCircle size={18} className="text-teal-400 flex-shrink-0" />
              <div>
                <div className="text-teal-300 text-sm font-bold">Details saved — pick your slot below</div>
                <div className="text-slate-500 text-xs">A confirmation will be sent to {form.email}</div>
              </div>
            </div>

            {/* Calendly embed */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${CALENDLY_URL}?${calendlyParams.toString()}&hide_gdpr_banner=1&background_color=0f172a&text_color=f1f5f9&primary_color=14b8a6`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book a demo"
                style={{ minHeight: 520 }}
              />
            </div>

            <div className="px-7 py-4 border-t border-white/5 flex-shrink-0 text-center">
              <span className="text-slate-600 text-xs">Prefer to talk first? Email </span>
              <a href="mailto:james@servicesupportgroup.uk" className="text-teal-500 hover:text-teal-400 text-xs transition-colors">
                james@servicesupportgroup.uk
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
