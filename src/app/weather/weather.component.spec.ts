import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherComponent } from './weather.component';
import { GeolocationService } from './services/geolocation.service';

class MockGeolocationService {
  getAddress = () => of({});
  getWeather = () => of({});
  getLocationName = () => of({});
  getCurrentPosition = () => of('');
}

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      providers: [
        { provide: GeolocationService, useClass: MockGeolocationService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
