import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LucasComponent } from './lucas.component';

const routes: Routes = [
  { path: '', component: LucasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LucasRoutingModule {}
