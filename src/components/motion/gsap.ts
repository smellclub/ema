"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

// Registramos los plugins una sola vez para toda la web.
// Draggable + InertiaPlugin: los stickers se arrastran y, si los soltás con envión, siguen de largo un poco.
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, useGSAP);

/** true si la persona pidió "reducir movimiento" en su sistema (accesibilidad). */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * "Slap": el sticker cae sobre la plancha desde grande, con un rebote y un giro.
 * Es la entrada de todos los stickers (el texto común solo sube y aparece), así todo se siente parte de lo mismo.
 */
export function slapIn(targets: gsap.TweenTarget, trigger: Element | string, opts: { stagger?: number; start?: string } = {}) {
  return gsap.from(targets, {
    scale: 1.45,
    rotate: (i: number) => (i % 2 ? 9 : -9),
    autoAlpha: 0,
    duration: 0.55,
    ease: "back.out(2.4)",
    stagger: opts.stagger ?? 0.09,
    scrollTrigger: { trigger, start: opts.start ?? "top 80%", once: true },
  });
}

export { gsap, ScrollTrigger, Draggable, useGSAP };
