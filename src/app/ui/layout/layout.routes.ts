import { Route } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { PaginationStore } from '../../shared/data-access/pagination/pagination.store';
import { providePhotosStore } from '../../shared/data-access/photos/photos.store';

const layoutRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideComponentStore(PaginationStore),
      providePhotosStore('programming'),
    ],
    loadComponent: () => import('../../home/home.component'),
  },
  {
    path: 'random',
    providers: [provideComponentStore(PaginationStore), providePhotosStore()],
    loadComponent: () => import('../../random/random.component'),
  },
];

export default layoutRoutes;
