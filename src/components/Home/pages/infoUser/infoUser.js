import { PetFetch } from "../../../../config/PetFetch/PetFetch";
import "../../../../styles/loader.css";

export const infoUser = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const loader = document.createElement("div");
  loader.classList.add("loader");
  main.appendChild(loader);
  loader.style.display = "block";

  try {
    const res = await fetch(`${PetFetch}/users/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const usuario = await res.json();
    console.log(usuario);

    loader.style.display = "none";

    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");

    userInfoDiv.innerHTML = `
      <p>UserName: ${usuario.userName}</p>
      <p>Email: ${usuario.email}</p>
    `;
    main.appendChild(userInfoDiv);
  } catch (error) {
    loader.style.display = "none";
    console.error('Error fetching user data:', error);
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.textContent = "Error fetching user data.";
    main.appendChild(errorDiv);
  }
};