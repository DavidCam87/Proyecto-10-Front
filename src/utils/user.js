import { PetFetch } from "../config/PetFetch/PetFetch";

export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const updateUserFavorites = async (user) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ favoritos: user.favoritos })
  };

  const response = await fetch(`${PetFetch}/users/${user._id}`, options);
  if (!response.ok) {
    throw new Error('Error updating user favorites');
  }
  localStorage.setItem("user", JSON.stringify(user));
};