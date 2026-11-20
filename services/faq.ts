import { cache } from "react";
import { fetchGraphQL } from "../lib/graphql-client";

export type FaqItem = {
  id: string;
  /** SCF « Titre » (question_tilte), à défaut le titre du post */
  question: string;
  /** SCF « Description » (question_description) */
  answer: string | null;
};

// Groupe SCF « Question » exposé sous `question` dans WPGraphQL.
type RawFaq = {
  id: string;
  title: string | null;
  question: {
    questionTitre: string | null;
    questionDescription: string | null;
  } | null;
};

type PageInfo = { hasNextPage: boolean; endCursor: string | null };

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
        id
        title
        question {
          questionTitre
          questionDescription
        }
      }
    }
  }
`;

/** Normalise une FAQ ; renvoie null si elle n'a pas de question. */
function normalizeFaq(raw: RawFaq): FaqItem | null {
  const question = raw.question?.questionTitre?.trim() || raw.title?.trim();
  if (!question) return null;

  return {
    id: raw.id,
    question,
    answer: raw.question?.questionDescription?.trim() || null,
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
