import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

interface SequenceEmail {
  emailId: number;
  stage: number;
  subject: string;
  body: string;
  cta: string;
}

function nextSendDate(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 3);
  d.setUTCHours(8, 0, 0, 0);
  return d.toISOString();
}

async function sendEmail(params: {
  contactId: string;
  campaignId: string;
  emailId: number;
  stage: number;
  subject: string;
  body: string;
  cta: string;
  siteUrl: string;
}) {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/send-campaign-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify(params),
  });
  if (!resp.ok) return null;
  return await resp.json();
}

// ── /enroll ────────────────────────────────────────────────────────────────────
// Body: { contactId, campaignId, sequence: SequenceEmail[], siteUrl? }
async function handleEnroll(
  supabase: ReturnType<typeof createClient>,
  body: { contactId: string; campaignId: string; sequence: SequenceEmail[]; siteUrl?: string },
) {
  const { contactId, campaignId, sequence, siteUrl = "https://servicesupport.uk" } = body;
  if (!sequence?.length) return { error: "Empty sequence" };

  const [first, ...rest] = sequence;

  const result = await sendEmail({ ...first, contactId, campaignId, siteUrl });
  if (!result?.ok) return { error: result?.error ?? "Failed to send first email" };

  const nextEmail = rest[0] ?? null;

  await supabase.from("email_contacts").update({
    automation_active: true,
    automation_campaign_id: campaignId,
    automation_sequence: rest,
    automation_next_email_id: nextEmail?.emailId ?? null,
    automation_next_send_at: nextEmail ? nextSendDate() : null,
    automation_paused: false,
    automation_started_at: new Date().toISOString(),
  }).eq("id", contactId);

  return { ok: true };
}

// ── /unenroll ──────────────────────────────────────────────────────────────────
async function handleUnenroll(
  supabase: ReturnType<typeof createClient>,
  body: { contactId: string },
) {
  await supabase.from("email_contacts").update({
    automation_active: false,
    automation_campaign_id: null,
    automation_sequence: null,
    automation_next_email_id: null,
    automation_next_send_at: null,
    automation_paused: false,
  }).eq("id", body.contactId);
  return { ok: true };
}

// ── /tick — advance all due sequences (call from a cron or manually) ───────────
async function handleTick(
  supabase: ReturnType<typeof createClient>,
  body: { siteUrl?: string },
) {
  const siteUrl = body.siteUrl ?? "https://servicesupport.uk";
  const now = new Date().toISOString();

  const { data: due } = await supabase
    .from("email_contacts")
    .select("id, automation_campaign_id, automation_sequence, automation_next_email_id, automation_next_send_at")
    .eq("automation_active", true)
    .eq("automation_paused", false)
    .lte("automation_next_send_at", now)
    .not("automation_next_email_id", "is", null);

  if (!due?.length) return { ok: true, sent: 0 };

  let sent = 0;
  for (const contact of due) {
    const sequence: SequenceEmail[] = contact.automation_sequence ?? [];
    const nextEmail = sequence.find((e: SequenceEmail) => e.emailId === contact.automation_next_email_id);
    if (!nextEmail) {
      await supabase.from("email_contacts").update({ automation_active: false }).eq("id", contact.id);
      continue;
    }

    const result = await sendEmail({
      ...nextEmail,
      contactId: contact.id,
      campaignId: contact.automation_campaign_id,
      siteUrl,
    });
    if (!result?.ok) continue;
    sent++;

    // Remaining emails after the one we just sent
    const remaining = sequence.slice(sequence.indexOf(nextEmail) + 1);
    const nextInLine = remaining[0] ?? null;

    await supabase.from("email_contacts").update({
      automation_sequence: remaining,
      automation_next_email_id: nextInLine?.emailId ?? null,
      automation_next_send_at: nextInLine ? nextSendDate() : null,
      automation_active: nextInLine !== null,
    }).eq("id", contact.id);
  }

  return { ok: true, sent };
}

// ── Router ─────────────────────────────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  const url = new URL(req.url);
  const action = url.pathname.split("/").pop(); // enroll | unenroll | tick

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const body = req.method === "POST" ? await req.json() : {};

    let result: Record<string, unknown>;
    if (action === "enroll") result = await handleEnroll(supabase, body);
    else if (action === "unenroll") result = await handleUnenroll(supabase, body);
    else if (action === "tick") result = await handleTick(supabase, body);
    else result = { error: "Unknown action" };

    return new Response(JSON.stringify(result), {
      status: result.error ? 400 : 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
