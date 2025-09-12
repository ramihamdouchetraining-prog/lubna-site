import Image from 'next/image';
import Link from 'next/link';

export function ProductCard({
  locale,
  sku,
  name,
  price_cents,
  currency,
  image
}: { locale: string; sku: string; name: string; price_cents: number; currency: string; image?: string | null }) {
  const price = (price_cents || 0) / 100;
  const href = `/${locale}/p/${sku}`;
  return (
    <Link href={href} className="group rounded-lg border p-4 hover:shadow-md transition">
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-md bg-muted">
        {image && <Image src={image} alt={name} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover group-hover:scale-105 transition" />}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="line-clamp-2 font-medium">{name}</h3>
        <span className="text-sm opacity-80">{price.toFixed(2)} {currency || 'EUR'}</span>
      </div>
    </Link>
  );
}
