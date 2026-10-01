import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/config/site";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link href="/" className="text-sm text-accent hover:underline">
        ← Volver
      </Link>
      <h1 className="mt-10 font-display text-6xl font-extrabold uppercase leading-[0.9]">{title}</h1>
      <p className="mt-4 text-sm text-muted">Última actualización: {site.legal.lastUpdated}</p>
      <div className="mt-10 space-y-6 leading-relaxed text-paper/85 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:uppercase [&_h2]:text-paper [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </main>
  );
}
