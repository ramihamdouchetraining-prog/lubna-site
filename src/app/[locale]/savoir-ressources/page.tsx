import Image from 'next/image';
import { getResources } from '@/lib/api/resources';

export default async function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'fr';
  const data = await getResources(locale, null);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Savoir & Ressources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((r) => {
          const cover =
            r.cover ??
            r.files?.find((f) => f.kind === 'cover')?.storage_path ??
            'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero9.png';
          return (
            <div key={r.id} className="rounded-xl border p-3">
              <div className="relative aspect-[3/2] mb-3 overflow-hidden rounded-lg">
                <Image src={cover} alt={r.title} fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover" />
              </div>
              <div className="text-sm font-medium line-clamp-2">{r.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{r.excerpt}</div>
              <div className="mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
                {r.type}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

