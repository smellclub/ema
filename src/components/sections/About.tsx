"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { Basketball } from "@/components/ui/Basketball";

/**
 * Sobre mí. El texto se "enciende" palabra por palabra a medida que scrolleás,
 * como si lo estuvieras leyendo en voz alta.
 */
export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: "[data-manifesto]", start: "top 75%", end: "bottom 45%", scrub: true },
        },
      );
      // La pelota gira y baja con el scroll.
      gsap.to("[data-ball]", {
        rotate: 540,
        y: 120,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from("[data-off]", {
        y: 80,
        opacity: 0,
        rotate: (i) => (i % 2 ? 4 : -4),
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-off-list]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sobre-mi" aria-labelledby="sobre-title" className="relative overflow-hidden bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="flex items-start justify-between gap-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/60">
            <span className="font-semibold text-ink">02</span> — Sobre mí
          </p>
          <div data-ball className="-mt-6 w-24 md:w-40">
            <Basketball />
          </div>
        </div>

        <h2 id="sobre-title" className="sr-only">
          Sobre mí
        </h2>
        <p
          data-manifesto
          className="mt-6 max-w-6xl font-display text-[2.1rem] font-bold leading-[1.08] tracking-[-0.01em] md:text-6xl lg:text-7xl"
        >
          {site.manifesto.split(" ").map((w, i) => (
            <span key={i} data-w className="inline-block whitespace-pre">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-28 md:mt-40">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="font-display text-6xl font-extrabold uppercase leading-[0.85] md:text-8xl">
              Fuera de
              <br />
              la pantalla
            </h3>
            <p className="max-w-xs font-hand text-2xl leading-snug -rotate-2">
              lo que hago cuando no estoy programando
            </p>
          </div>

          <ul data-off-list className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.offScreen.map((item, i) => (
              <li
                key={item.id}
                data-off
                className={`group flex min-h-56 flex-col md:min-h-72 justify-between rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-2 ${
                  i % 2 ? "bg-ink text-paper hover:rotate-1" : "bg-lime text-ink hover:-rotate-1"
                }`}
              >
                <span className="font-display text-sm font-bold tabular-nums opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-4xl font-extrabold uppercase leading-none">{item.title}</p>
                  <p className="mt-4 leading-relaxed opacity-80">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
