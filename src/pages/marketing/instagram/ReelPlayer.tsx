import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal,
  Music2, Volume2, VolumeX, Play, Pause,
} from 'lucide-react';
import type { Slide } from './reelData';
import { createVoiceover, type SlideVoice } from './voiceover';

interface ReelPlayerProps {
  username: string;
  handle: string;
  hook: string;
  cta: string;
  slides: Slide[];
  accentColor: string;
  likes: string;
  comments: string;
  bgImage: string;
}

type Phase = 'callout' | 'detail';

function toSlideVoices(slides: Slide[]): SlideVoice[] {
  return slides.map((s) => {
    if (s.isBig) {
      return {
        callout: s.heading + (s.body ? '. ' + s.body : ''),
        detail: s.stat ? s.stat + (s.statLabel ? '. ' + s.statLabel : '') : undefined,
      };
    }
    return {
      callout: (s.tag ? s.tag + '. ' : '') + s.heading,
      detail: s.body ?? undefined,
    };
  });
}

export default function ReelPlayer({
  username,
  handle,
  hook,
  cta,
  slides,
  accentColor,
  likes,
  comments,
  bgImage,
}: ReelPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<Phase>('callout');
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const [ended, setEnded] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  const voRef = useRef(createVoiceover());
  const muteRef = useRef(muted);
  muteRef.current = muted;

  const slideVoices = toSlideVoices(slides);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => () => voRef.current.stop(), []);

  const startVoiceover = useCallback((startIdx: number) => {
    const sliced = slideVoices.slice(startIdx);
    voRef.current.play(
      sliced,
      (relIdx) => {
        setCurrent(startIdx + relIdx);
        setPhase('callout');
      },
      (relIdx) => {
        setCurrent(startIdx + relIdx);
        setPhase('detail');
      },
      () => {
        setPlaying(false);
        setEnded(true);
      }
    );
  }, [slides]);

  const handlePlay = () => {
    if (ended) {
      setCurrent(0);
      setPhase('callout');
      setEnded(false);
      setRenderKey((k) => k + 1);
      setPlaying(true);
      if (!muteRef.current) setTimeout(() => startVoiceover(0), 80);
    } else if (playing) {
      setPlaying(false);
      voRef.current.pause();
    } else {
      setPlaying(true);
      if (!muteRef.current) voRef.current.resume();
    }
  };

  const handleMuteToggle = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (newMuted) {
      voRef.current.stop();
    } else if (playing) {
      startVoiceover(current);
    }
  };

  const handleTapSlide = () => {
    if (!playing && !ended) {
      setPlaying(true);
      if (!muteRef.current) startVoiceover(current);
    } else if (playing) {
      setPlaying(false);
      voRef.current.pause();
    }
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(true);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 700);
  };

  const goTo = (idx: number) => {
    voRef.current.stop();
    setCurrent(idx);
    setPhase('callout');
    setEnded(false);
    setRenderKey((k) => k + 1);
    if (!playing) setPlaying(true);
    if (!muteRef.current) setTimeout(() => startVoiceover(idx), 80);
  };

  const slide = slides[current];
  const showContent = playing || current > 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative overflow-hidden shadow-2xl select-none"
        style={{ width: 300, height: 534, borderRadius: 40, background: '#0a0a0a' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px) brightness(0.28) saturate(1.3)',
            transform: 'scale(1.08)',
          }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accentColor}18 0%, transparent 55%)` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 48%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%)' }} />

        {/* Progress segments */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className="flex-1 h-[3px] rounded-full overflow-hidden bg-white/20"
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: 'white',
                  width: i < current ? '100%' : i === current && showContent ? '50%' : '0%',
                  transition: i === current ? 'none' : undefined,
                }}
              />
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
              style={{ background: accentColor }}
            >
              HS
            </div>
            <div>
              <p className="text-white text-[11px] font-bold leading-none drop-shadow">{handle}</p>
              <p className="text-white/50 text-[9px] leading-none mt-0.5">Sponsored</p>
            </div>
            <div className="ml-1 border border-white/40 rounded px-1.5 py-0.5">
              <span className="text-white text-[9px] font-semibold">Follow</span>
            </div>
          </div>
          <MoreHorizontal size={16} className="text-white/60" />
        </div>

        {/* Content area */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
          onClick={handleTapSlide}
          onDoubleClick={handleDoubleTap}
        >
          {/* Pre-play state */}
          {!playing && !ended && current === 0 && (
            <div className="flex flex-col items-center gap-5 text-center">
              <div
                className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
              >
                <Play size={26} className="text-white ml-1" fill="white" />
              </div>
              <p className="text-white text-sm font-bold leading-snug" style={{ textShadow: '0 2px 16px rgba(0,0,0,1)' }}>
                {hook}
              </p>
            </div>
          )}

          {/* Active slide */}
          {showContent && !ended && (
            <div key={`${renderKey}-${current}-${phase}`} className="w-full text-center">
              {slide.isBig ? (
                <BigSlide slide={slide} accentColor={accentColor} phase={phase} />
              ) : phase === 'callout' ? (
                <CalloutSlide slide={slide} accentColor={accentColor} />
              ) : (
                <DetailSlide slide={slide} accentColor={accentColor} />
              )}
            </div>
          )}

          {/* End card */}
          {ended && (
            <div key="end" className="flex flex-col items-center gap-4 text-center" style={{ animation: 'fadeUp 0.3s ease both' }}>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl"
                style={{ background: accentColor }}
              >
                HS
              </div>
              <p className="text-white font-bold text-base leading-snug" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                {cta}
              </p>
              <div
                className="px-5 py-2.5 rounded-xl text-white text-xs font-bold"
                style={{ background: accentColor }}
              >
                Learn More
              </div>
            </div>
          )}
        </div>

        {/* Heart burst */}
        {heartAnim && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <Heart size={88} className="text-red-500 fill-red-500" style={{ animation: 'heartPop 0.6s ease both' }} />
          </div>
        )}

        {/* Right actions */}
        <div className="absolute right-2.5 bottom-28 flex flex-col items-center gap-5 z-20">
          <button className="flex flex-col items-center gap-1" onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}>
            <Heart size={24} className={liked ? 'text-red-500 fill-red-500' : 'text-white'} />
            <span className="text-white text-[10px] font-semibold">{likes}</span>
          </button>
          <button className="flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <MessageCircle size={24} className="text-white" />
            <span className="text-white text-[10px] font-semibold">{comments}</span>
          </button>
          <button onClick={(e) => e.stopPropagation()}>
            <Send size={22} className="text-white" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setSaved((s) => !s); }}>
            <Bookmark size={22} className={saved ? 'text-yellow-400 fill-yellow-400' : 'text-white'} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }}>
            {muted ? <VolumeX size={20} className="text-white/60" /> : <Volume2 size={20} className="text-white" />}
          </button>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-5 left-3 right-14 z-20">
          <p className="text-white text-[11px] font-bold mb-0.5">{username}</p>
          <p className="text-white/50 text-[10px] leading-snug line-clamp-2">{hook}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Music2 size={10} className="text-white/40" />
            <p className="text-white/40 text-[9px]">
              {muted ? 'Tap sound to hear voiceover' : 'Male UK voiceover · live'}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: accentColor }}
        >
          {playing ? <><Pause size={14} /> Pause</> : ended ? <><Play size={14} fill="white" /> Replay</> : <><Play size={14} fill="white" /> Play Ad</>}
        </button>
        <button
          onClick={handleMuteToggle}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all"
          style={{
            background: muted ? '#1e293b' : accentColor + '18',
            borderColor: muted ? '#334155' : accentColor + '50',
            color: muted ? '#64748b' : accentColor,
          }}
        >
          {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          {muted ? 'Sound off' : 'Sound on'}
        </button>
      </div>

      <p className="text-slate-600 text-xs">
        {ended ? 'End card · replay anytime' : `${current + 1} / ${slides.length} · ${phase === 'callout' ? 'headline' : 'detail'}`}
      </p>

      <style>{`
        @keyframes flashIn {
          0% { opacity: 0; transform: scale(1.12) translateY(-6px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartPop {
          0% { opacity: 0; transform: scale(0.4); }
          60% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.0); }
        }
        .flash-in { animation: flashIn 0.18s cubic-bezier(0.22,1,0.36,1) both; }
        .slide-up { animation: slideUp 0.22s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>
    </div>
  );
}

function CalloutSlide({ slide, accentColor }: { slide: Slide; accentColor: string }) {
  return (
    <div className="space-y-2 flash-in">
      {slide.tag && (
        <span
          className="inline-block text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-md"
          style={{ background: accentColor + '30', color: accentColor, border: `1px solid ${accentColor}40` }}
        >
          {slide.tag}
        </span>
      )}
      <p
        className="font-black leading-tight"
        style={{
          fontSize: 26,
          color: '#fff',
          textShadow: `0 0 30px ${accentColor}60, 0 3px 18px rgba(0,0,0,1)`,
          letterSpacing: '-0.01em',
        }}
      >
        {slide.heading}
      </p>
    </div>
  );
}

function DetailSlide({ slide, accentColor }: { slide: Slide; accentColor: string }) {
  return (
    <div className="space-y-3 slide-up">
      {slide.tag && (
        <span
          className="inline-block text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-md"
          style={{ background: accentColor + '30', color: accentColor, border: `1px solid ${accentColor}40` }}
        >
          {slide.tag}
        </span>
      )}
      <p
        className="font-black leading-tight"
        style={{
          fontSize: 22,
          color: '#fff',
          textShadow: `0 0 24px ${accentColor}50, 0 3px 14px rgba(0,0,0,1)`,
        }}
      >
        {slide.heading}
      </p>
      {slide.body && (
        <p
          className="text-white/90 text-sm leading-relaxed whitespace-pre-line font-medium"
          style={{ textShadow: '0 1px 10px rgba(0,0,0,0.95)' }}
        >
          {slide.body}
        </p>
      )}
    </div>
  );
}

function BigSlide({ slide, accentColor, phase }: { slide: Slide; accentColor: string; phase: 'callout' | 'detail' }) {
  return (
    <div className="space-y-1 flash-in">
      {slide.statLabel && (
        <p className="text-white/40 text-[10px] uppercase tracking-[0.22em] font-bold mb-2">{slide.statLabel}</p>
      )}
      <p
        className="font-black text-white leading-none"
        style={{
          fontSize: 80,
          textShadow: `0 0 60px ${accentColor}90, 0 4px 20px rgba(0,0,0,0.9)`,
          color: accentColor,
        }}
      >
        {slide.heading}
      </p>
      <p className="text-white/70 text-lg font-semibold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
        {slide.body}
      </p>
      {phase === 'detail' && slide.stat && (
        <div
          className="inline-block mt-3 px-4 py-2 rounded-xl text-xs font-bold slide-up"
          style={{ background: accentColor + '30', color: accentColor, border: `1px solid ${accentColor}50` }}
        >
          {slide.stat}
        </div>
      )}
    </div>
  );
}
