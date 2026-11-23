import { getAllPages, getPageBySlug } from "@/services/pages";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXCLUDED_WP_PAGES, pageMetadata, toPlainText } from "@/lib/seo";
import { site } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";

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
    <>
      <section className="on-dark text-paper bg-linear-to-br from-gradient-start to-gradient-end">
        <div className="container py-24">
          <SectionHeading
            as="h1"
            eyebrow="Page"
            title={page.title}
            dark
            introClassName="text-lg text-on-dark-muted max-w-[640px]"
          />
        </div>
      </section>
      <section
        id="contact"
        className={`container scroll-mt-6 pb-[104px] pt-24`}
      >
        <div
          className="cms-content mt-8 prose"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </section>
    </>
  );
}
