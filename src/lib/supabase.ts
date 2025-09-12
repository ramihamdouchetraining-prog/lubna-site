import {createClient} from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Garde-fou non bloquant: log si l'URL n'est pas du domaine Supabase
if (url && !/\.supabase\.co\/?$|\.supabase\.co\//.test(url)) {
  console.warn('[Supabase] NEXT_PUBLIC_SUPABASE_URL semble invalide:', url);
}

export const supabase = createClient(url, anon, {
  auth: {persistSession: false},
  global: {headers: {'x-client-info': 'lubna-site'}}
});

// Client admin (utilisé UNIQUEMENT côté serveur si la clé service est fournie via secret env)
export function getAdminClient() {
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!service) return null;
  return createClient(url, service, {auth: {persistSession: false}});
}
