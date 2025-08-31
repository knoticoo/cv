import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Latvian CV Maker - Profesionāls CV veidotājs",
  description: "Izveidojiet profesionālu CV latviešu, krievu un angļu valodās. Europass saderīgs CV veidotājs Latvijas darba tirgum.",
  keywords: ["CV", "resume", "Latvia", "Europass", "darba piedāvājumi", "карьера"],
  authors: [{ name: "Latvian CV Maker" }],
  openGraph: {
    title: "Latvian CV Maker",
    description: "Profesionāls CV veidotājs Latvijas darba tirgum",
    type: "website",
    locale: "lv_LV",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}