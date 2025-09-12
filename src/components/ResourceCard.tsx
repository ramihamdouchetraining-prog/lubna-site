import Image from 'next/image';

type Props = {
  title: string;
  excerpt?: string;
  type: 'book'|'pamphlet'|'fatwa'|'pdf_free';
  cover?: string | null;
  pdf?: string | null;
  dir?: 'ltr'|'rtl';
  labels: { read: string; download: string; details: string };
};

export function ResourceCard({ title, excerpt, type, cover, pdf, dir='ltr', labels }: Props) {
  const badge = { book: 'Book', pamphlet: 'Pamphlet', fatwa: 'Fatwa', pdf_free: 'PDF' }[type];
  return (
    <article className="rounded-lg border p-4 hover:shadow-md transition" dir={dir}>
      {cover && (
        <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
          <Image src={cover} alt={title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        </div>
      )}
      <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{badge}</span>
      <h3 className="mt-2 font-semibold">{title}</h3>
      {excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>}
      <div className="mt-3 flex gap-2">
        {pdf ? (
          <a href={pdf} target="_blank" rel="noopener" className="rounded-md border px-3 py-1 text-sm hover:bg-accent">
            {labels.download}
          </a>
        ) : (
          <button className="rounded-md border px-3 py-1 text-sm opacity-60 cursor-not-allowed" title="No file">
            {labels.details}
          </button>
        )}
      </div>
    </article>
  );
}
