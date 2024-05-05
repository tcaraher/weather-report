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
            ${city.replace("_"," ").toUpperCase()}
            </label>
            </section>
      `;
      }
    });
    return cityListItem;
  };

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
        <section class='card-content'>
        <p class='content'> hello</p>
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
});
