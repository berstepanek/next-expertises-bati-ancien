import { cache } from "react";
import { fetchGraphQL } from "../lib/graphql-client";
import type { ExpertiseImage } from "./expertise";

/** Section « Hero » de la home (groupe SCF `home` de la page d'accueil). */
export type HomeHero = {
  /** SCF « Titre » (hero_title) */
  title: string | null;
  /** SCF « Sous titre » (hero_subtitle) */
  subtitle: string | null;
  /** SCF « Description » (hero_description) */
  description: string | null;
  /** SCF « Image de fond » (hero_screenshot) */
  image: ExpertiseImage | null;
  /** SCF « Libellés » (hero_labels) */
  labels: string[];
};

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

/** Ligne de répéteur titre + description (method_labels, rapport_labels). */
export type HomeItem = {
  /** SCF « Titre » (*_labels_title) */
  title: string;
  /** SCF « Description » (*_labels_description) */
  description: string | null;
};

/** Section « Méthode » de la home (groupe SCF `home` de la page d'accueil). */
export type HomeMethod = {
  /** SCF « Titre » (method_title) */
  title: string | null;
  /** SCF « Description » (method_description) */
  description: string | null;
  /** SCF « Baseline » (method_baseline) */
  baseline: string | null;
  /** SCF « Libellés » (method_labels) */
  steps: HomeItem[];
};

/** Section « Rapport » de la home (groupe SCF `home` de la page d'accueil). */
export type HomeReport = {
  /** SCF « Titre » (rapport_title) */
  title: string | null;
  /** SCF « Description » (rapport_description) */
  description: string | null;
  /** SCF « Baseline » (rapport_baseline) */
  baseline: string | null;
  /** SCF « Libellés » (rapport_labels) */
  items: HomeItem[];
};

/** Section « Votre interlocuteur » de la home (groupe SCF `home` de la page d'accueil). */
export type HomeExpert = {
  /** SCF « Photo » (interlocutor_photo) */
  photo: ExpertiseImage | null;
  /** SCF « Titre » (interlocutor_title) */
  title: string | null;
  /** SCF « Description » (interlocutor_description) */
  description: string | null;
  /** SCF « Baseline » (interlocutor_baseline) */
  baseline: string | null;
  /** SCF « Libellés » (interlocutor_labels) */
  items: HomeItem[];
};

/** Avis client (ligne du répéteur testimony_item). */
export type HomeTestimony = {
  /** SCF « Nom » (testimony_item_name) */
  name: string | null;
  /** SCF « Description » (testimony_item_description) */
  description: string;
};

/** Section « Témoignages » de la home (groupe SCF `home` de la page d'accueil). */
export type HomeTestimonials = {
  /** SCF « Titre » (testimony_title) */
  title: string | null;
  /** SCF « Baseline » (testimony_baseline) */
  baseline: string | null;
  /** SCF « Avis » (testimony_item) */
  items: HomeTestimony[];
};

type RawImage = {
  node: {
    sourceUrl: string | null;
    altText: string | null;
    mediaDetails: { width: number | null; height: number | null } | null;
  } | null;
} | null;

type RawHome = {
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroDescription: string | null;
  heroScreenshot: RawImage;
  heroLabels: { heroLabelsText: string | null }[] | null;
  situationsTitre: string | null;
  situationsDescription: string | null;
  situationsBaseline: string | null;
  situationsLabels: { situationsLabelsLabel: string | null }[] | null;
  methodTitle: string | null;
  methodDescription: string | null;
  methodBaseline: string | null;
  methodLabels:
    | {
        methodLabelsTitle: string | null;
        methodLabelsDescription: string | null;
      }[]
    | null;
  rapportTitle: string | null;
  rapportDescription: string | null;
  rapportBaseline: string | null;
  rapportLabels:
    | {
        rapportLabelsTitle: string | null;
        rapportLabelsDescription: string | null;
      }[]
    | null;
  interlocutorPhoto: RawImage;
  interlocutorTitle: string | null;
  interlocutorDescription: string | null;
  interlocutorBaseline: string | null;
  interlocutorLabels:
    | {
        interlocutorLabelsTitle: string | null;
        interlocutorLabelsDescription: string | null;
      }[]
    | null;
  testimonyTitle: string | null;
  testimonyBaseline: string | null;
  testimonyItem:
    | {
        testimonyItemDescription: string | null;
        /** graphql_field_name SCF : « testimonyitemName » (i minuscule) */
        testimonyitemName: string | null;
      }[]
    | null;
};

const HOME_QUERY = `
  query Home {
    pageBy(uri: "/") {
      home {
        heroTitle
        heroSubtitle
        heroDescription
        heroScreenshot {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        heroLabels {
          heroLabelsText
        }
        situationsTitre
        situationsDescription
        situationsBaseline
        situationsLabels {
          situationsLabelsLabel
        }
        methodTitle
        methodDescription
        methodBaseline
        methodLabels {
          methodLabelsTitle
          methodLabelsDescription
        }
        rapportTitle
        rapportDescription
        rapportBaseline
        rapportLabels {
          rapportLabelsTitle
          rapportLabelsDescription
        }
        interlocutorPhoto {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        interlocutorTitle
        interlocutorDescription
        interlocutorBaseline
        interlocutorLabels {
          interlocutorLabelsTitle
          interlocutorLabelsDescription
        }
        testimonyTitle
        testimonyBaseline
        testimonyItem {
          testimonyItemDescription
          testimonyitemName
        }
      }
    }
  }
`;

const clean = (value: string | null | undefined) => value?.trim() || null;

/** Nettoie les lignes d'un répéteur titre/description, en ignorant celles sans titre. */
function toItems<T>(
  rows: T[] | null,
  pick: (row: T) => [string | null, string | null],
): HomeItem[] {
  return (rows ?? []).flatMap((row) => {
    const [rawTitle, rawDescription] = pick(row);
    const title = clean(rawTitle);
    return title ? [{ title, description: clean(rawDescription) }] : [];
  });
}

function toImage(raw: RawImage): ExpertiseImage | null {
  const media = raw?.node;
  if (!media?.sourceUrl) return null;
  return {
    sourceUrl: media.sourceUrl,
    altText: clean(media.altText),
    width: media.mediaDetails?.width ?? null,
    height: media.mediaDetails?.height ?? null,
  };
}

/** Un seul appel GraphQL par rendu, partagé entre les sections de la home. */
const getHome = cache(async (): Promise<RawHome | null> => {
  const data = await fetchGraphQL<{
    pageBy: { home: RawHome | null } | null;
  }>(HOME_QUERY);

  return data.pageBy?.home ?? null;
});

export async function getHomeHero(): Promise<HomeHero | null> {
  const home = await getHome();
  if (!home) return null;

  return {
    title: clean(home.heroTitle),
    subtitle: clean(home.heroSubtitle),
    description: clean(home.heroDescription),
    image: toImage(home.heroScreenshot),
    labels: (home.heroLabels ?? [])
      .map((row) => clean(row.heroLabelsText))
      .filter((label): label is string => !!label),
  };
}

export async function getHomeSituations(): Promise<HomeSituations | null> {
  const home = await getHome();
  if (!home) return null;

  return {
    title: clean(home.situationsTitre),
    description: clean(home.situationsDescription),
    baseline: clean(home.situationsBaseline),
    labels: (home.situationsLabels ?? [])
      .map((row) => clean(row.situationsLabelsLabel))
      .filter((label): label is string => !!label),
  };
}

export async function getHomeMethod(): Promise<HomeMethod | null> {
  const home = await getHome();
  if (!home) return null;

  return {
    title: clean(home.methodTitle),
    description: clean(home.methodDescription),
    baseline: clean(home.methodBaseline),
    steps: toItems(home.methodLabels, (row) => [
      row.methodLabelsTitle,
      row.methodLabelsDescription,
    ]),
  };
}

export async function getHomeReport(): Promise<HomeReport | null> {
  const home = await getHome();
  if (!home) return null;

  return {
    title: clean(home.rapportTitle),
    description: clean(home.rapportDescription),
    baseline: clean(home.rapportBaseline),
    items: toItems(home.rapportLabels, (row) => [
      row.rapportLabelsTitle,
      row.rapportLabelsDescription,
    ]),
  };
}

export async function getHomeExpert(): Promise<HomeExpert | null> {
  const home = await getHome();
  if (!home) return null;

  return {
    photo: toImage(home.interlocutorPhoto),
    title: clean(home.interlocutorTitle),
    description: clean(home.interlocutorDescription),
    baseline: clean(home.interlocutorBaseline),
    items: toItems(home.interlocutorLabels, (row) => [
      row.interlocutorLabelsTitle,
      row.interlocutorLabelsDescription,
    ]),
  };
}

export async function getHomeTestimonials(): Promise<HomeTestimonials | null> {
  const home = await getHome();
  if (!home) return null;

  return {
    title: clean(home.testimonyTitle),
    baseline: clean(home.testimonyBaseline),
    items: (home.testimonyItem ?? []).flatMap((row) => {
      const description = clean(row.testimonyItemDescription);
      return description
        ? [{ description, name: clean(row.testimonyitemName) }]
        : [];
    }),
  };
}
