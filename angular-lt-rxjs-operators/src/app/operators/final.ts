import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, iif, Observable, of, throwError } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  retry,
  scan,
  switchMap,
  tap,
} from 'rxjs/operators';
import { useGet } from './helpers/use-get-hook';
import { Location } from './helpers/Location';

interface Response<T> {
  info: any;
  results: T[];
}

interface Character {
  name: string;
  id: number;
  status: 'Alive' | 'Dead';
  image: string;
  location: {
    name: string;
    id: string;
    url: string;
  };
}

function getCharacters() {
  return inject(HttpClient)
    .get<Response<Character>>('https://rickandmortyapi.com/api/character')
    .pipe(map(({ results }) => results));
}

@Component({
  selector: 'app-filter',
  template: `
    <div class="flex">
      <div class="w-1/2">
        <ol>
          <li *ngFor="let character of characters$ | async">
            <button (click)="getLocation(character.location.url)">
              {{ character.name }}
            </button>
          </li>
        </ol>

        <h4 class="font-semibold">Location:</h4>
        <details *ngIf="location$ | async as location" open>
          <summary>{{ location.location.name }}</summary>
          <div class="flex gap-3 flex-wrap">
            <div
              *ngFor="let character of location.residents"
              class="w-20 h-20 bg-cover"
              [style.background-image]="'url(' + character.image + ')'"
            ></div>
          </div>
        </details>
      </div>

      <div class="w-1/2">
        <input [formControl]="ctrl" class="block bg-gray-400" />
        <p>Parzyste: {{ even$ | async }}</p>
        <p>Nieparzyste: {{ odd$ | async }}</p>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private get = useGet();

  ctrl = new FormControl('');

  characters$ = getCharacters().pipe(
    map((characters) => characters.slice(0, 5))
  );
  location$: Observable<{
    location: Location;
    residents: Character[];
  } | null> = of(null);

  // onlyAlives$ = this.characters$.pipe(
  //   map((characters) => characters.filter(({ status }) => status === 'Alive'))
  // );

  onSubmit$!: Observable<string[]>;

  inputChange$ = this.ctrl.valueChanges;

  even$ = this.inputChange$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map(Number),
    filter((value) => !isNaN(value)),
    filter((value) => value % 2 === 0),
    scan<number, number[]>((acc, curr) => [...acc, curr], [])
  );

  odd$ = this.inputChange$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map(Number),
    filter((value) => !isNaN(value)),
    filter((value) => value % 2 !== 0),
    scan<number, number[]>((acc, curr) => [...acc, curr], [])
  );

  constructor() {
    iif(
      () => {
        console.log('calculate');
        return Math.random() > 0.6;
      },
      of('Success!'),
      throwError(() => new Error('siema'))
    )
      .pipe(
        tap(() => {
          console.log('tap');
        }),
        // catchError((err) => of(err)),
        retry(1)
      )
      .subscribe({
        next: console.log,
        error: console.error,
      });
  }

  getLocation(url: string) {
    this.location$ = this.get<Location>(url).pipe(
      switchMap((location) => {
        return combineLatest([
          of(location),
          combineLatest(
            location.residents
              .splice(Math.ceil(Math.random() * 5), 5)
              .filter(Boolean)
              .map((url) => this.get<Character>(url))
          ),
        ]);
      }),
      map(([location, residents]) => ({
        location,
        residents,
      }))
    );
  }
}
