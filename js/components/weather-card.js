// Generic component for weatherCard. Takes in either hourly or daily data, the requested day of the week or hour to query, and a card title and link.
// Also takes an object outlining the desired data fields to be displayed on the card.
// Needs to be key value format with daily and or hourly key, then the title of each field to be displayed along with its relevant field name
window.weatherReport.components.weatherCard = (requestedDataFields, fieldIndex, cardTitle, Link) => {
  const city = Object.keys(requestedDataFields)[0];
  let weatherCodeDataQuery;
  let dataType;
  let cityNameForData;
  let query;

  // if data query needs to be hourly or daily data (this card only supports one type)
  if (requestedDataFields[city].daily) {
    dataType = 'daily';
  } else if (requestedDataFields[city].hourly) {
    dataType = 'hourly';
  }
  cityNameForData = city + `_${dataType}`;
  query = weatherReport.weatherData[cityNameForData][dataType];
  weatherCodeDataQuery = weatherReport.weatherCodes[query.weather_code[fieldIndex]].day;

  const drawDataFields = (requestedDataFields) => {
    let dataElement = '';
    Object.entries(requestedDataFields[city][dataType]).forEach(([dataField, dataVale]) => {
      dataElement += `
        <p class="content">${dataField + ': ' + weatherReport.utilities.getValue(cityNameForData, query[dataVale][fieldIndex], dataVale)} </p>
        `;
    });
    return dataElement;
  };

  return `
     <div class="is-centered column">
       <section class="card has-text-centered">
         <header class="card-header">
           <p class="card-header-title is-size-4 is-centered">
             ${weatherReport.utilities.cityStripper(cardTitle)}
           </p>
         </header>
         ${Link ? `<a class="button mt-4" href=${Link}>See More!</a>` : ''}
         <div class="card-image">
           <!--        Gets weather code image from weather code object-->
           <img src="${requestedDataFields[city].daily ? weatherCodeDataQuery.image : weatherCodeDataQuery.image}" />
         </div>
         <article class="card-content">
           <p class="content">
             <!--        Gets weather code description from weather code object-->
             ${requestedDataFields[city].daily ? weatherCodeDataQuery.description : weatherCodeDataQuery.description}
           </p>
           ${drawDataFields(requestedDataFields)}
         </article>
       </section>
     </div>
    `;
};
