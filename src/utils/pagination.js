import { Home } from '../components/Home/Home';
const createPaginationButton = (text, isDisabled, onClick) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.addEventListener("click", onClick);
  return button;
};

export const paginationControls = (currentPage, totalPages) => {
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination-controls";

  const prevButton = createPaginationButton("Previous", currentPage === 1, () => Home(currentPage - 1));
  const nextButton = createPaginationButton("Next", currentPage === totalPages, () => Home(currentPage + 1));

  const pageInfo = document.createElement("span");
  pageInfo.className = "pagination-info";
  pageInfo.textContent = `${currentPage} of ${totalPages}`;

  paginationDiv.append(prevButton, pageInfo, nextButton);
  document.querySelector("main").appendChild(paginationDiv);
};