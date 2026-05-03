export interface VoiceController {
  speak: (script: string, onEnd: () => void) => void;
  stop: () => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const EL_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY as string | undefined;
const EL_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID as string | undefined;

// Module-level singleton queue — prevents concurrent requests
let elInFlight = false;
const elQueue: Array<() => void> = [];

function drainQueue() {
  if (elInFlight || elQueue.length === 0) return;
  const next = elQueue.shift()!;
  next();
}

function withQueue<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const run = () => {
      elInFlight = true;
      fn().then(resolve, reject).finally(() => {
        elInFlight = false;
        drainQueue();
      });
    };
    if (elInFlight) {
      elQueue.push(run);
    } else {
      run();
    }
  });
}

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

async function fetchTTS(script: string): Promise<Blob> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/tts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: script, apiKey: EL_API_KEY, voiceId: EL_VOICE_ID }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[TTS] Edge function HTTP ${res.status}:`, body);
    throw new Error(`TTS ${res.status}: ${body}`);
  }

  return res.blob();
}

export function createVoiceController(): VoiceController {
  let audioEl: HTMLAudioElement | null = null;
  let cancelFallback: (() => void) | null = null;
  let active = false;

  const stopAll = () => {
    if (audioEl) { audioEl.pause(); audioEl.src = ''; audioEl = null; }
    if (cancelFallback) { cancelFallback(); cancelFallback = null; }
    window.speechSynthesis?.cancel();
    elQueue.length = 0;
  };

  return {
    async speak(script, onEnd) {
      active = true;
      stopAll();

      try {
        const blob = await withQueue(() => fetchTTS(script));
        if (!active) return;

        const url = URL.createObjectURL(blob);
        audioEl = new Audio(url);
        audioEl.onended = () => { URL.revokeObjectURL(url); if (active) onEnd(); };
        audioEl.onerror = () => { URL.revokeObjectURL(url); if (active) onEnd(); };
        await audioEl.play();
        return;
      } catch (err) {
        console.warn('[TTS] Edge function failed, falling back to Web Speech:', err);
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
