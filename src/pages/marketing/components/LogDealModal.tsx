import { useState, useEffect } from 'react';
import {
  X, AlertTriangle, MapPin, Building2, User, Phone, Mail, Hash, Globe,
  FileText, CheckCircle, CalendarDays, ChevronLeft, ChevronRight, Clock,
  RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import {
  ORG_TYPES, ORG_TYPE_LABELS, computeOrgKey,
  DEFAULT_NEXT_ACTIONS, isoDate, addDays,
} from '../../../lib/commission';

interface Props {
  userId: string;
  userName: string;
  onClose: () => void;
}

const emptyOrg = {
  trading_name: '',
  address_line1: '',
  city: '',
  postcode: '',
  county: '',
  website: '',
  org_type: 'pub',
  num_sites: '1',
  notes: '',
};

const emptyContact = {
  full_name: '',
  job_title: '',
  email: '',
  phone: '',
};

interface ExistingOrg {
  id: string;
  trading_name: string;
  city: string | null;
  postcode: string | null;
  org_type: string;
}

interface AvailableSlot {
  id: string;
  slot_date: string;
  slot_time: string;
  duration_mins: number;
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

export default function LogDealModal({ userId, userName, onClose }: Props) {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const isFounder = profile?.is_founder === true;

  // Lead form state
  const [org, setOrg] = useState(emptyOrg);
  const [contact, setContact] = useState(emptyContact);
  const [initialNote, setInitialNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [existingOrg, setExistingOrg] = useState<ExistingOrg | null>(null);
  const [duplicateChecked, setDuplicateChecked] = useState(false);
  const [useExisting, setUseExisting] = useState(false);
  const [step, setStep] = useState<'form' | 'duplicate' | 'book'>('form');

  // Post-save state
  const [savedDealId, setSavedDealId] = useState<string | null>(null);

  // Slot picker state
  const [weekBase, setWeekBase] = useState(() => weekStart(new Date()));
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);
  const [bookingSlot, setBookingSlot] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [meetingType, setMeetingType] = useState<'virtual' | 'onsite'>('virtual');

  const today = isoDate(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekBase, i));

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

  useEffect(() => {
    if (step === 'book') loadSlots(weekBase);
  }, [step]);

  function changeWeek(dir: number) {
    const next = addDays(weekBase, dir * 7);
    setWeekBase(next);
    loadSlots(next);
    setSelectedSlot(null);
  }

  function setOrgField(field: keyof typeof emptyOrg, value: string) {
    setOrg(prev => ({ ...prev, [field]: value }));
    if (field === 'trading_name' || field === 'postcode') {
      setDuplicateChecked(false);
      setExistingOrg(null);
      setUseExisting(false);
    }
  }

  async function checkDuplicate(): Promise<ExistingOrg | null> {
    if (!org.postcode.trim()) return null;
    const key = computeOrgKey(org.trading_name, org.postcode);
    const { data } = await supabase
      .from('organisations')
      .select('id, trading_name, city, postcode, org_type')
      .eq('org_key', key)
      .maybeSingle();
    return data ?? null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!org.trading_name.trim()) { setError('Trading name is required.'); return; }
    if (!contact.full_name.trim()) { setError('Contact name is required.'); return; }

    if (!duplicateChecked && org.postcode.trim()) {
      setSaving(true);
      const dup = await checkDuplicate();
      setSaving(false);
      setDuplicateChecked(true);
      if (dup) {
        setExistingOrg(dup);
        setStep('duplicate');
        return;
      }
    }

    await save(useExisting ? existingOrg?.id ?? null : null);
  }

  async function save(existingOrgId: string | null) {
    setSaving(true);
    setError('');

    try {
      let orgId = existingOrgId;

      if (!orgId) {
        const sites = parseInt(org.num_sites, 10);
        const { data: newOrg, error: orgErr } = await supabase
          .from('organisations')
          .insert({
            trading_name: org.trading_name.trim(),
            address_line1: org.address_line1.trim() || null,
            city: org.city.trim() || null,
            postcode: org.postcode.trim() || null,
            county: org.county.trim() || null,
            website: org.website.trim() || null,
            org_type: org.org_type,
            num_sites: isNaN(sites) ? 1 : sites,
            notes: org.notes.trim() || null,
            created_by_user_id: userId,
          })
          .select('id')
          .single();
        if (orgErr) throw new Error(orgErr.message);
        orgId = newOrg.id;
      }

      const { data: newContact, error: contactErr } = await supabase
        .from('contacts')
        .insert({
          org_id: orgId,
          full_name: contact.full_name.trim(),
          job_title: contact.job_title.trim() || null,
          email: contact.email.trim() || null,
          phone: contact.phone.trim() || null,
          is_primary: true,
          created_by_user_id: userId,
        })
        .select('id')
        .single();
      if (contactErr) throw new Error(contactErr.message);

      const sites = parseInt(org.num_sites, 10) || 1;
      const todayDate = new Date();
      const defaultAction = DEFAULT_NEXT_ACTIONS['new'];

      const { data: existingDeals } = await supabase
        .from('deals')
        .select('id, stage')
        .eq('org_id', orgId);

      const activeDeals = (existingDeals ?? []).filter(
        d => d.stage !== 'lost' && d.stage !== 'won'
      );
      const commissionStatus = isFounder ? 'n/a' : (activeDeals.length > 0 ? 'flagged' : 'pending');

      const { data: newDeal, error: dealErr } = await supabase
        .from('deals')
        .insert({
          org_id: orgId,
          primary_contact_id: newContact.id,
          stage: 'new',
          source: 'direct',
          confidence: 'warm',
          sourced_by_user_id: userId,
          sourced_by_name: userName,
          assigned_to_user_id: userId,
          assigned_to_name: userName,
          commission_status: commissionStatus,
          next_action: defaultAction.action,
          next_action_date: isoDate(addDays(todayDate, defaultAction.daysAhead)),
          num_sites: isNaN(sites) ? 1 : sites,
          created_by_user_id: userId,
        })
        .select('id')
        .single();
      if (dealErr) throw new Error(dealErr.message);

      const activityRows: object[] = [
        {
          deal_id: newDeal.id,
          user_id: userId,
          user_name: userName,
          action_type: 'created',
          payload: { source: 'direct', org_name: org.trading_name.trim(), num_sites: sites },
        },
      ];

      if (initialNote.trim()) {
        activityRows.push({
          deal_id: newDeal.id,
          user_id: userId,
          user_name: userName,
          action_type: 'note_added',
          payload: { text: initialNote.trim() },
        });
      }

      if (commissionStatus === 'flagged') {
        activityRows.push({
          deal_id: newDeal.id,
          user_id: userId,
          user_name: userName,
          action_type: 'commission_flagged',
          payload: { reason: 'Existing active deal for this organisation' },
        });
      }

      await supabase.from('deal_activity').insert(activityRows);

      // Lead saved — move to the demo booking step
      setSavedDealId(newDeal.id);
      setStep('book');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  async function confirmBooking() {
    if (!selectedSlot || !savedDealId) return;

    // email is NOT NULL in demo_bookings — require it before proceeding
    if (!contact.email.trim()) {
      setBookingError('An email address is required to book a demo. Go back and add one to the contact.');
      return;
    }

    setBookingSlot(true);
    setBookingError('');

    try {
      const bookingId = crypto.randomUUID();
      const businessLabel = [org.trading_name.trim(), org.city.trim()].filter(Boolean).join(', ');

      const { error: bErr } = await supabase.from('demo_bookings').insert([{
        id: bookingId,
        name: contact.full_name.trim(),
        email: contact.email.trim(),
        phone: contact.phone.trim() || null,
        business_name: businessLabel,
        city: org.city.trim() || null,
        postcode: org.postcode.trim() || null,
        num_sites: org.num_sites,
        message: initialNote.trim() || null,
        sourced_by_user_id: userId,
        sourced_by_name: userName,
      }]);
      if (bErr) throw new Error(bErr.message);

      const meetLink = meetingType === 'virtual' ? 'https://meet.google.com/mav-hmei-vzi' : '';
      const { data: rpcResult, error: rpcError } = await supabase.rpc('claim_slot', {
        p_slot_id: selectedSlot.id,
        p_booking_id: bookingId,
        p_video_link: meetLink,
        p_meeting_type: meetingType,
        p_deal_id: savedDealId,
      });

      if (rpcError || !rpcResult?.ok) {
        throw new Error(rpcError?.message ?? rpcResult?.error ?? 'Failed to claim slot.');
      }

      // Advance the deal stage to demo_booked
      const demoAction = DEFAULT_NEXT_ACTIONS['demo_booked'];
      await supabase
        .from('deals')
        .update({
          stage: 'demo_booked',
          next_action: demoAction.action,
          next_action_date: isoDate(addDays(new Date(selectedSlot.slot_date), demoAction.daysAhead)),
        })
        .eq('id', savedDealId);

      await supabase.from('deal_activity').insert({
        deal_id: savedDealId,
        user_id: userId,
        user_name: userName,
        action_type: 'note_added',
        payload: {
          text: `Demo booked: ${formatDateLong(selectedSlot.slot_date)} at ${selectedSlot.slot_time}`,
        },
      });

      onClose();
      navigate(`/deals/${savedDealId}`);
    } catch (err: unknown) {
      setBookingError(err instanceof Error ? err.message : 'Could not book the slot.');
      setBookingSlot(false);
    }
  }

  const inputCls =
    'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors';
  const labelCls =
    'text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2';

  // ── Duplicate check step ──────────────────────────────────────────
  if (step === 'duplicate' && existingOrg) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={18} className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Possible duplicate</h2>
              <p className="text-slate-500 text-xs mt-0.5">Same name and postcode already exists</p>
            </div>
          </div>
          <div className="px-6 py-5 space-y-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
              <p className="text-white font-bold text-sm">{existingOrg.trading_name}</p>
              <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
                <MapPin size={10} />
                {[existingOrg.city, existingOrg.postcode].filter(Boolean).join(', ') || 'No location on record'}
              </p>
              <p className="text-slate-500 text-[10px] mt-1">
                {ORG_TYPE_LABELS[existingOrg.org_type] ?? existingOrg.org_type}
              </p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Is this the same venue you're logging a lead for?
            </p>
            <div className="space-y-2">
              <button
                onClick={() => { setUseExisting(true); save(existingOrg.id); }}
                disabled={saving}
                className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-teal-500/40 rounded-xl px-4 py-3 transition-all text-left"
              >
                <CheckCircle size={16} className="text-teal-400 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-bold">Yes — use the existing record</p>
                  <p className="text-slate-500 text-xs">Add a new contact and deal to this organisation</p>
                </div>
              </button>
              <button
                onClick={() => { setDuplicateChecked(true); setStep('form'); save(null); }}
                disabled={saving}
                className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 transition-all text-left"
              >
                <Building2 size={16} className="text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-bold">No — this is a different venue</p>
                  <p className="text-slate-500 text-xs">Create a new organisation record</p>
                </div>
              </button>
              <button
                onClick={() => { setStep('form'); setDuplicateChecked(false); }}
                className="w-full text-slate-500 hover:text-slate-300 text-sm py-2 transition-colors"
              >
                Go back and edit
              </button>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Book a demo step ──────────────────────────────────────────────
  if (step === 'book') {
    const slotsThisWeek = weekDays.map(day => ({
      date: isoDate(day),
      daySlots: slots.filter(s => s.slot_date === isoDate(day)),
    }));
    const hasSlots = slotsThisWeek.some(d => d.daySlots.length > 0);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col">

          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0">
              <CalendarDays size={18} className="text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-bold text-base">Book a demo now?</h2>
              <p className="text-slate-500 text-xs mt-0.5 truncate">
                Lead saved · Pick a slot for <span className="text-white font-semibold">{contact.full_name || org.trading_name}</span>
              </p>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800 flex-shrink-0">
              <X size={18} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

            {/* Contact summary */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
              <span className="text-white font-semibold">{contact.full_name || '—'}</span>
              <span className="text-slate-400">{org.trading_name}</span>
              {contact.email && <span className="flex items-center gap-1 text-teal-400"><Mail size={10} />{contact.email}</span>}
              {contact.phone && <span className="flex items-center gap-1 text-slate-400"><Phone size={10} />{contact.phone}</span>}
            </div>

            {/* Week navigator */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => changeWeek(-1)}
                disabled={isoDate(weekBase) <= today}
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={16} />
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
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Slot grid */}
            {slotsLoading ? (
              <div className="text-center py-10 text-slate-500 text-sm flex items-center justify-center gap-2">
                <RefreshCw size={14} className="animate-spin" /> Loading available slots…
              </div>
            ) : !hasSlots ? (
              <div className="text-center py-10 space-y-2">
                <CalendarDays size={28} className="text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm font-semibold">No slots available this week</p>
                <p className="text-slate-600 text-xs">Use the arrows to browse other weeks.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {slotsThisWeek.filter(d => d.daySlots.length > 0).map(({ date, daySlots }) => (
                  <div key={date}>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                      {DAY_LABELS[new Date(date + 'T00:00:00').getDay() === 0 ? 6 : new Date(date + 'T00:00:00').getDay() - 1]}
                      {' · '}{formatDateShort(date)}
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {daySlots.map(slot => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(selectedSlot?.id === slot.id ? null : slot)}
                          className={`rounded-xl py-2.5 px-2 text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                            selectedSlot?.id === slot.id
                              ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-white'
                          }`}
                        >
                          <Clock size={10} />
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
              <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl px-4 py-3 flex items-center gap-3">
                <CheckCircle size={16} className="text-teal-400 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-bold">{formatDateLong(selectedSlot.slot_date)}</div>
                  <div className="text-teal-300 text-xs">{selectedSlot.slot_time} · {selectedSlot.duration_mins} minutes</div>
                </div>
              </div>
            )}

            {/* Meeting type selector */}
            {selectedSlot && (
              <div>
                <label className="text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2">Meeting type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingType('virtual')}
                    className={`flex-1 rounded-xl py-2.5 px-3 text-xs font-bold border transition-all ${
                      meetingType === 'virtual'
                        ? 'bg-teal-500 border-teal-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50'
                    }`}
                  >
                    Virtual (Google Meet)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMeetingType('onsite')}
                    className={`flex-1 rounded-xl py-2.5 px-3 text-xs font-bold border transition-all ${
                      meetingType === 'onsite'
                        ? 'bg-teal-500 border-teal-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50'
                    }`}
                  >
                    On-site visit
                  </button>
                </div>
                {meetingType === 'onsite' && (
                  <p className="text-slate-500 text-[10px] mt-1.5">Adjacent slots will be blocked automatically for travel time.</p>
                )}
              </div>
            )}

            {bookingError && (
              <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">
                {bookingError}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-4 border-t border-slate-700 flex-shrink-0 space-y-3">
            <button
              onClick={confirmBooking}
              disabled={!selectedSlot || bookingSlot}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              {bookingSlot ? <RefreshCw size={14} className="animate-spin" /> : <CalendarDays size={14} />}
              {bookingSlot ? 'Booking…' : 'Confirm demo booking'}
            </button>
            <button
              onClick={() => { onClose(); if (savedDealId) navigate(`/deals/${savedDealId}`); }}
              className="w-full text-slate-500 hover:text-slate-300 text-sm transition-colors py-1"
            >
              Skip for now — go to the deal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Lead form (default step) ──────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
          <div>
            <h2 className="text-white font-bold text-base">Log a new lead</h2>
            <p className="text-slate-500 text-xs mt-0.5">
              Attributed to <span className="text-teal-400 font-semibold">{userName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Organisation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={14} className="text-teal-400" />
              <h3 className="text-white font-bold text-sm">The business</h3>
            </div>
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Trading name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={org.trading_name}
                    onChange={e => setOrgField('trading_name', e.target.value)}
                    placeholder="The Crown Hotel"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Type</label>
                  <select
                    value={org.org_type}
                    onChange={e => setOrgField('org_type', e.target.value)}
                    className={inputCls}
                  >
                    {ORG_TYPES.map(t => (
                      <option key={t} value={t}>{ORG_TYPE_LABELS[t]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelCls}>
                    <MapPin size={10} className="inline mr-1" />
                    Town / City
                  </label>
                  <input
                    type="text"
                    value={org.city}
                    onChange={e => setOrgField('city', e.target.value)}
                    placeholder="Bradford"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    Postcode
                    <span className="text-slate-600 ml-1 normal-case font-normal">(duplicate check)</span>
                  </label>
                  <input
                    type="text"
                    value={org.postcode}
                    onChange={e => setOrgField('postcode', e.target.value)}
                    placeholder="BD1 1AA"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    <Hash size={10} className="inline mr-1" />
                    Number of sites
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={org.num_sites}
                    onChange={e => setOrgField('num_sites', e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Street address</label>
                  <input
                    type="text"
                    value={org.address_line1}
                    onChange={e => setOrgField('address_line1', e.target.value)}
                    placeholder="123 High Street"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    <Globe size={10} className="inline mr-1" />
                    Website
                  </label>
                  <input
                    type="text"
                    value={org.website}
                    onChange={e => setOrgField('website', e.target.value)}
                    placeholder="www.thecrownhotel.co.uk"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-slate-800 pt-5">
            <div className="flex items-center gap-2 mb-4">
              <User size={14} className="text-teal-400" />
              <h3 className="text-white font-bold text-sm">Primary contact</h3>
            </div>
            <div className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Full name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    value={contact.full_name}
                    onChange={e => setContact(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Jane Smith"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Job title</label>
                  <input
                    type="text"
                    value={contact.job_title}
                    onChange={e => setContact(prev => ({ ...prev, job_title: e.target.value }))}
                    placeholder="General Manager"
                    className={inputCls}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>
                    <Mail size={10} className="inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={e => setContact(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="jane@thecrownhotel.co.uk"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>
                    <Phone size={10} className="inline mr-1" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={e => setContact(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="07700 900000"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Initial note */}
          <div className="border-t border-slate-800 pt-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={14} className="text-teal-400" />
              <h3 className="text-white font-bold text-sm">Initial note</h3>
              <span className="text-slate-600 text-xs">optional</span>
            </div>
            <textarea
              value={initialNote}
              onChange={e => setInitialNote(e.target.value)}
              placeholder="How you met them, what they said, context..."
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2 sm:gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              {saving ? 'Saving…' : 'Save & book a demo →'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-5 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
