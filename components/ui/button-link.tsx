import Link from "next/link";
import Icon from "./icon";

const variants = {
  paper: "bg-paper text-ink hover:bg-white hover:text-ink",
  sage: "bg-sage text-ink hover:bg-white hover:text-ink",
  "outline-light":
    "border-[1.5px] border-white/70 text-white hover:bg-white/10 hover:text-white",
  "outline-forest":
    "border-[1.5px] border-forest text-forest hover:bg-forest hover:text-white",
} as const;

const sizes = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-[52px] px-[26px] text-base",
} as const;

export default function ButtonLink({
  href,
  children,
  variant = "paper",
  size = "lg",
  withArrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`btn ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {withArrow && <Icon name="arrow" />}
    </Link>
  );
}
