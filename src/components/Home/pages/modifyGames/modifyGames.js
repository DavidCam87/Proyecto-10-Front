import { fetchGames } from "./fetchGames";
import { renderGames } from "./renderGames";
import { addModifyEventListeners, addDeleteEventListeners } from "./eventHandlers";
import "../../../../styles/modifyGames.css";

export const modifyGames = async () => {
  const main = document.querySelector("main");

  if (!main) {
    console.error("No se encontró el elemento <main>");
    return;
  }

  main.innerHTML = "";

  renderGames([], main, true);

  const token = "Bearer " + localStorage.getItem("token");

  try {
    const { juegos } = await fetchGames(token);
    main.innerHTML = "";
    renderGames(juegos, main, false);
    addModifyEventListeners(token);
    addDeleteEventListeners(token);
  } catch (error) {
    console.error("Error en la solicitud a la API", error);
    main.innerHTML = "<p>Error al cargar los juegos. Inténtalo nuevamente más tarde.</p>";
  }
};