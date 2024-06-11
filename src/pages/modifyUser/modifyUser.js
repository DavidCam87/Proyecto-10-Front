import "./modifyUser.css";

export const modifyUser = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const user = JSON.parse(localStorage.getItem("user"));
  const token = `Bearer ${localStorage.getItem("token")}`;

  try {
    const res = await fetch(`https://proyecto-10-back.vercel.app/api/v1/users/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    if (!res.ok) {
      throw new Error(`Error fetching user: ${res.status} ${res.statusText}`);
    }

    const usuario = await res.json();

    if (usuario.rol === "admin") {
      const allUsersRes = await fetch('https://proyecto-10-back.vercel.app/api/v1/users', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      if (!allUsersRes.ok) {
        throw new Error(`Error fetching all users: ${allUsersRes.status} ${allUsersRes.statusText}`);
      }

      const allUsers = await allUsersRes.json();
      const usersListDiv = document.createElement("div");
      usersListDiv.classList.add("users-list");

      usersListDiv.innerHTML = allUsers.map(user => `
        <div class="user-item" data-id="${user._id}">
          <p>UserName: ${user.userName}</p>
          <p>Email: ${user.email}</p>
          <p>Rol: ${user.rol}</p>
          <ul>
            <h3>Favoritos:</h3>
            ${user.favoritos.map(favorito => `
              <li>
                <p>Título: ${favorito.titulo}</p>
                <p>Precio: ${favorito.precio}</p>
                <p>ID Juego: ${favorito._id}</p>
              </li>
            `).join("")}
          </ul>
          <button class="modify-btn">Modify</button>
          <button class="delete-btn">Delete</button>
        </div>
      `).join("");

      main.appendChild(usersListDiv);

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
            const updateRes = await fetch(`https://proyecto-10-back.vercel.app/api/v1/users/${userId}`, {
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

      document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
          const userId = event.target.closest(".user-item").dataset.id;
          const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este usuario?");

          if (confirmDelete) {
            try {
              const deleteRes = await fetch(`https://proyecto-10-back.vercel.app/api/v1/users/${userId}`, {
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

    } else {
      main.innerHTML = "<p>Usted no tiene permiso para ver esta página</p>";
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    main.innerHTML = "<p>Error al cargar los usuarios. Inténtalo nuevamente más tarde.</p>";
  }
};
