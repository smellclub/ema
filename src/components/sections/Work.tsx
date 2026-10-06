"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, revealTitle, riseIn } from "@/components/motion/gsap";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

/** Qué servicio del formulario se parece a cada trabajo (para el botón "Quiero una así"). */
const serviceFor: Record<string, string> = {
  "black-line": "reservas",
  basalto: "reservas",
  voltio: "reservas",
  "smell-club": "landing",
};

/**
 * Trabajos: cada web en una ventana de navegador grande que se "destapa" al llegar,
 * con el celular flotando encima (se mueve un poco más lento que el scroll: parallax).
 * Al pasar el mouse la captura recorre la web entera.
 */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const projects = site.projects;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealTitle(root.current!.querySelectorAll("[data-title]"));
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
        gsap.fromTo(
          card.querySelector("[data-frame]"),
          { clipPath: "inset(12% 8% 12% 8% round 1.5rem)", scale: 0.94 },
          {
            clipPath: "inset(0% 0% 0% 0% round 1rem)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 90%", end: "top 35%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          card.querySelector("[data-phone]"),
          { yPercent: 25 },
          { yPercent: -15, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } },
        );
        riseIn(card.querySelectorAll("[data-rise]"), card, { start: "top 70%", stagger: 0.07 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="trabajos" aria-labelledby="trabajos-title">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <SectionHead
          id="trabajos-title"
          index="01"
          eyebrow="Trabajos"
          title={
            <>
              Lo que <span className="text-accent">ya hice</span>
            </>
          }
          aside="Tres demos de negocios inventados para mostrar lo que puedo hacer, y la tienda de mi propia marca. Tocá cualquiera para abrirla."
        />

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-44">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            const demo = p.tag === "Demo";
            return (
              <article key={p.id} data-project aria-labelledby={`p-${p.id}`} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                <div className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Abrir"
                    aria-label={`Abrir ${p.name} (se abre en otra pestaña)`}
                    className="group block"
                  >
                    <div data-frame className="browser transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgb(10_12_24/0.08),0_50px_80px_-30px_rgb(43_68_255/0.45)]">
                      <div className="browser-bar">
                        <i />
                        <i />
                        <i />
                        <span className="ml-3 truncate text-xs text-muted">{p.url.replace("https://", "")}</span>
                        <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                          Abrir <Icon name="arrow-up-right" className="size-3.5" />
                        </span>
                      </div>
                      <div
                        className="relative aspect-[16/10] overflow-hidden bg-paper-soft"
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
                  </a>

                  {/* El celular flotando encima: se ve bien ahí también. */}
                  <div
                    data-phone
                    className={`pointer-events-none absolute -bottom-8 w-[24%] max-w-40 md:w-[19%] ${flip ? "-left-3 md:-left-8" : "-right-3 md:-right-8"}`}
                  >
                    <div className="rounded-[1.6rem] bg-ink p-1.5 shadow-[0_30px_50px_-20px_rgb(10_12_24/0.6)]">
                      <Image src={p.images.mobile} alt="" width={390} height={844} sizes="160px" className="h-auto w-full rounded-[1.2rem]" />
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <div data-rise className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-xl text-hot">0{i + 1}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${demo ? "bg-ink text-white" : "bg-accent text-white"}`}
                    >
                      {demo ? "Demo · negocio inventado" : p.tag}
                    </span>
                    <span className="text-sm text-muted">
                      {p.kind} · {p.year}
                    </span>
                  </div>
                  <h3 id={`p-${p.id}`} data-rise className="mt-5 font-display text-[clamp(2.75rem,6vw,4.75rem)] leading-[0.95]">
                    {p.name}
                  </h3>
                  <p data-rise className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink/80">
                    {p.summary}
                  </p>
                  <ul data-rise className="mt-6 flex flex-wrap gap-2">
                    {p.features.map((f) => (
                      <li key={f} className="chip">
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div data-rise className="mt-8 flex flex-wrap gap-3">
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-ink group px-6 py-3.5">
                      Ver la web
                      <Icon name="arrow-up-right" className="size-5 transition-transform group-hover:rotate-45" />
                    </a>
                    {demo && (
                      <button
                        type="button"
                        onClick={() =>
                          requestDemo({
                            service: serviceFor[p.id],
                            message: `Quiero una web como ${p.name} para mi negocio.`,
                          })
                        }
                        className="btn btn-outline px-6 py-3.5"
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
