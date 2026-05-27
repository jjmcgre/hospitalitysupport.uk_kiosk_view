import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Instagram, Video, Facebook, Linkedin, Mail, MessageSquare, Palette, BookOpen, FileText, Files, Inbox, CalendarDays, Copy, Check, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const liveItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/email', label: 'Email Campaign', icon: Mail },
  { to: '/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/diary', label: 'Demo Diary', icon: CalendarDays },
];

const campaignItems = [
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
  { label: 'Product Overview', path: '/demo', description: 'Kiosk / landing page' },
  { label: 'Brochure', path: '/brochure', description: '8-page square PDF' },
  { label: '1-Page Summary', path: '/one-pager', description: 'A4 single page' },
  { label: 'Sales Pack', path: '/sales-pack', description: '5-page A4 detail' },
];

function ShareRow({ label, path, description }: { label: string; path: string; description: string }) {
  const [copied, setCopied] = useState(false);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${origin}${path}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(fullUrl)}`;

  const copy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center gap-1.5 px-2 py-2 rounded-xl hover:bg-slate-800/50 transition-colors group">
      <div className="flex-1 min-w-0">
        <p className="text-slate-200 text-xs font-semibold leading-tight truncate">{label}</p>
        <p className="text-slate-600 text-[10px] truncate">{description}</p>
      </div>
      {/* WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Send via WhatsApp"
        className="p-2 rounded-lg text-slate-500 hover:text-green-400 hover:bg-green-500/10 transition-colors flex-shrink-0"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      {/* Copy URL */}
      <button
        onClick={copy}
        title="Copy link"
        className={`p-2 rounded-lg transition-colors flex-shrink-0 ${copied ? 'text-teal-400 bg-teal-500/10' : 'text-slate-500 hover:text-teal-400 hover:bg-teal-500/10'}`}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      {/* Open */}
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        title="Open in new tab"
        className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700 transition-colors flex-shrink-0"
      >
        <ExternalLink size={14} />
      </a>
    </div>
  );
}

function PublicLinks() {
  return (
    <div className="px-1 pb-2">
      <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-2 mb-1">Public Links</p>
      {shareLinks.map((link) => (
        <ShareRow key={link.path} {...link} />
      ))}
    </div>
  );
}

function MobileHeader({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  return (
    <div className="lg:hidden print:hidden sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      {/* Top bar */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="text-white font-semibold text-sm">Campaign Book</span>
        <div className="ml-auto">
          <span className="text-teal-300 text-xs font-semibold bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1">£3.30 / day</span>
        </div>
      </div>
      {/* Always-visible share links */}
      <div className="px-3 pb-2 border-t border-slate-800/60">
        <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-1 pt-2 pb-1">Public Links</p>
        <div className="grid grid-cols-2 gap-1.5">
          {shareLinks.map((link) => (
            <MobileShareCard key={link.path} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileShareCard({ label, path, description }: { label: string; path: string; description: string }) {
  const [copied, setCopied] = useState(false);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${origin}${path}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(fullUrl)}`;

  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-slate-800/60 rounded-xl px-3 py-2.5">
      <p className="text-slate-200 text-xs font-semibold leading-tight mb-0.5">{label}</p>
      <p className="text-slate-600 text-[10px] mb-2">{description}</p>
      <div className="flex items-center gap-1">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Send via WhatsApp"
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-[10px] font-semibold transition-colors hover:bg-green-500/20"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
        <button
          onClick={copy}
          title="Copy link"
          className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${copied ? 'text-teal-400 bg-teal-500/10' : 'text-slate-500 hover:text-teal-400 hover:bg-teal-500/10'}`}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
    </div>
  );
}

export default function MarketingLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navLink = (item: { to: string; label: string; icon: React.ElementType; end?: boolean }, closeMobile = false) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      onClick={() => closeMobile && setMobileOpen(false)}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          collapsed ? 'justify-center px-0 py-3 w-10 mx-auto' : 'px-4 py-3'
        } ${
          isActive
            ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
            : 'text-slate-400 hover:text-white hover:bg-slate-800'
        }`
      }
    >
      <item.icon size={16} className="flex-shrink-0" />
      {!collapsed && item.label}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <aside className={`
        fixed inset-y-0 left-0 z-40 bg-slate-900 border-r border-slate-800 flex flex-col
        transform transition-all duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        ${collapsed ? 'lg:w-16' : 'lg:w-72'}
        w-72
        lg:relative lg:translate-x-0 lg:flex
        print:hidden
      `}>
        {/* Header */}
        <div className={`border-b border-slate-800 transition-all duration-300 ${collapsed ? 'p-3' : 'p-6'}`}>
          {collapsed ? (
            <div className="flex justify-center">
              <span className="text-teal-400 font-black text-lg">H</span>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="mb-1">
            {!collapsed && <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-1">Live</p>}
            {liveItems.map((item) => navLink(item, true))}
          </div>

          <div className="border-t border-slate-800 pt-2">
            {!collapsed && <PublicLinks />}
            {!collapsed && <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-1 mt-2">Campaign</p>}
            {campaignItems.map((item) => navLink(item, true))}
          </div>

          <div className="border-t border-slate-800 pt-2">
            {!collapsed && <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-1 mt-1">Social</p>}
            {socialItems.map((item) => navLink(item, true))}
          </div>
        </nav>

        {/* Collapse toggle — desktop only */}
        <div className="hidden lg:flex p-3 border-t border-slate-800 items-center justify-between">
          {!collapsed && <p className="text-slate-600 text-xs">HospitalitySupport.uk · Internal</p>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors ${collapsed ? 'mx-auto' : 'ml-auto'}`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Mobile footer */}
        <div className="lg:hidden p-4 border-t border-slate-800">
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
        <MobileHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
