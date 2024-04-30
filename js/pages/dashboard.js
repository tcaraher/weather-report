document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')

  // Iterates over each key in the weather data key value pairs just for the daily weather
  Object.keys(weatherReport.weatherData).forEach(city => {
    if (city.includes("_daily")) {
      main.innerHTML = main.innerHTML + weatherReport.components.summaryCard(city)
    }
  });

})