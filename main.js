import { Header } from './src/components/Header/Header.js';
import { Home } from './src/components/Home/Home.js'
import { Footer } from './src/components/Footer/Footer.js'
import './style.css'

const Main = async () => {
  try {
    const app = document.querySelector("#app");
    app.innerHTML = `
    <header></header>
    <main></main>
    `;
    Header();
    await Home();
    Footer();

  } catch (error) {
    console.error(error);
  }
}
document.addEventListener("DOMContentLoaded", Main)