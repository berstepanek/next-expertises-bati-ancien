import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllExpertises } from "@/services/expertise";
import { site } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";
import CheckList from "@/components/ui/check-list";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Nos expertises | ${site.name}`,
    description:
      "Toutes les expertises proposées pour les maisons et bâtiments anciens.",
  };
}

export default async function ExpertisesPage() {
  const expertises = await getAllExpertises();

  return (
    <>
      <section className="on-dark bg-forest text-paper">
        <div className="container py-24">
          <SectionHeading
            eyebrow="Nos missions"
            title="Les"
            accent="expertises"
            intro="Diagnostic des désordres, expertise avant achat, litiges et assistance : chaque mission répond à une situation précise."
            dark
            introClassName="text-lg text-on-dark-muted max-w-[640px]"
          />
        </div>
      </section>

      <section>
        <div className="container py-24">
          {expertises.length === 0 ? (
            <p className="m-0 text-lg text-muted">
              Aucune expertise n&apos;est disponible pour le moment.
            </p>
          ) : (
            <ul className="row g-6 m-0 list-none p-0">
              {expertises.map((expertise, i) => (
                <li key={expertise.id} className="col-12 md:col-6 lg:col-4 flex">
                  <Link
                    href={`/expertises/${expertise.slug}`}
                    className="group flex w-full flex-col overflow-hidden rounded-[28px] border border-line bg-white text-ink shadow-card transition-colors hover:border-forest"
                  >
                    {expertise.image && (
                      <Image
                        src={expertise.image.sourceUrl}
                        alt={expertise.image.altText || expertise.title}
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
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="m-0 text-[26px] leading-[1.15] font-semibold tracking-[-0.01em]">
                        {expertise.name || expertise.title}
                      </h2>
                      {expertise.shortDescription ? (
                        <p className="m-0 text-base text-muted">
                          {expertise.shortDescription}
                        </p>
                      ) : expertise.excerpt && (
                        <div
                          className="text-base text-muted [&_p]:m-0"
                          dangerouslySetInnerHTML={{ __html: expertise.excerpt }}
                        />
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
