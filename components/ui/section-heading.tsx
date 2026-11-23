/* Eyebrow + titre H2 (ou H1 en tête de page) avec fin en serif italique + intro optionnelle. */
export default function SectionHeading({
  as: Heading = "h2",
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
  dark = false,
  titleClassName = "text-[clamp(32px,4vw,44px)]",
  introClassName = "text-lg text-muted",
  className = "",
}: {
  /** Niveau du titre : `h1` pour le titre principal d'une page */
  as?: "h1" | "h2";
  eyebrow?: string;
  title: string;
  /** Fin du titre en serif italique (optionnelle) */
  accent?: string;
  intro?: React.ReactNode;
  align?: "left" | "center";
  /** Fond sombre : eyebrow et accent clair */
  dark?: boolean;
  titleClassName?: string;
  introClassName?: string;
  className?: string;
}) {
  const alignClass = align === "center" ? "items-center text-center" : "";
  const accentColor = dark ? "text-accent" : "";

  return (
    <div className={`flex flex-col gap-3.5 ${alignClass} ${className}`}>
      {eyebrow && <span className={`eyebrow ${accentColor}`}>{eyebrow}</span>}
      <Heading className={`h2 ${titleClassName}`}>
        {title}
        {accent && (
          <>
            {" "}
            <span className={`serif-accent ${accentColor}`}>{accent}</span>
          </>
        )}
      </Heading>
      {intro && <p className={`m-0 ${introClassName}`}>{intro}</p>}
    </div>
  );
}
