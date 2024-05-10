export const settings = {
  homeCity: {
    localStorageKey: 'default-city',
    titleUI: 'Select Home City',
    selectionItems: () => weatherReport.utilities.listCities(),
  },
  tempUnits: {
    localStorageKey: 'default-temperature-unit',
    titleUI: 'Select Temperature Units',
    selectionItems: () => ['celsius', 'fahrenheit'],
  },
  speedUnits: {
    localStorageKey: 'default-speed-unit',
    titleUI: 'Select Speed Units',
    selectionItems: () => ['km/h', 'mph'],
  },
};
