import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Verify the caller is authenticated
    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user: caller } } = await callerClient.auth.getUser();
    if (!caller) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify admin role
    const { data: callerProfile } = await adminClient
      .from("user_profiles")
      .select("role")
      .eq("auth_user_id", caller.id)
      .maybeSingle();

    if (callerProfile?.role !== "admin") {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      email,
      display_name,
      role,
      phone,
      introduced_by_user_id,
      is_founder = false,
      login_code,
      password,
    } = body;

    if (!display_name?.trim()) {
      return new Response(JSON.stringify({ error: "display_name is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!login_code?.trim()) {
      return new Response(JSON.stringify({ error: "login_code is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const code = login_code.trim().toUpperCase();

    // Check login_code uniqueness
    const { data: existing } = await adminClient
      .from("user_profiles")
      .select("id")
      .eq("login_code", code)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ error: "Login code already in use" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine the auth email
    const hasRealEmail = !!email?.trim();
    const authEmail = hasRealEmail
      ? email.trim().toLowerCase()
      : `${code.toLowerCase()}@team.local`;

    let userId: string;

    if (hasRealEmail && !password) {
      // Invite mode: send email invite
      const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(
        authEmail,
      );
      if (inviteError) {
        return new Response(JSON.stringify({ error: inviteError.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      userId = inviteData.user.id;
    } else {
      // Manual mode (no email, or email + password): create user directly
      const tempPassword = password?.trim() || generateTempPassword();
      const { data: userData, error: userError } = await adminClient.auth.admin.createUser({
        email: authEmail,
        password: tempPassword,
        email_confirm: true,
      });
      if (userError) {
        return new Response(JSON.stringify({ error: userError.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      userId = userData.user.id;
    }

    // Create the profile
    const { error: profileError } = await adminClient.from("user_profiles").upsert({
      id: userId,
      auth_user_id: userId,
      display_name: display_name.trim(),
      role: role ?? "salesperson",
      phone: phone?.trim() || null,
      introduced_by_user_id: introduced_by_user_id || null,
      is_active: true,
      is_founder: !!is_founder,
      login_code: code,
      login_email: authEmail,
      email: hasRealEmail ? authEmail : null,
    });

    if (profileError) {
      return new Response(JSON.stringify({ error: profileError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, userId, login_code: code }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let pw = "";
  for (let i = 0; i < 12; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}
