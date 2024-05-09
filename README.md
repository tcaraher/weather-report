# Weather Report - A dynamic, component based application for displaying weather data

This projects purpose is to utilise provided weather data from open-meteo.com to generate a pleasing UI for viewing weather forecasts and reports.

## Technologies

- Eleventy static site generator and nunjucks templating
- Bulma CSS Library
- DayJs
- “Vanilla” Javascript
- Modern JavaScript usage including inline statements, ternary operators, async await, .catch error handling and more
- Geolocation API
- Namespacing

## Features


- A default “home” city on index.html with a city focus view, set with user settings or with the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API).
- A Bulma modal is presented on load of the home page when there is no predefined local storage key set for the default city. It displays a welcome message and an option to select their home city, or request the nearest city from their location.
- A dashboard of all available cities’ weather summaries for the day, all clickable to zoom into a more detailed view.
- From the city focus view, loaded via URLParams, a daily summary is presented for the week, of which each card is clickable, sending the user to an hourly forecast for that day(also displayed dynamically with url parameters)
- A favourites section of the dashboard, set on the settings page.
- Additional user settings include temperature and speed unit preferences. With an easy developer experience to add new settings options.
- Very little repeated code with clear commenting on how each component functions
- Option add extra weather data cities or update the data and it will read everything dynamically. No “hard coding” of any data.


## Installation

1. Clone GitHub repo
2. Run npm install
3. eleventy --serve

## Usage

- This application accepts weather data from [open-meteo.com](open-meteo.com). Just paste your data in to weather-data.js, or load it in from their API, and see the cities and days requested populate.

- All instances of the component weatherCard takes an object with the requested data. The developer can add or remove available items to

- Select favourites from the available cities on the settings page. The available list will populate based on the cities supplied in the data.

- Set the home/default city displayed at index.html with either a dropdown or user location. Catches error if location access is denied or fails. The user would need to re-enable their location permissions in their browser should they choose deny.

- Button to clear all settings or favourites from the settings page. This will also re-enable the welcome modal on index.

- Select wind speed or temperature preferences from the settings page.
    - To add extra settings, add a new settings option to the settings.js object. It will populate in the relevant section on the settings page, and create the storage key and value. The logic is then up to you.


# Acknowledgments

- [Algorithm for calculating the distance between two locations](https://www.geodatasource.com/developers/javascript) (in longitude and latitude): I would have found it impossible to write a mathematical algorithm to determine the distance between two geolocations. Thanks!
- [Async await with error handling](https://wesbos.com/12-advanced-flow-control/71-async-await-error-handling): Async/await is hard. Handling errors with them is harder!
- [Weather code json for mapping codes to images and descriptions](https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c): I could have written this myself with some tedious copying and pasting. But this kind person sorted this already for me!



