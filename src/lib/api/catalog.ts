import { supabase } from '../supabaseClient';

export async function getProductsByCategory(locale: string, categorySlug: string) {
  const { data, error } = await supabase.rpc('get_products_localized', {
    p_locale: locale,
    p_category_slug: categorySlug
  });
  if (error) throw error;
  return data as Array<{
    id: string;
    slug?: string;
    name: string;
    subtitle?: string;
    price_cents: number;
    currency: string;
    main_image?: string; // si la vue/rpc la renvoie
    media?: Array<{ storage_path: string }>;
  }>;
}

