import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Familjen_Grotesk } from "next/font/google";
import { site } from "@/config/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import "./globals.css";

// next/font baja las fuentes en el build y las sirve desde nuestro dominio:
// el navegador nunca le pide nada a Google (más rápido, más privado y CSP más cerrada).
// Bricolage Grotesque: títulos con carácter pero serios, la que usan muchos estudios de diseño.
// Es "variable": un solo archivo trae todos los grosores. latin-ext trae las tildes y la ñ.
const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin", "latin-ext"], axes: ["opsz"] });
// Familjen Grotesk: para leer cómodo, con un poco más de carácter que una de sistema.
const sans = Familjen_Grotesk({ variable: "--font-familjen", subsets: ["latin", "latin-ext"] });

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
  themeColor: "#fafaf7",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-UY" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
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
