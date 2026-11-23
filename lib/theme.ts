export type ThemeColors = {
  /** Accent principal (liens, boutons, icônes) */
  primary: string;
  /** Accent clair, lisible sur fond sombre */
  accent: string;
  accentStrong: string;
  /** Texte principal, fonds sombres (footer) */
  ink: string;
  /** Fond de page */
  paper: string;
  /** Fond de section alternatif (témoignages) */
  mist: string;
  line: string;
  lineSoft: string;
  muted: string;
  mutedDark: string;
  body: string;
  /** Texte sur fond sombre */
  onDark: string;
  onDarkMuted: string;
  /** Champs de formulaire */
  field: string;
  fieldLine: string;
  /** Visuels de remplacement (images absentes) */
  placeholder: string;
  placeholderLine: string;
  gradientStart: string;
  gradientEnd: string;
};

export const themes = {
  foret: {
    primary: "#2f4b2c",
    accent: "#c7dcb0",
    accentStrong: "#b5cc9c",
    ink: "#1c2a1a",
    paper: "#f4f5ef",
    mist: "#eef1e7",
    line: "#e1e4d8",
    lineSoft: "#eceee6",
    muted: "#566252",
    mutedDark: "#455041",
    body: "#2f3a2c",
    onDark: "#e3ead9",
    onDarkMuted: "#d6e0cc",
    field: "#f9faf6",
    fieldLine: "#cdd5c2",
    placeholder: "#e6ecdd",
    placeholderLine: "#a9b89a",
    gradientStart: "#9aabc2",
    gradientEnd: "#424d5d",
  },
  /* Exemple de seconde palette (bleu ardoise), pour tester la bascule. */
  ardoise: {
    primary: "#2c3e5c",
    accent: "#b9cde6",
    accentStrong: "#a3bcdc",
    ink: "#18202e",
    paper: "#f3f5f8",
    mist: "#e9eef4",
    line: "#dde3eb",
    lineSoft: "#e8ecf1",
    muted: "#525e70",
    mutedDark: "#424d5d",
    body: "#2a3444",
    onDark: "#e1e8f1",
    onDarkMuted: "#cfd9e6",
    field: "#f8fafc",
    fieldLine: "#c8d2df",
    placeholder: "#e2e8f0",
    placeholderLine: "#9aabc2",
    gradientStart: "#2c3e5c",
    gradientEnd: "#b9cde6",
  },
  copper: {
    primary: "#fac136",
    accent: "#fac136",
    accentStrong: "#e7ac1d",
    ink: "#18202e",
    paper: "#fffbf2",
    mist: "#fff2d4",
    line: "#f4f4f4",
    lineSoft: "#f4f4f4",
    muted: "#525e70",
    mutedDark: "#424d5d",
    body: "#2a3444",
    onDark: "#000000",
    onDarkMuted: "#000000",
    field: "#f8fafc",
    fieldLine: "#c8d2df",
    placeholder: "#f4f4f4",
    placeholderLine: "#c2c2c2",
    gradientStart: "#d16c1e",
    gradientEnd: "#f5a036",
  },
} satisfies Record<string, ThemeColors>;

export type ThemeName = keyof typeof themes;

/** Thème appliqué au site. */
export const ACTIVE_THEME: ThemeName = "copper";

export const theme: ThemeColors = themes[ACTIVE_THEME];

const toKebab = (key: string) =>
  key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export function themeToCss(colors: ThemeColors = theme): string {
  const colorVars = Object.entries(colors).map(
    ([key, value]) => `--theme-${toKebab(key)}:${value};`,
  );
  return `:root{${[...colorVars].join("")}}`;
}
