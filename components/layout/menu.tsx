/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPrimaryMenu } from "@/services/menu";
import { Link } from "next-view-transitions";

const styles = {
  bar: {
    list: "flex gap-x-4",
    link: "text-white no-underline hover:text-accent",
  },
  drawer: {
    list: "m-0 flex list-none flex-col p-0",
    link: "flex min-h-12 items-center border-b border-line text-lg font-medium text-ink no-underline hover:text-primary",
  },
} as const;

/* Menu principal WordPress.
 * `bar` : nav horizontale du header (desktop) · `drawer` : liste de l'offcanvas mobile. */
export default async function Menu({
  variant = "bar",
}: {
  variant?: keyof typeof styles;
}) {
  const items = await getPrimaryMenu();
  const s = styles[variant];

  return (
    <ul className={s.list}>
      {items.map((item: any) => (
        <li key={item.id}>
          <Link className={s.link} href={item.uri}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
