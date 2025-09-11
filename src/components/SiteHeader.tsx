'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type NavItem = { path: string; title: string };

export default function SiteHeader({ nav, locale }:{ nav: NavItem[]; locale: string }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname?.startsWith(path);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="https://epefjqrxjbpcasygwywh.supabase.co/storage/v1/object/public/assets-public/logo_lubna.png"
            alt="Lubna"
            width={28}
            height={28}
            priority
          />
          <span className="font-semibold">Lubna</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {nav.map((n) => (
            <Link
              key={n.path}
              href={`/${locale}${n.path === '/' ? '' : n.path}`}
              className={`text-sm hover:underline ${isActive(n.path) ? 'font-semibold' : ''}`}
            >
              {n.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

