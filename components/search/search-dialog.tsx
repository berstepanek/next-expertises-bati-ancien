"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/ui/icon";
import {
  highlight,
  queryTerms,
  searchDocs,
  type SearchDoc,
  type SearchDocType,
} from "@/lib/search";

const TYPE_LABEL: Record<SearchDocType, string> = {
  expertise: "Expertise",
  faq: "Question",
  page: "Page",
};

const SHORTCUTS = [
  { label: "Nos expertises", href: "/expertises" },
  { label: "Questions fréquentes", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

type Status = "idle" | "loading" | "ready" | "error";

function Highlighted({ text, terms }: { text: string; terms: string[] }) {
  return (
    <>
      {highlight(text, terms).map((part, i) =>
        part.match ? (
          <mark key={i} className="rounded-sm bg-sage/70 px-0.5 text-ink">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

/* Loupe du header + fenêtre de recherche (Ctrl/⌘+K).
 * L'index (/search-index.json) est chargé à la première ouverture. */
export default function SearchDialog() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const [mounted, setMounted] = useState(false);
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => setMounted(true), []);

  const results = useMemo(() => searchDocs(docs, query), [docs, query]);
  const terms = useMemo(() => queryTerms(query), [query]);

  const loadIndex = useCallback(async () => {
    if (status === "loading" || status === "ready") return;
    setStatus("loading");
    try {
      const res = await fetch("/search-index.json");
      if (!res.ok) throw new Error(String(res.status));
      setDocs(await res.json());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [status]);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    inputRef.current?.select();
    loadIndex();
  }, [loadIndex]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Raccourci Ctrl+K / ⌘+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (url: string) => {
    close();
    router.push(url);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]?.url ?? results[0].url);
    }
  };

  const hasQuery = terms.length > 0;
  const optionId = (i: number) => `${listId}-opt-${i}`;

  const dialog = (
    <dialog
      ref={dialogRef}
      aria-label="Rechercher sur le site"
      // Clic sur le fond (en dehors du panneau) : fermeture
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-0 mx-auto mt-[8vh] w-[calc(100%-32px)] max-w-[640px] max-h-[80vh] overflow-hidden rounded-[28px] border border-line bg-paper p-0 text-ink shadow-[0_24px_64px_rgb(20_32_18/0.35)] backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[80vh] flex-col">
        <div className="flex items-center gap-3 border-b border-line px-5 py-3">
          <Icon name="search" className="size-5 shrink-0 text-forest" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Fissure, humidité, achat, tarif…"
            aria-label="Rechercher"
            role="combobox"
            aria-expanded={hasQuery && results.length > 0}
            aria-controls={listId}
            aria-activedescendant={
              hasQuery && results.length > 0 ? optionId(active) : undefined
            }
            autoComplete="off"
            className="min-h-11 w-full bg-transparent text-lg outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Fermer la recherche"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-white hover:text-ink"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-3 py-3">
          {!hasQuery && (
            <div className="flex flex-col gap-2 px-2 py-2">
              <p className="m-0 text-sm font-semibold tracking-wide text-muted uppercase">
                Accès rapide
              </p>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {SHORTCUTS.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={close}
                      className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-[15px] font-medium text-ink no-underline hover:border-forest hover:text-forest"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasQuery && status === "loading" && (
            <p className="m-0 px-2 py-4 text-muted">Chargement…</p>
          )}

          {hasQuery && status === "error" && (
            <p className="m-0 px-2 py-4 text-muted">
              La recherche est momentanément indisponible.
            </p>
          )}

          {hasQuery && status === "ready" && results.length === 0 && (
            <div className="flex flex-col gap-2 px-2 py-4">
              <p className="m-0 text-ink">
                Aucun résultat pour «&nbsp;{query.trim()}&nbsp;».
              </p>
              <Link
                href="/contact"
                onClick={close}
                className="self-start font-semibold text-forest underline"
              >
                Posez-nous votre question
              </Link>
            </div>
          )}

          {hasQuery && results.length > 0 && (
            <ul
              id={listId}
              role="listbox"
              aria-label="Résultats"
              className="m-0 flex list-none flex-col gap-1 p-0"
            >
              {results.map((r, i) => (
                <li
                  key={r.url}
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === active}
                >
                  <Link
                    href={r.url}
                    onClick={close}
                    onMouseEnter={() => setActive(i)}
                    tabIndex={-1}
                    className={`flex flex-col gap-1 rounded-[18px] px-4 py-3 text-ink no-underline ${
                      i === active
                        ? "bg-white shadow-[0_2px_8px_rgb(20_32_18/0.08)]"
                        : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-forest/10 px-2 py-0.5 text-xs font-semibold text-forest">
                        {TYPE_LABEL[r.type]}
                      </span>
                      <span className="font-semibold">
                        <Highlighted text={r.title} terms={terms} />
                      </span>
                    </span>
                    {r.snippet && (
                      <span className="line-clamp-2 text-[15px] text-muted">
                        <Highlighted text={r.snippet} terms={terms} />
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="m-0 hidden border-t border-line px-5 py-2.5 text-xs text-muted sm:block">
          <kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd>{" "}
          pour naviguer · <kbd className="font-sans">Entrée</kbd> pour ouvrir ·{" "}
          <kbd className="font-sans">Échap</kbd> pour fermer
        </p>
      </div>
    </dialog>
  );

  return (
    <>
      <button
        type="button"
        onClick={open}
        onMouseEnter={loadIndex}
        aria-label="Rechercher (Ctrl+K)"
        aria-haspopup="dialog"
        className="flex min-h-11 cursor-pointer min-w-11 items-center justify-center gap-2 text-[15px] font-semibold text-white hover:text-sage"
      >
        <Icon name="search" strokeWidth={1.8} className="size-5" />
      </button>
      {/* Rendu dans <body> : hors du header `.on-dark` (couleurs et focus clairs). */}
      {mounted && createPortal(dialog, document.body)}
    </>
  );
}
