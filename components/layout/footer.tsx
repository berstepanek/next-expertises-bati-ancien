import Link from "next/link";
import { pillars, site } from "@/lib/content";

const infoLinks = [
  { label: "Méthode", href: "/#methode" },
  { label: "L'expert", href: "/#expert" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const linkClass = "text-on-dark-muted no-underline hover:text-white";

export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-on-dark-muted">
      <div className="container flex flex-col gap-10 pt-14 pb-8">
        <div className="row gy-10">
          <div className="col-12 md:col-6 lg:col-5">
            <div className="flex max-w-[360px] flex-col gap-3">
              <span className="text-xl font-bold text-paper">{site.name}</span>
              <span className="text-[15px]">
                Expertise indépendante des maisons et bâtiments anciens. Zone
                d&apos;intervention : {site.zone}.
              </span>
            </div>
          </div>
          <nav
            aria-label="Expertises"
            className="col-6 md:col-3 lg:offset-1 flex flex-col gap-2.5 text-[15px]"
          >
            <span className="font-bold text-paper">Expertises</span>
            {pillars.map((p) => (
              <Link key={p.number} href="/#expertises" className={linkClass}>
                {p.title}
              </Link>
            ))}
          </nav>
          <nav
            aria-label="Informations"
            className="col-6 md:col-3 flex flex-col gap-2.5 text-[15px]"
          >
            <span className="font-bold text-paper">Informations</span>
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
            <Link href="/mentions-legales" className="text-on-dark-muted hover:text-white">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-on-dark-muted hover:text-white">
              Confidentialité
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
