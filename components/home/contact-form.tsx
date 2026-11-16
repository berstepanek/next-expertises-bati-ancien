import { requestTypes } from "@/lib/content";

// TODO : brancher l'envoi (Server Action + e-mail, Formspree…)
export default function ContactForm() {
  return (
    <form
      action="#"
      method="post"
      className="flex flex-col gap-4 rounded-3xl bg-white p-7 text-ink"
    >
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
          />
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
          />
        </label>
      </div>
      <label className="field-label">
        Type de demande
        <select name="type" className="field px-3">
          {requestTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="field-label">
        Votre situation
        <textarea
          name="message"
          rows={4}
          placeholder="Commune, type de bien, ce que vous observez…"
          className="field resize-y py-3"
        />
      </label>
      <button
        type="submit"
        className="min-h-[52px] cursor-pointer rounded-full border-0 bg-forest text-base font-semibold text-white hover:bg-ink"
      >
        Être rappelé gratuitement
      </button>
      <p className="m-0 text-center text-[13px] text-muted">
        Vos données servent uniquement à répondre à votre demande.
      </p>
    </form>
  );
}
