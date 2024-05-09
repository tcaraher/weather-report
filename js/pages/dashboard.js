document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  console.log(localStorage.getItem('favourites'));

  const readFaves = weatherReport.utilities.getFaveObjFromStorage();
  const hasFaves = Object.values(readFaves).includes(true);

  // Iterates over each key in the weather data key value pairs just for the daily weather (I don't need it to do it twice for each city) Then takes _daily out so i'm just left with the city name
  const cityCards = (favourites) => {
    let cards = '';
    let isFave = false;
    Object.keys(weatherReport.weatherData).forEach((cityQuery) => {
      // iterates only over the daily object, as i'm just going through each city here. Stripping out the "_daily" as well as I want just the city name
      if (cityQuery.includes('_daily')) {
        const city = cityQuery.replace('_daily', '');

        const dashboardCardData = {
          [city]: {
            daily: {
              Low: 'temperature_2m_min',
              High: 'temperature_2m_max',
            },
          },
        };
        const cardLinkTo = `/city-focus/?city=${city}`;

        // reads local storage to check if the city is a fave
        isFave = readFaves[city];
        // if it is, it renders it if the "favourites" boolean has been set to true when the function is called. Opposite if a false condition is set during call
        if (favourites && isFave) {
          cards += weatherReport.components.weatherCard(dashboardCardData, 0, city, cardLinkTo);
        } else if (!favourites && !isFave) {
          cards += weatherReport.components.weatherCard(dashboardCardData, 0, city, cardLinkTo);
        }
      }
    });
    return cards;
  };

  const Dashboard = () => {
    return `
      <p class='title is-size-2 has-text-centered'>
        ${!hasFaves ? '' : 'Favourite Cities'}
      </p>
      <div class="grid is-col-min-11">
        ${cityCards(true)}
      </div>
      <p class='title is-size-2 has-text-centered'>${!hasFaves ? 'Cities' : 'Other Cities'}</p>
      <p class='has-text-centered'> ${!hasFaves ? `Set your favourite cities in <a href='/settings/'>settings!</a>` : ''}
      </p>
      <div class="grid is-col-min-11">
        ${cityCards(false)}
      </div>
    `;
  };
  main.innerHTML += Dashboard();
});
