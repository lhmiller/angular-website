import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'ip',
    loadChildren: () => import('./ip/ip.module').then(m => m.IpModule),
  },
  {
    path: 'part',
    loadChildren: () => import('./part/part.module').then(m => m.PartModule),
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule),
  },
  {
    path: '',
    loadChildren: () => import('./lucas/lucas.module').then(m => m.LucasModule),
  },
  { path: '**', redirectTo: '' }, // redirect 404s to the homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
