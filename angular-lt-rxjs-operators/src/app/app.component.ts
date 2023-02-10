import { Component } from '@angular/core';

export interface AsideNavGroup {
  name: string;
  items: {
    name: string;
    path?: string; // if not provided use name as path
  }[];
}

export type AsideNavItem = AsideNavGroup['items'][0];

@Component({
  selector: 'app-root',
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: repeat(12, [col-start] 1fr);
      }

      aside {
        grid-column: col-start 1 / span 3;
      }

      main {
        grid-column: col-start 4 / -1;
      }
    `,
  ],
  template: `
  <header class="col-start-1 col-span-full text-center mb-4">
    <h1 class="text-2xl bg-orange-500 py-4">RxJS operators cheatsheet</h1>
    <h4 class="bg-orange-300">with Angular examples</h4>
  </header>
  <aside>
    <ul *ngFor="let navGroup of asideNavConfig">
      {{navGroup.name}}
      <li *ngFor="let navItem of navGroup.items">
        <a routerLinkActive="text-amber-700 font-semibold bg-gray-200" [routerLink]="navItem.path || navItem.name">🦊 <span class="align-text-bottom hover:font-semibold ">{{navItem.name}}</span></a>
      </li>
    </ul>
  </aside>
  <main class="px-2">
    <router-outlet/>
  </main>
  `,
})
export class AppComponent {
  asideNavConfig: AsideNavGroup[] = [
    {
      name: 'most used rxjs',
      items: [
        {
          name: 'map',
        },
        {
          name: 'filter',
        },
        {
          name: 'tap',
        },
        {
          name: 'of',
        },
        {
          name: 'switchMap',
        },
        {
          name: 'concatMap',
        },
        {
          name: 'combineLatest',
        },
        // {
        //   name: 'withLatestFrom',
        // },
        {
          name: 'catchError',
        },
        {
          name: 'retry',
        },
        {
          name: 'debounceTime',
        },
        {
          name: 'distinctUntilChanged',
        },
        {
          name: 'startWith',
        },
        {
          name: 'take',
        },
        {
          name: 'takeUntil',
        },
      ],
    },
  ];
}
