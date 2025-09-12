import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: any = null;
if (URL && ANON) {
  supabase = createClient(URL, ANON, {
    auth: { persistSession: false },
    global: { headers: { 'x-client-info': 'lubna-site' } }
  });
} else {
  console.warn('[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export { supabase };

// Admin client (server-only) – used by /api/dev/seed
export function getAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || !URL) return null;
  return createClient(URL, serviceKey, { auth: { persistSession: false } });
}
