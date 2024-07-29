import { PetFetch } from "../config/PetFetch/PetFetch";
import { getUser, updateUserFavorites } from '../utils/user';

export const addFavorite = async (gameId) => {
  const user = getUser();
  user.favoritos.push(gameId);
  await updateUserFavorites(user);
};

export const removeFavorite = async (gameId) => {
  const user = getUser();
  user.favoritos = user.favoritos.filter(fav => fav !== gameId);
  await updateUserFavorites(user);
};
