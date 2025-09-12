import './globals.css';
import type {ReactNode} from 'react';

// IMPORTANT : Layout root minimal. Le layout localisé est dans app/[locale]/layout.tsx
export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
