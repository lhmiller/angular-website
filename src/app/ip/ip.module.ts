import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IpRoutingModule } from './ip-routing.module';
import { IpComponent } from './ip.component';
import { IpService } from './services/ip.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IpRoutingModule,
  ],
  declarations: [IpComponent],
  exports: [IpComponent],
  providers: [IpService],
})
export class IpModule {}
