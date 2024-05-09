document.addEventListener('DOMContentLoaded', () => {
  const cityFocus = document.getElementById('city-focus');
  const locationModal = document.getElementById("locationModal")

  locationModal.innerHTML += locationModal.innerHTML + weatherReport.components.locationModal()

  cityFocus.innerHTML = cityFocus.innerHTML + weatherReport.components.cityFocus();

  weatherReport.components.settingsPickerEventListener(true, weatherReport.settings.homeCity.localStorageKey);
  weatherReport.components.handleDropdowns();


  // If there is no stored default city, show the location modal on page load
  const modalElement = document.querySelector('.modal')

  if (localStorage.getItem(weatherReport.settings.homeCity.localStorageKey) === null) {
    window.addEventListener('load', () => {
      modalElement.classList.toggle('is-active');
    });
  }
  document.getElementById('close-modal').addEventListener('click', () => {
    modalElement.classList.toggle('is-active');
  });

  weatherReport.components.runGetAndSetNearestCity()
});