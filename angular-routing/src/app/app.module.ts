import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { CharactersComponent } from './characters/characters.component';
import { LocationsComponent } from './locations/locations.component';
import { AuthComponent } from './auth/auth.component';
import { RouterModule, Routes, CanActivateFn, Router } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { of, tap } from 'rxjs';
import { ClassGuardExampleGuard } from './class-guard-example.guard';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';

const guard: CanActivateFn = () => {
  const router = inject(Router);

  return of(false).pipe(
    tap((canActivate) => {
      if (!canActivate) {
        console.log('mialo miejsce');
        router.navigate(['']);
      }
    })
  );
};

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: '',
            component: LocationsComponent,
          },
          {
            path: 'characters',
            component: CharactersComponent,
            // canActivate: [ClassGuardExampleGuard],
          },
          {
            path: 'characters/:id',
            component: CharactersDetailsComponent,
            resolve: [],
          },
          {
            path: 'episodes',
            component: EpisodesComponent,
          },
        ],
      },
      {
        path: 'auth',
        component: AuthComponent,
      },
    ],
  },
  {
    path: '**',
    component: AuthComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    EpisodesComponent,
    CharactersComponent,
    LocationsComponent,
    AuthComponent,
    ShellComponent,
    CharactersDetailsComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
