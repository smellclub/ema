"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { site } from "@/config/site";
import { gsap, useGSAP, prefersReducedMotion, revealTitle, riseIn } from "@/components/motion/gsap";
import { requestDemo } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";
import { Roll } from "@/components/ui/Roll";

/** Qué servicio del formulario se parece a cada trabajo (para el botón "Quiero una así"). */
const serviceFor: Record<string, string> = {
  "black-line": "reservas",
  basalto: "reservas",
  voltio: "reservas",
  "smell-club": "landing",
};

/**
 * Trabajos, sobre negro. En compu la sección se queda fija y los trabajos pasan de costado
 * mientras scrolleás (galería horizontal), con un contador y una barra de progreso.
 * Cada captura se mueve un poco dentro de su marco (parallax) y al pasar el mouse recorre la web entera.
 * En celular (o con "reducir movimiento") es una lista normal hacia abajo.
 */
export function Work() {
  const root = useRef<HTMLElement>(null);
  const projects = site.projects;
  const total = String(projects.length).padStart(2, "0");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      revealTitle(q("[data-title]"));
      riseIn(q("[data-intro]"), q("[data-intro]")[0], { start: "top 85%" });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = q("[data-track]")[0];
        const pin = q("[data-pin]")[0];
        track.dataset.h = pin.dataset.h = "on";
        const distance = () => track.scrollWidth - window.innerWidth;
        const counter = q("[data-current]")[0];
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-pin]")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const n = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1);
              counter.textContent = String(n).padStart(2, "0");
            },
          },
        });
        gsap.to(q("[data-progress]"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: q("[data-pin]")[0], start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        // Dentro de cada marco la imagen se desliza al revés que la galería: da profundidad.
        q("[data-panel]").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector("[data-shot]"),
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.from(panel.querySelectorAll("[data-meta]"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left 75%", once: true },
          });
        });
        return () => {
          delete track.dataset.h;
          delete pin.dataset.h;
        };
      });

      // En celular: cada marco se destapa al entrar.
      mm.add("(max-width: 1023px)", () => {
        q("[data-panel]").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector("[data-frame]"),
            { clipPath: "inset(10% 6% 10% 6% round 1rem)" },
            { clipPath: "inset(0% 0% 0% 0% round 1rem)", ease: "none", scrollTrigger: { trigger: panel, start: "top 90%", end: "top 45%", scrub: 0.5 } },
          );
          riseIn(panel.querySelectorAll("[data-meta]"), panel, { start: "top 60%", stagger: 0.06 });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="trabajos" aria-labelledby="trabajos-title" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pb-12 pt-28 md:px-10 md:pt-40">
        <p className="eyebrow text-paper/60">01 — Trabajos</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 id="trabajos-title" data-title className="font-serif text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.92]">
            Lo que <em className="text-sky">ya hice</em>
          </h2>
          <p data-intro className="max-w-sm text-lg leading-relaxed text-paper/70">
            Tres demos de negocios inventados para mostrar lo que puedo hacer, y la tienda de mi propia marca. Tocá
            cualquiera para abrirla.
          </p>
        </div>
      </div>

      <div data-pin className="group/pin relative data-[h=on]:flex data-[h=on]:h-svh data-[h=on]:flex-col data-[h=on]:justify-center data-[h=on]:overflow-hidden">
        <div
          data-track
          className="grid gap-24 px-5 pb-28 md:px-10 data-[h=on]:flex data-[h=on]:w-max data-[h=on]:gap-[6vw] data-[h=on]:pb-0 data-[h=on]:pr-[16vw]"
        >
          {projects.map((p, i) => {
            const demo = p.tag === "Demo";
            return (
              <article key={p.id} data-panel aria-labelledby={`p-${p.id}`} className="lg:w-[min(56vw,calc((100svh-22rem)*1.6))] lg:shrink-0">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Ver"
                  aria-label={`Abrir ${p.name} (se abre en otra pestaña)`}
                  className="group block"
                >
                  <div data-frame className="relative overflow-hidden rounded-[1rem] bg-ink-soft">
                    <div
                      className="relative aspect-[16/10] overflow-hidden"
                      style={
                        {
                          // Cuánto tiene que subir la captura para llegar al final (el marco mide 1440×900).
                          "--shift": `-${((1 - 900 / p.images.fullHeight) * 100).toFixed(2)}%`,
                          "--dur": `${Math.round(p.images.fullHeight / 1400)}s`,
                        } as CSSProperties
                      }
                    >
                      <div data-shot className="absolute -inset-x-[7%] top-0">
                        <Image
                          src={p.images.full}
                          alt={`Captura de la web de ${p.name}`}
                          width={1440}
                          height={p.images.fullHeight}
                          sizes="(min-width: 1024px) 72vw, 100vw"
                          className="scroll-shot h-auto w-full transition-[filter] duration-700 group-hover:brightness-105"
                        />
                      </div>
                    </div>
                    {/* La etiqueta "Demo" queda siempre a la vista, arriba a la izquierda. */}
                    <span
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md ${
                        demo ? "bg-ink/70 text-paper" : "bg-accent text-white"
                      }`}
                    >
                      {demo ? "Demo · negocio inventado" : p.tag}
                    </span>
                  </div>
                </a>

                <div className="mt-7 grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
                  <span data-meta className="font-serif text-2xl italic text-sky">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div data-meta className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 id={`p-${p.id}`} className="font-serif text-5xl leading-none md:text-6xl">
                        {p.name}
                      </h3>
                      <span className="text-sm text-paper/60">
                        {p.kind} · {p.year}
                      </span>
                    </div>
                    <p data-meta className="mt-4 max-w-[52ch] leading-relaxed text-paper/70">
                      {p.summary}
                    </p>
                    <p data-meta className="mt-4 text-sm text-paper/50">
                      {p.features.join("  ·  ")}
                    </p>
                    <div data-meta className="mt-6 flex flex-wrap gap-3">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-light group px-6 py-3 text-sm">
                        <Roll>Ver la web</Roll>
                        <Icon name="arrow-up-right" className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                      </a>
                      {demo && (
                        <button
                          type="button"
                          onClick={() =>
                            requestDemo({
                              service: serviceFor[p.id],
                              message: `Quiero una web como ${p.name} para mi negocio.`,
                            })
                          }
                          className="btn btn-outline px-6 py-3 text-sm [--btn-hover:var(--color-paper)] hover:!text-ink"
                        >
                          <Roll>Quiero una así</Roll>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Contador y barra de progreso de la galería (solo en compu, mientras está fija). */}
        <div aria-hidden className="hidden items-center gap-6 px-10 pt-8 group-data-[h=on]/pin:flex">
          <span className="font-serif text-xl tabular-nums">
            <span data-current>01</span> <span className="text-paper/40">/ {total}</span>
          </span>
          <span className="h-px flex-1 bg-paper/15">
            <span data-progress className="block h-full origin-left scale-x-0 bg-paper" />
          </span>
          <span className="text-sm text-paper/50">Seguí bajando</span>
        </div>
      </div>
    </section>
  );
}
