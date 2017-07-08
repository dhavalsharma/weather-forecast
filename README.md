# ForecastWeatherApp

The application displays weather forecast for Bangalore city. Currently it only displays the date, temparature and weather.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

## Setup

Run `npm install` to install the dependencies and setup the application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Deploy

Run `npm run deploy` to push the app to github pages and test it at this [url](https://dhavalsharma.github.io/weather-forecast/).

### Mixed content
Openweathermap does not allow free access over http, therefore the browser will give a mixed content warning. If you accept the warning by clicking on right corner of [address bar](https://stackoverflow.com/a/24434461/119031) then you can see the rest of the page

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Future Content
Refactoring/Fixes
1. Currently, partial data is processed from `openweather API`. More weather details like min/max temparature, winds, humidity etc., can be added.
2. `WeatherService` restricts and filter the data before passing on to application. Filtering of data can be abstracted out of service.
3. City code, openweather app id, units etc., are harcoded into application. They can be converted to configurable parameters which can be obtained either from environment variables or from user.

Enhancements
1. Use browser `navigator.geolocation` object to find the geo location of place automatically
2. Allow user’s to search by city and country
3. Add additional weather details 
4. Correlate weather from multiple sources
5. Use graphs/charts to represent moving weather data
