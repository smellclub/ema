"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

const DONE_EVENT = "preloader:done";

/** El hero espera esta señal para arrancar su animación de entrada. */
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
 * Pantalla de carga: cuenta de 0 a 100 y se levanta como un telón.
 * Solo aparece la primera vez por sesión (no molesta si volvés de otra página)
 * y nunca con "reducir movimiento".
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

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

      const counter = { v: 0 };
      const num = root.current!.querySelector<HTMLElement>("[data-count]")!;
      gsap
        .timeline({ onComplete: () => setGone(true) })
        .from("[data-letter]", { yPercent: 110, stagger: 0.03, duration: 0.7, ease: "power4.out" })
        .to(counter, {
          v: 100,
          duration: 1.3,
          ease: "power2.inOut",
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0)
        .to("[data-bar]", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
        .to("[data-letter]", { yPercent: -110, stagger: 0.02, duration: 0.5, ease: "power3.in" })
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.15")
        .to(curtain.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.78")
        .call(finish, [], "-=0.55");
    },
    { scope: root },
  );

  if (gone) return null;
  return (
    <>
      <div ref={curtain} aria-hidden className="fixed inset-0 z-[98] bg-accent" />
      <div
        ref={root}
        aria-hidden
        className="fixed inset-0 z-[99] flex flex-col justify-between bg-ink p-6 text-paper md:p-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted">Cargando portfolio</span>
        <div className="flex items-end justify-between">
          <div className="flex flex-wrap overflow-hidden font-display text-[17vw] font-extrabold uppercase leading-[0.85] md:text-[10vw]">
            {site.name.split("").map((l, i) => (
              <span key={i} data-letter className="inline-block whitespace-pre">
                {l}
              </span>
            ))}
          </div>
          <span data-count className="font-display text-5xl font-bold tabular-nums text-accent md:text-8xl">
            000
          </span>
        </div>
        <div className="h-px w-full bg-line">
          <div data-bar className="h-px w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </>
  );
}
