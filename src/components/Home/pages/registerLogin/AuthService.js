import { displayError } from './FormUtils.js';
import { Home } from "../../Home.js";
import { Header } from "../../../Header/Header.js";
import { PetFetch } from "../../../../config/PetFetch/PetFetch.js";

export const login = async (userName, password, form, loader, button) => {
  const objetoFinal = JSON.stringify({ userName, password });

  const opciones = {
    method: "POST",
    body: objetoFinal,
    headers: {
      "Content-Type": "application/json"
    }
  };

  const res = await fetch(`${PetFetch}/users/login`, opciones);
  if (res.status === 400) {
    displayError(form, "Usuario o contraseña incorrectos", loader, button);
    return;
  }

  const pError = form.querySelector(".error");
  if (pError) {
    pError.remove();
  }

  const respuestaFinal = await res.json();
  localStorage.setItem("token", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(respuestaFinal.user));

  loader.style.display = "none";
  button.disabled = false;

  Home();
  Header();
};

export const register = async (userName, email, password, form, loader, button) => {
  const objetoFinal = JSON.stringify({ userName, email, password });

  const opciones = {
    method: "POST",
    body: objetoFinal,
    headers: {
      "Content-Type": "application/json"
    }
  };

  const res = await fetch(`${PetFetch}/users/register`, opciones);
  if (res.status === 400) {
    displayError(form, "Error en el registro. Verifica los datos.", loader, button);
    return;
  }

  const pError = form.querySelector(".error");
  if (pError) {
    pError.remove();
  }

  const respuestaFinal = await res.json();
  localStorage.setItem("token", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(respuestaFinal.user));

  loader.style.display = "none";
  button.disabled = false;

  login(userName, password, form, loader, button);
};