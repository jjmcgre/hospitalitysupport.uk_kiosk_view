import { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music2, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import type { Slide } from './reelData';

interface ReelPlayerProps {
  username: string;
  handle: string;
  hook: string;
  cta: string;
  slides: Slide[];
  accentColor: string;
  likes: string;
  comments: string;
}

const SLIDE_MS = 3200;

export default function ReelPlayer({
  username,
  handle,
  hook,
  cta,
  slides,
  accentColor,
  likes,
  comments,
}: ReelPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const [segProgress, setSegProgress] = useState(0);
  const [ended, setEnded] = useState(false);
  const [key, setKey] = useState(0);

  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const segTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    if (segTimer.current) clearInterval(segTimer.current);
  };

  useEffect(() => {
    clearTimers();
    setSegProgress(0);

    if (!playing || ended) return;

    const increment = 100 / (SLIDE_MS / 50);

    segTimer.current = setInterval(() => {
      setSegProgress((p) => Math.min(p + increment, 100));
    }, 50);

    slideTimer.current = setInterval(() => {
      setCurrent((c) => {
        const next = c + 1;
        if (next >= slides.length) {
          setPlaying(false);
          setEnded(true);
          return c;
        }
        setSegProgress(0);
        return next;
      });
    }, SLIDE_MS);

    return clearTimers;
  }, [playing, current, ended, slides.length]);

  const handlePlay = () => {
    if (ended) {
      setCurrent(0);
      setSegProgress(0);
      setEnded(false);
      setKey((k) => k + 1);
      setTimeout(() => setPlaying(true), 50);
    } else {
      setPlaying((p) => !p);
    }
  };

  const handleDoubleTap = () => {
    setLiked(true);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 800);
  };

  const handleTapSlide = () => {
    if (!playing && !ended) {
      setPlaying(true);
    } else if (playing) {
      setPlaying(false);
    }
  };

  const goTo = (idx: number) => {
    setCurrent(idx);
    setSegProgress(0);
    setEnded(false);
    setKey((k) => k + 1);
    if (!playing) setPlaying(true);
  };

  const slide = slides[current];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative overflow-hidden shadow-2xl select-none"
        style={{
          width: 300,
          height: 534,
          borderRadius: 40,
          background: '#0a0a0a',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${accentColor}18 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, ${accentColor}10 0%, transparent 60%), #0f1419`,
          }}
        />

        {/* Segmented progress bar */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/20 cursor-pointer"
            >
              <div
                className="h-full rounded-full transition-none"
                style={{
                  background: 'white',
                  width:
                    i < current
                      ? '100%'
                      : i === current
                      ? `${segProgress}%`
                      : '0%',
                  transition: i === current ? 'none' : 'none',
                }}
              />
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-7 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
              style={{ background: accentColor }}
            >
              HS
            </div>
            <div>
              <p className="text-white text-[11px] font-bold leading-none">{handle}</p>
              <p className="text-white/50 text-[9px] leading-none mt-0.5">Sponsored</p>
            </div>
            <div className="ml-1 border border-white/40 rounded px-1.5 py-0.5">
              <span className="text-white text-[9px] font-semibold">Follow</span>
            </div>
          </div>
          <MoreHorizontal size={16} className="text-white/60" />
        </div>

        {/* Main content area */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-5"
          onDoubleClick={handleDoubleTap}
          onClick={handleTapSlide}
        >
          {/* Pre-play state */}
          {!playing && !ended && current === 0 && segProgress === 0 && (
            <div className="flex flex-col items-center gap-5 text-center px-2">
              <div
                className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
              >
                <Play size={22} className="text-white ml-1" fill="white" />
              </div>
              <p
                className="text-white text-sm font-semibold leading-snug"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
              >
                {hook}
              </p>
            </div>
          )}

          {/* Slide content */}
          {(playing || (current > 0 || segProgress > 0)) && !ended && (
            <div key={`${key}-${current}`} className="w-full text-center animate-fade-in">
              {slide.isBig ? (
                <div className="space-y-1">
                  {slide.statLabel && (
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">{slide.statLabel}</p>
                  )}
                  <p
                    className="font-black text-white leading-none"
                    style={{ fontSize: 72, textShadow: `0 0 40px ${accentColor}60` }}
                  >
                    {slide.heading}
                  </p>
                  <p className="text-white/60 text-base font-medium mt-1">{slide.body}</p>
                  {slide.stat && (
                    <div
                      className="inline-block mt-4 px-4 py-2 rounded-xl text-xs font-bold"
                      style={{ background: accentColor + '30', color: accentColor, border: `1px solid ${accentColor}40` }}
                    >
                      {slide.stat}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {slide.tag && (
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md mb-1"
                      style={{ background: accentColor + '25', color: accentColor }}
                    >
                      {slide.tag}
                    </span>
                  )}
                  <p
                    className="text-white font-bold text-lg leading-snug"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
                  >
                    {slide.heading}
                  </p>
                  {slide.body && (
                    <p
                      className="text-white/80 text-xs leading-relaxed whitespace-pre-line"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
                    >
                      {slide.body}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* End card */}
          {ended && (
            <div key="end" className="flex flex-col items-center gap-4 text-center animate-fade-in">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-lg"
                style={{ background: accentColor }}
              >
                H
              </div>
              <p className="text-white font-bold text-base leading-snug">{cta}</p>
              <div
                className="px-5 py-2.5 rounded-xl text-white text-xs font-bold"
                style={{ background: accentColor }}
              >
                Learn More
              </div>
            </div>
          )}
        </div>

        {/* Double-tap heart */}
        {heartAnim && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <Heart size={80} className="text-red-500 fill-red-500 animate-ping-once" />
          </div>
        )}

        {/* Right side actions */}
        <div className="absolute right-2.5 bottom-24 flex flex-col items-center gap-5 z-20">
          <button
            className="flex flex-col items-center gap-1"
            onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
          >
            <Heart
              size={24}
              className={liked ? 'text-red-500 fill-red-500' : 'text-white drop-shadow'}
            />
            <span className="text-white text-[10px] font-semibold drop-shadow">
              {liked ? String(parseInt(likes.replace('k', '000').replace('.', '')) + 1) : likes}
            </span>
          </button>
          <button
            className="flex flex-col items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle size={24} className="text-white drop-shadow" />
            <span className="text-white text-[10px] font-semibold drop-shadow">{comments}</span>
          </button>
          <button onClick={(e) => e.stopPropagation()}>
            <Send size={22} className="text-white drop-shadow" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setSaved((s) => !s); }}>
            <Bookmark size={22} className={saved ? 'text-yellow-400 fill-yellow-400' : 'text-white drop-shadow'} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}>
            {muted
              ? <VolumeX size={20} className="text-white drop-shadow" />
              : <Volume2 size={20} className="text-white drop-shadow" />}
          </button>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-5 left-3 right-14 z-20">
          <p className="text-white text-[11px] font-bold mb-0.5 drop-shadow">{username}</p>
          <p className="text-white/60 text-[10px] leading-snug line-clamp-2 drop-shadow">{hook}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Music2 size={10} className="text-white/50" />
            <p className="text-white/50 text-[9px]">Original audio · {handle}</p>
          </div>
        </div>

        {/* Pause overlay when playing */}
        {playing && (
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => setPlaying(false)}
          />
        )}
      </div>

      {/* Play button below phone */}
      <button
        onClick={handlePlay}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
        style={{ background: accentColor }}
      >
        {playing
          ? <><Pause size={14} /> Pause</>
          : ended
          ? <><Play size={14} fill="white" /> Replay</>
          : <><Play size={14} fill="white" /> Play Ad</>}
      </button>

      {/* Slide counter */}
      <p className="text-slate-500 text-xs">
        {ended ? 'End card' : `Slide ${current + 1} of ${slides.length}`}
      </p>
    </div>
  );
}
