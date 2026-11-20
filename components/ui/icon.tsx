export type IconName =
  | "house"
  | "phone"
  | "mail"
  | "pin"
  | "arrow"
  | "check"
  | "check-circle"
  | "crack"
  | "house-search"
  | "scales"
  | "shield"
  | "award"
  | "doc"
  | "chat"
  | "person"
  | "chevron"
  | "search"
  | "close";

/* Icône du sprite (components/ui/icon-sprite.tsx).
 * Le trait suit `currentColor` : la couleur se pilote avec text-*. */
export default function Icon({
  name,
  className = "size-[18px]",
  strokeWidth = 2,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <use href={`#i-${name}`} />
    </svg>
  );
}
