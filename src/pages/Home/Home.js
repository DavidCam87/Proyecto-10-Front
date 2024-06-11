import "./Home.css"

export const Home = async (page = 1) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  try {
    const res = await fetch(`https://proyecto-10-back.vercel.app/api/v1/juegos?page=${page}&limit=10`);
    const juegos = await res.json();
    pintarJuegos(juegos.juegos, main);
    paginationControls(juegos.page, juegos.totalPages)

  } catch (error) {
    console.error(error);
    main.innerHTML = "<p>Error al cargar los juegos. Inténtalo nuevamente más tarde.</p>";
  }
};

const paginationControls = (currentPage, totalPages) => {
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination-controls";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => Home(currentPage - 1));

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => Home(currentPage + 1));

  const pageInfo = document.createElement("span");
  pageInfo.className = "pagination-info";
  pageInfo.textContent = `${currentPage} of ${totalPages}`;

  paginationDiv.append(prevButton, pageInfo, nextButton);
  document.querySelector("main").appendChild(paginationDiv);
};


export const pintarJuegos = (juegos, elementoPadre) => {
  const divTodos = document.createElement("div");
  divTodos.className = "divTodos";


  for (const juego of juegos) {
    const divJuego = document.createElement("div");
    const titulo = document.createElement("h3");
    const caratula = document.createElement("img");
    const info = document.createElement("div");
    const like = document.createElement("div");

    like.className = "con-like";
    like.innerHTML = `
      <input class="like" type="checkbox" title="like">
      <div class="checkmark">
        <svg xmlns="http://www.w3.org/2000/svg" class="outline" viewBox="0 0 24 24">
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="filled" viewBox="0 0 24 24">
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="celebrate">
          <polygon class="poly" points="10,10 20,20"></polygon>
          <polygon class="poly" points="10,50 20,50"></polygon>
          <polygon class="poly" points="20,80 30,70"></polygon>
          <polygon class="poly" points="90,10 80,20"></polygon>
          <polygon class="poly" points="90,50 80,50"></polygon>
          <polygon class="poly" points="80,80 70,70"></polygon>
        </svg>
      </div>
    `;
    const user = JSON.parse(localStorage.getItem("user"));
    const checkbox = like.querySelector(".like");

    if (user?.favoritos?.includes(juego._id)) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", async () => {
      try {
        if (checkbox.checked) {
          await addFavorito(juego._id)
        } else {
          await removeFavorito(juego._id)
        }
      } catch (error) {
        console.error(`Error al actualizar el favorito: ${error}`);
      }
    });


    divJuego.className = "divJuego";
    titulo.textContent = juego.titulo.replace("PS4 PRINCIPAL", "");
    caratula.src = juego.caratula;
    info.innerHTML = `
      <p>${juego.precio}€</p>
      <p>${juego.valoracion ?? 0}⭐</p>
    `;

    info.className = "info";
    info.append(like)
    divJuego.append(titulo, caratula, info);
    divTodos.append(divJuego);

  }
  elementoPadre.append(divTodos);
};

const addFavorito = async (idJuego) => {
  const user = JSON.parse(localStorage.getItem("user"));
  user.favoritos = [...user.favoritos, idJuego]

  const objetoFinal = JSON.stringify({
    favoritos: user.favoritos//[idJuego]
  });

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: objetoFinal
  }

  const res = await fetch(`https://proyecto-10-back.vercel.app/api/v1/users/${user._id}`, opciones);
  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(`Agregado el juego ${idJuego} a favoritos`);
  } else {
    console.error(`Error al agregar el juego ${idJuego} a favoritos`);
  }
};

const removeFavorito = async (idJuego) => {
  const user = JSON.parse(localStorage.getItem("user"));
  user.favoritos = user.favoritos.filter(favorito => favorito !== idJuego);

  const objetoFinal = JSON.stringify({
    favoritos: user.favoritos
  });

  const opciones = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: objetoFinal
  };

  const res = await fetch(`https://proyecto-10-back.vercel.app/api/v1/users/${user._id}`, opciones);

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(`Removido el juego ${idJuego} de favoritos`);
  } else {
    console.error(`Error al remover el juego ${idJuego} de favoritos`);
  }
};