import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  template: `
    <h1>app</h1>
    <ul>
      <li><a routerLink="">Locations</a></li>
      <li><a routerLink="characters">Characters</a></li>
      <li><a routerLink="episodes">Episodes</a></li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class ShellComponent {}
