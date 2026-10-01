-- Portfolio de Ema: mensajes del formulario de contacto (portfolio_leads).
-- Puede vivir en el mismo proyecto de Supabase que las demos: tiene nombre propio.
-- Correr UNA vez en Supabase → SQL Editor → New query → pegar todo → Run.

create table if not exists public.portfolio_leads (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null check (char_length(name) between 2 and 80),
  -- Email o celular, lo que la persona prefiera.
  contact             text not null check (char_length(contact) between 5 and 254),
  business            text check (business is null or char_length(business) <= 80),
  service             text not null check (char_length(service) between 1 and 50),
  message             text not null check (char_length(message) between 10 and 1000),
  -- IP hasheada con SHA-256 (64 caracteres). Nunca guardamos la IP real.
  ip_hash             text not null check (char_length(ip_hash) = 64),
  -- Prueba de que la persona aceptó la política de privacidad (Ley 18.331).
  privacy_accepted_at timestamptz not null,
  created_at          timestamptz not null default now()
);

-- Para el rate limit (contar mensajes recientes de una IP) sin recorrer toda la tabla.
create index if not exists portfolio_leads_ip_created_idx on public.portfolio_leads (ip_hash, created_at desc);

-- RLS prendido y SIN políticas: nadie puede leer ni escribir con la clave pública.
-- Solo el servidor de la web, con la service role key, puede guardar mensajes.
alter table public.portfolio_leads enable row level security;
