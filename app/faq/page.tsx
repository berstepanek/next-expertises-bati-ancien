import { Metadata } from "next";
import Link from "next/link";
import { getAllFaqs } from "@/services/faq";
import { site } from "@/lib/content";
import AccordionItem from "@/components/ui/accordion-item";
import SectionHeading from "@/components/ui/section-heading";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Questions fréquentes | ${site.name}`,
    description:
      "Les réponses aux questions les plus fréquentes sur l'expertise des maisons et bâtiments anciens.",
  };
}

export default async function FaqPage() {
  const faqs = await getAllFaqs();

  return (
    <>
      <section className="on-dark bg-forest text-paper">
        <div className="container py-24">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Vos questions,"
            accent="nos réponses"
            dark
          />
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
