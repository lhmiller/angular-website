import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherComponent } from './weather.component';
import { GeolocationService } from './services/geolocation.service';
import { TitleService } from '../shared/title.service';

class MockGeolocationService {
  getAddress = () => of({});
  getWeather = () => of({});
  getLocationName = () => of({});
  getCurrentPosition = () => of('');
}

class MockTitleService {
  setTitle = () => {};
}

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      providers: [
        { provide: GeolocationService, useClass: MockGeolocationService },
        { provide: TitleService, useClass: MockTitleService },
      ],
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
