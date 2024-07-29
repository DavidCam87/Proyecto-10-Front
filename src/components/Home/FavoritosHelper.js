import { PetFetch } from "../../config/PetFetch/PetFetch";
export const addFavorito = async (idJuego) => {
  const user = JSON.parse(localStorage.getItem("user"));
  user.favoritos = [...user.favoritos, idJuego];

  const objetoFinal = JSON.stringify({
    favoritos: user.favoritos
  });

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: objetoFinal
  };

  const res = await fetch(`${PetFetch}/users/${user._id}`, opciones);
  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(`Agregado el juego ${idJuego} a favoritos`);
  } else {
    console.error(`Error al agregar el juego ${idJuego} a favoritos`);
  }
};

export const removeFavorito = async (idJuego) => {
  const user = JSON.parse(localStorage.getItem("user"));
  user.favoritos = user.favoritos.filter(favorito => favorito !== idJuego);

  const objetoFinal = JSON.stringify({
    favoritos: user.favoritos
  });

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: objetoFinal
  };

  const res = await fetch(`${PetFetch}/users/${user._id}`, opciones);
  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(`Removido el juego ${idJuego} de favoritos`);
  } else {
    console.error(`Error al remover el juego ${idJuego} de favoritos`);
  }
};