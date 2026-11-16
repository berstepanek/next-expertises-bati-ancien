import Link from "next/link";
import { mainNav, site } from "@/lib/content";
import Icon from "@/components/ui/icon";
import ButtonLink from "@/components/ui/button-link";
import Menu from "./menu";

export default function Header() {
  return (
    <header className="on-dark absolute inset-x-0 top-0 z-10 border-b border-white/20 text-white">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-4">
        <Link
          href="/#top"
          className="flex items-center gap-2.5 text-white no-underline hover:text-white"
        >
          <span className="flex size-10 items-center justify-center rounded-[10px] border border-white/30 bg-white/15">
            <Icon
              name="house"
              strokeWidth={1.8}
              className="size-[22px] text-paper"
            />
          </span>
          <span className="flex flex-col leading-[1.1]">
            <span className="text-lg font-bold">{site.name}</span>

            <span className="text-[13px] text-on-dark-muted">
              {site.baseline}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="flex flex-wrap gap-x-7 gap-y-2 text-[15px] font-medium"
        >
          <Menu></Menu>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={site.phone.href}
            className="flex min-h-11 items-center gap-2 text-[15px] font-semibold text-white no-underline hover:text-sage"
          >
            <Icon name="phone" strokeWidth={1.8} />
            {site.phone.label}
          </a>
          <ButtonLink href="/#contact" variant="sage" size="md">
            Demander une expertise
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
