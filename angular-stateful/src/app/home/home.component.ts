import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthStateService } from '../auth';
import { EpisodesStateService } from '../domains/episodes/episodes.state.service';

@Component({
  selector: 'app-home',
  template: `
    <header>
      Rick and Morty
      <button (click)="authService.logout()">logout</button>
      <a routerLink="my-episodes">My episodes ({{ count$ | async }}) </a>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class HomeComponent {
  count$ = inject(EpisodesStateService).episodes$.pipe(
    map((episodes) => episodes.length)
  );
  authService = inject(AuthStateService);
}
