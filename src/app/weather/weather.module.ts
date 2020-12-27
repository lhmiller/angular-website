import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeolocationService } from './services/geolocation.service';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    WeatherRoutingModule,
  ],
  declarations: [WeatherComponent],
  exports: [WeatherComponent],
  providers: [GeolocationService],
})
export class WeatherModule {}
