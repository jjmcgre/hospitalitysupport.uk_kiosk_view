import { useState } from 'react';
import ReelPlayer from './instagram/ReelPlayer';
import { reels } from './instagram/reelData';

export default function InstagramPage() {
  const [activeReel, setActiveReel] = useState(0);
  const reel = reels[activeReel];

  return (
    <div className="min-h-full bg-slate-950">
      <div className="border-b border-slate-800 px-8 py-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">Instagram Reels</span>
        </div>
        <h1 className="text-white font-black text-3xl mt-2">Interactive Ad Previews</h1>
        <p className="text-slate-400 text-sm mt-1">Click Play to run each ad. Double-tap the phone to like. Switch campaigns below.</p>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        <div className="lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-800 p-6 flex flex-col gap-3 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">Campaigns</p>
          {reels.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActiveReel(i)}
              className={`text-left rounded-2xl p-4 border transition-all duration-200 ${
                activeReel === i
                  ? 'border-teal-500/40 bg-teal-500/10'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-black px-2 py-0.5 rounded"
                  style={{ background: activeReel === i ? r.accentColor + '33' : '#1e293b', color: activeReel === i ? r.accentColor : '#64748b' }}
                >
                  {r.number}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ background: activeReel === i ? r.accentColor + '22' : '#0f172a', color: activeReel === i ? r.accentColor : '#475569' }}
                >
                  {r.label}
                </span>
              </div>
              <p className={`font-bold text-sm leading-snug ${activeReel === i ? 'text-white' : 'text-slate-300'}`}>{r.title}</p>
              <p className="text-slate-500 text-xs mt-1 leading-snug line-clamp-2">{r.description}</p>
            </button>
          ))}

          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">Ad Stats (Simulated)</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Likes</span>
                <span className="text-white text-xs font-semibold">{reel.likes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Comments</span>
                <span className="text-white text-xs font-semibold">{reel.comments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Slides</span>
                <span className="text-white text-xs font-semibold">{reel.slides.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Duration</span>
                <span className="text-white text-xs font-semibold">~{(reel.slides.length * 2.2).toFixed(0)}s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-start py-10 px-6 gap-8">
          <ReelPlayer
            key={reel.id}
            username="HospitalitySupport.uk"
            handle="@hospitality.support.uk"
            hook={reel.hook}
            cta={reel.cta}
            slides={reel.slides}
            accentColor={reel.accentColor}
            likes={reel.likes}
            comments={reel.comments}
          />

          <div className="w-full max-w-sm space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">Hook Line</p>
              <p className="text-white text-sm font-semibold leading-snug">"{reel.hook}"</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">CTA</p>
              <p className="text-white text-sm font-semibold leading-snug">"{reel.cta}"</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">Slide Sequence</p>
              <div className="space-y-2">
                {reel.slides.map((s, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-slate-600 text-xs w-4 pt-0.5 flex-shrink-0">{i + 1}</span>
                    <div>
                      <p className="text-white text-xs font-semibold">{s.text}</p>
                      {s.subtext && <p className="text-slate-400 text-xs">{s.subtext}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
