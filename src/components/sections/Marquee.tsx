"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, ScrollTrigger } from "@/components/motion/gsap";

// La lista se repite: la cinta se corre exactamente la mitad y vuelve a empezar sin corte.
const items = [...site.marquee, ...site.marquee];

/**
 * Cinta de lo que hago, en serif grande. Corre sola, pero reacciona al scroll:
 * si bajás rápido acelera y se inclina un poco; si subís, cambia de sentido.
 */
export function Marquee() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
      const loop = gsap.to(track, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
      const skew = gsap.quickTo(track, "skewX", { duration: 0.6, ease: "power3" });
      let dir = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const v = self.getVelocity();
          if (Math.abs(v) > 20) dir = v > 0 ? 1 : -1;
          // La velocidad del scroll empuja la cinta y después vuelve sola a su ritmo.
          gsap.to(loop, { timeScale: dir * (1 + Math.min(Math.abs(v) / 300, 6)), duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: "power2.out" });
          skew(gsap.utils.clamp(-8, 8, v / -250));
        },
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      });
      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Lo que hago" className="overflow-hidden border-y border-line py-6 md:py-9">
      <div className="flex whitespace-nowrap">
        <ul data-track className="flex shrink-0 items-center will-change-transform">
          {[...items, ...items].map((item, i) => (
            <li key={i} className="flex items-center font-serif text-5xl md:text-8xl">
              <span className={i % 2 ? "italic text-accent" : ""}>{item}</span>
              <svg viewBox="0 0 24 24" aria-hidden className="mx-8 size-6 shrink-0 md:mx-12 md:size-9" fill="currentColor">
                <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
