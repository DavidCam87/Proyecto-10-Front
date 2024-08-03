import { Home } from "../components/Home/Home.js";
import { Favoritos } from "../components/Home/pages/Favoritos/Favoritos.js";
import { infoUser } from "../components/Home/pages/infoUser/infoUser.js";
import { modifyGames } from "../components/Home/pages/modifyGames/modifyGames.js";
import { modifyUser } from "../components/Home/pages/modifyUser/modifyUser.js";
import { Login, Register } from "../components/Home/pages/registerLogin/registerLogin.js";

export const routes = [
  { texto: '${https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/2560px-Playstation_logo_colour.svg.png}' },
  { texto: "Home", funcion: Home },
  { texto: "Favoritos", funcion: Favoritos },
  { texto: "Registro", funcion: Register },
  { texto: "Login", funcion: Login },
  { texto: "Informacion de Usuario", funcion: infoUser },
  { texto: "Usuarios", funcion: modifyUser },
  { texto: "Juegos", funcion: modifyGames }
];