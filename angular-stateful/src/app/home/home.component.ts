import { Component, inject } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-home',
  template: `
    <header>
      Rick and Morty
      <button (click)="authService.logout()">logout</button>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class HomeComponent {
  authService = inject(AuthService);
}
