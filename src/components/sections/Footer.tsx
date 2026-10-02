import Link from "next/link";
import { site } from "@/config/site";
import { LocalTime } from "@/components/ui/LocalTime";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const links = Object.entries(site.links).filter(([, v]) => v && !v.startsWith("mailto")) as [string, string][];
  const names: Record<string, string> = { email: "Email", whatsapp: "WhatsApp", instagram: "Instagram", linkedin: "LinkedIn", github: "GitHub" };

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-white">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 md:grid-cols-3 md:px-10">
        <div>
          <p className="text-sm font-semibold text-white/60">Navegá</p>
          <ul className="mt-4 space-y-2">
            {[
              ["#trabajos", "Trabajos"],
              ["#servicios", "Servicios"],
              ["#sobre-mi", "Sobre mí"],
              ["#contacto", "Contacto"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-lg transition-colors hover:text-[#9fb0ff]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white/60">En internet</p>
          <ul className="mt-4 space-y-2">
            {links.map(([key, href]) => (
              <li key={key}>
                <a
                  href={key === "email" ? `mailto:${href}` : href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg transition-colors hover:text-[#9fb0ff]"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {names[key] ?? key}
                    <Icon name="arrow-up-right" className="size-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:text-right">
          <p className="text-sm font-semibold text-white/60">Hora local</p>
          <LocalTime className="mt-4 block text-2xl text-white/80" />
          <a href="#inicio" className="sticker sticker-blue mt-6 inline-flex -rotate-2 items-center gap-2 px-4 py-2 font-semibold transition-transform hover:rotate-0">
            Volver arriba
            <Icon name="arrow-up" className="size-4" />
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="mt-16 select-none whitespace-nowrap text-center font-display text-[11.5vw] uppercase leading-[0.9] text-white/[0.07]"
      >
        {site.name}
      </p>

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-3 border-t border-white/15 px-5 py-6 text-sm text-white/60 md:flex-row md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {site.name} · Diseñado y programado por mí.
        </p>
        <p className="flex gap-5">
          <Link href="/privacidad" className="underline-offset-4 hover:text-white hover:underline">
            Privacidad
          </Link>
          <span>Black Line, Basalto y VOLTIO son demos: negocios inventados.</span>
        </p>
      </div>
    </footer>
  );
}
