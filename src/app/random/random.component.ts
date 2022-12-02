import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PushModule } from '@ngrx/component';
import { injectPhotosStore } from '../shared/data-access/photos/photos.store';
import { PaginatorComponent } from '../ui/paginator/paginator.component';
import { PhotoCardComponent } from '../ui/photo-card/photo-card.component';

@Component({
  selector: 'app-random',
  standalone: true,
  template: `
    <app-paginator></app-paginator>
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
  ],
  styleUrls: ['./random.component.scss'],
})
export default class RandomComponent {
  readonly photosStore = injectPhotosStore();
}
