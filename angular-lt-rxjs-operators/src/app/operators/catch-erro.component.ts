import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import {
  catchError,
  debounce,
  debounceTime,
  distinctUntilChanged,
  iif,
  of,
  switchMap,
  throwError,
} from 'rxjs';

@Component({
  selector: 'app-catch-error',
  template: `
    <div class="flex">
      <section class="w-1/2">
        <button class="py-3 px-2 rounded-md bg-red-300" (click)="emit()">
          Emit
        </button>
      </section>

      <section>Value: {{ value$ | async }}</section>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatchErrorComponent {
  value$ = this.getStream();

  emit() {
    this.value$ = this.getStream();
  }

  private getStream() {
    return of(null).pipe(
      switchMap(() => {
        const random = Math.random();

        return iif(
          () => {
            console.log('checking...');
            return random > 0.5;
          },
          throwError(() => `Za dużo! ${random}`),

          of(random)
        ).pipe(catchError((err) => of(err)));
      })
    );
  }
}
