import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { ForecastTimeModel, ForecastWeatherModel } from "../models/forecast-time";

@Injectable()
export class WeatherServiceStub {
  forecasts: ForecastTimeModel[] = [];

  constructor() {
    for (var index = 0; index < 5; index++) {
      this.forecasts.push(
        new ForecastTimeModel(123 + index, '2017-07-07', 22.3 + index,
          new ForecastWeatherModel(456 + index, 'main', 'description', 'n10m'))
      );
    }
  }
  getWeather(): Observable<ForecastTimeModel[]> {
    return Observable.of(this.forecasts);
  }
}
