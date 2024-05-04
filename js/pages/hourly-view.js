document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  const hourlySummaries = (city, currentDay, requestedDay, daysOfTheWeek) => {
    const hourlySummaryData = {
      [city]: {
        hourly: {
          Temperature: "temperature_2m",
          "Wind Speed": "wind_speed_10m",
        },
      },
    };
    const hourlyDataQuery =
      window.weatherReport.weatherData[city + "_hourly"].hourly.time;
    const dayOfTheWeekI = daysOfTheWeek.indexOf(currentDay);
    let cardContainer = "";
    // Passes in day index for weather data into the card component, along with the day of the week itself from array

    let hour = 0;
    let startingDay = 0;
    let getHourlyIndexFromData;
    while (hour < 24) {
      // https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers
      hour = hour.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      // Sends different string if
      if (startingDay === 0) {
        getHourlyIndexFromData = hourlyDataQuery.indexOf(`TodayT${hour}:00`);
      } else {
        getHourlyIndexFromData = hourlyDataQuery.hourly.time.indexOf(
          `Today+${startingDay}T${hour}:00`,
        );
      }
      console.log(`Today+${dayOfTheWeekI}T${hour}:00`);

      const displayHour = `${hour}:00`;
      cardContainer += weatherReport.components.weatherCard(
        hourlySummaryData,
        getHourlyIndexFromData,
        displayHour,
      );
      hour++;
    }
    return cardContainer;
  };

  const hourlyFocus = () => {
    const urlParams = new URLSearchParams(window.location.search);

    // sets the city to default unless has a parameter set. Won't work long term
    const city = urlParams.has("city") ? urlParams.get("city") : "amsterdam";
    const dayOfTheWeekFromURL = urlParams.has("day")
      ? urlParams.get("day")
      : "Tuesday";
    const now = dayjs();
    const currentHour = now.hour();
    const currentDay = now.day();

    const daysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    return `
    <h1 class="column title is-size-1 has-text-white has-text-centered">
      ${city.replace("_", " ").toUpperCase()} | ${dayOfTheWeekFromURL.toUpperCase()}
    </h1>
    <h2 class="has-text-white is-size-1 has-text-centered">
      Hourly Summary
    </h2>
    <section class="grid m-6 is-vcentered">
      ${hourlySummaries(city, currentDay, dayOfTheWeekFromURL, daysOfTheWeek, false)}
    </section>
    <div class="columns">
    </div>
    `;
  };

  main.innerHTML = main.innerHTML + hourlyFocus();
});
