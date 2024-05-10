// Component that just returns the html for the location buttons and info etc..
window.weatherReport.components.displayLocationUI = () => {
  return `
    <button id='location-button' class='button'>Get Location!</button>
    <p id='loading-message' style='visibility: hidden' class='is-size-5'>Getting Location...</p>
    <p id='got-location-message' style='visibility: hidden' class='is-size-5'>Location to be displayed</p>
    <button id='set-found-location-button' style='visibility: hidden' class='button'></button>
    <p id='location-error' style='visibility: hidden' class='is-size-5 is-color-attention'>Location access
      denied!</p>
  `;
};

// async function to get and set the nearest city. Does not need to be added to namespace as there is effectively an 'init' function following this available
const getAndSetNearestCity = async () => {

  // ----- Defining necessary functions ----

  // This function was brought in from https://www.geodatasource.com/developers/javascript. I would not have been able to write this, although I think I get the gist.
  // It gets the distance between the latitude and longitude of each location
  function getDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      if (unit == 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  // options to pass in to the getCurrentPosition function from the geolocation api
  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  // Handles if the promise from the geolocation function, getUserCoordinates is rejected
  const handleLocationError = () => {
    const locationErrorElement = document.getElementById('location-error');
    locationErrorElement.style.visibility = 'visible';
  };

  /*
  I needed some help applying async await to the getCurrentPosition function - https://stackoverflow.com/questions/51843227/how-to-use-async-wait-with-html5-geolocation-api
  
  But it is an async function that awaits the result of the getCurrentPosition function from the api. The Promise just returns the position. 
  If it is rejected I have a .catch when it is called to run my error function, as that will still catch the rejection. I found this syntax for intuitive then any alternatives I researched.
  */
  const getUserCoordinates = async () => {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
    return {
      long: position.coords.longitude,
      lat: position.coords.latitude,
    };
  };

  // ------- End Function declarations --------

  // resets the error display to hidden if the user tries again
  document.getElementById('location-error').style.visibility = 'hidden';

  // Run the await function with loading-messages
  // displays a loading message just before the userCoordinates runs the getUserCoordinates await function
  document.getElementById('loading-message').style.visibility = 'visible';
  // awaits getUserCoordinates. I needed more info on async await and error handling. this catch method i found intuitive - https://wesbos.com/12-advanced-flow-control/71-async-await-error-handling
  const userCoordinates = await getUserCoordinates().catch(handleLocationError);
  // hides the loading message
  document.getElementById('loading-message').style.visibility = 'hidden';

  // gets the city list from util function
  const cityList = weatherReport.utilities.listCities();
  // Returns a .map of the the distances from user by running the getDistance function
  const getDistancesFromUser = cityList.map((city) => {
    const cityQuery = city + '_daily';
    const cityLat = weatherReport.weatherData[cityQuery].latitude;
    const cityLong = weatherReport.weatherData[cityQuery].longitude;
    return getDistance(userCoordinates.lat, userCoordinates.long, cityLat, cityLong, 'K');
  });
  //  Gets the lowest value in the returned array. Need spread operator here.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
  const nearestCityDistance = Math.min(...getDistancesFromUser);
  // checks the index of the nearest city's distance against the above .map. The index will be the same as the order of the city list
  const nearestCityIndex = getDistancesFromUser.indexOf(nearestCityDistance);
  const closestCity = cityList[nearestCityIndex];

  // Elements and setIt event listeners
  const gotLocationMessage = document.getElementById('got-location-message');
  const setItButton = document.getElementById('set-found-location-button');
  gotLocationMessage.innerHTML = `You're nearest city is: ${weatherReport.utilities.cityStripper(closestCity)}!`;
  gotLocationMessage.style.visibility = 'visible';
  setItButton.innerHTML = 'Set It As Default!';
  setItButton.style.visibility = 'visible';

  setItButton.addEventListener('click', () => {
    localStorage.setItem(weatherReport.settings.homeCity.localStorageKey, closestCity);
    location.reload();
  });
};

// The init function for the logic essentially. Get Location button and run functions
window.weatherReport.components.runGetAndSetNearestCity = () => {

  const getLocationButton = document.getElementById('location-button');
  getLocationButton.addEventListener('click', () => {
    getAndSetNearestCity();
  });
};
