// Generic component for weatherCard. Takes in either hourly or daily data, the weather code data, which day of the week,
// and a card title, which needs to be set up before calling the function depending
// Also takes an object outlining the desired data fields to be displayed on the card.
// Needs to be key value format with daily and or hourly key, then the title of each field to be displayed along with its relevant field name
window.weatherReport.components.weatherCard = (dataFields, fieldIndex, cardTitle ) => {
  const city = Object.keys(dataFields)[0]
  // don't need hourly data for this summary
  console.log(dataFields[city].daily)
  // Move below to utility, getWeatherCodeData for example. I use it often enough
  const dailyQuery = weatherReport.weatherData[city + "_daily"].daily;
  const hourlyQuery = weatherReport.weatherData[city + "_hourly"].hourly;
  const dailyWeatherCodeData = weatherReport.weatherCodes[dailyQuery.weather_code[fieldIndex]].day
  const hourlyWeatherCodeData = weatherReport.weatherCodes[hourlyQuery.weather_code[fieldIndex]].day

  const drawDataFields = (dataFields) => {
    let dataElement = ""
    // If card needs daily or hourly data :
    if (dataFields[city].daily) {
      Object.entries(dataFields[city].daily).forEach(([key, value])=> {
        let query = weatherReport.weatherData[city + ""]
        dataElement += `
        <p class="content">${key + ": " + dailyQuery[value][fieldIndex]}</p>
        `
      });
    }
    else if (dataFields[city].hourly) {
      Object.entries(dataFields[city].hourly).forEach(([key, value])=> {
        dataElement += `
        <p class="content">${key + ": " + hourlyQuery[value][fieldIndex]}</p>
        `
      });
    }
    return dataElement
  }

  return `
     <div class="column">
      <section class="card has-text-centered">
        <header class="card-header">
          <p class="card-header-title is-size-4 is-centered">
<!--          Strips out daily, hourly, and underscores, makes cities all caps. TODO move to utility function-->
            ${cardTitle}
          </p>
        </header>
        <div class="card-image">
          <!--        Gets weather code image from weather code object-->
              <img src="${dataFields[city].daily ? dailyWeatherCodeData.image : hourlyWeatherCodeData.image}"/>
        </div>
        <article class="card-content">
        <p class="content">
<!--        Gets weather code description from weather code object-->
              ${dataFields[city].daily ? dailyWeatherCodeData.description : hourlyWeatherCodeData.description}
        </p>
        ${drawDataFields(dataFields)}
       
        </article>
      </section>
      </div>
    `
}