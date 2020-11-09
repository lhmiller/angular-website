import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpComponent } from './ip/ip.component';
import { IpService } from './ip/ip.service';
import { PartComponent } from './part/part.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    IpComponent,
    PartComponent,
    WeatherComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    IpService,
    WeatherService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
