"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Scroll suave con Lenis (el "deslizamiento" que tienen las webs premiadas).
 * Lo conectamos al reloj de GSAP para que las animaciones de scroll vayan sincronizadas.
 * Con "reducir movimiento" activado no hacemos nada: queda el scroll normal del navegador.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
    lenis.on("scroll", ScrollTrigger.update);
    // Lo dejamos a mano para los botones que te llevan a una sección (ver lib/demo-bus.ts).
    (window as { __lenis?: Lenis }).__lenis = lenis;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
