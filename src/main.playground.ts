import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaygroundModule } from 'angular-playground';

PlaygroundModule
  .configure({
    selector: 'app-root',
    overlay: false,
    modules: [
      NgbModule,
      ReactiveFormsModule,
    ],
  });

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'playground-app',
  template: '<playground-root></playground-root>'
})
export class AppComponent {}

@NgModule({
  imports: [
    BrowserModule,
    PlaygroundModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
