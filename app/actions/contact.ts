"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

/** Nom du champ côté front → nom du champ dans le formulaire CF7.
 *  À aligner sur les balises du formulaire dans WordPress. */
const FIELD_MAP = {
  nom: "your-name",
  tel: "your-tel",
  email: "your-email",
  subject: "your-subject",
  message: "your-message",
} as const;

const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(FIELD_MAP).map(([front, cf7]) => [cf7, front]),
);

type Cf7Response = {
  status:
    | "mail_sent"
    | "mail_failed"
    | "validation_failed"
    | "acceptance_missing"
    | "spam"
    | "aborted";
  message: string;
  invalid_fields?: { field: string; message: string }[];
};

const GENERIC_ERROR =
  "L'envoi a échoué. Réessayez ou contactez-nous par téléphone.";

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Pot de miel : les robots remplissent ce champ caché.
  if (formData.get("website")) {
    return {
      status: "success",
      message: "Merci, votre demande a bien été envoyée.",
    };
  }

  const wpUrl = process.env.WP_URL;
  const formId = process.env.CF7_FORM_ID;
  if (!wpUrl || !formId) {
    console.error("[contact] WP_URL ou CF7_FORM_ID manquant");
    return { status: "error", message: GENERIC_ERROR };
  }
  if (!/^\d+$/.test(formId)) {
    console.error(
      `[contact] CF7_FORM_ID="${formId}" doit être l'ID numérique du formulaire (post=… dans l'admin WP), pas le hash du shortcode`,
    );
    return { status: "error", message: GENERIC_ERROR };
  }

  const body = new FormData();
  for (const [front, cf7] of Object.entries(FIELD_MAP)) {
    body.append(cf7, String(formData.get(front) ?? ""));
  }
  // Requis par CF7 ≥ 5.8
  body.append("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);

  try {
    const res = await fetch(
      `${wpUrl.replace(/\/$/, "")}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
      { method: "POST", body, cache: "no-store" },
    );
    const text = await res.text();
    let data: Cf7Response | undefined;
    try {
      data = JSON.parse(text) as Cf7Response;
    } catch {
      // réponse non JSON (page d'erreur HTML, proxy…)
    }

    if (!data?.status) {
      console.error("[contact] Réponse CF7 inattendue:", res.status, text.slice(0, 500));
      return { status: "error", message: GENERIC_ERROR };
    }

    if (data.status === "mail_sent") {
      return { status: "success", message: data.message };
    }

    if (data.status === "validation_failed" && data.invalid_fields) {
      const fieldErrors: Record<string, string> = {};
      for (const f of data.invalid_fields) {
        fieldErrors[REVERSE_MAP[f.field] ?? f.field] = f.message;
      }
      return { status: "error", message: data.message, fieldErrors };
    }

    console.error("[contact] CF7:", res.status, data);
    return { status: "error", message: data.message || GENERIC_ERROR };
  } catch (err) {
    // err.cause contient le détail réseau (certificat TLS, DNS…)
    console.error("[contact] Erreur d'envoi:", err, (err as Error).cause);
    return { status: "error", message: GENERIC_ERROR };
  }
}
