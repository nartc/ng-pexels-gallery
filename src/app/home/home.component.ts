import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PushModule } from '@ngrx/component';
import { injectPhotosStore } from '../shared/data-access/photos/photos.store';
import { PaginatorComponent } from '../ui/paginator/paginator.component';
import { PhotoCardComponent } from '../ui/photo-card/photo-card.component';
import { SearchComponent } from './ui/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-paginator></app-paginator>
    <app-search (query)="photosStore.setQuery($event)"></app-search>
    <div class="photos-container">
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
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent {
  readonly photosStore = injectPhotosStore();
}
