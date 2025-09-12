import {NextResponse} from 'next/server';
import {getAdminClient} from '@/lib/supabase';

// Protégé par deux verrous:
// 1) variable d'environnement SUPABASE_SERVICE_ROLE_KEY (côté serveur)
// 2) en-tête x-seed-token qui doit correspondre à process.env.SEED_TOKEN

export async function POST(req: Request) {
  const token = req.headers.get('x-seed-token');
  const must = process.env.SEED_TOKEN;
  if (!must || token !== must) {
    return NextResponse.json({ok: false, error: 'Forbidden'}, {status: 403});
  }
  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ok: false, error: 'Missing SUPABASE_SERVICE_ROLE_KEY'}, {status: 400});

  // Idempotent minimal seed (catégories, traductions, produits + media, ressources + media)
  try {
    // Catégories
    await admin.from('categories').upsert([{slug: 'sous-vetements'}, {slug: 'petite-fille'}], {onConflict: 'slug'});
    const {data: cats} = await admin.from('categories').select('id, slug');
    const idBySlug = Object.fromEntries((cats||[]).map((c:any) => [c.slug, c.id]));

    // Translations catégories (fr)
    await admin.from('category_translations').upsert([
      {category_id: idBySlug['sous-vetements'], locale: 'fr', name: 'Sous-vêtements'},
      {category_id: idBySlug['petite-fille'], locale: 'fr', name: 'Petite fille'}
    ], {onConflict: 'category_id,locale'});

    // Produits (trio fr/en/ar via traductions)
    const products = [
      {sku: 'LUBNA-UW-SET-001', category_slug: 'sous-vetements', price_cents: 3999, currency: 'EUR'},
      {sku: 'LUBNA-GIRL-DRESS-001', category_slug: 'petite-fille', price_cents: 2999, currency: 'EUR'}
    ];
    await admin.from('products').upsert(products.map(p => ({
      sku: p.sku,
      category_id: idBySlug[p.category_slug],
      price_cents: p.price_cents,
      currency: p.currency,
      status: 'active'
    })), {onConflict: 'sku'});

    const {data: prows} = await admin.from('products').select('id, sku');
    const pid = Object.fromEntries((prows||[]).map((r:any) => [r.sku, r.id]));

    await admin.from('product_translations').upsert([
      {product_id: pid['LUBNA-UW-SET-001'], locale: 'fr', name: 'Ensemble Confort Rose', subtitle: 'Respirant & doux'},
      {product_id: pid['LUBNA-UW-SET-001'], locale: 'en', name: 'Pink Comfort Set', subtitle: 'Breathable & soft'},
      {product_id: pid['LUBNA-UW-SET-001'], locale: 'ar', name: 'طقم وردي مريح', subtitle: 'قابل للتنفس وناعم'},
      {product_id: pid['LUBNA-GIRL-DRESS-001'], locale: 'fr', name: 'Robe fillette pastel', subtitle: 'Douce & légère'},
      {product_id: pid['LUBNA-GIRL-DRESS-001'], locale: 'en', name: 'Pastel Girl Dress', subtitle: 'Soft & light'},
      {product_id: pid['LUBNA-GIRL-DRESS-001'], locale: 'ar', name: 'فستان بناتي باستيل', subtitle: 'ناعم وخفيف'}
    ], {onConflict: 'product_id,locale'});

    // Media (une image de démo)
    await admin.from('product_media').upsert([
      {product_id: pid['LUBNA-UW-SET-001'], storage_path: 'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero1.png', alt: 'Ensemble rose', position: 0},
      {product_id: pid['LUBNA-GIRL-DRESS-001'], storage_path: 'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero7.png', alt: 'Robe pastel', position: 0}
    ], {onConflict: 'id'});

    // Ressources (min)
    const {data: topicRows} = await admin.from('topics').upsert([{slug: 'femmes-fiqh', name: 'Femmes & Fiqh'}], {onConflict: 'slug'}).select('id,slug');
    const topicId = topicRows?.[0]?.id;

    const {data: rbase} = await admin.from('resources').upsert([
      {slug: 'pour-toi-chere-soeur', type: 'pdf_free', lang: 'fr', status: 'published', topic_id: topicId}
    ], {onConflict: 'slug'}).select('id,slug');
    const rid = rbase?.[0]?.id;

    await admin.from('resource_translations').upsert([
      {resource_id: rid, locale: 'fr', title: 'Pour toi, chère sœur', excerpt: 'PDF gratuit dédié à la femme musulmane'}
    ], {onConflict: 'resource_id,locale'});

    await admin.from('resource_media').upsert([
      {resource_id: rid, storage_path: 'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/brand/logo_lubna.png', kind: 'cover', position: 0}
    ], {onConflict: 'id'});

    return NextResponse.json({ok: true});
  } catch (e: any) {
    return NextResponse.json({ok: false, error: e?.message || 'seed failed'}, {status: 500});
  }
}
