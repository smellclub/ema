import { site } from "@/config/site";

/** Sello circular con texto que gira y una flecha al centro que lleva al contacto. */
export function Badge({ className = "" }: { className?: string }) {
  const text = `Disponible para proyectos • ${site.location} • `;
  return (
    <a
      href="#contacto"
      className={`group relative flex size-36 items-center justify-center rounded-full ${className}`}
      aria-label="Ir al contacto"
    >
      <svg viewBox="0 0 200 200" aria-hidden className="spin-slow absolute inset-0 size-full">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-paper text-[15px] uppercase tracking-[0.18em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span
        aria-hidden
        className="flex size-14 items-center justify-center rounded-full bg-lime text-2xl text-ink transition-transform duration-500 group-hover:rotate-45"
      >
        ↗
      </span>
    </a>
  );
}
