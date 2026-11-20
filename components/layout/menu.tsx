/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPrimaryMenu } from "@/services/menu";
import { Link } from "next-view-transitions";

export default async function Menu() {
  const items = await getPrimaryMenu();

  return (
    <ul className="flex gap-x-4">
      {items.map((item: any) => (
        <li key={item.id}>
          <Link
            className="text-white no-underline hover:text-sage"
            href={item.uri}
            rel="{item.label}"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
