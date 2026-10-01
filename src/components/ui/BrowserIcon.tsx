/** Ventanita de navegador con "</>" adentro: el símbolo de hacer webs. SVG, sin imágenes. */
export function BrowserIcon() {
  return (
    <svg viewBox="0 0 120 96" aria-hidden className="size-full">
      <rect x="3" y="3" width="114" height="90" rx="12" fill="var(--accent)" stroke="var(--ink)" strokeWidth="4" />
      <path d="M3 27 H117" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="17" cy="15" r="4" fill="var(--ink)" />
      <circle cx="30" cy="15" r="4" fill="var(--ink)" />
      <circle cx="43" cy="15" r="4" fill="var(--ink)" />
      <g fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M42 46 L28 60 L42 74" />
        <path d="M78 46 L92 60 L78 74" />
        <path d="M66 42 L54 78" />
      </g>
    </svg>
  );
}
