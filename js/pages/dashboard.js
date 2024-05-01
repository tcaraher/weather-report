document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')

  // Iterates over each key in the weather data key value pairs just for the daily weather (I don't need it to do it twice for each city) Then takes _daily out so i'm just left with the city name

  const summaryCards = () => {
    let cards = ""
    Object.keys(weatherReport.weatherData).forEach(city => {
      if (city.includes("_daily")) {
        cards += weatherReport.components.summaryCard(city.replace("_daily", ""))
      }
    });
    return cards;
  }

  const Dashboard = () => {
    return `
    <div class="grid is-col-min-11">
    ${summaryCards()}
    </div>
    `
  }
  main.innerHTML += Dashboard();
})