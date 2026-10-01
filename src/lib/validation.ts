import { z } from "zod";
import { site } from "@/config/site";

const serviceIds = ["otro", ...site.services.map((s) => s.id)] as [string, ...string[]];

const email = z.email();
const phone = /^\+?[\d\s-]{8,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribí tu nombre").max(80, "El nombre es demasiado largo"),
  // Un solo campo para que respondas por donde la persona prefiera: email o WhatsApp.
  contact: z
    .string()
    .trim()
    .max(254)
    .refine((v) => email.safeParse(v).success || phone.test(v), "Escribí un email o un celular válido"),
  business: z
    .string()
    .trim()
    .max(80, "Máximo 80 caracteres")
    .transform((v) => (v === "" ? null : v)),
  service: z.enum(serviceIds, "Elegí qué necesitás"),
  message: z
    .string()
    .trim()
    .min(10, "Contame un poco más (mínimo 10 caracteres)")
    .max(1000, "Máximo 1000 caracteres"),
  privacy: z.literal("on", "Tenés que aceptar la política de privacidad"),
});

export type ContactInput = z.infer<typeof contactSchema>;
