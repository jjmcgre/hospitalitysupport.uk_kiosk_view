export interface VoiceController {
  speak: (script: string, onEnd: () => void) => void;
  stop: () => void;
}

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/*
  Attempts ElevenLabs TTS via edge function first.
  Falls back to Web Speech API if the key isn't configured or the request fails.
*/

function webSpeechFallback(script: string, onEnd: () => void): () => void {
  if (!('speechSynthesis' in window)) { onEnd(); return () => {}; }

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(script);
  u.lang = 'en-GB';
  u.rate = 1.12;
  u.pitch = 1.0;
  u.volume = 1.0;

  // Best available UK voice
  const voices = window.speechSynthesis.getVoices();
  const pick = () => {
    const all = window.speechSynthesis.getVoices();
    const ukMale = all.find(
      (v) =>
        (v.lang === 'en-GB' || v.lang.startsWith('en-GB')) &&
        ['daniel', 'george', 'james', 'oliver'].some((n) => v.name.toLowerCase().includes(n))
    );
    const ukAny = all.find((v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB'));
    return ukMale ?? ukAny ?? null;
  };

  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      u.voice = pick();
      window.speechSynthesis.onvoiceschanged = null;
    };
  } else {
    u.voice = pick();
  }

  u.onend = onEnd;
  u.onerror = (e) => {
    if (e.error === 'interrupted' || e.error === 'canceled') return;
    onEnd();
  };
  window.speechSynthesis.speak(u);
  return () => window.speechSynthesis.cancel();
}

export function createVoiceController(): VoiceController {
  let audioEl: HTMLAudioElement | null = null;
  let cancelFallback: (() => void) | null = null;
  let active = false;

  return {
    async speak(script, onEnd) {
      // Stop anything already playing
      active = true;
      if (audioEl) { audioEl.pause(); audioEl.src = ''; audioEl = null; }
      if (cancelFallback) { cancelFallback(); cancelFallback = null; }
      window.speechSynthesis?.cancel();

      try {
        const res = await fetch(TTS_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: script }),
        });

        // If key not configured or any server error, fall through to Web Speech
        if (!res.ok) throw new Error(`TTS ${res.status}`);

        const blob = await res.blob();
        if (!active) return;

        const url = URL.createObjectURL(blob);
        audioEl = new Audio(url);
        audioEl.onended = () => {
          URL.revokeObjectURL(url);
          if (active) onEnd();
        };
        audioEl.onerror = () => {
          URL.revokeObjectURL(url);
          if (active) onEnd();
        };
        await audioEl.play();
      } catch {
        // ElevenLabs unavailable — use Web Speech
        if (!active) return;
        cancelFallback = webSpeechFallback(script, onEnd);
      }
    },

    stop() {
      active = false;
      if (audioEl) { audioEl.pause(); audioEl.src = ''; audioEl = null; }
      if (cancelFallback) { cancelFallback(); cancelFallback = null; }
      window.speechSynthesis?.cancel();
    },
  };
}
