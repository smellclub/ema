import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/config/site";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="contenido" className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link href="/" className="inline-flex rounded-full border border-line px-4 py-2 text-sm hover:bg-ink hover:text-paper">
        Volver al inicio
      </Link>
      <h1 className="mt-10 font-serif text-5xl leading-[0.98] md:text-6xl">{title}</h1>
      <p className="mt-4 text-sm text-muted">Última actualización: {site.legal.lastUpdated}</p>
      <div className="mt-10 space-y-6 leading-relaxed text-ink/85 [&_a]:text-accent [&_a]:underline [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </main>
  );
}
