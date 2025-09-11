import Image from 'next/image';
import { getProductsByCategory } from '@/lib/api/catalog';

export default async function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'fr';
  const items = await getProductsByCategory(locale, 'sous-vetements');
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Sous-vêtements</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((p) => {
          const img =
            p.main_image ??
            p.media?.[0]?.storage_path ??
            'https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/hero1.png';
          return (
            <div key={p.id} className="rounded-xl border p-3">
              <div className="relative aspect-[4/5] mb-3 overflow-hidden rounded-lg">
                <Image src={img} alt={p.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className="text-sm font-medium line-clamp-2">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.subtitle}</div>
              <div className="mt-1 font-semibold">
                {(p.price_cents / 100).toFixed(2)} {p.currency}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

