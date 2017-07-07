import { ForecastWeatherAppPage } from './app.po';

describe('forecast-weather-app App', () => {
  let page: ForecastWeatherAppPage;

  beforeEach(() => {
    page = new ForecastWeatherAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
