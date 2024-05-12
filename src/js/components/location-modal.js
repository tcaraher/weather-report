// Displays the location modal for the index on first load of site.
export const locationModal = () => {
  return `
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Welcome to Weather Report!</p>
          <button id='close-modal' class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p class='is-size-5 mb-5'>Select your default city:</p>
          ${weatherReport.components.settingsPicker(weatherReport.settingsObj.homeCity)}
          <hr class='mt-5' />
          <p class='is-size-5 pt-4'>Or get your nearest city's weather data via your location:</p>
          ${weatherReport.components.displayLocationUI()}
          <hr />
          <h2 class='is-size-5 py-4'>By the way, this site is named after the best <a
              href='https://en.wikipedia.org/wiki/Weather_Report'>band</a> ever!</h2>
          <hr />
        </section>
      </div>
    </div>
`;
};

// Event listeners and logic for modal
export const locationModalEvents = () => {
  const modalElement = document.querySelector('.modal');

  // If there is no stored default city, show the location modal on page load
  if (localStorage.getItem(weatherReport.settingsObj.homeCity.localStorageKey) === null) {
    window.addEventListener('load', () => {
      modalElement.classList.toggle('is-active');
    });
  }

  // closes the modal with the X button in upper right.
  document.getElementById('close-modal').addEventListener('click', () => {
    modalElement.classList.toggle('is-active');
  });
};
