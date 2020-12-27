import { sandboxOf } from 'angular-playground';
import { TitleService } from '../shared/title.service';
import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfViewerModule } from './pdf-viewer.module';

class MockTitleService {
  setTitle = () => {};
}

export default sandboxOf(PdfViewerComponent, {
  declareComponent: false,
  imports: [PdfViewerModule],
  providers: [{ provide: TitleService, useClass: MockTitleService }],
})
  .add('default', {
    template: `<app-pdf-viewer></app-pdf-viewer>`
  });
