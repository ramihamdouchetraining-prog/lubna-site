import Image from 'next/image';

type Props = {
  name: string;
  subtitle?: string;
  price_cents: number;
  media?: { src?: string; alt?: string };
  dir?: 'ltr' | 'rtl';
};

export function ProductCard({ name, subtitle, price_cents, media, dir = 'ltr' }: Props) {
  const price = (price_cents / 100).toFixed(2) + ' €';
  return (
    <article className="rounded-lg border p-4 hover:shadow-md transition" dir={dir}>
      {media?.src && (
        <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
          <Image src={media.src} alt={media.alt || name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        </div>
      )}
      <h3 className="font-semibold">{name}</h3>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <p className="mt-2 font-medium">{price}</p>
    </article>
  );
}
