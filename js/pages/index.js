import cityFocus from '/js/pages/city-focus';
// TODO fix index.js import.
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  // main.innerHTML += weatherReport.components.cityPicker();
  main.innerHTML += weatherReport.components.cityFocusPage();
});
