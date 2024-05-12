// Settings page
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');

  // Displays the list of cities with checkboxes
  const listOfCities = () => {
    let cityListItem = '';
    // Using my util listCities to return
    weatherReport.utilities.listCities().forEach((cityQuery) => {
      cityListItem += `
            <section class='card-content'>
            <label class='content checkbox'>
            <input class='mx-4' type='checkbox' id='fave-${cityQuery}'/>
            ${weatherReport.utilities.cityStripper(cityQuery)}
            </label>
            </section>
      `;
    });
    return cityListItem;
  };

  // // iterates over each setting in the settings-obj.js object and creates a dropdown with settingsPicker
  const getSettings = () => {
    let settings = '';
    Object.keys(weatherReport.settingsObj).forEach((setting) => {
      settings += weatherReport.components.settingsPicker(weatherReport.settingsObj[setting]);
    });
    return settings;
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
          ${listOfCities()}
        </section>
        <section class='cell mx-6 card'>
          <header class='card-header'>
            <p class='card-header-title is-size-4 is-centered'>Default Settings</p>
          </header>
          <button id='reset-settingsObj' class='ml-5 my-3 button'>Reset All Settings</button>
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
  document.getElementById('reset-settingsObj').addEventListener('click', () => {
    Object.keys(weatherReport.settingsObj).forEach((item) => {
      localStorage.removeItem(weatherReport.settingsObj[item].localStorageKey);
      location.reload();
    });
  });

  // Reset Faves
  document.getElementById('reset-faves').addEventListener('click', () => {
    localStorage.removeItem('favourites');
    location.reload();
  });

  // Calls dom events for returned html of each settingsObj picker component
  Object.keys(weatherReport.settingsObj).forEach((setting) => weatherReport.components.settingsPickerEventListener(false, weatherReport.settingsObj[setting].localStorageKey));

  weatherReport.utilities.handleDropdowns();

  weatherReport.components.runGetAndSetNearestCity();

  // Handles logic and events for when a favorite city id checked
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
