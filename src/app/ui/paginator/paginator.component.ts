import { Component } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LetModule } from '@ngrx/component';
import { injectPaginationStore } from '../../shared/data-access/pagination/pagination.store';

@Component({
  selector: 'app-paginator',
  standalone: true,
  template: `
    <mat-paginator
      *ngrxLet="paginator$ as paginator"
      [length]="paginator.total"
      [pageSize]="paginator.pageSize"
      [showFirstLastButtons]="true"
      (page)="onPage($event)"
      aria-label="Select page"
    ></mat-paginator>
  `,
  imports: [MatPaginatorModule, LetModule],
})
export class PaginatorComponent {
  private readonly paginationStore = injectPaginationStore();

  readonly paginator$ = this.paginationStore.paginator$;

  onPage(pageEvent: PageEvent) {
    this.paginationStore.setPage(pageEvent.pageIndex + 1);
  }
}
