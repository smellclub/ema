/**
 * Los stickers chicos que andan sueltos por la web. Son SVG dibujados acá,
 * con el borde blanco troquelado y la misma sombra que el resto (clase .sticker).
 */

/** Sticker redondo con texto que gira alrededor. */
export function RoundSticker({ text, children, className = "" }: { text: string; children?: React.ReactNode; className?: string }) {
  const id = `round-${text.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <span className={`sticker sticker-blue grid aspect-square place-items-center !rounded-full ${className}`}>
      <svg viewBox="0 0 200 200" aria-hidden className="spin-slow absolute inset-0 size-full">
        <defs>
          <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text fill="currentColor" fontSize="19" fontWeight="700" letterSpacing="1">
          <textPath href={`#${id}`} textLength="458" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/** Estrella de puntas (la forma clásica de "¡OFERTA!"), con texto adentro. */
export function BurstSticker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  // 14 puntas alternando radio 100 / 84.
  const pts = Array.from({ length: 28 }, (_, i) => {
    const r = i % 2 ? 84 : 100;
    const a = (Math.PI * 2 * i) / 28 - Math.PI / 2;
    return `${(110 + r * Math.cos(a)).toFixed(1)},${(110 + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <span className={`relative grid aspect-square place-items-center text-white drop-shadow-[0_10px_14px_rgb(13_15_26/0.25)] ${className}`}>
      <svg viewBox="0 0 220 220" aria-hidden className="absolute inset-0 size-full">
        <polygon points={pts} fill="var(--color-ink)" stroke="#fff" strokeWidth="9" strokeLinejoin="round" />
      </svg>
      <span className="relative text-center font-display leading-[0.95]">{children}</span>
    </span>
  );
}

/** Pelota de básquet en vinilo azul. */
export function BallSticker({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block aspect-square drop-shadow-[0_10px_14px_rgb(13_15_26/0.25)] ${className}`}>
      <svg viewBox="0 0 120 120" aria-hidden className="size-full">
        <circle cx="60" cy="60" r="54" fill="var(--color-accent)" stroke="#fff" strokeWidth="8" />
        <g fill="none" stroke="var(--color-ink)" strokeWidth="4" strokeLinecap="round">
          <path d="M60 10v100M10 60h100" />
          <path d="M26 22c14 12 14 64 0 76M94 22c-14 12-14 64 0 76" />
        </g>
      </svg>
    </span>
  );
}
