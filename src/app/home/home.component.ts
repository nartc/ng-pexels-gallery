import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PushModule } from '@ngrx/component';
import {
  injectPhotosDefaultQuery,
  injectPhotosStore,
} from '../shared/data-access/photos/photos.store';
import { PaginatorComponent } from '../ui/paginator/paginator.component';
import { PhotoCardComponent } from '../ui/photo-card/photo-card.component';
import { SearchComponent } from './ui/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-paginator></app-paginator>
    <app-search
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PhotoCardComponent,
    PushModule,
    MatGridListModule,
    NgFor,
    PaginatorComponent,
    SearchComponent,
  ],
})
export default class HomeComponent {
  @HostBinding('class.photos-container') readonly hostClass = true;
  readonly defaultQuery = injectPhotosDefaultQuery();
  readonly photosStore = injectPhotosStore();
}
