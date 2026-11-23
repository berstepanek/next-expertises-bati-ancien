import Link from "next/link";
import { site } from "@/lib/content";
import Icon from "@/components/ui/icon";
import ButtonLink from "@/components/ui/button-link";
import Menu from "./menu";
import HeaderShell from "./header-shell";
import MobileMenu from "./mobile-menu";
import SearchDialog from "@/components/search/search-dialog";

export default function Header() {
  return (
    <HeaderShell>
      <Link
        href="/#top"
        className="flex items-center gap-2.5 text-white no-underline hover:text-white"
      >
        <span className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/15">
          <Icon
            name="house"
            strokeWidth={1.8}
            className="size-[22px] text-paper"
          />
        </span>
        <span className="flex flex-col leading-[1.1]">
          <span className="sm:text-lg sm:font-bold">{site.name}</span>

          <span className="hidden sm:block text-[13px] text-white">
            {site.baseline}
          </span>
        </span>
      </Link>

      <nav
        aria-label="Navigation principale"
        className="hidden lg:flex flex-wrap gap-x-7 gap-y-2 text-[15px] font-medium"
      >
        <Menu></Menu>
      </nav>

      <div className="flex flex-nowrap items-center gap-3">
        <SearchDialog />
        <MobileMenu>
          <Menu variant="drawer" />
        </MobileMenu>

        <a
          href={site.phone.href}
          className="hidden lg:flex min-h-11 items-center gap-2 text-[15px] font-semibold text-white no-underline hover:text-accent"
        >
          <Icon name="phone" strokeWidth={1.8} />
          {site.phone.label}
        </a>
        <ButtonLink
          href="/contact"
          variant="primary"
          size="md"
          className="hidden lg:inline-flex"
        >
          Demander une expertise
        </ButtonLink>
      </div>
    </HeaderShell>
  );
}
