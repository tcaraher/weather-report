document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')

  const rightNowCard = (city) => {
    const now = dayjs()
    const currentHour = now.hour()
    const dailyData = weatherReport.weatherData[city + "_daily"]
    const hourlyData = weatherReport.weatherData[city + "_hourly"]

    const indexOfCurrentHour = hourlyData.hourly.time.indexOf(`TodayT${currentHour}:00`);

    const weatherCodeData = weatherReport.weatherCodes[hourlyData.hourly.weather_code[indexOfCurrentHour]].day

    return `
     <div class="column is-4">
      <section class="card has-text-centered">
        <header class="card-header">
          <p class="card-header-title is-size-4 is-centered">
<!--          Strips out daily, hourly, and underscores, makes cities all caps. TODO move to utility function-->
            ${(city.replace('_daily', '')).replace('_', ' ').toUpperCase()}
          </p>
        </header>
        <p class="card-header-subtitle is-size-2 is-centered">Right Now!</p>
        <div class="card-image">
          <!--        Gets weather code image from weather code object--> 
              <img src="${weatherCodeData.image}"/>
        </div>
        <article class="card-content">
                <p class="content is-size-3">
<!--        Gets weather code description from weather code object-->
              ${weatherCodeData.description}
        </p>
        <p class="content is-size-4">
            Temperature: ${hourlyData.hourly.temperature_2m[indexOfCurrentHour] + dailyData.daily_units.apparent_temperature_min}
          </p>
          <p class="content is-size-4">
            Wind Speed: ${hourlyData.hourly.temperature_2m[indexOfCurrentHour] + ' km/h'}
          </p>
        </article>
      </section>
    `
  }

  main.innerHTML = main.innerHTML + rightNowCard("amsterdam")

  // dotify.dataStore.list().forEach((playlist) => {
  //   main.innerHTML = main.innerHTML + dotify.components.createPlaylistItem(playlist);
  // });
})