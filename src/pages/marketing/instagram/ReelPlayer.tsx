import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music2, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import type { ReelScript, Beat } from './reelData';
import { createVoiceController } from './voiceover';

interface Props {
  reel: ReelScript;
  username: string;
  handle: string;
}

type State = 'idle' | 'playing' | 'paused' | 'done';

export default function ReelPlayer({ reel, username, handle }: Props) {
  const [state, setState] = useState<State>('idle');
  const [beatIdx, setBeatIdx] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  const totalMs = reel.beats.reduce((s, b) => s + b.durationMs, 0);
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

  useEffect(() => () => {
    stopRaf(); clearBeatTimer(); voiceRef.current.stop();
  }, []);

  useEffect(() => {
    stopRaf(); clearBeatTimer(); voiceRef.current.stop();
    setState('idle'); setBeatIdx(0); setExiting(false); setProgress(0);
  }, [reel.id]);

  const tickProgress = useCallback((elapsed: number) => {
    const pct = Math.min(elapsed / totalMs, 1);
    setProgress(pct);
    if (pct < 1) {
      rafRef.current = requestAnimationFrame(() => {
        tickProgress(Date.now() - startTimeRef.current);
      });
    }
  }, [totalMs]);

  const scheduleBeat = useCallback((idx: number) => {
    if (idx >= reel.beats.length) return;
    const beat = reel.beats[idx];
    clearBeatTimer();
    beatTimerRef.current = setTimeout(() => {
      if (idx + 1 < reel.beats.length) {
        setExiting(true);
        setTimeout(() => {
          setBeatIdx(idx + 1);
          setExiting(false);
          scheduleBeat(idx + 1);
        }, 180);
      } else {
        setExiting(true);
        setTimeout(() => {
          setState('done');
          setExiting(false);
        }, 220);
      }
    }, beat.durationMs);
  }, [reel.beats]);

  const startFrom = useCallback((fromBeatIdx: number, elapsedBefore: number) => {
    setBeatIdx(fromBeatIdx);
    setExiting(false);
    setState('playing');

    startTimeRef.current = Date.now() - elapsedBefore;
    stopRaf();
    rafRef.current = requestAnimationFrame(() => tickProgress(elapsedBefore));

    scheduleBeat(fromBeatIdx);

    if (!muteRef.current) {
      voiceRef.current.speak(reel.voiceScript, () => {});
    }
  }, [reel, scheduleBeat, tickProgress]);

  const handlePlay = () => {
    if (state === 'done') {
      setProgress(0);
      startFrom(0, 0);
      return;
    }
    if (state === 'idle') {
      startFrom(0, 0);
      return;
    }
    if (state === 'playing') {
      pausedAtRef.current = Date.now() - startTimeRef.current;
      stopRaf();
      clearBeatTimer();
      voiceRef.current.stop();
      setState('paused');
      return;
    }
    if (state === 'paused') {
      startFrom(beatIdx, pausedAtRef.current);
    }
  };

  const handleMute = () => {
    const next = !muted;
    setMuted(next);
    if (next) {
      voiceRef.current.stop();
    } else if (state === 'playing') {
      voiceRef.current.speak(reel.voiceScript, () => {});
    }
  };

  const doubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(true);
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 700);
  };

  const beat = reel.beats[beatIdx];

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="relative overflow-hidden shadow-2xl select-none cursor-pointer"
        style={{ width: 300, height: 534, borderRadius: 40, background: '#060606' }}
        onClick={() => { if (state !== 'idle') handlePlay(); }}
        onDoubleClick={doubleTap}
      >
        <Background bgImage={reel.bgImage} accentColor={reel.accentColor} playing={state === 'playing'} />

        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.35) 45%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 28%)' }} />

        <ProgressBar progress={progress} accentColor={reel.accentColor} />

        <Header handle={handle} accentColor={reel.accentColor} />

        {state === 'idle' && (
          <IdleOverlay hook={reel.hook} onPlay={handlePlay} />
        )}

        {(state === 'playing' || state === 'paused') && (
          <div className="absolute inset-0 flex flex-col justify-center px-6 z-10" style={{ paddingBottom: 110, paddingTop: 80 }}>
            <BeatCard
              beat={beat}
              accentColor={reel.accentColor}
              exiting={exiting}
              paused={state === 'paused'}
            />
          </div>
        )}

        {state === 'done' && (
          <EndCard accentColor={reel.accentColor} />
        )}

        {state === 'paused' && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <Pause size={22} className="text-white" fill="white" />
            </div>
          </div>
        )}

        {heartBurst && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <Heart size={90} className="text-red-500 fill-red-500" style={{ animation: 'heartPop 0.65s ease both' }} />
          </div>
        )}

        <RightActions
          liked={liked}
          saved={saved}
          muted={muted}
          likes={reel.likes}
          comments={reel.comments}
          onLike={() => setLiked((l) => !l)}
          onSave={() => setSaved((s) => !s)}
          onMute={handleMute}
        />

        <BottomMeta username={username} hook={reel.hook} muted={muted} />
      </div>

      <PlayControls state={state} onPlay={handlePlay} onMute={handleMute} muted={muted} accentColor={reel.accentColor} />

      <style>{KEYFRAMES}</style>
    </div>
  );
}

function Background({ bgImage, accentColor, playing }: { bgImage: string; accentColor: string; playing: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.22) saturate(1.4)',
          transform: playing ? 'scale(1.12)' : 'scale(1.06)',
          transition: playing ? 'transform 30s linear' : 'transform 0.6s ease',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 30% 60%, ${accentColor}14 0%, transparent 65%)` }}
      />
    </>
  );
}

function ProgressBar({ progress, accentColor }: { progress: number; accentColor: string }) {
  return (
    <div className="absolute top-3 left-4 right-4 z-30 h-[3px] rounded-full bg-white/15 overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${accentColor}, white)`,
          boxShadow: `0 0 8px ${accentColor}`,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}

function Header({ handle, accentColor }: { handle: string; accentColor: string }) {
  return (
    <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
          style={{ background: accentColor }}
        >
          HS
        </div>
        <div>
          <p className="text-white text-[11px] font-bold leading-none">{handle}</p>
          <p className="text-white/40 text-[9px] mt-0.5">Sponsored</p>
        </div>
        <div className="ml-1 border border-white/30 rounded-sm px-1.5 py-0.5">
          <span className="text-white text-[9px] font-semibold">Follow</span>
        </div>
      </div>
      <MoreHorizontal size={16} className="text-white/50" />
    </div>
  );
}

function IdleOverlay({ hook, onPlay }: { hook: string; onPlay: () => void }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-7 gap-6 text-center"
      onClick={(e) => { e.stopPropagation(); onPlay(); }}
    >
      <button
        className="w-18 h-18 rounded-full border-2 border-white/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{ width: 64, height: 64, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)' }}
      >
        <Play size={28} className="text-white ml-1" fill="white" />
      </button>
      <p className="text-white text-[15px] font-bold leading-snug" style={{ textShadow: '0 2px 20px rgba(0,0,0,1)' }}>
        {hook}
      </p>
    </div>
  );
}

function BeatCard({ beat, accentColor, exiting, paused }: { beat: Beat; accentColor: string; exiting: boolean; paused: boolean }) {
  const enterAnim = beat.enter === 'slam-up'
    ? 'slamUp 0.22s cubic-bezier(0.22,1,0.36,1) both'
    : beat.enter === 'slam-left'
      ? 'slamLeft 0.22s cubic-bezier(0.22,1,0.36,1) both'
      : beat.enter === 'scale-in'
        ? 'scaleIn 0.25s cubic-bezier(0.22,1,0.36,1) both'
        : 'cutIn 0.08s ease both';

  const exitAnim = 'cutOut 0.15s ease both';

  if (beat.isBig) {
    return (
      <div
        style={{
          animation: exiting ? exitAnim : enterAnim,
          willChange: 'transform, opacity',
        }}
        className="text-center"
      >
        <p className="text-white/30 text-[11px] uppercase tracking-[0.25em] font-bold mb-1">ServiceSupport.UK</p>
        <p
          className="font-black leading-none"
          style={{
            fontSize: 88,
            color: accentColor,
            textShadow: `0 0 80px ${accentColor}80, 0 0 30px ${accentColor}50`,
            letterSpacing: '-0.03em',
          }}
        >
          {beat.headline}
        </p>
        {beat.sub && (
          <p className="text-white/80 text-base font-semibold mt-1" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            {beat.sub}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        animation: exiting ? exitAnim : enterAnim,
        willChange: 'transform, opacity',
      }}
    >
      {beat.tag && (
        <div
          className="inline-block text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded mb-3"
          style={{
            background: accentColor + '28',
            color: accentColor,
            border: `1px solid ${accentColor}45`,
            letterSpacing: '0.18em',
          }}
        >
          {beat.tag}
        </div>
      )}
      <p
        className="font-black leading-tight"
        style={{
          fontSize: beat.headline.length > 30 ? 22 : 28,
          color: '#fff',
          textShadow: `0 0 40px ${accentColor}55, 0 3px 20px rgba(0,0,0,1)`,
          letterSpacing: '-0.015em',
          lineHeight: 1.1,
        }}
      >
        {beat.headline}
      </p>
      {beat.sub && (
        <p
          className="text-white/75 text-sm leading-relaxed font-medium mt-3 whitespace-pre-line"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,1)' }}
        >
          {beat.sub}
        </p>
      )}
    </div>
  );
}

function EndCard({ accentColor }: { accentColor: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-5 text-center px-8"
      style={{ animation: 'scaleIn 0.3s cubic-bezier(0.22,1,0.36,1) both' }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center font-black text-white text-xl"
        style={{ background: accentColor, boxShadow: `0 0 40px ${accentColor}60` }}
      >
        HS
      </div>
      <p className="text-white font-black text-xl leading-snug" style={{ textShadow: '0 2px 20px rgba(0,0,0,1)' }}>
        £3.30 a day.
        <br />
        <span className="text-white/60 font-semibold text-base">Link in bio.</span>
      </p>
      <div
        className="px-6 py-3 rounded-2xl text-white text-sm font-black"
        style={{ background: accentColor, boxShadow: `0 0 30px ${accentColor}50` }}
      >
        ServiceSupport.uk
      </div>
    </div>
  );
}

function RightActions({ liked, saved, muted, likes, comments, onLike, onSave, onMute }: {
  liked: boolean; saved: boolean; muted: boolean; likes: string; comments: string;
  onLike: () => void; onSave: () => void; onMute: () => void;
}) {
  return (
    <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-20">
      <button className="flex flex-col items-center gap-1" onClick={(e) => { e.stopPropagation(); onLike(); }}>
        <Heart size={24} className={liked ? 'text-red-500 fill-red-500' : 'text-white'} />
        <span className="text-white text-[10px] font-semibold">{likes}</span>
      </button>
      <button className="flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <MessageCircle size={24} className="text-white" />
        <span className="text-white text-[10px] font-semibold">{comments}</span>
      </button>
      <button onClick={(e) => e.stopPropagation()}><Send size={22} className="text-white" /></button>
      <button onClick={(e) => { e.stopPropagation(); onSave(); }}>
        <Bookmark size={22} className={saved ? 'text-yellow-400 fill-yellow-400' : 'text-white'} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onMute(); }}>
        {muted ? <VolumeX size={20} className="text-white/50" /> : <Volume2 size={20} className="text-white" />}
      </button>
    </div>
  );
}

function BottomMeta({ username, hook, muted }: { username: string; hook: string; muted: boolean }) {
  return (
    <div className="absolute bottom-5 left-4 right-14 z-20">
      <p className="text-white text-[11px] font-bold mb-0.5">{username}</p>
      <p className="text-white/45 text-[10px] leading-snug line-clamp-2">{hook}</p>
      <div className="flex items-center gap-1.5 mt-1.5">
        <Music2 size={9} className="text-white/30" />
        <p className="text-white/30 text-[9px]">{muted ? 'Sound off · tap to unmute' : 'Original audio · UK voiceover'}</p>
      </div>
    </div>
  );
}

function PlayControls({ state, onPlay, onMute, muted, accentColor }: {
  state: State; onPlay: () => void; onMute: () => void; muted: boolean; accentColor: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onPlay}
        className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-black text-white transition-all hover:opacity-90 active:scale-95"
        style={{ background: accentColor, boxShadow: `0 4px 20px ${accentColor}50` }}
      >
        {state === 'playing' ? <><Pause size={14} fill="white" /> Pause</> :
          state === 'done' ? <><Play size={14} fill="white" /> Replay</> :
            state === 'paused' ? <><Play size={14} fill="white" /> Resume</> :
              <><Play size={14} fill="white" /> Play</>}
      </button>
      <button
        onClick={onMute}
        className="flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-bold border transition-all"
        style={{
          background: muted ? '#1a1f2e' : accentColor + '15',
          borderColor: muted ? '#2a3040' : accentColor + '40',
          color: muted ? '#4a5568' : accentColor,
        }}
      >
        {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        {muted ? 'Sound off' : 'Sound on'}
      </button>
    </div>
  );
}

const KEYFRAMES = `
  @keyframes slamUp {
    0% { opacity: 0; transform: translateY(40px) scaleY(0.9); }
    100% { opacity: 1; transform: translateY(0) scaleY(1); }
  }
  @keyframes slamLeft {
    0% { opacity: 0; transform: translateX(-40px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    0% { opacity: 0; transform: scale(0.82); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes cutIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes cutOut {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.04); }
  }
  @keyframes heartPop {
    0% { opacity: 0; transform: scale(0.3); }
    55% { opacity: 1; transform: scale(1.25); }
    100% { opacity: 0; transform: scale(1); }
  }
`;
