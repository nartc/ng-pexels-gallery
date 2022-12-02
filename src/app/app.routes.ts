import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./ui/layout/layout.component'),
    loadChildren: () => import('./ui/layout/layout.routes'),
  },
];
