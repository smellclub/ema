import { site } from "@/config/site";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Servicios como filas grandes. Al pasar el mouse, el fondo de color sube desde abajo
 * (es un clip-path animado con CSS, sin JS). En celular se ve todo siempre.
 */
export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <SectionLabel index="03" label="Servicios" />
        <h2 id="servicios-title" className="mt-6 max-w-4xl font-display text-6xl font-extrabold uppercase leading-[0.85] md:text-8xl">
          Qué puedo hacer <span className="text-accent">por vos</span>
        </h2>

        <ul className="mt-16 border-t border-line md:mt-24">
          {site.services.map((s, i) => (
            <li key={s.id} className="group relative isolate overflow-hidden border-b border-line">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-accent transition-[clip-path] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
              />
              <div className="grid gap-4 py-8 transition-colors duration-300 group-hover:text-ink md:grid-cols-[5rem_1.2fr_1fr_auto] md:items-center md:gap-8 md:px-4 md:py-10">
                <span className="font-display text-sm font-bold tabular-nums text-muted transition-colors group-hover:text-ink/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-4xl font-extrabold uppercase leading-none md:text-6xl">{s.name}</h3>
                <div>
                  <p className="text-paper/75 transition-colors group-hover:text-ink">{s.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted transition-colors group-hover:text-ink/70">
                    {s.includes.map((inc) => (
                      <li key={inc}>+ {inc}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contacto"
                  className="hidden size-14 items-center justify-center rounded-full border border-current text-xl transition-transform duration-500 group-hover:rotate-45 md:flex"
                  aria-label={`Consultar por ${s.name}`}
                >
                  ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
