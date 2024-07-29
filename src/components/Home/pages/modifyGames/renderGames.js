export const renderGames = (juegos, main) => {
  const gamesListDiv = document.createElement("div");
  gamesListDiv.classList.add("games-list");

  gamesListDiv.innerHTML = juegos.map(juego => `
    <div class="game-item" data-id="${juego._id}">
      <h3>${juego.titulo}</h3>
      <img src="${juego.caratula}" alt="${juego.titulo} Carátula">  
      <p>Precio: ${juego.precio}€</p>
      <p>Valoración: ${juego.valoracion}</p>
      <button class="modify-btn">Modify</button>
      <button class="delete-btn">Delete</button>
    </div>
  `).join("");

  main.appendChild(gamesListDiv);
};
