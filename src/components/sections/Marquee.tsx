import { site } from "@/config/site";

// La lista se repite: la cinta se corre exactamente la mitad y vuelve a empezar sin corte.
const items = [...site.marquee, ...site.marquee, ...site.marquee, ...site.marquee];

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 shrink-0 text-hot md:size-7" fill="currentColor">
      <path d="M12 1.5 14.6 9.4 22.5 12 14.6 14.6 12 22.5 9.4 14.6 1.5 12 9.4 9.4z" />
    </svg>
  );
}

/** Cinta oscura con lo que hago, corriendo sin fin (puro CSS, sin JS). Al pasar el mouse se frena. */
export function Marquee() {
  return (
    <section aria-label="Lo que hago" className="group overflow-hidden bg-ink py-5 text-white md:py-7">
      <div className="flex whitespace-nowrap">
        <ul
          className="marquee-track flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
          style={{ ["--marquee-speed" as string]: "45s" }}
        >
          {items.map((item, i) => (
            <li key={i} className={`flex items-center gap-10 font-display text-3xl md:text-5xl ${i % 2 ? "text-sky" : ""}`}>
              {item}
              <Star />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
