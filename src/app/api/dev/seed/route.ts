import {NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const token = req.headers.get('x-seed-token');
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ ok: false, error: 'Missing SUPABASE env (URL or SERVICE_ROLE_KEY)' }, { status: 400 });
  }
  if (!process.env.SEED_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Missing SEED_TOKEN' }, { status: 400 });
  }
  if (token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Unauthorized seed token' }, { status: 401 });
  }

  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const now = new Date().toISOString();
  const up = async (table: string, rows: any[], conflict?: string) => {
    const { error } = await admin.from(table).upsert(rows, { onConflict: conflict });
    if (error) throw new Error(`${table}: ${error.message}`);
  };

  try {
    await up('locales', [
      { code: 'fr', name: 'Français', dir: 'ltr' },
      { code: 'en', name: 'English', dir: 'ltr' },
      { code: 'ar', name: 'العربية', dir: 'rtl' }
    ], 'code');

    await up('categories', [{ slug: 'sous-vetements', created_at: now, updated_at: now }], 'slug');
    const { data: cat } = await admin.from('categories').select('id').eq('slug','sous-vetements').maybeSingle();
    if (!cat?.id) throw new Error('Category sous-vetements not created');

    await up('category_translations', [
      { category_id: cat.id, locale: 'fr', name: 'Sous-vêtements', description: 'Confort & pudeur' },
      { category_id: cat.id, locale: 'en', name: 'Underwear', description: 'Comfort & modesty' },
      { category_id: cat.id, locale: 'ar', name: 'الملابس الداخلية', description: 'راحة وحشمة' }
    ], 'category_id,locale');

    await up('products', [{ sku: 'LUBNA-UW-SET-001', category_id: cat.id, price_cents: 3999, currency: 'EUR', status: 'active', created_at: now, updated_at: now }], 'sku');
    const { data: prod } = await admin.from('products').select('id').eq('sku','LUBNA-UW-SET-001').maybeSingle();
    if (!prod?.id) throw new Error('Product not created');

    await up('product_translations', [
      { product_id: prod.id, locale: 'fr', name: 'Ensemble Confort Rose', subtitle: 'Respirant & doux', description: 'Parfait au quotidien' },
      { product_id: prod.id, locale: 'en', name: 'Pink Comfort Set', subtitle: 'Breathable & soft', description: 'Perfect for daily wear' },
      { product_id: prod.id, locale: 'ar', name: 'طقم وردي مريح', subtitle: 'قابل للتنفس وناعم', description: 'مثالي للاستخدام اليومي' }
    ], 'product_id,locale');

    await up('product_media', [
      { product_id: prod.id, variant_id: null, storage_path: 'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero1.png', alt: 'Ensemble rose', position: 0 }
    ]);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
