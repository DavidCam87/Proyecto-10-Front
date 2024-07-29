export const showSkeletons = (elementoPadre, cantidad) => {
  const divSkeletons = document.createElement("div");
  divSkeletons.className = "divTodos";

  for (let i = 0; i < cantidad; i++) {
    const divSkeleton = document.createElement("div");
    divSkeleton.className = "skeleton divJuego";

    const titulo = document.createElement("h3");
    const caratula = document.createElement("img");
    const info = document.createElement("div");

    info.className = "info";
    const precio = document.createElement("p");
    const valoracion = document.createElement("p");

    info.append(precio, valoracion);
    divSkeleton.append(titulo, caratula, info);
    divSkeletons.append(divSkeleton);
  }
  elementoPadre.append(divSkeletons);
};