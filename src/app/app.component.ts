import { Component, OnInit } from '@angular/core';
import { WeatherService } from "./services/weather.service";
import { ForecastTimeModel } from "./models/forecast-time";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Weather Forecast for Bangalore';
  forecastTimes: ForecastTimeModel[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService
      .getWeather()
      .subscribe(results => this.forecastTimes = results,
      err => console.log('Error on init in app', err));
  }
}
