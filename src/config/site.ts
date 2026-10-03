/**
 * TODO el contenido de la web vive acá. Para cambiar un texto, un proyecto o un link,
 * se toca este archivo y nada más.
 *
 * Privacidad: a propósito NO hay edad, colegio ni dirección.
 * Los clientes te escriben por el formulario, WhatsApp o Instagram (links abajo).
 */

export type Project = {
  id: string;
  name: string;
  /** Rubro y si es demo o real. Siempre aclarar cuando es demo. */
  kind: string;
  tag: "Demo" | "Proyecto propio" | "Cliente";
  year: string;
  url: string;
  summary: string;
  features: string[];
  /** Capturas en /public/trabajos: celular y página entera de 1440 px de ancho (fullHeight = su alto, para el hover). */
  images: { mobile: string; full: string; fullHeight: number };
};

export type Service = {
  id: string;
  name: string;
  description: string;
  includes: string[];
};

export const site = {
  name: "Emanuel Yordi",
  /** Nombre que va en la pestaña y en Google. */
  title: "Emanuel Yordi · Diseño y desarrollo web",
  role: "Diseño y desarrollo web",
  location: "Uruguay",
  timeZone: "America/Montevideo",
  siteUrl: "https://ema-smellclub.vercel.app",
  description:
    "Hago webs rápidas, con reservas online y bien posicionadas en Google para negocios de Uruguay. Mirá mis trabajos y pedí tu demo.",

  hero: {
    // Cada renglón del título es un sticker que se puede arrastrar.
    lines: ["Webs que", "hacen", "vender."],
    intro:
      "Diseño y programo webs para negocios que quieren verse grandes en internet: rápidas, lindas en el celular y pensadas para que te escriban.",
  },

  availability: "Agenda abierta para proyectos nuevos",

  manifesto:
    "Tengo mi propio emprendimiento, así que sé lo que es necesitar clientes. Por eso no hago webs para que queden lindas en un portfolio: las hago para que la gente reserve, compre o te escriba. Me ocupo de todo, del diseño a los textos y la programación, para que el resultado no parezca hecho con plantilla.",

  marquee: ["Landing pages", "Reservas online", "SEO local", "Webs rápidas", "Diseño a medida", "Tiendas online"],

  projects: [
    {
      id: "black-line",
      name: "Black Line",
      kind: "Barbería",
      tag: "Demo",
      year: "2026",
      url: "https://black-line-sandy.vercel.app",
      summary:
        "Landing premium para una barbería con reservas online: el cliente elige servicio, barbero y horario, y el sistema nunca deja dos turnos pisados.",
      features: ["Reservas 24/7", "Confirmación por WhatsApp", "SEO local", "Seguridad y privacidad"],
      images: {
        mobile: "/trabajos/black-line-mob.jpg",
        full: "/trabajos/black-line-full.jpg",
        fullHeight: 8793,
      },
    },
    {
      id: "basalto",
      name: "Basalto",
      kind: "Estudio de arquitectura",
      tag: "Demo",
      year: "2026",
      url: "https://basalto-smellclub.vercel.app",
      summary:
        "Web editorial para un estudio de arquitectura, con fotos reales de Sierra de las Ánimas y una agenda para coordinar la primera consulta con el equipo.",
      features: ["Agenda de consultas", "Diseño editorial", "Fotos con licencia", "Páginas legales"],
      images: {
        mobile: "/trabajos/basalto-mob.jpg",
        full: "/trabajos/basalto-full.jpg",
        fullHeight: 13801,
      },
    },
    {
      id: "voltio",
      name: "VOLTIO",
      kind: "Gimnasio",
      tag: "Demo",
      year: "2026",
      url: "https://voltio-smellclub.vercel.app",
      summary:
        "Web para un gimnasio con horario semanal filtrable, planes con precio mensual, trimestral o anual, y una clase de prueba que se reserva sola desde cualquier botón.",
      features: ["Clase de prueba online", "Horarios con filtros", "Planes y precios", "Animaciones"],
      images: {
        mobile: "/trabajos/voltio-mob.jpg",
        full: "/trabajos/voltio-full.jpg",
        fullHeight: 11331,
      },
    },
    {
      id: "smell-club",
      name: "Smell Club",
      kind: "Perfumería · Mi marca",
      tag: "Proyecto propio",
      year: "2026",
      url: "https://smellclub-uy.vercel.app",
      summary:
        "La tienda online de mi emprendimiento: más de 80 perfumes árabes y de diseñador, con decants de 5 y 10 ml para probar antes de comprar el frasco. Acá aprendo con plata propia qué hace que alguien compre.",
      features: ["Catálogo de 82 perfumes", "Decants de 5 y 10 ml", "Carrito", "Recomendaciones", "Botón a WhatsApp"],
      images: {
        mobile: "/trabajos/smell-club-mob.jpg",
        full: "/trabajos/smell-club-full.jpg",
        fullHeight: 7360,
      },
    },
  ] satisfies Project[],

  services: [
    {
      id: "landing",
      name: "Landing page",
      description: "Una página que presenta tu negocio y convierte visitas en mensajes.",
      includes: ["Diseño a medida", "Botón a WhatsApp", "Lista para Google"],
    },
    {
      id: "reservas",
      name: "Web con reservas",
      description: "Tus clientes eligen día y hora solos, sin llamarte ni escribirte.",
      includes: ["Agenda online", "Sin turnos pisados", "Aviso al confirmar"],
    },
    {
      id: "rediseno",
      name: "Rediseño",
      description: "Tu web actual, pero rápida, moderna y cómoda en el celular.",
      includes: ["Misma info, mejor diseño", "Más velocidad", "Mejor en Google"],
    },
    {
      id: "seo",
      name: "Google y redes",
      description: "Que te encuentren cuando buscan lo que hacés en tu zona.",
      includes: ["SEO local", "Ficha de Google", "Vista linda al compartir"],
    },
  ] satisfies Service[],

  process: [
    { title: "Charlamos", text: "Me contás de tu negocio, a quién le vendés y qué querés lograr." },
    { title: "Te muestro una demo", text: "Antes de que pagues nada, ves cómo quedaría tu web con tu marca." },
    { title: "La construyo", text: "Diseño, textos, fotos y programación. Vos opinás en cada paso." },
    { title: "La publicamos", text: "Queda online con tu dominio, rápida y lista para que te encuentren." },
  ],

  /** "Fuera de la pantalla": lo que hacés cuando no estás programando. */
  offScreen: [
    {
      id: "basquet",
      title: "Básquetbol",
      text: "Juego al básquet. Me enseñó que se gana entrenando cuando nadie mira.",
    },
    {
      id: "perfumes",
      title: "Smell Club",
      text: "Mi emprendimiento de perfumes. Ahí aprendo a vender de verdad.",
    },
    {
      id: "marketing",
      title: "Marketing",
      text: "Me encanta entender por qué una marca te convence y otra no.",
    },
    {
      id: "negocios",
      title: "Negocios",
      text: "Leo y miro todo lo que puedo sobre emprendimientos y cómo crecen.",
    },
  ],

  faq: [
    {
      q: "¿Cuánto sale una web?",
      a: "Depende de lo que necesites. Contame tu idea por el formulario y te paso un presupuesto cerrado, sin sorpresas.",
    },
    {
      q: "¿Cuánto tarda?",
      a: "Una landing suele estar en pocos días. Una web con reservas lleva un poco más. Te doy una fecha antes de arrancar.",
    },
    {
      q: "¿Qué necesito tener?",
      a: "Tu logo, algunas fotos y ganas. Si no tenés textos, te ayudo a escribirlos.",
    },
    {
      q: "¿Las webs de demo son de clientes reales?",
      a: "No. Black Line, Basalto y VOLTIO son negocios inventados que armé para mostrar lo que puedo hacer. Smell Club sí es real: es mi emprendimiento.",
    },
  ],

  /**
   * Redes y contacto públicos. Si un campo queda vacío, no se muestra.
   * WhatsApp va en formato internacional sin "+", espacios ni el 0 de adelante (598 + 99...).
   */
  links: {
    email: "",
    whatsapp: "https://wa.me/59899019137",
    instagram: "https://www.instagram.com/emaa_yordi/",
    linkedin: "",
    github: "https://github.com/smellclub",
  },

  /** Cómo se muestra el número en la web (el link de arriba es el que funciona). */
  phoneDisplay: "+598 99 019 137",

  legal: {
    lastUpdated: "1 de octubre de 2026",
    retentionDays: 365,
  },
};
