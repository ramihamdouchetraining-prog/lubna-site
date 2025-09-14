import Image from 'next/image'
import { loadSlides } from '@/lib/slides'
import { getLocale } from 'next-intl/server'

export default async function HeroSlides() {
  const locale = await getLocale()
  const { slides } = await loadSlides()
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 gap-4">
        {slides.map((s, i) => (
          <div key={i} className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image src={s.src} alt={s.label?.[locale] ?? ''} fill priority sizes="100vw" className="object-cover" />
            {s.label?.[locale] && (
              <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-lg">
                <span className="inline-block bg-black/40 px-3 py-1.5 rounded-md text-sm">{s.label[locale]}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
