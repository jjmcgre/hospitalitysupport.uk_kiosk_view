import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ExternalLink } from 'lucide-react';
import type { StaticAd } from './staticAdData';

interface Props {
  ad: StaticAd;
  username: string;
  handle: string;
}

export default function StaticAdPreview({ ad, username, handle }: Props) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(parseInt(ad.likes.replace(/[^0-9]/g, '')) * (ad.likes.includes('k') ? 1000 : 1));

  const handleLike = () => {
    setLiked((l) => {
      setLikeCount((c) => l ? c - 1 : c + 1);
      return !l;
    });
  };

  const bgColors: Record<string, string> = {
    'dark-navy': '#0f1623',
    'off-white': '#f5f3ef',
    'charcoal': '#1a1d24',
  };

  const textColors: Record<string, string> = {
    'dark-navy': '#ffffff',
    'off-white': '#111827',
    'charcoal': '#ffffff',
  };

  const subTextColors: Record<string, string> = {
    'dark-navy': 'rgba(255,255,255,0.65)',
    'off-white': '#374151',
    'charcoal': 'rgba(255,255,255,0.6)',
  };

  const borderColors: Record<string, string> = {
    'dark-navy': 'rgba(255,255,255,0.08)',
    'off-white': 'rgba(0,0,0,0.1)',
    'charcoal': 'rgba(255,255,255,0.08)',
  };

  const bg = bgColors[ad.bgStyle];
  const textColor = textColors[ad.bgStyle];
  const subColor = subTextColors[ad.bgStyle];
  const borderColor = borderColors[ad.bgStyle];
  const isDark = ad.bgStyle !== 'off-white';

  const formattedLikes = likeCount >= 1000 ? `${(likeCount / 1000).toFixed(likeCount % 1000 === 0 ? 0 : 1)}k` : String(likeCount);

  return (
    <div className="flex flex-col" style={{ width: 320 }}>
      <div
        className="rounded-2xl overflow-hidden shadow-2xl border"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.12)' }}
      >
        <PostHeader username={username} handle={handle} accentColor={ad.accentColor} isDark={isDark} />

        <AdCreative ad={ad} bg={bg} textColor={textColor} subColor={subColor} borderColor={borderColor} isDark={isDark} />

        <PostFooter
          liked={liked}
          saved={saved}
          likes={formattedLikes}
          comments={ad.comments}
          onLike={handleLike}
          onSave={() => setSaved((s) => !s)}
          isDark={isDark}
          accentColor={ad.accentColor}
        />
      </div>
    </div>
  );
}

function PostHeader({ username, handle, accentColor, isDark }: { username: string; handle: string; accentColor: string; isDark: boolean }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{ background: isDark ? '#0a0e17' : '#ffffff', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}` }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
          style={{ background: accentColor }}
        >
          HS
        </div>
        <div>
          <p className={`text-[12px] font-bold leading-none ${isDark ? 'text-white' : 'text-gray-900'}`}>{username}</p>
          <p className="text-[10px] mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : '#9ca3af' }}>Sponsored</p>
        </div>
      </div>
      <MoreHorizontal size={16} style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af' }} />
    </div>
  );
}

function AdCreative({ ad, bg, textColor, subColor, borderColor, isDark }: {
  ad: StaticAd; bg: string; textColor: string; subColor: string; borderColor: string; isDark: boolean;
}) {
  return (
    <div
      className="relative flex flex-col"
      style={{ background: bg, minHeight: 320, padding: '20px 20px 16px' }}
    >
      <BadgePill label={ad.badge} accentColor={ad.accentColor} isDark={isDark} />

      <div className="mt-4 mb-4 flex-1">
        <h2
          className="font-black leading-tight"
          style={{ fontSize: 26, color: textColor, letterSpacing: '-0.02em', lineHeight: 1.12 }}
        >
          {ad.headline}
          {ad.headlineAccent && (
            <> <span style={{ color: textColor }}>{ad.headlineAccent}</span></>
          )}
        </h2>
        {ad.subheadline && (
          <p className="mt-1 font-semibold text-sm" style={{ color: subColor }}>
            {ad.subheadline}
          </p>
        )}
      </div>

      {ad.pillTags && ad.pillTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {ad.pillTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold px-3 py-1.5 rounded-full border"
              style={{ color: textColor, borderColor: borderColor, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {ad.mockupType !== 'none' && (
        <div className="mb-3">
          {ad.mockupType === 'chat' && <ChatMockup messages={ad.mockupContent.chatMessages || []} accentColor={ad.accentColor} isDark={isDark} />}
          {ad.mockupType === 'dashboard' && <DashboardMockup rows={ad.mockupContent.dashboardRows || []} accentColor={ad.accentColor} isDark={isDark} />}
          {ad.mockupType === 'phone-ui' && <PhoneUIMockup screen={ad.mockupContent.phoneScreen!} accentColor={ad.accentColor} />}
          {ad.mockupType === 'metric-cards' && <MetricCardsMockup cards={ad.mockupContent.metricCards || []} isDark={isDark} />}
        </div>
      )}

      {ad.trustLogos && ad.trustLogos.length > 0 && (
        <TrustSection logos={ad.trustLogos} label={ad.trustLabel || ''} textColor={textColor} subColor={subColor} borderColor={borderColor} isDark={isDark} />
      )}

      <LearnMoreBar accentColor={ad.accentColor} label={ad.ctaText} />
    </div>
  );
}

function BadgePill({ label, accentColor, isDark }: { label: string; accentColor: string; isDark: boolean }) {
  return (
    <div className="flex justify-center">
      <div
        className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black tracking-wide"
        style={{
          background: accentColor,
          color: '#fff',
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function ChatMockup({ messages, accentColor, isDark }: {
  messages: { role: 'user' | 'assistant'; text: string }[];
  accentColor: string;
  isDark: boolean;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: accentColor }} />
        <span className="text-[10px] font-bold" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>ServiceSupport.UK</span>
        <span className="text-[9px] ml-auto" style={{ color: accentColor }}>● Online</span>
      </div>
      <div className="p-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="rounded-2xl px-3 py-1.5 text-[10px] leading-snug max-w-[85%] font-medium"
              style={{
                background: m.role === 'user'
                  ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)')
                  : accentColor + '22',
                color: m.role === 'user'
                  ? (isDark ? 'rgba(255,255,255,0.85)' : '#1f2937')
                  : (isDark ? '#fff' : '#1f2937'),
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardMockup({ rows, accentColor, isDark }: {
  rows: { label: string; value: string; change?: string; up?: boolean }[];
  accentColor: string;
  isDark: boolean;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', background: isDark ? 'rgba(255,255,255,0.03)' : '#f9fafb' }}
      >
        {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
          <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
        ))}
        <span className="text-[10px] font-semibold ml-2" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#6b7280' }}>Live Dashboard</span>
      </div>
      <div className="divide-y" style={{ divideColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#4b5563' }}>{row.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black" style={{ color: isDark ? '#fff' : '#111827' }}>{row.value}</span>
              {row.change && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    color: row.up ? '#10b981' : '#f59e0b',
                    background: row.up ? '#10b98118' : '#f59e0b18',
                  }}
                >
                  {row.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneUIMockup({ screen, accentColor }: {
  screen: { title: string; items: { label: string; value: string; status?: 'ok' | 'warn' | 'alert' }[] };
  accentColor: string;
}) {
  const statusColors: Record<string, string> = { ok: '#10b981', warn: '#f59e0b', alert: '#ef4444' };

  return (
    <div className="flex justify-center">
      <div
        className="rounded-[20px] overflow-hidden border-2 shadow-xl"
        style={{ width: 200, borderColor: '#374151', background: '#111827' }}
      >
        <div className="flex items-center justify-center py-2 relative" style={{ background: '#1f2937' }}>
          <div className="w-12 h-1 rounded-full bg-gray-600" />
        </div>
        <div className="px-3 pb-3 pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black text-white">{screen.title}</span>
            <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
          </div>
          <div className="space-y-1.5">
            {screen.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-2 py-1.5"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <span className="text-[10px] text-gray-300 font-medium">{item.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-white">{item.value}</span>
                  {item.status && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[item.status] }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-4 flex items-center justify-center" style={{ background: '#1f2937' }}>
          <div className="w-20 h-1 rounded-full bg-gray-600" />
        </div>
      </div>
    </div>
  );
}

function MetricCardsMockup({ cards, isDark }: {
  cards: { label: string; value: string; sub: string; color: string }[];
  isDark: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {cards.map((card, i) => (
        <div
          key={i}
          className="rounded-xl p-3 border"
          style={{
            background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          }}
        >
          <div className="text-[9px] font-bold uppercase tracking-wide mb-1" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#9ca3af' }}>
            {card.label}
          </div>
          <div className="font-black text-lg leading-none" style={{ color: card.color }}>
            {card.value}
          </div>
          <div className="text-[9px] mt-1 leading-snug" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#6b7280' }}>
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

function TrustSection({ logos, label, textColor, subColor, borderColor, isDark }: {
  logos: string[]; label: string; textColor: string; subColor: string; borderColor: string; isDark: boolean;
}) {
  return (
    <div className="mb-4">
      <p className="text-center text-[11px] font-semibold mb-3" style={{ color: subColor }}>
        We are trusted by
      </p>
      <div className="grid grid-cols-3 gap-2">
        {logos.map((logo) => (
          <div
            key={logo}
            className="rounded-lg px-2 py-2 flex items-center justify-center border text-center"
            style={{
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              borderColor,
            }}
          >
            <span className="text-[8px] font-black leading-tight text-center" style={{ color: subColor }}>
              {logo}
            </span>
          </div>
        ))}
      </div>
      {label && (
        <p className="text-center text-[10px] mt-2 font-semibold" style={{ color: subColor }}>
          {label}
        </p>
      )}
    </div>
  );
}

function LearnMoreBar({ accentColor, label }: { accentColor: string; label: string }) {
  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-2.5 mt-2"
      style={{ background: accentColor }}
    >
      <span className="text-white text-[11px] font-black tracking-wide">{label}</span>
      <ExternalLink size={13} className="text-white/80" />
    </div>
  );
}

function PostFooter({ liked, saved, likes, comments, onLike, onSave, isDark, accentColor }: {
  liked: boolean; saved: boolean; likes: string; comments: string;
  onLike: () => void; onSave: () => void; isDark: boolean; accentColor: string;
}) {
  const iconColor = isDark ? 'rgba(255,255,255,0.75)' : '#374151';
  const bg = isDark ? '#0a0e17' : '#ffffff';

  return (
    <div
      className="px-4 py-3 border-t"
      style={{ background: bg, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onLike} className="flex items-center gap-1.5 transition-transform active:scale-90">
            <Heart
              size={20}
              style={{ color: liked ? '#ef4444' : iconColor, fill: liked ? '#ef4444' : 'none' }}
            />
          </button>
          <button className="flex items-center gap-1.5">
            <MessageCircle size={20} style={{ color: iconColor }} />
          </button>
          <button>
            <Send size={19} style={{ color: iconColor }} />
          </button>
        </div>
        <button onClick={onSave} className="transition-transform active:scale-90">
          <Bookmark
            size={20}
            style={{ color: saved ? accentColor : iconColor, fill: saved ? accentColor : 'none' }}
          />
        </button>
      </div>
      <div className="mt-2">
        <span className="text-[11px] font-bold" style={{ color: isDark ? '#fff' : '#111827' }}>
          {likes} likes
        </span>
        <span className="text-[10px] ml-2" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : '#9ca3af' }}>
          · {comments} comments
        </span>
      </div>
    </div>
  );
}
