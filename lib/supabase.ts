import { createClient } from "@supabase/supabase-js";

/**
 * Cleans up whatever was pasted into SUPABASE_URL so it always becomes
 * the correct form: https://<project-ref>.supabase.co
 * Handles: dashboard links, trailing slashes/paths, stray spaces, missing https.
 */
function normalizeSupabaseUrl(raw: string): string {
  let v = raw.trim().replace(/\s+/g, "");

  // Dashboard link pasted? e.g. https://supabase.com/dashboard/project/abcd1234
  const dash = v.match(/supabase\.com\/dashboard\/project\/([a-zA-Z0-9-]+)/);
  if (dash) return `https://${dash[1]}.supabase.co`;

  if (!/^https?:\/\//i.test(v)) v = `https://${v}`;

  // Strip anything after the host (paths, query strings, trailing slash)
  try {
    const u = new URL(v);
    return `https://${u.host}`;
  } catch {
    return v;
  }
}

/**
 * Server-only Supabase client using the service role key.
 * Never import this in a client component — the key must stay on the server.
 */
export function getSupabase() {
  const rawUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!rawUrl || !key) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel → Settings → Environment Variables."
    );
  }
  return createClient(normalizeSupabaseUrl(rawUrl), key, {
    auth: { persistSession: false },
  });
}
