export const site = {
  name: "Expertises Bâti Ancien",
  baseline: "Expert indépendant en bâtiment ancien",
  description:
    "Expertise indépendante des maisons et bâtiments anciens : diagnostic des désordres, expertise avant achat, litiges et assistance.",
  phone: { label: "06 89 73 02 11", href: "tel:+33689730211" },
  email: "sgiardina@expertises-bati-ancien.fr",
  zone: "France",
  expertName: "Sylvain Giardina",
} as const;

export type NavItem = { label: string; href: string };

export const keyFigures = [
  { value: "20 ans", label: "d'expérience du bâti ancien" },
  { value: "+200", label: "expertises réalisées" },
  { value: "10 jours", label: "délai moyen de remise du rapport" },
  { value: "Zone d'expertise", label: "Sur tout le territoire français" },
];
