document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');

  const hourlySummaries = (city, currentDayIndex, requestedDayFromURL, daysOfTheWeek) => {
    // Object defining the data I would like to display in each card
    const hourlySummaryData = {
      [city]: {
        hourly: {
          Temperature: 'temperature_2m',
          'Wind Speed': 'wind_speed_10m',
        },
      },
    };
    const hourlyDataQuery = window.weatherReport.weatherData[city + '_hourly'].hourly.time;

    // Builds a new days of the week array, starting from the current day.
    const newDaysOfTheWeek = []
    for (let i = currentDayIndex; i < currentDayIndex + 7; i++) {
      newDaysOfTheWeek.push(daysOfTheWeek[i % 7]); // Using modulo operator to wrap around if needed
    }
    // sets the day to query in the data to the index of the requested day from the new week array.
    const dayToQuery = newDaysOfTheWeek.indexOf(requestedDayFromURL)


    let cardContainer = '';
    let hour = 0;
    let getHourlyIndexFromData;
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

    // sets the city to default unless has a parameter set. Won't work long term
    const city = urlParams.has('city') ? urlParams.get('city') : 'amsterdam';
    const dayOfTheWeekFromURL = urlParams.has('day') ? urlParams.get('day') : 'Tuesday';
    const now = dayjs();
    const currentHour = now.hour();
    const currentDay = now.day();

    const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    return `
    <h1 class="column title is-size-1 has-text-centered">
      ${city.replace('_', ' ').toUpperCase()} | ${dayOfTheWeekFromURL.toUpperCase()}
    </h1>
    <h2 class=" is-size-1 has-text-centered">
      Hourly Summary
    </h2>
    <section class="grid is-col-min-9 m-6 is-vcentered">
      ${hourlySummaries(city, currentDay, dayOfTheWeekFromURL, daysOfTheWeek)}
    </section>
    `;
  };

  main.innerHTML = main.innerHTML + hourlyFocus();
});
