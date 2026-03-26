import { useState } from 'react';
import ReelPlayer from './instagram/ReelPlayer';
import { reels } from './instagram/reelData';
import CopyButton from './components/CopyButton';

export default function InstagramPage() {
  const [activeReel, setActiveReel] = useState(0);
  const reel = reels[activeReel];

  return (
    <div className="min-h-full bg-slate-950">
      <div className="border-b border-slate-800 px-8 py-6">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
          Instagram Reels
        </span>
        <h1 className="text-white font-black text-3xl mt-3">Interactive Ad Previews</h1>
        <p className="text-slate-400 text-sm mt-1">
          Press Play to run each ad in real time. Click any segment in the progress bar to jump to that slide. Switch campaigns in the sidebar.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-130px)]">

        {/* Sidebar */}
        <div className="lg:w-72 border-b lg:border-b-0 lg:border-r border-slate-800 p-5 flex flex-col gap-3 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex-shrink-0">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Campaigns</p>
          {reels.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActiveReel(i)}
              className={`text-left rounded-2xl p-4 border transition-all duration-200 ${
                activeReel === i
                  ? 'border-teal-500/40 bg-teal-500/10'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded"
                  style={{
                    background: activeReel === i ? r.accentColor + '28' : '#1e293b',
                    color: activeReel === i ? r.accentColor : '#64748b',
                  }}
                >
                  {r.number}
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded"
                  style={{
                    background: activeReel === i ? r.accentColor + '18' : '#0f172a',
                    color: activeReel === i ? r.accentColor : '#475569',
                  }}
                >
                  {r.label}
                </span>
              </div>
              <p className={`font-bold text-sm leading-snug ${activeReel === i ? 'text-white' : 'text-slate-300'}`}>
                {r.title}
              </p>
              <p className="text-slate-500 text-xs mt-1 leading-snug line-clamp-2">{r.description}</p>
            </button>
          ))}

          <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Ad Details</p>
            <div className="space-y-2">
              {[
                { label: 'Slides', val: `${reel.slides.length} slides` },
                { label: 'Duration', val: `~${Math.round((reel.slides.length * 3.2))}s` },
                { label: 'Simulated Likes', val: reel.likes },
                { label: 'Simulated Comments', val: reel.comments },
              ].map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-slate-500 text-xs">{row.label}</span>
                  <span className="text-white text-xs font-semibold">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col xl:flex-row gap-8 p-8 items-start">

            {/* Phone player */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <ReelPlayer
                key={reel.id}
                username="HospitalitySupport.uk"
                handle="@hospitality.support.uk"
                hook={reel.hook}
                cta="Link in bio. Try it free."
                slides={reel.slides}
                accentColor={reel.accentColor}
                likes={reel.likes}
                comments={reel.comments}
              />
            </div>

            {/* Content panels */}
            <div className="flex-1 space-y-5 max-w-xl">

              {/* Hook */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Hook (first 3 seconds)</p>
                  <CopyButton text={reel.hook} />
                </div>
                <p className="text-white text-sm font-semibold leading-snug">"{reel.hook}"</p>
              </div>

              {/* Slide sequence */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Slide Sequence</p>
                <div className="space-y-3">
                  {reel.slides.map((s, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span
                        className="text-[10px] font-black w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: reel.accentColor + '22', color: reel.accentColor }}
                      >
                        {s.isBig ? '★' : i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-white text-xs font-bold">{s.heading}</p>
                          {s.tag && (
                            <span
                              className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                              style={{ background: reel.accentColor + '20', color: reel.accentColor }}
                            >
                              {s.tag}
                            </span>
                          )}
                        </div>
                        {s.body && (
                          <p className="text-slate-400 text-xs mt-0.5 leading-relaxed whitespace-pre-line">{s.body}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caption */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Instagram Caption</p>
                  <CopyButton text={reel.caption + '\n\n' + reel.hashtags} />
                </div>
                <p className="text-white text-xs leading-relaxed whitespace-pre-line">{reel.caption}</p>
                <p className="text-teal-400/70 text-xs mt-3 leading-relaxed">{reel.hashtags}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
