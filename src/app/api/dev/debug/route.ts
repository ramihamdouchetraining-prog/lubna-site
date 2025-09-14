import { NextResponse } from 'next/server'
import { buildManifestUrl } from '@/lib/slides'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET() {
  const url = buildManifestUrl()
  const hasUrl = !!url
  const hasAnon = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const hasService = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  let manifestStatus: number | null = null
  if (url) {
    try { const r = await fetch(url, { method: 'HEAD', cache: 'no-store' }); manifestStatus = r.status } catch { manifestStatus = null }
  }
  return NextResponse.json({ ok: true, hasUrl, hasAnon, hasService, manifest: url ?? null, manifestStatus })
}
