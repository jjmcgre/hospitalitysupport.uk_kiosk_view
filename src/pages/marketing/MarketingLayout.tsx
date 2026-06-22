import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Instagram, Video, Facebook, Linkedin, Mail, MessageSquare, Palette, BookOpen, FileText, Files, Inbox, CalendarDays, Copy, Check, ExternalLink, Share2, LogOut, User, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

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
  { name: 'ServiceSupport.UK — Product Overview', path: '/demo', description: 'Full product kiosk / landing page' },
  { name: 'ServiceSupport.UK — Brochure', path: '/brochure', description: '8-page square PDF, ready to print' },
  { name: 'ServiceSupport.UK — 1-Page Summary', path: '/one-pager', description: 'A4 single page, email or print' },
  { name: 'ServiceSupport.UK — Sales Pack', path: '/sales-pack', description: '5-page A4, full detail' },
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
    <div className="mt-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
      >
        <span className="flex items-center gap-2">
          <Share2 size={15} className="flex-shrink-0" />
          Marketing share links
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
                <p className="text-white text-xs font-bold leading-snug mb-0.5">{link.name}</p>
                <p className="text-slate-500 text-[10px] mb-2">{link.description}</p>
                <div className="flex items-center gap-1">
                  <CopyButton text={shareText} title="Copy name + link (paste into WhatsApp / email)">
                    <Copy size={14} />
                  </CopyButton>
                  <span className="text-slate-600 text-[10px] flex-1 font-mono truncate">{window.location.host}{link.path}</span>
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

interface Profile {
  display_name: string;
}

export default function MarketingLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from('user_profiles')
        .select('display_name')
        .eq('id', user.id)
        .maybeSingle();
      if (data) {
        setProfile(data);
        setProfileName(data.display_name);
      } else {
        setShowProfileModal(true);
      }
    })();
  }, [user]);

  async function saveProfile() {
    if (!user || !profileName.trim()) return;
    setSavingProfile(true);
    await supabase.from('user_profiles').upsert({
      id: user.id,
      display_name: profileName.trim(),
    });
    setProfile({ display_name: profileName.trim() });
    setShowProfileModal(false);
    setSavingProfile(false);
  }

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'You';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Profile setup modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center">
                <User size={18} className="text-teal-400" />
              </div>
              <div>
                <h2 className="text-white font-bold text-base">Set your display name</h2>
                <p className="text-slate-500 text-xs mt-0.5">Used to track leads you bring in</p>
              </div>
            </div>
            <input
              type="text"
              autoFocus
              value={profileName}
              onChange={e => setProfileName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveProfile(); }}
              placeholder="e.g. James Smith"
              maxLength={40}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={saveProfile}
                disabled={!profileName.trim() || savingProfile}
                className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
              >
                {savingProfile ? 'Saving...' : 'Save name'}
              </button>
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-4 text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex
        print:hidden
      `}>
        <div className="p-6 border-b border-slate-800">
          <span className="text-white font-black text-base tracking-tight">
            ServiceSupport<span className="text-teal-400">.UK</span>
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
                end={'end' in item ? item.end : undefined}
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
            <SharePanel />
            {campaignItems.map((item) => (
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
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0 text-teal-400 font-black text-sm">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-white text-xs font-bold truncate">{displayName}</p>
                {!profile?.display_name && (
                  <button
                    onClick={() => setShowProfileModal(true)}
                    title="Set display name"
                    className="text-amber-400 hover:text-amber-300 transition-colors flex-shrink-0"
                  >
                    <Pencil size={11} />
                  </button>
                )}
              </div>
              <p className="text-slate-600 text-[10px] truncate">{user?.email}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {profile?.display_name && (
                <button
                  onClick={() => { setProfileName(profile.display_name); setShowProfileModal(true); }}
                  title="Edit name"
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  <Pencil size={13} />
                </button>
              )}
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={13} />
              </button>
            </div>
          </div>
          {!profile?.display_name && (
            <button
              onClick={() => setShowProfileModal(true)}
              className="mt-2 w-full text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg py-1.5 hover:bg-amber-500/15 transition-colors"
            >
              Set your display name for lead tracking
            </button>
          )}
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
