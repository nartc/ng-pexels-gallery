import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  template: `
    <mat-nav-list>
      <mat-list-item><b>Image Gallery</b></mat-list-item>
      <a mat-list-item routerLink="/">Home</a>
      <a mat-list-item routerLink="/random">Random Photos</a>
    </mat-nav-list>
  `,
  imports: [MatListModule, RouterLink],
})
export class SideNavComponent {}
