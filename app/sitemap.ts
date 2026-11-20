import type { MetadataRoute } from "next";
import { getAllExpertises } from "@/services/expertise";
import { getAllPages } from "@/services/pages";
import { absoluteUrl, EXCLUDED_WP_PAGES } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [expertises, pages] = await Promise.all([
    getAllExpertises().catch(() => []),
    getAllPages().catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/expertises"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
  ];

  const expertiseRoutes: MetadataRoute.Sitemap = expertises.map((e) => ({
    url: absoluteUrl(`/expertises/${e.slug}`),
    lastModified: e.modified ?? undefined,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((p: { slug: string }) => !EXCLUDED_WP_PAGES.has(p.slug))
    .map((p: { slug: string; modified?: string }) => ({
      url: absoluteUrl(`/${p.slug}`),
      lastModified: p.modified,
      changeFrequency: "yearly",
      priority: 0.3,
    }));

  return [...staticRoutes, ...expertiseRoutes, ...pageRoutes];
}
