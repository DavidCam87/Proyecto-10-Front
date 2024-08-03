// RegisterLogin.js
import { renderForm } from './FormUtils.js';
import { login, register } from './AuthService.js';
import "../../../../styles/registerLogin.css";
import "../../../../styles/loader.css";

export const Register = () => {
  renderForm("Register", register);
};

export const Login = () => {
  renderForm("Login", login);
};