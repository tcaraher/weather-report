// Generic component for weatherCard. Takes in either hourly or daily data, the weather code data, which day of the week,
// and a card title, which needs to be set up before calling the function depending
// Also takes an object outlining the desired data fields to be displayed on the card.
// Needs to be key value format with daily and or hourly key, then the title of each field to be displayed along with its relevant field name
window.weatherReport.components.weatherCard = (dataFields, fieldIndex, cardTitle , Link, cardSize) => {
  const city = Object.keys(dataFields)[0]
  // const seeMoreLink = cardTitle
  let weatherCodeData
  let dataType
  let query

  // if data query needs to be hourly or daily data (this function only supports one type)
  if (dataFields[city].daily) {
    dataType = 'daily'
    query = weatherReport.weatherData[city + `_${dataType}`][dataType]
    weatherCodeData = weatherReport.weatherCodes[query.weather_code[fieldIndex]].day
  } else if (dataFields[city].hourly) {
    dataType = 'hourly'
    query = weatherReport.weatherData[city + `_${dataType}`][dataType]
    // console.log(weatherReport.weatherCodes[query.weather_code[fieldIndex]])
    weatherCodeData = weatherReport.weatherCodes[query.weather_code[fieldIndex]].day
  }

  const drawDataFields = (dataFields) => {
    let dataElement = ''
    Object.entries(dataFields[city][dataType]).forEach(([key, value]) => {
      dataElement += `
        <p class="content">${key + ': ' + query[value][fieldIndex]}</p>
        `
    })
    return dataElement
  }

  return `
     <div class="column">
      <section class="card has-text-centered">
        <header class="card-header">
          <p class="card-header-title is-size-4 is-centered">
            ${cardTitle.replace('_', ' ').toUpperCase()}
          </p>

        </header>
          ${Link ? `<a class="button" href=${Link}>See More!</a>` : ""}
        <div class="card-image">
          <!--        Gets weather code image from weather code object-->
              <img src="${dataFields[city].daily ? weatherCodeData.image : weatherCodeData.image}"/>
        </div>
        <article class="card-content">
        <p class="content">
<!--        Gets weather code description from weather code object-->
              ${dataFields[city].daily ? weatherCodeData.description : weatherCodeData.description}
        </p>
        ${drawDataFields(dataFields)}
        </article>
      </section>
      </div>
    `
}