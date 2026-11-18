import Link from "next/link";
import { getAllFaqs } from "@/services/faq";
import AccordionItem from "@/components/ui/accordion-item";
import SectionHeading from "@/components/ui/section-heading";

/** Nombre de questions affichées sur la home (la suite est sur /faq). */
const HOME_FAQ_LIMIT = 5;

export default async function Faq() {
  const faqs = await getAllFaqs();

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="container pt-[104px] pb-24">
      <div className="row gy-14">
        <div className="col-12 lg:col-4">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Vos questions,"
            accent="nos réponses"
            intro={
              <>
                Une autre question ?{" "}
                <Link href="/contact" className="underline">
                  Écrivez-nous
                </Link>
                , nous répondons sous 48 h.
              </>
            }
            introClassName="text-[17px] text-muted"
          />
        </div>
        <div className="col-12 lg:col-8 flex flex-col gap-3">
          {faqs.slice(0, HOME_FAQ_LIMIT).map((faq, i) => (
            <AccordionItem key={faq.id} question={faq.question} defaultOpen={i === 0}>
              {faq.answer && <p className="m-0 whitespace-pre-line">{faq.answer}</p>}
            </AccordionItem>
          ))}
          {faqs.length > HOME_FAQ_LIMIT && (
            <Link href="/faq" className="mt-3 self-start font-semibold underline">
              Toutes les questions
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
