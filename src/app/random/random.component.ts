import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PhotosGridComponent } from '../ui/photos-grid/photos-grid.component';

@Component({
  selector: 'app-random',
  standalone: true,
  template: `
    <app-photos-grid></app-photos-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PhotosGridComponent],
})
export default class RandomComponent {}
