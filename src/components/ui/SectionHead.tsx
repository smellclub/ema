import type { ReactNode } from "react";

/**
 * Encabezado de sección: rótulo numerado, título grande y un texto corto al costado.
 * El título lleva data-title para que la sección lo anime renglón por renglón.
 */
export function SectionHead({
  id,
  index,
  eyebrow,
  title,
  aside,
  dark = false,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className={`eyebrow ${dark ? "text-white/80" : "text-muted"}`}>
          ({index}) {eyebrow}
        </p>
        <h2 id={id} data-title className="mt-5 max-w-4xl font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.95]">
          {title}
        </h2>
      </div>
      {aside && <p className={`max-w-sm text-lg leading-relaxed ${dark ? "text-white/85" : "text-muted"}`}>{aside}</p>}
    </div>
  );
}
