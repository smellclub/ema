"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, slapIn } from "@/components/motion/gsap";
import { useStickers } from "@/components/motion/useStickers";
import { BallSticker } from "@/components/ui/Stickers";

// Cómo se ve cada sticker de la notebook: vinilo, inclinación y lugar sobre la tapa (en compu).
const look = [
  { vinyl: "sticker-blue", tilt: "-rotate-6", spot: "lg:left-[5%] lg:top-[9%]" },
  { vinyl: "sticker-white", tilt: "rotate-3", spot: "lg:left-[52%] lg:top-[6%]" },
  { vinyl: "sticker-white", tilt: "rotate-[5deg]", spot: "lg:left-[10%] lg:top-[54%]" },
  { vinyl: "sticker-blue", tilt: "-rotate-3", spot: "lg:left-[56%] lg:top-[52%]" },
];

/**
 * Sobre mí. El texto se "enciende" palabra por palabra mientras scrolleás,
 * y abajo está mi notebook llena de stickers: lo que hago fuera de la pantalla.
 * En compu los stickers se pueden mover.
 */
export function About() {
  const root = useRef<HTMLElement>(null);
  const lid = useRef<HTMLDivElement>(null);
  useStickers(lid, { media: "(min-width: 1024px) and (pointer: fine)" });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.4 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: "[data-manifesto]", start: "top 75%", end: "bottom 45%", scrub: true },
        },
      );
      slapIn("[data-off]", "[data-lid]", { stagger: 0.14, start: "top 70%" });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sobre-mi" aria-labelledby="sobre-title" className="die-line relative overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <h2 id="sobre-title" className="font-display text-[clamp(3rem,10vw,6rem)] uppercase leading-[1.05]">
          <span className="sticker sticker-ink rotate-2 px-[0.2em] pt-[0.08em]">Quién</span> soy
        </h2>
        <p
          data-manifesto
          className="mt-12 max-w-5xl text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] md:text-5xl md:leading-[1.15]"
        >
          {site.manifesto.split(" ").map((w, i) => (
            <span key={i} data-w className="inline-block whitespace-pre">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-28 grid items-center gap-12 md:mt-40 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          <div>
            <h3 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] uppercase leading-[1.05]">
              Fuera de la pantalla
            </h3>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
              Mi notebook tiene los stickers de lo que me mueve cuando no estoy programando.
              <span className="hidden [@media(pointer:fine)]:lg:inline"> Movelos, son tuyos un rato.</span>
            </p>
          </div>

          {/* La tapa de la notebook: vinilo negro con los stickers pegados. */}
          <div
            ref={lid}
            data-lid
            className="relative rounded-[2rem] bg-ink p-5 shadow-[0_40px_60px_-36px_rgb(13_15_26/0.7)] sm:p-8 lg:aspect-[16/10] lg:p-0"
          >
            <span aria-hidden className="absolute left-1/2 top-3 size-1.5 -translate-x-1/2 rounded-full bg-white/25" />
            <ul className="grid gap-6 pt-4 sm:grid-cols-2 lg:block lg:pt-0">
              {site.offScreen.map((item, i) => (
                <li key={item.id} data-wrap className={`lg:absolute lg:w-[40%] ${look[i].spot}`}>
                  <div data-off>
                    <div
                      data-drag
                      data-cursor="Mover"
                      className={`sticker ${look[i].vinyl} ${look[i].tilt} block p-5 lg:cursor-grab lg:select-none xl:p-6`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-display text-3xl uppercase leading-none xl:text-4xl">{item.title}</p>
                        {item.id === "basquet" && <BallSticker className="-mr-1 -mt-1 w-12 shrink-0" />}
                      </div>
                      <p className={`mt-3 leading-snug ${look[i].vinyl === "sticker-blue" ? "text-white/85" : "text-ink/75"}`}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
