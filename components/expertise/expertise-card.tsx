import Link from "next/link";
import type { Expertise } from "@/services/expertise";
import CheckList from "@/components/ui/check-list";
import Icon, { type IconName } from "@/components/ui/icon";

/** Icônes attribuées selon la position (aucun champ SCF dédié). */
const ICONS: IconName[] = ["crack", "house-search", "scales"];

type Props = {
  expertise: Expertise;
  /** Position dans la liste (0-based), affichée en « 01 », « 02 »… */
  index: number;
  /** Niveau du titre selon la hiérarchie de la page */
  headingLevel?: "h2" | "h3";
};

export default function ExpertiseCard({
  expertise,
  index,
  headingLevel: Heading = "h2",
}: Props) {
  const name = expertise.name || expertise.title;

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
      <div className="flex flex-col gap-5 bg-forest px-7 pt-7 pb-8 text-white">
        <div className="flex items-start justify-between">
          <span className="flex size-[60px] items-center justify-center rounded-[18px] bg-white/15">
            <Icon
              name={ICONS[index % ICONS.length]}
              strokeWidth={1.7}
              className="size-[30px] text-white"
            />
          </span>
          <span
            className="font-serif text-[56px] leading-none italic text-sage"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <Heading className="m-0 text-[30px] leading-[1.1] font-semibold tracking-[-0.01em]">
          {name}
        </Heading>
        {expertise.shortDescription ? (
          <p className="m-0 text-[17px] text-on-dark">
            {expertise.shortDescription}
          </p>
        ) : (
          expertise.excerpt && (
            <div
              className="text-[17px] text-on-dark [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: expertise.excerpt }}
            />
          )
        )}
      </div>
      <div className="flex grow flex-col gap-5 p-7">
        {expertise.strengths.length > 0 && (
          <CheckList items={expertise.strengths} />
        )}
        {expertise.target && (
          <p className="m-0 rounded-[14px] bg-paper px-4 py-3.5 text-[15px] text-muted-dark">
            <strong className="text-ink">Pour qui&nbsp;: </strong>
            {expertise.target}
          </p>
        )}
        <Link
          href={`/expertises/${expertise.slug}`}
          className="btn mt-auto min-h-[50px] gap-2 border-[1.5px] border-forest text-base text-forest hover:bg-forest hover:text-white"
        >
          Découvrir l&apos;expertise
          <Icon name="arrow" className="size-[18px]" />
        </Link>
      </div>
    </article>
  );
}
