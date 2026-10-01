"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";

/** Cómo trabajo: una línea de color se dibuja con el scroll y "enciende" cada paso. */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 60%", scrub: 0.5 },
      });
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      tl.from("[data-line]", { [desktop ? "scaleX" : "scaleY"]: 0, ease: "none", duration: 4 });
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step, i) => {
        tl.from(step, { opacity: 0.15, y: 30, duration: 1, ease: "power2.out" }, i);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proceso" aria-labelledby="proceso-title" className="border-t border-line bg-ink-soft">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <SectionLabel index="04" label="Cómo trabajo" />
        <h2 id="proceso-title" className="mt-6 font-display text-6xl font-extrabold uppercase leading-[0.85] md:text-8xl">
          De la idea a <span className="text-outline-accent">online</span>
        </h2>

        <ol data-steps className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-8">
          {/* Línea vertical en celular, horizontal en compu. */}
          <div
            data-line
            aria-hidden
            className="absolute left-[11px] top-0 h-full w-px origin-top bg-accent md:left-0 md:top-[11px] md:h-px md:w-full md:origin-left"
          />
          {site.process.map((step, i) => (
            <li key={step.title} data-step className="relative pl-12 md:pl-0 md:pt-14">
              <span aria-hidden className="absolute left-0 top-0 size-6 rounded-full border-4 border-ink-soft bg-accent" />
              <span className="font-display text-7xl font-extrabold leading-none text-outline md:text-8xl">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-3xl font-extrabold uppercase">{step.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-paper/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
