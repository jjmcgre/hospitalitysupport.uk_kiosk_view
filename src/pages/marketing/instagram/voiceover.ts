export interface SlideVoice {
  callout: string;
  detail?: string;
}

export interface VoiceoverController {
  play: (
    slides: SlideVoice[],
    onCallout: (idx: number) => void,
    onDetail: (idx: number) => void,
    onEnd: () => void
  ) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
}

function pickMaleUKVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const maleNames = ['daniel', 'george', 'james', 'oliver', 'male', 'man'];
  const ukVoices = voices.filter((v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB'));
  const maleUK = ukVoices.find((v) => maleNames.some((n) => v.name.toLowerCase().includes(n)));
  return maleUK ?? ukVoices[0] ?? null;
}

function speak(
  text: string,
  voice: SpeechSynthesisVoice | null,
  rate: number,
  pitch: number,
  onEnd: () => void,
  onError: () => void
): SpeechSynthesisUtterance {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = rate;
  u.pitch = pitch;
  u.volume = 1.0;
  if (voice) u.voice = voice;
  u.onend = () => onEnd();
  u.onerror = (e) => {
    if (e.error === 'interrupted' || e.error === 'canceled') return;
    onError();
  };
  window.speechSynthesis.speak(u);
  return u;
}

export function createVoiceover(): VoiceoverController {
  let active = false;
  let paused = false;
  let voice: SpeechSynthesisVoice | null = null;

  let onCallout: (idx: number) => void = () => {};
  let onDetail: (idx: number) => void = () => {};
  let onEnd: () => void = () => {};
  let slides: SlideVoice[] = [];

  function runSlide(idx: number) {
    if (!active || idx >= slides.length) {
      if (active) { active = false; onEnd(); }
      return;
    }

    const slide = slides[idx];

    onCallout(idx);

    const afterCallout = () => {
      if (!active) return;
      if (slide.detail) {
        onDetail(idx);
        speak(
          slide.detail,
          voice,
          1.18,
          1.0,
          () => { if (active && !paused) setTimeout(() => runSlide(idx + 1), 180); },
          () => { if (active && !paused) setTimeout(() => runSlide(idx + 1), 180); }
        );
      } else {
        setTimeout(() => runSlide(idx + 1), 400);
      }
    };

    speak(
      slide.callout,
      voice,
      1.28,
      1.1,
      () => { if (active && !paused) setTimeout(afterCallout, 120); },
      () => { if (active && !paused) setTimeout(afterCallout, 120); }
    );
  }

  return {
    play(newSlides, calloutCb, detailCb, endCb) {
      slides = newSlides;
      onCallout = calloutCb;
      onDetail = detailCb;
      onEnd = endCb;
      active = true;
      paused = false;
      voice = pickMaleUKVoice();
      window.speechSynthesis.cancel();
      runSlide(0);
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
