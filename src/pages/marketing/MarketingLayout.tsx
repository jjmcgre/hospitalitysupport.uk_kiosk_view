import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Instagram, Video, Facebook, Linkedin, Mail, MessageSquare, Palette, BookOpen, FileText, Files, Monitor, Inbox, CalendarDays } from 'lucide-react';

const liveItems = [
  { to: '/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/diary', label: 'Demo Diary', icon: CalendarDays },
];

const campaignItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/instagram', label: 'Instagram', icon: Instagram },
  { to: '/tiktok', label: 'TikTok', icon: Video },
  { to: '/facebook', label: 'Facebook', icon: Facebook },
  { to: '/linkedin', label: 'LinkedIn', icon: Linkedin },
  { to: '/email', label: 'Email Campaign', icon: Mail },
  { to: '/sales', label: 'Sales & Talking Points', icon: MessageSquare },
  { to: '/brand', label: 'Brand & Positioning', icon: Palette },
  { to: '/brochure', label: 'Brochure / Sales Deck', icon: BookOpen },
  { to: '/print-1', label: '1-Pager (Print)', icon: FileText },
  { to: '/print-5', label: '5-Pager (Print)', icon: Files },
];

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
          {/* Kiosk Overview — the public-facing product page */}
          <div className="mb-2">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-1">Public</p>
            <Link
              to="/landing"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Monitor size={16} className="flex-shrink-0" />
              Kiosk Overview
            </Link>
          </div>

          <div className="border-t border-slate-800 pt-2 mb-2">
            <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-4 mb-1 mt-1">Live</p>
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
