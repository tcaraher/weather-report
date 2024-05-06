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

  const storageTemperatureKey = weatherReport.constants.storageTemperatureKey;
  const storageSpeedKey = weatherReport.constants.storageSpeedKey;
  console.log(storageSpeedKey);
  let speedUnit;
  if (localStorage.getItem(storageSpeedKey) === null) {
    speedUnit = 'Set Default Speed Unit';
  } else {
    speedUnit = localStorage.getItem(storageSpeedKey);
  }

  let tempUnit;
  if (localStorage.getItem(storageTemperatureKey) === null) {
    tempUnit = 'Set Default Speed Unit';
  } else {
    tempUnit = localStorage.getItem(storageTemperatureKey);
  }

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
        ${cityList()}
      </section>
      <section class='cell mx-6 card'>
        <header class='card-header'>
          <p class='card-header-title is-size-4 is-centered'>Default Settings</p>
        </header>
        ${weatherReport.components.cityPicker()}
 
        ${weatherReport.components.settingDropdowns(weatherReport.constants.storageTemperatureKey, ['celsius', 'fahrenheit'])}
           
        ${weatherReport.components.settingDropdowns(weatherReport.constants.storageSpeedKey, ['km/h', 'mph'])}
    </div>

    </section>
    `;
  };

  main.innerHTML += Settings();

  // Calls dom events for returned html of city picker component
  weatherReport.components.cityPickerEvents();

  weatherReport.components.dropdownSelectionEvents(weatherReport.constants.storageSpeedKey);
  weatherReport.components.dropdownSelectionEvents(weatherReport.constants.storageTemperatureKey);

  weatherReport.components.handleDropdowns();

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
