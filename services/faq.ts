import { cache } from "react";
import { fetchGraphQL } from "../lib/graphql-client";

export type FaqItem = {
  id: string;
  slug: string;
  /** SCF « Titre » (question_tilte), à défaut le titre du post */
  question: string;
  /** SCF « Description » (question_description) */
  answer: string | null;
  /** Contenu détaillé (éditeur principal WordPress), optionnel */
  content: string | null;
  /** Date de dernière modification (ISO), pour le sitemap */
  modified: string | null;
};

// Groupe SCF « Question » exposé sous `question` dans WPGraphQL.
type RawFaq = {
  id: string;
  slug: string;
  title: string | null;
  content: string | null;
  modified: string | null;
  question: {
    questionTitre: string | null;
    questionDescription: string | null;
  } | null;
};

type PageInfo = { hasNextPage: boolean; endCursor: string | null };

const FAQ_FIELDS = `
  id
  slug
  title
  content
  modified
  question {
    questionTitre
    questionDescription
  }
`;

// WPGraphQL plafonne `first` à 100 : on pagine pour tout récupérer.
const ALL_FAQS_QUERY = `
  query AllFaqs($after: String) {
    faqs(
      first: 100
      after: $after
      where: { orderby: [{ field: MENU_ORDER, order: ASC }, { field: DATE, order: ASC }] }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ${FAQ_FIELDS}
      }
    }
  }
`;

const FAQ_BY_SLUG_QUERY = `
  query FaqBySlug($slug: ID!) {
    faq(id: $slug, idType: SLUG) {
      ${FAQ_FIELDS}
    }
  }
`;

/** Normalise une FAQ ; renvoie null si elle n'a pas de question. */
function normalizeFaq(raw: RawFaq): FaqItem | null {
  const question = raw.question?.questionTitre?.trim() || raw.title?.trim();
  if (!question) return null;

  return {
    id: raw.id,
    slug: raw.slug,
    question,
    answer: raw.question?.questionDescription?.trim() || null,
    content: raw.content?.trim() || null,
    modified: raw.modified,
  };
}

export const getAllFaqs = cache(async (): Promise<FaqItem[]> => {
  const faqs: FaqItem[] = [];
  let after: string | null = null;

  do {
    const data: { faqs: { pageInfo: PageInfo; nodes: RawFaq[] } } =
      await fetchGraphQL(ALL_FAQS_QUERY, { after });

    for (const node of data.faqs.nodes) {
      const faq = normalizeFaq(node);
      if (faq) faqs.push(faq);
    }
    after = data.faqs.pageInfo.hasNextPage ? data.faqs.pageInfo.endCursor : null;
  } while (after);

  return faqs;
});

export const getFaqBySlug = cache(async (slug: string): Promise<FaqItem | null> => {
  const data = await fetchGraphQL<{ faq: RawFaq | null }>(FAQ_BY_SLUG_QUERY, { slug });
  return data.faq ? normalizeFaq(data.faq) : null;
});
