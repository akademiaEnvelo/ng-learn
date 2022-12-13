import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService, LoginComponent } from './auth';
import { EpisodesComponent } from './episodes/episodes.component';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      () => {
        const authService = inject(AuthService);

        return authService.auth$.pipe(
          tap((hasAuth) => {
            if (hasAuth) return;

            authService.handleNonAuthState();
          })
        );
      },
    ],
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
