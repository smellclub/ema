"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, revealTitle, riseIn } from "@/components/motion/gsap";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";

const icons: Record<string, IconName> = {
  basquet: "ball",
  perfumes: "bottle",
  marketing: "megaphone",
  negocios: "chart",
};

/**
 * Sobre mí. El texto se "enciende" palabra por palabra mientras scrolleás,
 * y abajo, cuatro tarjetas con lo que hago fuera de la pantalla.
 */
export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealTitle(root.current!.querySelectorAll("[data-title]"));
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: "[data-manifesto]", start: "top 75%", end: "bottom 45%", scrub: true },
        },
      );
      riseIn("[data-off]", "[data-offs]", { stagger: 0.1 });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sobre-mi" aria-labelledby="sobre-title" className="rule">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <SectionHead id="sobre-title" index="02" eyebrow="Sobre mí" title={<>Quién <span className="text-accent">soy</span></>} />
        <p
          data-manifesto
          className="mt-12 max-w-5xl text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] md:mt-16 md:text-5xl md:leading-[1.12]"
        >
          {site.manifesto.split(" ").map((w, i) => (
            <span key={i} data-w className="inline-block whitespace-pre">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-24 md:mt-32">
          <h3 className="font-display text-3xl md:text-4xl">Fuera de la pantalla</h3>
          <ul data-offs className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.offScreen.map((item, i) => (
              <li
                key={item.id}
                data-off
                className={`group rounded-[1.5rem] p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 md:p-7 ${
                  i === 1 ? "bg-accent text-white" : i === 3 ? "bg-ink text-white" : "border border-line bg-white"
                }`}
              >
                <span
                  className={`grid size-12 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110 ${
                    i === 1 || i === 3 ? "bg-white/15 text-white" : "bg-accent-soft text-accent"
                  }`}
                >
                  <Icon name={icons[item.id] ?? "check"} className="size-6" />
                </span>
                <p className="mt-10 font-display text-2xl md:text-3xl">{item.title}</p>
                <p className={`mt-2 leading-snug ${i === 1 || i === 3 ? "text-white/80" : "text-muted"}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
