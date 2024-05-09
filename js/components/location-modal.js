window.weatherReport.components.locationModal = () => {
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
          ${weatherReport.components.settingsPicker(weatherReport.settings.homeCity.localStorageKey,
          weatherReport.settings.homeCity.titleUI, weatherReport.settings.homeCity.selectionItems())}
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
    </div>
`
}


