import { PetFetch } from "../../../../config/PetFetch/PetFetch";

export const fetchAllUsers = async (token) => {
  const res = await fetch(`${PetFetch}/users`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });

  if (!res.ok) {
    throw new Error(`Error fetching all users: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};
