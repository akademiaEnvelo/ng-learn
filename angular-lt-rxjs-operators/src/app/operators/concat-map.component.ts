import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { concatMap, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { Character } from './helpers/Character';
import { useCharacters } from './helpers/get-characters.hook';
import { useGet } from './helpers/use-get-hook';
import { Location } from './helpers/Location';

@Component({
  selector: 'app-concat-map',
  template: `
    <div class="flex">
      <div class="w-1/2">
        <input [formControl]="ctrl" class="block bg-gray-400" />
        <p>Switch {{ switchValue$ | async }}</p>
        <p>Concat {{ concatValue$ | async }}</p>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConcatMapComponent {
  ctrl = new FormControl('', { nonNullable: true });

  switchValue$ = this.ctrl.valueChanges.pipe(
    tap((v) => {
      console.log(v);
    }),
    switchMap((value) => {
      return of(value.toUpperCase()).pipe(delay(2000));
    })
  );

  concatValue$ = this.ctrl.valueChanges.pipe(
    concatMap((value) => {
      return of(value.toUpperCase()).pipe(delay(2000));
    })
  );
}
