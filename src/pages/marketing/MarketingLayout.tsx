import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import {
  Menu, X, LayoutDashboard, Mail, MessageSquare, Palette,
  CalendarDays, Copy, Check, ExternalLink, Share2, LogOut, User, Pencil,
  GitBranch, Users, PoundSterling, Inbox, Phone, FolderOpen, MessageCircle,
  Plus, PanelLeftClose, PanelLeftOpen, Trash2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import LogDealModal from './components/LogDealModal';

const shareLinks = [
  { name: 'ServiceSupport.UK — Product Overview', path: '/demo', description: 'Full product landing page' },
  { name: 'ServiceSupport.UK — Commission Structure', path: '/commission-structure', description: 'Share with prospective team members' },
];

function CopyBtn({ text, title, children }: { text: string; title: string; children: React.ReactNode }) {
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
      className={`p-2.5 rounded-lg transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center ${
        copied ? 'text-teal-400 bg-teal-500/10' : 'text-slate-500 hover:text-teal-400 hover:bg-teal-500/10'
      }`}
    >
      {copied ? <Check size={13} /> : children}
    </button>
  );
}

function SharePanel({ userId }: { userId: string | null }) {
  const [open, setOpen] = useState(false);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return (
    <div className="mt-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
      >
        <span className="flex items-center gap-2">
          <Share2 size={14} className="flex-shrink-0" />
          Share links
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="mt-1 space-y-1.5 px-1 pb-2">
          {shareLinks.map((link) => {
            const refParam = userId ? `?ref=${userId}` : '';
            const fullUrl = `${origin}${link.path}${refParam}`;
            return (
              <div key={link.path} className="bg-slate-800/60 rounded-xl px-3 py-2.5">
                <p className="text-white text-xs font-semibold leading-snug mb-0.5">{link.name}</p>
                <p className="text-slate-500 text-[10px] mb-1.5">{link.description}</p>
                <div className="flex items-center gap-1">
                  <CopyBtn text={`${link.name}\n${fullUrl}`} title="Copy name + link">
                    <Copy size={12} />
                  </CopyBtn>
                  <span className="text-slate-600 text-[10px] flex-1 font-mono truncate">{window.location.host}{link.path}</span>
                  <a href={link.path} target="_blank" rel="noopener noreferrer" title="Open"
                    className="p-2.5 rounded-lg text-slate-500 hover:text-teal-400 hover:bg-teal-500/10 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
                    <ExternalLink size={12} />
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

function NavItem({ to, label, icon: Icon, end, collapsed }: { to: string; label: string; icon: React.ElementType; end?: boolean; collapsed?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          collapsed ? 'justify-center px-2' : ''
        } ${
          isActive
            ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
            : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
        }`
      }
    >
      <Icon size={15} className="flex-shrink-0" />
      {!collapsed && label}
    </NavLink>
  );
}

export default function MarketingLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const { user, signOut, profile, profileLoading, refetchProfile } = useAuth();
  const navigate = useNavigate();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!profileLoading && !profile && user) {
      setShowProfileModal(true);
    }
  }, [profile, profileLoading, user]);

  async function saveProfile() {
    if (!user || !profileName.trim()) return;
    setSavingProfile(true);
    await supabase.from('user_profiles').upsert({
      id: user.id,
      auth_user_id: user.id,
      display_name: profileName.trim(),
      phone: profilePhone.trim() || null,
    });
    await refetchProfile();
    setShowProfileModal(false);
    setSavingProfile(false);
  }

  async function handleSignOut() {
    await signOut();
    navigate('/login');
  }

  const close = () => setMobileOpen(false);
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'You';
  const initial = displayName.charAt(0).toUpperCase();
  const isAdmin = profile?.role === 'admin';

  const sidebar = (
    <aside className={`
      fixed inset-y-0 left-0 z-40 bg-slate-900 border-r border-slate-800 flex flex-col
      transform transition-all duration-300 ease-in-out
      ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:relative lg:translate-x-0 lg:flex
      ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
      w-64
      print:hidden
    `}>
      <div className={`flex items-center ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : 'justify-between'} px-5 py-5 border-b border-slate-800 lg:justify-between`}>
        <Link to="/" className="block hover:opacity-80 transition-opacity">
          {sidebarCollapsed ? (
            <span className="text-white font-bold text-sm tracking-tight lg:hidden">ServiceSupport<span className="text-teal-400">.UK</span></span>
          ) : (
            <span className="text-white font-bold text-sm tracking-tight">ServiceSupport<span className="text-teal-400">.UK</span></span>
          )}
          {!sidebarCollapsed && <p className="text-slate-500 text-xs mt-0.5 font-medium">Pipeline Hub</p>}
        </Link>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors flex-shrink-0"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        <div>
          {!sidebarCollapsed && <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-4 mb-1.5">Pipeline</p>}
          <NavItem to="/" label="Overview" icon={LayoutDashboard} end collapsed={sidebarCollapsed} />
          <NavItem to="/pipeline" label="Pipeline" icon={GitBranch} collapsed={sidebarCollapsed} />
          {isAdmin && <NavItem to="/inbound" label="Inbound Leads" icon={Inbox} collapsed={sidebarCollapsed} />}
          <NavItem to="/diary" label="Demo Diary" icon={CalendarDays} collapsed={sidebarCollapsed} />
        </div>

        <div className="border-t border-slate-800 pt-3">
          {!sidebarCollapsed && <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-4 mb-1.5">Team</p>}
          <NavItem to="/team" label="Team" icon={Users} collapsed={sidebarCollapsed} />
          <NavItem to="/commission" label="Commission" icon={PoundSterling} collapsed={sidebarCollapsed} />
          <NavItem to="/chat" label="Team Chat" icon={MessageCircle} collapsed={sidebarCollapsed} />
        </div>

        <div className="border-t border-slate-800 pt-3">
          {!sidebarCollapsed && <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-4 mb-1.5">Materials</p>}
          {!sidebarCollapsed && <SharePanel userId={user?.id ?? null} />}
          <NavItem to="/docs" label="Documents" icon={FolderOpen} collapsed={sidebarCollapsed} />
          <NavItem to="/email" label="Email Campaign" icon={Mail} collapsed={sidebarCollapsed} />
          <NavItem to="/sales" label="Scripts & Talking Points" icon={MessageSquare} collapsed={sidebarCollapsed} />
          <NavItem to="/brand" label="Brand" icon={Palette} collapsed={sidebarCollapsed} />
        </div>
      </nav>

      <div className={`p-4 border-t border-slate-800 ${sidebarCollapsed ? 'lg:p-2' : ''}`}>
        <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'lg:flex-col lg:gap-2' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0 text-teal-400 font-bold text-sm">
            {initial}
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-white text-xs font-semibold truncate">{displayName}</p>
                {isAdmin && (
                  <span className="text-[9px] font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/25 rounded-full px-1.5 py-px flex-shrink-0">
                    admin
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-[10px] truncate">{user?.email}</p>
            </div>
          )}
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => { setProfileName(profile?.display_name ?? ''); setProfilePhone(profile?.phone ?? ''); setShowProfileModal(true); }}
                title="Edit profile"
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-slate-800 transition-colors"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={13} />
              </button>
            </div>
          )}
          {sidebarCollapsed && (
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="hidden lg:flex p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={13} />
            </button>
          )}
        </div>
        {!profile?.display_name && !sidebarCollapsed && (
          <button
            onClick={() => setShowProfileModal(true)}
            className="mt-2 w-full text-[10px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-lg py-1.5 hover:bg-sky-500/15 transition-colors"
          >
            Set your display name
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/25 flex items-center justify-center">
                <User size={18} className="text-teal-400" />
              </div>
              <div>
                <h2 className="text-white font-bold text-base">Your profile</h2>
                <p className="text-slate-500 text-xs mt-0.5">Used on leads and commission tracking</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-[11px] font-semibold uppercase tracking-widest block mb-2">
                  Display name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  autoFocus
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveProfile(); }}
                  placeholder="James Smith"
                  maxLength={40}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[11px] font-semibold uppercase tracking-widest block mb-2 flex items-center gap-1">
                  <Phone size={10} />Mobile
                </label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={e => setProfilePhone(e.target.value)}
                  placeholder="07700 900000"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={saveProfile}
                disabled={!profileName.trim() || savingProfile}
                className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                {savingProfile ? 'Saving...' : 'Save'}
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

      {sidebar}

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden print:hidden" onClick={close} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="print:hidden sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-3 py-2.5 sm:px-4 flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-slate-400 hover:text-white transition-colors p-1.5 -ml-1 flex-shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-slate-800">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-white font-semibold text-sm lg:hidden">Pipeline Hub</span>
          <div className="flex-1" />
          <button
            onClick={() => setShowLog(true)}
            className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 transition-all text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} className="flex-shrink-0" />
            <span className="hidden sm:inline">Log a lead</span>
            <span className="sm:hidden">Lead</span>
          </button>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {showLog && profile && (
        <LogDealModal
          userId={profile.id}
          userName={profile.display_name || user?.email?.split('@')[0] || 'You'}
          onClose={() => setShowLog(false)}
        />
      )}
    </div>
  );
}
