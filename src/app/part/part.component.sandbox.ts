import { sandboxOf } from 'angular-playground';
import { PartComponent } from './part.component';

export default sandboxOf(PartComponent)
  .add('default', {
    template: `<app-part></app-part>`
  });
