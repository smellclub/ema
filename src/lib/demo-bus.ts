"use client";

/**
 * Los botones "Quiero mi demo" y "Quiero esto" completan el formulario de contacto
 * con lo que el visitante ya eligió, y lo llevan hasta ahí.
 * Es un evento del navegador: el botón no necesita conocer al formulario.
 */
export type DemoRequest = { business?: string; service?: string; message?: string };

const EVENT = "ema:demo";

export function requestDemo(detail: DemoRequest = {}) {
  window.dispatchEvent(new CustomEvent<DemoRequest>(EVENT, { detail }));
  scrollToSection("contacto");
}

/** Lleva a una sección con el mismo scroll suave del resto de la web (o normal, si no hay Lenis). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ block: "start" });
}

export function onDemoRequest(cb: (d: DemoRequest) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<DemoRequest>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
