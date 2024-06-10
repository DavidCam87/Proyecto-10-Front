import { Home } from "../../pages/Home/Home.js";
import { Favoritos } from "../../pages/Favoritos/Favoritos.js";
import { infoUser } from "../../pages/infoUser/infoUser.js";
import { modifyGames } from "../../pages/modifyGames/modifyGames.js";
import { modifyUser } from "../../pages/modifyUser/modifyUser.js";
import { Login, Register } from "../../pages/registerLogin/registerLogin.js";
import "./Header.css";

const routes = [
  { texto: '${https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/2560px-Playstation_logo_colour.svg.png}' },
  { texto: "Home", funcion: Home },
  { texto: "Favoritos", funcion: Favoritos },
  { texto: "Registro", funcion: Register },
  { texto: "Login", funcion: Login },
  { texto: "Informacion de Usuario", funcion: infoUser },
  { texto: "Usuarios", funcion: modifyUser },
  { texto: "Juegos", funcion: modifyGames }
];

const generateNavLink = (route, toggleMenu) => {

  if (route.texto.startsWith('${https') && route.texto.endsWith('}')) {
    const divPS = document.createElement("div");
    const img = document.createElement("img");
    img.src = route.texto.slice(2, -1); // Extrae la URL correcta
    img.className = "logoPS";
    img.alt = "Playstation Logo";
    img.style.maxWidth = "70px";
    divPS.append(img);
    return divPS
  } else {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = route.texto;
    a.addEventListener("click", () => {
      route.funcion();
      toggleMenu();
    });
    return a;
  }

};

const generateNavLinks = (routes, toggleMenu) => {
  const nav = document.createElement("nav");
  for (const route of routes) {
    if (route.texto.startsWith('${https') && route.texto.endsWith('}')) {
      const header = document.querySelector("header");
      const divPS = generateNavLink(route, toggleMenu);
      header.append(divPS);
      continue
    }
    nav.append(generateNavLink(route, toggleMenu));
  }
  return nav;
};

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.rol === "admin";
};

const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

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

  const nav = generateNavLinks(allowedRoutes, toggleMenu);

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