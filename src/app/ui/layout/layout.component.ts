import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <mat-sidenav-container class="layout-container">
      <mat-sidenav mode="side" [opened]="true">
        <app-side-nav></app-side-nav>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-top-bar></app-top-bar>
        <div class="layout-content-container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./layout.component.scss'],
  imports: [RouterOutlet, TopBarComponent, SideNavComponent, MatSidenavModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
