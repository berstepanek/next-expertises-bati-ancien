import type { Metadata } from "next";
import { site } from "@/lib/content";

/** URL canonique du site (sans slash final). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.expertises-bati-ancien.fr"
).replace(/\/$/, "");

/** Pages WordPress à ne pas publier via /[slug] :
 *  - celles qui ont déjà leur propre route Next ;
 *  - `accueil` (doublon de la home, redirigée dans next.config) ;
 *  - la page de démo de WordPress. */
export const EXCLUDED_WP_PAGES = new Set([
  "accueil",
  "faq",
  "expertises",
  "contact",
  "page-d-exemple",
  "sample-page",
]);

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Texte brut à partir de HTML WordPress, tronqué pour une meta description. */
export function toPlainText(html: string | null | undefined, max = 160) {
  const text = (html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&[a-z0-9#]+;/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

type PageMetaInput = {
  /** Titre court : le suffixe « | Expertises Bâti Ancien » est ajouté par le layout. */
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number | null; height?: number | null; alt?: string | null } | null;
};

/** Metadata d'une page : titre, description, canonique, Open Graph et Twitter. */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  // Le bloc openGraph d'une page remplace celui du layout : on redonne tout.
  const images = [
    image
      ? {
          url: image.url,
          width: image.width ?? undefined,
          height: image.height ?? undefined,
          alt: image.alt || title,
        }
      : { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.baseline}` },
  ];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/* ---------- Données structurées (schema.org) ---------- */

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: site.name,
    description: site.description,
    slogan: site.baseline,
    url: SITE_URL,
    telephone: site.phone.href.replace(/^tel:/, ""),
    email: site.email,
    image: absoluteUrl("/opengraph-image"),
    areaServed: { "@type": "Country", name: site.zone },
    founder: { "@type": "Person", name: site.expertName, jobTitle: site.baseline },
    knowsAbout: [
      "Bâtiment ancien",
      "Diagnostic des désordres",
      "Expertise avant achat",
      "Pathologies du bâtiment",
      "Litiges travaux",
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
