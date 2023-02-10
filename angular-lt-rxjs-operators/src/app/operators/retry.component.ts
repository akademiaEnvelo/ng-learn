import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import {
  catchError,
  debounce,
  debounceTime,
  distinctUntilChanged,
  iif,
  of,
  retry,
  switchMap,
  throwError,
} from 'rxjs';

@Component({
  selector: 'app-retry',
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
export class RetryComponent {
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
            const r = Math.random();
            console.log('checking...', r);
            return r > 0.5;
          },
          throwError(() => `Za dużo! ${random}`),

          of(random)
        ).pipe(
          retry(2),
          catchError((err) => of(err))
        );
      })
    );
  }
}
