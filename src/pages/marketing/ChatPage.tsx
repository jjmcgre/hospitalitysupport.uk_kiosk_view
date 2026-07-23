import { useEffect, useState, useRef, useMemo } from 'react';
import { Send, Users, MessageCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import PageHeader from './components/PageHeader';

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  recipient_id: string | null;
  created_at: string;
}

interface TeamMember {
  id: string;
  display_name: string;
  role: string;
}

function fmtTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return `Yesterday ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function ChatPage() {
  const { user, profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activeThread, setActiveThread] = useState<string | 'all'>('all');
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  async function loadData() {
    setLoading(true);
    const [msgRes, memRes] = await Promise.all([
      supabase.from('chat_messages').select('*').order('created_at', { ascending: true }),
      supabase.from('user_profiles').select('id, display_name, role').eq('is_active', true).order('display_name'),
    ]);
    setMessages((msgRes.data ?? []) as Message[]);
    setMembers((memRes.data ?? []) as TeamMember[]);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('chat_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, payload => {
        const msg = payload.new as Message;
        // Only add if we can see it
        const canSee =
          msg.recipient_id === null ||
          msg.recipient_id === profile?.id ||
          msg.sender_id === profile?.id ||
          isAdmin;
        if (canSee) {
          setMessages(prev => [...prev, msg]);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [profile?.id, isAdmin]);

  // Scroll to bottom when messages update
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeThread]);

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'You';

  // Thread messages
  const threadMessages = useMemo(() => {
    if (!profile) return [];
    if (activeThread === 'all') {
      return messages.filter(m => m.recipient_id === null);
    }
    return messages.filter(m =>
      (m.sender_id === profile.id && m.recipient_id === activeThread) ||
      (m.sender_id === activeThread && m.recipient_id === profile.id)
    );
  }, [messages, activeThread, profile]);

  // Unread counts (messages since last localStorage timestamp)
  function getLastSeen(threadId: string): number {
    return parseInt(localStorage.getItem(`chat_seen_${threadId}`) ?? '0', 10);
  }
  function markSeen(threadId: string) {
    localStorage.setItem(`chat_seen_${threadId}`, String(Date.now()));
  }
  function unreadCount(threadId: string): number {
    const lastSeen = getLastSeen(threadId);
    if (threadId === 'all') {
      return messages.filter(m => m.recipient_id === null && new Date(m.created_at).getTime() > lastSeen && m.sender_id !== profile?.id).length;
    }
    return messages.filter(m =>
      ((m.sender_id === threadId && m.recipient_id === profile?.id)) &&
      new Date(m.created_at).getTime() > lastSeen
    ).length;
  }

  function handleSelectThread(id: string | 'all') {
    setActiveThread(id);
    markSeen(id);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || !profile) return;
    setSending(true);
    await supabase.from('chat_messages').insert({
      sender_id: profile.id,
      sender_name: displayName,
      content: text,
      recipient_id: activeThread === 'all' ? null : activeThread,
    });
    setInput('');
    setSending(false);
    markSeen(activeThread);
  }

  const otherMembers = members.filter(m => m.id !== profile?.id);

  const activeLabel = activeThread === 'all'
    ? 'All Team'
    : (members.find(m => m.id === activeThread)?.display_name ?? 'Direct message');

  return (
    <div className="min-h-full flex flex-col" style={{ height: 'calc(100vh - 0px)' }}>
      <PageHeader title="Team Chat" subtitle="Send messages to the whole team or directly to a colleague." />

      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 130px)' }}>
        {/* Thread list */}
        <div className="w-56 flex-shrink-0 border-r border-slate-800 bg-slate-900/50 flex flex-col">
          <div className="px-4 py-3 border-b border-slate-800">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversations</span>
          </div>
          <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {/* All team broadcast */}
            <ThreadRow
              label="All Team"
              icon={<Users size={14} />}
              active={activeThread === 'all'}
              unread={unreadCount('all')}
              lastMsg={messages.filter(m => m.recipient_id === null).slice(-1)[0]?.content}
              onClick={() => handleSelectThread('all')}
            />
            {/* Direct threads */}
            {otherMembers.map(member => (
              <ThreadRow
                key={member.id}
                label={member.display_name}
                icon={<span className="w-3.5 h-3.5 rounded-full bg-teal-500/30 flex items-center justify-center text-[8px] text-teal-400 font-bold flex-shrink-0">{member.display_name.charAt(0).toUpperCase()}</span>}
                active={activeThread === member.id}
                unread={unreadCount(member.id)}
                lastMsg={messages.filter(m =>
                  (m.sender_id === profile?.id && m.recipient_id === member.id) ||
                  (m.sender_id === member.id && m.recipient_id === profile?.id)
                ).slice(-1)[0]?.content}
                onClick={() => handleSelectThread(member.id)}
              />
            ))}
          </nav>
        </div>

        {/* Message pane */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Thread header */}
          <div className="flex items-center gap-3 px-6 py-3 border-b border-slate-800 bg-slate-900/30">
            <MessageCircle size={14} className="text-teal-400" />
            <span className="text-sm font-semibold text-white">{activeLabel}</span>
            {activeThread === 'all' && (
              <span className="text-[10px] text-slate-600 ml-auto">Visible to entire team</span>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {loading ? (
              <div className="flex items-center justify-center h-32 text-slate-600 text-sm">
                <RefreshCw size={16} className="animate-spin mr-2" />Loading…
              </div>
            ) : threadMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-slate-600 text-sm">
                <MessageCircle size={24} className="mb-2 opacity-30" />
                No messages yet. Say hello!
              </div>
            ) : (
              threadMessages.map((msg, i) => {
                const isMe = msg.sender_id === profile?.id;
                const prevMsg = threadMessages[i - 1];
                const sameGroup = prevMsg?.sender_id === msg.sender_id &&
                  (new Date(msg.created_at).getTime() - new Date(prevMsg.created_at).getTime()) < 300000;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${sameGroup ? 'mt-0.5' : 'mt-3'}`}>
                    <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                      {!sameGroup && (
                        <span className={`text-[10px] text-slate-600 px-1 ${isMe ? 'text-right' : 'text-left'}`}>
                          {isMe ? 'You' : msg.sender_name} · {fmtTime(msg.created_at)}
                        </span>
                      )}
                      <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? 'bg-teal-500 text-white rounded-tr-sm'
                          : 'bg-slate-800 text-slate-200 rounded-tl-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={endRef} />
          </div>

          {/* Compose bar */}
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/30">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
                }}
                placeholder={activeThread === 'all' ? 'Message all team…' : `Message ${activeLabel}…`}
                rows={1}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors resize-none leading-relaxed"
                style={{ maxHeight: '120px', overflowY: 'auto' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-1.5">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreadRow({
  label, icon, active, unread, lastMsg, onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  unread: number;
  lastMsg?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
        active ? 'bg-teal-500/15 text-teal-300' : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <span className="truncate block">{label}</span>
        {lastMsg && <span className="text-[10px] text-slate-600 truncate block mt-0.5">{lastMsg}</span>}
      </div>
      {unread > 0 && (
        <span className="flex-shrink-0 min-w-[18px] h-[18px] bg-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
          {unread > 99 ? '99+' : unread}
        </span>
      )}
    </button>
  );
}
