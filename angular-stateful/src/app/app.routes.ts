import { Routes } from '@angular/router';
import { hasAuthGuard, LoginComponent } from './auth';
import { EpisodesComponent } from './episodes/episodes.component';
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
    ],
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
];
