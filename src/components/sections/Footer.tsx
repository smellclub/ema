import Link from "next/link";
import { site } from "@/config/site";
import { LocalTime } from "@/components/ui/LocalTime";

export function Footer() {
  const links = Object.entries(site.links).filter(([, v]) => v && !v.startsWith("mailto")) as [string, string][];
  const names: Record<string, string> = { email: "Email", instagram: "Instagram", linkedin: "LinkedIn", github: "GitHub" };

  return (
    <footer className="relative overflow-hidden bg-ink pt-20">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 md:grid-cols-3 md:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Navegá</p>
          <ul className="mt-4 space-y-2">
            {[
              ["#trabajos", "Trabajos"],
              ["#servicios", "Servicios"],
              ["#sobre-mi", "Sobre mí"],
              ["#contacto", "Contacto"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="hover:text-accent">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">En internet</p>
          <ul className="mt-4 space-y-2">
            {links.map(([key, href]) => (
              <li key={key}>
                <a
                  href={key === "email" ? `mailto:${href}` : href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {names[key] ?? key} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Hora local</p>
          <LocalTime className="mt-4 block text-2xl text-muted" />
          <a href="#inicio" className="mt-6 inline-block text-sm text-accent hover:underline">
            Volver arriba ↑
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="mt-16 select-none whitespace-nowrap text-center font-display text-[14vw] font-extrabold uppercase leading-[0.8] tracking-[-0.01em] text-paper/[0.06]"
      >
        {site.name}
      </p>

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-3 border-t border-line px-5 py-6 text-xs text-muted md:flex-row md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {site.name} · Diseñado y programado por mí.
        </p>
        <p className="flex gap-5">
          <Link href="/privacidad" className="hover:text-paper">
            Privacidad
          </Link>
          <span>Black Line y Basalto son demos: negocios inventados.</span>
        </p>
      </div>
    </footer>
  );
}
