import { Metadata } from "next";
import { getAllExpertises } from "@/services/expertise";
import { site } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";
import ExpertiseCard from "@/components/expertise/expertise-card";

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
                  <ExpertiseCard expertise={expertise} index={i} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
