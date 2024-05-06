window.weatherReport.components.cityPicker = (defaultPicker) => {
  let homeCity;
  if (localStorage.getItem('default-city') === null) {
    homeCity = 'Set Home City';
  } else {
    homeCity = localStorage.getItem('default-city').replace('_', ' ').toUpperCase();
  }
  const defaultCityList = () => {
    let cityList = '';
    // TODO underscore and uppercase
    Object.keys(weatherReport.weatherData).forEach((cityQuery) => {
      // iterates only over the daily object, as i'm just going through each city here. Stripping out the `_daily as well as I want just the city name
      if (cityQuery.includes('_daily')) {
        const city = cityQuery.replace('_daily', '');
        cityList += `
        <a id="city-selection-${city}" class="dropdown-item">
            ${city.replace('_', ' ').toUpperCase()}
        </a>
      `;
      }
    });
    return cityList;
  };

  return `
<div class='columns card-content'> <p class='mt-1 mx-4 is-size-5'>Select Default City:</p>       <div class="dropdown">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
              <span id='select'>${homeCity}</span>
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
        </div>  </div>    
    
    `;
};

window.weatherReport.components.cityPickerEvents = (returnURL) => {
  // Default city event listeners
  document.querySelectorAll('[id^=city-selection]').forEach((selection) => {
    selection.addEventListener('click', (event) => {
      const cityName = selection.id.replace('city-selection-', '');
      localStorage.setItem('default-city', cityName);
      document.querySelector('#select').innerHTML = cityName.replace('_', ' ').toUpperCase();
      // sends user to the new default city if true is passed into function call. Used on home screen/city focus page to refresh page after default city update, not on settings page
      if (returnURL) {
        document.getElementById(`city-selection-${cityName}`).setAttribute("href", `/city-focus/?city=${cityName}`)
      }
    });
  });

  // toggle dropdown
  const dropdown = document.querySelector('.dropdown');
  dropdown.addEventListener('click', (event) => {
    dropdown.classList.toggle('is-active');
  });


};
