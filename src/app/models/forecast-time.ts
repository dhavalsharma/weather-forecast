//models to abstract data obtained from services
export class ForecastWeatherModel {
  constructor(
    public id: number,
    public main: string,
    public description: string,
    public icon: string
  ) { }
}

export class ForecastTimeModel {
  constructor(
    public dt: number,
    public dt_txt_date: string,
    public temp: number,
    public weather: ForecastWeatherModel
  ) { }
}
