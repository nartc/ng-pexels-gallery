import { inject, Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  OnStoreInit,
  provideComponentStore,
} from '@ngrx/component-store';
import {
  catchError,
  defer,
  EMPTY,
  pipe,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { createInjectionToken } from '../../utils/di';
import { injectPaginationStore } from '../pagination/pagination.store';
import { Photo } from '../pexels/pexels.model';
import { injectPexelsService } from '../pexels/pexels.service';

export const [injectPhotosDefaultQuery, providePhotosDefaultQuery] =
  createInjectionToken<string>('Default Query');

@Injectable()
export class PhotosStore
  extends ComponentStore<{ photos: Photo[]; query: string }>
  implements OnStoreInit, OnStateInit
{
  private readonly pexelsService = injectPexelsService();
  private readonly paginationStore = injectPaginationStore();
  private readonly defaultQuery = injectPhotosDefaultQuery();

  readonly photos$ = this.select((s) => s.photos, { debounce: true });

  private readonly getPhotos = this.effect<{ query: string; page: number }>(
    pipe(
      switchMap(({ page, query }) =>
        defer(() =>
          query
            ? this.pexelsService.searchPhotos(query, page)
            : this.pexelsService.randomPhotos(page)
        ).pipe(
          tap((response) => {
            this.paginationStore.setTotal(response.total_results);
            this.patchState({ photos: response.photos });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly setQuery = this.effect<string>(
    pipe(
      withLatestFrom(this.select((s) => s.query)),
      tap(([query, previousQuery]) => {
        if (previousQuery && !query) {
          this.paginationStore.setPage(1);
        }
        this.patchState({ query });
      })
    )
  );

  ngrxOnStoreInit() {
    this.setState({ photos: [], query: this.defaultQuery });
  }

  ngrxOnStateInit() {
    this.getPhotos(
      this.select(
        {
          page: this.paginationStore.currentPage$,
          query: this.select((s) => s.query),
        },
        { debounce: true }
      )
    );
  }
}

export function providePhotosStore(defaultQuery = '') {
  return [
    provideComponentStore(PhotosStore),
    providePhotosDefaultQuery(defaultQuery),
  ];
}

export function injectPhotosStore() {
  return inject(PhotosStore);
}
