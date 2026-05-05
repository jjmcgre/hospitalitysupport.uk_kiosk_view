import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Instagram, Video, Facebook, Linkedin, Mail, MessageSquare, Palette, BookOpen, FileText, Files, Inbox, CalendarDays, Copy, Check, ExternalLink, Share2 } from 'lucide-react';

const liveItems = [
  { to: '/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/diary', label: 'Demo Diary', icon: CalendarDays },
];

const campaignItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/email', label: 'Email Campaign', icon: Mail },
  { to: '/brochure-tool', label: 'Brochure', icon: BookOpen },
  { to: '/print-1', label: '1-Page Summary', icon: FileText },
  { to: '/print-5', label: '5-Page Brochure', icon: Files },
  { to: '/sales', label: 'Sales & Talking Points', icon: MessageSquare },
  { to: '/brand', label: 'Brand & Positioning', icon: Palette },
];

const socialItems = [
  { to: '/instagram', label: 'Instagram', icon: Instagram },
  { to: '/tiktok', label: 'TikTok', icon: Video },
  { to: '/facebook', label: 'Facebook', icon: Facebook },
  { to: '/linkedin', label: 'LinkedIn', icon: Linkedin },
];

const shareLinks = [
  { label: 'Product overview', path: '/demo', description: 'Full kiosk / landing page' },
  { label: 'Brochure (8-page)', path: '/brochure', description: 'Square PDF, ready to print' },
  { label: '1-page summary', path: '/one-pager', description: 'A4, email or print' },
  { label: '5-page sales pack', path: '/sales-pack', description: 'A4, full detail' },
];

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      title="Copy link"
      className="p-2.5 rounded-lg text-slate-500 hover:text-teal-400 hover:bg-teal-500/10 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
    >
      {copied ? <Check size={15} className="text-teal-400" /> : <Copy size={15} />}
    </button>
  );
}

function SharePanel() {
  const [open, setOpen] = useState(false);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="border-t border-slate-800 pt-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
      >
        <span className="flex items-center gap-2">
          <Share2 size={15} className="flex-shrink-0" />
          Share links
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="mt-1 space-y-1 px-1">
          {shareLinks.map((link) => {
            const fullUrl = `${origin}${link.path}`;
            return (
              <div key={link.path} className="flex items-center gap-1 bg-slate-800/60 rounded-xl px-3 py-2.5">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{link.label}</p>
                  <p className="text-slate-500 text-[10px] truncate">{link.description}</p>
                  <p className="text-teal-600 text-[10px] font-mono truncate mt-0.5">{window.location.host}{link.path}</p>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <CopyLinkButton url={fullUrl} />
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    className="p-2.5 rounded-lg text-slate-500 hover:text-teal-400 hover:bg-teal-500/10 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MarketingLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex
      `}>
        <div className="p-6 border-b border-slate-800">
          <span className="text-white font-black text-base tracking-tight">
            HospitalitySupport<span className="text-teal-400">.uk</span>
          </span>
          <div className="mt-3">
            <h1 className="text-white font-bold text-lg leading-tight">Campaign Book</h1>
            <p className="text-slate-500 text-xs mt-0.5">Internal use only</p>
            <div className="mt-2 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span className="text-teal-300 text-xs font-semibold">£3.30 / day</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="mb-1">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-1">Live</p>
            {liveItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <item.icon size={16} className="flex-shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-2">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-1 mt-1">Campaign</p>
            {campaignItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <item.icon size={16} className="flex-shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-2">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-1 mt-1">Social</p>
            {socialItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <item.icon size={16} className="flex-shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <SharePanel />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <p className="text-slate-600 text-xs text-center">HospitalitySupport.uk · Internal</p>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-white font-semibold text-sm">Campaign Book</span>
          <div className="ml-auto">
            <span className="text-teal-300 text-xs font-semibold bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1">£3.30 / day</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
