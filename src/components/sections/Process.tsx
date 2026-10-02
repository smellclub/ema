"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";

/**
 * Cómo trabajo: una línea de troquel punteada se dibuja con el scroll
 * y cada paso se pega como un sticker redondo cuando la línea llega.
 */
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
        tl.from(step.querySelector("[data-dot]"), { scale: 0, rotate: -90, duration: 0.5, ease: "back.out(3)" }, i);
        tl.from(step.querySelector("[data-copy]"), { autoAlpha: 0.15, y: 24, duration: 0.8, ease: "power2.out" }, i + 0.1);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proceso" aria-labelledby="proceso-title">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <h2 id="proceso-title" className="font-display text-[clamp(3rem,10vw,6rem)] uppercase leading-[1.05]">
          De la idea a{" "}
          <span className="sticker sticker-blue rotate-2 px-[0.2em] pt-[0.08em]">online</span>
        </h2>

        <ol data-steps className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-8">
          {/* El troquel: vertical en celular, horizontal en compu. */}
          <div
            data-line
            aria-hidden
            className="absolute left-[27px] top-0 h-full origin-top border-l-2 border-dashed border-accent md:left-0 md:top-[29px] md:h-0 md:w-full md:origin-left md:border-l-0 md:border-t-2"
          />
          {site.process.map((step, i) => (
            <li key={step.title} data-step className="relative pl-20 md:pl-0 md:pt-24">
              <span
                data-dot
                aria-hidden
                className={`sticker absolute left-0 top-0 grid size-14 place-items-center !rounded-full font-display text-2xl md:size-[3.75rem] ${i === site.process.length - 1 ? "sticker-blue" : "sticker-ink"}`}
              >
                {i + 1}
              </span>
              <div data-copy>
                <h3 className="font-display text-3xl uppercase leading-none md:text-4xl">{step.title}</h3>
                <p className="mt-3 max-w-xs text-lg leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
