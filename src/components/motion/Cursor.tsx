"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Cursor propio: un punto de color que sigue al mouse con un poco de retraso
 * y se agranda sobre links y botones. Sobre un elemento con data-cursor="Texto"
 * muestra ese texto adentro (por ejemplo "Ver" en los trabajos).
 * Solo en compus con mouse: en celulares no existe el cursor.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer || prefersReducedMotion() || !dot.current) return;
    const el = dot.current;
    el.hidden = false;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor], input, textarea, select, label");
      const text = target?.dataset.cursor ?? "";
      setLabel(text);
      // Animamos el tamaño (no "scale") para que el texto de adentro se vea nítido.
      const size = text ? 84 : target ? 44 : 14;
      gsap.to(el, { width: size, height: size, duration: 0.35, ease: "power3" });
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  // Arranca escondido; el efecto lo muestra solo si hay mouse.
  return (
    <div
      ref={dot}
      hidden
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[95] size-3.5 [&:not([hidden])]:flex items-center justify-center rounded-full bg-accent ${label ? "" : "mix-blend-difference"}`}
    >
      {label && <span className="text-xs font-semibold uppercase tracking-widest text-ink">{label}</span>}
    </div>
  );
}
