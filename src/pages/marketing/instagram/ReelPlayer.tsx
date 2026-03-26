import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart, MessageCircle, Send, Bookmark, MoreHorizontal,
  Music2, Volume2, VolumeX, Play, Pause,
} from 'lucide-react';
import type { Slide } from './reelData';
import { createVoiceover } from './voiceover';

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

function slideToText(slide: Slide): string {
  return [slide.tag, slide.statLabel, slide.heading, slide.body, slide.stat]
    .filter(Boolean)
    .join('. ');
}

function useAmbientAudio(muted: boolean, playing: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  const stop = useCallback(() => {
    nodesRef.current.forEach((n) => {
      try { (n as OscillatorNode).stop?.(); } catch {}
    });
    nodesRef.current = [];
  }, []);

  const start = useCallback(() => {
    stop();
    const ctx = ctxRef.current ?? new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 1.5);
    master.connect(ctx.destination);

    const chords = [220, 277.18, 329.63, 369.99];
    chords.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0.25 - i * 0.04;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      osc.connect(filter);
      filter.connect(g);
      g.connect(master);
      osc.start();
      nodesRef.current.push(osc);
    });

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.015;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 400;
    noiseFilter.Q.value = 0.5;
    noise.connect(noiseFilter);
    noiseFilter.connect(master);
    noise.start();
    nodesRef.current.push(noise);
  }, [stop]);

  useEffect(() => {
    if (playing && !muted) start();
    else stop();
    return stop;
  }, [playing, muted, start, stop]);
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
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const [ended, setEnded] = useState(false);
  const [key, setKey] = useState(0);

  const voRef = useRef(createVoiceover());
  const muteRef = useRef(muted);
  muteRef.current = muted;

  useAmbientAudio(muted, playing);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => () => voRef.current.stop(), []);

  const startVoiceover = useCallback((startIdx: number) => {
    const texts = slides.map(slideToText);
    const sliced = texts.slice(startIdx);
    voRef.current.play(
      sliced,
      (relIdx) => setCurrent(startIdx + relIdx),
      () => {
        setPlaying(false);
        setEnded(true);
      }
    );
  }, [slides]);

  const handlePlay = () => {
    if (ended) {
      setCurrent(0);
      setEnded(false);
      setKey((k) => k + 1);
      setPlaying(true);
      if (!muteRef.current) {
        setTimeout(() => startVoiceover(0), 80);
      }
    } else if (playing) {
      setPlaying(false);
      voRef.current.pause();
    } else {
      setPlaying(true);
      if (!muteRef.current) {
        voRef.current.resume();
      }
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

  useEffect(() => {
    if (playing && !muted) {
      startVoiceover(current);
    }
  }, []);

  const handleTapSlide = () => {
    if (!playing && !ended) {
      setPlaying(true);
      if (!muteRef.current) startVoiceover(current);
    } else if (playing) {
      setPlaying(false);
      voRef.current.pause();
    }
  };

  const handleDoubleTap = () => {
    setLiked(true);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 800);
  };

  const goTo = (idx: number) => {
    voRef.current.stop();
    setCurrent(idx);
    setEnded(false);
    setKey((k) => k + 1);
    if (!playing) setPlaying(true);
    if (!muteRef.current) {
      setTimeout(() => startVoiceover(idx), 80);
    }
  };

  const slide = slides[current];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative overflow-hidden shadow-2xl select-none"
        style={{ width: 300, height: 534, borderRadius: 40, background: '#0a0a0a' }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px) brightness(0.32) saturate(1.2)',
            transform: 'scale(1.06)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${accentColor}22 0%, transparent 50%, #00000080 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 45%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 28%)' }}
        />

        {/* Segmented progress bar */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/25 cursor-pointer"
            >
              <div
                className="h-full rounded-full transition-none"
                style={{
                  background: 'white',
                  width: i < current ? '100%' : i === current && (playing || current > 0) ? '50%' : '0%',
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
              <p className="text-white text-[11px] font-bold leading-none drop-shadow">{handle}</p>
              <p className="text-white/60 text-[9px] leading-none mt-0.5">Sponsored</p>
            </div>
            <div className="ml-1 border border-white/50 rounded px-1.5 py-0.5 backdrop-blur-sm">
              <span className="text-white text-[9px] font-semibold">Follow</span>
            </div>
          </div>
          <MoreHorizontal size={16} className="text-white/70" />
        </div>

        {/* Main content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-5"
          onDoubleClick={handleDoubleTap}
          onClick={handleTapSlide}
        >
          {!playing && !ended && current === 0 && (
            <div className="flex flex-col items-center gap-5 text-center px-2">
              <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Play size={24} className="text-white ml-1" fill="white" />
              </div>
              <p
                className="text-white text-sm font-bold leading-snug"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
              >
                {hook}
              </p>
            </div>
          )}

          {(playing || current > 0) && !ended && (
            <div key={`${key}-${current}`} className="w-full text-center animate-fade-in">
              {slide.isBig ? (
                <div className="space-y-1">
                  {slide.statLabel && (
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">
                      {slide.statLabel}
                    </p>
                  )}
                  <p
                    className="font-black text-white leading-none"
                    style={{ fontSize: 72, textShadow: `0 0 40px ${accentColor}80, 0 4px 16px rgba(0,0,0,0.9)` }}
                  >
                    {slide.heading}
                  </p>
                  <p className="text-white/70 text-base font-medium mt-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {slide.body}
                  </p>
                  {slide.stat && (
                    <div
                      className="inline-block mt-4 px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-sm"
                      style={{ background: accentColor + '35', color: accentColor, border: `1px solid ${accentColor}50` }}
                    >
                      {slide.stat}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {slide.tag && (
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md backdrop-blur-sm"
                      style={{ background: accentColor + '35', color: accentColor, border: `1px solid ${accentColor}40` }}
                    >
                      {slide.tag}
                    </span>
                  )}
                  <p
                    className="text-white font-bold text-lg leading-snug"
                    style={{ textShadow: '0 2px 14px rgba(0,0,0,0.95)' }}
                  >
                    {slide.heading}
                  </p>
                  {slide.body && (
                    <p
                      className="text-white/85 text-xs leading-relaxed whitespace-pre-line"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
                    >
                      {slide.body}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {ended && (
            <div key="end" className="flex flex-col items-center gap-4 text-center animate-fade-in">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl shadow-lg"
                style={{ background: accentColor }}
              >
                H
              </div>
              <p className="text-white font-bold text-base leading-snug" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
                {cta}
              </p>
              <div
                className="px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg"
                style={{ background: accentColor }}
              >
                Learn More
              </div>
            </div>
          )}
        </div>

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
            <Heart size={24} className={liked ? 'text-red-500 fill-red-500' : 'text-white drop-shadow-lg'} />
            <span className="text-white text-[10px] font-semibold drop-shadow">
              {liked ? String(parseInt(likes.replace('k', '000').replace('.', '')) + 1) : likes}
            </span>
          </button>
          <button className="flex flex-col items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <MessageCircle size={24} className="text-white drop-shadow-lg" />
            <span className="text-white text-[10px] font-semibold drop-shadow">{comments}</span>
          </button>
          <button onClick={(e) => e.stopPropagation()}>
            <Send size={22} className="text-white drop-shadow-lg" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setSaved((s) => !s); }}>
            <Bookmark size={22} className={saved ? 'text-yellow-400 fill-yellow-400' : 'text-white drop-shadow-lg'} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleMuteToggle(); }}>
            {muted
              ? <VolumeX size={20} className="text-white/70 drop-shadow-lg" />
              : <Volume2 size={20} className="text-white drop-shadow-lg" />}
          </button>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-5 left-3 right-14 z-20">
          <p className="text-white text-[11px] font-bold mb-0.5 drop-shadow">{username}</p>
          <p className="text-white/60 text-[10px] leading-snug line-clamp-2 drop-shadow">{hook}</p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Music2 size={10} className="text-white/50" />
            <p className="text-white/50 text-[9px]">
              {muted ? 'Enable sound for voiceover' : 'Male UK voiceover · ' + handle}
            </p>
          </div>
        </div>

        {playing && (
          <div className="absolute inset-0 z-10 cursor-pointer" onClick={() => { setPlaying(false); voRef.current.pause(); }} />
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: accentColor }}
        >
          {playing
            ? <><Pause size={14} /> Pause</>
            : ended
            ? <><Play size={14} fill="white" /> Replay</>
            : <><Play size={14} fill="white" /> Play Ad</>}
        </button>
        <button
          onClick={handleMuteToggle}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-full text-xs font-semibold border transition-all hover:opacity-80"
          style={{
            background: muted ? '#1e293b' : accentColor + '20',
            borderColor: muted ? '#334155' : accentColor + '50',
            color: muted ? '#94a3b8' : accentColor,
          }}
        >
          {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          {muted ? 'Sound off' : 'Sound on'}
        </button>
      </div>

      <p className="text-slate-500 text-xs">
        {ended ? 'End card' : `Slide ${current + 1} of ${slides.length}`}
      </p>
    </div>
  );
}
