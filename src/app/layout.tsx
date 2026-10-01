import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Permanent_Marker } from "next/font/google";
import { site } from "@/config/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import "./globals.css";

// next/font baja las fuentes en el build y las sirve desde nuestro dominio:
// el navegador nunca le pide nada a Google (más rápido, más privado y CSP más cerrada).
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});
const sans = Geist({ variable: "--font-geist", subsets: ["latin"] });
const hand = Permanent_Marker({ variable: "--font-marker", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_UY",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0e0d0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-UY" className={`${display.variable} ${sans.variable} ${hand.variable} antialiased`}>
      <body className="grain min-h-screen font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
        >
          Saltar al contenido
        </a>
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
