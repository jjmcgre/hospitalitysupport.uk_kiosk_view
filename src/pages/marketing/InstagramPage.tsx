import { useState } from 'react';
import ReelPlayer from './instagram/ReelPlayer';
import { reels } from './instagram/reelData';
import { staticAds } from './instagram/staticAdData';
import StaticAdPreview from './instagram/StaticAdPreview';
import CopyButton from './components/CopyButton';

type Tab = 'reels' | 'static';

export default function InstagramPage() {
  const [tab, setTab] = useState<Tab>('reels');
  const [activeReel, setActiveReel] = useState(0);
  const [activeAd, setActiveAd] = useState(0);

  const reel = reels[activeReel];
  const ad = staticAds[activeAd];
  const totalSec = Math.round(reel.beats.reduce((s, b) => s + b.durationMs, 0) / 1000);

  return (
    <div className="min-h-full bg-slate-950">
      <div className="border-b border-slate-800">
        <div className="px-8 py-3 bg-teal-500/10 border-b border-teal-500/20 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
          <p className="text-teal-300 text-sm font-semibold">How to use: copy the caption, paste into Instagram, upload your video or image, post.</p>
        </div>
        <div className="px-8 py-6">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
            Instagram
          </span>
          <h1 className="text-white font-black text-3xl mt-3">Ad Previews</h1>
          <p className="text-slate-400 text-sm mt-1">
            Reel scripts and static post creatives — copy captions, brief a designer, or use as a direct reference.
          </p>

          <div className="flex gap-1 mt-5 bg-slate-900 border border-slate-800 rounded-xl p-1 w-fit">
            {([
              { id: 'reels', label: 'Reels (Video)' },
              { id: 'static', label: 'Static Posts' },
            ] as { id: Tab; label: string }[]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-150 ${
                  tab === t.id
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === 'reels' ? (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
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
                  { label: 'Beats', val: `${reel.beats.length} beats` },
                  { label: 'Runtime', val: `~${totalSec}s` },
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

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col xl:flex-row gap-8 p-8 items-start">
              <div className="flex-shrink-0">
                <ReelPlayer
                  key={reel.id}
                  reel={reel}
                  username="HospitalitySupport.uk"
                  handle="@hospitality.support.uk"
                />
              </div>

              <div className="flex-1 space-y-5 max-w-xl">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Hook (first 3 seconds)</p>
                    <CopyButton text={reel.hook} />
                  </div>
                  <p className="text-white text-sm font-semibold leading-snug">"{reel.hook}"</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Beat Sequence</p>
                  <div className="space-y-3">
                    {reel.beats.map((b, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span
                          className="text-[10px] font-black w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: reel.accentColor + '22', color: reel.accentColor }}
                        >
                          {b.isBig ? '★' : i + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-white text-xs font-bold">{b.headline}</p>
                            {b.tag && (
                              <span
                                className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                                style={{ background: reel.accentColor + '20', color: reel.accentColor }}
                              >
                                {b.tag}
                              </span>
                            )}
                            <span className="text-slate-600 text-[9px]">{(b.durationMs / 1000).toFixed(1)}s</span>
                          </div>
                          {b.sub && (
                            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed whitespace-pre-line">{b.sub}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Voiceover Script</p>
                    <CopyButton text={reel.voiceScript} />
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed italic">"{reel.voiceScript}"</p>
                </div>

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
      ) : (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-200px)]">
          <div className="lg:w-72 border-b lg:border-b-0 lg:border-r border-slate-800 p-5 flex flex-col gap-3 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex-shrink-0">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Static Creatives</p>
            {staticAds.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setActiveAd(i)}
                className={`text-left rounded-2xl p-4 border transition-all duration-200 ${
                  activeAd === i
                    ? 'border-teal-500/40 bg-teal-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-black px-2 py-0.5 rounded"
                    style={{
                      background: activeAd === i ? a.accentColor + '28' : '#1e293b',
                      color: activeAd === i ? a.accentColor : '#64748b',
                    }}
                  >
                    {a.number}
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded"
                    style={{
                      background: activeAd === i ? a.accentColor + '18' : '#0f172a',
                      color: activeAd === i ? a.accentColor : '#475569',
                    }}
                  >
                    {a.label}
                  </span>
                </div>
                <p className={`font-bold text-sm leading-snug ${activeAd === i ? 'text-white' : 'text-slate-300'}`}>
                  {a.title}
                </p>
                <p className="text-slate-500 text-xs mt-1 leading-snug line-clamp-2">{a.description}</p>
              </button>
            ))}

            <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">Format</p>
              <div className="space-y-2">
                {[
                  { label: 'Format', val: 'Square / 1:1' },
                  { label: 'Style', val: ad.bgStyle.replace('-', ' ') },
                  { label: 'Mockup', val: ad.mockupType.replace('-', ' ') },
                  { label: 'Simulated Likes', val: ad.likes },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-slate-500 text-xs">{row.label}</span>
                    <span className="text-white text-xs font-semibold capitalize">{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col xl:flex-row gap-8 p-8 items-start">
              <div className="flex-shrink-0">
                <StaticAdPreview
                  key={ad.id}
                  ad={ad}
                  username="HospitalitySupport.uk"
                  handle="@hospitality.support.uk"
                />
              </div>

              <div className="flex-1 space-y-5 max-w-xl">
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Design Brief</p>
                  <div className="space-y-3">
                    {[
                      { label: 'Background', val: ad.bgStyle === 'dark-navy' ? 'Dark navy (#0f1623)' : ad.bgStyle === 'off-white' ? 'Off-white (#f5f3ef)' : 'Charcoal (#1a1d24)' },
                      { label: 'Accent colour', val: ad.accentColor },
                      { label: 'Badge', val: ad.badge },
                      { label: 'Headline', val: ad.headline + (ad.headlineAccent ? ' ' + ad.headlineAccent : '') },
                      { label: 'Subheadline', val: ad.subheadline || '—' },
                      { label: 'CTA button', val: ad.ctaText },
                    ].map((row) => (
                      <div key={row.label} className="flex gap-4 justify-between items-start">
                        <span className="text-slate-500 text-xs flex-shrink-0">{row.label}</span>
                        <span className="text-white text-xs font-semibold text-right leading-snug">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {ad.pillTags && ad.pillTags.length > 0 && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Pill Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {ad.pillTags.map((tag) => (
                        <span key={tag} className="text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700 text-slate-200 bg-slate-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Caption</p>
                    <CopyButton text={ad.caption + '\n\n' + ad.hashtags} />
                  </div>
                  <p className="text-white text-xs leading-relaxed whitespace-pre-line">{ad.caption}</p>
                  <p className="text-teal-400/70 text-xs mt-3 leading-relaxed">{ad.hashtags}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Production Notes</p>
                  <ul className="space-y-2">
                    {[
                      'Export at 1080×1080px minimum for feed quality',
                      'Accent colour used on badge pill and CTA button only',
                      ad.mockupType !== 'none' ? `Include ${ad.mockupType.replace('-', ' ')} mockup in lower half` : 'No mockup — typography-only layout',
                      'Keep 40px safe zone on all sides for cropping',
                      'Use Inter or similar geometric sans-serif, weight 800+ for headline',
                    ].map((note, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-teal-500 text-xs mt-0.5 flex-shrink-0">→</span>
                        <span className="text-slate-300 text-xs leading-relaxed">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
