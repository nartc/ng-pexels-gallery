import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LetModule } from '@ngrx/component';
import { injectPaginationStore } from '../../shared/data-access/pagination/pagination.store';

@Component({
  selector: 'app-paginator',
  standalone: true,
  template: `
    <mat-paginator
      *ngrxLet="paginationStore.paginator$ as paginator"
      [length]="paginator.total"
      [pageSize]="paginator.pageSize"
      [showFirstLastButtons]="true"
      [pageIndex]="paginator.pageIndex"
      (page)="paginationStore.setPage($event.pageIndex + 1)"
      aria-label="Select page"
    ></mat-paginator>
  `,
  imports: [MatPaginatorModule, LetModule],
})
export class PaginatorComponent {
  readonly paginationStore = injectPaginationStore();
}
