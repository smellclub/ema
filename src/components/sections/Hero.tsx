"use client";

import { useId, useRef, useState } from "react";
import { site } from "@/config/site";
import { onPreloaderDone } from "@/components/motion/Preloader";
import { Magnetic } from "@/components/motion/Magnetic";
import { gsap, useGSAP, prefersReducedMotion, revealTitle } from "@/components/motion/gsap";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";

/** Colores que el visitante puede probar en su demo. El primero es el de la casa. */
const swatches = [
  { name: "Azul", bg: "#2b44ff", fg: "#ffffff" },
  { name: "Mandarina", bg: "#ff5c28", fg: "#ffffff" },
  { name: "Verde", bg: "#0f7a4f", fg: "#ffffff" },
  { name: "Negro", bg: "#0a0c18", fg: "#ffffff" },
];

const perks = ["Demo gratis antes de pagar", "Rápida en el celular", "Lista para Google"];

/** "Peluquería Sol" → "peluqueriasol": para armar la dirección de la demo. */
function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Portada. A la izquierda la promesa; a la derecha, sobre un bloque azul, una ventana de navegador
 * con la web del visitante: escribe el nombre de su negocio, elige un color y la ve armarse en vivo.
 * Es la demo con su marca que ofrezco, en chiquito. El botón lo lleva al formulario ya completado.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const demo = useRef<HTMLDivElement>(null);
  const [business, setBusiness] = useState("");
  const [color, setColor] = useState(0);
  const inputId = useId();
  const { hero } = site;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (prefersReducedMotion()) {
        q("[data-mark]").forEach((m) => m.setAttribute("data-mark", "on"));
        return;
      }
      gsap.set(q("[data-in]"), { autoAlpha: 0 });
      const off = onPreloaderDone(() => {
        revealTitle(q("[data-title]"), { now: true });
        gsap.delayedCall(0.7, () => q("[data-mark]").forEach((m) => m.setAttribute("data-mark", "on")));
        gsap
          .timeline({ delay: 0.25, defaults: { ease: "expo.out" } })
          .fromTo(q("[data-in='rise']"), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 })
          // El bloque azul se "abre" de abajo hacia arriba y la ventana entra encima.
          .fromTo(q("[data-in='panel']"), { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0% round 2rem)" }, { clipPath: "inset(0% 0% 0% 0% round 2rem)", duration: 1.1, ease: "expo.inOut" }, 0)
          .fromTo(q("[data-in='window']"), { autoAlpha: 0, y: 60, rotate: -3 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1.1 }, 0.55);
      });

      // En compu, la ventana se inclina un poco siguiendo al mouse (efecto 3D sutil).
      const el = demo.current;
      if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return off;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
      const panel = el.parentElement!;
      const move = (e: PointerEvent) => {
        const r = panel.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      };
      const reset = () => {
        rx(0);
        ry(0);
      };
      panel.addEventListener("pointermove", move);
      panel.addEventListener("pointerleave", reset);
      return () => {
        off();
        panel.removeEventListener("pointermove", move);
        panel.removeEventListener("pointerleave", reset);
      };
    },
    { scope: root },
  );

  const name = business.trim() || "Tu negocio";
  const address = `${slug(business) || "tunegocio"}.com.uy`;
  const c = swatches[color];
  // Cuanto más largo el nombre, más chica la letra, para que siempre entre.
  const fontSize = `${Math.max(1.6, Math.min(3.6, 30 / Math.max(name.length, 8))).toFixed(2)}rem`;

  return (
    <section
      ref={root}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative px-5 pb-16 pt-28 md:px-10 md:pt-32 lg:flex lg:min-h-svh lg:items-center lg:pb-14"
    >
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <p data-in="rise" className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-semibold">
            <span className="relative flex size-2.5">
              <span className="ping absolute inline-flex size-full rounded-full bg-hot opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-hot" />
            </span>
            {site.availability}
          </p>

          <h1
            id="hero-title"
            data-title
            data-mark="off"
            className="mt-7 font-display text-[clamp(3.2rem,13vw,5.5rem)] leading-[0.95] sm:text-[clamp(4rem,10vw,7rem)] lg:text-[clamp(4.5rem,6.6vw,7.25rem)]"
          >
            {hero.lines.slice(0, -1).join(" ")}{" "}
            <span className="marker text-accent">
              {hero.lines.at(-1)}
            </span>
          </h1>

          <p data-in="rise" className="mt-8 max-w-lg text-lg leading-relaxed text-muted md:text-xl">
            {hero.intro}
          </p>

          <div data-in="rise" className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic>
              <a href="#trabajos" className="btn btn-ink group px-7 py-4 text-lg">
                Ver mis trabajos
                <Icon name="arrow-down" className="size-5 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <a
              href={site.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-lg font-semibold underline decoration-accent decoration-2 underline-offset-[6px] hover:decoration-hot"
            >
              <Icon name="whatsapp" className="size-5 text-accent" />
              Escribime por WhatsApp
            </a>
          </div>

          <ul data-in="rise" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-medium text-ink/75">
            {perks.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <Icon name="check" className="size-4 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* La demo en vivo, sobre un bloque azul grande (el color fuerte de la marca, ocupando espacio de verdad). */}
        <div
          data-in="panel"
          className="relative rounded-[2rem] bg-accent px-5 pb-6 pt-10 [perspective:1200px] sm:px-10 sm:pb-10 sm:pt-14"
        >
          {/* Grilla de puntos sobre el azul: textura sin ruido. */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[2rem] opacity-30 [background-image:radial-gradient(rgb(255_255_255/0.35)_1px,transparent_1px)] [background-size:22px_22px]"
          />
          <p className="relative mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-white/85">Probalo: tu web en vivo</p>

          <div ref={demo} data-in="window" className="relative [transform-style:preserve-3d]">
            <div className="float">
              <div className="browser">
                <div className="browser-bar">
                  <i />
                  <i />
                  <i />
                  <span className="ml-3 flex h-7 flex-1 items-center truncate rounded-full bg-white px-3 text-xs text-muted">
                    <svg viewBox="0 0 24 24" aria-hidden className="mr-1.5 size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    {address}
                  </span>
                </div>
                {/* La "web" del visitante: cambia de color y nombre al instante. */}
                <div aria-live="polite" className="p-5 transition-colors duration-500 sm:p-7" style={{ background: c.bg, color: c.fg }}>
                  <div className="flex items-center justify-between text-[0.7rem] font-semibold opacity-85">
                    <span className="truncate">{name}</span>
                    <span className="hidden gap-3 sm:flex">
                      <span>Inicio</span>
                      <span>Servicios</span>
                      <span>Contacto</span>
                    </span>
                  </div>
                  <p className="mt-8 break-words font-display leading-[0.95]" style={{ fontSize }}>
                    {name}
                  </p>
                  <p className="mt-3 max-w-[24ch] text-sm opacity-85">Reservá, comprá o escribinos en un toque, desde el celular.</p>
                  <div className="mt-5 flex gap-2">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-bold" style={{ color: c.bg === "#0a0c18" ? "#0a0c18" : c.bg }}>
                      Reservá ahora
                    </span>
                    <span className="rounded-full px-4 py-2 text-xs font-bold shadow-[inset_0_0_0_1.5px_currentColor]">WhatsApp</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-white p-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-10 rounded-lg bg-paper-soft sm:h-14" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestDemo({ business: business.trim() });
            }}
            className="relative mt-7 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-24px_rgb(10_12_24/0.6)] sm:p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <label htmlFor={inputId} className="text-base font-semibold">
                ¿Cómo se llama tu negocio?
              </label>
              <div role="radiogroup" aria-label="Color de tu web" className="flex gap-1.5">
                {swatches.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    role="radio"
                    aria-checked={color === i}
                    aria-label={s.name}
                    onClick={() => setColor(i)}
                    className={`size-6 rounded-full transition-transform hover:scale-110 ${color === i ? "ring-2 ring-ink ring-offset-2" : ""}`}
                    style={{ background: s.bg }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
              <input
                id={inputId}
                value={business}
                onChange={(e) => setBusiness(e.target.value.slice(0, 40))}
                maxLength={40}
                autoComplete="organization"
                placeholder="Ej: Peluquería Sol"
                className="field"
              />
              <button type="submit" className="btn group shrink-0 px-6 py-3.5 sm:mt-2">
                Quiero mi demo
                <Icon name="arrow-right" className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="mt-3 text-sm text-muted">Te la muestro con tu marca antes de que pagues nada.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
