import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface WhatsAppPayload {
  phone: string;
  name: string;
  businessName: string;
  date: string;
  time: string;
  duration: number;
  videoLink: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function normalisePhone(raw: string): string | null {
  let digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return digits;
  }
  if (digits.startsWith("00")) {
    return "+" + digits.slice(2);
  }
  if (digits.startsWith("0")) {
    return "+44" + digits.slice(1);
  }
  if (digits.startsWith("44")) {
    return "+" + digits;
  }
  return digits.length > 9 ? "+" + digits : null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const fromNumber = Deno.env.get("TWILIO_WHATSAPP_FROM");

    if (!accountSid || !authToken || !fromNumber) {
      return new Response(
        JSON.stringify({ error: "Twilio credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: WhatsAppPayload = await req.json();
    const phone = normalisePhone(payload.phone);

    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Invalid phone number" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const firstName = payload.name.split(" ")[0];
    const messageBody =
      `*Demo Confirmed*\n\n` +
      `Hi ${firstName}, your ServiceSupport.UK demo is booked in.\n\n` +
      `*Date:* ${formatDate(payload.date)}\n` +
      `*Time:* ${payload.time} (${payload.duration} mins)\n` +
      `*Business:* ${payload.businessName}\n\n` +
      `Video call link:\n${payload.videoLink}\n\n` +
      `See you then! Questions? Reply here or email james@servicesupportgroup.uk`;

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const auth = btoa(`${accountSid}:${authToken}`);

    const twilioRes = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: `whatsapp:${fromNumber}`,
        To: `whatsapp:${phone}`,
        Body: messageBody,
      }).toString(),
    });

    const twilioData = await twilioRes.json();

    if (!twilioRes.ok) {
      return new Response(
        JSON.stringify({ error: twilioData?.message || "Twilio API error", status: twilioRes.status }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, sid: twilioData.sid }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
