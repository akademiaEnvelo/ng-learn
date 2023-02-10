import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Character } from './helpers/Character';
import { useCharacters } from './helpers/get-characters.hook';
import { useGet } from './helpers/use-get-hook';
import { Location } from './helpers/Location';

@Component({
  selector: 'app-switch-map',
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

        <p class="mt-8 font-semibold">Character on location:</p>
        <p *ngIf="characterOnLocation$ | async as characterOnLocation">
          {{ characterOnLocation.name }}
        </p>
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
export class SwitchMapComponent {
  private get = useGet();
  ctrl = new FormControl('');

  characters$ = useCharacters().pipe(
    map((characters) => characters.slice(0, 5))
  );

  location$: Observable<Location | null> = of(null);
  characterOnLocation$: Observable<Character | null> = of(null);

  value$ = this.ctrl.valueChanges;

  getLocation(url: string) {
    this.location$ = this.get<Location>(url);

    this.characterOnLocation$ = this.location$.pipe(
      filter(Boolean),
      // filter(val => Boolean(val)),
      switchMap((location) => {
        const randomIndex = Math.ceil(
          Math.random() * location.residents.length
        );

        return this.get<Character>(location.residents[randomIndex]);
      })
    );
  }
}
