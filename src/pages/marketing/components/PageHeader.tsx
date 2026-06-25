import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  deployLabel?: string;
  deployNote?: string;
  hideHome?: boolean;
}

export default function PageHeader({ title, subtitle, badge, deployLabel, deployNote, hideHome }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-800">
      {deployLabel && (
        <div className="px-4 py-3 sm:px-8 bg-teal-500/10 border-b border-teal-500/20 flex items-center gap-3 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
          <p className="text-teal-300 text-sm font-semibold">{deployLabel}</p>
          {deployNote && <span className="text-teal-500/70 text-xs">{deployNote}</span>}
        </div>
      )}
      <div className="px-4 py-5 sm:px-8 sm:py-6 flex items-start gap-4">
        {!hideHome && (
          <Link
            to="/"
            title="Back to overview"
            className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Home size={15} />
          </Link>
        )}
        <div className="flex-1 min-w-0">
          {badge && (
            <span className="inline-block text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1 mb-3">
              {badge}
            </span>
          )}
          <h1 className="text-xl font-bold text-white leading-tight">{title}</h1>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
