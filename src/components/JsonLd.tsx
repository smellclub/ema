import { site } from "@/config/site";

/** Datos estructurados para que Google entienda qué ofrecés (servicio profesional, no persona). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} · ${site.role}`,
    description: site.description,
    url: site.siteUrl,
    areaServed: { "@type": "Country", name: "Uruguay" },
    knowsAbout: ["Diseño web", "Desarrollo web", "Landing pages", "Reservas online", "SEO local"],
    sameAs: Object.values(site.links).filter((v) => v.startsWith("http")),
    makesOffer: site.services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.description },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Reemplazamos "<" para que ningún texto del config pueda cerrar el <script> (XSS).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
