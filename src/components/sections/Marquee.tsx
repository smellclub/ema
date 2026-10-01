import { site } from "@/config/site";

// La lista se repite: la cinta se corre exactamente la mitad y vuelve a empezar sin corte.
const items = [...site.marquee, ...site.marquee, ...site.marquee, ...site.marquee];

function Row({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  return (
    <div className={`flex overflow-hidden whitespace-nowrap py-4 ${className}`}>
      <ul
        className={`marquee-track flex shrink-0 items-center gap-8 pr-8 ${reverse ? "marquee-reverse" : ""}`}
        style={{ ["--marquee-speed" as string]: "38s" }}
      >
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-8 font-display text-4xl font-extrabold uppercase md:text-6xl">
            {item}
            <span aria-hidden className="text-2xl md:text-4xl">
              ✦
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Dos cintas cruzadas que corren en sentidos opuestos (puro CSS, sin JS). */
export function Marquee() {
  return (
    <section aria-label="Lo que hago" className="relative z-10 overflow-hidden py-20">
      <Row reverse className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-3 border-y border-line bg-ink-soft text-paper/70" />
      <Row className="relative -mx-[5%] -rotate-2 bg-accent text-ink" />
    </section>
  );
}
