/** Flecha del mouse haciendo clic: lo que querés que haga la gente en una web. SVG, sin imágenes. */
export function CursorIcon() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="size-full overflow-visible">
      {/* Ondas del clic: laten con CSS (se quedan quietas con "reducir movimiento"). */}
      <circle className="click-ring" cx="58" cy="58" r="30" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="6 7" />
      <circle className="click-dot" cx="58" cy="58" r="16" fill="var(--accent)" opacity=".35" />
      <path
        d="M22 14 L22 70 L36 57 L46 80 L56 75 L46 53 L64 53 Z"
        fill="var(--ink)"
        stroke="var(--paper)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
