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
    path: 'resume',
    loadChildren: () => import('./pdf-viewer/pdf-viewer.module').then(m => m.PdfViewerModule),
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./lucas/lucas.module').then(m => m.LucasModule),
  },
  { path: '**', redirectTo: '' }, // redirect 404s to the homepage
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
