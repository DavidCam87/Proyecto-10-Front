import { createInput, createButton, createLoader, createError } from './FormComponent.js';

export const renderForm = (formName, submitFunction) => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const formDiv = document.createElement("div");
  const form = document.createElement("form");
  form.classList.add(`${formName}`);

  const inputUN = createInput("text", "User Name");
  const inputEmail = createInput("email", "Email");
  const inputPass = createInput("password", "**********");
  const button = createButton(formName);
  const loader = createLoader();

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

export const displayError = (form, message, loader, button) => {
  loader.style.display = "none";
  button.disabled = false;
  createError(form, message);
};