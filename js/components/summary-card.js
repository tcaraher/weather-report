window.weatherReport.components.summaryCard = (city,dayOfTheWeek) => {
  const cityData = weatherReport.weatherData[city]

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
        </div>
        <article class="card-content">
        <p class="content is-size-4">
            Low: ${cityData.daily.temperature_2m_min[0] + cityData.daily_units.apparent_temperature_min}
          </p>
          <p class="content is-size-4">
            High: ${cityData.daily.temperature_2m_max[0] + cityData.daily_units.apparent_temperature_max}
          </p>
        </article>
      </section>
    `
}
