"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { Magnetic } from "@/components/motion/Magnetic";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";

const nav = [
  { href: "#trabajos", label: "Trabajos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  // La barra se esconde al bajar y vuelve al subir; la línea de abajo muestra cuánto leíste.
  useGSAP(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (prefersReducedMotion()) return;
      const hide = y > last && y > 200;
      gsap.to(bar.current, { yPercent: hide ? -110 : 0, duration: 0.4, ease: "power3.out", overwrite: true });
      last = y;
    };
    let last = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Menú de celular: los links suben uno por uno detrás de una máscara.
  useGSAP(
    () => {
      if (!open || prefersReducedMotion()) return;
      gsap.from("[data-menu-link]", { yPercent: 110, stagger: 0.06, duration: 0.7, ease: "expo.out" });
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
    <header ref={bar} className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 md:h-20 md:px-10">
        <a href="#inicio" className="group flex items-center gap-3" aria-label={`${site.name}, ir al inicio`}>
          {/* Logo: las iniciales en un cuadradito azul que gira al pasar el mouse. */}
          <span className="grid size-10 place-items-center rounded-xl bg-accent font-display text-base text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-[10deg] group-hover:scale-105">
            EY
          </span>
          <span className="hidden rounded-full bg-paper/80 px-2 py-1 font-display text-lg backdrop-blur-sm sm:block">{site.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-1 rounded-full border border-line bg-paper/85 p-1 shadow-[0_10px_30px_-18px_rgb(10_12_24/0.4)] backdrop-blur-md">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full px-4 py-2 text-[0.95rem] font-semibold text-ink/70 transition-colors hover:bg-ink hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <LocalTime className="hidden rounded-full bg-paper/80 px-2 py-1 text-sm text-muted backdrop-blur-sm xl:inline" />
          <Magnetic>
            <a href="#contacto" className="btn hidden px-5 py-2.5 text-[0.95rem] md:inline-flex">
              Hablemos
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="flex size-11 items-center justify-center rounded-full bg-ink text-white md:hidden"
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-white transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-white transition-transform ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Progreso de lectura: azul que termina en mandarina. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-0.5">
        <div ref={progress} className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent to-hot" />
      </div>

      {open && (
        <div
          ref={menu}
          id="menu-movil"
          className="fixed inset-0 top-16 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-5 pb-10 pt-10 text-white md:hidden"
        >
          <ul className="space-y-3">
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  data-menu-link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1 font-display text-5xl"
                >
                  <span className="text-base font-semibold text-hot">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            <a href={site.links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-light w-full px-6 py-4 text-lg">
              Escribime por WhatsApp
            </a>
            <LocalTime className="block text-base text-white/70" />
          </div>
        </div>
      )}
    </header>
  );
}
