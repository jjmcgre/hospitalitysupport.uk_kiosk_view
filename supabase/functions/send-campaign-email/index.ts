import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { contactId, campaignId, emailId, stage, subject, body, cta } = await req.json();

    if (!contactId || !subject || !body) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch contact
    const { data: contact, error: contactErr } = await supabase
      .from("email_contacts")
      .select("id, name, email, status")
      .eq("id", contactId)
      .maybeSingle();

    if (contactErr || !contact) {
      return new Response(JSON.stringify({ error: "Contact not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (contact.status === "unsubscribed" || contact.status === "bounced") {
      return new Response(JSON.stringify({ error: `Contact is ${contact.status}` }), {
        status: 422,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Pre-insert send row to get the send ID for the tracking pixel
    const { data: sendRow, error: sendInsertErr } = await supabase
      .from("email_sends")
      .insert({
        contact_id: contactId,
        campaign_id: campaignId,
        email_id: emailId,
        stage,
        subject,
        resend_message_id: "", // will update after Resend responds
      })
      .select("id")
      .single();

    if (sendInsertErr || !sendRow) {
      throw new Error("Failed to create send record");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const trackPixelUrl = `${supabaseUrl}/functions/v1/email-tracking/pixel?sid=${sendRow.id}`;
    const unsubUrl = `${supabaseUrl}/functions/v1/email-tracking/unsub?cid=${contactId}`;

    // Build HTML email
    const firstName = contact.name?.split(" ")[0] || contact.name || "there";
    const personalizedBody = body.replace(/\[First Name\]/gi, firstName);
    const htmlBody = personalizedBody
      .split("\n")
      .map((line: string) => {
        if (line.trim() === "") return "<br/>";
        return `<p style="margin:0 0 12px;line-height:1.6;">${line}</p>`;
      })
      .join("");

    const htmlEmail = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family:Georgia,serif;font-size:15px;color:#1a1a1a;max-width:600px;margin:0 auto;padding:32px 24px;background:#ffffff;">
${htmlBody}
<p style="margin:24px 0 0;"><strong>${cta}</strong></p>
<hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0;"/>
<p style="font-size:12px;color:#888;margin:0;">
  To unsubscribe from these emails, <a href="${unsubUrl}" style="color:#888;">click here</a>.
</p>
<img src="${trackPixelUrl}" width="1" height="1" alt="" style="display:block;"/>
</body>
</html>`;

    // Determine from address — use verified domain if set, otherwise Resend test sender
    const fromDomain = Deno.env.get("RESEND_FROM_EMAIL") ?? "onboarding@resend.dev";
    const fromName = Deno.env.get("RESEND_FROM_NAME") ?? "HospitalitySupport.uk";

    // Send via Resend
    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${fromName} <${fromDomain}>`,
        to: [contact.email],
        subject,
        html: htmlEmail,
        text: `${personalizedBody}\n\n${cta}`,
        tags: [
          { name: "campaign_id", value: campaignId },
          { name: "send_id", value: sendRow.id },
          { name: "contact_id", value: contactId },
        ],
      }),
    });

    const resendData = await resendResp.json();

    if (!resendResp.ok) {
      // Remove the pre-inserted send row on failure
      await supabase.from("email_sends").delete().eq("id", sendRow.id);
      const resendMsg = resendData?.message ?? resendData?.name ?? JSON.stringify(resendData);
      return new Response(JSON.stringify({ error: resendMsg, detail: resendData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update send row with the Resend message ID
    await supabase
      .from("email_sends")
      .update({ resend_message_id: resendData.id ?? "" })
      .eq("id", sendRow.id);

    // Update contact stage
    await supabase
      .from("email_contacts")
      .update({ current_campaign_id: campaignId, current_stage: stage, updated_at: new Date().toISOString() })
      .eq("id", contactId);

    return new Response(JSON.stringify({ ok: true, sendId: sendRow.id, resendId: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
