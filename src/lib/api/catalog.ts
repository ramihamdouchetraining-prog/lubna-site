import { supabase } from '@/lib/supabase';

export type LocalizedProduct = {
  id: string;
  price_cents: number;
  media?: { src?: string; alt?: string } | null;
  t?: { name?: string; subtitle?: string } | null;
};

export async function fetchProductsByCategorySlug(slug: string, locale: string): Promise<LocalizedProduct[]> {
  // 1) find category
  const { data: cat } = await supabase.from('categories').select('id').eq('slug', slug).maybeSingle();
  if (!cat?.id) return [];

  // 2) products
  const { data: products } = await supabase
    .from('products')
    .select('id,price_cents')
    .eq('category_id', cat.id)
    .eq('status', 'active');

  if (!products?.length) return [];

  // 3) join translations + first media
  const ids = products.map(p => p.id);
  const [{ data: t }, { data: m }] = await Promise.all([
    supabase.from('product_translations').select('product_id,name,subtitle').in('product_id', ids).eq('locale', locale),
    supabase.from('product_media').select('product_id,storage_path,alt,position').in('product_id', ids).order('position', { ascending: true })
  ]);

  return products.map(p => {
    const tt = t?.find(x => x.product_id === p.id);
    const mm = m?.find(x => x.product_id === p.id);
    return {
      id: p.id,
      price_cents: p.price_cents,
      t: { name: tt?.name, subtitle: tt?.subtitle },
      media: mm ? { src: mm.storage_path, alt: mm.alt || tt?.name } : null
    };
  });
}
