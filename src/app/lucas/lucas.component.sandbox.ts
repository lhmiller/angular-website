import { sandboxOf } from 'angular-playground';
import { TitleService } from '../shared/title.service';
import { LucasComponent } from './lucas.component';

class MockTitleService {
  setTitle = () => {};
}

export default sandboxOf(LucasComponent, {
  providers: [{ provide: TitleService, useClass: MockTitleService }],
})
  .add('default', {
    template: `<app-lucas></app-lucas>`
  });
