import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingEmailPayload {
  to: string;
  name: string;
  businessName: string;
  date: string;
  time: string;
  duration: number;
  videoLink: string;
  adminEmail: string;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function prospectHtml(p: BookingEmailPayload): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <!-- Header -->
        <tr><td style="background:#134e4a;border-radius:16px 16px 0 0;padding:32px 36px 28px;">
          <div style="color:#5eead4;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Demo Confirmed</div>
          <div style="color:#ffffff;font-size:26px;font-weight:900;line-height:1.2;">You're booked in, ${p.name.split(" ")[0]}!</div>
          <div style="color:#99f6e4;font-size:14px;margin-top:8px;">Your ServiceSupport.UK demo is confirmed.</div>
        </td></tr>

        <!-- Meeting card -->
        <tr><td style="background:#1e293b;padding:28px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#0f172a;border:1px solid #334155;border-radius:12px;padding:20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:16px;">
                      <div style="color:#64748b;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">Date</div>
                      <div style="color:#ffffff;font-size:15px;font-weight:700;">${formatDate(p.date)}</div>
                    </td>
                    <td style="padding-bottom:16px;text-align:right;">
                      <div style="color:#64748b;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">Time</div>
                      <div style="color:#ffffff;font-size:15px;font-weight:700;">${p.time} · ${p.duration} mins</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="border-top:1px solid #334155;padding-top:16px;">
                      <div style="color:#64748b;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:4px;">Business</div>
                      <div style="color:#ffffff;font-size:15px;font-weight:700;">${p.businessName}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Join button -->
          <div style="margin-top:24px;text-align:center;">
            <a href="${p.videoLink}" style="display:inline-block;background:#14b8a6;color:#ffffff;font-size:15px;font-weight:900;text-decoration:none;border-radius:12px;padding:14px 32px;">
              Join Video Call
            </a>
            <div style="color:#64748b;font-size:11px;margin-top:10px;">Powered by Google Meet — opens in your browser, no download needed</div>
          </div>
        </td></tr>

        <!-- What to expect -->
        <tr><td style="background:#1e293b;padding:0 36px 28px;">
          <div style="border-top:1px solid #334155;padding-top:24px;">
            <div style="color:#5eead4;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;">What to expect</div>
            ${["We'll walk through the platform live — menus, costings, allergens, HACCP", "You'll see exactly how fast it works in a real kitchen setting", "No slides, no prep needed — just the live platform"].map(pt => `
            <div style="display:flex;align-items:flex-start;margin-bottom:10px;">
              <div style="color:#14b8a6;font-size:12px;margin-right:10px;margin-top:1px;">→</div>
              <div style="color:#94a3b8;font-size:13px;line-height:1.5;">${pt}</div>
            </div>`).join("")}
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0f172a;border-radius:0 0 16px 16px;padding:20px 36px;border-top:1px solid #1e293b;">
          <div style="color:#475569;font-size:12px;text-align:center;">
            Questions? Reply to this email or contact <a href="mailto:${p.adminEmail}" style="color:#14b8a6;">${p.adminEmail}</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminHtml(p: BookingEmailPayload): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;">
        <tr><td style="background:#1e293b;border:1px solid #334155;border-radius:16px;padding:28px 32px;">
          <div style="color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">New Demo Booked</div>
          <div style="color:#ffffff;font-size:22px;font-weight:900;margin-bottom:20px;">${p.name} — ${p.businessName}</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:10px;padding:16px 20px;margin-bottom:20px;">
            <tr><td style="padding-bottom:10px;">
              <div style="color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;">Date &amp; Time</div>
              <div style="color:#ffffff;font-size:14px;font-weight:700;">${formatDate(p.date)} at ${p.time} (${p.duration} mins)</div>
            </td></tr>
            <tr><td style="border-top:1px solid #1e293b;padding-top:10px;padding-bottom:10px;">
              <div style="color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;">Contact</div>
              <div style="color:#ffffff;font-size:14px;">${p.to}</div>
            </td></tr>
            <tr><td style="border-top:1px solid #1e293b;padding-top:10px;">
              <div style="color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Video Link</div>
              <a href="${p.videoLink}" style="color:#14b8a6;font-size:13px;">${p.videoLink}</a>
            </td></tr>
          </table>
          <a href="${p.videoLink}" style="display:block;background:#14b8a6;color:#ffffff;font-size:14px;font-weight:900;text-decoration:none;border-radius:10px;padding:12px 24px;text-align:center;">
            Join Meeting
          </a>
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
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload: BookingEmailPayload = await req.json();
    const adminEmail = payload.adminEmail || "james@servicesupportgroup.uk";

    const fromAddress = "ServiceSupport.UK <demos@servicesupportgroup.uk>";

    // Send confirmation to prospect
    const prospectRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [payload.to],
        subject: `Your demo is confirmed — ${formatDate(payload.date)} at ${payload.time}`,
        html: prospectHtml(payload),
      }),
    });

    const prospectData = await prospectRes.json();

    // Send alert to admin
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [adminEmail],
        subject: `New demo: ${payload.name} (${payload.businessName}) — ${formatDate(payload.date)} at ${payload.time}`,
        html: adminHtml(payload),
      }),
    });

    const adminData = await adminRes.json();

    return new Response(
      JSON.stringify({ prospect: prospectData, admin: adminData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
