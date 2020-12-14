import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IpRoutingModule } from './ip-routing.module';
import { IpComponent } from './ip.component';
import { IpService } from './services/ip.service';

@NgModule({
  declarations: [IpComponent],
  imports: [
    CommonModule,
    IpRoutingModule,
  ],
  providers: [IpService],
})
export class IpModule {}
