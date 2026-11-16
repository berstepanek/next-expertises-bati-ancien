import { situations } from "@/lib/content";
import ButtonLink from "@/components/ui/button-link";
import SectionHeading from "@/components/ui/section-heading";

export default function Situations() {
  return (
    <section className="on-dark bg-forest text-paper">
      <div className="container py-24">
        <div className="row gy-14 items-start">
          <div className="col-12 lg:col-5 flex flex-col gap-[18px] lg:pr-10">
            <SectionHeading
              eyebrow="Vous vous reconnaissez ?"
              title="Les situations qui méritent"
              accent="un avis d'expert"
              intro="Un doute vaut mieux qu'une mauvaise réparation. Un échange de quelques minutes suffit souvent pour savoir si une visite est utile."
              dark
              titleClassName="text-[clamp(30px,3.6vw,42px)] leading-[1.12]"
              introClassName="text-lg text-on-dark-muted"
              className="gap-[18px]"
            />
            <ButtonLink href="#contact" size="md" className="mt-2 min-h-12 self-start px-[22px]">
              Décrire ma situation
            </ButtonLink>
          </div>

          <div className="col-12 lg:col-7">
            <ul className="row g-[14px] m-0 list-none p-0">
              {situations.map((s, i) => (
                <li key={s} className="col-12 sm:col-6 flex">
                  <span className="flex w-full gap-3 rounded-2xl border border-paper/20 bg-paper/10 px-5 py-[18px] text-base">
                    <span className="font-bold text-sage" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
