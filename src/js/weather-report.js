import { cityFocus } from '/js/components/city-focus.js';
import { displayLocationUI, runGetAndSetNearestCity } from '/js/components/location.js';
import { locationModal, locationModalEvents } from '/js/components/location-modal.js';
import { settingsPicker, settingsPickerEventListener } from '/js/components/settings-picker.js';
import { weatherCard } from '/js/components/weather-card.js';
import weatherCodes from '/js/data/weather-codes.js';
import { weatherData } from '/js/data/weather_data.js';
import { uiFriendlyString, getFaveObjFromStorage, getValue, handleDropdowns, listCities } from '/js/utils/utilities.js';
import { daysOfTheWeek } from '/js/constants.js';
import { settingsObj } from '/js/settings-obj.js';

window.weatherReport = {
  components: {
    cityFocus,
    displayLocationUI,
    runGetAndSetNearestCity,
    locationModal,
    locationModalEvents,
    settingsPicker,
    settingsPickerEventListener,
    weatherCard,
  },
  utilities: {
    listCities,
    uiFriendlyString,
    handleDropdowns,
    getFaveObjFromStorage,
    getValue,
  },
  constants: {
    daysOfTheWeek,
  },
  settingsObj,
  weatherData,
  weatherCodes,
};
