import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import * as _ from "lodash";
import { ForecastTimeModel, ForecastWeatherModel } from "../models/forecast-time";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class WeatherService {
  private cityCode: number = 1277333;
  private appId: string = '122dfd8229f6d83ef5e9e661d15706ed';
  //default is to get in celsius
  private units: string = 'metric'; // can be imperial too to get in Fahrenheit
  private url: string;

  constructor(private http: Http) {
    this.url = `http://api.openweathermap.org/data/2.5/forecast?id=${this.cityCode}&appid=${this.appId}&mode=json&units=${this.units}`;
  }

  /**
   * gets weather
   * todo add a parameter when customizing the url
   */
  getWeather(): Observable<ForecastTimeModel[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * handler to format response
   * @param res Response object
   */
  private extractData(res: Response) {
    let body = res.json();
    let list = body.list;
    let models: ForecastTimeModel[] = list.map((forecastItem) => {
      // todo for now taking the first weather
      const weatherItem = forecastItem.weather[0];
      const weather = new ForecastWeatherModel(+weatherItem.id, weatherItem.main, weatherItem.description, weatherItem.icon)
      // todo keeping only date for now and ignoring time part
      const dt_txt_date = forecastItem.dt_txt.split(' ')[0];

      return new ForecastTimeModel(+forecastItem.dt, dt_txt_date, +forecastItem.main.temp, weather)
    });
    //todo for now have single data for each of the last date
    models = _.uniqBy(models, 'dt_txt_date');

    return models;
  }

  /**
   * error handler for http requests
   * @param error
   */
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.data || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
