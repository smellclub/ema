"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

const DONE_EVENT = "preloader:done";

/** La portada espera esta señal para arrancar su animación de entrada. */
export function onPreloaderDone(cb: () => void) {
  if ((window as { __preloaderDone?: boolean }).__preloaderDone) {
    cb();
    return () => {};
  }
  window.addEventListener(DONE_EVENT, cb, { once: true });
  return () => window.removeEventListener(DONE_EVENT, cb);
}

function finish() {
  (window as { __preloaderDone?: boolean }).__preloaderDone = true;
  window.dispatchEvent(new Event(DONE_EVENT));
}

/**
 * Pantalla de carga: una barra de navegador donde se "escribe" la dirección de la web,
 * la barra de carga se llena y la pantalla sube como un telón (con una capa azul detrás).
 * Dura menos de 2 segundos, solo aparece la primera vez por sesión y nunca con "reducir movimiento".
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const address = site.siteUrl.replace("https://", "");

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem("ema-intro") === "1";
        sessionStorage.setItem("ema-intro", "1");
      } catch {
        // Modo incógnito estricto: mostramos la intro y listo.
      }
      if (seen || prefersReducedMotion()) {
        setGone(true);
        finish();
        return;
      }

      const typed = { n: 0 };
      const url = root.current!.querySelector<HTMLElement>("[data-url]")!;
      gsap
        .timeline({ onComplete: () => setGone(true) })
        .from("[data-window]", { y: 30, autoAlpha: 0, scale: 0.96, duration: 0.5, ease: "expo.out" })
        .to(typed, {
          n: address.length,
          duration: 0.7,
          ease: "none",
          onUpdate: () => {
            url.textContent = address.slice(0, Math.round(typed.n));
          },
        })
        .to("[data-bar]", { scaleX: 1, duration: 0.6, ease: "power2.inOut" })
        .from("[data-name] > span", { yPercent: 110, stagger: 0.06, duration: 0.6, ease: "expo.out" }, "-=0.5")
        // El telón sube; la capa azul va un poquito atrás, así se ve un "barrido" de color.
        .to(root.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "+=0.15")
        .to(curtain.current, { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "-=0.68")
        .call(finish, [], "-=0.5");
    },
    { scope: root },
  );

  if (gone) return null;
  return (
    <>
      <div ref={curtain} aria-hidden className="fixed inset-0 z-[98] bg-accent" />
      <div ref={root} aria-hidden className="fixed inset-0 z-[99] grid place-items-center bg-ink px-5 text-white">
        <div className="w-full max-w-xl">
          <div data-window className="overflow-hidden rounded-2xl bg-night shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="flex gap-1.5">
                <i className="size-2.5 rounded-full bg-hot" />
                <i className="size-2.5 rounded-full bg-white/20" />
                <i className="size-2.5 rounded-full bg-white/20" />
              </span>
              <span className="flex h-8 flex-1 items-center rounded-full bg-white/[0.07] px-4 text-sm text-white/80">
                <span data-url />
                <span className="ml-px h-4 w-px animate-pulse bg-white/80" />
              </span>
            </div>
            <div className="h-0.5 bg-white/10">
              <div data-bar className="h-full origin-left scale-x-0 bg-hot" />
            </div>
          </div>
          <p data-name className="mt-8 flex flex-wrap gap-x-[0.25em] overflow-hidden font-display text-5xl md:text-7xl">
            {site.name.split(" ").map((w, i) => (
              <span key={w} className={`inline-block ${i === 1 ? "text-sky" : ""}`}>
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
