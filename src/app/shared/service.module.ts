import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CacheService, DEFAULT_CACHE_TTL_MS_PROVIDER } from './cache.service';
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
    DEFAULT_CACHE_TTL_MS_PROVIDER,
  ],
})
export class ServiceModule {}
