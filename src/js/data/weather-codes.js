const weatherCodeDesc = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Moderate Drizzle',
  55: 'Dense Drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Dense Freezing Drizzle',
  61: 'Light Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  66: 'Light Freezing Rain',
  67: 'Heavy Freezing Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Light Showers',
  81: 'Showers',
  82: 'Heavy Showers',
  85: 'Light Snow Showers',
  86: 'Snow Showers',
  95: 'Thunderstorm',
  96: 'Light Thunderstorms With Slight Hail',
  99: 'Thunderstorm With Heavy Hail',
};

export const weatherCodeImg = (weatherCode) => {
  let weatherCodeImg;
  switch (weatherCode) {
    case 0:
    case 1:
      weatherCodeImg = `<i style='color: yellow' class="fa-regular fa-sun fa-2xl"></i>`;
      break;
    case 2:
      weatherCodeImg = `<i style='color: orange' class="fa-solid fa-cloud-sun fa-2xl"></i>`;
      break;
    case 3:
      weatherCodeImg = `<i style='color: lightgray' class="fa-solid fa-cloud fa-2xl"></i>`;
      break;
    case 45:
    case 48:
      weatherCodeImg = `'<i style='color: darkgoldenrod' class="fa-solid fa-smog fa-2xl"></i>'`;
      break;
    case 51:
    case 53:
    case 80:
    case 81:
    case 82:
      weatherCodeImg = `<i style='color: darkorange' class="fa-solid fa-cloud-sun-rain fa-2xl"></i>`;
      break;
    case 55:
    case 61:
      weatherCodeImg = '<i style="color: gray" class="fa-solid fa-cloud-rain fa-2xl"></i>';
      break;
    case 56:
    case 57:
    case 63:
    case 65:
      weatherCodeImg = '<i style="color: darkblue" class="fa-solid fa-cloud-showers-heavy fa-2xl"></i>';
      break;
    case 66:
    case 67:
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      weatherCodeImg = '<i style="color: white" class="fa-regular fa-snowflake fa-2xl"></i>';
      break;
    case 95:
    case 96:
    case 99:
      weatherCodeImg = '<i style="color: green" class="fa-solid fa-cloud-bolt fa-2xl"></i>';
  }
  return weatherCodeImg;
};

// Programatically populates an object with the description image from switch statement
let weatherCodes = {};
Object.entries(weatherCodeDesc).forEach(([code, value]) => {
  weatherCodes[code] = {
    description: value,
    image: weatherCodeImg(parseInt(code)),
  };
});

export default weatherCodes;
