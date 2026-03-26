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

  const fullText = [hook && `Hook: ${hook}`, scene && `Scene: ${scene}`, script, cta && `CTA: ${cta}`]
    .filter(Boolean)
    .join('\n\n');

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
          {open && <CopyButton text={fullText} />}
          {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-700 pt-4">
          {hook && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Hook</p>
              <p className="text-slate-300 text-sm">{hook}</p>
            </div>
          )}
          {scene && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Scene</p>
              <p className="text-slate-300 text-sm">{scene}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Script / Caption</p>
            <p className="text-slate-300 text-sm whitespace-pre-wrap">{script}</p>
          </div>
          {cta && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">CTA</p>
              <p className="text-teal-300 text-sm font-medium">{cta}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
