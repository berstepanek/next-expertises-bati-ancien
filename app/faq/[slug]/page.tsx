import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllFaqs, getFaqBySlug } from "@/services/faq";
import ButtonLink from "@/components/ui/button-link";
import JsonLd from "@/components/seo/json-ld";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  pageMetadata,
  toPlainText,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

/** Nombre de questions proposées en bas de page. */
const RELATED_LIMIT = 4;

export async function generateStaticParams() {
  const faqs = await getAllFaqs();
  return faqs.map((faq) => ({ slug: faq.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const faq = await getFaqBySlug(slug);
  if (!faq) return {};

  return pageMetadata({
    title: faq.question,
    description:
      toPlainText(faq.answer) ||
      toPlainText(faq.content) ||
      `${faq.question} La réponse d'un expert en bâtiment ancien.`,
    path: `/faq/${faq.slug}`,
  });
}

export default async function FaqDetailPage({ params }: Props) {
  const { slug } = await params;
  const [faq, faqs] = await Promise.all([getFaqBySlug(slug), getAllFaqs()]);

  if (!faq) {
    notFound();
  }

  // Les questions suivantes dans l'ordre de la FAQ, en boucle.
  const index = faqs.findIndex((f) => f.slug === faq.slug);
  const others = faqs.filter((f) => f.slug !== faq.slug);
  const start = index === -1 ? 0 : index % Math.max(others.length, 1);
  const related = [...others.slice(start), ...others.slice(0, start)].slice(
    0,
    RELATED_LIMIT,
  );

  const path = `/faq/${faq.slug}`;
  const answerText = [
    toPlainText(faq.answer, 5000),
    toPlainText(faq.content, 5000),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <JsonLd
        data={[
          ...(answerText
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "QAPage",
                  url: absoluteUrl(path),
                  mainEntity: {
                    "@type": "Question",
                    name: faq.question,
                    answerCount: 1,
                    ...(faq.modified && { dateModified: faq.modified }),
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: answerText,
                      url: absoluteUrl(path),
                    },
                  },
                },
              ]
            : []),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Questions fréquentes", path: "/faq" },
            { name: faq.question, path },
          ]),
        ]}
      />

      <section className="on-dark text-paper bg-linear-to-br from-gradient-start to-gradient-end">
        <div className="container py-24">
          <div className="row">
            <div className="col-12 lg:col-9 flex flex-col gap-5">
              <Link
                href="/faq"
                className="self-start text-[15px] text-on-dark-muted hover:text-paper"
              >
                ← Toutes les questions
              </Link>
              <span className="eyebrow text-accent">Question fréquente</span>
              <h1 className="h2 m-0 max-w-[820px] text-[clamp(32px,4.4vw,52px)] leading-[1.1]">
                {faq.question}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-24">
          <div className="row gy-14 items-start">
            <div className="col-12 lg:col-8 flex flex-col gap-8">
              {faq.answer && (
                <p className="m-0 whitespace-pre-line text-xl leading-relaxed text-ink">
                  {faq.answer}
                </p>
              )}

              {faq.content && (
                <div
                  className="cms-content flex flex-col gap-5 text-lg text-muted-dark [&_h2]:m-0 [&_h2]:mt-4 [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:m-0 [&_h3]:mt-2 [&_h3]:text-[22px] [&_h3]:font-semibold [&_h3]:text-ink [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: faq.content }}
                />
              )}
            </div>

            <aside className="col-12 lg:col-4">
              <div className="flex flex-col gap-4 rounded-[28px] border border-line bg-white p-7">
                <h2 className="m-0 text-[22px] leading-[1.2] font-semibold">
                  Une autre question&nbsp;?
                </h2>
                <p className="m-0 text-base text-muted">
                  Décrivez votre situation : nous vous répondons sous 48 h,
                  gratuitement et sans engagement.
                </p>
                <ButtonLink
                  href="/contact"
                  variant="outline-primary"
                  withArrow
                  className="min-h-[50px] gap-2 px-5"
                >
                  Nous contacter
                </ButtonLink>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <nav
              aria-labelledby="related-faq"
              className="mt-20 flex flex-col gap-5"
            >
              <h2
                id="related-faq"
                className="m-0 text-[28px] leading-[1.15] font-semibold"
              >
                Autres questions
              </h2>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/faq/${item.slug}`}
                      className="flex items-center justify-between gap-4 rounded-[18px] border border-line bg-white px-6 py-5 text-lg font-semibold text-ink no-underline hover:border-primary hover:text-primary"
                    >
                      {item.question}
                      <span aria-hidden="true" className="text-primary">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
