"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { useGSAP, prefersReducedMotion, revealTitle, riseIn } from "@/components/motion/gsap";
import { Icon } from "@/components/ui/Icon";

/** Preguntas frecuentes con <details>: funciona sin JS y es accesible de fábrica. */
export function Faq() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealTitle(root.current!.querySelectorAll("[data-title]"));
      riseIn("[data-q]", "[data-qs]", { stagger: 0.08 });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="preguntas" aria-labelledby="faq-title" className="rule">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow text-muted">(05) Preguntas</p>
          <h2 id="faq-title" data-title className="mt-5 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95]">
            Lo que todos <span className="text-accent">preguntan</span>
          </h2>
        </div>
        <div data-qs className="border-t border-line">
          {site.faq.map((item) => (
            <details key={item.q} data-q className="faq group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-xl font-semibold transition-colors hover:text-accent md:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-white"
                >
                  <Icon name="plus" className="size-5" />
                </span>
              </summary>
              <p className="max-w-xl pb-8 text-lg leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
