import { Routes } from '@angular/router';
import { hasAuthGuard, LoginComponent } from './auth';
import { EpisodesComponent } from './domains/episodes/episodes.component';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [hasAuthGuard],
    children: [
      {
        path: '',
        component: EpisodesComponent,
      },
      {
        path: 'my-episodes',
        loadChildren: () =>
          import('./domains/episodes/my-episodes/my-episodes.module'),
      },
      {
        path: 'standalone',
        loadComponent: () => import('./standalone.component'),
      },
    ],
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
];
