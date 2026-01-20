export const toggleTheme = () => {
  const current =
    document.documentElement.getAttribute("data-theme") || "light";

  const next = current === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
};
