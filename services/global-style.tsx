import { fetchGraphQL } from "../lib/graphql-client";

/** Classe des conteneurs qui rendent du HTML WordPress. */
const SCOPE_SELECTOR = ".cms-content";

const WP_BASE_URL = (process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT ?? "").replace(
  /\/graphql\/?$/,
  "",
);

/* CSS des blocs : enqueue à part par WordPress, absent de `globalStylesheet`
 * (qui ne contient que le theme.json). Servi par le WP lui-même pour rester
 * aligné sur sa version. */
const WP_STYLESHEETS = [
  "/wp-includes/css/dist/block-library/style.min.css",
  "/wp-includes/css/classic-themes.min.css",
];

const GLOBAL_STYLESHEET_QUERY = `
  query GlobalStylesheet {
    globalStylesheet
  }
`;

async function fetchWpStylesheet(path: string): Promise<string> {
  try {
    const res = await fetch(`${WP_BASE_URL}${path}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.text();
  } catch (error) {
    console.error(`Feuille de style WordPress indisponible (${path})`, error);
    return "";
  }
}

/**
 * Sépare les règles de premier niveau :
 * - `:root{…}` (custom properties) et `@keyframes` restent globaux :
 *   `:root` ne peut pas être le sujet d'une règle dans un `@scope`, et
 *   `@keyframes` n'y est pas autorisé ;
 * - `@charset` est supprimé (invalide hors début de feuille) ;
 * - tout le reste est scopé.
 */
function splitRules(css: string): { global: string; scoped: string } {
  let global = "";
  let scoped = "";
  let start = 0;
  let depth = 0;

  for (let i = 0; i < css.length; i++) {
    const char = css[i];

    if (char === ";" && depth === 0) {
      // Instruction sans bloc (@charset, @import…) : ignorée.
      start = i + 1;
    } else if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0) {
        const rule = css.slice(start, i + 1).trim();
        const prelude = rule.slice(0, rule.indexOf("{")).trim();
        if (prelude === ":root" || /^@(-webkit-)?keyframes\b/.test(prelude)) {
          global += rule;
        } else {
          scoped += rule;
        }
        start = i + 1;
      }
    }
  }

  return { global, scoped };
}

/** CSS WordPress (theme.json + blocs) à injecter dans le layout, scopé à `.cms-content`. */
export async function getGlobalStylesheet(): Promise<string | null> {
  const [themeCss, ...blockCss] = await Promise.all([
    fetchGraphQL<{ globalStylesheet: string | null }>(GLOBAL_STYLESHEET_QUERY)
      .then((data) => data.globalStylesheet ?? "")
      .catch((error) => {
        console.error("globalStylesheet indisponible", error);
        return "";
      }),
    ...WP_STYLESHEETS.map(fetchWpStylesheet),
  ]);

  // Le CSS des blocs d'abord, le theme.json ensuite (même ordre que WordPress).
  const { global, scoped } = splitRules([...blockCss, themeCss].join("\n"));
  if (!global && !scoped) return null;

  return `${global}\n@scope (${SCOPE_SELECTOR}) {\n${scoped}\n}`;
}
