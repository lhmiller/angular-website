import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpComponent } from './ip/ip.component';
import { LucasComponent } from './lucas/lucas.component';
import { PartComponent } from './part/part.component';
import { WeatherComponent } from './weather/weather.component';
import { GeolocationService } from './weather/services/geolocation.service';
import { IpService } from './ip/services/ip.service';

@NgModule({
  declarations: [
    AppComponent,
    IpComponent,
    LucasComponent,
    PartComponent,
    WeatherComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [
    GeolocationService,
    IpService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
