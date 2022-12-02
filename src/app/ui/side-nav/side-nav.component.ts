import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  template: `
    <mat-nav-list>
      <mat-list-item><b>Image Gallery</b></mat-list-item>
      <a
        mat-list-item
        routerLink="/"
        #homeRla="routerLinkActive"
        routerLinkActive
        [routerLinkActiveOptions]="{ exact: true }"
        [activated]="homeRla.isActive"
      >
        Home
      </a>
      <a
        mat-list-item
        routerLink="/random"
        #randomRla="routerLinkActive"
        routerLinkActive
        [routerLinkActiveOptions]="{ exact: true }"
        [activated]="randomRla.isActive"
      >
        Random Photos
      </a>
    </mat-nav-list>
  `,
  imports: [MatListModule, RouterLink, RouterLinkActive],
})
export class SideNavComponent {}
