import { faq } from "@/lib/content";
import AccordionItem from "@/components/ui/accordion-item";
import SectionHeading from "@/components/ui/section-heading";

export default function Faq() {
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
                <a href="#contact" className="underline">
                  Écrivez-nous
                </a>
                , nous répondons sous 48 h.
              </>
            }
            introClassName="text-[17px] text-muted"
          />
        </div>
        <div className="col-12 lg:col-8 flex flex-col gap-3">
          {faq.map((item, i) => (
            <AccordionItem key={item.question} question={item.question} defaultOpen={i === 0}>
              <p className="m-0">{item.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
