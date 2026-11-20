import { fetchGraphQL } from "../lib/graphql-client";

export type ExpertiseImage = {
  sourceUrl: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type Expertise = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  /** Date de dernière modification (ISO), pour le sitemap */
  modified: string | null;
  excerpt: string | null;
  content: string | null;
  /** SCF « Nom » (expertise_name) */
  name: string | null;
  /** SCF « Description courte » (expertise_short_description) */
  shortDescription: string | null;
  /** SCF « Les points forts » (expertise_strengths) */
  strengths: string[];
  /** SCF « Pour qui » (expertise_target) */
  target: string | null;
  image: ExpertiseImage | null;
};

// Groupe SCF « Expertise » exposé sous `description` dans WPGraphQL.
type RawExpertiseFields = {
  expertise: string | null;
  descriptionCourte: string | null;
  pourQui: string | null;
  expertiseStrengths: { expertiseStrengths: string | null }[] | null;
};

type RawExpertise = Omit<
  Expertise,
  "name" | "shortDescription" | "strengths" | "target" | "image"
> & {
  description: RawExpertiseFields | null;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string | null;
      mediaDetails: { width: number | null; height: number | null } | null;
    };
  } | null;
};

type PageInfo = { hasNextPage: boolean; endCursor: string | null };

const EXPERTISE_FIELDS = `
  id
  databaseId
  title
  slug
  uri
  modified
  excerpt
  content
  description {
    expertise
    descriptionCourte
    pourQui
    expertiseStrengths {
      expertiseStrengths
    }
  }
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
`;

// WPGraphQL plafonne `first` à 100 : on pagine pour tout récupérer.
const ALL_EXPERTISES_QUERY = `
  query AllExpertises($after: String) {
    expertises(
      first: 100
      after: $after
      where: { orderby: [{ field: MENU_ORDER, order: ASC }, { field: DATE, order: ASC }] }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ${EXPERTISE_FIELDS}
      }
    }
  }
`;

const EXPERTISE_BY_SLUG_QUERY = `
  query ExpertiseBySlug($slug: ID!) {
    expertise(id: $slug, idType: SLUG) {
      ${EXPERTISE_FIELDS}
    }
  }
`;

function normalizeExpertise(raw: RawExpertise): Expertise {
  const { description, featuredImage, ...rest } = raw;
  const media = featuredImage?.node;
  return {
    ...rest,
    name: description?.expertise || null,
    shortDescription: description?.descriptionCourte || null,
    strengths: (description?.expertiseStrengths ?? [])
      .map((row) => row.expertiseStrengths?.trim())
      .filter((wording): wording is string => !!wording),
    target: description?.pourQui || null,
    image: media?.sourceUrl
      ? {
          sourceUrl: media.sourceUrl,
          altText: media.altText,
          width: media.mediaDetails?.width ?? null,
          height: media.mediaDetails?.height ?? null,
        }
      : null,
  };
}

export async function getAllExpertises(): Promise<Expertise[]> {
  const expertises: Expertise[] = [];
  let after: string | null = null;

  do {
    const data: {
      expertises: { pageInfo: PageInfo; nodes: RawExpertise[] };
    } = await fetchGraphQL(ALL_EXPERTISES_QUERY, { after });

    expertises.push(...data.expertises.nodes.map(normalizeExpertise));
    after = data.expertises.pageInfo.hasNextPage
      ? data.expertises.pageInfo.endCursor
      : null;
  } while (after);

  return expertises;
}

export async function getExpertiseBySlug(
  slug: string,
): Promise<Expertise | null> {
  const data = await fetchGraphQL<{ expertise: RawExpertise | null }>(
    EXPERTISE_BY_SLUG_QUERY,
    { slug },
  );
  return data.expertise ? normalizeExpertise(data.expertise) : null;
}
