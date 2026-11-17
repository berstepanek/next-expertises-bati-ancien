import { Metadata } from "next";
import { site } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";
import Contact from "@/components/home/contact";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Contact | ${site.name}`,
    description:
      "Contactez un expert indépendant en bâtiment ancien : rappel sous 48 h, premier échange gratuit et sans engagement.",
  };
}

export default function ContactPage() {
  return (
    <>
      <section className="on-dark bg-forest text-paper">
        <div className="container py-24">
          <SectionHeading
            eyebrow="Contact"
            title="Parlons de"
            accent="votre maison"
            intro="Décrivez votre situation : nous vous rappelons sous 48 h pour en parler, gratuitement et sans engagement."
            dark
            introClassName="text-lg text-on-dark-muted max-w-[640px]"
          />
        </div>
      </section>

      <Contact
        className="pt-24"
        title={
          <>
            Nous <span className="serif-accent text-sage">joindre</span>
          </>
        }
        intro="Par téléphone, par e-mail ou via le formulaire : choisissez le moyen qui vous convient."
      />
    </>
  );
}
