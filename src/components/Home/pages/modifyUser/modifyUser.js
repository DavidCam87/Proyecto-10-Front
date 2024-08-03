import { fetchUser } from "./fetchUser";
import { fetchAllUsers } from "./fetchAllUsers";
import { renderUsers } from "./renderUsers";
import { addModifyEventListeners, addDeleteEventListeners } from "./eventHandlers";
import "../../../../styles/modifyUser.css";

export const modifyUser = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  renderUsers([], main, true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = `Bearer ${localStorage.getItem("token")}`;

  try {
    const usuario = await fetchUser(user._id, token);

    if (usuario.rol === "admin") {
      const allUsers = await fetchAllUsers(token);
      main.innerHTML = "";
      renderUsers(allUsers, main, false);
      addModifyEventListeners(token);
      addDeleteEventListeners(token);
    } else {
      main.innerHTML = "<p>Usted no tiene permiso para ver esta página</p>";
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    main.innerHTML = "<p>Error al cargar los usuarios. Inténtalo nuevamente más tarde.</p>";
  }
};