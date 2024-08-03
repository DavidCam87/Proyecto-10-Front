export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.rol === "admin";
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};