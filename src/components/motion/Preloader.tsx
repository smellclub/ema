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
 * Pantalla de carga: las letras de tu nombre caen como stickers, cuenta de 0 a 100
 * y la plancha se despega desde una esquina, como cuando sacás un sticker.
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
        .from("[data-letter]", {
          scale: 1.8,
          rotate: (i: number) => (i % 2 ? 14 : -14),
          autoAlpha: 0,
          stagger: 0.045,
          duration: 0.45,
          ease: "back.out(2.6)",
        })
        .to(counter, {
          v: 100,
          duration: 1.3,
          ease: "power2.inOut",
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0)
        .to("[data-bar]", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0)
        // La plancha se despega desde la esquina de abajo a la izquierda y sale volando.
        .to(root.current, { rotate: -8, xPercent: 8, yPercent: -115, duration: 0.95, ease: "expo.in" }, "+=0.1")
        .to(curtain.current, { rotate: -8, xPercent: 8, yPercent: -115, duration: 0.95, ease: "expo.in" }, "-=0.82")
        .call(finish, [], "-=0.55");
    },
    { scope: root },
  );

  if (gone) return null;
  return (
    <>
      <div ref={curtain} aria-hidden className="fixed -inset-[10%] z-[98] origin-top-right bg-accent" />
      <div
        ref={root}
        aria-hidden
        className="fixed inset-0 z-[99] flex origin-top-right flex-col justify-between bg-paper p-6 text-ink md:p-10"
      >
        <span className="text-sm font-semibold text-muted">Pegando stickers…</span>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap gap-x-[0.3em] font-display text-[16vw] uppercase leading-[1.05] md:text-[9vw]">
            {/* Palabra por palabra, para que nunca se corte un nombre a la mitad. */}
            {site.name.split(" ").map((word, w) => (
              <span key={w} className={`flex ${w === 1 ? "text-accent" : ""}`}>
                {word.split("").map((l, i) => (
                  <span key={i} data-letter className="inline-block">
                    {l}
                  </span>
                ))}
              </span>
            ))}
          </div>
          <span data-count className="font-display text-5xl tabular-nums text-accent md:text-8xl">
            000
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-soft">
          <div data-bar className="h-full w-full origin-left scale-x-0 rounded-full bg-accent" />
        </div>
      </div>
    </>
  );
}
