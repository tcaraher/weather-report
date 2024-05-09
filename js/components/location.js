window.weatherReport.components.displayLocationUI = () => {
  return `
    <button id='location-button' class='button'>Get Location!</button>
    <p id='loading-message' style='visibility: hidden' class='is-size-5'>Getting Location...</p>
    <p id='got-location-message' class='is-size-5'></p>
    <button id='set-found-location-button' style='visibility: hidden' class='button'></button>
    <p id='location-error' style='visibility: hidden' class='is-size-5 is-color-attention'>Location access
      denied!</p>
  `
}

const getAndSetNearestCity = async () => {
  document.getElementById('location-error').style.visibility = 'hidden'

  function getDistance (lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    } else {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") { dist = dist * 1.609344 }
      if (unit == "N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  const handleLocationError = () =>{
    const locationErrorElement = document.getElementById('location-error')
    locationErrorElement.style.visibility = 'visible'
  }

// https://stackoverflow.com/questions/51843227/how-to-use-async-wait-with-html5-geolocation-api
  const getUserCoordinates = async () => {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
    return {
      long: position.coords.longitude,
      lat: position.coords.latitude,
    };
  };
  document.getElementById('loading-message').style.visibility = 'visible'

  const userCoordinates = await getUserCoordinates().catch(handleLocationError);
  document.getElementById('loading-message').style.visibility = 'hidden'
  const cityList = weatherReport.utilities.listCities()
  const getDistancesFromUser = cityList.map((city) => {
    const cityQuery = city + '_daily'
    const cityLat = weatherReport.weatherData[cityQuery].latitude
    const cityLong = weatherReport.weatherData[cityQuery].longitude
    return getDistance(userCoordinates.lat,userCoordinates.long,cityLat,cityLong,'K')
  })
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
  const nearestCityDistance = Math.min(...getDistancesFromUser)
  const nearestCityIndex = getDistancesFromUser.indexOf(nearestCityDistance)
  const closestCity = cityList[nearestCityIndex]

  // Elements and set it event listener
  const gotLocationMessage = document.getElementById('got-location-message')
  const setItButton = document.getElementById('set-found-location-button')
  gotLocationMessage.innerHTML = `You're nearest city is: ${weatherReport.utilities.cityStripper(closestCity)}!`
  setItButton.innerHTML = 'Set It As Default!'
  setItButton.style.visibility = 'visible'

  setItButton.addEventListener('click', () => {
    localStorage.setItem(weatherReport.settings.homeCity.localStorageKey, closestCity)
    location.reload()
  })
}

window.weatherReport.components.runGetAndSetNearestCity = () => {
// Get Location button and run functions
  const getLocationButton = document.getElementById('location-button')
  getLocationButton.addEventListener('click', () => {getAndSetNearestCity()});
}