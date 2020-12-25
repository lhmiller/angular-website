import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LucasRoutingModule } from './lucas-routing.module';
import { LucasComponent } from './lucas.component';

@NgModule({
  imports: [
    CommonModule,
    LucasRoutingModule,
  ],
  declarations: [LucasComponent],
  exports: [LucasComponent],
})
export class LucasModule {}
