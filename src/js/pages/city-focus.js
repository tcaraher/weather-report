// Loads city focus and adds it to main. Also runs the event listeners
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  main.innerHTML = main.innerHTML + weatherReport.components.cityFocus();
  weatherReport.components.settingsPickerEventListener(true, weatherReport.settingsObj.homeCity.localStorageKey);
  weatherReport.utilities.handleDropdowns();
});
