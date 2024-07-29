export const generateNavLink = (route, toggleMenu, currentPage) => {
  if (route.texto.startsWith('${https') && route.texto.endsWith('}')) {
    const divPS = document.createElement("div");
    const img = document.createElement("img");
    img.src = route.texto.slice(2, -1); // Extraemos la URL correcta
    img.className = "logoPS";
    img.alt = "Playstation Logo";
    img.style.maxWidth = "70px";
    divPS.append(img);
    return divPS;
  } else {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = route.texto;
    a.addEventListener("click", () => {
      if (currentPage.texto !== route.texto) {
        currentPage.texto = route.texto;
        route.funcion();
      }
      toggleMenu();
    });
    return a;
  }
};
