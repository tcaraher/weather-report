// Generic component for weatherCard. Takes in either hourly or daily data, the requested day of the week or hour to query,
// and a card title and link.
// Also takes an object outlining the desired data fields to be displayed on the card.
// Needs to be key value format with daily and or hourly key, then the title of each field to be displayed along with its relevant field name
window.weatherReport.components.weatherCard = (dataFields, fieldIndex, cardTitle, Link) => {
  const city = Object.keys(dataFields)[0];
  let weatherCodeData;
  let dataType;
  let cityNameForData;
  let query;

  // if data query needs to be hourly or daily data (this function only supports one type)
  if (dataFields[city].daily) {
    dataType = 'daily';
    cityNameForData = city + `_${dataType}`;
    query = weatherReport.weatherData[cityNameForData][dataType];
    weatherCodeData = weatherReport.weatherCodes[query.weather_code[fieldIndex]].day;
  } else if (dataFields[city].hourly) {
    dataType = 'hourly';
    cityNameForData = city + `_${dataType}`;
    query = weatherReport.weatherData[cityNameForData][dataType];
    // console.log(weatherReport.weatherCodes[query.weather_code[fieldIndex]])
    weatherCodeData = weatherReport.weatherCodes[query.weather_code[fieldIndex]].day;
  }

  const drawDataFields = (dataFields) => {
    let dataElement = '';
    Object.entries(dataFields[city][dataType]).forEach(([key, value]) => {
      dataElement += `
        <p class="content">${key + ': ' + weatherReport.utilities.getValue(cityNameForData, query[value][fieldIndex], value)} </p>
        `;
    });
    return dataElement;
  };

  return `
     <div class="column">
       <section class="card has-text-centered">
         <header class="card-header">
           <p class="card-header-title is-size-4 is-centered">
             ${weatherReport.utilities.cityStripper(cardTitle)}
           </p>
         </header>
         ${Link ? `<a class="button mt-4" href=${Link}>See More!</a>` : ''}
         <div class="card-image">
           <!--        Gets weather code image from weather code object-->
           <img src="${dataFields[city].daily ? weatherCodeData.image : weatherCodeData.image}" />
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
    `;
};
