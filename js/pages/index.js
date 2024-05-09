// Runs the city focus and welcome/location modal on first load
document.addEventListener('DOMContentLoaded', () => {
  // Initializes variables for html elements set in index.njk
  const cityFocus = document.getElementById('city-focus');
  const locationModal = document.getElementById('locationModal');

  locationModal.innerHTML += locationModal.innerHTML + weatherReport.components.locationModal();

  cityFocus.innerHTML += weatherReport.components.cityFocus();

  // Event listeners
  weatherReport.components.settingsPickerEventListener(true, weatherReport.settings.homeCity.localStorageKey);
  weatherReport.utilities.handleDropdowns();

  // Logic for nearest city
  weatherReport.components.runGetAndSetNearestCity();
  weatherReport.components.locationModalEvents();
});
