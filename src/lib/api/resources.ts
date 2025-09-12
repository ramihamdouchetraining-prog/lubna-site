import 'server-only';
import {supabase} from '@/lib/supabase';

export type ResourceRow = {
  id: string;
  slug: string;
  type: 'book'|'pamphlet'|'fatwa'|'pdf_free';
  title: string;
  excerpt: string | null;
  cover_url: string | null;
  pdf_url: string | null;
};

export async function getResources(locale: 'fr'|'en'|'ar') {
  const {data, error} = await supabase.rpc('get_resources', {p_locale: locale});
  if (!error && Array.isArray(data)) return data as ResourceRow[];
  // Fallback simple: joindre tables via select
  const {data: rows, error: fbErr} = await supabase
    .from('resources')
    .select(`id, slug, type, resource_translations(title,excerpt), resource_media(storage_path, kind, position)`) as any;
  if (fbErr) throw fbErr;
  return (rows ?? []).map((r: any) => ({
    id: r.id,
    slug: r.slug,
    type: r.type,
    title: r.resource_translations?.find((t: any) => t.locale === locale)?.title ?? '',
    excerpt: r.resource_translations?.find((t: any) => t.locale === locale)?.excerpt ?? null,
    cover_url: r.resource_media?.find((m: any) => m.kind === 'cover')?.storage_path ?? null,
    pdf_url: r.resource_media?.find((m: any) => m.kind === 'pdf')?.storage_path ?? null
  })) as ResourceRow[];
}
