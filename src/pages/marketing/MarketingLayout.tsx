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
  { name: 'HospitalitySupport.uk — Product Overview', path: '/demo', description: 'Full product kiosk / landing page' },
  { name: 'HospitalitySupport.uk — Brochure', path: '/brochure', description: '8-page square PDF, ready to print' },
  { name: 'HospitalitySupport.uk — 1-Page Summary', path: '/one-pager', description: 'A4 single page, email or print' },
  { name: 'HospitalitySupport.uk — Sales Pack', path: '/sales-pack', description: '5-page A4, full detail' },
];

function CopyButton({ text, title, children }: { text: string; title: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      title={title}
      className={`p-2.5 rounded-lg transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center gap-1 ${
        copied ? 'text-teal-400 bg-teal-500/10' : 'text-slate-500 hover:text-teal-400 hover:bg-teal-500/10'
      }`}
    >
      {copied ? <Check size={15} /> : children}
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
        <div className="mt-1 space-y-1.5 px-1 pb-2">
          {shareLinks.map((link) => {
            const fullUrl = `${origin}${link.path}`;
            const shareText = `${link.name}\n${fullUrl}`;
            return (
              <div key={link.path} className="bg-slate-800/60 rounded-xl px-3 py-3">
                {/* Name — this is what gets shared */}
                <p className="text-white text-xs font-bold leading-snug mb-0.5">{link.name}</p>
                <p className="text-slate-500 text-[10px] mb-2">{link.description}</p>

                {/* Actions row */}
                <div className="flex items-center gap-1">
                  {/* Copy name + URL together — primary action */}
                  <CopyButton text={shareText} title="Copy name + link (paste into WhatsApp / email)">
                    <Copy size={14} />
                  </CopyButton>
                  <span className="text-slate-600 text-[10px] flex-1 font-mono truncate">{window.location.host}{link.path}</span>
                  {/* Open in tab */}
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in new tab"
                    className="p-2.5 rounded-lg text-slate-500 hover:text-teal-400 hover:bg-teal-500/10 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
          <p className="text-slate-600 text-[10px] px-2 pt-1 leading-snug">Copy pastes the name and link together — ready to drop into WhatsApp, email, or a message.</p>
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
        print:hidden
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
          className="fixed inset-0 z-30 bg-black/60 lg:hidden print:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden print:hidden sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center gap-3">
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
