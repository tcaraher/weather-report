import cityFocus from "/js/pages/city-view";
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  main.innerHTML = main.innerHTML + cityFocus();
});
