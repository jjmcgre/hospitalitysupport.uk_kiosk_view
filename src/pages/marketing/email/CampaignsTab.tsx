import { useState } from 'react';
import CopyButton from '../components/CopyButton';
import { campaigns, type Stage, type Email } from './campaignData';

const stageAccent: Record<number, string> = {
  1: 'border-blue-500/30 bg-blue-500/5',
  2: 'border-sky-500/30 bg-sky-500/5',
  3: 'border-teal-500/30 bg-teal-500/5',
  4: 'border-orange-500/30 bg-orange-500/5',
  5: 'border-rose-500/30 bg-rose-500/5',
};

const stageLabelColour: Record<number, string> = {
  1: 'text-blue-400 bg-blue-500/15 border-blue-500/25',
  2: 'text-sky-400 bg-sky-500/15 border-sky-500/25',
  3: 'text-teal-400 bg-teal-500/15 border-teal-500/25',
  4: 'text-orange-400 bg-orange-500/15 border-orange-500/25',
  5: 'text-rose-400 bg-rose-500/15 border-rose-500/25',
};

function EmailCard({ email }: { email: Email }) {
  const [open, setOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const subjectText = email.subject;
  const bodyText = `${email.body}\n\n${email.cta}`;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-slate-700/40 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Email {email.id}</span>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-700 rounded-full px-2 py-px">{email.timing}</span>
          </div>
          <h3 className="text-white font-semibold text-base mb-1 leading-snug">{email.subject}</h3>
          <p className="text-slate-400 text-sm">{email.preview}</p>
        </div>
        <span className="text-slate-400 text-sm flex-shrink-0 mt-0.5">{open ? 'Hide' : 'View'}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-700 pt-4 space-y-4">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject line</p>
              <CopyButton text={subjectText} />
            </div>
            <p className="text-white text-sm font-medium">{email.subject}</p>
            <p className="text-slate-500 text-xs mt-1">Preview: {email.preview}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email body</p>
              <CopyButton text={bodyText} />
            </div>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans leading-relaxed bg-slate-900/40 rounded-xl p-4 border border-slate-700 overflow-x-auto break-words">{email.body}</pre>
          </div>

          <div className="flex items-center justify-between bg-slate-900/40 rounded-xl px-4 py-3 border border-slate-700">
            <p className="text-teal-300 text-sm font-semibold">{email.cta}</p>
            <CopyButton text={email.cta} />
          </div>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-2"
          >
            {showNotes ? 'Hide notes' : 'Show internal notes'}
          </button>
          {showNotes && (
            <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Purpose (internal)</p>
              <p className="text-slate-400 text-sm leading-relaxed">{email.purpose}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StageBlock({ stage }: { stage: Stage }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div className={`rounded-2xl border p-6 space-y-4 ${stageAccent[stage.stage]}`}>
      <div className="flex items-start gap-4">
        <div className={`text-2xl font-black leading-none w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${stageLabelColour[stage.stage]}`}>
          {stage.stage}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-white font-bold text-base">{stage.label}</h2>
            <span className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-px ${stageLabelColour[stage.stage]}`}>
              Stage {stage.stage}
            </span>
            <button
              onClick={() => setShowDesc(!showDesc)}
              className="text-xs text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-2 ml-1"
            >
              {showDesc ? 'hide notes' : 'notes'}
            </button>
          </div>
          {showDesc && (
            <p className="text-slate-400 text-sm leading-relaxed mt-1">{stage.description}</p>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {stage.emails.map((email) => (
          <EmailCard key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
}

export default function CampaignsTab() {
  const [activeCampaignId, setActiveCampaignId] = useState<string>('founders');
  const current = campaigns.find((c) => c.id === activeCampaignId)!;
  const totalEmails = current.data.reduce((acc, s) => acc + s.emails.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-bold text-base">Campaign copy</h2>
        <p className="text-slate-500 text-xs mt-0.5">Copy subject line and body directly into your email client.</p>
      </div>

      {/* Campaign switcher */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
        {campaigns.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCampaignId(c.id)}
            className={`flex-1 rounded-xl px-4 py-3 text-left transition-all ${
              activeCampaignId === c.id
                ? 'bg-slate-700 border border-slate-500 shadow-sm'
                : 'hover:bg-slate-700/40 border border-transparent'
            }`}
          >
            <p className={`text-sm font-bold leading-snug ${activeCampaignId === c.id ? 'text-white' : 'text-slate-400'}`}>{c.label}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">{c.description}</p>
          </button>
        ))}
      </div>

      {/* Sequence overview */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          {current.label} — {totalEmails} email{totalEmails !== 1 ? 's' : ''} across {current.data.length} stages
        </p>
        <div className="flex flex-wrap gap-2">
          {current.data.map((s) => (
            <div key={s.stage} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ${stageLabelColour[s.stage]}`}>
              <span className="font-black">{s.stage}.</span>
              <span>{s.label}</span>
              <span className="opacity-60">({s.emails.length} email{s.emails.length > 1 ? 's' : ''})</span>
            </div>
          ))}
        </div>
      </div>

      {current.data.map((stage) => (
        <StageBlock key={stage.stage} stage={stage} />
      ))}
    </div>
  );
}
