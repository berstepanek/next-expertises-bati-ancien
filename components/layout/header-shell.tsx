"use client";

import { useEffect, useState } from "react";

/** Seuil de scroll (px) à partir duquel le header prend un fond plein. */
const SCROLL_THRESHOLD = 24;

/* Coquille cliente du header : seule la détection du scroll tourne côté client,
 * le contenu (menu WordPress compris) reste rendu côté serveur via `children`. */
export default function HeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // page rechargée au milieu
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="on-dark fixed inset-x-0  z-50 top-[10px]"
    >
      <div className="container">
        <div
          className={`flex px-4 flex-wrap items-center justify-between gap-6 py-2 border border-white/20 rounded-full text-white transition-[background-color,border-color,box-shadow,top] duration-300 motion-reduce:transition-none   ${
            scrolled
              ? " bg-ink/95 shadow-[0_8px_24px_rgb(20_32_18/0.25)] backdrop-blur "
              : " bg-transparent"
          }`}
        >
          {children}
        </div>
      </div>
    </header>
  );
}
