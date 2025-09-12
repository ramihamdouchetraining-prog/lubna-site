import Image from 'next/image';

type Slide = { src: string; alt: string };
export default function Carousel({slides}:{slides: Slide[]}){
  if(!slides?.length) return null;
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2" aria-label="Carousel">
        {slides.map((s,i)=> (
          <div key={i} className="snap-center shrink-0 w-[88vw] sm:w-[520px] md:w-[680px] lg:w-[920px]">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border animate-gentle-bounce">
              <Image src={s.src} alt={s.alt} fill priority className="object-cover"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
