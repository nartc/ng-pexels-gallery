import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-random',
  standalone: true,
  template: `
    <p>random works!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RandomComponent {}
