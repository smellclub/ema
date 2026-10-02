import { site } from "@/config/site";

// La lista se repite: la cinta se corre exactamente la mitad y vuelve a empezar sin corte.
const items = [...site.marquee, ...site.marquee, ...site.marquee, ...site.marquee];

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-6 shrink-0 md:size-8" fill="currentColor">
      <path d="M12 1.5 14.6 9.4 22.5 12 14.6 14.6 12 22.5 9.4 14.6 1.5 12 9.4 9.4z" />
    </svg>
  );
}

function Tape({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  return (
    <div className={`flex overflow-hidden whitespace-nowrap py-3 shadow-[0_14px_24px_-14px_rgb(13_15_26/0.45)] md:py-4 ${className}`}>
      <ul
        className={`marquee-track flex shrink-0 items-center gap-8 pr-8 ${reverse ? "marquee-reverse" : ""}`}
        style={{ ["--marquee-speed" as string]: "42s" }}
      >
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-8 font-display text-3xl uppercase md:text-5xl">
            {item}
            <Star />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Dos cintas de embalar cruzadas que corren en sentidos opuestos (puro CSS, sin JS). */
export function Marquee() {
  return (
    <section aria-label="Lo que hago" className="relative z-10 overflow-hidden py-16 md:py-24">
      <Tape reverse className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-ink text-white" />
      <Tape className="relative -mx-[5%] -rotate-2 bg-accent text-white" />
    </section>
  );
}
