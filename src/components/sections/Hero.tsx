"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { onPreloaderDone } from "@/components/motion/Preloader";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { hero } = site;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Estado inicial: todo escondido hasta que termine la pantalla de carga.
      gsap.set("[data-word]", { yPercent: 115 });
      gsap.set("[data-fade]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-scribble]", { strokeDashoffset: 1 });

      // Esta función la llama la pantalla de carga, así que buscamos los elementos
      // con q() (dentro del hero) y no con un selector suelto.
      const q = gsap.utils.selector(root);
      const off = onPreloaderDone(() => {
        gsap
          .timeline()
          .to(q("[data-word]"), { yPercent: 0, stagger: 0.09, duration: 1.1, ease: "power4.out" })
          .to(q("[data-scribble]"), { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=0.4")
          .to(q("[data-fade]"), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "-=0.9");
      });

      // Al bajar, el título sube más lento que la página (parallax) y se achica un poco.
      gsap.to("[data-headline]", {
        yPercent: -18,
        scale: 0.94,
        transformOrigin: "left bottom",
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      return off;
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pb-14"
    >
      {/* Brillo del color de acento abajo a la izquierda, muy sutil. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 -left-1/4 -z-10 size-[80vw] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-[1600px]">
        <p data-fade className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted md:mb-8">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {hero.kicker}
        </p>

        <h1
          id="hero-title"
          data-headline
          className="font-display text-[19vw] font-extrabold uppercase leading-[0.82] tracking-[-0.02em] md:text-[13.5vw] 2xl:text-[13rem]"
        >
          {hero.lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span data-word className="relative inline-block">
                {line === hero.highlight ? (
                  <>
                    <span className="text-accent">{line}</span>
                    <svg
                      aria-hidden
                      viewBox="0 0 400 40"
                      preserveAspectRatio="none"
                      className="absolute -bottom-[0.06em] left-0 h-[0.14em] w-full overflow-visible text-accent"
                    >
                      <path
                        data-scribble
                        pathLength={1}
                        d="M4 28 C 80 8, 160 6, 230 18 S 350 34, 396 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray="1"
                      />
                    </svg>
                  </>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-[1fr_auto] md:gap-12">
          <p data-fade className="max-w-md text-lg leading-relaxed text-paper/75 md:text-xl">
            {hero.intro}
          </p>

          <div data-fade className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-ink"
              >
                Pedí tu demo <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <a
              href="#trabajos"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-4 font-semibold transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              Ver trabajos
            </a>
          </div>

        </div>
      </div>

      {/* Sello grande a la derecha (en compu). */}
      <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 lg:block xl:right-20">
        <div data-fade>
          <Badge className="size-64 xl:size-72" />
        </div>
      </div>

      {/* Nota "a mano", como las de un cuaderno. */}
      <p
        data-fade
        aria-hidden
        className="absolute right-6 top-28 hidden rotate-[8deg] font-hand text-xl text-accent md:right-16 md:top-36 md:block md:text-3xl"
      >
        sí, también la tuya ↓
      </p>
    </section>
  );
}
