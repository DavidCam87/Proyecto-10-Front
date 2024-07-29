import { PetFetch } from "../../../../config/PetFetch/PetFetch";
import "../../../../styles/infoUser.css";

export const infoUser = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const res = await fetch(`${PetFetch}/users/${user._id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });
  const usuario = await res.json();
  console.log(usuario);

  const userInfoDiv = document.createElement("div");
  userInfoDiv.classList.add("user-info");

  userInfoDiv.innerHTML = `
    <p>UserName: ${usuario.userName}</p>
    <p>Email: ${usuario.email}</p>
  `;
  main.appendChild(userInfoDiv);
};
