import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CacheService, DEFAULT_CACHE_TTL_MS_PROVIDER } from './cache.service';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    CacheService,
    LocalStorageService,
    DEFAULT_CACHE_TTL_MS_PROVIDER,
  ],
})
export class ServiceModule {}
