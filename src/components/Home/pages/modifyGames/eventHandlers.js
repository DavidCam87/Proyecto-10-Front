export const addModifyEventListeners = (token) => {
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

      const updateRes = await fetch(`${PetFetch}/juegos/${gameId}`, {
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
};

export const addDeleteEventListeners = (token) => {
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async (event) => {
      const gameId = event.target.closest(".game-item").dataset.id;
      const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este juego?");

      if (confirmDelete) {
        const deleteRes = await fetch(`${PetFetch}/juegos/${gameId}`, {
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
};