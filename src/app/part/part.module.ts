import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PartRoutingModule } from './part-routing.module';
import { PartComponent } from './part.component';

@NgModule({
  imports: [
    CommonModule,
    PartRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [PartComponent],
})
export class PartModule {}
