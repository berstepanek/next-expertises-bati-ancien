import Image from "next/image";
import Link from "next/link";
import type { Expertise } from "@/services/expertise";
import CheckList from "@/components/ui/check-list";

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
    <Link
      href={`/expertises/${expertise.slug}`}
      className="group flex w-full flex-col overflow-hidden rounded-[28px] border border-line bg-white text-ink shadow-card transition-colors hover:border-forest"
    >
      {expertise.image && (
        <Image
          src={expertise.image.sourceUrl}
          alt={expertise.image.altText || name}
          width={expertise.image.width ?? 600}
          height={expertise.image.height ?? 400}
          className="aspect-[3/2] w-full object-cover"
        />
      )}
      <div className="flex grow flex-col gap-4 p-7">
        <span
          className="font-serif text-[40px] leading-none text-sage italic"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <Heading className="m-0 text-[26px] leading-[1.15] font-semibold tracking-[-0.01em]">
          {name}
        </Heading>
        {expertise.shortDescription ? (
          <p className="m-0 text-base text-muted">
            {expertise.shortDescription}
          </p>
        ) : (
          expertise.excerpt && (
            <div
              className="text-base text-muted [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: expertise.excerpt }}
            />
          )
        )}
        {expertise.strengths.length > 0 && (
          <CheckList items={expertise.strengths} />
        )}
        {expertise.target && (
          <p className="m-0 rounded-[14px] bg-paper px-4 py-3.5 text-[15px] text-muted-dark">
            <strong className="text-ink">Pour qui&nbsp;: </strong>
            {expertise.target}
          </p>
        )}
        <span className="mt-auto pt-2 text-[15px] font-semibold text-forest group-hover:underline">
          Découvrir l&apos;expertise →
        </span>
      </div>
    </Link>
  );
}
