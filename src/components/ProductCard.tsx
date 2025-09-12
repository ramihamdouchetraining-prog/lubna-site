import Image from 'next/image';

export function ProductCard({p}:{p:{sku:string; name:string; subtitle?:string|null; price_cents:number; currency:string; media?:{storage_path:string;alt:string|null}[]}}){
  const img = p.media?.[0]?.storage_path;
  const price = new Intl.NumberFormat(undefined, {style:'currency', currency:p.currency||'EUR'}).format((p.price_cents||0)/100);
  return (
    <div className="rounded-xl border p-3 hover:shadow-md transition">
      {img && (
        <div className="aspect-[4/3] relative mb-3 overflow-hidden rounded-lg">
          <Image src={img} alt={p.media?.[0]?.alt || p.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
        </div>
      )}
      <div className="text-sm font-medium line-clamp-2">{p.name}</div>
      {p.subtitle && <div className="text-xs text-muted-foreground line-clamp-2">{p.subtitle}</div>}
      <div className="mt-2 text-sm font-semibold">{price}</div>
    </div>
  );
}
