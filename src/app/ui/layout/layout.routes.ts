import { Route } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { PaginationStore } from '../../shared/data-access/pagination/pagination.store';

const layoutRoutes: Route[] = [
  {
    path: '',
    providers: [provideComponentStore(PaginationStore)],
    loadComponent: () => import('../../home/home.component'),
  },
  {
    path: 'random',
    providers: [provideComponentStore(PaginationStore)],
    loadComponent: () => import('../../random/random.component'),
  },
];

export default layoutRoutes;
