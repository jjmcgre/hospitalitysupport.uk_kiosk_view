export interface VoiceoverController {
  play: (texts: string[], onSlide: (idx: number) => void, onEnd: () => void) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

function pickMaleUKVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const maleNames = ['daniel', 'george', 'james', 'oliver', 'male', 'man'];
  const ukVoices = voices.filter(
    (v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB')
  );
  const maleUK = ukVoices.find((v) =>
    maleNames.some((n) => v.name.toLowerCase().includes(n))
  );
  return maleUK ?? ukVoices[0] ?? null;
}

function buildUtterance(
  text: string,
  voice: SpeechSynthesisVoice | null
): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = 0.88;
  u.pitch = 0.9;
  u.volume = 1.0;
  if (voice) u.voice = voice;
  return u;
}

export function createVoiceover(): VoiceoverController {
  let active = false;
  let paused = false;
  let currentIdx = 0;
  let texts: string[] = [];
  let onSlide: (idx: number) => void = () => {};
  let onEnd: () => void = () => {};
  let voice: SpeechSynthesisVoice | null = null;

  function speakNext(idx: number) {
    if (!active || idx >= texts.length) {
      if (active) { active = false; onEnd(); }
      return;
    }
    currentIdx = idx;
    onSlide(idx);

    const u = buildUtterance(texts[idx], voice);

    u.onend = () => {
      if (!active || paused) return;
      setTimeout(() => speakNext(idx + 1), 320);
    };

    u.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      setTimeout(() => speakNext(idx + 1), 320);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  return {
    play(newTexts, slideCallback, endCallback) {
      texts = newTexts;
      onSlide = slideCallback;
      onEnd = endCallback;
      active = true;
      paused = false;
      voice = pickMaleUKVoice();
      speakNext(0);
    },

    pause() {
      paused = true;
      window.speechSynthesis.pause();
    },

    resume() {
      if (!paused) return;
      paused = false;
      window.speechSynthesis.resume();
    },

    stop() {
      active = false;
      paused = false;
      window.speechSynthesis.cancel();
    },
  };
}
