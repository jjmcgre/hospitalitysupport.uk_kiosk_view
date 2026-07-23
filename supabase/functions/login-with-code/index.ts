import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface Profile {
  id: string;
  display_name: string;
  login_code: string;
  login_email: string | null;
  email: string | null;
  auth_user_id: string | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return json({ error: "Login code is required" }, 400);
    }

    const trimmed = code.trim();
    if (!trimmed) {
      return json({ error: "Login code is required" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Case-insensitive lookup
    const { data: profile, error: lookupErr } = await admin
      .from("user_profiles")
      .select("id, display_name, login_code, login_email, email, auth_user_id")
      .ilike("login_code", trimmed)
      .maybeSingle() as { data: Profile | null; error: Error | null };

    if (lookupErr) {
      return json({ error: "Lookup failed" }, 500);
    }

    if (!profile) {
      return json({ error: "Login code not found. Check with your admin." }, 404);
    }

    // Determine the email to use for auth
    let authEmail = profile.login_email || profile.email;
    if (!authEmail) {
      // Generate a stable internal email from the profile id
      authEmail = `${profile.id}@login.servicesupportgroup.uk`;
    }

    // Use a fixed internal password so short login codes don't fail Supabase's 6-char minimum
    const password = "SSG-L0gin!" + profile.id.slice(0, 8);

    if (profile.auth_user_id) {
      // Auth account exists — ensure password matches
      const { error: pwErr } = await admin.auth.admin.updateUserById(
        profile.auth_user_id,
        { password },
      );
      if (pwErr) {
        return json({ error: `Could not update credentials: ${pwErr.message}` }, 500);
      }
    } else {
      // No auth account — create one
      const { data: newUser, error: createErr } = await admin.auth.admin.createUser({
        email: authEmail,
        password,
        email_confirm: true,
      });

      if (createErr) {
        // If user already exists with that email, try to look them up
        if (createErr.message.includes("already been registered") || createErr.message.includes("already exists")) {
          const { data: existingUsers } = await admin.auth.admin.listUsers();
          const existing = existingUsers?.users?.find((u) => u.email === authEmail);
          if (existing) {
            // Link existing user and update password
            await admin.auth.admin.updateUserById(existing.id, { password });
            await admin.from("user_profiles")
              .update({ auth_user_id: existing.id, login_email: authEmail })
              .eq("id", profile.id);
            return json({ email: authEmail, password }, 200);
          }
        }
        return json({ error: "Could not create account" }, 500);
      }

      // Link the new auth user to the profile
      const { error: linkErr } = await admin.from("user_profiles")
        .update({ auth_user_id: newUser.user.id, login_email: authEmail })
        .eq("id", profile.id);

      if (linkErr) {
        return json({ error: "Could not link profile" }, 500);
      }
    }

    return json({ email: authEmail, password }, 200);
  } catch (err) {
    return json({ error: "Unexpected error" }, 500);
  }

  function json(body: object, status: number) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
