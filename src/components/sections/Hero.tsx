"use client";

import { useId, useRef, useState } from "react";
import { site } from "@/config/site";
import { onPreloaderDone } from "@/components/motion/Preloader";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { useStickers } from "@/components/motion/useStickers";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";
import { BallSticker, BurstSticker, RoundSticker } from "@/components/ui/Stickers";

// Cada renglón del título es un vinilo distinto, con su propia inclinación.
const lineStyle = [
  { vinyl: "sticker-ink", tilt: "-rotate-2", indent: "" },
  { vinyl: "sticker-white", tilt: "rotate-[1.5deg]", indent: "ml-[0.5em]" },
  { vinyl: "sticker-blue", tilt: "-rotate-[4deg]", indent: "ml-[0.15em]" },
];

/**
 * Portada: la web es una plancha de stickers.
 * - El título son tres stickers que se despegan y se arrastran (en compu).
 * - A la derecha, escribís el nombre de tu negocio y se convierte en sticker en vivo:
 *   es la demo con tu marca que ofrezco, en chiquito. El botón te lleva al formulario ya completado.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [business, setBusiness] = useState("");
  const inputId = useId();
  const { hero } = site;

  // Los renglones grandes solo se arrastran con mouse (en celular trabarían el scroll).
  const big = useStickers(root, { media: "(min-width: 1024px) and (pointer: fine)", selector: "[data-drag-big]" });
  const small = useStickers(root, { selector: "[data-drag]" });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-in]"), { autoAlpha: 0 });
      const off = onPreloaderDone(() => {
        gsap
          .timeline({ defaults: { ease: "back.out(2.4)" } })
          .fromTo(
            q("[data-in='line']"),
            { autoAlpha: 0, scale: 1.5, rotate: (i: number) => (i % 2 ? 10 : -10) },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.55, stagger: 0.14 },
          )
          .fromTo(q("[data-in='rise']"), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.08 }, "-=0.2")
          .fromTo(
            q("[data-in='pop']"),
            { autoAlpha: 0, scale: 0.2, rotate: -40 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, stagger: 0.09 },
            "-=0.5",
          );
      });
      return off;
    },
    { scope: root },
  );

  const name = business.trim() || "Tu negocio";
  // Cuanto más largo el nombre, más chica la letra, para que siempre entre en el sticker.
  const fontSize = `${Math.max(1.5, Math.min(3.4, 26 / Math.max(name.length, 7))).toFixed(2)}rem`;

  return (
    <section
      ref={root}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden px-5 pb-20 pt-28 md:px-10 md:pt-32 lg:flex lg:min-h-svh lg:items-center lg:pb-16"
    >
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.1rem,14.5vw,5.5rem)] uppercase leading-none sm:text-[clamp(4rem,11vw,7rem)] lg:text-[clamp(4.5rem,7.2vw,7.5rem)]"
          >
            {hero.lines.map((line, i) => (
              <span key={line} data-wrap className={`relative mt-[0.2em] block w-fit first:mt-0 ${lineStyle[i].indent}`}>
                <span data-slot aria-hidden className="kiss-cut invisible absolute inset-0 opacity-0" />
                <span data-in="line" className="block">
                  <span
                    data-drag-big
                    data-cursor="Despegá"
                    className={`sticker ${lineStyle[i].vinyl} ${lineStyle[i].tilt} touch-manipulation select-none px-[0.22em] pb-[0.06em] pt-[0.14em] lg:cursor-grab`}
                  >
                    {line}
                  </span>
                </span>
              </span>
            ))}
          </h1>

          <p data-in="rise" className="mt-10 max-w-md text-lg leading-relaxed text-muted md:text-xl">
            {hero.intro}
          </p>

          <div data-in="rise" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#trabajos" className="group inline-flex items-center gap-2 text-lg font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:decoration-4">
              Ver mis trabajos
              <Icon name="arrow-down" className="size-5 transition-transform group-hover:translate-y-1" />
            </a>
            <button
              type="button"
              onClick={() => {
                big.reset();
                small.reset();
              }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-paper-soft hover:text-ink"
            >
              <Icon name="reset" className="size-4" />
              Volver a pegar los stickers
            </button>
          </div>
        </div>

        {/* El generador de stickers: la demo con tu marca, en chiquito. */}
        <form
          data-in="rise"
          onSubmit={(e) => {
            e.preventDefault();
            requestDemo({ business: business.trim() });
          }}
          className="relative mx-auto w-full max-w-lg rounded-[2rem] border-2 border-dashed border-line bg-paper p-6 sm:p-8"
        >
          <div className="grid min-h-52 place-items-center px-2 py-8 sm:min-h-60">
            <div aria-live="polite" className="sticker sticker-blue max-w-full rotate-[3deg] px-6 pb-4 pt-5 text-center">
              <p className="break-words font-display leading-[1.05]" style={{ fontSize }}>
                {name}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Web nueva · demo gratis</p>
            </div>
          </div>

          <label htmlFor={inputId} className="mt-6 block text-base font-semibold">
            ¿Cómo se llama tu negocio?
          </label>
          <input
            id={inputId}
            value={business}
            onChange={(e) => setBusiness(e.target.value.slice(0, 40))}
            maxLength={40}
            autoComplete="organization"
            placeholder="Ej: Peluquería Sol"
            className="field"
          />
          <button
            type="submit"
            className="btn-sticker group mt-5 w-full px-7 py-4 text-lg"
          >
            Quiero mi demo
            <Icon name="arrow-right" className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-3 text-center text-sm text-muted">Te la muestro antes de que pagues nada.</p>
          {/* "Demo gratis" va pegado en la esquina del panel: arriba en celular, abajo en compu. */}
          <span data-wrap aria-hidden className="absolute -right-3 -top-12 w-24 sm:w-28 lg:-bottom-14 lg:-right-12 lg:top-auto lg:w-36">
            <span data-in="pop" className="block">
              <span data-drag data-cursor="Despegá" className="block cursor-grab touch-none">
                <BurstSticker className="w-full text-base sm:text-lg lg:text-xl">
                  Demo
                  <br />
                  gratis
                </BurstSticker>
              </span>
            </span>
          </span>
        </form>
      </div>

      {/* Stickers sueltos. Se arrastran con mouse o con el dedo. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <span data-wrap className="absolute right-[5%] top-[11.5rem] w-24 sm:right-[8%] sm:top-[9rem] sm:w-28 lg:right-[44%] lg:top-[16%] lg:w-32">
          <span data-in="pop" className="block">
            <span data-drag data-cursor="Despegá" className="pointer-events-auto block cursor-grab touch-none">
              <RoundSticker text="HECHO EN URUGUAY • HECHO EN URUGUAY • " className="w-full">
                <svg viewBox="0 0 40 40" className="size-9 sm:size-11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <circle cx="20" cy="20" r="7" fill="currentColor" />
                  <path d="M20 3v5M20 32v5M3 20h5M32 20h5M8 8l3.5 3.5M28.5 28.5 32 32M32 8l-3.5 3.5M11.5 28.5 8 32" />
                </svg>
              </RoundSticker>
            </span>
          </span>
        </span>

        <span data-wrap className="absolute right-[4%] top-[33rem] sm:hidden lg:right-auto lg:left-[54%] lg:top-[11%] lg:block">
          <span data-in="pop" className="block">
            <span data-drag data-cursor="Despegá" className="sticker sticker-ink pointer-events-auto block -rotate-6 cursor-grab touch-none px-4 py-2 text-base font-semibold">
              Rápida en el celu
            </span>
          </span>
        </span>

        <span data-wrap className="absolute right-[6%] top-[18.5rem] w-14 sm:hidden xl:right-auto xl:top-auto xl:bottom-[12%] xl:left-[38%] xl:block xl:w-20">
          <span data-in="pop" className="block">
            <span data-drag data-cursor="Despegá" className="pointer-events-auto block cursor-grab touch-none">
              <BallSticker className="w-full" />
            </span>
          </span>
        </span>

        <span data-wrap className="absolute right-[4%] top-[18%] hidden lg:block">
          <span data-in="pop" className="block">
            <span data-drag data-cursor="Despegá" className="sticker sticker-white pointer-events-auto block rotate-3 cursor-grab touch-none px-4 py-2 text-base font-semibold">
              Cero plantillas
            </span>
          </span>
        </span>
      </div>
    </section>
  );
}
