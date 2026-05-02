import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/*
  ElevenLabs TTS proxy.
  Expects JSON body: { text: string, voiceId?: string }
  Returns: audio/mpeg stream

  Voice used: "Daniel" — ElevenLabs premade UK English male voice.
  Voice ID: onwK4e9ZLuTAKqWW03F9  (Daniel, British English)

  Set ELEVENLABS_API_KEY in Supabase edge function secrets.
*/

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("ELEVENLABS_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ELEVENLABS_API_KEY not configured" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const configuredVoiceId = Deno.env.get("ELEVENLABS_VOICE_ID");

    const { text, voiceId } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Priority: request body → ELEVENLABS_VOICE_ID secret → Daniel fallback
    const voice = voiceId ?? configuredVoiceId ?? "onwK4e9ZLuTAKqWW03F9";

    const elRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}/stream`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.82,
            style: 0.28,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!elRes.ok) {
      const err = await elRes.text();
      return new Response(
        JSON.stringify({ error: `ElevenLabs error: ${elRes.status}`, detail: err }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(elRes.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
