import { Header } from './src/components/Header/Header.js';
import { Home } from './src/pages/Home/Home.js'
import './style.css'


const Main = async () => {
  try {
    const app = document.querySelector("#app");
    app.innerHTML = `
    <header></header>
    <main></main>
    `;
    await Header();
    await Home();

  } catch (error) {
    console.error(error);
  }
}
document.addEventListener("DOMContentLoaded", Main)
//Main();
