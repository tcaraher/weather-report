document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')

  main.innerHTML = `
    <body>
        <p>The time is <span id="time"></span></p>
        <p>The weather code is <span id="weatherCode"></span></p>
    </body>`

  const currentCity = 'amsterdam'
  const currentCityData = weatherData[currentCity + '_daily']
  const time = document.getElementById('time')
  const weatherCode = document.getElementById('weatherCode')

  time.innerHTML = currentCityData.daily.time[0]
  weatherCode.innerHTML = currentCityData.daily.weather_code[0]

  // dotify.dataStore.list().forEach((playlist) => {
  //   main.innerHTML = main.innerHTML + dotify.components.createPlaylistItem(playlist);
  // });
})