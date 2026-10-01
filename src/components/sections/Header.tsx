"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { LocalTime } from "@/components/ui/LocalTime";
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

  // La barra se esconde al bajar y vuelve al subir: más espacio para el contenido.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > last && y > 200;
      gsap.to(bar.current, { yPercent: hide ? -110 : 0, duration: 0.4, ease: "power3.out", overwrite: true });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Menú de celular: los links suben uno por uno.
  useGSAP(
    () => {
      if (!open || prefersReducedMotion()) return;
      gsap.from("[data-menu-link]", { yPercent: 100, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power4.out" });
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
    <header ref={bar} className="fixed inset-x-0 top-0 z-50 mix-blend-normal">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 md:h-20 md:px-10">
        <a href="#inicio" className="font-display text-2xl font-extrabold uppercase tracking-tight">
          {site.name}
          <sup className="ml-0.5 text-xs text-accent">©</sup>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-1 rounded-full border border-line bg-ink/70 p-1 backdrop-blur-md">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full px-4 py-2 text-sm text-paper/80 transition-colors hover:bg-paper hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <LocalTime className="hidden text-xs uppercase tracking-widest text-muted lg:inline" />
          <a
            href="#contacto"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105 md:inline-block"
          >
            Hablemos
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="flex size-11 items-center justify-center rounded-full bg-accent text-ink md:hidden"
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={menu}
          id="menu-movil"
          className="fixed inset-0 top-16 z-40 flex flex-col justify-between bg-accent px-5 pb-10 pt-8 text-ink md:hidden"
        >
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  data-menu-link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block font-display text-6xl font-extrabold uppercase leading-[1.05]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LocalTime className="text-sm uppercase tracking-widest" />
        </div>
      )}
    </header>
  );
}
