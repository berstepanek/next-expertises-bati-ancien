/* Contenu statique de la landing « Expertises Bâti Ancien ».
 * Les valeurs entre crochets [ … ] sont des placeholders à compléter. */

export const site = {
  name: "Expertises Bâti Ancien",
  baseline: "Expert indépendant en bâtiment ancien",
  description:
    "Expertise indépendante des maisons et bâtiments anciens : diagnostic des désordres, expertise avant achat, litiges et assistance.",
  phone: { label: "06 89 73 02 11", href: "tel:+33689730211" },
  // TODO : confirmer l'adresse (le DOM d'origine affichait sylvain.giardina@myyahoo.com)
  email: "contact@expertises-bati-ancien.fr",
  zone: "France",
  expertName: "Sylvain Giardina",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Expertises", href: "#expertises" },
  { label: "Méthode", href: "#methode" },
  { label: "L'expert", href: "#expert" },
  { label: "Questions", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const heroBullets = [
  "Premier échange téléphonique offert",
  "Devis clair avant toute visite",
  "Aucun lien avec les entreprises de travaux",
];

export const keyFigures = [
  { value: "[XX] ans", label: "d'expérience du bâti ancien" },
  { value: "[XXX]+", label: "expertises réalisées" },
  { value: "[X] jours", label: "délai moyen de remise du rapport" },
  { value: "[Zone]", label: "départements couverts" },
];

export const testimonials = Array.from({ length: 3 }, () => ({
  quote:
    "[Témoignage client réel à insérer : la situation de départ et ce que l'expertise a changé.]",
  author: "[Prénom N.]",
  context: "[Type de mission · Commune]",
}));

export const faq = [
  {
    question: "Combien coûte une expertise ?",
    answer:
      "Le tarif est forfaitaire et dépend de la mission et de la surface. À titre indicatif, à partir de [XXX] € TTC pour une expertise ciblée. Le devis est toujours remis avant la visite.",
  },
  {
    question: "Quelle est la différence avec un diagnostic immobilier ?",
    answer:
      "Les diagnostics obligatoires (DPE, amiante, plomb…) répondent à une réglementation. L'expertise analyse l'état réel du bâti, les causes des désordres et les solutions : c'est une démarche de conseil.",
  },
  {
    question: "Combien de temps dure la visite ?",
    answer:
      "Généralement entre [1 h 30 et 3 h] selon la taille du bien et la nature des désordres. Votre présence est recommandée pour échanger sur place.",
  },
  {
    question: "Intervenez-vous avant la signature d'un compromis ?",
    answer:
      "Oui, c'est même le moment idéal. Nous nous adaptons aux délais de la vente pour vous rendre un avis avant votre engagement.",
  },
  {
    question: "Dans quelle zone intervenez-vous ?",
    answer:
      "[Départements et villes couvertes.] Au-delà, contactez-nous : un déplacement reste souvent possible.",
  },
];

export const requestTypes = [
  "Diagnostic des désordres",
  "Expertise avant achat",
  "Litiges & assistance",
  "Autre / je ne sais pas",
];
