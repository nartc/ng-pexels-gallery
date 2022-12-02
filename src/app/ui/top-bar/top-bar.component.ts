import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  template: `
    <mat-toolbar color="primary">Image Gallery</mat-toolbar>
  `,
  imports: [MatToolbarModule],
})
export class TopBarComponent {}
