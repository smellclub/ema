"use client";

import Link from "next/link";
import { useRef } from "react";
import { site } from "@/config/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { Icon } from "@/components/ui/Icon";
import { Roll } from "@/components/ui/Roll";
import { useGSAP, prefersReducedMotion, revealChars } from "@/components/motion/gsap";

export function Footer() {
  const links = Object.entries(site.links).filter(([, v]) => v && !v.startsWith("mailto")) as [string, string][];
  const names: Record<string, string> = { email: "Email", whatsapp: "WhatsApp", instagram: "Instagram", linkedin: "LinkedIn", github: "GitHub" };

  const root = useRef<HTMLElement>(null);
  // El nombre gigante del final entra letra por letra cuando llegás abajo de todo.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealChars(root.current!.querySelectorAll("[data-wordmark]"), { trigger: root.current! });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-white/10 bg-ink pt-20 text-paper">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 md:grid-cols-3 md:px-10">
        <div>
          <p className="eyebrow text-paper/50">Navegá</p>
          <ul className="mt-4 space-y-2">
            {[
              ["#trabajos", "Trabajos"],
              ["#servicios", "Servicios"],
              ["#sobre-mi", "Sobre mí"],
              ["#contacto", "Contacto"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="link-line text-lg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-paper/50">En internet</p>
          <ul className="mt-4 space-y-2">
            {links.map(([key, href]) => (
              <li key={key}>
                <a
                  href={key === "email" ? `mailto:${href}` : href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line text-lg"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {names[key] ?? key}
                    <Icon name="arrow-up-right" className="size-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <p className="eyebrow text-paper/50">Hora local</p>
          <LocalTime className="mt-4 block font-serif text-3xl text-paper/80" />
          <a href="#inicio" className="btn btn-light group mt-6 px-5 py-2.5 text-sm">
            <Roll>Volver arriba</Roll>
            <Icon name="arrow-up" className="size-4 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <p aria-hidden className="mt-20 select-none whitespace-nowrap px-5 font-serif text-[16vw] leading-[0.85] md:px-10">
        <span data-wordmark className="block">
          Emanuel <em className="text-sky">Yordi</em>
        </span>
      </p>

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-3 border-t border-paper/15 px-5 py-6 text-sm text-paper/50 md:flex-row md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {site.name} · Diseñado y programado por mí.
        </p>
        <p className="flex gap-5">
          <Link href="/privacidad" className="underline-offset-4 hover:text-paper hover:underline">
            Privacidad
          </Link>
          <span>Black Line, Basalto y VOLTIO son demos: negocios inventados.</span>
        </p>
      </div>
    </footer>
  );
}
