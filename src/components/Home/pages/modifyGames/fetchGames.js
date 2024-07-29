import { PetFetch } from "../../../../config/PetFetch/PetFetch";

export const fetchGames = async (token) => {
  const res = await fetch(`${PetFetch}/juegos`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });

  if (!res.ok) {
    throw new Error(`Error en la solicitud de juegos: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};
