import { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { ArrowLeft, Menu, X, LayoutDashboard, Instagram, Video, Facebook, Linkedin, Mail, MessageSquare, Palette, BookOpen, FileText, Files } from 'lucide-react';

const navItems = [
  { to: '/marketing', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/marketing/instagram', label: 'Instagram', icon: Instagram },
  { to: '/marketing/tiktok', label: 'TikTok', icon: Video },
  { to: '/marketing/facebook', label: 'Facebook', icon: Facebook },
  { to: '/marketing/linkedin', label: 'LinkedIn', icon: Linkedin },
  { to: '/marketing/email', label: 'Email Campaign', icon: Mail },
  { to: '/marketing/sales', label: 'Sales & Talking Points', icon: MessageSquare },
  { to: '/marketing/brand', label: 'Brand & Positioning', icon: Palette },
  { to: '/marketing/brochure', label: 'Brochure / Sales Deck', icon: BookOpen },
  { to: '/marketing/print-1', label: '1-Pager (Print)', icon: FileText },
  { to: '/marketing/print-5', label: '5-Pager (Print)', icon: Files },
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
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm mb-5 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to site
          </Link>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Campaign Book</h1>
            <div className="mt-2 inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span className="text-teal-300 text-xs font-semibold">£3.30 / day</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
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
        </nav>

        <div className="p-4 border-t border-slate-800">
          <p className="text-slate-600 text-xs text-center">HospitalitySupport.uk</p>
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
