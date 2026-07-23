import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SendShareLinkPayload {
  to: string;
  channel: "email" | "sms";
  linkUrl: string;
  linkName: string;
  senderName?: string;
}

function normalisePhone(raw: string): string | null {
  let digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("00")) return "+" + digits.slice(2);
  if (digits.startsWith("0")) return "+44" + digits.slice(1);
  if (digits.startsWith("44")) return "+" + digits;
  return digits.length > 9 ? "+" + digits : null;
}

function emailHtml(p: SendShareLinkPayload): string {
  const firstName = p.to.split("@")[0].split(".")[0] || "there";
  const cap = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
        <tr><td style="background:#134e4a;border-radius:16px 16px 0 0;padding:32px 36px 28px;">
          <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">ServiceSupport.UK</div>
          <div style="color:#ffffff;font-size:24px;font-weight:900;line-height:1.2;">Hi ${cap},</div>
          <div style="color:#99f6e4;font-size:14px;margin-top:8px;">${p.senderName ?? "A colleague"} thought you'd like to see this.</div>
        </td></tr>
        <tr><td style="background:#1e293b;padding:28px 36px;">
          <div style="color:#94a3b8;font-size:14px;line-height:1.6;margin-bottom:24px;">
            ${p.linkName}
          </div>
          <div style="text-align:center;">
            <a href="${p.linkUrl}" style="display:inline-block;background:#14b8a6;color:#ffffff;font-size:15px;font-weight:900;text-decoration:none;border-radius:12px;padding:14px 32px;">
              View Now
            </a>
          </div>
          <div style="color:#64748b;font-size:12px;text-align:center;margin-top:16px;">
            Or copy this link: ${p.linkUrl}
          </div>
        </td></tr>
        <tr><td style="background:#0f172a;border-radius:0 0 16px 16px;padding:20px 36px;border-top:1px solid #1e293b;">
          <div style="color:#475569;font-size:12px;text-align:center;">
            Sent via ServiceSupport.UK
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const payload: SendShareLinkPayload = await req.json();

    if (!payload.to || !payload.linkUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (payload.channel === "email") {
      const resendKey = Deno.env.get("RESEND_API_KEY");
      if (!resendKey) {
        return new Response(
          JSON.stringify({ error: "Missing RESEND_API_KEY" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const fromDomain = Deno.env.get("RESEND_FROM_EMAIL") ?? "onboarding@resend.dev";
      const fromName = Deno.env.get("RESEND_FROM_NAME") ?? "ServiceSupport.UK";

      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${fromName} <${fromDomain}>`,
          to: [payload.to],
          subject: `${payload.senderName ?? "ServiceSupport.UK"} sent you a link — ServiceSupport.UK`,
          html: emailHtml(payload),
          text: `${payload.linkName}\n\nView here: ${payload.linkUrl}\n\nSent by ${payload.senderName ?? "ServiceSupport.UK"}`,
        }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        return new Response(
          JSON.stringify({ error: data?.message ?? "Failed to send email" }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ ok: true, id: data.id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SMS via Twilio
    if (payload.channel === "sms") {
      const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
      const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
      const fromNumber = Deno.env.get("TWILIO_SMS_FROM") ?? Deno.env.get("TWILIO_WHATSAPP_FROM");

      if (!accountSid || !authToken || !fromNumber) {
        return new Response(
          JSON.stringify({ error: "Twilio credentials not configured" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const phone = normalisePhone(payload.to);
      if (!phone) {
        return new Response(
          JSON.stringify({ error: "Invalid phone number" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const messageBody =
        `ServiceSupport.UK\n\n${payload.linkName}\n\n${payload.linkUrl}\n\n` +
        `Sent by ${payload.senderName ?? "ServiceSupport.UK"}`;

      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const auth = btoa(`${accountSid}:${authToken}`);

      const twilioRes = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: fromNumber,
          To: phone,
          Body: messageBody,
        }).toString(),
      });

      const twilioData = await twilioRes.json();
      if (!twilioRes.ok) {
        return new Response(
          JSON.stringify({ error: twilioData?.message ?? "Twilio API error" }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ ok: true, sid: twilioData.sid }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid channel" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
