import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { PushModule } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { PaginatorComponent } from '../ui/paginator/paginator.component';
import { PhotoCardComponent } from '../ui/photo-card/photo-card.component';
import { HomeStore, injectHomeStore } from './home.store';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-paginator></app-paginator>
    <div class="photos-container">
      <app-photo-card
        *ngFor="let photo of photos$ | ngrxPush"
        [photo]="photo"
      ></app-photo-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(HomeStore)],
  imports: [
    PhotoCardComponent,
    PushModule,
    MatGridListModule,
    NgFor,
    PaginatorComponent,
  ],
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit {
  private readonly homeStore = injectHomeStore();
  readonly photos$ = this.homeStore.select((s) => s.photos);

  ngOnInit() {}
}
