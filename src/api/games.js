import { PetFetch } from "../config/PetFetch/PetFetch";

export const fetchGames = async (page = 1, limit = 10) => {
  const response = await fetch(`${PetFetch}/juegos?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Error fetching games');
  }
  return response.json();
};
