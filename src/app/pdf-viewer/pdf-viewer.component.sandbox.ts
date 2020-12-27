import { sandboxOf } from 'angular-playground';
import { TitleService } from '../shared/title.service';
import { PdfViewerComponent } from './pdf-viewer.component';

class MockTitleService {
  setTitle = () => {};
}

export default sandboxOf(PdfViewerComponent, {
  providers: [{ provide: TitleService, useClass: MockTitleService }],
})
  .add('default', {
    template: `<app-pdf-viewer></app-pdf-viewer>`
  });
