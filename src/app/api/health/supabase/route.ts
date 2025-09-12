import {NextResponse} from 'next/server';
import {supabase, hasEnv} from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET() {
  const env = { url: hasEnv.url, anon: hasEnv.anon, service: hasEnv.service };
  if (!supabase) {
    return NextResponse.json({ configured: false, env, error: 'Missing NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY' }, { status: 200 });
  }

  const results: Record<string, any> = {};
  const tryQuery = async (label: string, q: () => PromiseLike<any>) => {
    try {
      const { data, error } = await q();
      if (error) results[label] = { error: error.message };
      else results[label] = { count: Array.isArray(data) ? data.length : (data?.length ?? null) };
    } catch (e: any) {
      results[label] = { error: String(e?.message || e) };
    }
  };

  await tryQuery('products_active', () => supabase!.from('products').select('id').eq('status','active'));
  await tryQuery('product_translations', () => supabase!.from('product_translations').select('id'));
  await tryQuery('resources_published', () => supabase!.from('resources').select('id').eq('status','published'));

  return NextResponse.json({ configured: true, env, results }, { status: 200 });
}
