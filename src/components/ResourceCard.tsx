import Image from 'next/image';

export function ResourceCard({r}:{r:{slug:string; title:string; excerpt?:string|null; cover_url?:string|null; pdf_url?:string|null}}){
  return (
    <div className="rounded-xl border p-3 hover:shadow-md transition">
      {r.cover_url && (
        <div className="aspect-[3/4] relative mb-3 overflow-hidden rounded-lg">
          <Image src={r.cover_url} alt={r.title} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover" />
        </div>
      )}
      <div className="text-sm font-medium line-clamp-2">{r.title}</div>
      {r.excerpt && <div className="text-xs text-muted-foreground line-clamp-3 mt-1">{r.excerpt}</div>}
      {r.pdf_url && (
        <a href={r.pdf_url} className="mt-2 inline-block text-xs underline" target="_blank" rel="noreferrer">PDF</a>
      )}
    </div>
  );
}
