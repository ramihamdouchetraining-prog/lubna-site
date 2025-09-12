import { supabase } from '../supabaseClient';

export async function getResources(locale: string, type: string | null = null) {
  if(!supabase) return [];
  const { data, error } = await supabase.rpc('get_resources', {
    p_locale: locale,
    p_type: type
  });
  if (error) throw error;
  return data as Array<{
    id: string;
    type: 'book' | 'pamphlet' | 'fatwa' | 'pdf_free';
    title: string;
    excerpt?: string;
    cover?: string; // si la vue/rpc la renvoie
    files?: Array<{ storage_path: string; kind: string }>;
  }>;
}

