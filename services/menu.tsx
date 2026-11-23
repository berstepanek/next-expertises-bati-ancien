/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from "react";
import { fetchGraphQL } from "../lib/graphql-client";

const MENU_QUERY = `
    query GetMenu {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          id
          label
          uri
          url
          parentId
        }
      }
    }
  `;

/* Mémoïsé par requête : le menu est rendu deux fois (nav desktop + offcanvas)
 * et les fetch POST ne sont pas dédupliqués automatiquement par Next. */
export const getPrimaryMenu = cache(async () => {
  const data = await fetchGraphQL<{ menuItems: any }>(MENU_QUERY);
  return data.menuItems.nodes;
});
