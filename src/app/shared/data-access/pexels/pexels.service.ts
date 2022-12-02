import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { injectAppConfig } from '../../config/config.di';
import { PhotoPagination } from './pexels.model';

@Injectable({ providedIn: 'root' })
export class PexelsService {
  private readonly httpClient = inject(HttpClient);
  private readonly appConfig = injectAppConfig();

  randomPhotos(page = 1): Observable<PhotoPagination> {
    return this.httpClient.get<PhotoPagination>(
      `${this.appConfig.baseUrl}/curated`,
      {
        params: { per_page: 15, page },
      }
    );
  }

  searchPhotos(query: string, page = 1): Observable<PhotoPagination> {
    return this.httpClient.get<PhotoPagination>(
      `${this.appConfig.baseUrl}/search`,
      {
        params: { query, per_page: 15, page },
      }
    );
  }
}

export function injectPexelsService() {
  return inject(PexelsService);
}
