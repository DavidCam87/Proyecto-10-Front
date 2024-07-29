import { fetchGames } from '../../api/games';
import { createGameCard } from './GameCard';
import { showSkeletons } from './Skeletons';
import { paginationControls } from '../../utils/pagination';
import { getUser } from '../../utils/user';
import '../../styles/Home.css'

export const Home = async (page = 1) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  showSkeletons(main, 10);

  try {
    const juegos = await fetchGames(page);
    main.innerHTML = "";
    const user = getUser();
    const divTodos = document.createElement("div");
    divTodos.className = "divTodos";

    juegos.juegos.forEach(juego => {
      const gameCard = createGameCard(juego, user);
      divTodos.appendChild(gameCard);
    });

    main.appendChild(divTodos);
    paginationControls(juegos.page, juegos.totalPages);
  } catch (error) {
    console.error(error);
    main.innerHTML = "<p>Error al cargar los juegos. Inténtalo nuevamente más tarde.</p>";
  }
};
