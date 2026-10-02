"use client";

import { useCallback, useRef, type RefObject } from "react";
import { Draggable, gsap, useGSAP } from "./gsap";

/**
 * Hace arrastrables todos los [data-drag] dentro de `scope`.
 * - Al agarrarlo, el sticker se levanta (más sombra) y queda arriba de los demás.
 * - Si lo soltás con envión, sigue un poco por inercia y frena dentro de `bounds`.
 * - Donde estaba queda el troquel punteado ([data-slot] dentro de su [data-wrap]), como en una plancha real.
 * `media` limita dónde se activa: en celular los stickers grandes no se arrastran
 * para no trabar el scroll con el dedo.
 * Devuelve `reset()`, que vuelve a pegar todo en su lugar.
 */
export function useStickers(
  scope: RefObject<HTMLElement | null>,
  { media = "(min-width: 0px)", selector = "[data-drag]" }: { media?: string; selector?: string } = {},
) {
  const moved = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media, () => {
        const root = scope.current!;
        const items = gsap.utils.toArray<HTMLElement>(selector, root);
        let z = 10;
        const draggables = items.map((el) =>
          Draggable.create(el, {
            type: "x,y",
            bounds: root,
            inertia: true,
            edgeResistance: 0.75,
            // Un toque corto no es arrastre: así los links dentro de un sticker siguen andando.
            minimumMovement: 6,
            zIndexBoost: false,
            onPress() {
              // El z-index va en el envoltorio, así queda arriba de los otros stickers aunque estén en otra caja.
              (el.closest<HTMLElement>("[data-wrap]") ?? el).style.zIndex = String(++z);
              el.classList.add("is-lifted");
              gsap.to(el, { scale: 1.06, duration: 0.2, ease: "power2.out" });
            },
            onDragStart() {
              moved.current = true;
              const slot = el.closest("[data-wrap]")?.querySelector<HTMLElement>("[data-slot]");
              if (slot) gsap.to(slot, { autoAlpha: 1, duration: 0.25 });
            },
            onRelease() {
              el.classList.remove("is-lifted");
              gsap.to(el, { scale: 1, duration: 0.45, ease: "back.out(3)" });
            },
          })[0],
        );
        return () => draggables.forEach((d) => d.kill());
      });
      return () => mm.revert();
    },
    { scope },
  );

  const reset = useCallback(() => {
    const root = scope.current;
    if (!root) return;
    gsap.to(root.querySelectorAll(selector), { x: 0, y: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.04 });
    gsap.to(root.querySelectorAll("[data-slot]"), { autoAlpha: 0, duration: 0.4, delay: 0.5 });
    moved.current = false;
  }, [scope, selector]);

  return { reset };
}
