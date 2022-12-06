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
      <app-table [source$]="characters$"> </app-table>
    </div>
  `,
})
export class AppComponent {
  characters$ = from(
    fetch('https://rickandmortyapi.com/api/character').then((res) => res.json())
  ).pipe(
    delay(1000),
    map(({ results }) => results)
  );
}
