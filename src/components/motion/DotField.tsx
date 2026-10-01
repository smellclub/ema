"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./gsap";

/**
 * Fondo del hero: una grilla de puntos que se "ilumina" en lima y se aparta
 * alrededor del mouse. Es un <canvas> (no miles de divs), así que es liviano.
 * Solo redibuja mientras el mouse se mueve o los puntos vuelven a su lugar.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const GAP = 26;
    const RADIUS = 170;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let energy = 0; // cuánto falta para que todo vuelva a la calma

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const t = Math.max(0, 1 - dist / RADIUS) * energy;
          const push = t * 10;
          const px = x + (dist ? (dx / dist) * push : 0);
          const py = y + (dist ? (dy / dist) * push : 0);
          ctx.fillStyle = t > 0.02 ? `rgba(212,255,58,${0.25 + t * 0.75})` : "rgba(241,240,232,0.13)";
          ctx.beginPath();
          ctx.arc(px, py, 1 + t * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = () => {
      energy *= 0.96;
      draw();
      raf = energy > 0.01 ? requestAnimationFrame(loop) : 0;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      energy = 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (!prefersReducedMotion()) window.addEventListener("pointermove", move);
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 -z-10 size-full" />;
}
