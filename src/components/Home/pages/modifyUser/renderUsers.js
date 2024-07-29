export const renderUsers = (users, main) => {
  const usersListDiv = document.createElement("div");
  usersListDiv.classList.add("users-list");

  usersListDiv.innerHTML = users.map(user => `
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
};
