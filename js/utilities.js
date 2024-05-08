// returns an array of all available cities in slug format, without _daily or _hourly
window.weatherReport.utilities.listCities = () => {
  return Object.keys(weatherReport.weatherData).filter((cityQuery) => {
    // iterates only over the daily object, as i'm just going through each city here. Stripping out the `_daily as well as I want just the city name
    if (cityQuery.includes('_daily')) {
      return cityQuery
    }
  }).map(cityQuery => cityQuery.replace('_daily', ''));
};

// Returns a user friendly version of the string from the weather data
window.weatherReport.utilities.cityStripper = (originalCityNameFromData) => {
  return originalCityNameFromData.replace('_', ' ').toUpperCase();
};

// returns the fave object and parses the string into an object.
// Handles when site is first loaded/when no favourites object is initialized into local storage yet.
window.weatherReport.utilities.getFaveObjFromStorage = () => {
  let readFaves;
  if (localStorage.getItem('favourites') === null) {
    readFaves = {};
  } else {
    readFaves = JSON.parse(localStorage.getItem('favourites'));
  }
  return readFaves;
};

// Gets and converts (if needed) temperature units. Takes the cityName plus the _hourly/daily part of the string,
// The result of that query, and the units that were requested
// TODO Optimise the calls for this, no need to pass in all of those separately
window.weatherReport.utilities.getValue = (cityQuery, queryResult, dataUnitRequest) => {

  const dailyVsHourly = cityQuery.includes('daily') ? 'daily_units' : 'hourly_units';
  const suppliedDataUnit = weatherReport.weatherData[cityQuery][dailyVsHourly][dataUnitRequest];
  if (localStorage.getItem(weatherReport.settings.speedUnits.localStorageKey) === null || localStorage.getItem(weatherReport.settings.tempUnits.localStorageKey) === null) {
    return queryResult + ' ' + suppliedDataUnit
  }
  else if (
    localStorage.getItem(weatherReport.settings.tempUnits.localStorageKey).includes('fahrenheit') &&
    dataUnitRequest.includes('temp')
  ) {
    return Math.round(queryResult * 1.8 + 32) + ' ' + '°F';
  } else if (localStorage.getItem(weatherReport.settings.speedUnits.localStorageKey).includes('mph') && dataUnitRequest.includes('speed'))  {
    // convert to miles per hour: https://www.blackcircles.com/helpcentre/tyres/kph-to-mph#:~:text=To%20convert%20kilometres%20per%20hour,in%201%20kilometre%20per%20hour.

    return Math.round(queryResult * 0.6214 * 100) / 100 + ' ' + 'mph';
  } else {
    return queryResult + ' ' + suppliedDataUnit;
  }
};
