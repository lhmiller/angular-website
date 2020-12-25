import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // 3rd party
    BrowserModule,

    // created in this package
    AppRoutingModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
