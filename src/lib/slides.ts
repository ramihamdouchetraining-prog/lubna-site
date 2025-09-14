export type Slide = { src: string; label?: { fr?: string; en?: string; ar?: string } }
const FALLBACK: Slide[] = [
  { src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772', label: { fr: 'Élégance', en: 'Elegance', ar: 'أناقة' } },
  { src: 'https://images.unsplash.com/photo-1520975693416-35a7baa90b69', label: { fr: 'Confort',  en: 'Comfort',  ar: 'راحة' } },
  { src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', label: { fr: 'Création', en: 'Creation', ar: 'إبداع' } }
]
export function buildManifestUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, '')
  return base ? `${base}/storage/v1/object/public/assets-public/home-slides/manifest.json` : null
}
export async function loadSlides(): Promise<{ slides: Slide[]; from: 'manifest' | 'fallback' }> {
  const url = buildManifestUrl()
  if (!url) return { slides: FALLBACK, from: 'fallback' }
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const arr: Slide[] = Array.isArray(json) ? json : Array.isArray(json?.slides) ? json.slides : []
    if (!arr.length) throw new Error('empty manifest')
    return { slides: arr, from: 'manifest' }
  } catch {
    return { slides: FALLBACK, from: 'fallback' }
  }
}
