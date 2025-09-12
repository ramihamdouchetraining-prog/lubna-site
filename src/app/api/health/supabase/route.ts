import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const urlOk = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonOk = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Compter quelques vues publiques (policies déjà en SELECT public)
  const [{ count: productsCount }, { count: resourcesCount }] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('resources').select('*', { count: 'exact', head: true })
  ]);

  return NextResponse.json({
    env: { urlOk, anonOk, serviceRoleDefined: !!process.env.SUPABASE_SERVICE_ROLE_KEY },
    counts: {
      products: productsCount ?? 0,
      resources: resourcesCount ?? 0
    }
  });
}
