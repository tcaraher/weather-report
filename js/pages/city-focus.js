document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  const cityFocus = () => {
    const getDaysOfWeekDailySummaries = (city, currentDay, daysOfTheWeek) => {
      const weekCardData = {
        [city]: {
          daily: { Low: "temperature_2m_min", High: "temperature_2m_max" },
        },
      };
      let cardContainer = "";
      // Passes in day index for weather data into the card component, along with the day of the week itself from array
      for (
        let dayOfTheWeekIndex = 0;
        dayOfTheWeekIndex < daysOfTheWeek.length;
        dayOfTheWeekIndex++
      ) {
        let currentDayModDaysOfWeek =
          (dayOfTheWeekIndex + currentDay) % daysOfTheWeek.length;
        let dayOfTheWeek;
        if (dayOfTheWeekIndex === 0) {
          dayOfTheWeek = "Today";
        } else {
          dayOfTheWeek = daysOfTheWeek[currentDayModDaysOfWeek];
        }
        // hold the city and day(without the 'today' condition, so the actual weekday, to be passed in to the weathercard
        const cardLinkTo = `/hourly-view/?city=${city}&day=${daysOfTheWeek[currentDayModDaysOfWeek]}`;
        cardContainer += weatherReport.components.weatherCard(
          weekCardData,
          dayOfTheWeekIndex,
          dayOfTheWeek,
          cardLinkTo,
        );
      }
      return cardContainer;
    };
    const todaysWeather = (city, dailyData) => {
      let todaysTable = `
      <p class="has-text-white is-size-6">
        Max Temperature: ${dailyData.daily.temperature_2m_max[0] + " °C"}
      </p>
      <p class="has-text-white is-size-6">
        Min Temperature: ${dailyData.daily.temperature_2m_min[0] + " °C"}
      </p>
      <p class="has-text-white is-size-6">
        Chance of Rain: ${dailyData.daily.precipitation_probability_max[0] + "%"}
      </p>
      <p class="has-text-white is-size-6">
        Max Wind Speed: ${dailyData.daily.wind_speed_10m_max[0] + " km/h"}
      </p>
`;
      return todaysTable;
    };


    let homeCity;
    if (localStorage.getItem('default-city') === null) {
      homeCity = 'waterford';
    } else {
      homeCity = localStorage.getItem('default-city');
    }

    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.has("city") ? urlParams.get("city") : homeCity;
    const now = dayjs();
    const currentHour = now.hour();
    const currentDay = now.day();
    const dailyData = weatherReport.weatherData[city + "_daily"];
    const hourlyData = weatherReport.weatherData[city + "_hourly"];
    const weatherCodeQuery = weatherReport.weatherCodes[weatherReport.weatherData[city + `_daily`].daily.weather_code[0]]
    const daysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const rightNowData = {
      [city]: {
        hourly: {
          "Current Temperature": "temperature_2m",
          "Wind Speed": "wind_speed_10m",
        },
      },
    };
    // const todaysTableData = {'Min Temp: ' : 'temperature_2m_min','Max Temp:' : 'temperature_2m_max',  : }
    return `
    <section class="columns mx-6 is-vcentered">
      <h1 class="column title is-size-1 has-text-white has-text-centered">
        ${city.replace("_", " ").toUpperCase()}
      </h1>
      <div class="column has-text-justified">
        <figure class="image is-128x128 container">
          <img src="${weatherCodeQuery.day.image}" />
        </figure>
        <p class="has-text-centered is-size-3">
          ${weatherCodeQuery.day.description}
        </p>
      </div>
      <div class="column has-text-justified">
        <h2 class="has-text-white is-size-3">
          Daily Summary
        </h2>
        <p class="has-text-white is-size-6">
          Max Temperature: ${dailyData.daily.temperature_2m_max[0] + " °C"}
        </p>
        <p class="has-text-white is-size-6">
          Min Temperature: ${dailyData.daily.temperature_2m_min[0] + " °C"}
        </p>
        <p class="has-text-white is-size-6">
          Chance of Rain: ${dailyData.daily.precipitation_probability_max[0] + "%"}
        </p>
        <p class="has-text-white is-size-6">
          Max Wind Speed: ${dailyData.daily.wind_speed_10m_max[0] + " km/h"}
        </p>
      </div>
      ${window.weatherReport.components.weatherCard(rightNowData, currentHour, "Right Now!")}
    </section>
    <div class="columns">
      ${getDaysOfWeekDailySummaries(city, currentDay, daysOfTheWeek)}
    </div>
    `;
  };

  main.innerHTML = main.innerHTML + cityFocus();
});
