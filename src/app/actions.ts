"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { contactSchema } from "@/lib/validation";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/**
 * Si falla algo del servidor, nunca mostramos el error real de la base (le da pistas a un atacante).
 * Mostramos un código corto que solo vos sabés leer, y el visitante igual puede escribirte por WhatsApp:
 *   E1 = faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en Vercel
 *   E2 = no existe la tabla portfolio_leads (falta correr supabase/schema.sql en ESE proyecto)
 *   E3 = la clave no tiene permiso (pusiste la anon/publishable en vez de la service_role/secret)
 *   E4 = no se pudo conectar (SUPABASE_URL mal escrita)
 *   E5 = otro error (mirá los logs de Vercel, empiezan con [portfolio_leads])
 */
function serverError(code: string): string {
  return `No se pudo enviar (código ${code}). Escribime por WhatsApp mientras lo arreglo.`;
}

/** Traduce el error de Supabase a uno de los códigos de arriba. */
function codeFor(error: { code?: string; message?: string }, status: number): string {
  const msg = error.message ?? "";
  if (status === 404 || error.code === "PGRST205" || error.code === "42P01" || /does not exist|schema cache/i.test(msg)) return "E2";
  if (status === 401 || status === 403 || error.code === "42501" || /permission denied|row-level security|invalid api key|jwt|unauthorized/i.test(msg)) return "E3";
  if (/fetch failed|ENOTFOUND|ECONNREFUSED|invalid url/i.test(msg)) return "E4";
  return "E5";
}

export type ContactState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string>;
      values?: Record<string, string>;
      /** true si el problema es nuestro (no del visitante): el form ofrece WhatsApp. */
      serverFault?: boolean;
    }
  | { status: "success"; name: string };

/** IP del visitante, hasheada. Nunca guardamos la IP en texto plano. */
async function hashedClientIp(): Promise<string> {
  const h = await headers();
  // En Vercel, x-forwarded-for lo pone la plataforma: el primer valor es la IP real.
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // 1. Honeypot: campo oculto que una persona nunca completa. Si viene lleno, es un bot:
  //    le decimos "ok" sin guardar nada para no darle pistas.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", name: "" };
  }

  // 2. Validación en el servidor. La del navegador es solo comodidad: se puede saltear.
  // React vacía el formulario después de enviarlo: devolvemos lo escrito para no hacerlo tipear de nuevo.
  const values = Object.fromEntries(
    ["name", "contact", "business", "service", "message"].map((k) => [k, String(formData.get(k) ?? "")]),
  );
  const parsed = contactSchema.safeParse({ ...values, privacy: formData.get("privacy") });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] ??= issue.message;
    }
    return { status: "error", message: "Revisá los datos marcados.", fieldErrors, values };
  }
  const data = parsed.data;

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return { status: "error", message: serverError("E4"), values, serverFault: true };
  }
  if (!supabase) {
    console.warn("[portfolio_leads] Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
    return { status: "error", message: serverError("E1"), values, serverFault: true };
  }

  // 3. Rate limit: máximo 5 mensajes por hora desde la misma IP. Se cuenta en la base
  //    porque en Vercel cada pedido puede caer en un servidor distinto.
  const ipHash = await hashedClientIp();
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error: countError, status: countStatus } = await supabase
    .from("portfolio_leads")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if (countError) {
    console.error("[portfolio_leads] error en rate limit", countStatus, countError.code, countError.message);
    return { status: "error", message: serverError(codeFor(countError, countStatus)), values, serverFault: true };
  }
  if ((count ?? 0) >= RATE_LIMIT_MAX) {
    return { status: "error", message: "Mandaste varios mensajes seguidos. Esperá un rato y probá de nuevo.", values };
  }

  // 4. Guardar.
  const { error, status } = await supabase.from("portfolio_leads").insert({
    name: data.name,
    contact: data.contact,
    business: data.business,
    service: data.service,
    message: data.message,
    ip_hash: ipHash,
    privacy_accepted_at: new Date().toISOString(),
  });
  if (error) {
    console.error("[portfolio_leads] error guardando", status, error.code, error.message);
    return { status: "error", message: serverError(codeFor(error, status)), values, serverFault: true };
  }

  return { status: "success", name: data.name.split(" ")[0] };
}
