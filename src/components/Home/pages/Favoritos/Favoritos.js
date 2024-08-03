import { pintarJuegos } from "../../PintarJuegos";
import "../../../../styles/Favoritos.css";
import { PetFetch } from "../../../../config/PetFetch/PetFetch";
import { showSkeletons } from "../../Skeletons"

export const Favoritos = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.error("Usuario no encontrado en localStorage");
    main.innerHTML = "<p>Error: Usuario no encontrado.</p>";
    return;
  }

  showSkeletons(main, 10);

  try {
    const res = await fetch(`${PetFetch}/users/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!res.ok) {
      throw new Error(`Error al obtener los favoritos: ${res.statusText}`);
    }

    const usuario = await res.json();
    main.innerHTML = "";
    pintarJuegos(usuario.favoritos, main);

  } catch (error) {
    console.error(error);
    main.innerHTML = "<p>Error al cargar los favoritos. Inténtalo nuevamente más tarde.</p>";
  }
};