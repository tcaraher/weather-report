import cityFocus from "/js/pages/city-focus";
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  main.innerHTML = main.innerHTML + cityFocus();
});
