import { supabase } from '@/lib/supabase';

export async function getProductsLocalized(locale: string, categorySlug?: string) {
  if (!supabase) return [] as any;
  let query = supabase.from('products').select('id,sku,price_cents,currency,status');
  if (categorySlug) {
    const { data: cat } = await supabase.from('categories').select('id').eq('slug', categorySlug).maybeSingle();
    if (!cat?.id) return [];
    query = query.eq('category_id', cat.id);
  }
  query = query.eq('status', 'active');
  const { data: prods } = await query;
  if (!prods?.length) return [];
  const ids = prods.map(p => p.id);
  const [{ data: t }, { data: m }] = await Promise.all([
    supabase.from('product_translations').select('product_id,name,subtitle').in('product_id', ids).eq('locale', locale),
    supabase.from('product_media').select('product_id,storage_path,alt,position').in('product_id', ids).order('position', { ascending: true })
  ]);
  return prods.map(p => {
    const tt = t?.find(x => x.product_id === p.id);
    const mm = m?.find(x => x.product_id === p.id);
    return {
      id: p.id,
      sku: p.sku,
      price_cents: p.price_cents,
      currency: p.currency || 'EUR',
      t: { name: tt?.name, subtitle: tt?.subtitle },
      media: { cover: mm?.storage_path || null }
    };
  });
}

export async function fetchProductBySku(locale: string, sku: string) {
  if (!supabase) return null as any;
  const { data: prod } = await supabase
    .from('products')
    .select('id,sku,price_cents,currency,status')
    .eq('sku', sku)
    .eq('status', 'active')
    .maybeSingle();
  if (!prod?.id) return null;
  const [{ data: t }, { data: media }, { data: variants }] = await Promise.all([
    supabase
      .from('product_translations')
      .select('name,subtitle,description')
      .eq('product_id', prod.id)
      .eq('locale', locale)
      .maybeSingle(),
    supabase
      .from('product_media')
      .select('storage_path,alt,position')
      .eq('product_id', prod.id)
      .order('position', { ascending: true }),
    supabase.from('product_variants').select('sku,price_cents,options').eq('product_id', prod.id)
  ]);
  return {
    id: prod.id,
    sku: prod.sku,
    price_cents: prod.price_cents,
    currency: prod.currency || 'EUR',
    t: t || { name: sku },
    images: media || [],
    variants: variants || []
  };
}

export async function fetchProductSkus(): Promise<string[]> {
  if (!supabase) return [];
  const { data } = await supabase.from('products').select('sku,status').eq('status', 'active');
  return (data || []).map(x => x.sku);
}
