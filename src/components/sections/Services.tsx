"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { useGSAP, prefersReducedMotion, slapIn } from "@/components/motion/gsap";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";

// Cada servicio es una etiqueta distinta: no todas iguales, como en una plancha real.
const look = [
  { tilt: "-rotate-2", place: "lg:col-span-7" },
  { tilt: "rotate-[2.5deg]", place: "lg:col-span-5 lg:mt-16" },
  { tilt: "rotate-1", place: "lg:col-span-5 lg:-mt-6" },
  { tilt: "-rotate-[2.5deg]", place: "lg:col-span-7 lg:mt-10" },
];

/** Servicios: una plancha azul entera con etiquetas blancas. "Quiero esto" completa el formulario. */
export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      slapIn("[data-service]", "[data-services]", { stagger: 0.12, start: "top 75%" });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="servicios" aria-labelledby="servicios-title" className="bg-accent text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 id="servicios-title" className="max-w-4xl font-display text-[clamp(3rem,10vw,6rem)] uppercase leading-[1.05]">
            Qué puedo hacer{" "}
            <span className="sticker sticker-white -rotate-2 whitespace-nowrap px-[0.2em] pt-[0.08em] text-accent">por vos</span>
          </h2>
          <p className="max-w-sm text-lg leading-relaxed text-white/85">
            Elegí lo que te sirve y te paso un presupuesto cerrado. Sin letra chica.
          </p>
        </div>

        <ul data-services className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
          {site.services.map((s, i) => (
            <li key={s.id} className={look[i % look.length].place}>
              <div data-service>
                <div
                  className={`sticker sticker-white flex h-full flex-col p-7 text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-0 md:p-9 ${look[i % look.length].tilt}`}
                >
                  <h3 className="font-display text-4xl uppercase leading-none md:text-5xl">{s.name}</h3>
                  <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-ink/75">{s.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.includes.map((inc) => (
                      <li key={inc} className="inline-flex items-center gap-1.5 rounded-full bg-paper-soft px-3 py-1.5 text-sm font-medium">
                        <Icon name="check" className="size-4 text-accent" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => requestDemo({ service: s.id })}
                    className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-accent-deep"
                  >
                    Quiero esto
                    <Icon name="arrow-right" className="size-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
