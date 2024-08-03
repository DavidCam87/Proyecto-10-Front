import { PetFetch } from "../../../../config/PetFetch/PetFetch";

export const fetchUser = async (userId, token) => {
  const res = await fetch(`${PetFetch}/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });

  if (!res.ok) {
    throw new Error(`Error fetching user: ${res.status} ${res.statusText}`);
  }
  return await res.json();
};