import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Music2, Volume2, VolumeX, Play, Pause, Plus } from 'lucide-react';
import type { TikTokVideo, TikTokBeat } from './tiktokData';
import { createVoiceController } from '../instagram/voiceover';

interface Props {
  video: TikTokVideo;
}

type State = 'idle' | 'playing' | 'paused' | 'done';

export default function TikTokPlayer({ video }: Props) {
  const [state, setState] = useState<State>('idle');
  const [beatIdx, setBeatIdx] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [likeCount] = useState(Math.floor(Math.random() * 8000) + 1200);
  const [commentCount] = useState(Math.floor(Math.random() * 400) + 80);

  const totalMs = video.beats.reduce((s, b) => s + b.durationMs, 0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const beatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voiceRef = useRef(createVoiceController());
  const muteRef = useRef(muted);
  muteRef.current = muted;

  const clearBeatTimer = () => {
    if (beatTimerRef.current) { clearTimeout(beatTimerRef.current); beatTimerRef.current = null; }
  };
  const stopRaf = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = 0; }
  };

  useEffect(() => () => { stopRaf(); clearBeatTimer(); voiceRef.current.stop(); }, []);

  useEffect(() => {
    stopRaf(); clearBeatTimer(); voiceRef.current.stop();
    setState('idle'); setBeatIdx(0); setExiting(false); setProgress(0);
  }, [video.id]);

  const tickProgress = useCallback((elapsed: number) => {
    const pct = Math.min(elapsed / totalMs, 1);
    setProgress(pct);
    if (pct < 1) {
      rafRef.current = requestAnimationFrame(() => tickProgress(Date.now() - startTimeRef.current));
    }
  }, [totalMs]);

  const scheduleBeat = useCallback((idx: number) => {
    if (idx >= video.beats.length) return;
    const beat = video.beats[idx];
    clearBeatTimer();
    beatTimerRef.current = setTimeout(() => {
      if (idx + 1 < video.beats.length) {
        setExiting(true);
        setTimeout(() => { setBeatIdx(idx + 1); setExiting(false); scheduleBeat(idx + 1); }, 180);
      } else {
        setExiting(true);
        setTimeout(() => { setState('done'); setExiting(false); }, 220);
      }
    }, beat.durationMs);
  }, [video.beats]);

  const startFrom = useCallback((fromBeatIdx: number, elapsedBefore: number) => {
    setBeatIdx(fromBeatIdx);
    setExiting(false);
    setState('playing');
    startTimeRef.current = Date.now() - elapsedBefore;
    stopRaf();
    rafRef.current = requestAnimationFrame(() => tickProgress(elapsedBefore));
    scheduleBeat(fromBeatIdx);
    if (!muteRef.current) voiceRef.current.speak(video.voiceScript, () => {});
  }, [video, scheduleBeat, tickProgress]);

  const handlePlay = () => {
    if (state === 'done') { setProgress(0); startFrom(0, 0); return; }
    if (state === 'idle') { startFrom(0, 0); return; }
    if (state === 'playing') {
      pausedAtRef.current = Date.now() - startTimeRef.current;
      stopRaf(); clearBeatTimer(); voiceRef.current.stop(); setState('paused'); return;
    }
    if (state === 'paused') startFrom(beatIdx, pausedAtRef.current);
  };

  const handleMute = () => {
    const next = !muted;
    setMuted(next);
    if (next) voiceRef.current.stop();
    else if (state === 'playing') voiceRef.current.speak(video.voiceScript, () => {});
  };

  const doubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(true);
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 700);
  };

  const beat = video.beats[beatIdx];
  const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* TikTok phone shell */}
      <div className="relative flex gap-3 items-end">
        <div
          className="relative overflow-hidden select-none"
          style={{ width: 280, height: 498, borderRadius: 32, background: '#000', boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 0 2px rgba(255,255,255,0.06)' }}
          onClick={() => { if (state !== 'idle') handlePlay(); }}
          onDoubleClick={doubleTap}
        >
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${video.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.2) saturate(1.3)',
              transform: state === 'playing' ? 'scale(1.1)' : 'scale(1.04)',
              transition: state === 'playing' ? 'transform 28s linear' : 'transform 0.5s ease',
            }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.4) 40%, transparent 65%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 25%)' }} />

          {/* Progress bar (TikTok style — thin, bottom) */}
          <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-white/15">
            <div
              className="h-full"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${video.accentColor}, #fff)`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          {/* Top bar */}
          <div className="absolute top-4 left-0 right-0 flex items-center justify-center z-20">
            <span className="text-white text-[11px] font-semibold tracking-widest opacity-60">For You</span>
          </div>

          {/* Mute indicator */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={(e) => { e.stopPropagation(); handleMute(); }}
              className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm"
            >
              {muted ? <VolumeX size={13} className="text-white/50" /> : <Volume2 size={13} className="text-white" />}
            </button>
          </div>

          {/* Idle overlay */}
          {state === 'idle' && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center z-10 px-7 gap-6 text-center cursor-pointer"
              onClick={(e) => { e.stopPropagation(); handlePlay(); }}
            >
              <button
                className="w-16 h-16 rounded-full border-2 border-white/25 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)' }}
              >
                <Play size={26} className="text-white ml-1" fill="white" />
              </button>
              <p className="text-white text-[14px] font-bold leading-snug" style={{ textShadow: '0 2px 20px rgba(0,0,0,1)' }}>
                {video.hook}
              </p>
            </div>
          )}

          {/* Beat content */}
          {(state === 'playing' || state === 'paused') && (
            <div className="absolute inset-0 flex flex-col justify-center px-5 z-10" style={{ paddingBottom: 120, paddingTop: 70 }}>
              <BeatCard beat={beat} accentColor={video.accentColor} exiting={exiting} />
            </div>
          )}

          {/* Paused overlay */}
          {state === 'paused' && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <Pause size={22} className="text-white" fill="white" />
              </div>
            </div>
          )}

          {/* Done overlay */}
          {state === 'done' && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-4 text-center px-8"
              style={{ animation: 'ttScaleIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-lg"
                style={{ background: video.accentColor, boxShadow: `0 0 40px ${video.accentColor}60` }}
              >HS</div>
              <p
                className="font-black text-xl text-white leading-snug"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,1)', fontSize: 64, letterSpacing: '-0.03em', color: video.accentColor, lineHeight: 1 }}
              >£3.30</p>
              <p className="text-white/70 text-sm font-semibold">a day · per kitchen</p>
              <div
                className="px-5 py-2.5 rounded-xl text-white text-xs font-black mt-1"
                style={{ background: video.accentColor }}
              >ServiceSupport.UK</div>
            </div>
          )}

          {/* Heart burst */}
          {heartBurst && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <Heart size={80} className="text-red-500 fill-red-500" style={{ animation: 'ttHeartPop 0.65s ease both' }} />
            </div>
          )}

          {/* Bottom user info */}
          <div className="absolute bottom-6 left-4 right-16 z-20">
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className="text-[10px] font-black px-1.5 py-0.5 rounded"
                style={{ background: video.accentColor, color: '#fff' }}
              >{video.label}</span>
            </div>
            <p className="text-white text-[11px] font-bold">@servicesupport.uk</p>
            <p className="text-white/50 text-[10px] leading-snug line-clamp-2 mt-0.5">{video.hook}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <Music2 size={8} className="text-white/30" />
              <span className="text-white/30 text-[9px]">Original audio</span>
            </div>
          </div>
        </div>

        {/* TikTok right-side actions */}
        <div className="flex flex-col items-center gap-5 pb-6">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[10px] font-black border-2 border-white"
              style={{ background: video.accentColor }}
            >HS</div>
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: video.accentColor }}
            >
              <Plus size={11} className="text-white" strokeWidth={3} />
            </div>
          </div>

          <button
            className="flex flex-col items-center gap-0.5 mt-2"
            onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
          >
            <Heart
              size={28}
              className={liked ? 'text-red-500 fill-red-500' : 'text-white'}
              style={{ filter: liked ? 'drop-shadow(0 0 8px rgba(239,68,68,0.8))' : 'none' }}
            />
            <span className="text-white text-[10px] font-bold">{formatCount(likeCount + (liked ? 1 : 0))}</span>
          </button>

          <button className="flex flex-col items-center gap-0.5">
            <MessageCircle size={28} className="text-white" />
            <span className="text-white text-[10px] font-bold">{formatCount(commentCount)}</span>
          </button>

          <button className="flex flex-col items-center gap-0.5">
            <Bookmark
              size={26}
              className={saved ? 'fill-yellow-400 text-yellow-400' : 'text-white'}
              onClick={() => setSaved((s) => !s)}
            />
            <span className="text-white text-[10px] font-bold">{saved ? '1.2k' : '1.1k'}</span>
          </button>

          <button className="flex flex-col items-center gap-0.5">
            <Share2 size={24} className="text-white" />
            <span className="text-white text-[10px] font-bold">342</span>
          </button>

          {/* Spinning vinyl disc */}
          <div
            className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, #1a1a2e 30%, ${video.accentColor}50 100%)`,
              animation: state === 'playing' ? 'ttSpin 4s linear infinite' : 'none',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </div>
      </div>

      {/* Play controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-black text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: video.accentColor, boxShadow: `0 4px 20px ${video.accentColor}50` }}
        >
          {state === 'playing' ? <><Pause size={13} fill="white" />Pause</> :
            state === 'done' ? <><Play size={13} fill="white" />Replay</> :
              state === 'paused' ? <><Play size={13} fill="white" />Resume</> :
                <><Play size={13} fill="white" />Play preview</>}
        </button>
        <button
          onClick={handleMute}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-all"
          style={{
            background: muted ? '#1a1f2e' : video.accentColor + '15',
            borderColor: muted ? '#2a3040' : video.accentColor + '40',
            color: muted ? '#4a5568' : video.accentColor,
          }}
        >
          {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          {muted ? 'Sound off' : 'Sound on'}
        </button>
      </div>

      <style>{KEYFRAMES}</style>
    </div>
  );
}

function BeatCard({ beat, accentColor, exiting }: { beat: TikTokBeat; accentColor: string; exiting: boolean }) {
  const enterAnim =
    beat.enter === 'slam-up' ? 'ttSlamUp 0.2s cubic-bezier(0.22,1,0.36,1) both' :
    beat.enter === 'slam-left' ? 'ttSlamLeft 0.2s cubic-bezier(0.22,1,0.36,1) both' :
    beat.enter === 'slide-right' ? 'ttSlideRight 0.22s cubic-bezier(0.22,1,0.36,1) both' :
    beat.enter === 'scale-in' ? 'ttScaleIn 0.24s cubic-bezier(0.22,1,0.36,1) both' :
    'ttCutIn 0.08s ease both';
  const exitAnim = 'ttCutOut 0.14s ease both';

  if (beat.isBig) {
    return (
      <div style={{ animation: exiting ? exitAnim : enterAnim, willChange: 'transform, opacity' }} className="text-center">
        <p className="text-white/25 text-[9px] uppercase tracking-[0.3em] font-bold mb-1">ServiceSupport.UK</p>
        <p
          className="font-black leading-none"
          style={{ fontSize: 80, color: accentColor, textShadow: `0 0 80px ${accentColor}80`, letterSpacing: '-0.03em' }}
        >{beat.headline}</p>
        {beat.sub && (
          <p className="text-white/75 text-sm font-semibold mt-1" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            {beat.sub}
          </p>
        )}
      </div>
    );
  }

  return (
    <div style={{ animation: exiting ? exitAnim : enterAnim, willChange: 'transform, opacity' }}>
      {beat.tag && (
        <div
          className="inline-block text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded mb-2"
          style={{ background: accentColor + '25', color: accentColor, border: `1px solid ${accentColor}40` }}
        >{beat.tag}</div>
      )}
      <p
        className="font-black leading-tight"
        style={{
          fontSize: beat.headline.length > 32 ? 20 : 26,
          color: '#fff',
          textShadow: `0 0 40px ${accentColor}50, 0 3px 20px rgba(0,0,0,1)`,
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
        }}
      >{beat.headline}</p>
      {beat.sub && (
        <p
          className="text-white/70 text-sm leading-relaxed font-medium mt-2.5 whitespace-pre-line"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,1)' }}
        >{beat.sub}</p>
      )}
    </div>
  );
}

const KEYFRAMES = `
  @keyframes ttSlamUp {
    0% { opacity: 0; transform: translateY(36px) scaleY(0.88); }
    100% { opacity: 1; transform: translateY(0) scaleY(1); }
  }
  @keyframes ttSlamLeft {
    0% { opacity: 0; transform: translateX(-36px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes ttSlideRight {
    0% { opacity: 0; transform: translateX(36px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes ttScaleIn {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes ttCutIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes ttCutOut {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.04); }
  }
  @keyframes ttHeartPop {
    0% { opacity: 0; transform: scale(0.3); }
    55% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(1); }
  }
  @keyframes ttSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
