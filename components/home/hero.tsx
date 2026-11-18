import Image from "next/image";
import { getHomeHero } from "@/services/home";
import ButtonLink from "@/components/ui/button-link";
import Icon from "@/components/ui/icon";

export default async function Hero() {
  const hero = await getHomeHero();

  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-ink text-white">
      {hero?.image && (
        <Image
          src={hero.image.sourceUrl}
          alt={hero.image.altText ?? ""}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[center_40%]"
        />
      )}
      <div className="hero-overlay absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container pt-[200px] pb-28">
        <div className="row">
          <div className="col-12 lg:col-8 flex max-w-[720px] flex-col gap-6">
            {hero && (hero.title || hero.subtitle) && (
              <h1 className="m-0 text-[clamp(40px,5.4vw,64px)] leading-[1.05] font-semibold tracking-[-0.02em] text-white">
                {hero.title}
                {hero.title && hero.subtitle && " "}
                {hero.subtitle && (
                  <span className="font-serif font-normal text-sage italic">
                    {hero.subtitle}
                  </span>
                )}
              </h1>
            )}
            {hero?.description && (
              <p className="m-0 max-w-[560px] whitespace-pre-line text-[19px] text-on-dark">
                {hero.description}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#contact" withArrow>
                Demander une expertise
              </ButtonLink>
              <ButtonLink href="#methode" variant="outline-light">
                Voir comment ça se passe
              </ButtonLink>
            </div>
            {hero && hero.labels.length > 0 && (
              <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-7 gap-y-3 p-0 text-[15px] font-medium text-paper">
                {hero.labels.map((label, i) => (
                  <li key={`${i}-${label}`} className="flex items-center gap-2">
                    <Icon name="check" className="size-[18px] shrink-0 text-sage" />
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
