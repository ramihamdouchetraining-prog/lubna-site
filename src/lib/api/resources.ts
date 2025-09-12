import { supabase } from '@/lib/supabase';

export type ResourceType = 'book'|'pamphlet'|'fatwa'|'pdf_free';
export type ResourceItem = {
  id: string;
  type: ResourceType;
  slug: string;
  lang: string;
  t?: { title?: string; excerpt?: string } | null;
  media?: { cover?: string | null; pdf?: string | null } | null;
};

export async function fetchResources(params: {
  locale: string;
  type?: ResourceType | 'all';
  topicSlug?: string;
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<ResourceItem[]> {
  const { locale, type, topicSlug, q, limit = 24, offset = 0 } = params;

  if (!supabase) return [];

  let query = supabase.from('resources').select('id,type,slug,lang,topic_id,status').eq('status','published');
  if (type && type !== 'all') query = query.eq('type', type);
  if (topicSlug) {
    const topic = await supabase.from('topics').select('id').eq('slug', topicSlug).maybeSingle();
    if (topic.data?.id) query = query.eq('topic_id', topic.data.id);
  }
  if (q) {
    // Recherche simple via translations (server-side full text dans SQL si dispo)
    const { data: tsearch } = await supabase
      .from('resource_translations')
      .select('resource_id')
      .ilike('title', `%${q}%`);
    const ids = tsearch?.map(r => r.resource_id) || [];
    if (ids.length) query = query.in('id', ids);
    else return [];
  }
  const { data: base } = await query.range(offset, offset + limit - 1);
  if (!base?.length) return [];

  const ids = base.map(b => b.id);
  const [{ data: t }, { data: m }] = await Promise.all([
    supabase.from('resource_translations').select('resource_id,title,excerpt,locale').in('resource_id', ids).eq('locale', locale),
    supabase.from('resource_media').select('resource_id,kind,storage_path').in('resource_id', ids)
  ]);

  return base.map(b => {
    const tt = t?.find(x => x.resource_id === b.id);
    const mediaFor = (kind: 'cover'|'pdf') => m?.find(x => x.resource_id === b.id && x.kind === kind)?.storage_path || null;
    return {
      id: b.id,
      type: b.type as ResourceType,
      slug: b.slug,
      lang: b.lang,
      t: { title: tt?.title, excerpt: tt?.excerpt },
      media: { cover: mediaFor('cover'), pdf: mediaFor('pdf') }
    };
  });
}
