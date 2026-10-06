"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { useGSAP, prefersReducedMotion, revealTitle, riseIn } from "@/components/motion/gsap";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

/** La linterna de las tarjetas: le dice al CSS dónde está el mouse dentro de la tarjeta. */
function track(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

/** Servicios: un bloque azul entero con tarjetas blancas. "Quiero esto" completa el formulario. */
export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealTitle(root.current!.querySelectorAll("[data-title]"));
      riseIn("[data-service]", "[data-services]", { stagger: 0.1, y: 60 });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="servicios" aria-labelledby="servicios-title" className="px-2 md:px-4">
      <div className="mx-auto max-w-[1680px] rounded-[2rem] bg-accent text-white md:rounded-[2.5rem]">
        <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <SectionHead
            id="servicios-title"
            index="03"
            eyebrow="Servicios"
            dark
            title="Qué puedo hacer por vos"
            aside="Elegí lo que te sirve y te paso un presupuesto cerrado. Sin letra chica."
          />

          <ul data-services className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
            {site.services.map((s, i) => (
              <li key={s.id} data-service>
                <div
                  onPointerMove={track}
                  className="spotlight group flex h-full flex-col rounded-[1.75rem] bg-white p-7 text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 md:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="font-display text-4xl leading-none md:text-5xl">{s.name}</h3>
                    <span className="font-display text-xl text-accent">0{i + 1}</span>
                  </div>
                  <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-muted">{s.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.includes.map((inc) => (
                      <li key={inc} className="chip">
                        <Icon name="check" className="size-4 text-accent" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <button type="button" onClick={() => requestDemo({ service: s.id })} className="btn group/btn px-6 py-3">
                      Quiero esto
                      <Icon name="arrow-right" className="size-5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
