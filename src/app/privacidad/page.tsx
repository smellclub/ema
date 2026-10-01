import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  const { legal, links } = site;
  return (
    <LegalPage title="Política de privacidad">
      <p>
        Cuido tus datos personales de acuerdo con la Ley N.º 18.331 de Protección de Datos Personales de Uruguay y
        su decreto reglamentario.
      </p>

      <h2>Qué datos recolecto</h2>
      <ul>
        <li>Tu nombre y un email o celular, para poder responderte.</li>
        <li>El nombre de tu negocio (opcional), qué servicio te interesa y el mensaje que escribas.</li>
        <li>
          Una versión cifrada (hash) de tu dirección IP, que no permite identificarte y uso solo para frenar
          mensajes abusivos.
        </li>
        <li>La fecha y hora en que aceptaste esta política.</li>
      </ul>

      <h2>Para qué los uso</h2>
      <p>
        Solo para responder tu consulta y, si trabajamos juntos, para coordinar el proyecto. No los vendo, no los
        cedo a terceros con fines comerciales y no te mando publicidad.
      </p>

      <h2>Cuánto tiempo los guardo</h2>
      <p>
        Borro cada mensaje a los {legal.retentionDays} días de recibido, salvo que empecemos a trabajar juntos.
      </p>

      <h2>Dónde se guardan</h2>
      <p>
        En servidores de proveedores de infraestructura (Supabase y Vercel) que pueden estar fuera de Uruguay y
        aplican medidas de seguridad acordes a la normativa.
      </p>

      <h2>Cookies</h2>
      <p>Esta web no usa cookies de seguimiento ni de publicidad.</p>

      <h2>Tus derechos</h2>
      <p>
        Podés pedir <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong>,{" "}
        <strong>actualizarlos</strong> o <strong>suprimirlos</strong>, y oponerte a su tratamiento.{" "}
        {links.email ? (
          <>
            Escribime a{" "}
            <a href={`mailto:${links.email}`} className="text-accent underline">
              {links.email}
            </a>
          </>
        ) : (
          <>Escribime por el formulario de contacto</>
        )}{" "}
        indicando tu nombre y el email o celular que dejaste. Te respondo dentro de los plazos de la ley.
      </p>
      <p>
        Si considerás que no se respetan tus derechos, podés presentar una denuncia ante la Unidad Reguladora y de
        Control de Datos Personales (URCDP), en{" "}
        <a
          href="https://www.gub.uy/unidad-reguladora-control-datos-personales/"
          className="text-accent underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          gub.uy/urcdp
        </a>
        .
      </p>
    </LegalPage>
  );
}
