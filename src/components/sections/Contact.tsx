"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { Magnetic } from "@/components/motion/Magnetic";
import { gsap, useGSAP, prefersReducedMotion, revealChars, riseIn } from "@/components/motion/gsap";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Contacto, sobre negro. Un "Hablemos" gigante que entra letra por letra, un botón redondo magnético a WhatsApp y el formulario en una hoja marfil.
 */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { email, whatsapp, instagram, linkedin } = site.links;
  const direct = [
    whatsapp && { label: "WhatsApp", href: whatsapp, text: site.phoneDisplay, icon: "whatsapp" as const },
    instagram && { label: "Instagram", href: instagram, text: `@${instagram.split("/").filter(Boolean).pop()}`, icon: "instagram" as const },
    email && { label: "Email", href: `mailto:${email}`, text: email, icon: "arrow-up-right" as const },
    linkedin && { label: "LinkedIn", href: linkedin, text: "LinkedIn", icon: "arrow-up-right" as const },
  ].filter(Boolean) as { label: string; href: string; text: string; icon: IconName }[];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealChars(q("[data-big]"));
      gsap.from(q("[data-circle]"), {
        scale: 0,
        rotate: -90,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: q("[data-big]")[0], start: "top 75%", once: true },
      });
      riseIn(q("[data-rise]"), q("[data-rise]")[0], { stagger: 0.08 });
      riseIn(q("[data-card]"), q("[data-card]")[0], { y: 80, start: "top 90%" });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contacto" aria-labelledby="contacto-title" className="overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pt-28 md:px-10 md:pt-40">
        <p className="eyebrow text-paper/60">07 — Contacto</p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-10">
          <h2 id="contacto-title" className="font-serif text-[clamp(4.5rem,17vw,16rem)] leading-[0.85]">
            <span data-big className="block">
              Hablemos<em className="text-sky">.</em>
            </span>
          </h2>
          <div data-circle className="pb-4">
            <Magnetic strength={0.35}>
              <a
                href={site.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Escribime"
                className="group grid size-36 place-items-center rounded-full bg-accent text-center text-white transition-transform duration-500 hover:scale-105 md:size-44"
              >
                <span>
                  <Icon name="whatsapp" className="mx-auto size-7" />
                  <span className="mt-2 block text-sm">WhatsApp</span>
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pb-28 pt-16 md:px-10 md:pb-36 lg:grid-cols-[1fr_1.45fr] lg:gap-20">
        <div>
          <p data-rise className="font-serif text-4xl leading-[1.05] md:text-5xl">
            ¿Tenés un negocio? <em className="text-sky">Hagámosle una web.</em>
          </p>
          <p data-rise className="mt-6 max-w-sm text-lg leading-relaxed text-paper/70">
            Contame qué hacés y qué necesitás. Te respondo con ideas y un presupuesto, sin compromiso.
          </p>
          {direct.length > 0 && (
            <ul data-rise className="mt-12 border-t border-paper/15">
              {direct.map((d) => (
                <li key={d.label} className="border-b border-paper/15">
                  <a
                    href={d.href}
                    {...(d.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={`${d.label}: ${d.text} (se abre en otra pestaña)`}
                    className="group flex items-center gap-4 py-5"
                  >
                    <Icon name={d.icon} className="size-5 text-sky" />
                    <span className="text-sm text-paper/50">{d.label}</span>
                    <span className="text-lg transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-2">{d.text}</span>
                    <Icon name="arrow-up-right" className="ml-auto size-5 text-paper/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-paper" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div data-card className="rounded-[1.25rem] bg-paper p-6 text-ink sm:p-8 md:p-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
