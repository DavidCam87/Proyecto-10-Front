import "./modifyGames.css";

export const modifyGames = async () => {
  const main = document.querySelector("main");

  if (!main) {
    console.error("No se encontró el elemento <main>");
    return;
  }

  main.innerHTML = "";
  const token = "Bearer " + localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/api/v1/juegos", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
    // Verifica si la respuesta es correcta
    if (!res.ok) {
      console.error("Error en la solicitud de juegos", res.status, res.statusText);
      return;
    }

    const juegos = await res.json();

    const gamesListDiv = document.createElement("div");
    gamesListDiv.classList.add("games-list");

    gamesListDiv.innerHTML = juegos.juegos.map(juego => `
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

    // Añadir event listeners a los botones de modificar
    document.querySelectorAll(".modify-btn").forEach(button => {
      button.addEventListener("click", async (event) => {
        const gameId = event.target.closest(".game-item").dataset.id;
        const newTitle = prompt("Modifica el Título del Juego (deja en blanco para no modificar): ");
        const newPrice = prompt("Modifica el Precio del Juego (deja en blanco para no modificar): ");
        const newRating = prompt("Modifica la Valoración del Juego (deja en blanco para no modificar): ");

        const updateData = {};
        if (newTitle) updateData.titulo = newTitle;
        if (newPrice) updateData.precio = newPrice;
        if (newRating) updateData.valoracion = newRating;

        const updateRes = await fetch(`http://localhost:3000/api/v1/juegos/${gameId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify(updateData)
        });

        if (updateRes.ok) {
          alert("Juego actualizado exitosamente!");
          location.reload();
        } else {
          alert("Error al actualizar el juego.");
        }
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", async (event) => {
        const gameId = event.target.closest(".game-item").dataset.id;
        const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este juego?");

        if (confirmDelete) {
          const deleteRes = await fetch(`http://localhost:3000/api/v1/juegos/${gameId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            }
          });

          if (deleteRes.ok) {
            alert("Juego eliminado exitosamente!");
            event.target.closest(".game-item").remove();
          } else {
            alert("Error al eliminar el juego.");
          }
        }
      });
    });
  } catch (error) {
    console.error("Error en la solicitud a la API", error);
  }
};