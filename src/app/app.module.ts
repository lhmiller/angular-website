import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceModule } from './shared/service.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // 3rd party
    BrowserModule,

    // created in this package
    AppRoutingModule,
    ServiceModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
