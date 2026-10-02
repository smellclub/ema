"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { site } from "@/config/site";
import { sendContact, type ContactState } from "@/app/actions";
import { onDemoRequest } from "@/lib/demo-bus";
import { Icon } from "@/components/ui/Icon";

const initial: ContactState = { status: "idle" };

const input = "field";
const label = "text-base font-semibold";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-[#b00f2a]">
      {error}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const form = useRef<HTMLFormElement>(null);

  // Cuando tocan "Quiero mi demo", "Quiero esto" o "Quiero una así", completamos lo que ya sabemos
  // y dejamos el cursor en el primer campo vacío. Los campos completados brillan un segundo.
  useEffect(
    () =>
      onDemoRequest((d) => {
        const el = form.current;
        if (!el) return;
        const set = (name: string, value?: string) => {
          if (!value) return;
          const f = el.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
          if (!f) return;
          f.value = value;
          f.classList.remove("flash");
          void f.offsetWidth; // reinicia la animación si ya estaba
          f.classList.add("flash");
        };
        set("business", d.business);
        set("service", d.service);
        set("message", d.message);
        window.setTimeout(() => {
          const first = ["name", "contact", "service", "message"]
            .map((n) => el.elements.namedItem(n) as HTMLInputElement | null)
            .find((f) => f && !f.value);
          (first ?? (el.elements.namedItem("name") as HTMLInputElement))?.focus({ preventScroll: true });
        }, 900);
      }),
    [],
  );

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-96 flex-col items-start justify-center">
        <span className="sticker sticker-blue -rotate-3 px-4 pb-1 pt-2 font-display text-2xl uppercase">¡Llegó!</span>
        <p className="mt-6 font-display text-5xl uppercase leading-[1.05] md:text-6xl">
          Gracias{state.name ? `, ${state.name}` : ""}.
        </p>
        <p className="mt-6 max-w-md text-lg text-ink/75">
          Me llegó tu mensaje. Te respondo por el medio que me dejaste. Mientras tanto, mirá otra vez los trabajos.
        </p>
      </div>
    );
  }

  const field = (name: string) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    defaultValue: values[name] ?? "",
  });

  return (
    <form
      ref={form}
      // Con action={...} React vacía el formulario después de cada envío, también si hubo error,
      // y el select y la casilla quedaban en blanco. Enviando a mano no se borra nada.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate
      className="relative grid gap-6"
    >
      {/* Honeypot: invisible para personas, los bots lo completan. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          No completar
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Tu nombre
          </label>
          <input {...field("name")} required maxLength={80} autoComplete="name" placeholder="Martina" className={input} />
          <FieldError id="name-error" error={errors.name} />
        </div>
        <div>
          <label htmlFor="contact" className={label}>
            Email o WhatsApp
          </label>
          <input
            {...field("contact")}
            required
            maxLength={254}
            autoComplete="email"
            placeholder="martina@tunegocio.com"
            className={input}
          />
          <FieldError id="contact-error" error={errors.contact} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="business" className={label}>
            Tu negocio <span className="font-normal text-muted">(opcional)</span>
          </label>
          <input {...field("business")} maxLength={80} autoComplete="organization" placeholder="Peluquería Sol" className={input} />
          <FieldError id="business-error" error={errors.business} />
        </div>
        <div>
          <label htmlFor="service" className={label}>
            Qué necesitás
          </label>
          <select {...field("service")} required className={`${input} cursor-pointer`}>
            <option value="" disabled>
              Elegí una opción
            </option>
            {site.services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
            <option value="otro">Otra cosa</option>
          </select>
          <FieldError id="service-error" error={errors.service} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Contame tu idea
        </label>
        <textarea
          {...field("message")}
          required
          rows={4}
          minLength={10}
          maxLength={1000}
          placeholder="Tengo una peluquería en Pocitos y quiero que me reserven por la web…"
          className={`${input} resize-none`}
        />
        <FieldError id="message-error" error={errors.message} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink/80">
          <input
            type="checkbox"
            name="privacy"
            required
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={errors.privacy ? "privacy-error" : undefined}
            className="mt-0.5 size-5 shrink-0 accent-[#1f3bff]"
          />
          <span>
            Acepto la{" "}
            <Link href="/privacidad" className="font-semibold underline underline-offset-4">
              política de privacidad
            </Link>
            . Uso tus datos solo para responderte.
          </span>
        </label>
        <FieldError id="privacy-error" error={errors.privacy} />
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-2xl bg-ink px-5 py-4 text-base text-white">
          {state.message}
          {state.serverFault && site.links.whatsapp && (
            <>
              {" "}
              <a
                href={site.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#9fb0ff] underline underline-offset-4"
              >
                Abrir WhatsApp
              </a>
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-5 text-lg font-semibold text-white shadow-[0_12px_24px_-10px_rgb(31_59_255/0.7)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-accent-deep disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70 md:w-auto md:justify-self-start"
      >
        {pending ? "Enviando…" : "Enviar mensaje"}
        <Icon name="arrow-right" className="size-5 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
