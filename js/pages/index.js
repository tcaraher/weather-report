document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')

  const rightNowCard = (city,currentHour,dailyData,hourlyData) => {
    // below call was originally in John's tutorial. Why? TODO take out?
    // const indexOfCurrentHour = hourlyData.hourly.time.indexOf(`TodayT${currentHour}:00`);
    const weatherCodeData = weatherReport.weatherCodes[hourlyData.hourly.weather_code[currentHour]].day

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
            Temperature: ${hourlyData.hourly.temperature_2m[currentHour] + dailyData.daily_units.apparent_temperature_min}
          </p>
          <p class="content is-size-4">
            Wind Speed: ${hourlyData.hourly.temperature_2m[currentHour] + ' km/h'}
          </p>
        </article>
      </section>
      </div>
    `
  }

  const getDaysOfWeekDailySummaries = (city,currentDay,daysOfTheWeek) => {
    const dataFields = {[city]: {"daily": {"Low": "temperature_2m_min", "High": "temperature_2m_max"}}}
    let cardContainer
      = ""
    // Passes in day index for weather data into the card component, along with the day of the week itself from array
    for (let dayOfTheWeekIndex = 0; dayOfTheWeekIndex < daysOfTheWeek.length; dayOfTheWeekIndex ++){
      let currentDayModDaysOfWeek = (dayOfTheWeekIndex+currentDay)%daysOfTheWeek.length
      let dayOfTheWeek
      if (dayOfTheWeekIndex === 0) {
        dayOfTheWeek = "Today"
      } else {
        dayOfTheWeek = daysOfTheWeek[currentDayModDaysOfWeek]
      }
      cardContainer += weatherReport.components.weatherCard(dataFields,dayOfTheWeekIndex,dayOfTheWeek)
  }
    return cardContainer
  }

  const cityFocus = () => {
    const city = "amsterdam"
    const now = dayjs()
    const currentHour = now.hour()
    const currentDay = now.day()
    const dailyData = weatherReport.weatherData[city + "_daily"]
    const hourlyData = weatherReport.weatherData[city + "_hourly"]
    const daysOfTheWeek = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"]

    return `
    <h1 class="title is-size-1 has-text-white has-text-centered">
    ${city.toUpperCase()}
    </h1>
    <section class="columns mx-6 is-vcentered">
    <div class="column has-text-justified">   
    <h2 class="has-text-white is-size-4 " >
    Max Temperature: ${dailyData.daily.wind_speed_10m_max[0] + ' km/h'}
    </h2>
    <h2 class="has-text-white is-size-4" >
    Max Wind Speed: ${dailyData.daily.wind_speed_10m_max[0] + ' °C'}
    </h2>
    </div>
    
    ${rightNowCard(city, currentHour, dailyData, hourlyData)}
    </section>
    <div class="columns">
    ${getDaysOfWeekDailySummaries(city, currentDay, daysOfTheWeek)}
    </div>
<!--    </div>-->
    `
  }

  main.innerHTML = main.innerHTML + cityFocus()

})