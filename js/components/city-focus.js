// Full component for the city focus view, used on index and the url param request from the dashboard
export const cityFocus = () => {
  const daysOfTheWeek = weatherReport.constants.daysOfTheWeek;

  // Returns a container with all of the weather cards rendered for each day of the week. Takes in
  const getDaysOfWeekDailySummaries = (city, currentDay) => {
    // Supplied type of data for each card. See weatherCard component comment for more info
    const weekCardData = {
      [city]: {
        daily: { Low: 'temperature_2m_min', High: 'temperature_2m_max', 'Chance Of Rain': 'precipitation_probability_max' },
      },
    };

    let cardContainer = '';

    // Passes in day index for weather data into the card component, along with the day of the week itself from the days array
    for (let dayOfTheWeekIndex = 0; dayOfTheWeekIndex < daysOfTheWeek.length; dayOfTheWeekIndex++) {
      /*
      I need the to iterate over the days of the week, so am keeping track of that index. If the current day is thursday (returned from DayJs as 4),
      and we are on the 5th loop iteration, so 4 is the dayOfTheWeekIndex. 4+4 equals 8, then mod 7(len of days of the week) = 1(monday of the days of the week array).
      So now the 5th day of the week to be presented to the user is not friday (as per the sunday-saturday days of the week array), but Monday.
      We are setting the days of the week to start from the current day
      */
      let currentDayModDaysOfWeek = (dayOfTheWeekIndex + currentDay) % daysOfTheWeek.length;

      let dayOfTheWeek;
      if (dayOfTheWeekIndex === 0) {
        dayOfTheWeek = 'Today';
      } else {
        dayOfTheWeek = daysOfTheWeek[currentDayModDaysOfWeek];
      }

      const cardLinkTo = `/hourly-focus/?city=${city}&day=${daysOfTheWeek[currentDayModDaysOfWeek]}`;
      cardContainer += weatherReport.components.weatherCard(weekCardData, dayOfTheWeekIndex, dayOfTheWeek, cardLinkTo);
    }
    return cardContainer;
  };

  // sets a value for homeCity if there is no key stored in local storage yet
  let homeCity;
  if (localStorage.getItem(weatherReport.settings.homeCity.localStorageKey) === null) {
    homeCity = 'waterford';
  } else {
    homeCity = localStorage.getItem(weatherReport.settings.homeCity.localStorageKey);
  }

  // Sets up url params
  const urlParams = new URLSearchParams(window.location.search);

  // if there is no city param in the url, then it returns the homeCity, which was already set with the above if statement
  const city = urlParams.has('city') ? urlParams.get('city') : homeCity;

  const now = dayjs();
  const currentHour = now.hour();
  const currentDay = now.day();

  const dailyData = weatherReport.weatherData[city + '_daily'];
  const weatherCodeQuery = weatherReport.weatherCodes[weatherReport.weatherData[city + `_daily`].daily.weather_code[0]];

  // The data requested for the weather card component
  const rightNowData = {
    [city]: {
      hourly: {
        'Current Temperature': 'temperature_2m',
        'Wind Speed': 'wind_speed_10m',
      },
    },
  };

  return `
    ${weatherReport.components.settingsPicker(weatherReport.settings.homeCity)}
    <section class="columns mx-6 is-vcentered">
      <h1 class="column title is-size-1 has-text-centered">
        ${weatherReport.utilities.cityStripper(city).toUpperCase()}
      </h1>
      <div class="column has-text-justified">
        <figure class="image is-128x128 container">
          <img alt='${weatherCodeQuery.day.description}' src="${weatherCodeQuery.day.image}" />
        </figure>
        <p class="has-text-centered is-size-3">
          ${weatherCodeQuery.day.description}
        </p>
      </div>
      <div class="column has-text-justified">
        <h2 class="is-size-3">
          Daily Summary
        </h2>
        <p class="is-size-6">
          Max Temperature: ${weatherReport.utilities.getValue(city + '_daily', dailyData.daily.temperature_2m_max[0], 'temperature_2m_max')}
        </p>
        <p class="is-size-6">
          Min Temperature: ${weatherReport.utilities.getValue(city + '_daily', dailyData.daily.temperature_2m_min[0], 'temperature_2m_min')}
        </p>
        <p class=" is-size-6">
          Chance of Rain: ${weatherReport.utilities.getValue(city + '_daily', dailyData.daily.precipitation_probability_max[0], 'precipitation_probability_max')}
        </p>
        <p class=" is-size-6">
          Max Wind Speed: ${weatherReport.utilities.getValue(city + '_daily', dailyData.daily.wind_speed_10m_max[0], 'wind_speed_10m_max')}
        </p>
      </div>
      ${window.weatherReport.components.weatherCard(rightNowData, currentHour, `Right Now!`)}
    </section>
    <div class="columns">
      ${getDaysOfWeekDailySummaries(city, currentDay, daysOfTheWeek)}
    </div>
    `;
};
