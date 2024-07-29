export const Footer = () => {
  const footer = document.createElement("footer");
  const copyright = document.createElement("p");
  const desarrolladoPor = document.createElement("p");
  const enlace = document.createElement("a");

  copyright.textContent = "Copyright © 2024 AlphaStation";
  enlace.href = "https://github.com/DavidCam87";
  enlace.target = "_blank";
  enlace.textContent = "David Camuñez";
  desarrolladoPor.textContent = "Desarrollado por ";
  desarrolladoPor.appendChild(enlace);
  footer.appendChild(copyright);
  footer.appendChild(desarrolladoPor);

  document.body.appendChild(footer);
};