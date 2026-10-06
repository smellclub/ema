"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, revealTitle } from "@/components/motion/gsap";
import { SectionHead } from "@/components/ui/SectionHead";

/**
 * Cómo trabajo: una línea se dibuja con el scroll y cada número se "enciende" (se pinta de azul)
 * cuando la línea llega. El paso de la demo lleva la etiqueta "Gratis".
 */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealTitle(root.current!.querySelectorAll("[data-title]"));
      const tl = gsap.timeline({
        scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 60%", scrub: 0.5 },
      });
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      tl.from("[data-line]", { [desktop ? "scaleX" : "scaleY"]: 0, ease: "none", duration: 4 });
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, i) => {
        tl.fromTo(
          step.querySelector("[data-dot]"),
          { backgroundColor: "#ffffff", color: "#0a0c18", scale: 0.8 },
          { backgroundColor: "#2b44ff", color: "#ffffff", scale: 1, duration: 0.4, ease: "back.out(3)" },
          i,
        );
        tl.from(step.querySelector("[data-copy]"), { autoAlpha: 0.3, y: 24, duration: 0.8, ease: "power2.out" }, i + 0.1);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proceso" aria-labelledby="proceso-title">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <SectionHead
          id="proceso-title"
          index="04"
          eyebrow="Proceso"
          title={
            <>
              De la idea a <span className="text-accent">online</span>
            </>
          }
          aside="Cuatro pasos claros. Ves tu web antes de pagar y opinás en cada etapa."
        />

        <ol data-steps className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-8">
          {/* La línea: vertical en celular, horizontal en compu. Debajo, una línea gris que marca el recorrido. */}
          <div aria-hidden className="absolute left-[27px] top-0 h-full border-l-2 border-line md:left-0 md:top-[29px] md:h-0 md:w-full md:border-l-0 md:border-t-2" />
          <div
            data-line
            aria-hidden
            className="absolute left-[27px] top-0 h-full origin-top border-l-2 border-accent md:left-0 md:top-[29px] md:h-0 md:w-full md:origin-left md:border-l-0 md:border-t-2"
          />
          {site.process.map((step, i) => (
            <li key={step.title} data-step className="relative pl-20 md:pl-0 md:pt-24">
              <span
                data-dot
                aria-hidden
                className="absolute left-0 top-0 grid size-14 place-items-center rounded-full border-2 border-accent bg-accent font-display text-xl text-white md:size-[3.75rem]"
              >
                0{i + 1}
              </span>
              <div data-copy>
                <h3 className="flex flex-wrap items-center gap-3 font-display text-3xl leading-none md:text-[2.1rem]">
                  {step.title}
                  {i === 1 && <span className="rounded-full bg-hot px-2.5 py-1 font-sans text-sm font-bold tracking-normal text-ink">Gratis</span>}
                </h3>
                <p className="mt-3 max-w-xs text-lg leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
