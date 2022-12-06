import { Component } from '@angular/core';
import { delay, from, map } from 'rxjs';
import { TableComponent } from './table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent],
  template: `
    <h2>My awesome app</h2>
    <div>
      <!-- <app-table loadingMessage="Characters" [source]="characters$">
      </app-table> -->

      <!-- <app-movie>
        <app-logged-user-movie-interface *ngIf="user === 'user'"></app-logged-user-movie-interface>
      </app-movie> -->

      <app-table [source]="locations$">
        <ng-template #loading let-text="text">
          {{ text }}
          <img
            style="width: 100px"
            src="https://angular.io/assets/images/logos/angular/shield-large.svg"
          />
        </ng-template>
      </app-table>

      <app-table [source]="characters$"> </app-table>
    </div>
  `,
})
export class AppComponent {
  characters$ = from(
    fetch('https://rickandmortyapi.com/api/character').then((res) => res.json())
  ).pipe(
    delay(3000),
    map(({ results }) => results)
  );

  locations$ = from(
    fetch('https://rickandmortyapi.com/api/location').then((res) => res.json())
  ).pipe(
    delay(3000),
    map(({ results }) => results)
  );
}
