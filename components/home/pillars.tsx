import { pillars } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";
import PillarCard from "./pillar-card";

export default function Pillars() {
  return (
    <section id="expertises" className="scroll-mt-4 border-b border-line bg-white">
      <div className="container pt-24 pb-[104px]">
        <SectionHeading
          eyebrow="Nos 3 piliers d'intervention"
          title="Trois façons de vous aider,"
          accent="une même exigence"
          intro="Quelle que soit votre situation, l'expertise part des matériaux et de l'histoire de votre maison, avec un rapport clair à la clé."
          align="center"
          titleClassName="max-w-[820px] text-[clamp(34px,4.4vw,52px)] leading-[1.08]"
          introClassName="max-w-[640px] text-lg text-muted"
          className="mb-14"
        />

        <div className="row g-6">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="col-12 md:col-6 lg:col-4 flex">
              <PillarCard pillar={pillar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
