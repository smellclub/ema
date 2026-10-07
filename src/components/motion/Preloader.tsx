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
 * Pantalla de carga: el nombre aparece letra por letra, un contador va de 0 a 100
 * y el telón negro sube con el borde de abajo curvo, que se endereza mientras sale.
 * Dura menos de 2,5 segundos, solo aparece la primera vez por sesión y nunca con "reducir movimiento".
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
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
        .from("[data-letter]", { yPercent: 115, duration: 0.9, ease: "expo.out", stagger: 0.035 })
        .to(
          counter,
          {
            v: 100,
            duration: 1.4,
            ease: "power3.inOut",
            onUpdate: () => {
              num.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.1,
        )
        .to("[data-bar]", { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0.1)
        .to("[data-letter], [data-count], [data-meta]", { yPercent: -115, duration: 0.6, ease: "expo.in", stagger: 0.012 }, "+=0.1")
        .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.2")
        .to("[data-curve]", { attr: { d: "M0 0 Q50 0 100 0 L100 0 L0 0 Z" }, duration: 1, ease: "expo.inOut" }, "<")
        .call(finish, [], "-=0.55");
    },
    { scope: root },
  );

  if (gone) return null;
  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[99] bg-ink text-paper">
      <div className="flex h-full flex-col justify-between p-6 md:p-10">
        <div className="flex justify-between overflow-hidden text-sm text-paper/60">
          <span data-meta className="block">
            {site.role}
          </span>
          <span data-meta className="block">
            {site.location}
          </span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="flex flex-wrap gap-x-[0.25em] font-serif text-[17vw] leading-[0.9] md:text-[10vw]">
            {site.name.split(" ").map((word, w) => (
              <span key={w} className={`flex overflow-hidden pb-[0.08em] ${w === 1 ? "italic text-sky" : ""}`}>
                {word.split("").map((l, i) => (
                  <span key={i} data-letter className="inline-block">
                    {l}
                  </span>
                ))}
              </span>
            ))}
          </p>
          <span className="overflow-hidden">
            <span data-count className="block font-serif text-6xl tabular-nums md:text-8xl">
              000
            </span>
          </span>
        </div>
        <div className="h-px w-full bg-paper/15">
          <div data-bar className="h-full w-full origin-left scale-x-0 bg-paper" />
        </div>
      </div>
      {/* El borde curvo de abajo del telón: se endereza mientras sube. */}
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute left-0 top-full h-[12vh] w-full fill-ink">
        <path data-curve d="M0 0 Q50 20 100 0 L100 0 L0 0 Z" />
      </svg>
    </div>
  );
}
