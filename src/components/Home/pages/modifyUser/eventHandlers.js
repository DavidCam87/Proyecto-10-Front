import { PetFetch } from "../../../../config/PetFetch/PetFetch";

export const addModifyEventListeners = (token) => {
  document.querySelectorAll(".modify-btn").forEach(button => {
    button.addEventListener("click", async (event) => {
      const userId = event.target.closest(".user-item").dataset.id;
      const newUserName = prompt("Modifica Nombre de Usuario (deja en blanco para no modificar): ");
      const newEmail = prompt("Modifica Email de Usuario (deja en blanco para no modificar): ");
      const newRol = prompt("Modifica Rol de Usuario (deja en blanco para no modificar): ");

      const updateData = {};
      if (newUserName) updateData.userName = newUserName;
      if (newEmail) updateData.email = newEmail;
      if (newRol) updateData.rol = newRol;

      try {
        const updateRes = await fetch(`${PetFetch}/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify(updateData)
        });

        if (!updateRes.ok) {
          throw new Error(`Failed to update user: ${updateRes.status} ${updateRes.statusText}`);
        }

        alert("User updated successfully!");
        location.reload();
      } catch (error) {
        alert(`Error updating user: ${error.message}`);
      }
    });
  });
};

export const addDeleteEventListeners = (token) => {
  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async (event) => {
      const userId = event.target.closest(".user-item").dataset.id;
      const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este usuario?");

      if (confirmDelete) {
        try {
          const deleteRes = await fetch(`${PetFetch}/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            }
          });

          if (!deleteRes.ok) {
            throw new Error(`Error al eliminar Usuario: ${deleteRes.status} ${deleteRes.statusText}`);
          }

          alert("User deleted successfully!");
          event.target.closest(".user-item").remove();
        } catch (error) {
          alert(`Error deleting user: ${error.message}`);
        }
      }
    });
  });
};