import { useState, useRef } from 'react';
import { Copy, Check, Download, Loader2, FileText, Hash, Clapperboard, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from './components/PageHeader';
import TikTokPlayer from './tiktok/TikTokPlayer';
import { tiktokVideos, type TikTokVideo } from './tiktok/tiktokData';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const EL_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined;
const EL_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID as string | undefined;

export default function TikTokPage() {
  const [activeId, setActiveId] = useState(tiktokVideos[0].id);
  const video = tiktokVideos.find((v) => v.id === activeId)!;

  return (
    <div className="min-h-full">
      <PageHeader
        title="TikTok"
        subtitle="Three campaigns — copy the script, download the voiceover, and drop into CapCut."
        deployLabel="How to use: copy the script, download the voiceover MP3, import both into CapCut, export and upload to TikTok."
        badge="Video"
      />

      {/* Video selector */}
      <div className="px-8 pt-6 pb-2 flex gap-3 flex-wrap">
        {tiktokVideos.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveId(v.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all"
            style={{
              background: activeId === v.id ? v.accentColor : 'rgba(255,255,255,0.04)',
              color: activeId === v.id ? '#fff' : 'rgba(255,255,255,0.5)',
              border: `1px solid ${activeId === v.id ? v.accentColor : 'rgba(255,255,255,0.1)'}`,
              boxShadow: activeId === v.id ? `0 4px 20px ${v.accentColor}40` : 'none',
            }}
          >
            <span className="text-[10px] font-black opacity-60">{v.number}</span>
            {v.title}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="p-8 grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-10 items-start">
        {/* Left: phone preview */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-1">
            <p className="text-white/30 text-xs uppercase tracking-widest font-bold">Animated Preview</p>
          </div>
          <TikTokPlayer video={video} />
        </div>

        {/* Right: panels */}
        <div className="flex flex-col gap-5 min-w-0">
          <VoiceoverPanel video={video} />
          <CaptionPanel video={video} />
          <CapCutPanel video={video} />
        </div>
      </div>
    </div>
  );
}

/* ─── Voiceover Download Panel ──────────────────────────────────────── */

type DlState = 'idle' | 'loading' | 'done' | 'error';

function VoiceoverPanel({ video }: { video: TikTokVideo }) {
  const [dlState, setDlState] = useState<DlState>('idle');
  const [errMsg, setErrMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const hasEL = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

  const downloadAudio = async () => {
    if (!hasEL) return;
    setDlState('loading');
    setErrMsg('');
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/tts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: video.voiceScript, apiKey: EL_API_KEY, voiceId: EL_VOICE_ID }),
      });
      if (!res.ok) throw new Error(`TTS ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tiktok-voiceover-${video.id}.mp3`;
      a.click();
      URL.revokeObjectURL(url);
      setDlState('done');
      setTimeout(() => setDlState('idle'), 3000);
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : 'Download failed');
      setDlState('error');
    }
  };

  const copyScript = () => {
    navigator.clipboard.writeText(video.voiceScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Panel
      icon={<Download size={16} />}
      title="Voiceover"
      accent={video.accentColor}
      badge="ElevenLabs AI"
    >
      <p className="text-white/50 text-sm leading-relaxed mb-4">{video.voiceScript}</p>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={downloadAudio}
          disabled={dlState === 'loading'}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          style={{ background: video.accentColor, boxShadow: `0 4px 16px ${video.accentColor}40` }}
        >
          {dlState === 'loading' ? <><Loader2 size={14} className="animate-spin" />Generating…</> :
            dlState === 'done' ? <><Check size={14} />Downloaded!</> :
              <><Download size={14} />Download MP3</>}
        </button>

        <button
          onClick={copyScript}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all hover:bg-white/5 active:scale-95"
          style={{ borderColor: 'rgba(255,255,255,0.12)', color: copied ? video.accentColor : 'rgba(255,255,255,0.6)' }}
        >
          {copied ? <><Check size={13} />Copied!</> : <><Copy size={13} />Copy script</>}
        </button>
      </div>

      {dlState === 'error' && (
        <p className="text-red-400 text-xs mt-3">{errMsg}</p>
      )}

      <audio ref={audioRef} className="hidden" />
    </Panel>
  );
}

/* ─── Caption Panel ─────────────────────────────────────────────────── */

function CaptionPanel({ video }: { video: TikTokVideo }) {
  const [captionCopied, setCaptionCopied] = useState(false);
  const [hashCopied, setHashCopied] = useState(false);
  const [open, setOpen] = useState(true);

  const captionText = video.captionLines.join('\n');

  const copyCaption = () => {
    navigator.clipboard.writeText(captionText);
    setCaptionCopied(true);
    setTimeout(() => setCaptionCopied(false), 2000);
  };

  const copyHashtags = () => {
    navigator.clipboard.writeText(video.hashtags);
    setHashCopied(true);
    setTimeout(() => setHashCopied(false), 2000);
  };

  return (
    <Panel
      icon={<FileText size={16} />}
      title="Caption & Hashtags"
      accent={video.accentColor}
      badge="CapCut / TikTok"
      collapsible
      open={open}
      onToggle={() => setOpen((o) => !o)}
    >
      {open && (
        <>
          {/* Caption */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Caption</p>
              <button
                onClick={copyCaption}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: captionCopied ? video.accentColor : 'rgba(255,255,255,0.45)' }}
              >
                {captionCopied ? <><Check size={11} />Copied</> : <><Copy size={11} />Copy</>}
              </button>
            </div>
            <div
              className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap font-mono"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)' }}
            >
              {captionText}
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Hash size={11} />Hashtags
              </p>
              <button
                onClick={copyHashtags}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.1)', color: hashCopied ? video.accentColor : 'rgba(255,255,255,0.45)' }}
              >
                {hashCopied ? <><Check size={11} />Copied</> : <><Copy size={11} />Copy</>}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {video.hashtags.split(' ').map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full font-bold cursor-pointer transition-colors hover:opacity-80"
                  style={{ background: video.accentColor + '20', color: video.accentColor, border: `1px solid ${video.accentColor}35` }}
                  onClick={() => { navigator.clipboard.writeText(tag); }}
                >{tag}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </Panel>
  );
}

/* ─── CapCut Tips Panel ─────────────────────────────────────────────── */

function CapCutPanel({ video }: { video: TikTokVideo }) {
  const [open, setOpen] = useState(false);

  return (
    <Panel
      icon={<Clapperboard size={16} />}
      title="CapCut / Editing Tips"
      accent={video.accentColor}
      badge="Production notes"
      collapsible
      open={open}
      onToggle={() => setOpen((o) => !o)}
    >
      {open && (
        <ol className="space-y-2.5">
          {video.capCutTips.map((tip, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5"
                style={{ background: video.accentColor + '25', color: video.accentColor }}
              >{i + 1}</span>
              <span className="text-white/60 text-sm leading-relaxed">{tip}</span>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
}

/* ─── Shared Panel wrapper ──────────────────────────────────────────── */

function Panel({
  icon, title, accent, badge, children, collapsible, open, onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  badge?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  open?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div
        className={`flex items-center justify-between px-5 py-4 ${collapsible ? 'cursor-pointer select-none' : ''}`}
        style={{ borderBottom: open !== false ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
        onClick={collapsible ? onToggle : undefined}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: accent + '25', color: accent }}
          >{icon}</div>
          <span className="text-white font-bold text-sm">{title}</span>
          {badge && (
            <span
              className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide"
              style={{ background: accent + '20', color: accent }}
            >{badge}</span>
          )}
        </div>
        {collapsible && (
          open
            ? <ChevronUp size={16} className="text-white/30" />
            : <ChevronDown size={16} className="text-white/30" />
        )}
      </div>
      {open !== false && (
        <div className="p-5">{children}</div>
      )}
    </div>
  );
}
