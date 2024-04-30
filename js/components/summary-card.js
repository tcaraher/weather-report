window.weatherReport.components.summaryCard = (city,dayOfTheWeek) => {
  const cityData = weatherReport.weatherData[city]

  // Move below to utility, getWeatherCodeData for example. I use it often enough
  const weatherCodeData = weatherReport.weatherCodes[cityData.daily.weather_code[0]].day

  return `
     <div class="column is-4">
      <section class="card has-text-centered">
        <header class="card-header">
          <p class="card-header-title is-size-4 is-centered">
<!--          Strips out daily, hourly, and underscores, makes cities all caps. TODO move to utility function-->
            ${(city.replace("_daily", "")).replace("_", " ").toUpperCase()}
          </p>
        </header>
        <div class="card-image">
          <!--        Gets weather code image from weather code object-->
              <img src="${weatherCodeData.image}"/>
        </div>
        <article class="card-content">
        <p class="content is-size-3">
<!--        Gets weather code description from weather code object-->
              ${weatherCodeData.description}
        </p>
        <p class="content is-size-2">
            Low: ${cityData.daily.temperature_2m_min[0] + cityData.daily_units.apparent_temperature_min}
          </p>
          <p class="content is-size-2">
            High: ${cityData.daily.temperature_2m_max[0] + cityData.daily_units.apparent_temperature_max}
          </p>
        </article>
      </section>
    `
}
