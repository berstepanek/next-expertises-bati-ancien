/** Injecte des données structurées schema.org (JSON-LD). */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // `<` échappé pour qu'un contenu CMS ne puisse pas fermer la balise.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
