"use client";

import { useRef } from "react";
import { site } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { gsap, useGSAP, prefersReducedMotion, revealTitle, riseIn } from "@/components/motion/gsap";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Contacto: zona oscura, un "Hablemos" gigante que se desliza con el scroll y el formulario en una tarjeta blanca. */
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
        { xPercent: 5 },
        {
          xPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      revealTitle(root.current!.querySelectorAll("[data-title]"));
      riseIn("[data-card]", "[data-card]", { start: "top 85%", y: 60 });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contacto" aria-labelledby="contacto-title" className="overflow-hidden bg-ink text-white">
      {/* "Hablemos" gigante: una palabra llena, otra solo con el contorno. */}
      <div data-big aria-hidden className="flex w-max items-center gap-[0.3em] pt-20 font-display text-[19vw] leading-none md:pt-28 md:text-[13vw]">
        {["Hablemos", "Hablemos", "Hablemos"].map((w, i) => (
          <span key={i} className="flex items-center gap-[0.3em]">
            <span className={i % 2 ? "text-transparent [-webkit-text-stroke:2px_var(--color-sky)]" : ""}>{w}</span>
            <span className="size-[0.18em] rounded-full bg-hot" />
          </span>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 pb-28 pt-16 md:px-10 md:pb-36 lg:grid-cols-[1fr_1.45fr] lg:gap-20">
        <div>
          <p className="eyebrow text-white/70">(06) Contacto</p>
          <h2 id="contacto-title" data-title className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[0.98]">
            ¿Tenés un negocio? Hagámosle una <span className="text-sky">web.</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/75">
            Contame qué hacés y qué necesitás. Te respondo con ideas y un presupuesto, sin compromiso.
          </p>
          {direct.length > 0 && (
            <ul className="mt-10 space-y-3">
              {direct.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    {...(d.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={`${d.label}: ${d.text} (se abre en otra pestaña)`}
                    className="group flex max-w-sm items-center gap-4 rounded-2xl border border-white/12 bg-night px-5 py-4 transition-colors hover:border-sky/60 hover:bg-white/[0.06]"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform duration-500 group-hover:rotate-[-12deg]">
                      <Icon name={d.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-white/60">{d.label}</span>
                      <span className="block text-lg font-semibold">{d.text}</span>
                    </span>
                    <Icon name="arrow-up-right" className="ml-auto size-5 text-white/50 transition-all group-hover:rotate-45 group-hover:text-hot" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div data-card className="rounded-[1.75rem] bg-white p-6 text-ink shadow-[0_40px_80px_-40px_rgb(43_68_255/0.6)] sm:p-8 md:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
