import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllExpertises, getExpertiseBySlug } from "@/services/expertise";
import { site } from "@/lib/content";
import ButtonLink from "@/components/ui/button-link";
import CheckList from "@/components/ui/check-list";
import JsonLd from "@/components/seo/json-ld";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  ORGANIZATION_ID,
  pageMetadata,
  toPlainText,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const expertises = await getAllExpertises();
  return expertises.map((expertise) => ({ slug: expertise.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const expertise = await getExpertiseBySlug(slug);
  if (!expertise) return {};

  const name = expertise.name || expertise.title;
  return pageMetadata({
    title: name,
    description:
      expertise.shortDescription ||
      toPlainText(expertise.excerpt) ||
      toPlainText(expertise.content) ||
      `${name} : expertise indépendante du bâti ancien par ${site.expertName}.`,
    path: `/expertises/${expertise.slug}`,
    image: expertise.image && {
      url: expertise.image.sourceUrl,
      width: expertise.image.width,
      height: expertise.image.height,
      alt: expertise.image.altText,
    },
  });
}

export default async function ExpertisePage({ params }: Props) {
  const { slug } = await params;
  const expertise = await getExpertiseBySlug(slug);

  if (!expertise) {
    notFound();
  }

  const name = expertise.name || expertise.title;
  const path = `/expertises/${expertise.slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name,
            serviceType: name,
            description:
              expertise.shortDescription || toPlainText(expertise.excerpt),
            url: absoluteUrl(path),
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: site.zone },
            ...(expertise.image && { image: expertise.image.sourceUrl }),
          },
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Nos expertises", path: "/expertises" },
            { name, path },
          ]),
        ]}
      />
      <section className="on-dark bg-primary ">
        <div className="container py-24 ">
          <div className="row">
            <div className="col-12 lg:col-8 flex flex-col gap-5 text-paper">
              <Link
                href="/expertises"
                className="self-start text-[15px] text-on-dark-muted hover:text-paper"
              >
                ← Toutes les expertises
              </Link>
              <span className="eyebrow text-accent">Expertise</span>
              <h1 className="h2 m-0 max-w-[820px] text-[clamp(34px,4.6vw,54px)] leading-[1.08]">
                {name}
              </h1>
              {expertise.shortDescription && (
                <p className="m-0 max-w-[680px] text-lg text-on-dark-muted">
                  {expertise.shortDescription}
                </p>
              )}
              {expertise.strengths.length > 0 && (
                <div className="flex flex-col gap-5">
                  <h2 className="m-0 text-[28px] leading-[1.15] font-semibold">
                    Les points forts
                  </h2>
                  <CheckList
                    items={expertise.strengths}
                    classCss="text-white"
                  />
                </div>
              )}
            </div>

            <aside className="col-12 lg:col-4">
              <div className="flex flex-col gap-4 rounded-[28px] border border-line bg-white p-7 lg:top-28">
                {expertise.target && (
                  <p className="m-0 rounded-[14px] bg-white px-4 py-3.5 text-[15px] text-muted-dark">
                    <strong className="text-ink">Pour qui&nbsp;: </strong>
                    {expertise.target}
                  </p>
                )}
                <h2 className="m-0 text-[22px] leading-[1.2] font-semibold">
                  Besoin de cette expertise&nbsp;?
                </h2>
                <p className="m-0 text-base text-muted">
                  Décrivez votre situation : vous recevez un devis avant toute
                  visite.
                </p>
                <ButtonLink
                  href="/contact"
                  variant="outline-primary"
                  withArrow
                  className="min-h-[50px] gap-2 px-5"
                >
                  Demander un devis
                </ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-24">
          <div className="row gy-14 items-start">
            <div className="col-12 ">
              {expertise.content ? (
                <div
                  className="cms-content flex flex-col gap-5 text-lg text-muted-dark [&_h2]:m-0 [&_h2]:mt-4 [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:m-0 [&_h3]:mt-2 [&_h3]:text-[22px] [&_h3]:font-semibold [&_h3]:text-ink [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: expertise.content }}
                />
              ) : (
                expertise.strengths.length === 0 && (
                  <p className="m-0 text-lg text-muted">
                    Le détail de cette expertise sera bientôt disponible.
                    Contactez-nous pour en savoir plus.
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
