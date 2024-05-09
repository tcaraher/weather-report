document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  main.innerHTML = main.innerHTML + weatherReport.components.cityFocus();
  weatherReport.components.settingsPickerEventListener(true, weatherReport.settings.homeCity.localStorageKey);
  weatherReport.components.handleDropdowns();
});
