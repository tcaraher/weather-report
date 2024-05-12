// Settings picker component for each setting. Takes in the setting object defined in settingsObj.js,
// which can take any key and options - the logic would need to be implemented though
export const settingsPicker = (settingObj) => {
  const localStorageKey = settingObj.localStorageKey;
  const title = settingObj.titleUI;
  const settingsOptions = settingObj.selectionItems();

  // checks the key in local storage
  let settingsValueFromStorage;
  if (localStorage.getItem(localStorageKey) === null) {
    settingsValueFromStorage = title;
  } else {
    settingsValueFromStorage = weatherReport.utilities.uiFriendlyString(localStorage.getItem(localStorageKey));
  }

  // displays each selection item based on array passed in to the settings-obj.js object
  const displaySelectionItems = () => {
    let elements = '';
    settingsOptions.forEach((settingItem) => {
      elements += `
        <a id='selection-${localStorageKey}-${settingItem}' class='dropdown-item'>
            ${weatherReport.utilities.uiFriendlyString(settingItem)}
        </a>
      `;
    });
    return elements;
  };

  // careful consideration here passing in the correct variables to line up with the event listeners below
  return `
    <div class='columns card-content'>
      <p class='mt-1 mx-4 is-size-5'>${title}:</p>
      <div class='dropdown'>
        <div class='dropdown-trigger'>
          <button class='button' aria-haspopup='true' aria-controls='dropdown-menu3'>
            <span id='selected-setting-${localStorageKey}'>${settingsValueFromStorage}</span>
            <span class='icon is-small'>
              <i class='fas fa-angle-down' aria-hidden='true'></i>
            </span>
          </button>
        </div>
        <div class='dropdown-menu' id='dropdown-menu3' role='menu'>
          <div class='dropdown-content'>
            ${displaySelectionItems()}
          </div>
        </div>
      </div>
    </div> 
    `;
};

// Events and local storage logic for component. Checks if it needs to be able add url params - this is used in the dropdown in city focus, not in the settingsObj panel. Also needs the storage key
export const settingsPickerEventListener = (returnURL, localStorageKey) => {
  // Finds all elements with an id that includes the key and adds a click listener.
  document.querySelectorAll(`[id^=selection-${localStorageKey}]`).forEach((selection) => {
    selection.addEventListener('click', () => {
      // gets the value to be passed in to local storage
      const settingValue = selection.id.replace(`selection-${localStorageKey}-`, '');
      localStorage.setItem(localStorageKey, settingValue);

      // Displays the friendly version of the city if selected in the dropdown
      document.querySelector(`#selected-setting-${localStorageKey}`).innerHTML = weatherReport.utilities.uiFriendlyString(settingValue);

      // sends user to the new default city if true is passed into function call. Used on home screen/city focus page to refresh page after default city update, not on settingsObj page
      if (returnURL) {
        document.getElementById(`selection-${localStorageKey}-${settingValue}`).setAttribute('href', `/city-focus/?city=${settingValue}`);
      }
    });
  });
};
