/* Contenu statique de la landing « Expertises Bâti Ancien ».
 * Les valeurs entre crochets [ … ] sont des placeholders à compléter. */

export const site = {
  name: "Expertises Bâti Ancien",
  baseline: "Expert indépendant en bâtiment ancien",
  description:
    "Expertise indépendante des maisons et bâtiments anciens : diagnostic des désordres, expertise avant achat, litiges et assistance.",
  phone: { label: "06 89 73 02 11", href: "tel:+33689730211" },
  // TODO : confirmer l'adresse (le DOM d'origine affichait sylvain.giardina@myyahoo.com)
  email: "sylvain.giardina@myyahoo.com",
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

export const keyFigures = [
  { value: "[XX] ans", label: "d'expérience du bâti ancien" },
  { value: "[XXX]+", label: "expertises réalisées" },
  { value: "[X] jours", label: "délai moyen de remise du rapport" },
  { value: "[Zone]", label: "départements couverts" },
];

export const requestTypes = [
  "Diagnostic des désordres",
  "Expertise avant achat",
  "Litiges & assistance",
  "Autre / je ne sais pas",
];
