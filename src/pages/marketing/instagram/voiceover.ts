export interface VoiceController {
  speak: (script: string, onEnd: () => void) => void;
  stop: () => void;
}

function pickVoice(): SpeechSynthesisVoice | null {
  const all = window.speechSynthesis.getVoices();
  const ukMale = all.find((v) =>
    (v.lang === 'en-GB' || v.lang.startsWith('en-GB')) &&
    ['daniel', 'george', 'james', 'oliver'].some((n) => v.name.toLowerCase().includes(n))
  );
  const ukAny = all.find((v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB'));
  return ukMale ?? ukAny ?? null;
}

export function createVoiceController(): VoiceController {
  let active = false;

  return {
    speak(script, onEnd) {
      if (!('speechSynthesis' in window)) { onEnd(); return; }
      active = true;
      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(script);
      u.lang = 'en-GB';
      u.rate = 1.15;
      u.pitch = 1.05;
      u.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          u.voice = pickVoice();
          window.speechSynthesis.onvoiceschanged = null;
        };
      } else {
        u.voice = pickVoice();
      }

      u.onend = () => { if (active) onEnd(); };
      u.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        if (active) onEnd();
      };
      window.speechSynthesis.speak(u);
    },

    stop() {
      active = false;
      window.speechSynthesis.cancel();
    },
  };
}
