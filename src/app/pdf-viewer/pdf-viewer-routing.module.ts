import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfViewerComponent } from './pdf-viewer.component';

const routes: Routes = [
  { path: '', component: PdfViewerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfViewerRoutingModule {}
