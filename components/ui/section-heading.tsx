/* Eyebrow + titre H2 (avec fin en serif italique) + intro optionnelle. */
export default function SectionHeading({
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
  eyebrow: string;
  title: string;
  accent: string;
  intro?: React.ReactNode;
  align?: "left" | "center";
  /** Fond sombre : eyebrow et accent en sage */
  dark?: boolean;
  titleClassName?: string;
  introClassName?: string;
  className?: string;
}) {
  const alignClass = align === "center" ? "items-center text-center" : "";
  const accentColor = dark ? "text-sage" : "";

  return (
    <div className={`flex flex-col gap-3.5 ${alignClass} ${className}`}>
      <span className={`eyebrow ${accentColor}`}>{eyebrow}</span>
      <h2 className={`h2 ${titleClassName}`}>
        {title} <span className={`serif-accent ${accentColor}`}>{accent}</span>
      </h2>
      {intro && <p className={`m-0 ${introClassName}`}>{intro}</p>}
    </div>
  );
}
