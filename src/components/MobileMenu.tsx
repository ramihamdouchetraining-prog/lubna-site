"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function MobileMenu({ locale, labels }: { locale: string; labels: {home:string; underwear:string; girls:string; knowledge:string} }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { const b = document.body; open ? b.classList.add('overflow-hidden') : b.classList.remove('overflow-hidden'); }, [open]);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <div className="sm:hidden" dir={dir}>
      <button aria-label="Menu" className="rounded-md border px-3 py-2" onClick={() => setOpen(true)}>☰</button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <nav className="absolute top-0 h-full w-72 bg-background p-4 shadow-2xl" style={dir==='rtl'?{right:0}:{left:0}} onClick={e=>e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button className="rounded-md border px-2 py-1" onClick={() => setOpen(false)}>✕</button>
            </div>
            <ul className="space-y-3 text-sm">
              <li><Link href={`/${locale}`} onClick={()=>setOpen(false)}>{labels.home}</Link></li>
              <li><Link href={`/${locale}/boutique/sous-vetements`} onClick={()=>setOpen(false)}>{labels.underwear}</Link></li>
              <li><Link href={`/${locale}/boutique/petite-fille`} onClick={()=>setOpen(false)}>{labels.girls}</Link></li>
              <li><Link href={`/${locale}/savoir-ressources`} onClick={()=>setOpen(false)}>{labels.knowledge}</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
