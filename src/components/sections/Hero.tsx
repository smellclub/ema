"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/config/site";
import { onPreloaderDone } from "@/components/motion/Preloader";
import { Magnetic } from "@/components/motion/Magnetic";
import { gsap, useGSAP, prefersReducedMotion, revealChars } from "@/components/motion/gsap";
import { Icon } from "@/components/ui/Icon";
import { Roll } from "@/components/ui/Roll";

// Los celulares del abanico: tres trabajos, cada uno con su giro y su profundidad (cuánto se mueve con el mouse).
const fan = [
  { id: "voltio", rotate: -9, x: "-62%", depth: 18 },
  { id: "black-line", rotate: 0, x: "0%", depth: 34 },
  { id: "basalto", rotate: 9, x: "62%", depth: 18 },
];

/**
 * Portada. Título gigante en serif que entra letra por letra; la palabra en cursiva va cambiando
 * (vender, reservar, crecer). A la derecha, un abanico de celulares con mis trabajos que se abre
 * al cargar y sigue al mouse con profundidad. Al bajar, toda la portada se aleja un poco.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { hero } = site;
  const phones = fan.map((f) => ({ ...f, project: site.projects.find((p) => p.id === f.id)! }));

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-in]"), { autoAlpha: 0 });
      gsap.set(q("[data-phone]"), { x: 0, xPercent: 0, yPercent: 60, autoAlpha: 0, rotate: 0 });

      const off = onPreloaderDone(() => {
        revealChars(q("[data-title]"), { now: true });
        gsap
          .timeline({ delay: 0.5, defaults: { ease: "expo.out" } })
          .fromTo(q("[data-in]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 })
          // El abanico se abre: los celulares suben juntos y después cada uno se va a su lugar.
          .to(q("[data-phone]"), { yPercent: 0, autoAlpha: 1, duration: 1.2, stagger: 0.08 }, 0.1)
          .to(q("[data-phone]"), { rotate: (i) => fan[i].rotate, xPercent: (i) => parseFloat(fan[i].x), duration: 1.2, ease: "expo.inOut" }, 0.7);

        // La palabra que cambia: cada 2,4 s la actual sube y la siguiente entra desde abajo.
        const words = q("[data-word]");
        gsap.set(words, { y: 0, yPercent: (i) => (i ? 110 : 0) });
        const tl = gsap.timeline({ repeat: -1, delay: 2.4 });
        words.forEach((w, i) => {
          const next = words[(i + 1) % words.length];
          tl.to(w, { yPercent: -110, duration: 0.8, ease: "expo.inOut" })
            .fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.inOut" }, "<")
            .to({}, { duration: 1.6 });
        });
      });

      // Al bajar, la portada se aleja: el título se achica apenas y los celulares suben más rápido.
      gsap.to(q("[data-title-wrap]"), {
        scale: 0.92,
        autoAlpha: 0.3,
        transformOrigin: "left top",
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-fan]"), {
        yPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      // En compu, cada celular se mueve con el mouse según su profundidad (parallax).
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return off;
      const movers = q("[data-depth]").map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 1, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1, ease: "power3" }),
        d: Number(el.dataset.depth),
      }));
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(nx * m.d);
          m.y(ny * m.d);
        });
      };
      window.addEventListener("pointermove", move);
      return () => {
        off();
        window.removeEventListener("pointermove", move);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-36 lg:min-h-svh">
      <div className="mx-auto max-w-[1600px]">
        <div data-in className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5 text-sm text-muted">
          <span className="inline-flex items-center gap-2.5 text-ink">
            <span className="relative flex size-2">
              <span className="ping absolute inline-flex size-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.availability}
          </span>
          <span>
            {site.role} — {site.location}
          </span>
        </div>

        <div data-title-wrap className="mt-10 md:mt-12">
          <h1 id="hero-title" className="font-serif text-[clamp(3.6rem,12.5vw,10.5rem)] leading-[0.88]">
            <span data-title className="block">
              {hero.lines[0]}
            </span>
            {/* La palabra que cambia. Todas están apiladas en el mismo lugar; el ancho lo da la más larga. */}
            <span className="relative inline-grid overflow-hidden pb-[0.1em] pr-[0.08em] align-bottom text-accent">
              <span className="sr-only">{hero.rotate[0]}.</span>
              {hero.rotate.map((w, i) => (
                // Las que no se ven esperan abajo, escondidas por la máscara (sin JS queda la primera).
                <em key={w} data-word aria-hidden className="col-start-1 row-start-1 block" style={i ? { transform: "translateY(110%)" } : undefined}>
                  {w}.
                </em>
              ))}
            </span>
          </h1>
        </div>

        <div className="mt-10 grid items-end gap-14 md:mt-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p data-in className="max-w-md text-lg leading-relaxed text-muted md:text-xl">
              {hero.intro}
            </p>
            <div data-in className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic>
                <a href="#trabajos" className="btn group px-7 py-4 text-base">
                  <Roll>Ver mis trabajos</Roll>
                  <Icon name="arrow-down" className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <a href="#demo" className="link-line text-base">
                Probá tu web en vivo
              </a>
            </div>
          </div>

          {/* El abanico de celulares con trabajos reales. */}
          <div data-fan aria-hidden className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem] lg:-mt-40 lg:h-[30rem]">
            {phones.map((p, i) => (
              <div key={p.id} data-depth={p.depth} className={`absolute inset-x-0 bottom-0 mx-auto w-[42%] max-w-[13rem] ${i === 1 ? "z-10" : ""}`}>
                <div data-phone style={{ transform: `translateX(${p.x}) rotate(${p.rotate}deg)` }} className="origin-bottom">
                  <div className="rounded-[1.6rem] bg-ink p-1.5 shadow-[0_40px_60px_-30px_rgb(15_15_17/0.6)]">
                    <Image
                      src={p.project.images.mobile}
                      alt=""
                      width={390}
                      height={844}
                      sizes="210px"
                      priority={i === 1}
                      className="h-auto w-full rounded-[1.2rem]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
