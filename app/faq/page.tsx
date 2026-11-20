import { Metadata } from "next";
import Link from "next/link";
import { getAllFaqs } from "@/services/faq";
import { getPageBySlug } from "@/services/pages";
import AccordionItem from "@/components/ui/accordion-item";
import SectionHeading from "@/components/ui/section-heading";
import JsonLd from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Questions fréquentes",
    description:
      "Les réponses aux questions les plus fréquentes sur l'expertise des maisons et bâtiments anciens : déroulé, délais, tarifs, rapport.",
    path: "/faq",
  });
}

export default async function FaqPage() {
  // Intro éditable : contenu de la page WordPress « Faq » (vide = rien affiché).
  const [faqs, page] = await Promise.all([
    getAllFaqs(),
    getPageBySlug("faq").catch(() => null),
  ]);
  const intro: string | null = page?.content?.trim() || null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((faq) => faq.answer)
      .map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
  };

  return (
    <>
      <JsonLd
        data={[
          ...(faqJsonLd.mainEntity.length > 0 ? [faqJsonLd] : []),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Questions fréquentes", path: "/faq" },
          ]),
        ]}
      />
      <section className="on-dark bg-forest text-paper">
        <div className="container py-24">
          <SectionHeading
            as="h1"
            eyebrow="Questions fréquentes"
            title="Vos questions,"
            accent="nos réponses"
            dark
          />
          {intro && (
            <div
              className="cms-content mt-3.5 flex max-w-[640px] flex-col gap-4 text-lg text-on-dark-muted [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-sage [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: intro }}
            />
          )}
        </div>
      </section>

      <section>
        <div className="container py-24">
          <div className="row justify-center">
            <div className="col-12 flex flex-col gap-3">
              {faqs.length === 0 ? (
                <p className="m-0 text-lg text-muted">
                  Aucune question n&apos;est disponible pour le moment.
                </p>
              ) : (
                faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.id}
                    question={faq.question}
                    defaultOpen={i === 0}
                  >
                    {faq.answer && (
                      <p className="m-0 whitespace-pre-line">{faq.answer}</p>
                    )}
                    <Link
                      href={`/faq/${faq.slug}`}
                      className="mt-3 inline-block font-semibold text-forest underline"
                    >
                      En savoir plus
                    </Link>
                  </AccordionItem>
                ))
              )}

              <p className="m-0 mt-8 text-[17px] text-muted">
                Une autre question ?{" "}
                <Link href="/contact" className="underline">
                  Écrivez-nous
                </Link>
                , nous répondons sous 48 h.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
