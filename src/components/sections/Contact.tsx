"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";

/** Contacto: todo en el color de acento, con un "HABLEMOS" gigante que se desliza con el scroll. */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const { email, whatsapp, instagram, linkedin } = site.links;
  const direct = [
    whatsapp && { label: "WhatsApp", href: whatsapp, text: `WhatsApp · ${site.phoneDisplay}` },
    instagram && { label: "Instagram", href: instagram, text: `Instagram · @${instagram.split("/").filter(Boolean).pop()}` },
    email && { label: "Email", href: `mailto:${email}`, text: email },
    linkedin && { label: "LinkedIn", href: linkedin, text: "LinkedIn" },
  ].filter(Boolean) as { label: string; href: string; text: string }[];

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
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contacto" aria-labelledby="contacto-title" className="overflow-hidden bg-accent text-ink">
      <p
        data-big
        aria-hidden
        className="whitespace-nowrap pt-16 font-display text-[26vw] font-extrabold uppercase leading-[0.8] tracking-[-0.005em] md:pt-24"
      >
        Hablemos ✦ Hablemos
      </p>

      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pb-28 pt-14 md:px-10 md:pb-36 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/60">06 — Contacto</p>
          <h2 id="contacto-title" className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.9] md:text-6xl">
            ¿Tenés un negocio?
            <br />
            Hagámosle una web.
          </h2>
          <p className="mt-6 max-w-sm text-lg text-ink/75">
            Contame qué hacés y qué necesitás. Te respondo con ideas y un presupuesto, sin compromiso.
          </p>
          {direct.length > 0 && (
            <ul className="mt-10 space-y-3">
              {direct.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    {...(d.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-xl font-semibold underline decoration-2 underline-offset-8 hover:no-underline"
                  >
                    {d.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
