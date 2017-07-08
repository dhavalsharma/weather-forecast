import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { WeatherService } from "./services/weather.service";
import { WeatherServiceStub } from "./services/weather-service-stub";
import { By } from "@angular/platform-browser";

describe('AppComponent', () => {
  let fixture, app, de;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{ provide: WeatherService, useClass: WeatherServiceStub }],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    de = fixture.debugElement;
    app = de.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('Weather Forecast for Bangalore');
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Weather Forecast for Bangalore!!');
  }));

  it('should render weather card', async(() => {
    const ne = de.query(By.css('.card')).nativeElement;
    expect(ne).toBeDefined();
  }));

  it('should render weather card with date', async(() => {
    const ne = de.query(By.css('.date')).nativeElement;
    expect(ne).toBeDefined();
    expect(ne.textContent).toContain('2017-07-07');
  }));

  it('should render weather card with temparature', async(() => {
    const ne = de.query(By.css('.temperature')).nativeElement;
    expect(ne).toBeDefined();
    expect(ne.textContent).toContain('22.3');
  }));

  it('should render weather card with weather icon', async(() => {
    const ne = de.query(By.css('.icon')).nativeElement;
    expect(ne).toBeDefined();
  }));

  it('should render weather card with weather description', async(() => {
    const ne = de.query(By.css('.description')).nativeElement;
    expect(ne).toBeDefined();
    expect(ne.textContent).toContain('description');
  }));
});
