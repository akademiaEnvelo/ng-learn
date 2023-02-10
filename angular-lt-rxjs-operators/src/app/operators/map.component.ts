import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { useCharacters } from './helpers/get-characters.hook';

@Component({
  selector: 'app-filter',
  template: `
    <div class="flex">
      <div class="w-1/2">
        <ol>
          <li *ngFor="let character of characters$ | async">
            <button (click)="({})">
              {{ character.name }}
            </button>
          </li>
        </ol>
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
export class MapComponent {
  ctrl = new FormControl('');

  characters$ = useCharacters().pipe(
    map((characters) => characters.slice(0, 5))
  );

  value$ = this.ctrl.valueChanges;
}
