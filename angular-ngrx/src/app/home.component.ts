import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <header>
      <h1><a routerLink="/">Jutub 🎬</a></h1>
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
