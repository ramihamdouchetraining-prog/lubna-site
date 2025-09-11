import { supabase } from '../supabaseClient';

export async function getNavigation(locale: string) {
  const { data, error } = await supabase.rpc('get_navigation', { p_locale: locale });
  if (error) throw error;
  return data as Array<{ path: string; title: string }>;
}

