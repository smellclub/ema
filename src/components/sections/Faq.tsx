"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, revealTitle } from "@/components/motion/gsap";
import { Icon } from "@/components/ui/Icon";

/** Preguntas frecuentes con <details>: funciona sin JS, es accesible de fábrica y se abre suave. */
export function Faq() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealTitle(q("[data-title]"));
      gsap.from(q("[data-q]"), {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: q("[data-qs]")[0], start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="preguntas" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow text-muted">06 — Preguntas</p>
          <h2 id="faq-title" data-title className="mt-6 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
            Lo que todos <em className="text-accent">preguntan</em>
          </h2>
        </div>
        <div data-qs className="border-t border-line">
          {site.faq.map((item) => (
            <details key={item.q} data-q className="unfold group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-xl md:text-2xl [&::-webkit-details-marker]:hidden">
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-2">{item.q}</span>
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:border-ink group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-paper"
                >
                  <Icon name="plus" className="size-4" />
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
