import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { PdfViewerRoutingModule } from './pdf-viewer-routing.module';
import { PdfViewerComponent } from './pdf-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    PdfViewerRoutingModule,
    PdfJsViewerModule,
  ],
  declarations: [PdfViewerComponent],
  exports: [PdfViewerComponent],
})
export class PdfViewerModule {}
