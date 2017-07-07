import { browser, by, element } from 'protractor';

export class ForecastWeatherAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
