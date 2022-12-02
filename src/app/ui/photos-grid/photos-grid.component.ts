import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PushModule } from '@ngrx/component';
import {
  injectPhotosDefaultQuery,
  injectPhotosStore,
} from '../../shared/data-access/photos/photos.store';
import { PaginatorComponent } from '../paginator/paginator.component';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-photos-grid',
  standalone: true,
  template: `
    <app-paginator></app-paginator>
    <app-search
      *ngIf="withSearch"
      [defaultQuery]="defaultQuery"
      (query)="photosStore.setQuery($event)"
    ></app-search>
    <div class="photos-grid">
      <app-photo-card
        *ngFor="let photo of photosStore.photos$ | ngrxPush"
        [photo]="photo"
      ></app-photo-card>
    </div>
  `,
  styleUrls: ['./photos-grid.component.scss'],
  imports: [
    NgIf,
    PaginatorComponent,
    SearchComponent,
    PhotoCardComponent,
    NgFor,
    PushModule,
  ],
})
export class PhotosGridComponent {
  @Input() withSearch = false;
  readonly defaultQuery = injectPhotosDefaultQuery();
  readonly photosStore = injectPhotosStore();
}
