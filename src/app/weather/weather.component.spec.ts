import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherComponent } from './weather.component';
import { WeatherService } from './weather.service';

class MockWeatherService {
  getAddress = () => of({});
  getWeather = () => of({});
  getLocationName = () => of({});
}

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      providers: [
        { provide: WeatherService, useClass: MockWeatherService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    // mock function (called on init) so navigator.geolocation.getCurrentPosition is not called
    component.getLocation = () => {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
