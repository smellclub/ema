"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, revealTitle, riseIn } from "@/components/motion/gsap";

/**
 * Cómo trabajo. En compu la sección se queda fija: a la izquierda un número gigante que rueda
 * (01, 02, 03, 04) y a la derecha cada paso entra mientras el anterior se va, con una barra de avance.
 * En celular (o con "reducir movimiento") es una lista de cuatro pasos.
 */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const steps = site.process;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealTitle(q("[data-title]"));

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const stage = q("[data-stage]")[0];
        stage.dataset.h = "on";
        const items = q("[data-step]");
        gsap.set(items.slice(1), { autoAlpha: 0, yPercent: 40 });
        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut", duration: 1 },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: `+=${(steps.length - 1) * 70}%`,
            pin: true,
            scrub: 0.6,
            snap: { snapTo: 1 / (steps.length - 1), duration: 0.6, ease: "power2.inOut" },
          },
        });
        items.slice(1).forEach((item, i) => {
          tl.to(items[i], { autoAlpha: 0, yPercent: -40 })
            .to(item, { autoAlpha: 1, yPercent: 0 }, "<")
            .to(q("[data-digits]"), { yPercent: (-100 * (i + 1)) / steps.length }, "<");
        });
        tl.fromTo(q("[data-bar]"), { scaleX: 1 / steps.length }, { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
        return () => {
          delete stage.dataset.h;
        };
      });
      mm.add("(max-width: 1023px)", () => {
        riseIn(q("[data-step]"), q("[data-steps]")[0], { stagger: 0.1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proceso" aria-labelledby="proceso-title" className="border-t border-line">
      <div data-stage className="group/stage data-[h=on]:flex data-[h=on]:h-svh data-[h=on]:flex-col data-[h=on]:justify-center">
        <div className="mx-auto w-full max-w-[1600px] px-5 py-28 md:px-10 md:py-40 group-data-[h=on]/stage:py-0">
          <p className="eyebrow text-muted">05 — Proceso</p>
          <h2 id="proceso-title" data-title className="mt-6 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92]">
            De la idea a <em className="text-accent">online</em>
          </h2>

          <div className="mt-16 grid gap-10 group-data-[h=on]/stage:grid-cols-[1fr_1.2fr] group-data-[h=on]/stage:items-center">
            {/* El número que rueda: una tira de números dentro de una ventana de un renglón. */}
            <div aria-hidden className="hidden h-[0.9em] overflow-hidden font-serif text-[clamp(10rem,20vw,20rem)] leading-[0.9] text-accent group-data-[h=on]/stage:block">
              <div data-digits>
                {steps.map((_, i) => (
                  <div key={i} className="h-[0.9em] italic">
                    0{i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <ol data-steps className="grid gap-12 group-data-[h=on]/stage:gap-0">
                {steps.map((step, i) => (
                  <li key={step.title} data-step className="group-data-[h=on]/stage:col-start-1 group-data-[h=on]/stage:row-start-1">
                    <p className="text-sm text-muted">
                      Paso 0{i + 1} de 0{steps.length}
                      {i === 1 && <span className="ml-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white">Gratis</span>}
                    </p>
                    <h3 className="mt-3 font-serif text-5xl leading-none md:text-7xl">{step.title}</h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{step.text}</p>
                  </li>
                ))}
              </ol>
              <div aria-hidden className="mt-14 hidden h-px bg-line group-data-[h=on]/stage:block">
                <div data-bar className="h-full origin-left bg-ink" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
