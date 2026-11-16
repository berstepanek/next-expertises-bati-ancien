import { heroBullets } from "@/lib/content";
import ButtonLink from "@/components/ui/button-link";
import Icon from "@/components/ui/icon";

export default function Hero() {
  return (
    <section id="top" className="hero-bg on-dark bg-ink text-white">
      <div className="container pt-[200px] pb-28">
        <div className="row">
          <div className="col-12 lg:col-8 flex max-w-[720px] flex-col gap-6">
            <h1 className="m-0 text-[clamp(40px,5.4vw,64px)] leading-[1.05] font-semibold tracking-[-0.02em] text-white">
              Comprendre votre maison ancienne,{" "}
              <span className="font-serif font-normal text-sage italic">
                avant d&apos;agir.
              </span>
            </h1>
            <p className="m-0 max-w-[560px] text-[19px] text-on-dark">
              Fissures, humidité, achat d&apos;une bâtisse, travaux à
              engager&nbsp;: un expert indépendant vient sur place, identifie
              les causes et vous remet un rapport clair, avec des solutions
              adaptées au bâti ancien.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#contact" withArrow>
                Demander une expertise
              </ButtonLink>
              <ButtonLink href="#methode" variant="outline-light">
                Voir comment ça se passe
              </ButtonLink>
            </div>
            <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-7 gap-y-3 p-0 text-[15px] font-medium text-paper">
              {heroBullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <Icon name="check" className="size-[18px] shrink-0 text-sage" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
