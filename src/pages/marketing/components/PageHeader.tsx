interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  deployLabel?: string;   // short instruction shown in the action bar
  deployNote?: string;    // optional extra context
}

export default function PageHeader({ title, subtitle, badge, deployLabel, deployNote }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-800">
      {deployLabel && (
        <div className="px-4 py-3 sm:px-8 bg-teal-500/10 border-b border-teal-500/20 flex items-center gap-3 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
          <p className="text-teal-300 text-sm font-semibold">{deployLabel}</p>
          {deployNote && <span className="text-teal-500/70 text-xs">{deployNote}</span>}
        </div>
      )}
      <div className="px-4 py-6 sm:px-8 sm:py-8">
        {badge && (
          <span className="inline-block text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1 mb-4">
            {badge}
          </span>
        )}
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-slate-400 text-base leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}
