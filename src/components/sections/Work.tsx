"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, slapIn } from "@/components/motion/gsap";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";

/** Qué servicio del formulario se parece a cada trabajo (para el botón "Quiero una así"). */
const serviceFor: Record<string, string> = {
  "black-line": "reservas",
  basalto: "reservas",
  voltio: "reservas",
  "smell-club": "landing",
};

/**
 * Trabajos: cada web es un sticker grande pegado en la plancha, un poco torcido.
 * Al pasar el mouse se endereza, la esquina se despega y la captura recorre la web entera.
 */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const projects = site.projects;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      slapIn("[data-title-sticker]", "[data-title-sticker]");
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
        slapIn(card.querySelectorAll("[data-slap]"), card, { start: "top 75%", stagger: 0.15 });
        gsap.from(card.querySelectorAll("[data-rise]"), {
          y: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: card, start: "top 70%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="trabajos" aria-labelledby="trabajos-title" className="relative">
      <div className="mx-auto max-w-[1600px] px-5 pb-28 pt-16 md:px-10 md:pb-40 md:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 id="trabajos-title" className="font-display text-[clamp(3rem,10vw,6rem)] uppercase leading-[1.05]">
            Lo que
            <br />
            <span data-title-sticker className="sticker sticker-blue -rotate-3 px-[0.2em] pt-[0.08em]">
              ya hice
            </span>
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Tres demos de negocios inventados para mostrar lo que puedo hacer, y la tienda de mi propia marca. Tocá
            cualquiera para abrirla.
          </p>
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={p.id}
                data-project
                aria-labelledby={`p-${p.id}`}
                className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14"
              >
                <div className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Abrir"
                    aria-label={`Abrir ${p.name} (se abre en otra pestaña)`}
                    className="group block"
                  >
                    <div data-slap className="relative">
                      {/* La etiqueta va pegada sobre la captura: "Demo" queda a la vista siempre. */}
                      <span
                        className={`sticker absolute -top-4 z-10 px-3.5 py-1.5 text-sm font-semibold md:-top-5 md:text-base ${flip ? "right-8" : "left-6"} ${p.tag === "Demo" ? "sticker-ink -rotate-3" : "sticker-blue rotate-2"}`}
                      >
                        {p.tag === "Demo" ? "Demo · negocio inventado" : p.tag}
                      </span>
                      <div
                        className={`peel rounded-[1.4rem] bg-white p-2.5 outline-2 outline-offset-[12px] outline-dashed outline-line shadow-[0_0_0_1px_var(--color-line),0_30px_50px_-28px_rgb(13_15_26/0.45)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 md:p-3 ${flip ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"}`}
                      >
                        <div className="overflow-hidden rounded-[0.9rem] bg-paper-soft">
                          <div className="flex items-center gap-1.5 px-4 py-3">
                            <span className="size-2.5 rounded-full bg-line" />
                            <span className="size-2.5 rounded-full bg-line" />
                            <span className="size-2.5 rounded-full bg-line" />
                            <span className="ml-3 truncate text-xs text-muted">{p.url.replace("https://", "")}</span>
                          </div>
                          <div
                            className="relative aspect-[16/10] overflow-hidden"
                            style={
                              {
                                // Cuánto tiene que subir la captura para llegar al final (el marco mide 1440×900).
                                "--shift": `-${((1 - 900 / p.images.fullHeight) * 100).toFixed(2)}%`,
                                "--dur": `${Math.round(p.images.fullHeight / 1400)}s`,
                              } as CSSProperties
                            }
                          >
                            <Image
                              src={p.images.full}
                              alt={`Captura de la web de ${p.name}`}
                              width={1440}
                              height={p.images.fullHeight}
                              sizes="(min-width: 1024px) 55vw, 100vw"
                              className="scroll-shot h-auto w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* El celular, como otro sticker pegado encima: se ve bien ahí también. */}
                  <div
                    data-slap
                    className={`pointer-events-none absolute -bottom-10 w-[24%] max-w-40 md:w-[19%] ${flip ? "-left-3 md:-left-6" : "-right-3 md:-right-6"}`}
                  >
                    <div className={`rounded-[1.5rem] bg-white p-1.5 shadow-[0_0_0_1px_var(--color-line),0_24px_40px_-18px_rgb(13_15_26/0.5)] ${flip ? "-rotate-6" : "rotate-6"}`}>
                      <Image src={p.images.mobile} alt="" width={390} height={844} sizes="160px" className="h-auto w-full rounded-[1.15rem]" />
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <h3 id={`p-${p.id}`} data-rise className="font-display text-[clamp(2.75rem,6vw,4.75rem)] uppercase leading-none">
                    {p.name}
                  </h3>
                  <p data-rise className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink/80">
                    {p.summary}
                  </p>
                  <ul data-rise className="mt-5 flex flex-wrap gap-2">
                    {p.features.map((f) => (
                      <li key={f} className="rounded-full bg-paper-soft px-3 py-1.5 text-sm font-medium text-ink/75">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div data-rise className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sticker btn-sticker-ink group px-6 py-3.5"
                    >
                      Ver la web
                      <Icon name="arrow-up-right" className="size-5 transition-transform group-hover:rotate-45" />
                    </a>
                    {p.tag === "Demo" && (
                      <button
                        type="button"
                        onClick={() =>
                          requestDemo({
                            service: serviceFor[p.id],
                            message: `Quiero una web como ${p.name} para mi negocio.`,
                          })
                        }
                        className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-ink shadow-[inset_0_0_0_2px_var(--color-ink)] transition-colors hover:bg-ink hover:text-white"
                      >
                        Quiero una así
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
