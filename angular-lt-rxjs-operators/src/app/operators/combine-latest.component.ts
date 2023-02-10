import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Character } from './helpers/Character';
import { useCharacters } from './helpers/get-characters.hook';
import { useGet } from './helpers/use-get-hook';
import { Location } from './helpers/Location';

@Component({
  selector: 'app-combine-latest',
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

        <h4 class="font-semibold mt-8">Location:</h4>
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
        <p>Current {{ value$ | async }}</p>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombineLatestComponent {
  private get = useGet();
  ctrl = new FormControl('');

  characters$ = useCharacters().pipe(
    map((characters) => characters.slice(0, 5))
  );

  location$: Observable<{
    location: Location;
    residents: Character[];
  } | null> = of(null);

  value$ = this.ctrl.valueChanges;

  constructor() {
    combineLatest([this.value$]).subscribe(console.log);
  }

  getLocation(url: string) {
    this.location$ = this.get<Location>(url).pipe(
      switchMap((location) => {
        const randomIndex = Math.ceil(
          Math.random() * location.residents.length
        );

        return combineLatest([
          of(location),
          combineLatest(
            location.residents
              .splice(randomIndex - 5, 5)
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
