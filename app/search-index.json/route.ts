import { getAllExpertises } from "@/services/expertise";
import { getAllFaqs } from "@/services/faq";
import { getAllPages } from "@/services/pages";
import { EXCLUDED_WP_PAGES, toPlainText } from "@/lib/seo";
import type { SearchDoc } from "@/lib/search";

/* Index de recherche du site, chargé par la fenêtre de recherche à sa première ouverture. */
export const revalidate = 3600;

const TEXT_MAX = 3000;

function joinText(...parts: (string | null | undefined)[]) {
  return toPlainText(parts.filter(Boolean).join(" "), TEXT_MAX);
}

export async function GET() {
  const [expertises, faqs, pages] = await Promise.all([
    getAllExpertises().catch(() => []),
    getAllFaqs().catch(() => []),
    getAllPages().catch(() => []),
  ]);

  const docs: SearchDoc[] = [
    ...expertises.map((e) => ({
      type: "expertise" as const,
      title: e.name || toPlainText(e.title),
      url: `/expertises/${e.slug}`,
      excerpt: toPlainText(e.shortDescription || e.excerpt || e.content),
      text: joinText(
        e.shortDescription,
        e.strengths.join(". "),
        e.target,
        e.content,
      ),
    })),
    ...faqs.map((f) => ({
      type: "faq" as const,
      title: f.question,
      url: `/faq/${f.slug}`,
      excerpt: toPlainText(f.answer || f.content),
      text: joinText(f.answer, f.content),
    })),
    ...pages
      .filter((p: { slug: string }) => !EXCLUDED_WP_PAGES.has(p.slug))
      .map((p: { slug: string; title: string; content: string | null }) => ({
        type: "page" as const,
        title: toPlainText(p.title),
        url: `/${p.slug}`,
        excerpt: toPlainText(p.content),
        text: joinText(p.content),
      })),
  ];

  return Response.json(docs, {
    headers: { "X-Robots-Tag": "noindex" },
  });
}
