import { site } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

/** Preguntas frecuentes con <details>: funciona sin JS y es accesible de fábrica. */
export function Faq() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="bg-paper-soft">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-[1fr_1.4fr]">
        <h2 id="faq-title" className="font-display text-[clamp(3rem,8vw,5rem)] uppercase leading-[1.05]">
          Lo que todos{" "}
          <span className="sticker sticker-white -rotate-2 whitespace-nowrap px-[0.2em] pt-[0.08em] text-accent">preguntan</span>
        </h2>
        <div className="space-y-4">
          {site.faq.map((item) => (
            <details
              key={item.q}
              className="group rounded-[1.4rem] bg-white shadow-[0_0_0_1px_var(--color-line),0_14px_24px_-20px_rgb(13_15_26/0.4)] transition-transform duration-500 open:-rotate-1"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-6 text-xl font-semibold md:px-8 md:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-paper-soft text-accent transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-accent group-open:text-white"
                >
                  <Icon name="plus" className="size-5" />
                </span>
              </summary>
              <p className="max-w-xl px-6 pb-7 text-lg leading-relaxed text-ink/75 md:px-8">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
