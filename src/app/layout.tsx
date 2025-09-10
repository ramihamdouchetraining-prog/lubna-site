import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Lubna",
  description: "Boutique féminine & sur-mesure",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
