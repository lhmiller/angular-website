import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GeolocationService } from './services/geolocation.service';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule,
  ],
  declarations: [WeatherComponent],
  providers: [GeolocationService],
})
export class WeatherModule {}
