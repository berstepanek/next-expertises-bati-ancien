import Link from "next/link";
import { site } from "@/lib/content";
import { getAllExpertises, type Expertise } from "@/services/expertise";

const infoLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const linkClass = "text-white no-underline hover:text-primary";

/* Le footer est rendu sur toutes les pages : une erreur WordPress
 * ne doit pas casser le site, on masque simplement la liste. */
async function getFooterExpertises(): Promise<Expertise[]> {
  try {
    return await getAllExpertises();
  } catch (error) {
    console.error("Footer : impossible de charger les expertises", error);
    return [];
  }
}

export default async function Footer() {
  const expertises = await getFooterExpertises();

  return (
    <footer className="bg-black text-on-dark-muted">
      <div className="container flex flex-col gap-10 pt-14 pb-8">
        <div className="row gy-10">
          <div className="col-12 md:col-6 lg:col-5">
            <div className="flex max-w-[360px] flex-col gap-3">
              <span className="text-xl font-bold text-white">{site.name}</span>
              <span className="text-[15px] text-white">
                Expertise indépendante des maisons et bâtiments anciens. Zone
                d&apos;intervention : {site.zone}.
              </span>
            </div>
          </div>
          {expertises.length > 0 && (
            <nav
              aria-label="Expertises"
              className="col-6 md:col-3 lg:offset-1 flex flex-col gap-2.5 text-[15px]"
            >
              <Link
                href="/expertises"
                className="font-bold text-white no-underline hover:text-primary"
              >
                Expertises
              </Link>
              {expertises.map((expertise) => (
                <Link
                  key={expertise.id}
                  href={`/expertises/${expertise.slug}`}
                  className={linkClass}
                >
                  {expertise.name || expertise.title}
                </Link>
              ))}
            </nav>
          )}
          <nav
            aria-label="Informations"
            className="col-6 md:col-3 flex flex-col gap-2.5 text-[15px]"
          >
            <span className="font-bold text-white">Informations</span>
            {infoLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-on-dark-muted/20 pt-6 text-sm">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="flex gap-5">
            {/* TODO : créer les pages /mentions-legales et /confidentialite */}
            <Link
              href="/politique-de-confidentialite"
              className="text-white  hover:text-primary"
            >
              Politique de confidentialite
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
