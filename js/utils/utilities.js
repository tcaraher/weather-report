// returns an array of all available cities in slug format, without _daily or _hourly
window.weatherReport.utilities.listCities = () => {
  // returns .map of all cities if the query includes daily, as I only need one instance of each city
  return Object.keys(weatherReport.weatherData)
    .filter((cityQuery) => {
      // iterates only over the daily object, as i'm just going through each city here. Stripping out the `_daily as well as I want just the city name
      if (cityQuery.includes('_daily')) {
        return cityQuery;
      }
    })
    .map((cityQuery) => cityQuery.replace('_daily', ''));
};




// Returns a user friendly version of the string from the weather data
window.weatherReport.utilities.cityStripper = (originalCityNameFromData) => {
  const noUnderscores = originalCityNameFromData.replace('_', ' ');
  // Takes the no underscore version, splits each city at a space, puts each word into a map, and for each first characher of each word makes it uppercase, and joins the word back to the first Char from the 1 index, and adds a space.
  return noUnderscores
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
};

// Handles all dropdowns
window.weatherReport.utilities.handleDropdowns = () => {
  // toggle dropdowns
  document.querySelectorAll('.dropdown').forEach((dropdown) =>
    dropdown.addEventListener('click', () => {
      dropdown.classList.toggle('is-active');
    }),
  );
};


// returns the fave object and parses the string into an object.
// Handles when site is first loaded/when no favourites object is initialized into local storage yet, as some of my calls seemed to cause errors if there was no favourites object initialized
window.weatherReport.utilities.getFaveObjFromStorage = () => {
  let readFaves;
  if (localStorage.getItem('favourites') === null) {
    readFaves = {};
  } else {
    readFaves = JSON.parse(localStorage.getItem('favourites'));
  }
  return readFaves;
};




// Gets and converts (if needed) temperature units. Takes the cityName plus the _hourly/daily part of the string, the result of that query, and the units that were requested
window.weatherReport.utilities.getValue = (cityQuery, queryResult, dataUnitTypeRequested) => {
  const dailyVsHourly = cityQuery.includes('daily') ? 'daily_units' : 'hourly_units';
  const fullDataQuery = weatherReport.weatherData[cityQuery][dailyVsHourly][dataUnitTypeRequested];

  // series of conditionals to return which type of value based on the supplied data in weather_data, or the converted value based on user setting
  if (localStorage.getItem(weatherReport.settings.speedUnits.localStorageKey) === null || localStorage.getItem(weatherReport.settings.tempUnits.localStorageKey) === null) {
    return queryResult + ' ' + fullDataQuery;
  }
  // if the setting is set to deg F
  else if (localStorage.getItem(weatherReport.settings.tempUnits.localStorageKey).includes('fahrenheit') && dataUnitTypeRequested.includes('temp')) {
    return Math.round(queryResult * 1.8 + 32) + ' ' + '°F';
  }
  // if the setting is set to mph
  else if (localStorage.getItem(weatherReport.settings.speedUnits.localStorageKey).includes('mph') && dataUnitTypeRequested.includes('speed')) {
    // convert to miles per hour: https://www.blackcircles.com/helpcentre/tyres/kph-to-mph#:~:text=To%20convert%20kilometres%20per%20hour,in%201%20kilometre%20per%20hour.
    return Math.round(queryResult * 0.6214 * 100) / 100 + ' ' + 'mph';
  } else {
    return queryResult + ' ' + fullDataQuery;
  }
};


