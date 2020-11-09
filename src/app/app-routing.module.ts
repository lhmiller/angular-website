import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IpComponent } from './ip/ip.component';
import { LucasComponent } from './lucas/lucas.component';
import { PartComponent } from './part/part.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: 'ip',
    children: [
      { path: '', component: IpComponent },
      { path: ':ip', component: IpComponent },
    ]
  },
  { path: 'part', component: PartComponent },
  { path: 'weather', component: WeatherComponent },
  { path: '', component: LucasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
