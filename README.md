# Ema · Portfolio

Mi web personal: quién soy, qué hago, mis trabajos y un formulario para que me contraten.

Stack: Next.js 16 + Tailwind 4 + GSAP (animaciones) + Lenis (scroll suave) + Supabase (mensajes del formulario) + Vercel.

## Cambiar contenido

Todo está en `src/config/site.ts`: textos, trabajos, servicios, preguntas y links.
Las capturas de los trabajos van en `public/trabajos/` (celular 390×844 y página entera de 1440 px de ancho).

## Correr en tu compu

```bash
npm install
cp .env.example .env.local   # y completá los valores
npm run dev
```

## Formulario de contacto

1. En Supabase → SQL Editor, correr `supabase/schema.sql` (crea la tabla `portfolio_leads`).
2. En Vercel → Settings → Environment Variables cargar `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` e `IP_HASH_SALT`.
3. Los mensajes se ven en Supabase → Table Editor → `portfolio_leads`.

Seguridad: validación en el servidor, honeypot contra bots, máximo 5 mensajes por hora por IP (hasheada),
RLS sin políticas (solo el servidor escribe) y cabeceras de seguridad (CSP, HSTS) en `next.config.ts`.

## Accesibilidad

Con "reducir movimiento" activado en el sistema no hay pantalla de carga, scroll suave ni animaciones de scroll.
