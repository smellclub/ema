"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, revealTitle } from "@/components/motion/gsap";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";
import { Roll } from "@/components/ui/Roll";

/**
 * Servicios, sobre negro, como un índice. Al pasar el mouse por una fila, el azul la llena
 * desde abajo; al tocarla se despliega con lo que incluye y el botón "Quiero esto",
 * que completa el formulario de contacto.
 */
export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealTitle(q("[data-title]"));
      gsap.from(q("[data-service]"), {
        yPercent: 40,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: q("[data-services]")[0], start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="servicios" aria-labelledby="servicios-title" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-paper/60">04 — Servicios</p>
            <h2 id="servicios-title" data-title className="mt-6 font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.92]">
              Qué puedo hacer <em className="text-sky">por vos</em>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-paper/70">
            Elegí lo que te sirve y te paso un presupuesto cerrado. Sin letra chica.
          </p>
        </div>

        <div data-services className="mt-16 border-t border-paper/15 md:mt-24">
          {site.services.map((s, i) => (
            <details key={s.id} data-service name="servicio" className="unfold group border-b border-paper/15">
              <summary className="relative isolate flex cursor-pointer list-none items-center gap-6 overflow-hidden px-2 py-8 md:gap-10 md:px-6 md:py-10 [&::-webkit-details-marker]:hidden">
                {/* El relleno azul que sube al pasar el mouse. */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
                />
                <span className="w-10 text-sm text-paper/50 group-hover:text-white/80">0{i + 1}</span>
                <span className="flex-1 font-serif text-4xl transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-3 md:text-7xl">
                  {i % 2 ? <em>{s.name}</em> : s.name}
                </span>
                <span className="hidden max-w-xs text-paper/60 lg:block group-hover:text-white/85">{s.description}</span>
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-paper/30 transition-transform duration-500 group-open:rotate-45 group-hover:border-white"
                >
                  <Icon name="plus" className="size-5" />
                </span>
              </summary>
              <div className="grid gap-8 px-2 pb-10 md:grid-cols-[2.5rem_1fr_auto] md:gap-10 md:px-6">
                <span aria-hidden className="hidden md:block" />
                <div>
                  <p className="max-w-lg text-lg leading-relaxed text-paper/75 lg:hidden">{s.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 lg:mt-0">
                    {s.includes.map((inc) => (
                      <li key={inc} className="inline-flex items-center gap-2 text-paper/85">
                        <Icon name="check" className="size-4 text-sky" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <button type="button" onClick={() => requestDemo({ service: s.id })} className="btn btn-light group/btn w-fit px-6 py-3 text-sm">
                  <Roll>Quiero esto</Roll>
                  <Icon name="arrow-right" className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
