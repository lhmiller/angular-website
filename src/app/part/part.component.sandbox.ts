import { sandboxOf } from 'angular-playground';
import { TitleService } from '../shared/title.service';
import { PartComponent } from './part.component';
import { PartModule } from './part.module';

class MockTitleService {
  setTitle = () => {};
}

export default sandboxOf(PartComponent, {
  declareComponent: false,
  imports: [PartModule],
  providers: [{ provide: TitleService, useClass: MockTitleService }],
})
  .add('default', {
    template: `<app-part></app-part>`
  });
