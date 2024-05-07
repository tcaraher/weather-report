window.weatherReport.components.settingsPicker = (localStorageKey, title, settingsList) => {
  let settingsValueFromStorage;
  if (localStorage.getItem(localStorageKey) === null) {
    settingsValueFromStorage = title;
  } else {
    settingsValueFromStorage = weatherReport.utilities.cityStripper(localStorage.getItem(localStorageKey));
  }

  const displaySelectionItems = () => {
    let elements = ""
    settingsList.forEach(settingItem => {
      elements += `
        <a id="selection-${localStorageKey}-${settingItem}" class="dropdown-item">
            ${weatherReport.utilities.cityStripper(settingItem)}
        </a>
      `
    });
    return elements;
  };


  return `
<div class='columns card-content'>
  <p class='mt-1 mx-4 is-size-5'>${title}:</p>
  <div class="dropdown">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
        <span id='selected-setting-${localStorageKey}'>${settingsValueFromStorage}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu3" role="menu">
      <div class="dropdown-content">
      ${displaySelectionItems()}
      </div>
    </div>
  </div>
</div>   
    `

    ;
};

window.weatherReport.components.settingsPickerEventListener = (returnURL, localStorageKey) => {
  // Default city event listeners
  document.querySelectorAll(`[id^=selection-${localStorageKey}]`).forEach((selection) => {
    selection.addEventListener('click', (event) => {
      const settingValue = selection.id.replace(`selection-${localStorageKey}-`, '');
      localStorage.setItem(localStorageKey, settingValue);
      document.querySelector(`#selected-setting-${localStorageKey}`).innerHTML = weatherReport.utilities.cityStripper(settingValue);
      // sends user to the new default city if true is passed into function call. Used on home screen/city focus page to refresh page after default city update, not on settings page
      if (returnURL) {
        document.getElementById(`selection-${localStorageKey}-${settingValue}`).setAttribute('href', `/city-focus/?city=${settingValue}`);
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
