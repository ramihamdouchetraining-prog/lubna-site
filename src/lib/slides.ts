export type Slide = { src: string; alt?: string; href?: string; label?: string };

const FALLBACK: Slide[] = [
  { src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', alt: 'Fallback 1', label: 'Lubna' },
  { src: 'https://images.unsplash.com/photo-1503342217505-b0a15cf70489', alt: 'Fallback 2', label: 'Modest wear' },
  { src: 'https://images.unsplash.com/photo-1520975922238-08e9cdbf3a59', alt: 'Fallback 3', label: 'Everyday comfort' }
];

export async function loadSlides(): Promise<Slide[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return FALLBACK;
  const manifestUrl = `${url}/storage/v1/object/public/assets-public/home-slides/manifest.json`;
  try {
    const res = await fetch(manifestUrl, { cache: 'no-store' });
    if (!res.ok) return FALLBACK;
    const json = await res.json();
    return Array.isArray(json) && json.length ? json : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
