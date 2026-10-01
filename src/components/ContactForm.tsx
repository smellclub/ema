"use client";

import Link from "next/link";
import { startTransition, useActionState } from "react";
import { site } from "@/config/site";
import { sendContact, type ContactState } from "@/app/actions";

const initial: ContactState = { status: "idle" };

const input =
  "mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-lg text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none aria-[invalid=true]:border-red-700";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-800">
      {error}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-96 flex-col justify-center">
        <p className="font-hand text-3xl">¡llegó!</p>
        <p className="mt-4 font-display text-5xl font-extrabold uppercase leading-none md:text-6xl">
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
      // Con action={...} React vacía el formulario después de cada envío, también si hubo error,
      // y el select y la casilla quedaban en blanco. Enviando a mano no se borra nada.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate
      className="relative grid gap-8"
    >
      {/* Honeypot: invisible para personas, los bots lo completan. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          No completar
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.2em]">
            Tu nombre
          </label>
          <input {...field("name")} required maxLength={80} autoComplete="name" placeholder="Martina" className={input} />
          <FieldError id="name-error" error={errors.name} />
        </div>
        <div>
          <label htmlFor="contact" className="text-xs font-semibold uppercase tracking-[0.2em]">
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

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="business" className="text-xs font-semibold uppercase tracking-[0.2em]">
            Tu negocio <span className="font-normal normal-case tracking-normal text-ink/50">(opcional)</span>
          </label>
          <input {...field("business")} maxLength={80} autoComplete="organization" placeholder="Peluquería Sol" className={input} />
          <FieldError id="business-error" error={errors.business} />
        </div>
        <div>
          <label htmlFor="service" className="text-xs font-semibold uppercase tracking-[0.2em]">
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
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.2em]">
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
            className="mt-0.5 size-5 shrink-0 accent-ink"
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
        <p role="alert" className="rounded-lg bg-ink px-4 py-3 text-sm text-paper">
          {state.message}
          {state.serverFault && site.links.whatsapp && (
            <>
              {" "}
              <a
                href={site.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-4"
              >
                Abrir WhatsApp ↗
              </a>
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full items-center justify-between rounded-full bg-ink px-8 py-5 text-lg font-semibold text-paper transition-transform hover:scale-[1.02] disabled:opacity-60 md:w-auto md:gap-10"
      >
        {pending ? "Enviando…" : "Enviar mensaje"}
        <span aria-hidden className="text-accent transition-transform duration-500 group-hover:rotate-45">
          ↗
        </span>
      </button>
    </form>
  );
}
