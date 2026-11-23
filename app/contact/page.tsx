import { Metadata } from "next";
import { site } from "@/lib/content";
import SectionHeading from "@/components/ui/section-heading";
import Icon, { type IconName } from "@/components/ui/icon";
import ContactForm from "@/components/home/contact-form";
import { pageMetadata } from "@/lib/seo";

function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper/10">
      <Icon name={name} strokeWidth={1.8} className="size-5" />
    </span>
  );
}

const linkClass =
  "flex min-h-11 items-center gap-3.5 text-paper no-underline hover:text-accent";

type ContactProps = {
  /** Titre du bloc (par défaut : « Parlons de votre maison ») */
  title?: React.ReactNode;
  /** Texte d'introduction sous le titre */
  intro?: React.ReactNode;
  /** Classes supplémentaires sur la section (espacements…) */
  className?: string;
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Contact",
    description:
      "Contactez un expert indépendant en bâtiment ancien : rappel sous 48 h, premier échange gratuit et sans engagement.",
    path: "/contact",
  });
}

export default function ContactPage({
  title = (
    <>
      Parlons de <span className="serif-accent text-accent">votre maison</span>
    </>
  ),
  intro = "Décrivez votre situation : nous vous rappelons sous 48 h pour en parler, gratuitement et sans engagement.",
  className = "",
}: ContactProps) {
  return (
    <>
      <section className="on-dark text-paper bg-linear-to-br from-gradient-start to-gradient-end">
        <div className="container py-24">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Parlons de"
            accent="votre besoin"
            intro=" Cabinet d'expertise indépendant, nous mettons notre savoir-faire technique et notre maîtrise du droit de la construction au service de la préservation des bâtiments traditionnels. Nous intervenons à vos côtés pour diagnostiquer les pathologies, résoudre les litiges de travaux et sécuriser vos transactions immobilières."
            dark
            introClassName="text-lg text-on-dark-muted max-w-[640px]"
          />
        </div>
      </section>

      <section
        id="contact"
        className={`container scroll-mt-6 pb-[104px] pt-24 ${className}`}
      >
        <div className="on-dark rounded-[32px] bg-linear-to-br from-gradient-start to-gradient-end p-[clamp(28px,5vw,64px)] text-paper">
          <div className="row g-12">
            <div className="col-12 lg:col-5 flex flex-col gap-5">
              <h2 className="h2 text-[clamp(32px,4vw,46px)]">{title}</h2>
              <p className="m-0 text-lg text-on-dark-muted">{intro}</p>
              <div className="mt-2 flex flex-col gap-3.5 text-lg font-semibold">
                <a href={site.phone.href} className={linkClass}>
                  <IconBadge name="phone" />
                  {site.phone.label}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className={`${linkClass} break-all`}
                >
                  <IconBadge name="mail" />
                  {site.email}
                </a>
                <span className="flex items-center gap-3.5">
                  <IconBadge name="pin" />
                  Zone d&apos;intervention : {site.zone}
                </span>
              </div>
            </div>
            <div className="col-12 lg:col-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
