/* Recherche plein texte sur un petit index (quelques dizaines de documents) :
 * insensible aux accents et à la casse, sans dépendance. */

export type SearchDocType = "expertise" | "faq" | "page";

export type SearchDoc = {
  type: SearchDocType;
  title: string;
  url: string;
  /** Résumé court, affiché quand la requête ne correspond qu'au titre */
  excerpt: string;
  /** Texte brut indexé (titre exclu) */
  text: string;
};

export type SearchResult = SearchDoc & {
  /** Extrait centré sur la première occurrence trouvée */
  snippet: string;
};

const TYPE_WEIGHT: Record<SearchDocType, number> = {
  expertise: 0.3,
  faq: 0.2,
  page: 0.1,
};

/** Minuscules, sans accents ni ponctuation (même longueur que l'original
 *  pour les lettres latines, ce qui permet de surligner dans le texte d'origine). */
export function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’'`]/g, " ");
}

/** Mots de la requête (au moins 2 caractères). */
export function queryTerms(query: string) {
  return normalize(query)
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length >= 2);
}

function makeSnippet(doc: SearchDoc, terms: string[], size = 170) {
  const text = doc.text || doc.excerpt;
  const normText = normalize(text);
  let first = -1;
  for (const term of terms) {
    const i = normText.indexOf(term);
    if (i !== -1 && (first === -1 || i < first)) first = i;
  }
  if (first === -1) return doc.excerpt;

  const start = Math.max(0, first - 50);
  const end = Math.min(text.length, start + size);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}

export function searchDocs(docs: SearchDoc[], query: string, limit = 8): SearchResult[] {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];
  const normQuery = normalize(query).trim();

  const scored: { doc: SearchDoc; score: number }[] = [];

  for (const doc of docs) {
    const title = normalize(doc.title);
    const text = normalize(doc.text);
    let score = 0;
    let matchesAll = true;

    for (const term of terms) {
      // Début de mot : « fiss » trouve « fissure », pas « défissé ».
      const re = new RegExp(`(^|[^a-z0-9])${term}`);
      const inTitle = re.test(title);
      const inText = re.test(text);
      if (!inTitle && !inText) {
        matchesAll = false;
        break;
      }
      score += (inTitle ? 3 : 0) + (inText ? 1 : 0);
    }
    if (!matchesAll) continue;

    if (title.startsWith(normQuery)) score += 5;
    else if (title.includes(normQuery)) score += 2;
    score += TYPE_WEIGHT[doc.type];

    scored.push({ doc, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc }) => ({ ...doc, snippet: makeSnippet(doc, terms) }));
}

/** Découpe un texte en segments à surligner (correspondance insensible aux accents). */
export function highlight(text: string, terms: string[]) {
  if (terms.length === 0) return [{ text, match: false }];
  const norm = normalize(text);
  // La normalisation conserve la longueur pour le français : les index restent alignés.
  if (norm.length !== text.length) return [{ text, match: false }];

  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts: { text: string; match: boolean }[] = [];
  let last = 0;
  for (const m of norm.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) parts.push({ text: text.slice(last, i), match: false });
    parts.push({ text: text.slice(i, i + m[0].length), match: true });
    last = i + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), match: false });
  return parts;
}
