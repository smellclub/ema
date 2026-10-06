/**
 * Íconos dibujados a mano en SVG, todos con el mismo trazo (2px, puntas redondeadas).
 * Mejor que usar flechas de texto o emojis: se ven igual en todos los celulares.
 */
const paths = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-up-right": "M7 17 17 7M8 7h9v9",
  "arrow-down": "M12 5v14M6 13l6 6 6-6",
  "arrow-up": "M12 19V5M6 11l6-6 6 6",
  reset: "M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4",
  plus: "M12 5v14M5 12h14",
  check: "M5 12.5 10 17l9-10",
  ball: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3v18M5.6 5.6c3 2.6 3 10.2 0 12.8M18.4 5.6c-3 2.6-3 10.2 0 12.8",
  bottle: "M10 3h4v3h-4zM9.5 6h5l1.5 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9zM8 13h8",
  megaphone: "M4 10v4a1 1 0 0 0 1 1h2l8 4V5L7 9H5a1 1 0 0 0-1 1ZM7 15l1.5 5M19 9.5a3 3 0 0 1 0 5",
  chart: "M4 20h16M7 16v-4M12 16V8M17 16v-7M6 9l5-4 4 3 4-4",
  hand:"M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4.2 15a1.5 1.5 0 0 1 2.4-1.8L9 15.5",
} as const;

export type IconName = keyof typeof paths | "whatsapp" | "instagram";

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.1z" />
        <path d="M9.5 9.2c0 2.8 2.3 5.3 5.3 5.3l1-1.2-1.8-.9-.8.8a4 4 0 0 1-2.4-2.4l.8-.8-.9-1.8z" strokeWidth={1.4} />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}
