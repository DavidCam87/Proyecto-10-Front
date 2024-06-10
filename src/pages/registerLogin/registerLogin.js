// registerLogin.js
import { Header } from "../../components/Header/Header.js";
import { Home } from "../Home/Home";
import "./registerLogin.css";

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
  form.classList.add(`${formName}`)

  const inputUN = document.createElement("input");
  inputUN.placeholder = "User Name";

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.placeholder = "Email";

  const inputPass = document.createElement("input");
  inputPass.type = "password";
  inputPass.placeholder = "**********";

  const button = document.createElement("button");
  button.textContent = formName;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formName === "Login") {
      submitFunction(inputUN.value, inputPass.value, form);
    } else {
      submitFunction(inputUN.value, inputEmail.value, inputPass.value, form);
    }
  });

  form.append(inputUN, inputPass, button);
  if (formName === "Register") {
    form.insertBefore(inputEmail, inputPass);
  }

  formDiv.append(form);
  main.append(formDiv);
};

const displayError = (form, message) => {
  let pError = form.querySelector(".error");
  if (!pError) {
    pError = document.createElement("p");
    pError.classList.add("error");
    form.append(pError);
  }
  pError.textContent = message;
};

const login = async (userName, password, form) => {
  const objetoFinal = JSON.stringify({ userName, password });

  const opciones = {
    method: "POST",
    body: objetoFinal,
    headers: {
      "Content-Type": "application/json"
    }
  };

  const res = await fetch("http://localhost:3000/api/v1/users/login", opciones);
  if (res.status === 400) {
    displayError(form, "Usuario o contraseña incorrectos");
    return;
  }

  const pError = form.querySelector(".error");
  if (pError) {
    pError.remove();
  }

  const respuestaFinal = await res.json();
  localStorage.setItem("token", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(respuestaFinal.user));
  Home();
  Header();
};

const register = async (userName, email, password, form) => {
  const objetoFinal = JSON.stringify({ userName, email, password });

  const opciones = {
    method: "POST",
    body: objetoFinal,
    headers: {
      "Content-Type": "application/json"
    }
  };

  const res = await fetch("http://localhost:3000/api/v1/users/register", opciones);
  if (res.status === 400) {
    displayError(form, "Error en el registro. Verifica los datos.");
    return;
  }

  const pError = form.querySelector(".error");
  if (pError) {
    pError.remove();
  }

  const respuestaFinal = await res.json();
  localStorage.setItem("token", respuestaFinal.token);
  localStorage.setItem("user", JSON.stringify(respuestaFinal.user));

  login(userName, password, form)
};