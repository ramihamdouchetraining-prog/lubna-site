import 'server-only';
import {supabase} from '@/lib/supabase';

export type ProductMedia = {storage_path: string; alt: string | null; position: number};
export type ProductRow = {
  id: string;
  sku: string;
  price_cents: number;
  currency: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  media: ProductMedia[];
};

export async function getProductsLocalized(locale: 'fr'|'en'|'ar', opts?: {category_slug?: string}) {
  // Essaye d'abord l'RPC get_products_localized(locale, category_slug)
  const {data, error} = await supabase.rpc('get_products_localized', {
    p_locale: locale,
    p_category_slug: opts?.category_slug ?? null
  });
  if (!error && Array.isArray(data)) {
    return data as ProductRow[];
  }
  // Fallback: vue publique v_products_public filtrée par catégorie
  const q = supabase
    .from('v_products_public' as any)
    .select('*')
    .eq('locale', locale)
    .order('created_at', {ascending: false});
  if (opts?.category_slug) (q as any).eq('category_slug', opts.category_slug);
  const fb = await q;
  if (fb.error) throw fb.error;
  return (fb.data ?? []) as ProductRow[];
}
