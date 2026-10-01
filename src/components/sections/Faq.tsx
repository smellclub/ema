import { site } from "@/config/site";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Preguntas frecuentes con <details>: funciona sin JS y es accesible de fábrica. */
export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="bg-ink">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-28 md:grid-cols-[1fr_1.4fr] md:px-10 md:py-40">
        <div>
          <SectionLabel index="05" label="Preguntas" />
          <h2 id="faq-title" className="mt-6 font-display text-6xl font-extrabold uppercase leading-[0.85] md:text-7xl">
            Lo que
            <br />
            todos preguntan
          </h2>
        </div>
        <div className="border-t border-line">
          {site.faq.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-xl font-semibold md:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-accent transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-xl pb-8 leading-relaxed text-paper/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
