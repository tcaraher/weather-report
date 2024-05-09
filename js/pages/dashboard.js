document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');

  const readFaves = weatherReport.utilities.getFaveObjFromStorage();
  const hasFaves = Object.values(readFaves).includes(true);

  // Iterates over each key in the weather data key value pairs just for the daily weather (I don't need it to do it twice for each city) Then takes _daily out so i'm just left with the city name
  const cityCards = (favourites) => {
    // Uses list cities util for just a list of available cities without _etc
    const cityList = weatherReport.utilities.listCities()
    let cards = '';
    let isFave = false;

    cityList.forEach((cityQuery) => {
        const city = cityQuery.replace('_daily', '');
        //Data to be passed in to weather cards
        const dashboardCardData = {
          [city]: {
            daily: {
              Low: 'temperature_2m_min',
              High: 'temperature_2m_max',
            },
          },
        };

        // sets url for card to link to for more. To be passed in to the weather card components
        const cardLinkTo = `/city-focus/?city=${city}`;

        // reads local storage to check if the city is a fave
        isFave = readFaves[city];
        // if it is, it renders it if the "favourites" boolean has been set to true when the function is called. Opposite if a false condition is set during call
        if (favourites && isFave) {
          cards += weatherReport.components.weatherCard(dashboardCardData, 0, city, cardLinkTo);
        } else if (!favourites && !isFave) {
          cards += weatherReport.components.weatherCard(dashboardCardData, 0, city, cardLinkTo);
        }
    });
    return cards;
  };

  const Dashboard = () => {
    return `
      <p class='title is-size-2 has-text-centered'>
<!--      Only renders the fave section if there are favourites -->
        ${!hasFaves ? '' : 'Favourite Cities'}
      </p>
      <div class="grid is-col-min-11">
<!--      Renders the city cards with faves only, so boolean set to true-->
        ${cityCards(true)}
      </div>
<!--      Changes text based on if there are faves-->
      <p class='title is-size-2 has-text-centered'>${!hasFaves ? 'Cities' : 'Other Cities'}</p>
      <p class='has-text-centered'> ${!hasFaves ? `Set your favourite cities in <a href='/settings/'>settings!</a>` : ''}
      </p>
<!--      displays rest of the cities or all of them if no faves are set-->
      <div class="grid is-col-min-11">
        ${cityCards(false)}
      </div>
    `;
  };
  main.innerHTML += Dashboard();
});
