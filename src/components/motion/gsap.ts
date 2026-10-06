"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Registramos los plugins una sola vez para toda la web.
// SplitText parte los títulos en renglones para que suban "desde atrás de una máscara".
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** true si la persona pidió "reducir movimiento" en su sistema (accesibilidad). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Títulos: cada renglón sube desde abajo, recortado por una máscara invisible.
 * Es la entrada "de estudio" de toda la web. autoSplit vuelve a partir si cambia el ancho
 * (o cuando terminan de cargar las fuentes), así los renglones nunca quedan mal cortados.
 */
export function revealTitle(
  targets: gsap.DOMTarget,
  opts: { now?: boolean; delay?: number; trigger?: Element | string; start?: string } = {},
) {
  return SplitText.create(targets, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: 1,
        ease: "expo.out",
        stagger: 0.09,
        delay: opts.delay ?? 0,
        // "now": arranca ya (la portada). Si no, cuando el título entra en pantalla.
        scrollTrigger: opts.now
          ? undefined
          : { trigger: opts.trigger ?? self.elements[0], start: opts.start ?? "top 85%", once: true },
      });
    },
  });
}

/** El resto del texto y las tarjetas: suben un poco y aparecen. */
export function riseIn(targets: gsap.TweenTarget, trigger: Element | string, opts: { stagger?: number; start?: string; y?: number } = {}) {
  return gsap.from(targets, {
    y: opts.y ?? 36,
    autoAlpha: 0,
    duration: 0.9,
    ease: "expo.out",
    stagger: opts.stagger ?? 0.08,
    scrollTrigger: { trigger, start: opts.start ?? "top 80%", once: true },
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
