"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { useMounted } from "@/lib/use-mounted";
import Icon from "@/components/ui/icon";
import ButtonLink from "@/components/ui/button-link";

/* Bouton burger + offcanvas (mobile / tablette, < lg).
 * Le menu est rendu côté serveur et transmis via `children`. */
export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setOpen(true);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Changement de route (lien du menu, bouton retour…) : fermeture
  useEffect(() => {
    close();
  }, [pathname, close]);

  const panel = (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label="Menu"
      // Échap, ✕ ou clic extérieur : l'état suit l'événement natif `close`
      onClose={() => setOpen(false)}
      onClick={(e) => {
        // Clic sur le fond (en dehors du panneau) ou sur un lien : fermeture
        if (
          e.target === e.currentTarget ||
          (e.target as Element).closest("a")
        ) {
          close();
        }
      }}
      className="m-0 ml-auto h-dvh max-h-none w-[min(360px,88vw)] max-w-none translate-x-full overflow-hidden border-l border-line bg-paper p-0 text-ink shadow-dialog transition-[translate,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:translate-x-0 starting:open:translate-x-full motion-reduce:transition-none"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <span className="text-lg font-bold">{site.name}</span>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer le menu"
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-white hover:text-ink"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <nav
          aria-label="Navigation mobile"
          className="flex-1 overflow-y-auto px-5 py-2"
        >
          {children}
        </nav>

        <div className="flex flex-col gap-3 border-t border-line px-5 py-5">
          <a
            href={site.phone.href}
            className="flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink no-underline hover:text-primary"
          >
            <Icon name="phone" strokeWidth={1.8} />
            {site.phone.label}
          </a>
          <ButtonLink href="/contact" variant="accent" size="md">
            Demander une expertise
          </ButtonLink>
        </div>
      </div>
    </dialog>
  );

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label="Ouvrir le menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex min-h-11 min-w-8 cursor-pointer items-center justify-center text-white hover:text-accent lg:hidden"
      >
        <Icon name="bar" className="size-5" />
      </button>
      {/* Rendu dans <body> : hors du header `.on-dark` (couleurs et focus clairs). */}
      {mounted && createPortal(panel, document.body)}
    </>
  );
}
