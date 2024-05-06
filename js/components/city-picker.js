window.weatherReport.components.cityPicker = (defaultPicker) => {
  let homeCity;
  if (localStorage.getItem('default-city') === null) {
    homeCity = 'Set Home City';
  } else {
    homeCity = weatherReport.utilities.cityStripper(localStorage.getItem('default-city'));
  }
  const defaultCityList = () => {
    let cityList = '';
    Object.keys(weatherReport.weatherData).forEach((cityQuery) => {
      // iterates only over the daily object, as i'm just going through each city here. Stripping out the `_daily as well as I want just the city name
      if (cityQuery.includes('_daily')) {
        const city = cityQuery.replace('_daily', '');
        cityList += `
        <a id="city-selection-${city}" class="dropdown-item">
            ${weatherReport.utilities.cityStripper(city)}
        </a>
      `;
      }
    });
    return cityList;
  };

  return `
<div class='columns card-content'>
  <p class='mt-1 mx-4 is-size-5'>Select Default City:</p>
  <div class="dropdown">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
        <span id='selected-city'>${homeCity}</span>
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
</div>   
    
    `;
};

window.weatherReport.components.cityPickerEvents = (returnURL) => {
  // Default city event listeners
  document.querySelectorAll('[id^=city-selection]').forEach((selection) => {
    selection.addEventListener('click', (event) => {
      const cityName = selection.id.replace('city-selection-', '');
      localStorage.setItem('default-city', cityName);
      document.querySelector('#selected-city').innerHTML = weatherReport.utilities.cityStripper(cityName);
      // sends user to the new default city if true is passed into function call. Used on home screen/city focus page to refresh page after default city update, not on settings page
      if (returnURL) {
        document.getElementById(`city-selection-${cityName}`).setAttribute('href', `/city-focus/?city=${cityName}`);
      }
    });
  });
};

// Dropdown component for general settings (not default city with list).
// Takes a settings type (in this case either temp or wind) and the options in an array
window.weatherReport.components.settingDropdowns = (localStorageKey, settingsOptions) => {
  const settingType = localStorageKey.includes('temp') ? 'temp' : 'speed';
  const settingTypeFriendly = settingType.includes('temp') ? 'Temperature' : 'Wind Speed';
  let settingsValueFromStorage;
  if (localStorage.getItem(localStorageKey) === null) {
    settingsValueFromStorage = `Set Default ${settingTypeFriendly} Unit`;
  } else {
    settingsValueFromStorage = localStorage.getItem(localStorageKey).toUpperCase();
  }

  return `
          <div class='columns card-content'>
          <p class='mt-1 mx-4 is-size-5'>Select Default ${settingTypeFriendly} Units:</p>
          <div class='dropdown unit-dropdown'>
            <div class='dropdown-trigger'>
              <button class='button' aria-haspopup='true' aria-controls='dropdown-menu3'>
                <span id='selected-unit-${settingType}'>${settingsValueFromStorage}</span>
                <span class='icon is-small'>
                  <i class='fas fa-angle-down' aria-hidden='true'></i>
                </span>
              </button>
            </div>
            <div class='dropdown-menu' id='dropdown-menu3' role='menu'>
              <div class='dropdown-content'>
                <a id='${settingType}-selection-${settingsOptions[0]}' class='dropdown-item'>${settingsOptions[0].toUpperCase()}</a>
                <a id='${settingType}-selection-${settingsOptions[1]}' class='dropdown-item'>${settingsOptions[1].toUpperCase()}</a>
              </div>
            </div>
          </div> 
          </div>   
  `;
};

window.weatherReport.components.dropdownSelectionEvents = (localStorageKey) => {
  const settingType = localStorageKey.includes('temp') ? 'temp' : 'speed';
  document.querySelectorAll(`[id^=${settingType}-selection]`).forEach((selection) => {
    selection.addEventListener('click', (event) => {
      const value = selection.innerHTML;
      localStorage.setItem(localStorageKey, value.toLowerCase());
      document.querySelector(`#selected-unit-${settingType}`).innerHTML = localStorage.getItem(localStorageKey).toUpperCase();
    });
  });
};

window.weatherReport.components.handleDropdowns = () => {
  // toggle dropdowns
  document.querySelectorAll('.dropdown').forEach((dropdown) =>
    dropdown.addEventListener('click', (event) => {
      dropdown.classList.toggle('is-active');
    }),
  );

  // document.addEventListener('click', e => {
  //   if (!element.contains(e.target)) callback();
  // });
};
