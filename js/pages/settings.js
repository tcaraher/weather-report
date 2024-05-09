document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');

  const cityList = () => {
    let cityListItem = '';
    Object.keys(weatherReport.weatherData).forEach((cityQuery) => {
      // iterates only over the daily object, as i'm just going through each city here. Stripping out the `_daily as well as I want just the city name
      if (cityQuery.includes('_daily')) {
        const city = cityQuery.replace('_daily', '');
        cityListItem += `
            <section class='card-content'>
            <label class='content checkbox'>
            <input class='mx-4' type='checkbox' id='fave-${city}'/>
            ${city.replace('_', ' ').toUpperCase()}
            </label>
            </section>
      `;
      }
    });
    return cityListItem;
  };


  const getSettings = () => {
    let settings = ""
    Object.keys(weatherReport.settings).forEach((setting) => {
      settings += weatherReport.components.settingsPicker(weatherReport.settings[setting].localStorageKey, weatherReport.settings[setting].titleUI, weatherReport.settings[setting].selectionItems());
    });
    return settings
  };
  
  const Settings = () => {
    return `
      <h1 class='title is-size-1 has-text-centered'>
        Settings
      </h1>
      <div class='grid'>
        <section class='cell mx-6 card'>
          <header class='card-header'>
            <p class='card-header-title is-size-4 is-centered'>Favourite Cities</p>
          </header>
          <button id='reset-faves' class='ml-5 my-3 button'>Reset All Favourites</button>

          ${cityList()}
        </section>
        <section class='cell mx-6 card'>
          <header class='card-header'>
            <p class='card-header-title is-size-4 is-centered'>Default Settings</p>
          </header>
          <button id='reset-settings' class='ml-5 my-3 button'>Reset All Settings</button>
          ${getSettings()}
          <div class='ml-5'>
            <p class='is-size-5'>Get and Set Home City With User Location:</p>
            ${weatherReport.components.displayLocationUI()}
          </div>
      </div>
      </section>
    `;
  };

  main.innerHTML += Settings();

  // Reset Settings
  document.getElementById('reset-settings').addEventListener('click', ()=> {
    Object.keys(weatherReport.settings).forEach(item => { localStorage.removeItem(weatherReport.settings[item].localStorageKey)
      location.reload()
    })
  })

  // Reset Faves
  document.getElementById('reset-faves').addEventListener('click', () => {
    localStorage.removeItem('favourites');
    location.reload()
  });

  // Calls dom events for returned html of each settings picker component
  Object.keys(weatherReport.settings).forEach((setting) => weatherReport.components.settingsPickerEventListener(false, weatherReport.settings[setting].localStorageKey));

  weatherReport.components.handleDropdowns();

  weatherReport.components.runGetAndSetNearestCity()

  let favouritesObj = weatherReport.utilities.getFaveObjFromStorage();

  document.querySelectorAll('[id^=fave-]').forEach((checkbox) => {
    checkbox.addEventListener('click', (event) => {
      const cityName = event.target.id.replace('fave-', '');
      favouritesObj[cityName] = event.target.checked;
      localStorage.setItem('favourites', JSON.stringify(favouritesObj));
    });
  });

  document.querySelectorAll('[id^=fave-]').forEach((checkbox) => {
    const cityName = checkbox.id.replace('fave-', '');
    checkbox.checked = favouritesObj[cityName];
  });
});
