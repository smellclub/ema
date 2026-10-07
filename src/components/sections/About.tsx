"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, revealTitle } from "@/components/motion/gsap";
import { Icon, type IconName } from "@/components/ui/Icon";

const icons: Record<string, IconName> = {
  basquet: "ball",
  perfumes: "bottle",
  marketing: "megaphone",
  negocios: "chart",
};

/**
 * Sobre mí. El texto se "enciende" palabra por palabra mientras scrolleás.
 * Abajo, lo que hago fuera de la pantalla como una lista: las líneas se dibujan al llegar
 * y cada fila se desliza y muestra su ícono al pasar el mouse.
 */
export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealTitle(q("[data-title]"));
      gsap.fromTo(
        q("[data-w]"),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: q("[data-manifesto]")[0], start: "top 75%", end: "bottom 50%", scrub: true },
        },
      );
      q("[data-row]").forEach((row) => {
        gsap.from(row.querySelector("[data-line]"), {
          scaleX: 0,
          duration: 1.2,
          ease: "expo.inOut",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
        gsap.from(row.querySelectorAll("[data-cell]"), {
          yPercent: 100,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sobre-mi" aria-labelledby="sobre-title" className="border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr] lg:gap-16">
          <div>
            <p className="eyebrow text-muted">03 — Sobre mí</p>
            <h2 id="sobre-title" data-title className="mt-6 font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
              Quién <em className="text-accent">soy</em>
            </h2>
          </div>
          <p data-manifesto className="font-serif text-[2rem] leading-[1.12] md:text-[3.4rem] md:leading-[1.06]">
            {site.manifesto.split(" ").map((w, i) => (
              <span key={i} data-w className="inline-block whitespace-pre">
                {w}{" "}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-28 md:mt-40">
          <p className="eyebrow text-muted">Fuera de la pantalla</p>
          <ul className="mt-8">
            {site.offScreen.map((item, i) => (
              <li key={item.id} data-row className="group relative">
                <span data-line aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-line" />
                <div className="grid items-center gap-2 py-7 md:grid-cols-[4rem_1fr_1fr_3rem] md:gap-8 md:py-9">
                  <span className="hidden overflow-hidden md:block">
                    <span data-cell className="block text-sm text-muted">
                      0{i + 1}
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    {/* GSAP mueve el de afuera y el hover mueve el de adentro: si los dos tocan el mismo elemento, se pisan. */}
                    <span data-cell className="block">
                      <span className="block font-serif text-4xl transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-4 md:text-6xl">
                        {i % 2 ? <em>{item.title}</em> : item.title}
                      </span>
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span data-cell className="block max-w-sm text-muted">
                      {item.text}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="hidden size-12 scale-50 place-items-center rounded-full bg-accent text-white opacity-0 transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-100 group-hover:opacity-100 md:grid"
                  >
                    <Icon name={icons[item.id] ?? "check"} className="size-5" />
                  </span>
                </div>
              </li>
            ))}
            <li aria-hidden className="h-px bg-line" />
          </ul>
        </div>
      </div>
    </section>
  );
}
