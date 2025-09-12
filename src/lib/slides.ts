export type Slide = { src: string; alt?: string; href?: string };

const FALLBACK: Slide[] = [
  { src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', alt: 'Fallback 1' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552', alt: 'Fallback 2' },
  { src: 'https://images.unsplash.com/photo-1503342394121-4808b6e54cde', alt: 'Fallback 3' }
];

export async function loadSlides(): Promise<Slide[]> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return FALLBACK;
  const host = base.replace(/^https?:\/\//,'').replace(/\/+$/, '');
  const url = `https://${host}/storage/v1/object/public/assets-public/home-slides/manifest.json`;
  try {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return FALLBACK;
    const j = await r.json();
    if (Array.isArray(j?.slides)) return j.slides as Slide[];
  } catch {}
  return FALLBACK;
}
