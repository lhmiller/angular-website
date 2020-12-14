import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceModule } from './shared/service.module';
import { IpModule } from './ip/ip.module';
import { LucasModule } from './lucas/lucas.module';
import { PartModule } from './part/part.module';
import { WeatherModule } from './weather/weather.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    // 3rd party
    BrowserModule,

    // created in this package
    AppRoutingModule,
    IpModule,
    LucasModule,
    PartModule,
    ServiceModule,
    WeatherModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
