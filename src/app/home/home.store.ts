import { inject, Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
} from '@ngrx/component-store';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { injectPaginationStore } from '../shared/data-access/pagination/pagination.store';
import { Photo } from '../shared/data-access/pexels/pexels.model';
import { injectPexelsService } from '../shared/data-access/pexels/pexels.service';

@Injectable()
export class HomeStore
  extends ComponentStore<{ photos: Photo[] }>
  implements OnStoreInit, OnStateInit
{
  private readonly pexelsService = injectPexelsService();
  private readonly paginationStore = injectPaginationStore();

  private readonly getPhotos = this.effect<number>(
    switchMap((page) =>
      this.pexelsService.randomPhotos(page).pipe(
        tap((response) => {
          this.paginationStore.setTotal(response.total_results);
          this.patchState({ photos: response.photos });
        }),
        catchError(() => EMPTY)
      )
    )
  );

  ngrxOnStoreInit() {
    this.setState({ photos: [] });
  }

  ngrxOnStateInit() {
    this.getPhotos(this.paginationStore.currentPage$);
  }
}

export function injectHomeStore() {
  return inject(HomeStore);
}
