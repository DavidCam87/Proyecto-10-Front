import { generateNavLink } from "./NavLink.js";

export const generateNavLinks = (routes, toggleMenu, currentPage) => {
  const nav = document.createElement("nav");
  for (const route of routes) {
    if (route.texto.startsWith('${https') && route.texto.endsWith('}')) {
      const header = document.querySelector("header");
      const divPS = generateNavLink(route, toggleMenu, currentPage);
      header.append(divPS);
      continue;
    }
    nav.append(generateNavLink(route, toggleMenu, currentPage));
  }
  return nav;
};
