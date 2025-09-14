import { NextResponse } from 'next/server'
import { loadSlides } from '@/lib/slides'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const { slides, from } = await loadSlides()
    return NextResponse.json({ ok: true, count: slides.length, from, slides })
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 })
  }
}
