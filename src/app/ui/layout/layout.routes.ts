import { Route } from '@angular/router';

const layoutRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../../home/home.component'),
  },
];

export default layoutRoutes;
