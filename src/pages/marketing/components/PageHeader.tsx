interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-800 px-8 py-8">
      {badge && (
        <span className="inline-block text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1 mb-4">
          {badge}
        </span>
      )}
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-slate-400 text-base leading-relaxed">{subtitle}</p>
    </div>
  );
}
