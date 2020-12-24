import { sandboxOf } from 'angular-playground';
import { TitleService } from '../../shared/title.service';
import { FooterComponent } from './footer.component';

class MockTitleService {
  setTitle = () => {};
}

export default sandboxOf(FooterComponent, {
  providers: [{ provide: TitleService, useClass: MockTitleService }],
})
  .add('default', {
    template: `<app-footer></app-footer>`
  });
