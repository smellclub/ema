"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { gsap, useGSAP, prefersReducedMotion, slapIn } from "@/components/motion/gsap";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Contacto: plancha azul, una fila de stickers "HABLEMOS" que se desliza con el scroll y el formulario en un sticker blanco. */
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
      gsap.fromTo(
        "[data-big]",
        { xPercent: 10 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      slapIn("[data-card]", "[data-card]", { start: "top 85%" });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contacto" aria-labelledby="contacto-title" className="overflow-hidden bg-accent text-white">
      <div data-big aria-hidden className="flex w-max gap-[0.35em] pt-16 font-display text-[18vw] uppercase leading-none md:pt-24 md:text-[13vw]">
        {["Hablemos", "Hablemos", "Hablemos"].map((w, i) => (
          <span
            key={i}
            className={`sticker px-[0.18em] pt-[0.1em] ${i % 2 ? "sticker-ink rotate-2" : "sticker-white -rotate-2 text-accent"}`}
          >
            {w}
          </span>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pb-28 pt-16 md:px-10 md:pb-36 lg:grid-cols-[1fr_1.45fr] lg:gap-20">
        <div>
          <h2 id="contacto-title" className="font-display text-[clamp(2.5rem,6vw,4.25rem)] uppercase leading-[1.05]">
            ¿Tenés un negocio? Hagámosle una web.
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/85">
            Contame qué hacés y qué necesitás. Te respondo con ideas y un presupuesto, sin compromiso.
          </p>
          {direct.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-4">
              {direct.map((d, i) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    {...(d.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={`${d.label}: ${d.text} (se abre en otra pestaña)`}
                    className={`sticker sticker-white inline-flex items-center gap-3 px-5 py-3.5 text-lg font-semibold transition-transform duration-300 hover:rotate-0 hover:scale-105 ${i % 2 ? "rotate-2" : "-rotate-2"}`}
                  >
                    <Icon name={d.icon} className="size-6 text-accent" />
                    {d.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div data-card>
          <div className="sticker sticker-white block rotate-[0.6deg] p-6 text-ink sm:p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
