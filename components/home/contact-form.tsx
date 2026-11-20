"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { status: "idle" };

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <span id={id} className="text-[13px] font-normal text-red-700">
      {error}
    </span>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContact,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const errorProps = (name: string) =>
    errors[name]
      ? { "aria-invalid": true, "aria-describedby": `${name}-error` }
      : {};

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4 rounded-3xl bg-white p-7 text-ink"
    >
      {/* Pot de miel anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="row g-4">
        <label className="field-label col-12 sm:col-6">
          Nom
          <input
            type="text"
            name="nom"
            autoComplete="name"
            required
            placeholder="Votre nom"
            className="field"
            {...errorProps("nom")}
          />
          <FieldError id="nom-error" error={errors.nom} />
        </label>
        <label className="field-label col-12 sm:col-6">
          Téléphone
          <input
            type="tel"
            name="tel"
            autoComplete="tel"
            required
            placeholder="06 …"
            className="field"
            {...errorProps("tel")}
          />
          <FieldError id="tel-error" error={errors.tel} />
        </label>
      </div>
      <label className="field-label">
        E-mail
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="vous@exemple.fr"
          className="field"
          {...errorProps("email")}
        />
        <FieldError id="email-error" error={errors.email} />
      </label>
      <label className="field-label">
        Objet
        <input
          type="text"
          name="subject"
          required
          placeholder="Ex. fissures sur façade, achat d'une maison…"
          className="field"
          {...errorProps("subject")}
        />
        <FieldError id="subject-error" error={errors.subject} />
      </label>
      <label className="field-label">
        Votre message (facultatif)
        <textarea
          name="message"
          rows={4}
          placeholder="Commune, type de bien, ce que vous observez…"
          className="field resize-y py-3"
          {...errorProps("message")}
        />
        <FieldError id="message-error" error={errors.message} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="min-h-[52px] cursor-pointer rounded-full border-0 bg-forest text-base font-semibold text-white hover:bg-ink disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Envoi…" : "Être rappelé gratuitement"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`m-0 text-center text-sm font-semibold empty:hidden ${
          state.status === "error" ? "text-red-700" : "text-forest"
        }`}
      >
        {state.status !== "idle" ? state.message : ""}
      </p>
      <p className="m-0 text-center text-[13px] text-muted">
        Vos données servent uniquement à répondre à votre demande.
      </p>
    </form>
  );
}
