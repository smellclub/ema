/** Pelota de básquet dibujada en SVG (sin imágenes externas). */
export function Basketball() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="size-full">
      <circle cx="50" cy="50" r="46" fill="#e8652b" stroke="#0b0c09" strokeWidth="3" />
      <g fill="none" stroke="#0b0c09" strokeWidth="3" strokeLinecap="round">
        <path d="M4 50 H96" />
        <path d="M50 4 V96" />
        <path d="M18 16 C 34 32, 34 68, 18 84" />
        <path d="M82 16 C 66 32, 66 68, 82 84" />
      </g>
    </svg>
  );
}
