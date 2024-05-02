document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')

  // Iterates over each key in the weather data key value pairs just for the daily weather (I don't need it to do it twice for each city) Then takes _daily out so i'm just left with the city name

  const summaryCards = () => {
    let cards = ''
    Object.keys(weatherReport.weatherData).forEach(cityQuery => {
      if (cityQuery.includes('_daily')) {
        const city = cityQuery.replace('_daily', '')
        const dashboardCardData = {
          [city]: {
            'daily': {
              'Low': 'temperature_2m_min',
              'High': 'temperature_2m_max'
            }
          }
        }
        cards += weatherReport.components.weatherCard(dashboardCardData, 0, city)
      }
    })
    return cards
  }

  const Dashboard = () => {
    return `
    <div class="grid is-col-min-11">
    ${summaryCards()}
    </div>
    `
  }
  main.innerHTML += Dashboard()
})