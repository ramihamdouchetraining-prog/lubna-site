import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token || token !== (process.env.SEED_TOKEN || 'dev-allow')) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  const admin = getAdminClient();
  if (!admin) return new NextResponse('Missing SUPABASE_SERVICE_ROLE_KEY', { status: 500 });

  // Idempotent minimal seed (catégories, produits, traductions, médias) – en ligne avec ton 003_seeds.sql
  // NB: on garde les slugs sans accents pour les routes.
  const { data: cats } = await admin.from('categories').upsert([
    { slug: 'sous-vetements' },
    { slug: 'petite-fille' },
    { slug: 'hijab' },
    { slug: 'abaya' }
  ]).select();

  const catId = (slug: string) => cats?.find(c => c.slug === slug)?.id;

  await admin.from('products').upsert([
    { sku: 'LUBNA-UW-SET-001', category_id: catId('sous-vetements'), price_cents: 3999, currency: 'EUR', status: 'active' },
    { sku: 'LUBNA-HIJAB-001', category_id: catId('hijab'), price_cents: 1999, currency: 'EUR', status: 'active' },
    { sku: 'LUBNA-ABAYA-001', category_id: catId('abaya'), price_cents: 6499, currency: 'EUR', status: 'active' }
  ]);

  const prods = await admin.from('products').select('id,sku');
  const idOf = (sku: string) => prods.data?.find(p => p.sku === sku)?.id;

  await admin.from('product_translations').upsert([
    { product_id: idOf('LUBNA-UW-SET-001'), locale: 'fr', name: 'Ensemble Confort Rose', subtitle: 'Respirant & doux', description: 'Parfait au quotidien' },
    { product_id: idOf('LUBNA-UW-SET-001'), locale: 'en', name: 'Pink Comfort Set', subtitle: 'Breathable & soft', description: 'Perfect for daily wear' },
    { product_id: idOf('LUBNA-UW-SET-001'), locale: 'ar', name: 'طقم وردي مريح', subtitle: 'قابل للتنفس وناعم', description: 'مثالي للاستخدام اليومي' },

    { product_id: idOf('LUBNA-HIJAB-001'), locale: 'fr', name: 'Hijab soyeux', subtitle: 'Toucher premium', description: 'Palette féminine' },
    { product_id: idOf('LUBNA-HIJAB-001'), locale: 'en', name: 'Silky Hijab', subtitle: 'Premium handfeel', description: 'Feminine palette' },
    { product_id: idOf('LUBNA-HIJAB-001'), locale: 'ar', name: 'حجاب حريري', subtitle: 'ملمس فخم', description: 'ألوان أنثوية' },

    { product_id: idOf('LUBNA-ABAYA-001'), locale: 'fr', name: 'Abaya satinée', subtitle: 'Chic & pudique', description: 'Finition soignée' },
    { product_id: idOf('LUBNA-ABAYA-001'), locale: 'en', name: 'Satin Abaya', subtitle: 'Chic & modest', description: 'Fine finishing' },
    { product_id: idOf('LUBNA-ABAYA-001'), locale: 'ar', name: 'عباية ساتان', subtitle: 'أنيقة ومحتشمة', description: 'تشطيبات متقنة' }
  ], { onConflict: 'product_id,locale' });

  // Comptes de sortie
  const [pcount, rcount] = await Promise.all([
    admin.from('products').select('*', { count: 'exact', head: true }),
    admin.from('resources').select('*', { count: 'exact', head: true })
  ]);

  return NextResponse.json({ ok: true, counts: { products: pcount.count || 0, resources: rcount.count || 0 } });
}
