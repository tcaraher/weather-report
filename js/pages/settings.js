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

  const defaultCityList = () => {
    let cityList = '';
    // TODO underscore and uppercase
    Object.keys(weatherReport.weatherData).forEach((cityQuery) => {
      // iterates only over the daily object, as i'm just going through each city here. Stripping out the `_daily as well as I want just the city name
      if (cityQuery.includes('_daily')) {
        const city = cityQuery.replace('_daily', '');
        cityList += `
        <a id="city-selection-${city}" class="dropdown-item">
            ${city.replace('_', ' ').toUpperCase()}
        </a>
      `;
      }
    });
    return cityList;
  };

  let homeCity;
  if (localStorage.getItem('default-city') === null) {
    homeCity = 'Set Home City';
  } else {
    homeCity = localStorage.getItem('default-city').replace('_', ' ').toUpperCase();
  }
  const Settings = () => {
    return `
    <h1 class='title is-size-1 has-text-centered'>
    Settings
    </h1>
    <div class='grid'>    
        <section class="cell mx-6 card">
        <header class="card-header"><p class="card-header-title is-size-4 is-centered">Favourite Cities</p></header>
        ${cityList()}
        </section>
        <section class="cell mx-6 card">
        <header class="card-header"><p class="card-header-title is-size-4 is-centered">Default Settings</p></header>
        <section class='card-content columns'>
      <p class='mt-1 mx-4 is-size-5'>Select Home City:</p>
        <div class="dropdown">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
              <span id='select'>${homeCity}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu3" role="menu">
            <div class="dropdown-content">
              ${defaultCityList()}
            </div>
          </div>
        </div>      
        </section>
        </section>
        </div>


    `;
  };

  main.innerHTML += Settings();

  // Reads user settings and saves them in storage them
  // TODO turn into utility
  let readFaves;
  if (localStorage.getItem('favourites') === null) {
    readFaves = {};
  } else {
    readFaves = JSON.parse(localStorage.getItem('favourites'));
  }
  let favouritesObj = readFaves;
  document.querySelectorAll('[id^=fave-]').forEach((checkbox) => {
    checkbox.addEventListener('click', (event) => {
      const cityName = event.target.id.replace('fave-', '');
      favouritesObj[cityName] = event.target.checked;
      localStorage.setItem('favourites', JSON.stringify(favouritesObj));
    });
  });

  document.querySelectorAll('[id^=fave-]').forEach((checkbox) => {
    const cityName = checkbox.id.replace('fave-', '');
    checkbox.checked = readFaves[cityName];
  });

  // Default city event listeners
  document.querySelectorAll('[id^=city-selection]').forEach((selection) => {
    selection.addEventListener('click', (event) => {
      const cityName = selection.id.replace('city-selection-', '');
      localStorage.setItem('default-city', cityName);
      document.querySelector('#select').innerHTML = cityName.replace('_', ' ').toUpperCase();
    });
  });

  // toggle dropdown
  const dropdown = document.querySelector('.dropdown');
  dropdown.addEventListener('click', (event) => {
    dropdown.classList.toggle('is-active');
  });
});
