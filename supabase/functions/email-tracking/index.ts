import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// 1x1 transparent GIF
const PIXEL = new Uint8Array([
  71,73,70,56,57,97,1,0,1,0,128,0,0,255,255,255,0,0,0,33,249,4,0,0,0,0,0,44,0,0,0,0,1,0,1,0,0,2,2,68,1,0,59
]);

async function handlePixel(sendId: string): Promise<Response> {
  if (sendId) {
    // Fetch send row
    const { data: send } = await supabase
      .from("email_sends")
      .select("id, contact_id, open_count, opened_at")
      .eq("id", sendId)
      .maybeSingle();

    if (send) {
      const now = new Date().toISOString();
      await supabase
        .from("email_sends")
        .update({
          opened_at: send.opened_at ?? now,
          open_count: (send.open_count ?? 0) + 1,
        })
        .eq("id", sendId);

      await supabase.from("email_events").insert({
        send_id: sendId,
        contact_id: send.contact_id,
        resend_message_id: "",
        event_type: "opened",
        occurred_at: now,
      });
    }
  }

  return new Response(PIXEL, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

async function handleUnsub(contactId: string): Promise<Response> {
  if (contactId) {
    await supabase
      .from("email_contacts")
      .update({ status: "unsubscribed", updated_at: new Date().toISOString() })
      .eq("id", contactId);

    await supabase.from("email_events").insert({
      contact_id: contactId,
      resend_message_id: "",
      event_type: "unsubscribed",
      occurred_at: new Date().toISOString(),
    });
  }

  return new Response(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:480px;margin:80px auto;text-align:center;color:#333;">
      <h2>You've been unsubscribed</h2>
      <p>You won't receive any more emails from HospitalitySupport.uk.</p>
    </body></html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

async function handleClick(sendId: string, redirectUrl: string): Promise<Response> {
  if (sendId) {
    const { data: send } = await supabase
      .from("email_sends")
      .select("id, contact_id, clicked_at, click_count")
      .eq("id", sendId)
      .maybeSingle();

    if (send) {
      const now = new Date().toISOString();
      await supabase
        .from("email_sends")
        .update({
          clicked_at: send.clicked_at ?? now,
          click_count: (send.click_count ?? 0) + 1,
        })
        .eq("id", sendId);

      await supabase.from("email_events").insert({
        send_id: sendId,
        contact_id: send.contact_id,
        resend_message_id: "",
        event_type: "clicked",
        url: redirectUrl,
        occurred_at: now,
      });
    }
  }

  return new Response(null, {
    status: 302,
    headers: { Location: redirectUrl || "https://hospitality.support/demo?book=1" },
  });
}

async function handleWebhook(req: Request): Promise<Response> {
  try {
    const payload = await req.json();
    // Resend webhook event shape: { type, data: { email_id, to, tags, ... } }
    const eventType: string = payload.type ?? "";
    const data = payload.data ?? {};
    const resendMessageId: string = data.email_id ?? "";

    // Find the send row by resend message id
    const { data: send } = await supabase
      .from("email_sends")
      .select("id, contact_id, opened_at, clicked_at, bounced_at")
      .eq("resend_message_id", resendMessageId)
      .maybeSingle();

    const now = new Date().toISOString();

    if (send) {
      if (eventType === "email.opened") {
        await supabase.from("email_sends").update({
          opened_at: send.opened_at ?? now,
          open_count: supabase.rpc ? undefined : undefined, // handled below
        }).eq("id", send.id);
        // increment open_count via raw update
        await supabase.rpc("increment_open_count", { send_id: send.id }).catch(() => null);
      } else if (eventType === "email.clicked") {
        await supabase.from("email_sends").update({
          clicked_at: send.clicked_at ?? now,
          click_count: (data.click_count ?? 1),
        }).eq("id", send.id);
      } else if (eventType === "email.bounced") {
        await supabase.from("email_sends").update({ bounced_at: now }).eq("id", send.id);
        await supabase.from("email_contacts").update({ status: "bounced", updated_at: now }).eq("id", send.contact_id);
      }

      await supabase.from("email_events").insert({
        send_id: send.id,
        contact_id: send.contact_id,
        resend_message_id: resendMessageId,
        event_type: eventType.replace("email.", ""),
        url: data.link?.url ?? null,
        raw: payload,
        occurred_at: now,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const pathname = url.pathname;

  if (pathname.endsWith("/pixel")) {
    return handlePixel(url.searchParams.get("sid") ?? "");
  }

  if (pathname.endsWith("/unsub")) {
    return handleUnsub(url.searchParams.get("cid") ?? "");
  }

  if (pathname.endsWith("/click")) {
    return handleClick(
      url.searchParams.get("sid") ?? "",
      url.searchParams.get("url") ?? "https://hospitality.support/demo?book=1"
    );
  }

  if (pathname.endsWith("/webhook") && req.method === "POST") {
    return handleWebhook(req);
  }

  return new Response("Not found", { status: 404 });
});
