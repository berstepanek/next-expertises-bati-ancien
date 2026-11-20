import { getAllExpertises } from "@/services/expertise";
import SectionHeading from "@/components/ui/section-heading";
import ExpertiseCard from "@/components/expertise/expertise-card";

export default async function Pillars() {
  const expertises = await getAllExpertises();

  if (expertises.length === 0) return null;

  return (
    <section id="expertises" className="scroll-mt-4 border-b border-line bg-white">
      <div className="container pt-24 pb-[104px]">
        <SectionHeading
          eyebrow="Nos piliers d'intervention"
          title="Des solutions pour chaque situation,"
          accent="une même exigence"
          intro="Quelle que soit votre situation, l'expertise part des matériaux et de l'histoire de votre maison, avec un rapport clair à la clé."
          align="center"
          titleClassName="max-w-[820px] text-[clamp(34px,4.4vw,52px)] leading-[1.08]"
          introClassName="max-w-[640px] text-lg text-muted"
          className="mb-14"
        />

        <ul className="row g-6 m-0 list-none p-0">
          {expertises.map((expertise, i) => (
            <li key={expertise.id} className="col-12 md:col-6 lg:col-4 flex">
              <ExpertiseCard expertise={expertise} index={i} headingLevel="h3" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
