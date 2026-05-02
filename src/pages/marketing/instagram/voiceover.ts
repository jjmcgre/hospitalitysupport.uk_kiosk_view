export interface VoiceController {
  speak: (script: string, onEnd: () => void) => void;
  stop: () => void;
}

const EL_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined;
const EL_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID as string | undefined;

function webSpeechFallback(script: string, onEnd: () => void): () => void {
  if (!('speechSynthesis' in window)) { onEnd(); return () => {}; }
  window.speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(script);
  u.lang = 'en-GB';
  u.rate = 1.12;
  u.pitch = 1.0;
  u.volume = 1.0;

  const pick = () => {
    const all = window.speechSynthesis.getVoices();
    const ukMale = all.find(
      (v) =>
        (v.lang === 'en-GB' || v.lang.startsWith('en-GB')) &&
        ['daniel', 'george', 'james', 'oliver'].some((n) => v.name.toLowerCase().includes(n))
    );
    return ukMale ?? all.find((v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB')) ?? null;
  };

  const voices = window.speechSynthesis.getVoices();
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

  const stopAll = () => {
    if (audioEl) { audioEl.pause(); audioEl.src = ''; audioEl = null; }
    if (cancelFallback) { cancelFallback(); cancelFallback = null; }
    window.speechSynthesis?.cancel();
  };

  return {
    async speak(script, onEnd) {
      active = true;
      stopAll();

      // Call ElevenLabs directly from the browser — server proxies trigger their abuse detection
      if (EL_API_KEY && EL_VOICE_ID) {
        try {
          const res = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${EL_VOICE_ID}/stream`,
            {
              method: 'POST',
              headers: {
                'xi-api-key': EL_API_KEY,
                'Content-Type': 'application/json',
                Accept: 'audio/mpeg',
              },
              body: JSON.stringify({
                text: script,
                model_id: 'eleven_turbo_v2_5',
                voice_settings: {
                  stability: 0.45,
                  similarity_boost: 0.82,
                  style: 0.28,
                  use_speaker_boost: true,
                },
              }),
            }
          );

          if (!res.ok) throw new Error(`ElevenLabs ${res.status}`);

          const blob = await res.blob();
          if (!active) return;

          const url = URL.createObjectURL(blob);
          audioEl = new Audio(url);
          audioEl.onended = () => { URL.revokeObjectURL(url); if (active) onEnd(); };
          audioEl.onerror = () => { URL.revokeObjectURL(url); if (active) onEnd(); };
          await audioEl.play();
          return;
        } catch {
          // fall through to Web Speech
        }
      }

      if (!active) return;
      cancelFallback = webSpeechFallback(script, onEnd);
    },

    stop() {
      active = false;
      stopAll();
    },
  };
}
