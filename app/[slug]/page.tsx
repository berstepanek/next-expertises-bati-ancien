import { getAllPages, getPageBySlug } from "@/services/pages";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXCLUDED_WP_PAGES, pageMetadata, toPlainText } from "@/lib/seo";
import { site } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages
    .filter((page: { slug: string }) => !EXCLUDED_WP_PAGES.has(page.slug))
    .map((page: { slug: string }) => ({ slug: page.slug }));
}

async function getPublicPage(slug: string) {
  if (EXCLUDED_WP_PAGES.has(slug)) return null;
  return getPageBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublicPage(slug);

  if (!page) {
    return {};
  }

  const title = toPlainText(page.title);
  return pageMetadata({
    title,
    description: toPlainText(page.content) || `${title} — ${site.name}`,
    path: `/${page.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getPublicPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="py-24">
      <div className="container">
        <h1
          className="text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: page.title }}
        />

        <div
          className="cms-content mt-8 prose"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </article>
  );
}
