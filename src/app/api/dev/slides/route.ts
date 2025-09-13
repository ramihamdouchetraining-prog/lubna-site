export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { loadSlides } from '@/lib/slides';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }
  try {
    const data = await loadSlides();
    return NextResponse.json({ ok: true, count: data.length, slides: data, host: process.env.NEXT_PUBLIC_SUPABASE_URL || null });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e?.message || String(e) }, { status: 500 });
  }
}
