# Weather Report - A dynamic, component based application for displaying weather data

This projects purpose is to utilise provided weather data from open-meteo.com to generate a pleasing UI for viewing
weather forecasts and reports.

## Technologies

- Eleventy static site generator and nunjucks templating
- Bulma CSS Library
- DayJs
- “Vanilla” Javascript
- Modern JavaScript usage including inline statements, ternary operators, async await, .catch error handling,
  import/export module, and more
- Geolocation API for getting the users location to calculate the nearest available city
- Namespacing with import/export module to weather-report.js. All js components, utils, data etc are loaded with this
  one script tag in head

## Features

- A default “home” city on index.html with a city focus view, set with user settings or with
  the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API).
- A Bulma modal is presented on load of the home page when there is no predefined local storage key set for the default
  city, or when settings are reset via the settings page. It displays a welcome message and an option to select their
  home city with a Bulma dropdown, or request the nearest city from their
  location.
- A dashboard of all available cities’ weather summaries for the day, all clickable to zoom into a more detailed view.
- From the city focus view, loaded via URLParams, a daily summary is presented for the week, of which each card is
  clickable, sending the user to an hourly forecast for that day(also displayed dynamically with url parameters)
- A favourites section of the dashboard, set on the settings page.
- Additional user settings include temperature and speed unit preferences.
- Very little repeated code with clear commenting on how each component functions
- Option to add extra weather data cities or update the data and it will read everything dynamically. No “hard coding”
  of
  any data.

## Installation

1. Clone GitHub repo
2. Run npm install
3. eleventy --serve

## Usage

- This application accepts weather data from [open-meteo.com](https://open-meteo.com). Just paste your data in to
  weather-data.js, or load it in from their API, and see the cities and days requested populate.

- Select favourites from the available cities on the settings page. The available list will populate based on the
  cities supplied in the data.

- Set the home/default city displayed at index.html with either a dropdown or user location. Catches error if location
  access is denied or fails. The user would need to re-enable their location permissions in their browser should they
  choose deny.

- Button to clear all settings or favourites from the settings page. This will also re-enable the welcome modal on
  index.

- Select wind speed or temperature preferences from the settings page.
    - To add extra settings, add a new settings option to the settings-obj.js object. It will populate in the
      relevant section on the settings page, and create the storage key and value. The logic is then up to you.

## Developer Experience

- Every UI and logic element that is used regularly on the site have well-designed, reusable components. Many of which
  can just
  have an object passed in with what the dev wants to display, and it will populate it -
    - The settings page will display dropdowns for, and save to local storage any setting that is added to the
      settingsObj.js file. The logic for what would change would need to be implemented, obviously, but the value of the
      setting would be set to storage.
    - The weatherCard component takes in an object with the city, either a daily or hourly request, and the data the dev
      would like to display along with a more friendly title for it. Any valid data can be entered here to fill the
      card.

## Acknowledgments

- [Algorithm for calculating the distance between two locations](https://www.geodatasource.com/developers/javascript) (
  in longitude and latitude): I would have found it impossible to write a mathematical algorithm to determine the
  distance between two geolocations. Thanks!
- [Async await with error handling](https://wesbos.com/12-advanced-flow-control/71-async-await-error-handling):
  Async/await is hard. Handling errors with them is harder!
- [Font awesome for weather code Icons](https://fontawesome.com)

