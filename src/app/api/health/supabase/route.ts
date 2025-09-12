import {NextResponse} from 'next/server';
import {supabase} from '@/lib/supabase';

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const anonSet = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const urlLooksOk = /\.supabase\.co/.test(url);

    // On essaie les vues publiques (si seed effectué comme prévu)
    const [prodCount, resCount] = await Promise.all([
      supabase.from('v_products_public' as any).select('*', {count: 'exact', head: true}),
      supabase.from('resource_translations' as any).select('*', {count: 'exact', head: true})
    ]);

    const out = {
      ok: true,
      env: {
        NEXT_PUBLIC_SUPABASE_URL: url,
        anonKeyPresent: anonSet,
        urlLooksOk
      },
      counts: {
        productsPublic: prodCount.count ?? 0,
        resourcesTranslations: resCount.count ?? 0
      },
      errors: {
        products: prodCount.error?.message || null,
        resources: resCount.error?.message || null
      }
    } as const;

    return NextResponse.json(out, {status: 200});
  } catch (e: any) {
    return NextResponse.json({ok: false, error: e?.message || 'unknown'}, {status: 500});
  }
}
