"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";

/**
 * Trabajos. En compu la sección se "clava" y los proyectos pasan de costado
 * mientras scrolleás (scroll horizontal). En celular quedan uno abajo del otro.
 */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const projects = site.projects;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-project]").forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="trabajos" aria-labelledby="trabajos-title" className="relative overflow-hidden bg-ink lg:h-svh">
      <div
        ref={track}
        className="flex flex-col gap-16 px-5 py-24 md:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-[6vw] lg:py-0 lg:pl-10 lg:pr-[10vw]"
      >
        {/* Primer "panel": el título de la sección. */}
        <div className="shrink-0 lg:w-[34vw]">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            <span className="text-accent">01</span> — Trabajos
          </p>
          <h2 id="trabajos-title" className="mt-6 font-display text-7xl font-extrabold uppercase leading-[0.85] md:text-8xl lg:text-[8.5vw]">
            Lo que
            <br />
            <span className="text-outline">ya hice</span>
          </h2>
          <p className="mt-8 max-w-sm text-lg text-paper/70">
            Dos demos para mostrar lo que puedo hacer por un negocio, y la tienda de mi propia marca.
          </p>
          <p aria-hidden className="mt-10 hidden font-hand text-2xl text-accent lg:block">
            seguí scrolleando →
          </p>
        </div>

        {projects.map((p, i) => (
          <article
            key={p.id}
            data-project
            className="group relative shrink-0 lg:w-[62vw] xl:w-[56vw]"
            aria-labelledby={`p-${p.id}`}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Ver"
              className="block"
              aria-label={`Abrir ${p.name} (se abre en otra pestaña)`}
            >
              {/* Marco tipo navegador. Al pasar el mouse, la captura recorre la web entera. */}
              <div className="overflow-hidden rounded-xl border border-line bg-ink-soft shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] transition-colors duration-500 group-hover:border-accent/60">
                <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
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
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="scroll-shot h-auto w-full"
                  />
                </div>
              </div>
            </a>

            {/* El celular asoma por encima, para mostrar que también se ve bien ahí. */}
            <div className="pointer-events-none absolute -bottom-8 right-4 hidden w-[17%] overflow-hidden rounded-[1.4rem] border-4 border-ink-soft shadow-2xl transition-transform duration-700 group-hover:-translate-y-4 group-hover:rotate-2 md:block">
              <Image src={p.images.mobile} alt="" width={390} height={844} sizes="12vw" className="h-auto w-full" />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[auto_1fr] md:gap-10">
              <div>
                <p className="font-display text-sm font-bold tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </p>
                <h3 id={`p-${p.id}`} className="mt-2 font-display text-5xl font-extrabold uppercase leading-none md:text-6xl">
                  {p.name}
                </h3>
                <p className="mt-3 flex items-center gap-3 text-sm text-paper/70">
                  {p.kind}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.tag === "Demo" ? "border border-paper/30" : "bg-accent text-ink"}`}
                  >
                    {p.tag}
                  </span>
                </p>
              </div>
              <div className="md:max-w-md">
                <p className="leading-relaxed text-paper/75">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.features.map((f) => (
                    <li key={f} className="rounded-full border border-line px-3 py-1 text-xs text-paper/70">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
