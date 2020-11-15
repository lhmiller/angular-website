import { sandboxOf } from 'angular-playground';
import { LucasComponent } from './lucas.component';

export default sandboxOf(LucasComponent)
  .add('default', {
    template: `<app-lucas></app-lucas>`
  });
