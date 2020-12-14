import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CacheService } from './cache.service';
import { LocalStorageService } from './local-storage.service';
import { TitleService } from './title.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    CacheService,
    LocalStorageService,
    TitleService,
  ],
})
export class ServiceModule {}
