"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { Roll } from "@/components/ui/Roll";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";

const nav = [
  { href: "#trabajos", label: "Trabajos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

/**
 * Barra de arriba: transparente y con los colores invertidos (mix-blend-difference),
 * así se lee igual sobre el marfil y sobre las secciones negras. Se esconde al bajar y vuelve al subir.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > last && y > 200 && !open;
      gsap.to(bar.current, { yPercent: hide ? -120 : 0, duration: 0.5, ease: "power3.out", overwrite: true });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, { dependencies: [open] });

  // Menú de celular: el telón baja y los links suben uno por uno detrás de una máscara.
  useGSAP(
    () => {
      if (!open || prefersReducedMotion()) return;
      gsap
        .timeline()
        .from(menu.current, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut" })
        .from("[data-menu-link]", { yPercent: 110, stagger: 0.06, duration: 0.8, ease: "expo.out" }, "-=0.3");
    },
    { scope: menu, dependencies: [open] },
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 md:h-24 md:px-10">
          <a href="#inicio" className="group flex items-baseline gap-2 font-serif text-2xl md:text-[1.75rem]" aria-label={`${site.name}, ir al inicio`}>
            Emanuel <em className="transition-transform duration-500 group-hover:translate-x-1">Yordi</em>
          </a>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex gap-8">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <a href={item.href} className="group flex items-start gap-1 text-[0.95rem]">
                    <span className="text-[0.65rem] opacity-60">0{i + 1}</span>
                    <Roll>{item.label}</Roll>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <LocalTime className="hidden text-sm opacity-70 xl:inline" />
            <Magnetic>
              <a href="#contacto" className="hidden items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-[0.95rem] transition-colors hover:bg-white hover:text-black md:inline-flex">
                <Roll>Hablemos</Roll>
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="flex h-11 items-center gap-3 text-sm uppercase tracking-[0.14em] md:hidden"
            >
              {open ? "Cerrar" : "Menú"}
              <span aria-hidden className="relative block h-2.5 w-6">
                <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          ref={menu}
          id="menu-movil"
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-5 pb-10 pt-28 text-paper md:hidden"
        >
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a data-menu-link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-1 font-serif text-6xl">
                  <span className="font-sans text-sm text-paper/50">0{i + 1}</span>
                  {i % 2 ? <em>{item.label}</em> : item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-5 border-t border-paper/15 pt-6">
            <a href={site.links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-light w-full px-6 py-4 text-lg">
              Escribime por WhatsApp
            </a>
            <LocalTime className="block text-sm text-paper/60" />
          </div>
        </div>
      )}
    </>
  );
}
