import { routes } from "../../utils/routes.js";
import { isAdmin, isLoggedIn } from "../../utils/auth.js";
import { generateNavLinks } from "./NavLinks.js";
import { Home } from "../Home/Home.js";
import "../../styles/Header.css";

let currentPage = { texto: "" };  // Objeto para rastrear la página actual

export const Header = () => {
  const header = document.querySelector("header");
  header.innerHTML = "";

  const allowedRoutes = routes.filter((route) => {
    if (route.texto === "Login" || route.texto === "Registro") {
      return !isLoggedIn();
    }
    if (route.texto === "Favoritos" || route.texto === "Informacion de Usuario") {
      return isLoggedIn();
    }
    if (route.texto === "Usuarios" || route.texto === "Juegos") {
      return isLoggedIn() && isAdmin();
    }
    return true;
  });

  const toggleMenu = () => {
    nav.classList.toggle('show-menu');
    menuIcon.classList.toggle('active');
  };

  const nav = generateNavLinks(allowedRoutes, toggleMenu, currentPage);

  if (isLoggedIn()) {
    const logoutElement = document.createElement("a");
    logoutElement.href = "#";
    logoutElement.textContent = "Logout";
    logoutElement.addEventListener("click", () => {
      localStorage.clear();
      Header();
      Home();
    });
    nav.append(logoutElement);
  }

  header.append(nav);

  const menuIcon = document.createElement("div");
  menuIcon.className = "menu-icon";
  for (let i = 0; i < 3; i++) {
    const bar = document.createElement("div");
    menuIcon.appendChild(bar);
  }
  header.append(menuIcon);

  menuIcon.addEventListener('click', toggleMenu);
};
