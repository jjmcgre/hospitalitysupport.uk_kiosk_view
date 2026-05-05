import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import CopyButton from './CopyButton';

interface ScriptCardProps {
  title: string;
  hook?: string;
  scene?: string;
  script: string;
  cta?: string;
  label?: string;
}

export default function ScriptCard({ title, hook, scene, script, cta, label }: ScriptCardProps) {
  const [open, setOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Clean copy — just the script and CTA, no internal production labels
  const cleanCopy = [script, cta].filter(Boolean).join('\n\n');

  // Full brief — includes hook/scene for videographer/designer
  const fullBrief = [
    hook && `Hook: ${hook}`,
    scene && `Scene direction: ${scene}`,
    `Script:\n${script}`,
    cta && `CTA: ${cta}`,
  ].filter(Boolean).join('\n\n');

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-slate-750 transition-colors"
      >
        <div className="flex-1">
          {label && <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-1">{label}</span>}
          <h3 className="text-white font-semibold text-base">{title}</h3>
          {hook && !open && <p className="text-slate-400 text-sm mt-1 line-clamp-1">{hook}</p>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
          {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-700 pt-4">
          {/* Hook — visible as the opening line */}
          {hook && (
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Opening hook</p>
                <CopyButton text={hook} />
              </div>
              <p className="text-slate-300 text-sm">{hook}</p>
            </div>
          )}

          {/* Script / caption — the deployable content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Script / Caption</p>
              <CopyButton text={cleanCopy} />
            </div>
            <p className="text-slate-300 text-sm whitespace-pre-wrap bg-slate-900/40 rounded-xl p-4 border border-slate-700">{script}</p>
          </div>

          {/* CTA */}
          {cta && (
            <div className="flex items-center justify-between bg-slate-900/40 rounded-xl px-4 py-3 border border-slate-700">
              <p className="text-teal-300 text-sm font-semibold">{cta}</p>
              <CopyButton text={cta} />
            </div>
          )}

          {/* Production notes toggle — internal only */}
          {scene && (
            <>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-2"
              >
                {showNotes ? 'Hide production notes' : 'Show production notes'}
              </button>
              {showNotes && (
                <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-3 space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Scene direction (internal)</p>
                    <p className="text-slate-400 text-sm">{scene}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-700/50">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full brief (copy for videographer)</p>
                    <CopyButton text={fullBrief} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
