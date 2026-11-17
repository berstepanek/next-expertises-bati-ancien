import { fetchGraphQL } from "../lib/graphql-client";

/** Section « Situations » de la home (groupe SCF `home` de la page d'accueil). */
export type HomeSituations = {
  /** SCF « Titre » (situations_title) */
  title: string | null;
  /** SCF « Description » (situations_description) */
  description: string | null;
  /** SCF « Baseline » (situation_baseline) */
  baseline: string | null;
  /** SCF « Libellés » (situations_labels) */
  labels: string[];
};

type RawHomeSituations = {
  titre: string | null;
  description: string | null;
  baseline: string | null;
  libelle: { libelle: string | null }[] | null;
};

const HOME_SITUATIONS_QUERY = `
  query HomeSituations {
    pageBy(uri: "/") {
      home {
        titre
        description
        baseline
        libelle {
          libelle
        }
      }
    }
  }
`;

export async function getHomeSituations(): Promise<HomeSituations | null> {
  const data = await fetchGraphQL<{
    pageBy: { home: RawHomeSituations | null } | null;
  }>(HOME_SITUATIONS_QUERY);

  const home = data.pageBy?.home;
  if (!home) return null;

  return {
    title: home.titre?.trim() || null,
    description: home.description?.trim() || null,
    baseline: home.baseline?.trim() || null,
    labels: (home.libelle ?? [])
      .map((row) => row.libelle?.trim())
      .filter((label): label is string => !!label),
  };
}
