import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <header>
      <h1>Jutub 🎬</h1>
      <nav>
        <a routerLink="/">My videos</a> |
        <a routerLink="/settings">Ustawienia</a>
      </nav>
    </header>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: inherit;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
