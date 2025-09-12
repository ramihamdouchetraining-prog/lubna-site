import {createClient} from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const service = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const hasEnv = { url: !!url, anon: !!anon, service: !!service };

export const supabase = (hasEnv.url && hasEnv.anon)
  ? createClient(url, anon, { auth: { persistSession: false } })
  : null;

export const supabaseAdmin = (hasEnv.url && hasEnv.service)
  ? createClient(url, service, { auth: { persistSession: false } })
  : null;

