import { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Music2, Volume2, VolumeX, Play } from 'lucide-react';

interface Slide {
  text: string;
  subtext?: string;
  highlight?: boolean;
  big?: boolean;
}

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

export default function ReelPlayer({ username, handle, hook, cta, slides, accentColor, likes, comments }: ReelPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [likeAnim, setLikeAnim] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const SLIDE_DURATION = 2200;

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev >= slides.length - 1) {
            setPlaying(false);
            setProgress(100);
            return prev;
          }
          return prev + 1;
        });
      }, SLIDE_DURATION);

      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          const increment = 100 / ((slides.length * SLIDE_DURATION) / 50);
          return Math.min(prev + increment, 100);
        });
      }, 50);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [playing, slides.length]);

  const handlePlay = () => {
    if (progress >= 99) {
      setCurrentSlide(0);
      setProgress(0);
    }
    setPlaying((p) => !p);
  };

  const handleDoubleTap = () => {
    setLiked(true);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 700);
  };

  const slide = slides[currentSlide];

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative bg-black rounded-[40px] overflow-hidden shadow-2xl"
        style={{ width: 300, height: 533 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />

        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: accentColor }}
            >
              HS
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-none">{handle}</p>
              <p className="text-white/60 text-[10px] leading-none mt-0.5">Sponsored</p>
            </div>
            <div className="ml-2 border border-white/40 rounded px-2 py-0.5">
              <span className="text-white text-[10px] font-medium">Follow</span>
            </div>
          </div>
          <MoreHorizontal size={18} className="text-white/70" />
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 cursor-pointer select-none"
          onDoubleClick={handleDoubleTap}
          onClick={!playing && progress < 99 ? handlePlay : undefined}
        >
          {!playing && progress < 5 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center mb-4">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
              <p className="text-white text-sm font-semibold text-center leading-snug px-6">{hook}</p>
            </div>
          )}

          {(playing || progress > 5) && progress < 99 && (
            <div className="w-full text-center animate-fade-in">
              {slide.big ? (
                <div className="space-y-2">
                  <p className="text-white/50 text-sm uppercase tracking-widest font-medium">{slide.subtext}</p>
                  <p className="text-white font-black leading-none" style={{ fontSize: '64px' }}>{slide.text}</p>
                  {slide.highlight && (
                    <p className="text-white/70 text-sm">{slide.highlight}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p
                    className="text-white font-bold leading-tight text-2xl"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
                  >
                    {slide.text}
                  </p>
                  {slide.subtext && (
                    <p className="text-white/70 text-sm leading-snug">{slide.subtext}</p>
                  )}
                  {slide.highlight && (
                    <span
                      className="inline-block text-sm font-bold px-3 py-1 rounded-full"
                      style={{ background: accentColor, color: '#fff' }}
                    >
                      {slide.highlight}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {progress >= 99 && (
            <div className="w-full text-center space-y-4">
              <div
                className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
                style={{ background: accentColor }}
              >
                <span className="text-white text-xl font-black">H</span>
              </div>
              <p className="text-white font-bold text-lg leading-tight">{cta}</p>
              <div
                className="mx-auto px-5 py-2.5 rounded-xl text-white text-sm font-bold cursor-pointer"
                style={{ background: accentColor }}
              >
                Learn More
              </div>
            </div>
          )}
        </div>

        {likeAnim && (
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <Heart
              size={80}
              className="text-red-500 fill-red-500 animate-ping-once"
            />
          </div>
        )}

        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-20">
          <button
            className="flex flex-col items-center gap-1"
            onClick={() => { setLiked((l) => !l); }}
          >
            <Heart
              size={26}
              className={liked ? 'text-red-500 fill-red-500' : 'text-white'}
            />
            <span className="text-white text-[10px] font-semibold">{liked ? String(parseInt(likes) + 1) : likes}</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <MessageCircle size={26} className="text-white" />
            <span className="text-white text-[10px] font-semibold">{comments}</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Send size={24} className="text-white" />
          </button>
          <button onClick={() => setSaved((s) => !s)}>
            <Bookmark size={24} className={saved ? 'text-yellow-400 fill-yellow-400' : 'text-white'} />
          </button>
          <button onClick={() => setMuted((m) => !m)}>
            {muted ? <VolumeX size={22} className="text-white" /> : <Volume2 size={22} className="text-white" />}
          </button>
        </div>

        <div className="absolute bottom-6 left-4 right-14 z-20">
          <p className="text-white text-xs font-semibold mb-1">{username}</p>
          <p className="text-white/70 text-[11px] leading-snug line-clamp-2">{hook}</p>
          <div className="flex items-center gap-2 mt-2">
            <Music2 size={11} className="text-white/60" />
            <p className="text-white/60 text-[10px]">Original audio · {handle}</p>
          </div>
        </div>

        {playing && (
          <button
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 opacity-0"
            onClick={() => setPlaying(false)}
          />
        )}
        {playing && (
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => setPlaying(false)}
          />
        )}
      </div>

      <button
        onClick={handlePlay}
        className="mt-4 px-6 py-2 rounded-full text-sm font-semibold text-white transition-all"
        style={{ background: accentColor }}
      >
        {playing ? 'Pause' : progress >= 99 ? 'Replay' : 'Play Ad'}
      </button>
    </div>
  );
}
