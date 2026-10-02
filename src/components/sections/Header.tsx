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
      gsap.from("[data-menu-link]", { scale: 1.5, rotate: (i: number) => (i % 2 ? 12 : -12), autoAlpha: 0, stagger: 0.07, duration: 0.5, ease: "back.out(2.4)" });
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
          {/* Logo: un sticker redondo con las iniciales. Gira un poco al pasar el mouse. */}
          <span className="sticker sticker-blue grid size-11 place-items-center !rounded-full font-display text-lg transition-transform duration-500 group-hover:-rotate-12 md:size-12">
            EY
          </span>
          <span className="hidden rounded-full bg-paper/85 px-2 py-1 font-display text-xl uppercase backdrop-blur-sm sm:block">{site.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-1 rounded-full bg-paper/90 p-1 shadow-[0_0_0_1px_var(--color-line),0_10px_24px_-14px_rgb(13_15_26/0.35)] backdrop-blur-md">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full px-4 py-2 text-[0.95rem] font-semibold text-ink/75 transition-colors hover:bg-accent hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <LocalTime className="hidden rounded-full bg-paper/85 px-2 py-1 text-sm text-muted backdrop-blur-sm xl:inline" />
          <a
            href="#contacto"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_20px_-10px_rgb(31_59_255/0.8)] transition-[transform,background-color] hover:-rotate-3 hover:bg-accent-deep md:inline-block"
          >
            Hablemos
          </a>
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

      {open && (
        <div
          ref={menu}
          id="menu-movil"
          className="fixed inset-0 top-16 z-40 flex flex-col justify-between overflow-y-auto bg-accent px-5 pb-10 pt-10 text-white md:hidden"
        >
          <ul className="space-y-5">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  data-menu-link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`sticker sticker-white font-display text-5xl uppercase leading-none px-4 pb-1 pt-3 ${i % 2 ? "rotate-2" : "-rotate-2"}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <LocalTime className="text-base text-white/85" />
        </div>
      )}
    </header>
  );
}
