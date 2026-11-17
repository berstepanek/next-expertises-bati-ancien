import { site } from "@/lib/content";
import Icon, { type IconName } from "@/components/ui/icon";
import ContactForm from "./contact-form";

function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper/10">
      <Icon name={name} strokeWidth={1.8} className="size-5" />
    </span>
  );
}

const linkClass =
  "flex min-h-11 items-center gap-3.5 text-paper no-underline hover:text-sage";

type ContactProps = {
  /** Titre du bloc (par défaut : « Parlons de votre maison ») */
  title?: React.ReactNode;
  /** Texte d'introduction sous le titre */
  intro?: React.ReactNode;
  /** Classes supplémentaires sur la section (espacements…) */
  className?: string;
};

export default function Contact({
  title = (
    <>
      Parlons de <span className="serif-accent text-sage">votre maison</span>
    </>
  ),
  intro = "Décrivez votre situation : nous vous rappelons sous 48 h pour en parler, gratuitement et sans engagement.",
  className = "",
}: ContactProps) {
  return (
    <section
      id="contact"
      className={`container scroll-mt-6 pb-[104px] ${className}`}
    >
      <div className="on-dark rounded-[32px] bg-forest p-[clamp(28px,5vw,64px)] text-paper">
        <div className="row g-12">
          <div className="col-12 lg:col-5 flex flex-col gap-5">
            <h2 className="h2 text-[clamp(32px,4vw,46px)]">{title}</h2>
            <p className="m-0 text-lg text-on-dark-muted">{intro}</p>
            <div className="mt-2 flex flex-col gap-3.5 text-lg font-semibold">
              <a href={site.phone.href} className={linkClass}>
                <IconBadge name="phone" />
                {site.phone.label}
              </a>
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
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
  );
}
