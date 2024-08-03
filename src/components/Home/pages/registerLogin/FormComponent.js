export const createInput = (type, placeholder, required = true) => {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  input.required = required;
  return input;
};

export const createButton = (text) => {
  const button = document.createElement("button");
  button.textContent = text;
  return button;
};

export const createLoader = () => {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  return loader;
};

export const createError = (form, message) => {
  let pError = form.querySelector(".error");
  if (!pError) {
    pError = document.createElement("p");
    pError.classList.add("error");
    form.append(pError);
  }
  pError.textContent = message;
};