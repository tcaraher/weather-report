window.weatherReport.components.daySummaryCard = (city,dayOfTheWeekIndex, daysOfTheWeek) => {



  // don't need hourly data for this summary
  const dailyData = weatherReport.weatherData[city + "_daily"]

  // Move below to utility, getWeatherCodeData for example. I use it often enough
  const weatherCodeData = weatherReport.weatherCodes[dailyData.daily.weather_code[dayOfTheWeekIndex]].day

  return `
     <div class="column">
      <section class="card has-text-centered">
        <header class="card-header">
          <p class="card-header-title is-size-4 is-centered">
<!--          Strips out daily, hourly, and underscores, makes cities all caps. TODO move to utility function-->
            ${daysOfTheWeek}
          </p>
        </header>
        <div class="card-image">
          <!--        Gets weather code image from weather code object-->
              <img src="${weatherCodeData.image}"/>
        </div>
        <article class="card-content">
        <p class="content">
<!--        Gets weather code description from weather code object-->
              ${weatherCodeData.description}
        </p>
        <p class="content">
            Low: ${dailyData.daily.temperature_2m_min[dayOfTheWeekIndex] + dailyData.daily_units.apparent_temperature_min}
          </p>
          <p class="content">
            High: ${dailyData.daily.temperature_2m_max[dayOfTheWeekIndex] + dailyData.daily_units.apparent_temperature_max}
          </p>
        </article>
      </section>
      </div>
    `
}


window.weatherReport.components.summaryCard = (city) => {
  // using just todays weather for the city/dashboard TODO make this DRY
  const dayOfTheWeekIndex = 0
  // don't need hourly data for this summary
  const dailyData = weatherReport.weatherData[city + "_daily"]

  // Move below to utility, getWeatherCodeData for example. I use it often enough
  const weatherCodeData = weatherReport.weatherCodes[dailyData.daily.weather_code[0]].day

  return `
     <div class="cell">
      <section class="card has-text-centered">
        <header class="card-header">
          <p class="card-header-title is-size-5 is-centered">
<!--          Strips out daily, hourly, and underscores, makes cities all caps. TODO move to utility function-->
            ${(city.replace("_daily", "")).replace("_", " ").toUpperCase()}
          </p>
        </header>
        <div class="card-image">
          <!--        Gets weather code image from weather code object-->
              <img src="${weatherCodeData.image}"/>
        </div>
        <article class="card-content">
        <p class="content">
<!--        Gets weather code description from weather code object-->
              ${weatherCodeData.description}
        </p>
        <p class="content">
            Low: ${dailyData.daily.temperature_2m_min[0] + dailyData.daily_units.apparent_temperature_min}
          </p>
          <p class="content">
            High: ${dailyData.daily.temperature_2m_max[0] + dailyData.daily_units.apparent_temperature_max}
          </p>
        </article>
      </section>
      </div>
    `
}