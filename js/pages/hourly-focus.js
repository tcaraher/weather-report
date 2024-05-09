// Hourly focus page. Displays each hour with relevent hourly data
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');

  // function to display the hourly summaries
  const hourlySummaries = (city, currentDayIndex, requestedDayFromURL, currentHour) => {
    // Object defining the data I would like to display in each card
    const hourlySummaryData = {
      [city]: {
        hourly: {
          Temperature: 'temperature_2m',
          'Wind Speed': 'wind_speed_10m',
        },
      },
    };

    // More defined query for weather data
    const hourlyDataQuery = weatherReport.weatherData[city + '_hourly'].hourly.time;

    // Builds a new days of the week array, starting from the current day. This is a much nicer version of what is in the city component. I need less specific variables here, just the array
    const newDaysOfTheWeek = [];
    for (let i = currentDayIndex; i < currentDayIndex + 7; i++) {
      newDaysOfTheWeek.push(weatherReport.constants.daysOfTheWeek[i % 7]);
    }

    // sets the day to query in the data to the index of the requested day from the new week array.
    const dayToQuery = newDaysOfTheWeek.indexOf(requestedDayFromURL);
    const requestedDayIndex = weatherReport.constants.daysOfTheWeek.indexOf(requestedDayFromURL)

    // initialized the card container string for html
    let cardContainer = '';

    let getHourlyIndexFromData;
    let hour
    if (currentDayIndex === requestedDayIndex) {
      hour = currentHour
    } else {
      hour = 0
    }
    while (hour < 24) {
      //Had an issue with the first numbers 0-9 being formatted with two digits. I wanted a nice way to fix this -  https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers
      hour = hour.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      // Formats the query for the data correctly, as the hourly data for the first 24 hours has no +num part of the string
      if (dayToQuery === 0) {
        getHourlyIndexFromData = hourlyDataQuery.indexOf(`TodayT${hour}:00`);
      } else {
        getHourlyIndexFromData = hourlyDataQuery.indexOf(`Today+${dayToQuery}T${hour}:00`);
      }
      const displayHour = `${hour}:00`;
      hour++;

      cardContainer += weatherReport.components.weatherCard(hourlySummaryData, getHourlyIndexFromData, displayHour);
    }
    return cardContainer;
  };

  const hourlyFocus = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const now = dayjs();
    const currentHour = now.hour();
    const currentDay = now.day();

    // sets the city and day to default unless has a parameter set.
    const city = urlParams.has('city') ? urlParams.get('city') : localStorage.getItem(weatherReport.settings.homeCity.localStorageKey);
    const dayOfTheWeekFromURL = urlParams.has('day') ? urlParams.get('day') : weatherReport.constants.daysOfTheWeek[currentDay];
    const dayOfTheWeekIndex = weatherReport.constants.daysOfTheWeek.indexOf(dayOfTheWeekFromURL)


    return `
    <h1 class="column title is-size-1 has-text-centered">
      ${weatherReport.utilities.cityStripper(city)} | ${dayOfTheWeekIndex === currentDay ? "TODAY" :
      dayOfTheWeekFromURL.toUpperCase()}
    </h1>
    <h2 class=" is-size-1 has-text-centered">
      Hourly Summary
    </h2>
    <section class="grid is-col-min-9 m-6 is-vcentered">
      ${hourlySummaries(city, currentDay, dayOfTheWeekFromURL, currentHour)}
    </section>
    `;
  };

  main.innerHTML = main.innerHTML + hourlyFocus();
});
