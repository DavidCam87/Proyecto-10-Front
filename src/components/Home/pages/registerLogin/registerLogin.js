// registerLogin.js
import { Header } from "../../../Header/Header.js";
import { PetFetch } from "../../../../config/PetFetch/PetFetch.js";
import { Home } from "../../Home.js";
import "../../../../styles/registerLogin.css";

export const Register = () => {
  renderForm("Register", register);
};

export const Login = () => {
  renderForm("Login", login);
};

const renderForm = (formName, submitFunction) => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const formDiv = document.createElement("div");
  const form = document.createElement("form");
  form.classList.add(`${formName}`);

  const inputUN = document.createElement("input");
  inputUN.placeholder = "User Name";
  inputUN.type = "text";
  inputUN.required = true;

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.placeholder = "Email";
  inputEmail.required = true;

  const inputPass = document.createElement("input");
  inputPass.type = "password";
  inputPass.placeholder = "**********";
  inputPass.required = true;

  const button = document.createElement("button");
  button.textContent = formName;

  const loader = document.createElement("div");
  loader.classList.add("loader");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    loader.style.display = "inline-block";
    button.disabled = true;
    if (formName === "Login") {
      submitFunction(inputUN.value, inputPass.value, form, loader, button);
    } else {
      submitFunction(inputUN.value, inputEmail.value, inputPass.value, form, loader, button);
    }
  });

  form.append(inputUN, inputPass, button, loader);
  if (formName === "Register") {
    form.insertBefore(inputEmail, inputPass);
  }

  formDiv.append(form);
  main.append(formDiv);
};

const displayError = (form, message, loader, button) => {
  loader.style.display = "none";
  button.disabled = false;
  let pError = form.querySelector(".error");
  if (!pError) {
    pError = document.createElement("p");
    pError.classList.add("error");
    form.append(pError);
  }
  pError.textContent = message;
};

const login = async (userName, password, form, loader, button) => {
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

const register = async (userName, email, password, form, loader, button) => {
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