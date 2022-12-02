import { inject, Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { debounceTime, map, pipe, tap } from 'rxjs';
import { injectAppConfig } from '../../config/config.di';

@Injectable()
export class PaginationStore
  extends ComponentStore<{
    currentPage: number;
    total: number;
    pageSize: number;
  }>
  implements OnStoreInit
{
  private readonly appConfig = injectAppConfig();

  readonly currentPage$ = this.select((s) => s.currentPage);
  readonly paginator$ = this.select(
    {
      pageIndex: this.currentPage$.pipe(map((currentPage) => currentPage - 1)),
      pageSize: this.select((s) => s.pageSize),
      total: this.select((s) => s.total),
    },
    { debounce: true }
  );

  readonly setTotal = this.updater<number>((state, total) => ({
    ...state,
    total,
  }));
  readonly setPage = this.effect<number>(
    pipe(
      debounceTime(250),
      tap((currentPage) => {
        this.patchState({ currentPage });
      })
    )
  );

  ngrxOnStoreInit() {
    this.setState({
      currentPage: 1,
      pageSize: this.appConfig.pexels.pageSize,
      total: 0,
    });
  }
}

export function injectPaginationStore() {
  return inject(PaginationStore);
}
