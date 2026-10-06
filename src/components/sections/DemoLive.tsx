"use client";

import { useId, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion, revealTitle, riseIn } from "@/components/motion/gsap";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";
import { Roll } from "@/components/ui/Roll";

/** Estilos que el visitante puede probar en su demo: color de fondo, de texto y de botón. */
const styles = [
  { name: "Noche", bg: "#0f0f11", fg: "#f4f1ea", btn: "#f4f1ea", btnFg: "#0f0f11" },
  { name: "Azul", bg: "#2b44ff", fg: "#ffffff", btn: "#ffffff", btnFg: "#2b44ff" },
  { name: "Arena", bg: "#e9dfcc", fg: "#2a2118", btn: "#2a2118", btnFg: "#e9dfcc" },
  { name: "Bosque", bg: "#1f3b2d", fg: "#eef2e6", btn: "#d8e8a8", btnFg: "#1f3b2d" },
];

/** "Peluquería Sol" → "peluqueriasol": para armar la dirección de la demo. */
function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * La demo en vivo: el visitante escribe el nombre de su negocio, elige un estilo y ve su web
 * armarse al instante en una ventana de navegador. Es la demo con su marca que ofrezco, en chiquito.
 * "Quiero mi demo" lo lleva al formulario con el nombre ya completado.
 */
export function DemoLive() {
  const root = useRef<HTMLElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const [business, setBusiness] = useState("");
  const [look, setLook] = useState(0);
  const inputId = useId();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealTitle(q("[data-title]"));
      riseIn(q("[data-rise]"), q("[data-rise]")[0], { stagger: 0.08 });
      // La ventana entra inclinada en 3D y se endereza mientras scrolleás.
      gsap.fromTo(
        win.current,
        { rotateX: 18, rotateY: -14, yPercent: 12, scale: 0.92 },
        {
          rotateX: 0,
          rotateY: 0,
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "center center", scrub: 0.8 },
        },
      );
    },
    { scope: root },
  );

  // Cada vez que cambia el estilo, la "web" hace un pequeño barrido, como si se recargara.
  const pick = (i: number) => {
    setLook(i);
    if (prefersReducedMotion()) return;
    gsap.fromTo(win.current!.querySelectorAll("[data-sweep] > *"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out", stagger: 0.04 });
  };

  const name = business.trim() || "Tu negocio";
  const address = `${slug(business) || "tunegocio"}.com.uy`;
  const s = styles[look];
  const fontSize = `${Math.max(1.9, Math.min(4.2, 34 / Math.max(name.length, 8))).toFixed(2)}rem`;

  return (
    <section ref={root} id="demo" aria-labelledby="demo-title" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow text-muted">02 — Probalo</p>
          <h2 id="demo-title" data-title className="mt-6 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92]">
            Tu web, <em className="text-accent">en vivo</em>
          </h2>
          <p data-rise className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Escribí el nombre de tu negocio y elegí un estilo. Así trabajo: antes de que pagues nada, ves tu web con tu
            marca.
          </p>

          <form
            data-rise
            onSubmit={(e) => {
              e.preventDefault();
              requestDemo({ business: business.trim() });
            }}
            className="mt-10 max-w-md"
          >
            <label htmlFor={inputId} className="text-sm font-medium">
              ¿Cómo se llama tu negocio?
            </label>
            <input
              id={inputId}
              value={business}
              onChange={(e) => setBusiness(e.target.value.slice(0, 40))}
              maxLength={40}
              autoComplete="organization"
              placeholder="Ej: Peluquería Sol"
              className="field text-2xl"
            />
            <div className="mt-8">
              <p id={`${inputId}-look`} className="text-sm font-medium">
                Estilo
              </p>
              <div role="radiogroup" aria-labelledby={`${inputId}-look`} className="mt-3 flex flex-wrap gap-2">
                {styles.map((st, i) => (
                  <button
                    key={st.name}
                    type="button"
                    role="radio"
                    aria-checked={look === i}
                    onClick={() => pick(i)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                      look === i ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                    }`}
                  >
                    <span className="size-3.5 rounded-full ring-1 ring-black/10" style={{ background: st.bg }} />
                    {st.name}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn group mt-10 px-7 py-4">
              <Roll>Quiero mi demo</Roll>
              <Icon name="arrow-right" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </form>
        </div>

        <div className="[perspective:1400px]">
          <div ref={win} className="browser [transform-style:preserve-3d]">
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
            {/* La "web" del visitante: cambia de estilo y nombre al instante. */}
            <div aria-live="polite" className="transition-colors duration-700" style={{ background: s.bg, color: s.fg }}>
              <div data-sweep className="p-6 sm:p-10">
                <div className="flex items-center justify-between text-xs opacity-80">
                  <span className="truncate font-serif text-base">{name}</span>
                  <span className="hidden gap-5 sm:flex">
                    <span>Inicio</span>
                    <span>Servicios</span>
                    <span>Contacto</span>
                  </span>
                </div>
                <p className="mt-14 text-xs uppercase tracking-[0.2em] opacity-70">Bienvenidos</p>
                <p className="mt-3 break-words font-serif leading-[0.95]" style={{ fontSize }}>
                  {name}
                </p>
                <p className="mt-4 max-w-[30ch] text-sm opacity-80">Reservá, comprá o escribinos en un toque, desde el celular.</p>
                <div className="mt-7 flex gap-2">
                  <span className="rounded-full px-5 py-2.5 text-xs font-semibold" style={{ background: s.btn, color: s.btnFg }}>
                    Reservá ahora
                  </span>
                  <span className="rounded-full px-5 py-2.5 text-xs font-semibold shadow-[inset_0_0_0_1px_currentColor]">WhatsApp</span>
                </div>
                <div className="mt-12 grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="aspect-[4/3] rounded-lg" style={{ background: s.fg, opacity: 0.1 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
