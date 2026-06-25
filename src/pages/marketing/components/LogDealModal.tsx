import { useState } from 'react';
import { X, AlertTriangle, MapPin, Building2, User, Phone, Mail, Hash, Globe, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import {
  ORG_TYPES, ORG_TYPE_LABELS, computeOrgKey,
  DEFAULT_NEXT_ACTIONS, isoDate, addDays,
  calcARR, calcL1Commission, fmtGbp,
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

export default function LogDealModal({ userId, userName, onClose }: Props) {
  const navigate = useNavigate();
  const [org, setOrg] = useState(emptyOrg);
  const [contact, setContact] = useState(emptyContact);
  const [initialNote, setInitialNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [existingOrg, setExistingOrg] = useState<ExistingOrg | null>(null);
  const [duplicateChecked, setDuplicateChecked] = useState(false);
  const [useExisting, setUseExisting] = useState(false);
  const [step, setStep] = useState<'form' | 'duplicate'>('form');

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
      const today = new Date();
      const defaultAction = DEFAULT_NEXT_ACTIONS['new'];

      const { data: existingDeals } = await supabase
        .from('deals')
        .select('id, stage')
        .eq('org_id', orgId);

      const activeDeals = (existingDeals ?? []).filter(
        d => d.stage !== 'lost' && d.stage !== 'won'
      );
      const commissionStatus = activeDeals.length > 0 ? 'flagged' : 'pending';

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
          next_action_date: isoDate(addDays(today, defaultAction.daysAhead)),
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
          payload: {
            source: 'direct',
            org_name: org.trading_name.trim(),
            num_sites: sites,
          },
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

      navigate(`/deals/${newDeal.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  const sites = parseInt(org.num_sites, 10) || 1;
  const arr = calcARR(sites);
  const commission = calcL1Commission(sites);

  const inputCls =
    'w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors';
  const labelCls =
    'text-slate-400 text-[11px] font-bold uppercase tracking-widest block mb-2';

  if (step === 'duplicate' && existingOrg) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={18} className="text-amber-400" />
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
                onClick={() => {
                  setUseExisting(true);
                  save(existingOrg.id);
                }}
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
                onClick={() => {
                  setDuplicateChecked(true);
                  setStep('form');
                  save(null);
                }}
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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

              {sites >= 1 && (
                <div className="flex items-center gap-4 bg-teal-500/5 border border-teal-500/20 rounded-xl px-4 py-2.5">
                  <span className="text-teal-400 text-xs font-bold">{fmtGbp(arr)}/yr ARR</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-yellow-400 text-xs font-bold">{fmtGbp(commission)} commission</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400 text-xs">£200 or 15%, whichever is greater</span>
                </div>
              )}
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

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              {saving ? 'Saving...' : 'Save deal'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
