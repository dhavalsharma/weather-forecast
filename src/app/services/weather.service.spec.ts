import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule, XHRBackend, ResponseOptions, Response, BaseRequestOptions, Http, ConnectionBackend, RequestOptions } from "@angular/http";
import { MockBackend } from '@angular/http/testing';

import { WeatherService } from './weather.service';
import { ForecastTimeModel, ForecastWeatherModel } from "../models/forecast-time";

const listOfForecasts = [
  {
    "dt": 1499482800,
    "main": {
      "temp": 24.1,
    },
    "weather": [
      {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03d"
      }
    ],
    "dt_txt": "2017-07-07 03:00:00"
  },
  {
    "dt": 1499493600,
    "main": {
      "temp": 28.09,
    },
    "weather": [
      {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04d"
      }
    ],
    "dt_txt": "2017-07-08 06:00:00"
  }];

describe('WeatherService', () => {
  let service, backend, lastConnection;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        WeatherService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions }
      ]
    });
  });

  beforeEach(inject([WeatherService, ConnectionBackend], (service: WeatherService, backend: MockBackend) => {
    this.service = service;
    this.backend = backend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  }));

  it('should be created', () => {
    expect(this.service).toBeTruthy();
  });

  it('should call getWeather() to get weather', () => {
    this.service.getWeather();
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toMatch(/forecast/, 'url invalid');
  });

  it('getWeather() should return weather forecasts', fakeAsync(() => {
    let result: ForecastTimeModel[];
    const forecastOne = new ForecastTimeModel(1499482800, '2017-07-07', 24.1,
      new ForecastWeatherModel(802, 'Clouds', 'scattered clouds', '03d'));
    const forecastTwo = new ForecastTimeModel(1499493600, '2017-07-08', 28.09,
      new ForecastWeatherModel(803, 'Clouds', 'broken clouds', '04d'));

    this.service.getWeather().subscribe((forecasts: ForecastTimeModel[]) => result = forecasts);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ list: listOfForecasts }),
    })));
    tick();
    expect(result.length).toEqual(2, 'should contain given number of forecasts');
    expect(result[0]).toEqual(forecastOne, ' forecastOne should be the first forecast');
    expect(result[1]).toEqual(forecastTwo, ' forecastTwo should be the first forecast');
  }));
});
